import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {performance} from 'node:perf_hooks';
import {chromium,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {parseCSV} from '../src/lib/data.mjs';
import {runText} from '../src/lib/text.mjs';

const bytes=await readFile('docs/research/ahrefs-counter-search-volume-history-2026-10-01.csv');
assert.equal(createHash('sha256').update(bytes).digest('hex'),'62088dd3869f9931654e6b549b8f8ca471c5aec6c5932143aea54b059c52598a');
const rows=parseCSV(bytes.toString('utf8')),header=rows.shift();
assert.equal(rows.length,12);assert.deepEqual(rows.at(-1),['2026-09-01','46276','43025','1401','1310','285','22']);
const map=await readFile('docs/UTILITYPILOT-AHREFS-CONTENT-MAP.md','utf8');
for(const [i,keyword] of header.slice(2).entries())assert.ok(map.includes(`| ${keyword} | ${Number(rows.at(-1)[i+2]).toLocaleString('en-US')} |`));
for(const row of rows)assert.ok(map.includes(`| ${row[0].slice(0,7)} | ${Number(row[1]).toLocaleString('en-US')} |`));
assert.ok(map.includes('46,043'));assert.ok(map.includes('233'));
assert.ok(header.slice(2).every(k=>map.includes(`| ${k} | N/A | N/A | N/A | N/A | N/A |`)));

const start=performance.now(),large=runText('word-counter','a\n\n'.repeat(10000));
assert.equal(large.stats.Paragraphs,10000);
const timing=performance.now()-start;
const base=process.env.AUDIT_BASE||'http://127.0.0.1:4173';
const browser=await chromium.launch({channel:'chrome'}),context=await browser.newContext({permissions:['clipboard-read','clipboard-write']}),page=await context.newPage();
const errors=[],external=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
page.on('request',r=>{if(!r.url().startsWith(base)&&!r.url().startsWith('blob:')&&!r.url().startsWith('data:'))external.push(r.url());});
await mkdir('test-results/ahrefs-history',{recursive:true});
try{
 const counter='/tools/text/word-counter/';await page.goto(base+counter);
 await page.locator('#input-a').fill('A short draft.\nIt has two lines.\n\nReview it carefully.');
 // Native keyboard activation exercises the existing control and worker path.
 await page.locator('#run').focus();await page.keyboard.press('Enter');await expect(page.locator('#result')).toBeVisible();
 const paragraph=page.locator('.stat').filter({has:page.locator('dt').getByText('Paragraphs',{exact:true})});
 await expect(paragraph.locator('dd')).toHaveText('2');
 const output=await page.locator('#output').inputValue();assert.match(output,/Words: 10/);assert.match(output,/Lines: 4/);assert.match(output,/Paragraphs: 2/);
 await page.locator('#copy').click();assert.equal((await page.evaluate(()=>navigator.clipboard.readText())).replace(/\r\n/g,'\n'),output);
 const pending=page.waitForEvent('download');await page.locator('#download').click();const download=await pending;await download.saveAs('test-results/ahrefs-history/counter-result.txt');
 assert.equal((await readFile('test-results/ahrefs-history/counter-result.txt','utf8')).replace(/\r\n/g,'\n'),output);
 await expect(page.locator('#input-a')).toHaveValue('A short draft.\nIt has two lines.\n\nReview it carefully.');
 for(const [input,total] of [['A\nB',1],['A\n \nB',2],['\n\t\n',0],['',0]]){
  await page.locator('#input-a').fill(input);await expect(page.locator('#result')).toBeHidden();await page.locator('#run').click();await expect(paragraph.locator('dd')).toHaveText(String(total));
 }
 for(const width of [1280,390,320]){await page.setViewportSize({width,height:900});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
 let axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(axe.violations,[]);
 await page.locator('#faqs summary').first().focus();await page.keyboard.press('Enter');await expect(page.locator('#faqs details').first()).toHaveAttribute('open','');
 await page.locator('#paragraph-counter').evaluate(n=>n.scrollIntoView());await page.screenshot({path:'test-results/ahrefs-history/paragraph-mobile.png'});
 await page.goto(base+'/tools/text/');
 for(const fragment of ['character-counter','paragraph-counter','line-counter','text-analysis'])await expect(page.locator(`a[href="${counter}#${fragment}"]`).first()).toBeVisible();
 for(const query of ['paragraph counter','paragraph count','count paragraphs','character count','word count checker']){
  await page.locator('#tool-search').fill(query);await expect(page.locator('.suggestion').first()).toHaveAttribute('href',counter);await page.locator('[data-clear-search]').click();
 }
 await page.locator('#text-task-guide').evaluate(n=>n.scrollIntoView());await page.screenshot({path:'test-results/ahrefs-history/hub-mobile.png'});
 await page.setViewportSize({width:1280,height:900});await page.screenshot({path:'test-results/ahrefs-history/hub-desktop.png'});
 axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(axe.violations,[]);
 const readonly=await browser.newContext({javaScriptEnabled:false}),staticPage=await readonly.newPage();
 await staticPage.goto(base+counter);await expect(staticPage.locator('#paragraph-counter')).toContainText('Paragraph count examples');
 await staticPage.goto(base+'/tools/text/');await expect(staticPage.locator('#text-task-guide')).toHaveText('Choose the right text or list tool');
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
 const report={sourceMonths:12,sourceKeywords:5,september:[43025,1401,1310,285,22],sourceTotal:46276,visibleKeywordSum:46043,paragraphMetric:true,copyDownload:true,keyboard:true,staticContent:true,axeViolations:0,mobile:[320,390],largeParagraphFixture:{bytes:30000,paragraphs:10000,nodeMilliseconds:Math.round(timing)},errors,external};
 await writeFile('test-results/ahrefs-history/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await browser.close();}
