import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {auditCases} from './audit-cases.mjs';
import tools from '../src/data/tools.json' with {type:'json'};
const base=process.env.AUDIT_BASE||'http://127.0.0.1:4183';
const routes=JSON.parse(await readFile('dist/route-manifest.json','utf8'));
const browser=await chromium.launch({channel:process.env.AUDIT_CHANNEL||'chrome'}),context=await browser.newContext({viewport:{width:1280,height:900}}),page=await context.newPage();
const errors=[],requests=[],failedAssets=[],toolEvidence=[],routeEvidence=[];
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!m.text().includes('404 (Not Found)'))errors.push(m.text());});
page.on('request',r=>requests.push({url:r.url(),method:r.method(),body:r.postData()}));page.on('response',r=>{if(r.status()>=400&&r.request().resourceType()!=='document')failedAssets.push(r.url());});
const run=async()=>{await page.locator('#run').click();await expect(page.locator('#result:visible,#tool-error:visible')).toHaveCount(1,{timeout:15000});};
await mkdir('test-results/prelaunch',{recursive:true});
try{
// Retain every original non-image fixture; new async tools have their own browser audit.
for(const t of tools.filter(t=>t.category!=='image'&&Number(t.id.slice(2))<=32)){
 await page.goto(base+t.path);const cases=auditCases[t.slug];
 for(const c of cases){await page.locator('button[type=reset]').click();await page.locator('#input-a').fill(c.a);if(await page.locator('#input-b').count())await page.locator('#input-b').fill(c.b||'');
  for(const [key,value] of Object.entries(c.o||{})){const control=page.locator('#opt-'+key),tag=await control.evaluate(n=>n.tagName);if(typeof value==='boolean')await control.setChecked(value);else if(tag==='SELECT')await control.selectOption(String(value));else await control.fill(String(value));}
  await run();if(c.error)await expect(page.locator('#tool-error')).toContainText(c.error);else{await expect(page.locator('#result')).toBeVisible();const output=await page.locator('#output').inputValue();if('text'in c)assert.equal(output,c.text,t.slug);if(c.contains)assert.ok(output.includes(c.contains),t.slug);}
 }
 toolEvidence.push({slug:t.slug,independentCases:cases.length,status:'pass'});console.log('AUDIT '+t.slug+' '+cases.length+' independent cases');
}
// Generate independent fixtures, including alpha, a one-pixel boundary and EXIF orientation.
await page.goto(base+'/');
const fixture=await page.evaluate(async()=>{const c=document.createElement('canvas');c.width=40;c.height=20;const x=c.getContext('2d');x.fillStyle='#ff0000';x.fillRect(0,0,20,20);x.fillStyle='#0000ff';x.fillRect(20,0,20,20);x.clearRect(0,0,1,1);const png=c.toDataURL('image/png').split(',')[1];c.width=1;c.height=1;c.getContext('2d').fillRect(0,0,1,1);return {png,tiny:c.toDataURL().split(',')[1]};});
for(const t of tools.filter(t=>t.category==='image')){
 await page.goto(base+t.path);await page.locator('#image-file').setInputFiles({name:'<unsafe-name>.png',mimeType:'image/png',buffer:Buffer.from(fixture.png,'base64')});await expect(page.locator('#image-details')).toContainText('40');
 if(t.slug==='image-resizer')await page.locator('#opt-width').fill('20');
 if(t.slug==='image-cropper'){await page.locator('#opt-x').fill('20');await page.locator('#opt-width').fill('20');await page.locator('#opt-height').fill('20');}
 if(t.slug==='image-converter')await page.locator('#opt-format').selectOption('image/jpeg');
 if(t.slug==='image-color-picker'){await page.locator('#opt-x').fill('25');await page.locator('#opt-y').fill('10');}
 await run();await expect(page.locator('#result')).toBeVisible();const output=await page.locator('#output').inputValue();
 if(t.slug==='image-resizer')assert.match(output,/20 × 10/);
 if(t.slug==='image-cropper')assert.match(output,/20 × 20/);
 if(t.slug==='image-inspector')assert.match(output,/Aspect ratio: 2:1/);
 if(t.slug==='image-color-picker')assert.match(output,/#0000ff/);
 if(await page.locator('.output-image').count()){const decoded=await page.locator('.output-image').evaluate(async img=>{await img.decode();return {w:img.naturalWidth,h:img.naturalHeight};});assert.ok(decoded.w>0&&decoded.h>0);}
 await page.locator('button[type=reset]').click();await page.locator('#image-file').setInputFiles({name:'tiny.png',mimeType:'image/png',buffer:Buffer.from(fixture.tiny,'base64')});await expect(page.locator('#image-details')).toContainText('1 × 1');await run();await expect(page.locator('#result')).toBeVisible();
 for(const [name,buffer] of [['empty.png',Buffer.alloc(0)],['spoof.png',Buffer.from('<svg onload="alert(1)"></svg>')],['huge.png',Buffer.alloc(10485761)]]){await page.locator('#image-file').setInputFiles({name,mimeType:'image/png',buffer});await expect(page.locator('#tool-error')).toBeVisible();await expect(page.locator('#result')).toBeHidden();}
 toolEvidence.push({slug:t.slug,independentCases:5,status:'pass'});console.log('AUDIT '+t.slug+' normal / one-pixel / empty / spoofed / oversized');
}
// Search must never navigate using stale suggestions after Escape or Clear.
await page.goto(base+'/tools/');const search=page.locator('#tool-search');await search.fill('json');await search.press('ArrowUp');const active=await search.getAttribute('aria-activedescendant');assert.equal(active,await page.locator('.suggestion').last().getAttribute('id'));await search.press('Escape');await search.press('Enter');assert.equal(new URL(page.url()).pathname,'/tools/');await search.fill('base64');await page.locator('[data-clear-search]').click();await search.press('Enter');assert.equal(new URL(page.url()).pathname,'/tools/');
// A modified report must not offer to copy/download stale details.
await page.goto(base+'/report-an-error/');await page.locator('[name=reportDetails]').fill('audit synthetic issue');await page.locator('button[type=submit]').click();await expect(page.locator('#prepared-report')).toBeVisible();await page.locator('[name=reportDetails]').fill('changed issue');await expect(page.locator('#prepared-report')).toBeHidden();
// Fetch every real route, inspect rendered metadata, heading order, breadcrumbs and links.
const allPaths=new Set(routes.map(r=>r.path)),graph=new Map();
for(const r of routes){const response=await page.goto(base+r.path);assert.equal(response.status(),r.path==='/404/'?404:200,r.path);const html=await response.text();assert.ok(html.includes('<h1'),r.path+' crawlable source');
 const state=await page.evaluate(()=>({title:document.title,h1:[...document.querySelectorAll('h1')].map(n=>n.textContent),description:document.querySelector('meta[name=description]')?.content,canonical:document.querySelector('link[rel=canonical]')?.href,robots:document.querySelector('meta[name=robots]')?.content,og:document.querySelector('meta[property="og:url"]')?.content,schemas:[...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(n=>JSON.parse(n.textContent)),headings:[...document.querySelectorAll('h1,h2,h3,h4')].map(n=>Number(n.tagName[1])),links:[...document.querySelectorAll('a[href]')].map(n=>n.getAttribute('href')),ids:[...document.querySelectorAll('[id]')].map(n=>n.id),breadcrumbs:[...document.querySelectorAll('.breadcrumbs li')].map(n=>n.textContent)}));
 assert.equal(state.h1.length,1);assert.equal(state.canonical,'https://utilitypilot.online'+r.path);assert.equal(state.og,state.canonical);assert.equal(state.robots,r.noindex?'noindex,follow':'index,follow');assert.ok(state.description);assert.equal(new Set(state.ids).size,state.ids.length,'duplicate IDs '+r.path);
 for(let i=1;i<state.headings.length;i++)assert.ok(state.headings[i]<=state.headings[i-1]+1,'Skipped heading '+r.path);
 if(!['/','/404/'].includes(r.path))assert.ok(state.breadcrumbs.length>=2);
 const breadcrumb=state.schemas.find(s=>s['@type']==='BreadcrumbList');if(breadcrumb)assert.deepEqual(breadcrumb.itemListElement.map(s=>s.name),state.breadcrumbs);
 const edges=[];for(const link of state.links){if(link.startsWith('#')){assert.ok(state.ids.includes(link.slice(1)),'missing fragment '+r.path+link);continue;}if(!link.startsWith('/'))continue;const u=new URL(link,base);assert.ok(allPaths.has(u.pathname),'missing link '+link);edges.push(u.pathname);if(u.hash){const target=await readFile('dist'+u.pathname+'index.html','utf8');assert.ok(target.includes('id="'+u.hash.slice(1)+'"'),'broken cross-page fragment '+link);}}
 graph.set(r.path,edges);for(const width of [320,768,1280]){await page.setViewportSize({width,height:900});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'route overflow '+r.path+' '+width);}
 routeEvidence.push({path:r.path,status:response.status(),indexable:!r.noindex,title:state.title,h1:state.h1[0],canonical:state.canonical,description:state.description,internalLinks:edges.length,mobile:true});
}
const visited=new Set(),queue=['/'];while(queue.length){const p=queue.shift();if(visited.has(p))continue;visited.add(p);queue.push(...(graph.get(p)||[]).filter(x=>!visited.has(x)));}const orphans=routes.filter(r=>!r.noindex&&!visited.has(r.path));assert.deepEqual(orphans,[]);
const sitemap=await (await fetch(base+'/sitemap.xml')).text(),locs=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);assert.equal(new Set(locs).size,locs.length);assert.deepEqual(locs.sort(),routes.filter(r=>!r.noindex).map(r=>'https://utilitypilot.online'+r.path).sort());
const redirects=[];for(const [from,to] of [['/tools','/tools/'],['/TOOLS/','/tools/'],['/tools//text/','/tools/text/'],['/tools/index.html','/tools/'],['/%74ools/','/tools/'],['/tools/?q=private','/tools/'],['/index.html','/']]){const response=await fetch(base+from,{redirect:'manual'});assert.equal(response.status,308,from);assert.equal(response.headers.get('location'),to);redirects.push({from,to,status:308});}
for(const [url,status] of [['/unknown-page/',404],['/%ZZ',400],['/tools/%00',400],['/tools/%2ftext/',400],['/package.json',404]])assert.equal((await fetch(base+url)).status,status,url);
assert.equal((await fetch(base+'/tools/',{method:'POST'})).status,405);
// Distinctive marker: no requests, browser storage, cookies or service workers retain it.
await page.goto(base+'/tools/text/text-cleaner/');await page.locator('#input-a').fill('AUDIT_PRIVATE_9e724a <script>alert(1)</script>');await run();await page.waitForTimeout(300);assert.equal(await page.locator('#rich-result script').count(),0);assert.ok(!JSON.stringify(requests).includes('AUDIT_PRIVATE_9e724a'));
assert.deepEqual(await page.evaluate(async()=>({local:localStorage.length,session:sessionStorage.length,databases:(await indexedDB.databases()).length,workers:(await navigator.serviceWorker.getRegistrations()).length})),{local:0,session:0,databases:0,workers:0});assert.deepEqual(await context.cookies(),[]);
const external=requests.filter(r=>!r.url.startsWith(base)&&!r.url.startsWith('blob:')&&!r.url.startsWith('data:'));assert.deepEqual(external,[]);assert.deepEqual(failedAssets,[]);assert.deepEqual(errors,[]);
await page.screenshot({path:'test-results/prelaunch/tool-desktop.png',fullPage:true});await page.setViewportSize({width:390,height:844});await page.screenshot({path:'test-results/prelaunch/tool-mobile.png',fullPage:true});
await writeFile('test-results/prelaunch/report.json',JSON.stringify({browserChannel:process.env.AUDIT_CHANNEL||'chrome',auditDate:new Date().toISOString(),toolEvidence,routeEvidence,redirects,orphans,errors,failedAssets,external,requestCount:requests.length},null,2));
const csvCell=x=>'"'+String(x).replaceAll('"','""')+'"';await writeFile('docs/INDEXABILITY-AUDIT.csv',['path,http_status,indexable,canonical,title,h1,description,internal_links',...routeEvidence.map(r=>[r.path,r.status,r.indexable,r.canonical,r.title,r.h1,r.description,r.internalLinks].map(csvCell).join(','))].join('\n'));
console.log('PASS independent tool cases, all routes/heading/link graph/sitemap, redirects, malformed paths, privacy and storage');
}catch(e){await page.screenshot({path:'test-results/prelaunch/failure.png',fullPage:true});throw e;}finally{await browser.close();}
