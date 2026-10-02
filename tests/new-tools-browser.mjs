import {chromium,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {newConfigs} from '../src/data/new-configs.mjs';
import tools from '../src/data/tools.json' with {type:'json'};
const base=process.env.AUDIT_BASE||'http://127.0.0.1:4173';
const browser=await chromium.launch({channel:'chrome'}),context=await browser.newContext({viewport:{width:1280,height:900},permissions:['clipboard-read','clipboard-write']}),page=await context.newPage();
const errors=[],external=[],checks=[],requests=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('request',r=>{requests.push({url:r.url(),body:r.postData()});if(!r.url().startsWith(base)&&!r.url().startsWith('blob:')&&!r.url().startsWith('data:'))external.push(r.url());});
await mkdir('test-results/new-tools',{recursive:true});
const run=async()=>{await page.locator('#run').focus();await page.keyboard.press('Enter');await expect(page.locator('#result:visible,#tool-error:visible')).toHaveCount(1,{timeout:15000});};
try{
 for(const [slug,c] of Object.entries(newConfigs)){
  const t=tools.find(t=>t.slug===slug);assert.equal((await page.goto(base+t.path)).status(),200);
  if(!c.noInput)await page.locator('#sample').click();await run();await expect(page.locator('#result')).toBeVisible();
  const text=await page.locator('#output').inputValue();assert.ok(text.length);
  if(slug==='hash-generator')assert.equal(text,'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
  if(slug==='unix-timestamp')assert.equal(JSON.parse(text).utc,'2023-11-14T22:13:20.000Z');
  if(slug==='number-base-converter')assert.equal(JSON.parse(text).hexadecimal,'ff');
  if(slug==='regex-tester')assert.equal(JSON.parse(text).matches[1].start,18);
  if(slug==='jwt-decoder')assert.match(text,/NOT VERIFIED/);
  if(slug==='json-compare')assert.equal(JSON.parse(text).changes.length,2);
  if(slug==='uuid-generator')assert.match(text,/^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/);
  await page.locator('#copy').click();assert.equal((await page.evaluate(()=>navigator.clipboard.readText())).replace(/\r\n/g,'\n'),text);
  const pending=page.waitForEvent('download');await page.locator('#download').click();const download=await pending;await download.saveAs('test-results/new-tools/'+download.suggestedFilename());assert.equal(await readFile(await download.path(),'utf8'),text);
  const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(axe.violations.map(v=>({id:v.id,target:v.nodes.map(n=>n.target)})),[],slug);
  for(const width of [1280,768,390,320]){await page.setViewportSize({width,height:900});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),slug+' overflow '+width);}
  await page.locator('#result').scrollIntoViewIfNeeded();await page.screenshot({path:`test-results/new-tools/${slug}-mobile.png`});
  await page.locator('button[type=reset]').click();await expect(page.locator('#result')).toBeHidden();if(!c.noInput)assert.equal(await page.locator('#input-a').inputValue(),'');
  await run();await expect(page.locator(['regex-tester','hash-generator','uuid-generator'].includes(slug)?'#result':'#tool-error')).toBeVisible();
  if(slug==='uuid-generator')await page.locator('#opt-count').fill('101');
  else if(slug==='regex-tester')await page.locator('#opt-pattern').fill('[');
  else if(slug==='hash-generator')await page.locator('#input-a').fill('x'.repeat(1048577));
  else await page.locator('#input-a').fill('not valid input 🌱');
  await run();await expect(page.locator('#tool-error')).toBeVisible();await expect(page.locator('#result')).toBeHidden();
  assert.ok(await page.locator('#tool-error').evaluate(n=>n===document.activeElement),slug+' error focus');
  assert.ok((await page.locator('article.tool-prose').innerText()).split(/\s+/).length>450,slug+' substantive explanation');
  checks.push({slug,sample:true,copy:true,download:true,reset:true,empty:true,error:true,keyboard:true,mobile:[320,390,768,1280],axeViolations:0});
  await page.setViewportSize({width:1280,height:900});console.log('NEW TOOL '+slug);
 }
 await page.goto(base+'/tools/data/json-viewer/');
 await page.locator('#input-a').fill('{"unsafe":"<img src=x onerror=alert(1)>","é":{"roles":["reader","editor"]},"id":9007199254740993}');await run();
 assert.equal(await page.locator('#rich-result img').count(),0);await page.getByRole('button',{name:'Expand all',exact:true}).click();
 await page.locator('#tree-search').fill('editor');await expect(page.locator('.json-tree [role=status]')).toContainText('1 matching');assert.equal(await page.locator('.tree-node:visible').count(),4);
 await page.locator('#tree-search').fill('');await page.getByRole('button',{name:'Collapse all',exact:true}).click();
 const rootSummary=page.locator('.json-tree > details > summary');await rootSummary.focus();await page.keyboard.press('Enter');await expect(rootSummary.locator('..')).toHaveAttribute('open','');
 await page.getByRole('button',{name:'Expand all',exact:true}).click();await page.screenshot({path:'test-results/new-tools/json-tree-desktop.png'});
 assert.match(await page.locator('#output').inputValue(),/9007199254740993/);
 await page.locator('#input-a').fill('['.repeat(49)+'"deep"'+']'.repeat(49));await run();await page.getByRole('button',{name:'Expand all',exact:true}).click();await page.setViewportSize({width:320,height:900});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'deep tree remains within mobile viewport');
 await page.setViewportSize({width:1280,height:900});
 // Browser main thread remains available while a pathological regex is running.
 await page.goto(base+'/tools/developer/regex-tester/');await page.locator('#input-a').fill('a'.repeat(100)+'!');await page.locator('#opt-pattern').fill('(a+)+$');await page.locator('#run').click();await page.locator('#cancel').click();await expect(page.locator('#tool-status')).toContainText('cancelled');
 await page.locator('#run').click();await expect(page.locator('#tool-error')).toContainText('exceeded 8 seconds',{timeout:12000});
 await page.locator('#opt-pattern').fill('a+');await run();await expect(page.locator('#result')).toBeVisible();
 // Representative large valid documents/values pass through the real worker.
 for(const [path,value,options] of [
  ['data/json-viewer',JSON.stringify(Array(2000).fill('🌱')),{}],
  ['data/json-compare',JSON.stringify(Array(2000).fill(1)),{}],
  ['developer/hash-generator','🌱'.repeat(10000),{}],
  ['developer/number-base-converter','f'.repeat(1000),{base:'16'}],
  ['developer/regex-tester','é '.repeat(4000),{pattern:'é',flags:'g'}]
 ]){await page.goto(base+'/tools/'+path+'/');await page.locator('#input-a').fill(value);if(await page.locator('#input-b').count())await page.locator('#input-b').fill(value);for(const [k,v] of Object.entries(options)){const n=page.locator('#opt-'+k);if(await n.evaluate(x=>x.tagName)==='SELECT')await n.selectOption(v);else await n.fill(v);}await run();await expect(page.locator('#result')).toBeVisible();}
 await page.goto(base+'/tools/');for(const [q,path] of [['json tree viewer','data/json-viewer'],['json diff','data/json-compare'],['uuid v4 generator','developer/uuid-generator'],['epoch converter','developer/unix-timestamp'],['jwt decoder','developer/jwt-decoder'],['sha256 hash generator','developer/hash-generator'],['regex tester','developer/regex-tester'],['binary to decimal','developer/number-base-converter']]){await page.locator('#tool-search').fill(q);await expect(page.locator('.suggestion').first()).toHaveAttribute('href','/tools/'+path+'/');}
 for(const path of ['/tools/data/','/tools/developer/','/guides/inspect-api-data/']){await page.goto(base+path);const a=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(a.violations,[]);for(const width of [1280,320]){await page.setViewportSize({width,height:900});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}}
 const staticContext=await browser.newContext({javaScriptEnabled:false}),staticPage=await staticContext.newPage();
 for(const slug of Object.keys(newConfigs)){const path=tools.find(t=>t.slug===slug).path;await staticPage.goto(base+path);await expect(staticPage.locator('h1')).toHaveCount(1);await expect(staticPage.locator('#privacy')).toContainText('browser');await expect(staticPage.locator('link[rel=canonical]')).toHaveAttribute('href','https://utilitypilot.online'+path);}
 const sitemap=await (await context.request.get(base+'/sitemap.xml')).text();const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);assert.equal(urls.length,tools.length+27);assert.equal(new Set(urls).size,urls.length);for(const slug of Object.keys(newConfigs))assert.ok(urls.includes('https://utilitypilot.online'+tools.find(t=>t.slug===slug).path));
 await page.goto(base+'/tools/developer/jwt-decoder/');const synthetic='eyJhbGciOiJub25lIn0.'+Buffer.from('{"sub":"NEW_TOOL_PRIVATE_MARKER"}').toString('base64url')+'.';await page.locator('#input-a').fill(synthetic);await run();assert.match(await page.locator('#output').inputValue(),/NEW_TOOL_PRIVATE_MARKER/);
 assert.ok(!JSON.stringify(requests).includes('NEW_TOOL_PRIVATE_MARKER'));assert.ok(!JSON.stringify(requests).includes(synthetic));
 assert.deepEqual(await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length})),{local:0,session:0});assert.deepEqual(await context.cookies(),[]);
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
 const report={checks,regexCancellation:true,regexTimeout:true,treeSearchAndKeyboard:true,deepTreeMobile:true,inertMarkup:true,largeWorkerFixtures:5,staticHTML:true,syntheticPrivacyCheck:true,sitemapURLs:urls.length,errors,external};await writeFile('test-results/new-tools/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await browser.close();}
