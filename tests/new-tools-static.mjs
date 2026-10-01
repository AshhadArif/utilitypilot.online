import {readFile,writeFile,mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {gzipSync} from 'node:zlib';
import {newContent} from '../src/data/new-content.mjs';
import tools from '../src/data/tools.json' with {type:'json'};
const routes=JSON.parse(await readFile('dist/route-manifest.json','utf8')),baseline=await readFile('docs/UTILITYPILOT-EXISTING-SITE-AUDIT.md','utf8');
await mkdir('test-results/new-tools',{recursive:true});
for(const t of tools.filter(t=>Number(t.id.slice(2))<=32)){assert.ok(baseline.includes(`| ${t.path} |`));assert.ok(routes.some(r=>r.path===t.path));}
assert.equal(tools.length,40);assert.equal(routes.length,69);assert.equal(routes.filter(r=>!r.noindex).length,67);
const pages=[];
for(const [slug,c] of Object.entries(newContent)){
 const t=tools.find(t=>t.slug===slug),html=await readFile('dist'+t.path+'index.html','utf8');
 assert.ok(html.includes(c.h1));assert.ok(html.includes('content="index,follow"'));assert.ok(html.indexOf('id="tool-form"')<html.indexOf('class="prose tool-prose"'));
 const body=c.sections.map(s=>s.title+' '+s.html).join(' ')+' '+c.faqs.flat().join(' '),words=body.replace(/<[^>]+>/g,' ').split(/\s+/).filter(Boolean).length;
 assert.ok(words>450,slug+' content');pages.push({slug,path:t.path,editorialWords:words,sections:c.sections.length,faqs:c.faqs.length});
}
const metafile=JSON.parse(await readFile('test-results/bundle.json','utf8')),bundles=[];
for(const [file,entry] of Object.entries(metafile.outputs)){const bytes=await readFile(file);bundles.push({file,gzip:gzipSync(bytes).length});if(/\/(site|tool|worker)\.js$/.test(file)){for(const path of ['src/lib/developer.mjs','src/lib/json-tools.mjs','src/client/json-tree.mjs'])assert.ok(!entry.inputs[path],path+' must stay in a lazy chunk');}}
const social=await readFile('public/assets/social.png');assert.ok(social.length<100000);
const report={originalToolRoutesPreserved:32,tools:40,routes:69,sitemapURLs:67,pages,lazyProcessors:true,bundles,socialBytes:social.length};await writeFile('test-results/new-tools/static-report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
