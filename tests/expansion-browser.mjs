import {chromium,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {gzipSync} from 'node:zlib';
import tools from '../src/data/tools.json' with {type:'json'};
import {expansionConfigs} from '../src/data/expansion-configs.mjs';
import {content} from '../src/data/tool-content.mjs';
const base=process.env.AUDIT_BASE||'http://127.0.0.1:4186';
const browser=await chromium.launch({channel:'chrome'}),context=await browser.newContext({viewport:{width:1280,height:900},permissions:['clipboard-read','clipboard-write']}),page=await context.newPage();
const errors=[],external=[],requests=[],checks=[];
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
page.on('request',r=>{requests.push(r.url());if(!r.url().startsWith(base)&&!r.url().startsWith('blob:')&&!r.url().startsWith('data:'))external.push(r.url());});
await mkdir('test-results/expansion',{recursive:true});
const run=async()=>{await page.locator('#run').focus();await page.keyboard.press('Enter');await expect(page.locator('#result:visible,#tool-error:visible')).toHaveCount(1,{timeout:15000});};
const good=async()=>{await run();await expect(page.locator('#result')).toBeVisible();return page.locator('#output').inputValue();};
const bad=async text=>{await page.locator('#input-a').fill(text);await run();await expect(page.locator('#tool-error')).toBeVisible();await expect(page.locator('#tool-error')).toBeFocused();await expect(page.locator('#result')).toBeHidden();};
const largeInput=async text=>page.locator('#input-a').evaluate((input,value)=>{input.value=value;input.dispatchEvent(new Event('input',{bubbles:true}));},text);
try{
 for(const [slug,c] of Object.entries(expansionConfigs)){
  const t=tools.find(t=>t.slug===slug);assert.equal((await page.goto(base+t.path)).status(),200);
  await page.locator('#sample').click();const output=await good();
  if(slug==='json-yaml-converter')assert.match(output,/9007199254740993/);
  if(slug==='unicode-converter')assert.match(output,/\\ud83d\\udc4b/);
  if(slug==='markdown-to-html')assert.match(output,/<h1>Release notes<\/h1>/);
  await page.locator('#copy').click();assert.equal((await page.evaluate(()=>navigator.clipboard.readText())).replace(/\r\n/g,'\n'),output);
  const pending=page.waitForEvent('download');await page.locator('#download').click();const d=await pending;assert.equal(await readFile(await d.path(),'utf8'),output);await d.saveAs('test-results/expansion/'+d.suggestedFilename());
  const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],slug);
  for(const width of [1280,768,390,320]){await page.setViewportSize({width,height:900});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),slug+' overflow '+width);}
  await page.locator('.tool-workspace').scrollIntoViewIfNeeded();await page.screenshot({path:'test-results/expansion/'+slug+'-mobile.png'});
  await page.locator('button[type=reset]').click();assert.equal(await page.locator('#input-a').inputValue(),'');await expect(page.locator('#result')).toBeHidden();
  await run();await expect(page.locator(slug==='unicode-converter'?'#result':'#tool-error')).toBeVisible();
  if(slug==='unicode-converter'){await page.locator('#opt-action').selectOption('decode');await bad('\\ud800');await page.locator('#input-a').fill('\\u0041\\ud83d\\udc4b');assert.equal(await good(),'A👋');await page.locator('#opt-format').selectOption('points');await page.locator('#input-a').fill('U+0041 U+1F44B');assert.equal(await good(),'A👋');await page.locator('#opt-action').selectOption('encode');await page.locator('#input-a').fill('é'.repeat(10000));assert.equal((await good()).split(' ').length,10000);await bad('x'.repeat(262145));}
  if(slug==='json-yaml-converter'){
   await bad('x: [');await bad('x: 1\nx: 2');await bad('x: &a [1]\ny: *a');
   await page.locator('#opt-direction').selectOption('toYAML');await page.locator('#input-a').fill('{"city":"Lahore","id":9007199254740993}');const yaml=await good();assert.match(yaml,/9007199254740993/);
   await page.locator('#opt-direction').selectOption('toJSON');await page.locator('#input-a').fill(yaml);assert.equal(JSON.parse(await good()).city,'Lahore');
   await page.locator('#text-file').setInputFiles({name:'config.yaml',mimeType:'application/yaml',buffer:Buffer.from('name: "Café 👋"\nid: 9007199254740993')});await expect(page.locator('#tool-status')).toContainText('loaded');assert.match(await good(),/Café 👋/);
   await page.locator('#input-a').fill(Array.from({length:2000},(_,i)=>'item'+i+': "é"').join('\n'));assert.equal(Object.keys(JSON.parse(await good())).length,2000);await bad('x'.repeat(1048577));
  }
  if(slug==='markdown-to-html'){
   await page.locator('#text-file').setInputFiles({name:'notes.md',mimeType:'text/markdown',buffer:Buffer.from('# Café 👋\n\n<script>window.BAD=1</script>\n\n![image](https://should-not-load.invalid/p.png)\n\n[x](javascript:alert%281%29)')});await expect(page.locator('#tool-status')).toContainText('loaded');const html=await good();assert.match(html,/&lt;script&gt;/);assert.doesNotMatch(html,/<script>|href="javascript/);assert.equal(await page.evaluate(()=>window.BAD),undefined);assert.equal(await page.locator('#rich-result img,#rich-result iframe').count(),0);await largeInput('Café\n\n'.repeat(5000));assert.match(await good(),/<p>Café<\/p>/);await bad('x'.repeat(262145));
  }
  assert.equal(await page.evaluate(()=>localStorage.length+sessionStorage.length),0);
  await page.setViewportSize({width:1280,height:900});checks.push({slug,sample:true,empty:true,malformed:true,large:true,unicode:true,copy:true,download:true,reset:true,keyboard:true,mobile:[320,390,768,1280],axeViolations:0});
 }
 await page.goto(base+'/tools/web/contrast-checker/');await page.locator('#foreground-picker').fill('#000000');await page.locator('#background-picker').fill('#ffffff');assert.equal(await page.locator('#input-a').inputValue(),'#000000');assert.match(await good(),/21.00:1/);await page.locator('#swap-colors').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('#input-a').inputValue(),'#ffffff');assert.equal(await page.locator('#input-b').inputValue(),'#000000');assert.match(await good(),/21.00:1/);
 await page.locator('#input-a').fill('rgb(255 0 0)');assert.equal(await page.locator('#foreground-picker').inputValue(),'#ff0000');await page.locator('#input-b').fill('#fff');await good();await page.locator('#foreground-picker').fill('#000000');await good();const ax=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(ax.violations,[]);
 await page.setViewportSize({width:320,height:900});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.locator('.tool-workspace').scrollIntoViewIfNeeded();await page.screenshot({path:'test-results/expansion/contrast-mobile.png'});await bad('rgba(0 0 0 / .5)');await page.locator('button[type=reset]').click();assert.equal(await page.locator('#input-a').inputValue(),'');
 await page.goto(base+'/tools/developer/jwt-decoder/');await page.locator('#sample').click();const jwt=JSON.parse(await good());assert.match(jwt.verification,/NOT VERIFIED/);assert.equal(jwt.timeClaims.iat.utc,'2023-11-14T22:13:20.000Z');
 const routes=JSON.parse(await readFile('dist/route-manifest.json','utf8')),sitemap=await(await context.request.get(base+'/sitemap.xml')).text();const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);assert.equal(urls.length,70);assert.equal(new Set(urls).size,70);
 const articleChecks=[];
 for(const slug of [...Object.keys(expansionConfigs),'json-formatter','base64','contrast-checker','url-encoder-decoder','json-to-csv','csv-to-json','html-entities','jwt-decoder']){
  const t=tools.find(t=>t.slug===slug),response=await context.request.get(base+t.path),html=await response.text();assert.equal(response.status(),200);assert.ok(urls.includes('https://utilitypilot.online'+t.path));assert.equal((html.match(/<h1[ >]/g)||[]).length,1);assert.ok(html.includes('content="index,follow"'));assert.ok(html.includes('href="https://utilitypilot.online'+t.path+'"'));assert.ok(html.includes('<h2>'));assert.ok(html.indexOf('id="tool-form"')<html.indexOf('class="prose tool-prose"'));const c=content[slug],words=c.sections.map(s=>s.html.replace(/<[^>]+>/g,' ')).join(' ').split(/\s+/).filter(Boolean).length;assert.ok(words>450,slug+' depth');articleChecks.push({slug,sections:c.sections.length,words});
 }
 const meta=JSON.parse(await readFile('test-results/bundle.json','utf8')),lazy=[];
 for(const module of ['src/lib/yaml.mjs','src/lib/markdown.mjs','src/lib/unicode.mjs']){for(const [path,out]of Object.entries(meta.outputs))if(/\/(site|tool|worker)\.js$/.test(path))assert.ok(!out.inputs[module],module+' must load lazily');const chunk=Object.entries(meta.outputs).find(([,v])=>v.inputs[module]);assert.ok(chunk);lazy.push({module,bytes:chunk[1].bytes,gzip:gzipSync(await readFile(chunk[0])).length});}
 const nojs=await browser.newContext({javaScriptEnabled:false});for(const slug of Object.keys(expansionConfigs)){const p=await nojs.newPage(),t=tools.find(t=>t.slug===slug);await p.goto(base+t.path);assert.ok((await p.locator('.tool-prose').innerText()).length>2000);await p.close();}await nojs.close();
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);assert.ok(requests.every(u=>!u.includes('9007199254740993')));
 const report={checks,contrastPickersSwap:true,jwtUTC:true,articleChecks,routes:routes.length,sitemapURLs:urls.length,lazy,staticContent:true,externalRequests:external,consoleErrors:errors};await writeFile('test-results/expansion/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await browser.close();}
