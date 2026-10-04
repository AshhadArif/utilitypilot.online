import {chromium,expect} from '@playwright/test';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import tools from '../src/data/tools.json' with {type:'json'};
const live=process.argv.includes('--live');
const base=live?'https://utilitypilot.online':'http://127.0.0.1:4173';
const label=live?'live':'local';
const routes=JSON.parse(await readFile('dist/route-manifest.json','utf8'));
const dir=`test-results/adsense-${label}`;
await mkdir(dir,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({viewport:{width:1280,height:900}});
const page=await context.newPage(),errors=[],external=[],failedAssets=[],results=[];
page.on('pageerror',e=>errors.push(e.message));
page.on('request',r=>{if(!r.url().startsWith(base)&&!r.url().startsWith('blob:')&&!r.url().startsWith('data:'))external.push(r.url());});
page.on('response',r=>{if(r.status()>=400&&r.request().resourceType()!=='document')failedAssets.push(r.url());});
try{
 for(const route of routes){
  const response=await page.goto(base+route.path,{waitUntil:'networkidle'});
  const html=await response.text();
  await writeFile(`${dir}/${route.path.replaceAll('/','_')}page.html`,html);
  const detail=await page.evaluate(()=>{
   const main=document.querySelector('main');
   return {title:document.title,h1:[...document.querySelectorAll('h1')].map(n=>n.textContent),description:document.querySelector('meta[name=description]')?.content,canonical:document.querySelector('link[rel=canonical]')?.href,robots:document.querySelector('meta[name=robots]')?.content,text:main?.innerText||document.body.innerText,links:[...(main||document).querySelectorAll('a[href]')].map(a=>a.getAttribute('href')),scripts:[...document.scripts].filter(s=>s.src).map(s=>s.src),storage:localStorage.length+sessionStorage.length};
  });
  const localPath=route.path==='/'?'dist/index.html':`dist${route.path}index.html`;
  const sameAsBuild=createHash('sha256').update(html).digest('hex')===createHash('sha256').update(await readFile(localPath)).digest('hex');
  const tool=tools.find(t=>t.path===route.path);let sample='not applicable';
  if(tool){
   if(await page.locator('#sample').isVisible())await page.locator('#sample').click();
   if(tool.category==='image')await expect(page.locator('#image-details')).toContainText('400');
   await page.locator('#run').click();
   await expect(page.locator('#result')).toBeVisible({timeout:15000});
   sample=(await page.locator('#output').inputValue()).length?'pass':'empty';
  }
  const overflow=[];
  for(const width of [320,390,768]){await page.setViewportSize({width,height:900});if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))overflow.push(width);}
  if(['/', '/contact/','/tools/developer/unix-timestamp/','/tools/text/word-counter/'].includes(route.path))await page.screenshot({path:`${dir}/${route.path.replaceAll('/','_')||'home'}-mobile.png`,fullPage:true});
  await page.setViewportSize({width:1280,height:900});
  results.push({...route,status:response.status(),sameAsBuild,bytes:Buffer.byteLength(html),sample,overflow,...detail});
  console.log(`${label} ${response.status()} ${route.path} sample=${sample} overflow=${overflow.join(',')||'none'}`);
 }
 const probes=[];
 for(const pathname of ['/adsense-audit-missing-page/','/tools/text/word-counter','/tools/text/word-counter/?audit=1','/TOOLS/TEXT/WORD-COUNTER/','/tools/text/word-counter/index.html','/route-manifest.json','/robots.txt','/sitemap.xml','/404.html']){
  const response=await context.request.get(base+pathname,{maxRedirects:0});probes.push({path:pathname,status:response.status(),location:response.headers().location||'',body:['/robots.txt','/sitemap.xml'].includes(pathname)?await response.text():undefined});
 }
 const cookies=await context.cookies();
 await writeFile(`${dir}/crawl.json`,JSON.stringify({base,checkedAt:new Date().toISOString(),results,probes,errors,external,failedAssets,cookies},null,2));
 console.log(JSON.stringify({pages:results.length,tools:results.filter(r=>r.sample==='pass').length,changedFromBuild:results.filter(r=>!r.sameAsBuild).map(r=>r.path),overflow:results.filter(r=>r.overflow.length).map(r=>r.path),errors,external,failedAssets,cookies,probes},null,2));
}finally{await browser.close();}
