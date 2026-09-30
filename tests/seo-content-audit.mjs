import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {chromium,expect} from '@playwright/test';
import {parseCSV} from '../src/lib/data.mjs';
import {runText} from '../src/lib/text.mjs';
import {textContent} from '../src/data/text-content.mjs';
import tools from '../src/data/tools.json' with {type:'json'};

// Independently specified published examples, not snapshots of processor output.
const examples=[
 ['word-counter','Hello world!',{}, {Words:2,'Characters (graphemes)':12,'Characters without whitespace':11,'Unicode code points':12,Sentences:1,Lines:1,'Estimated reading seconds':1}],
 ['word-counter','One two.\nThree four.',{}, {Words:4,'Characters (graphemes)':20,'Characters without whitespace':17,Sentences:2,Lines:2}],
 ['word-counter','A B!',{}, {'Characters (graphemes)':4,'Characters without whitespace':3,'Unicode code points':4}],
 ['word-counter','Room 2: $5',{}, {'Characters (graphemes)':10,'Characters without whitespace':8}],
 ['word-counter','A\nB!',{}, {'Characters (graphemes)':4,'Characters without whitespace':3}],
 ['word-counter','A short draft.\nIt has two lines.\n\nReview it carefully.',{}, {Words:10,Paragraphs:2,Lines:4}],
 ['word-counter','A short draft.\nIt has two lines.\nReview it carefully.',{}, {Words:10,Paragraphs:1,Lines:3}],
 ['word-counter','I build clear documentation. My work helps teams test changes and publish reliable instructions.',{}, {Words:14,Paragraphs:1}],
 ['word-counter','e\u0301',{}, {'Characters (graphemes)':1,'Unicode code points':2}],
 ['word-counter','👨‍👩‍👧‍👦',{}, {'Characters (graphemes)':1,'Unicode code points':7}],
 ['word-counter','apple\npear\n',{}, {Lines:2}],
 ['word-counter','apple\n\npear',{}, {Lines:3}],
 ['word-counter','word '.repeat(500),{wpm:200}, {'Estimated reading seconds':150}],
 ['word-counter','word '.repeat(500),{wpm:250}, {'Estimated reading seconds':120}],
 ['case-converter','a practical GUIDE to better TEXT',{mode:'title'},'A Practical Guide To Better Text'],
 ['case-converter','NASA and the moon',{mode:'title'},'Nasa And The Moon'],
 ['case-converter','a practical GUIDE. another IDEA!',{mode:'sentence'},'A practical guide. Another idea!'],
 ['case-converter','hello.world',{mode:'sentence'},'Hello.world'],
 ['case-converter','hello. world',{mode:'sentence'},'Hello. World'],
 ['case-converter','Launch code: ab-12',{mode:'upper'},'LAUNCH CODE: AB-12'],
 ['case-converter','straße',{mode:'upper',locale:'de'},'STRASSE'],
 ['case-converter','A PRACTICAL Guide 2026',{mode:'lower'},'a practical guide 2026'],
 ['case-converter','I',{mode:'lower',locale:'tr'},'ı'],
 ['case-converter','i',{mode:'upper',locale:'tr'},'İ'],
 ['sort-lines','pear\napple\nbanana',{},'apple\nbanana\npear'],
 ['sort-lines','pear\napple\nbanana',{descending:true},'pear\nbanana\napple'],
 ['sort-lines','pear\napple\nbanana',{mode:'reverse'},'banana\napple\npear'],
 ['sort-lines','item10\nitem2\nitem1',{mode:'natural'},'item1\nitem2\nitem10'],
 ['sort-lines','item10\nitem2\nitem1',{},'item1\nitem10\nitem2'],
 ['text-cleaner','  A  useful idea  ',{},'A useful idea'],
 ['text-cleaner','A useful idea\nwrapped across lines.\n\nA new paragraph.',{join:'paragraphs'},'A useful idea wrapped across lines.\n\nA new paragraph.'],
 ['text-cleaner','A\n\n\nB',{blank:true},'A\n\nB'],
 ['remove-duplicate-lines','apple\npear\napple\nApple',{},'apple\npear\nApple'],
 ['remove-duplicate-lines','apple\npear\napple\nApple',{ignoreCase:true},'apple\npear'],
 ['remove-duplicate-lines','apple\npear\nApple',{ignoreCase:true,keep:'last'},'pear\nApple'],
 ['find-and-replace','red apple, red pear, red cherry',{find:'red',replacement:'green'},'green apple, green pear, green cherry'],
 ['find-and-replace','A B C',{find:' ',replacement:''},'ABC'],
 ['find-and-replace','apple\npear\nbanana',{find:'\n',replacement:', '},'apple, pear, banana'],
 ['find-and-replace','apple;pear;banana',{find:';',replacement:'\n'},'apple\npear\nbanana'],
 ['find-and-replace','aaa',{find:'aa',replacement:'X'},'Xa']
];
for(const [slug,input,options,expected] of examples){const result=runText(slug,input,'',options);if(typeof expected==='string')assert.equal(result.text,expected,slug);else for(const [key,value] of Object.entries(expected))assert.equal(result.stats[key],value,`${slug}: ${key}`);}
const diff=runText('text-diff','The draft is ready.','The final draft is ready.',{mode:'word'});
assert.equal(diff.diff.filter(p=>p.added).map(p=>p.value).join(''),'final ');
assert.deepEqual(runText('compare-lists','apple\npear\npear','pear\ncherry').groups,{'Shared':['pear'],'Only in A':['apple'],'Only in B':['cherry'],'Union':['apple','pear','cherry']});

const original=await readFile('docs/research/google_us_alphabetize-list-character_overview_2026-09-28_23-38-58.csv');
assert.equal(createHash('sha256').update(original).digest('hex'),'b46af4c54bc61a4070144b0bed8e51e6f653cb442552dd58a5f29de768536a5b');
const decoded=original.toString(original[0]===0xff&&original[1]===0xfe?'utf16le':'utf8').replace(/^\uFEFF/,'');
const rawRows=parseCSV(decoded,'\t'),headers=rawRows.shift();
const normalized=JSON.parse((await readFile('docs/research/ahrefs-text-keywords.json','utf8')).replace(/^\uFEFF/,''));
assert.deepEqual(rawRows.map(row=>Object.fromEntries(headers.map((h,i)=>[h,row[i]]))),normalized,'Every Ahrefs field preserved');
assert.equal(normalized.length,44);
const map=await readFile('docs/UTILITYPILOT-AHREFS-CONTENT-MAP-2026-09-28.md','utf8');
for(const r of normalized)assert.equal(map.split('\n').filter(line=>line.startsWith(`| ${r.Keyword} |`)).length,1,r.Keyword);

const base=process.env.AUDIT_BASE||'http://127.0.0.1:4173';
const browser=await chromium.launch({channel:'chrome'}),context=await browser.newContext({javaScriptEnabled:false}),page=await context.newPage();
const report={sourceRows:44,publishedExamples:examples.length+2,pages:[],fragmentLinks:0};
await mkdir('test-results/seo-content',{recursive:true});
try{
 const routes=JSON.parse(await readFile('dist/route-manifest.json','utf8'));
 const documents=new Map();
 for(const route of routes)documents.set(route.path,await readFile('dist'+route.path+'index.html','utf8'));
 for(const [path,html] of documents){
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,'Unique IDs: '+path);
  for(const [,href] of html.matchAll(/href="([^" ]*#[^" ]+)"/g)){
   if(!href.startsWith('/')&&!href.startsWith('#'))continue;
   const [target,id]=href.split('#'),targetHtml=documents.get(target||path);
   assert.ok(targetHtml?.includes(`id="${id}"`),`${path} -> ${href}`);report.fragmentLinks++;
  }
 }
 for(const [slug,c] of Object.entries(textContent)){
  const path=tools.find(t=>t.slug===slug).path;assert.equal((await page.goto(base+path)).status(),200);
  await expect(page.locator('h1')).toHaveText(c.h1);await expect(page).toHaveTitle(c.title);
  assert.equal(await page.locator('meta[name=description]').getAttribute('content'),c.description);
  for(const s of c.sections)await expect(page.locator('#'+s.id+' h2')).toHaveText(s.title);
  assert.ok(await page.evaluate(()=>Boolean(document.querySelector('.tool-workspace').compareDocumentPosition(document.querySelector('.tool-prose'))&Node.DOCUMENT_POSITION_FOLLOWING)),'Tool before content');
  // Browser-visible editorial text only; no menu/footer/TOC padding in the count.
  const body=await page.locator('.tool-prose > section').allTextContents();
  const wordCount=body.join(' ').trim().split(/\s+/).length;
  for(const width of [1280,390,320]){await page.setViewportSize({width,height:900});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${slug} overflow ${width}`);}
  for(const summary of await page.locator('#faqs summary').all()){await summary.click();await expect(summary.locator('..')).toHaveAttribute('open','');}
  report.pages.push({slug,path,editorialWords:wordCount,sections:c.sections.length,faqs:c.faqs.length,staticHTML:true,mobile:[320,390]});
 }
 const live=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];
 live.on('pageerror',error=>errors.push(error.message));live.on('console',msg=>{if(msg.type()==='error')errors.push(msg.text());});
 for(const [query,slug] of [['character counter','word-counter'],['line counter','word-counter'],['text analyzer','word-counter'],['title case converter','case-converter'],['alphabetize list','sort-lines'],['comma separated list','find-and-replace']]){
  await live.goto(base+'/tools/');await live.locator('#tool-search').fill(query);await expect(live.locator('.suggestion').first()).toHaveAttribute('href',`/tools/text/${slug}/`);
 }
 await live.goto(base+'/tools/text/word-counter/');await live.screenshot({path:'test-results/seo-content/counter-desktop.png'});
 await live.setViewportSize({width:390,height:844});await live.screenshot({path:'test-results/seo-content/counter-mobile.png'});
 await live.locator('#character-counter').scrollIntoViewIfNeeded();await live.screenshot({path:'test-results/seo-content/character-section-mobile.png'});
 await live.goto(base+'/tools/text/text-cleaner/#blank-lines');await live.screenshot({path:'test-results/seo-content/blank-lines-mobile.png'});
 await live.goto(base+'/tools/text/case-converter/#title-case');await live.screenshot({path:'test-results/seo-content/title-case-mobile.png'});
 assert.deepEqual(errors,[]);report.consoleErrors=errors;
 await writeFile('test-results/seo-content/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await browser.close();}
