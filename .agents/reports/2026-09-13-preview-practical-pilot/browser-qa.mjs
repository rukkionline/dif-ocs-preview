// QA-only; no dependencies, no text-file output. JSON evidence goes to stdout.
// Run from repository root with managed 127.0.0.1:4317 server already running.
import {spawn} from 'node:child_process';
import {writeFile, mkdtemp, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
const profile = await mkdtemp(join(tmpdir(),'preview-pilot-chrome-'));
const origin = 'http://127.0.0.1:4317';
const out = '.agents/reports/2026-09-13-preview-practical-pilot';
const chrome = spawn('google-chrome', ['--headless=new','--no-sandbox','--disable-gpu',
  '--disable-background-networking','--disable-component-update','--disable-domain-reliability',
  '--disable-sync','--no-first-run','--no-default-browser-check','--disable-extensions',
  '--disable-breakpad','--metrics-recording-only','--disable-quic',
  '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
  '--proxy-server=http://127.0.0.1:9','--proxy-bypass-list=127.0.0.1',
  '--remote-debugging-pipe',`--user-data-dir=${profile}`,'--incognito','about:blank'],
  {stdio:['ignore','ignore','pipe','pipe','pipe']});
let seq=0, buffer='', stderr=''; const pending=new Map(); const handlers=[];
const evidence={policy:{origin,methods:['GET','HEAD'],external:'blocked before navigation',formActions:'none'},views:[],blocked:[],responses:[],console:[],exceptions:[],failed:[]};
chrome.stderr.on('data', b=>{stderr+=b;});
function send(method,params={},sessionId) {
  return new Promise((resolve,reject)=>{
    const id=++seq;
    const timer=setTimeout(()=>{pending.delete(id);reject(new Error('CDP timeout: '+method));},12000);
    pending.set(id,{resolve,reject,timer});
    chrome.stdio[3].write(JSON.stringify({id,method,params,...(sessionId?{sessionId}:{})})+'\0');
  });
}
chrome.stdio[3].on('error',()=>{});
chrome.stdio[4].on('data',b=>{
  buffer+=b.toString(); let i;
  while((i=buffer.indexOf('\0'))>=0){
    const raw=buffer.slice(0,i);buffer=buffer.slice(i+1);if(!raw)continue;
    const msg=JSON.parse(raw);const p=pending.get(msg.id);
    if(p){clearTimeout(p.timer);pending.delete(msg.id);msg.error?p.reject(new Error(JSON.stringify(msg.error))):p.resolve(msg.result);}
    else for(const h of handlers)h(msg);
  }
});
chrome.on('exit',(code,signal)=>{evidence.chromeExit={code,signal};for(const p of pending.values()){clearTimeout(p.timer);p.reject(new Error('Chrome exited '+code+' '+signal));}pending.clear();});
try{
  evidence.version=await send('Browser.getVersion');
  const {targetId}=await send('Target.createTarget',{url:'about:blank'});
  const {sessionId:s}=await send('Target.attachToTarget',{targetId,flatten:true});
  const c=(m,p={})=>send(m,p,s);
  handlers.push(msg=>{
    if(msg.sessionId!==s)return;const p=msg.params;
    if(msg.method==='Fetch.requestPaused'){
      const allowed=new URL(p.request.url).origin===origin && ['GET','HEAD'].includes(p.request.method);
      if(!allowed)evidence.blocked.push({url:p.request.url,method:p.request.method,type:p.resourceType});
      c(allowed?'Fetch.continueRequest':'Fetch.failRequest',allowed?{requestId:p.requestId}:{requestId:p.requestId,errorReason:'BlockedByClient'}).catch(e=>evidence.failed.push({harness:String(e)}));
    }
    if(msg.method==='Runtime.consoleAPICalled')evidence.console.push({type:p.type,args:p.args.map(a=>a.value??a.description)});
    if(msg.method==='Runtime.exceptionThrown')evidence.exceptions.push(p.exceptionDetails);
    if(msg.method==='Network.loadingFailed')evidence.failed.push(p);
    if(msg.method==='Network.responseReceived')evidence.responses.push({url:p.response.url,status:p.response.status});
  });
  await c('Fetch.enable',{patterns:[{urlPattern:'*',requestStage:'Request'}]});
  await c('Network.enable');await c('Network.setBypassServiceWorker',{bypass:true});
  await c('Network.setCacheDisabled',{cacheDisabled:true});await c('Runtime.enable');await c('Page.enable');
  // Defense in depth: no form submission or popup navigation, including programmatic submission.
  await c('Page.addScriptToEvaluateOnNewDocument',{source:`
    window.__pilotSubmitAttempts=0;
    HTMLFormElement.prototype.submit=function(){window.__pilotSubmitAttempts++;};
    HTMLFormElement.prototype.requestSubmit=function(){window.__pilotSubmitAttempts++;};
    window.open=function(){return null;};
    document.addEventListener('submit',e=>{window.__pilotSubmitAttempts++;e.preventDefault();e.stopImmediatePropagation();},true);
  `});
  const evaluate=async expression=>(await c('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true})).result.value;
  for(const [width,height] of [[1440,900],[390,844]]){
    await c('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});
    await c('Page.navigate',{url:origin+'/'});
    // Bounded settling in page, not a job-poll loop; blocked CDN runtime cannot become fully ready.
    await evaluate('new Promise(resolve=>setTimeout(resolve,2500))');
    const view=await evaluate(`(()=>{
      const els=s=>Array.from(document.querySelectorAll(s));
      const label=e=>e.getAttribute('aria-label')||e.labels?.[0]?.textContent?.trim()||e.textContent?.trim()||e.getAttribute('alt')||'';
      const links=els('a[href]').map(e=>{const u=new URL(e.getAttribute('href'),location.href);return {text:e.textContent.trim().slice(0,100),href:e.getAttribute('href'),kind:u.origin===location.origin?'local':u.protocol,anchorExists:u.origin===location.origin&&u.hash?!!(document.getElementById(decodeURIComponent(u.hash.slice(1)))||document.getElementsByName(u.hash.slice(1)).length):null};});
      return {width:innerWidth,height:innerHeight,scrollWidth:document.documentElement.scrollWidth,scrollHeight:document.documentElement.scrollHeight,title:document.title,lang:document.documentElement.lang,h1:els('h1').map(e=>e.textContent.trim()),main:els('main').length,links,images:els('img').map(e=>({src:e.currentSrc||e.src,loaded:e.complete&&e.naturalWidth>0,alt:e.getAttribute('alt')})),forms:els('form').map(f=>({action:f.getAttribute('action'),method:f.method,controls:Array.from(f.elements).map(e=>({tag:e.tagName,type:e.type,name:e.name,label:label(e),required:e.required,willValidate:e.willValidate,valid:e.validity?.valid,valueMissing:e.validity?.valueMissing}))})),buttons:els('button,[role=button]').map(e=>({tag:e.tagName,type:e.type,label:label(e),tabIndex:e.tabIndex,rect:{width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height}})),submitAttempts:window.__pilotSubmitAttempts};
    })()`);
    view.keyboard=[];
    for(let n=0;n<12;n++){
      await c('Input.dispatchKeyEvent',{type:'keyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});
      await c('Input.dispatchKeyEvent',{type:'keyUp',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});
      view.keyboard.push(await evaluate(`(()=>{const e=document.activeElement;const s=getComputedStyle(e);return {tag:e.tagName,href:e.getAttribute('href'),type:e.type,text:e.textContent.trim().slice(0,80),label:e.getAttribute('aria-label'),outline:s.outline,boxShadow:s.boxShadow}})()`));
    }
    await c('Input.dispatchKeyEvent',{type:'keyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9,modifiers:8});
    await c('Input.dispatchKeyEvent',{type:'keyUp',key:'Tab',code:'Tab',windowsVirtualKeyCode:9,modifiers:8});
    view.shiftTab=await evaluate('document.activeElement.outerHTML.slice(0,300)');
    await c('Accessibility.enable');const ax=await c('Accessibility.getFullAXTree');
    view.axSummary=ax.nodes.filter(n=>!n.ignored).map(n=>({role:n.role?.value,name:n.name?.value}));
    // Only read local page links; do not navigate anchors or click any form controls.
    view.localReads=[];
    for(const path of [...new Set(view.links.filter(l=>l.kind==='local').map(l=>new URL(l.href,origin).pathname)),'/robots.txt']){
      const url=new URL(path,origin).href;
      view.localReads.push(await evaluate(`fetch(${JSON.stringify(url)},{method:'GET',redirect:'error'}).then(r=>({url:r.url,status:r.status})).catch(e=>({url:${JSON.stringify(url)},error:String(e)}))`));
    }
    await evaluate('window.scrollTo(0,0)');
    const shot=await c('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width,height:Math.min(view.scrollHeight,16000),scale:1}});
    await writeFile(`${out}/${width}.png`,Buffer.from(shot.data,'base64'));
    view.screenshot=`${out}/${width}.png`;evidence.views.push(view);
  }
  evidence.status='browser_executed_restricted_offline';
}catch(e){evidence.status='environment_or_harness_blocked';evidence.error=String(e);process.exitCode=1;}
finally{
  if(chrome.exitCode===null && chrome.signalCode===null){try{await send('Browser.close');}catch{} chrome.kill('SIGTERM');}
  if(chrome.exitCode===null && chrome.signalCode===null) await new Promise(resolve=>chrome.once('exit',resolve));
  await rm(profile,{recursive:true,force:true});
  evidence.chromeStderr=stderr;
  console.log(JSON.stringify(evidence,null,2));
}
