"""Read-only HTML baseline inventory. Run from repository root; JSON to stdout only."""
import json, hashlib
from pathlib import Path
from html.parser import HTMLParser
from collections import Counter
from urllib.parse import urlsplit

class Inventory(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids=[]; self.anchors=[]; self.links=[]; self.resources=[]; self.tags=Counter(); self.forms=[]; self.controls=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs); self.tags[tag]+=1
        if a.get('id'): self.ids.append(a['id'])
        if tag=='a' and a.get('name'): self.anchors.append(a['name'])
        if tag=='a' and 'href' in a: self.links.append(a['href'])
        if tag in ('script','img','link'):
            url=a.get('src') if tag!='link' else a.get('href')
            if url: self.resources.append({'tag':tag,'url':url})
        if tag=='form': self.forms.append({k:a[k] for k in ('id','action','method') if k in a})
        if tag in ('input','select','textarea'): self.controls.append({'tag':tag,'type':a.get('type'), 'required':'required' in a, 'dataRequired':a.get('data-tilda-req')})
    def result(self):
        targets=set(self.ids+self.anchors)
        return {'tagCounts':dict(self.tags),'linkCount':len(self.links),'fragmentTargets':{h:h[1:] in targets for h in sorted(set(self.links)) if h.startswith('#') and len(h)>1}, 'duplicateIds':[k for k,v in Counter(self.ids).items() if v>1], 'resourceCount':len(self.resources),'externalResourceHosts':dict(Counter(urlsplit(r['url']).netloc for r in self.resources if urlsplit(r['url']).netloc)),'relativeCityLinks':[h for h in self.links if h.startswith('/') and not h.startswith('//')], 'forms':self.forms,'controlCount':len(self.controls),'nativeRequiredCount':sum(c['required'] for c in self.controls),'tildaRequiredCount':sum(c['dataRequired']=='1' for c in self.controls)}

out={}
for file in ['source/original.html','public/index.html']:
    data=Path(file).read_bytes(); p=Inventory(); p.feed(data.decode())
    out[file]={'sha256':hashlib.sha256(data).hexdigest(),**p.result()}
out['localScreenshotBaselineExists']=Path('output').exists()
print(json.dumps(out,ensure_ascii=False,indent=2))
