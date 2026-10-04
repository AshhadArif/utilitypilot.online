import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import site from '../site.config.mjs';
const browser=await chromium.launch({channel:'chrome'});
const base='http://127.0.0.1:4173';
try{
 const page=await browser.newPage();
 await page.goto(base+'/tools/data/csv-column-editor/');
 await page.locator('#input-a').fill('a,b,c\n1,2,3');await page.locator('#load-columns').click();
 const move=page.getByRole('button',{name:'Move column up: c',exact:true});
 await move.focus();await page.keyboard.press('Enter');
 await expect(page.getByRole('button',{name:'Move column up: c',exact:true})).toBeFocused();
 await page.keyboard.press('Enter');
 await expect(page.getByRole('button',{name:'Move column down: c',exact:true})).toBeFocused();
 await page.locator('#run').click();await expect(page.locator('#output')).toHaveValue(/^c,a,b/);
 await page.goto(base+'/tools/data/csv-merge/');
 await page.locator('#text-file').setInputFiles(['a','b','c'].map((name,i)=>({name:name+'.csv',mimeType:'text/csv',buffer:Buffer.from('id\n'+i)})));
 await page.getByRole('button',{name:'Move up: c.csv',exact:true}).focus();await page.keyboard.press('Enter');
 await expect(page.getByRole('button',{name:'Move up: c.csv',exact:true})).toBeFocused();
 await page.keyboard.press('Enter');await expect(page.getByRole('button',{name:'Move down: c.csv',exact:true})).toBeFocused();
 await page.locator('#run').click();await expect(page.locator('#output')).toHaveValue(/id\r?\n2\r?\n0\r?\n1/);
 const noJS=await browser.newContext({javaScriptEnabled:false});const fallback=await noJS.newPage();
 await fallback.goto(base+'/tools/text/word-counter/');await expect(fallback.locator('noscript p')).toBeVisible();await expect(fallback.locator('noscript p')).toContainText('JavaScript');
 await expect(fallback.locator('a[href="/tools/"]').first()).toBeVisible();
 await page.goto(base+'/privacy-policy/');await expect(page.locator('main')).toContainText('Hosting security checks');
 await page.goto(base+'/cookie-policy/');await expect(page.locator('main')).toContainText('Hosting security cookies');
 await page.goto(base+'/contact/');assert.ok(await page.locator('a[href^="mailto:"]').count()||await page.getByText('Direct contact is currently unavailable.',{exact:false}).count());
 if(site.operator&&site.contactEmail){
  for(const path of ['/about/','/contact/']){
   await page.goto(base+path);await expect(page.locator('main')).toContainText(site.operator);
   await expect(page.locator(`main a[href="mailto:${site.contactEmail}"]`)).toBeVisible();
  }
  await page.goto(base+'/privacy-policy/');await expect(page.locator('main')).toContainText('automatically purged after '+site.logRetention);
  await page.goto(base+'/report-an-error/');await page.locator('[name=reportDetails]').fill('Synthetic report for configured contact verification.');
  await page.locator('#report-form button[type=submit]').click();await expect(page.locator('#email-report')).toBeVisible();
  await expect(page.locator('#report-form')).toHaveAttribute('data-email',site.contactEmail);
 }
 await page.goto(base+'/terms/');await page.getByRole('link',{name:'third-party software notices'}).click();
 const notices=await page.locator('body').innerText();for(const name of ['diff','entities','marked','yaml'])assert.ok(notices.includes(name));assert.ok(notices.includes('Copyright'));
 console.log('PASS repeated keyboard reordering, resulting CSV order, JavaScript-disabled guidance, hosting disclosures and honest contact fallback');
}finally{await browser.close();}
