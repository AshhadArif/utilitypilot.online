const base=process.env.AUDIT_BASE||'http://127.0.0.1:4173';
import {chromium,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {configs} from '../src/data/configs.mjs';
const tools=JSON.parse(await readFile('src/data/tools.json','utf8'));
const routes=JSON.parse(await readFile('dist/route-manifest.json','utf8'));
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({viewport:{width:1280,height:900},permissions:['clipboard-read','clipboard-write']});
const page=await context.newPage(),errors=[],external=[],checks=[];
page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(!r.url().startsWith(base)&&!r.url().startsWith('blob:')&&!r.url().startsWith('data:'))external.push(r.url());});
await mkdir('test-results',{recursive:true});
try{
for(const t of tools){
 await page.goto(base+t.path);
 if(!configs[t.slug].noInput)await page.locator('#sample').click();
 if(t.category==='image')await expect(page.locator('#image-details')).toContainText('400');
 await page.locator('#run').click();await expect(page.locator('#result')).toBeVisible({timeout:15000});
 const output=await page.locator('#output').inputValue();assert.ok(output.length,t.slug+' output');
 await page.locator('#copy').click();assert.equal((await page.evaluate(()=>navigator.clipboard.readText())).replace(/\r\n/g,"\n"),output);
 const download=page.waitForEvent('download');await page.locator('#download').click();const file=await download;assert.equal(await file.failure(),null);await file.saveAs('test-results/'+t.slug+'-'+file.suggestedFilename());
 const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],t.slug+' accessibility');
 for(const width of [390,320]){await page.setViewportSize({width,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),t.slug+' overflow '+width);}
 await page.locator('button[type="reset"]').click();await expect(page.locator('#result')).toBeHidden();
 if(t.category==='image'){await page.locator('#run').click();await expect(page.locator('#tool-error')).toBeVisible();await page.locator('#image-file').setInputFiles({name:'bad.png',mimeType:'image/png',buffer:Buffer.from('not an image')});await expect(page.locator('#tool-error')).toBeVisible();}
 else {if(!configs[t.slug].noInput)assert.equal(await page.locator('#input-a').inputValue(),'');await page.locator('#run').click();await expect(page.locator('#result:visible, #tool-error:visible')).toHaveCount(1);}
 checks.push({tool:t.slug,sample:true,copy:true,download:true,reset:true,mobile:[390,320],accessibility:true});console.log('PASS '+t.slug);await page.setViewportSize({width:1280,height:900});
}
for(const r of routes){const response=await page.goto(base+r.path);assert.equal(response.status(),r.path==='/404/'?404:200,r.path);await expect(page.locator('h1')).toHaveCount(1);assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://utilitypilot.online'+r.path);if(r.kind!=='tool'){const a=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(a.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],r.path);}}
assert.equal((await page.goto(base+'/not-a-route/')).status(),404);
await page.goto(base+'/');await page.screenshot({path:'test-results/home-desktop.png',fullPage:true});await page.setViewportSize({width:390,height:844});await page.screenshot({path:'test-results/home-mobile.png',fullPage:true});
assert.deepEqual(errors,[],'Browser errors');assert.deepEqual(external,[],'Unexpected external requests');await writeFile('test-results/browser-report.json',JSON.stringify({tools:checks,routes:routes.length,errors,external},null,2));console.log(`PASS all ${tools.length} tools and ${routes.length} routes`);
}finally{await browser.close();}
