import {chromium,expect} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome'}),context=await browser.newContext(),page=await context.newPage(),base=process.env.AUDIT_BASE||'http://127.0.0.1:4183';
try{
 await page.addInitScript(()=>{const original=HTMLCanvasElement.prototype.toBlob;HTMLCanvasElement.prototype.toBlob=function(callback,...args){original.call(this,blob=>setTimeout(()=>callback(blob),500),...args);};});
 await page.goto(base+'/tools/image/image-cropper/');await page.locator('#sample').click();await page.locator('button[type=reset]').click();await page.waitForTimeout(700);await expect(page.locator('.canvas-wrap')).toBeHidden();await expect(page.locator('#image-details')).toHaveText('');
 await page.locator('#sample').click();await expect(page.locator('#image-details')).toContainText('400');await page.locator('#run').click();await expect(page.locator('#result')).toBeVisible();console.log('PASS delayed sample/reset cancellation and subsequent successful run');
}finally{await browser.close();}
