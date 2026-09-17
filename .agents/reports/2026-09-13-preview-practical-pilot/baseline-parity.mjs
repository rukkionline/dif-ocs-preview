// Read-only reproduction of the inspected transformation section; never execute build's writes.
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const build=await readFile('scripts/build-preview.mjs','utf8');
const start=build.indexOf('let html =');
const end=build.indexOf('await mkdir(outputDir');
if(start<0||end<start)throw new Error('Build shape changed: review before running');
const section=build.slice(start,end);
if(/writeFile|mkdir|fetch\(|spawn\(|exec\(/.test(section))throw new Error('Unexpected side effect in transformation section');
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
const transform=new AsyncFunction('readFile','sourcePath','previewUrl',section+'\nreturn html;');
const generated=await transform(readFile,'source/original.html','https://rukkionline.github.io/dif-ocs-preview/');
const current=await readFile('public/index.html','utf8');
const sha=x=>createHash('sha256').update(x).digest('hex');
console.log(JSON.stringify({status:generated===current?'exact_local_transform_match':'different',generatedSha256:sha(generated),currentSha256:sha(current),wroteFiles:false},null,2));
if(generated!==current)process.exitCode=1;
