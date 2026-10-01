import {readFile,stat} from 'node:fs/promises';
import {gzipSync} from 'node:zlib';
import assert from 'node:assert/strict';
import path from 'node:path';
const routes=JSON.parse(await readFile('dist/route-manifest.json','utf8')),routeSet=new Set(routes.map(r=>r.path));let links=0;const titles=new Set(),descriptions=new Set();
for(const r of routes){const html=await readFile(path.join('dist',r.path.slice(1),'index.html'),'utf8');assert.equal((html.match(/<h1\b/g)||[]).length,1,`${r.path} H1`);const title=html.match(/<title>(.*?)<\/title>/s)?.[1],description=html.match(/name="description" content="([^"]+)"/)?.[1];assert.ok(title&&!titles.has(title),'Unique title '+r.path);assert.ok(description&&!descriptions.has(description),'Unique description '+r.path);titles.add(title);descriptions.add(description);assert.ok(html.includes(`rel="canonical" href="https://utilitypilot.online${r.path}"`),'Canonical '+r.path);assert.ok(html.includes('property="og:title"'));assert.ok(!/Coming Soon|Lorem ipsum|Content will be added later|Tool coming soon/i.test(html));
 for(const m of html.matchAll(/(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)){const href=m[1].replace(/&amp;/g,'&');if(!href.startsWith('/'))continue;const clean=href.split('#')[0];links++;if(clean.endsWith('/'))assert.ok(routeSet.has(clean),'Unknown route '+clean+' on '+r.path);else {await stat(path.join('dist',clean));}}
 assert.equal(html.includes('content="noindex,follow"'),r.noindex,'Indexability '+r.path);
}
const sitemap=await readFile('dist/sitemap.xml','utf8');assert.equal((sitemap.match(/<url>/g)||[]).length,routes.filter(r=>!r.noindex).length);for(const r of routes)assert.equal(sitemap.includes(`<loc>https://utilitypilot.online${r.path}</loc>`),!r.noindex);
const meta=JSON.parse(await readFile('test-results/bundle.json','utf8'));const sizes=[];for(const file of Object.keys(meta.outputs)){const b=await readFile(file);sizes.push({file,bytes:b.length,gzip:gzipSync(b).length});}
assert.ok(sizes.find(x=>x.file==='dist/assets/site.js').gzip<81920,'Shared JS budget');console.log(JSON.stringify({routes:routes.length,tools:routes.filter(r=>r.kind==='tool').length,guides:routes.filter(r=>r.kind==='guide').length,sitemapURLs:routes.filter(r=>!r.noindex).length,internalLinksChecked:links,duplicateTitles:0,duplicateDescriptions:0,bundleSizes:sizes},null,2));
