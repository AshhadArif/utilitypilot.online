import test from 'node:test';
import {expansionConfigs} from '../src/data/expansion-configs.mjs';
import {newConfigs} from '../src/data/new-configs.mjs';
import assert from 'node:assert/strict';
import {runText} from '../src/lib/text.mjs';
import {runData,parseCSV,serializeCSV,parseJSON,formatJSON} from '../src/lib/data.mjs';
import {runWeb,parseColor,contrast} from '../src/lib/web.mjs';
import {imageHeader} from '../src/lib/image.mjs';
import {configs} from '../src/data/configs.mjs';
import tools from '../src/data/tools.json' with {type:'json'};
const defaults=slug=>Object.fromEntries(configs[slug].options.map(f=>[f.key,f.value]));
for(const t of tools.filter(t=>t.category!=='image'&&!newConfigs[t.slug]&&!expansionConfigs[t.slug])){
 test(t.slug+' accepts sample, handles empty and bounds oversized input',()=>{
  const run=t.category==='text'?runText:t.category==='data'?runData:runWeb,c=configs[t.slug],o=defaults(t.slug);
  const r=run(t.slug,c.sample,c.sampleB||'',o);assert.equal(typeof r.text,'string');assert.ok(r.summary);
  if(t.category==='text'&&t.slug!=='find-and-replace')assert.equal(typeof run(t.slug,'','',o).text,'string');else if(t.slug==='find-and-replace')assert.equal(run(t.slug,'','',o).text,'');else assert.throws(()=>run(t.slug,'','',o));
  assert.throws(()=>run(t.slug,'a'.repeat((t.category==='data'?5242880:t.slug==='text-diff'?262144:1048576)+1),'',o),/large|limit/i);
 });
}
test('graphemes, words, estimates and language limits',()=>{
 const r=runText('word-counter','Hello world!','',{wpm:200});assert.equal(r.stats.Words,2);assert.equal(r.stats['Characters (graphemes)'],12);assert.equal(r.stats['Estimated reading seconds'],1);
 const u=runText('word-counter','e\u0301');assert.equal(u.stats['Characters (graphemes)'],1);assert.equal(u.stats['Unicode code points'],2);assert.throws(()=>runText('word-counter','a','',{wpm:0}));
});
for(const [name,input,paragraphs,lineCount] of [
 ['empty','',0,0],['spaces','   ',0,1],['blank lines','\n\n',0,2],
 ['one block','A short draft.',1,1],['hard wrap','A short draft.\nIt has two lines.',1,2],
 ['blank separator','A short draft.\nIt has two lines.\n\nReview it carefully.',2,4],
 ['repeated separators','A\n\n\n\nB',2,5],['edge blanks','\n\nA\n\nB\n\n',2,6],
 ['space separator','A\n  \nB',2,3],['tab separator','A\n\t\nB',2,3],
 ['nonbreaking space separator','A\n\u00a0\nB',2,3],['CRLF separator','A\r\n\r\nB',2,3],
 ['CR separator','A\r\rB',2,3],['heading and body','Heading\n\nBody text.',2,3],
 ['list block','- apple\n- pear',1,2],['literal markup','<p>A</p><p>B</p>',1,1],
 ['emoji block','👩‍💻',1,1],['zero width is content','A\n\u200b\nB',1,3]
])test('paragraph count: '+name,()=>{
 const result=runText('word-counter',input);assert.equal(result.stats.Paragraphs,paragraphs);assert.equal(result.stats.Lines,lineCount);assert.ok(result.text.includes('Paragraphs: '+paragraphs));
});
test('adding paragraph count preserves existing metrics and input',()=>{
 const input='One two.\nThree four.',result=runText('word-counter',input);
 assert.deepEqual(result.stats,{Words:4,'Characters (graphemes)':20,'Characters without whitespace':17,'Unicode code points':20,Sentences:2,Lines:2,Paragraphs:1,'Estimated reading seconds':2});
 assert.equal(input,'One two.\nThree four.');
});
test('paragraph counting handles a bounded large sequence',()=>{
 const result=runText('word-counter','a\n\n'.repeat(10000));assert.equal(result.stats.Paragraphs,10000);assert.equal(result.stats.Words,10000);
});
test('cleanup keeps paragraphs and zero-width joiners by default',()=>{
 assert.equal(runText('text-cleaner','  A  useful\u00a0idea\nwrapped across lines.\n\n  A new paragraph.  ','',{join:'paragraphs'}).text,'A useful idea wrapped across lines.\n\nA new paragraph.');
 assert.equal(runText('text-cleaner','👨‍👩‍👧').text,'👨‍👩‍👧');assert.equal(runText('text-cleaner','a\r\nb').text,'a\nb');
});
test('line dedupe retains chosen original and correct occurrence order',()=>{
 assert.equal(runText('remove-duplicate-lines','a\nb\na').text,'a\nb');assert.equal(runText('remove-duplicate-lines','a\nb\na','',{keep:'last'}).text,'b\na');assert.equal(runText('remove-duplicate-lines',' A \na','',{trim:true,ignoreCase:true}).text,' A ');assert.equal(runText('remove-duplicate-lines','a\n').text,'a');
});
test('sorting has numeric validation, natural ordering and stability',()=>{
 assert.equal(runText('sort-lines','item10\nitem2\nitem1','',{mode:'natural'}).text,'item1\nitem2\nitem10');assert.equal(runText('sort-lines','10\n2\n-1','',{mode:'numeric'}).text,'-1\n2\n10');assert.throws(()=>runText('sort-lines','1\na','',{mode:'numeric'}));assert.equal(runText('sort-lines','aa\nbb\nc','',{mode:'length',descending:true}).text,'aa\nbb\nc');
});
test('case conversion follows locale',()=>{assert.equal(runText('case-converter','I','',{mode:'lower',locale:'tr'}).text,'ı');assert.equal(runText('case-converter','hELLO. wORLD!','',{mode:'sentence'}).text,'Hello. World!');});
test('literal replacement handles metacharacters, dollars and whole words',()=>{
 assert.equal(runText('find-and-replace','a.b aXb','',{find:'a.b',replacement:'$&'}).text,'$& aXb');assert.equal(runText('find-and-replace','cat scatter cat','',{find:'cat',replacement:'dog',whole:true}).text,'dog scatter dog');assert.throws(()=>runText('find-and-replace','abc','',{find:''}));
});
test('list comparison is membership not sequence',()=>{const r=runText('compare-lists','apple\npear\npear','pear\ncherry');assert.deepEqual(r.groups.Shared,['pear']);assert.deepEqual(r.groups['Only in A'],['apple']);assert.deepEqual(r.groups.Union,['apple','pear','cherry']);});
test('diff shows an insertion and detects equality',()=>{const r=runText('text-diff','The draft is ready.','The final draft is ready.',{mode:'word'});assert.ok(r.diff.some(p=>p.added&&p.value.includes('final')));assert.match(runText('text-diff','a','a').summary,/No differences/);});
test('CSV parser quotes, CRLF, BOM, multiline values and boundaries',()=>{
 assert.deepEqual(parseCSV('\ufeffa,b\r\n"x,y","two\nlines"\r\n'),[['a','b'],['x,y','two\nlines']]);assert.deepEqual(parseCSV('a,b\n"a""b",c'),[['a','b'],['a"b','c']]);assert.deepEqual(parseCSV('a,b\n,'),[['a','b'],['','']]);assert.throws(()=>parseCSV('a,b\n"x,y'));assert.throws(()=>parseCSV('a,b\n1'));assert.throws(()=>parseCSV('a,b\n"x"z,1'));assert.throws(()=>parseCSV('a,b\nq"z,1'));
});
test('CSV serialization round trips values in raw mode',()=>{
 const rows=[['name','note'],['Ada','one,two'],['Sam','He said "yes"\nnext'],['00123','']];for(const d of [',',';','\t','|'])assert.deepEqual(parseCSV(serializeCSV(rows,d,{safe:false}).text,d),rows);
 assert.equal(serializeCSV([['=1+1','plain']],',').escaped,1);assert.match(serializeCSV([['=1+1']],',').text,/^'/);
});
test('CSV/JSON conversion preserves leading zeros and large numbers',()=>{
 assert.deepEqual(JSON.parse(runData('csv-to-json','id,name\n00123,Ada').text),[{id:'00123',name:'Ada'}]);
 const typed=runData('csv-to-json','id,active\n9007199254740993,true','',{types:true}).text;assert.ok(typed.includes('9007199254740993'));assert.ok(typed.includes('true'));
 assert.throws(()=>runData('csv-to-json','a,a\n1,2'),/Duplicate/);assert.deepEqual(JSON.parse(runData('csv-to-json','a,b\nc,d','',{header:false}).text),[['a','b'],['c','d']]);
});
test('JSON AST preserves tokens, rejects duplicates/syntax and bounds depth',()=>{
 const input='{"10":1,"2":9007199254740993,"str":"a b","float":1e+100}';assert.equal(formatJSON(parseJSON(input),0),input);assert.throws(()=>parseJSON('{"a":1,"a":2}'),/Duplicate/);assert.throws(()=>parseJSON('{"a":1,}'));assert.throws(()=>parseJSON('{"a":"bad\nstring"}'));assert.throws(()=>parseJSON('['.repeat(52)+'0'+']'.repeat(52)),/nesting/);assert.throws(()=>parseJSON('01'));assert.throws(()=>parseJSON('truefalse'));assert.equal(formatJSON(parseJSON('"hello"'),2),'"hello"');
});
test('nested JSON flattening does not overwrite dot collisions or expand arrays',()=>{
 const r=runData('json-to-csv','[{"id":"00123","a":{"b":2},"tags":[1,2]},{"id":"2"}]','',{flatten:true,safe:false});assert.deepEqual(parseCSV(r.text),[['id','a.b','tags'],['00123','2','[1,2]'],['2','','']]);assert.throws(()=>runData('json-to-csv','[{"a.b":1,"a":{"b":2}}]','',{flatten:true}),/collision/);assert.throws(()=>runData('json-to-csv','[]'));assert.throws(()=>runData('json-to-csv','[1]'));
});
test('CSV dedupe uses tuple keys and last occurrence retention',()=>{const r=runData('csv-deduplicate','id,name\n1,Ada\n2,Sam\n1,New','',{columns:'1',keep:'last'});assert.equal(r.text,'id,name\n2,Sam\n1,New');});
test('column selection, reordering and invalid schemas',()=>{assert.equal(runData('csv-column-editor','id,name\n00123,Ada','',{columnConfig:[{index:1,name:'person',keep:true},{index:0,name:'code',keep:true}]}).text,'person,code\nAda,00123');assert.throws(()=>runData('csv-column-editor','a,b\n1,2','',{columnConfig:[]}));assert.throws(()=>runData('csv-column-editor','a,b\n1,2','',{columnConfig:[{index:0,name:'x',keep:true},{index:1,name:'x',keep:true}]}));});
test('CSV merge and split count records, not physical lines',()=>{
 const a='id,note\n1,"two\nlines"',b='id,note\n2,hello';const merged=runData('csv-merge',a,b);assert.equal(parseCSV(merged.text).length,3);assert.throws(()=>runData('csv-merge',a,'note,id\na,1'),/headers/);assert.equal(runData('csv-merge',a,'id,note').table.total,1);
 const split=runData('csv-split',merged.text,'',{rowsPerPart:1});assert.equal(split.parts.length,2);assert.equal(parseCSV(split.parts[0].text)[1][1],'two\nlines');assert.throws(()=>runData('csv-split',merged.text,'',{rowsPerPart:0}));
});
test('slug behavior is explicit for ASCII and Unicode',()=>{assert.equal(runWeb('slug-generator','Café notes: A Better Workflow!').text,'cafe-notes-a-better-workflow');assert.equal(runWeb('slug-generator','你好 世界','',{mode:'unicode'}).text,'你好-世界');assert.throws(()=>runWeb('slug-generator','你好'));});
test('URL parsing preserves repeated keys, modes, credentials redaction and strict encoding',()=>{
 const r=JSON.parse(runWeb('url-parser','https://name:secret@example.com/?a=1&a=2&q=a+b').text);assert.deepEqual(r.parameters,[['a','1'],['a','2'],['q','a b']]);assert.ok(!JSON.stringify(r).includes('secret'));assert.deepEqual(JSON.parse(runWeb('url-parser','?q=a+b','',{mode:'query',form:false}).text).parameters,[['q','a+b']]);assert.throws(()=>runWeb('url-parser','https://example.com/?a=%FF'));assert.throws(()=>runWeb('url-parser','javascript:alert(1)'));
});
test('URL codec round trip and single decode layer',()=>{const encoded=runWeb('url-encoder-decoder','green tea + mint').text;assert.equal(encoded,'green%20tea%20%2B%20mint');assert.equal(runWeb('url-encoder-decoder',encoded,'',{action:'decode'}).text,'green tea + mint');assert.equal(runWeb('url-encoder-decoder','%2520','',{action:'decode'}).text,'%20');assert.throws(()=>runWeb('url-encoder-decoder','%ZZ','',{action:'decode'}));});
test('UTM keeps unrelated fields, replaces UTM and preserves fragments',()=>{const r=runWeb('utm-builder','https://example.com/?a=1&utm_source=old#read','',{source:'new',medium:'email',campaign:'test'});const u=new URL(r.text);assert.equal(u.searchParams.get('a'),'1');assert.equal(u.searchParams.get('utm_source'),'new');assert.equal(u.hash,'#read');assert.throws(()=>runWeb('utm-builder','https://example.com/','',{}));});
test('URL cleaner preserves unknown raw spelling and supports deselection',()=>{assert.equal(runWeb('url-cleaner','https://example.com/?q=a%20b&sig=x%2fy&utm_source=a#read').text,'https://example.com/?q=a%20b&sig=x%2fy#read');assert.ok(runWeb('url-cleaner','https://example.com/?utm_source=a','',{utm_source:false}).text.includes('utm_source'));});
test('color conversion, hue wrap, alpha and range errors',()=>{assert.equal(runWeb('color-converter','#f00').stats.RGB,'rgb(255 0 0)');assert.equal(runWeb('color-converter','hsl(360 100% 50%)').stats.HEX,'#ff0000');assert.equal(parseColor('#0008')[3],136/255);assert.throws(()=>parseColor('rgb(256 0 0)'));assert.throws(()=>parseColor('red'));});
test('contrast formula and exact threshold behavior',()=>{assert.equal(contrast(parseColor('#000'),parseColor('#fff')),21);assert.equal(contrast(parseColor('#fff'),parseColor('#fff')),1);assert.throws(()=>contrast(parseColor('#0008'),parseColor('#fff')));assert.equal(runWeb('contrast-checker','#777','#fff').stats['AA normal text'],'Fail');});
test('Base64 UTF-8, URL-safe, malformed padding and binary bytes',()=>{
 assert.equal(runWeb('base64','Hello').text,'SGVsbG8=');const encoded=runWeb('base64','世界 👋').text;assert.equal(runWeb('base64',encoded,'',{action:'decode'}).text,'世界 👋');assert.equal(runWeb('base64','SGVsbG8','',{action:'decode',urlSafe:true}).text,'Hello');assert.throws(()=>runWeb('base64','SGVsbG8','',{action:'decode'}));assert.throws(()=>runWeb('base64','Zh==','',{action:'decode'}));assert.equal(runWeb('base64','/w==','',{action:'decode'}).bytes[0],255);
});
test('entities render plain strings and decode only one layer',()=>{assert.equal(runWeb('html-entities','Tea & coffee').text,'Tea &amp; coffee');assert.equal(runWeb('html-entities','&lt;script&gt;','',{action:'decode'}).text,'<script>');assert.equal(runWeb('html-entities','&amp;lt;','',{action:'decode'}).text,'&lt;');});
test('image header rejects unknown, empty and huge images before decode',()=>{assert.throws(()=>imageHeader(new Uint8Array()));const b=new Uint8Array(24);b.set([137,80,78,71]);const d=new DataView(b.buffer);d.setUint32(16,10000);d.setUint32(20,10000);assert.throws(()=>imageHeader(b),/megapixels/);});
