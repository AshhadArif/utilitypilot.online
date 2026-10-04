import {chromium} from '@playwright/test';
import {writeFile,mkdir} from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome'});
const results=[];
try{
 for(const javaScriptEnabled of [true,false]){
  const context=await browser.newContext({javaScriptEnabled});const page=await context.newPage(),responses=[],errors=[],external=[];
  page.on('response',r=>{if(r.request().resourceType()==='document')responses.push({url:r.url(),status:r.status(),headers:r.headers()});});
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  page.on('request',r=>{if(!r.url().startsWith('https://utilitypilot.online/'))external.push(r.url());});
  await page.goto('https://utilitypilot.online/',{waitUntil:'domcontentloaded'});
  let resolved=true;try{await page.locator('main').waitFor({timeout:15000});}catch{resolved=false;}
  const cookies=(await context.cookies()).map(({name,domain,expires,httpOnly,secure,sameSite})=>({name,domain,expires,httpOnly,secure,sameSite}));
  results.push({javaScriptEnabled,resolved,title:await page.title(),responses,errors,external,cookies});
  await mkdir('test-results/adsense-live',{recursive:true});await page.screenshot({path:`test-results/adsense-live/entry-js-${javaScriptEnabled}.png`,fullPage:true});
  await context.close();
 }
 await writeFile('test-results/adsense-live/entry.json',JSON.stringify(results,null,2));
 console.log(JSON.stringify(results,null,2));
}finally{await browser.close();}
