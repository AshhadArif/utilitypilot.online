const base=process.env.AUDIT_BASE||'http://127.0.0.1:4173';
import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import tools from '../src/data/tools.json' with {type:'json'};
const browser=await chromium.launch({channel:'chrome',headless:true}),page=await browser.newPage();
const go=async(category,slug)=>page.goto(`${base}/tools/${category}/${slug}/`);
const run=async()=>{await page.locator('#run').click();await expect(page.locator('#result')).toBeVisible();};
try{
await page.goto(base+'/');await page.locator('[data-finder] input').fill('json beautifier');await page.locator('[data-finder] input').press('ArrowDown');await page.locator('[data-finder] input').press('Enter');await expect(page).toHaveURL(/json-formatter/);
await page.goto(base+'/tools/');await page.locator('[data-filter="image"]').click();await expect(page.locator('[data-tool-grid] .tool-card')).toHaveCount(6);await page.locator('[data-finder] input').fill('zzzz-no-tool');await expect(page.locator('.empty-search')).toBeVisible();await page.locator('[data-clear-filters]').click();await expect(page.locator('[data-tool-grid] .tool-card')).toHaveCount(tools.length);
await go('data','csv-column-editor');await page.locator('#sample').click();await page.locator('#load-columns').click();await expect(page.locator('#columns input[type=checkbox]')).toHaveCount(3);await page.locator('#columns input[type=checkbox]').first().uncheck();await page.locator('#columns input[type=text]').nth(1).fill('person');await run();assert.match(await page.locator('#output').inputValue(),/^person,city/);
await go('data','csv-merge');await page.locator('#text-file').setInputFiles([{name:'a.csv',mimeType:'text/csv',buffer:Buffer.from('id,name\n1,Ada')},{name:'b.csv',mimeType:'text/csv',buffer:Buffer.from('id,name\n2,Sam')}]);await expect(page.locator('#file-list .file-row')).toHaveCount(2);await page.getByRole('button',{name:'Move up: b.csv'}).click();await run();assert.match(await page.locator('#output').inputValue(),/id,name\r?\n2,Sam\r?\n1,Ada/);
await go('data','csv-split');await page.locator('#sample').click();await run();await expect(page.locator('#part-downloads button')).toHaveCount(2);const d=page.waitForEvent('download');await page.locator('#part-downloads button').last().click();assert.equal(await (await d).failure(),null);
await go('data','json-formatter');await page.locator('#input-a').fill('{bad}');await page.locator('#run').click();await expect(page.locator('#tool-error')).toBeVisible();await page.locator('#input-a').fill('{"s":"<img src=x onerror=alert(1)>"}');await run();assert.equal(await page.locator('#rich-result img').count(),0);
await go('text','text-cleaner');await page.locator('#input-a').fill('  x  '.repeat(10000));await run();assert.ok((await page.locator('#output').inputValue()).length>10000);
for(const slug of ['image-resizer','image-converter','image-cropper','image-compressor','image-color-picker','image-inspector']){
 await go('image',slug);await page.locator('#sample').click();await expect(page.locator('#image-details')).toContainText('400');
 if(slug==='image-resizer'){await page.locator('#opt-width').fill('200');await expect(page.locator('#opt-height')).toHaveValue('150');}
 if(slug==='image-cropper'){await page.locator('#opt-width').fill('80');await page.locator('#opt-height').fill('60');}
 if(slug==='image-converter')await page.locator('#opt-format').selectOption('image/jpeg');
 if(slug==='image-compressor')await page.locator('#opt-target').fill('0.001');
 await run();const output=await page.locator('#output').inputValue();
 if(slug==='image-resizer')assert.match(output,/200 × 150/);
 if(slug==='image-cropper')assert.match(output,/80 × 60/);
 if(slug==='image-color-picker')assert.match(output,/#205a43/i);
 if(slug==='image-inspector')assert.match(output,/Transparent pixels: Present/);
 if(slug==='image-compressor')await expect(page.locator('#result-summary')).toContainText('Target not met');
 if(slug==='image-converter'){assert.match(output,/image\/jpeg/);assert.equal(await page.locator('.output-image').evaluate(async img=>{await img.decode();const c=document.createElement('canvas');c.width=img.naturalWidth;c.height=img.naturalHeight;c.getContext('2d').drawImage(img,0,0);return c.getContext('2d').getImageData(380,20,1,1).data[3];}),255);}
}
await page.goto(base+'/report-an-error/');await page.locator('[name=reportDetails]').fill('A reproducible test issue');await page.locator('#report-form button[type=submit]').click();await expect(page.locator('#report-output')).toHaveValue(/A reproducible test issue/);
console.log('PASS discovery, file uploads, column edits, merge ordering, split download, invalid JSON, inert markup, large text, image dimensions/pixels/transparency/target failure and report preparation');
}finally{await browser.close();}
