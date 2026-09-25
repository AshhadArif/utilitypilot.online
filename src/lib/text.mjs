import {diffLines,diffWordsWithSpace} from 'diff';
import {guard,required,number,lines,key,result,LIMITS} from './common.mjs';
// Compare decimal spellings without rounding them through binary floating point.
function decimal(value){
 const m=/^([+-]?)(?:(\d+)(?:\.(\d*))?|\.(\d+))(?:[eE]([+-]?\d+))?$/.exec(value.trim());
 if(!m||!Number.isFinite(Number(value))||!Number.isSafeInteger(Number(m[5]||0)))throw Error('Numeric sort needs a finite decimal number on every line with a safe integer exponent. Remove blank, hexadecimal or nonnumeric lines.');
 const fraction=m[3]??m[4]??'',digits=((m[2]||'')+fraction).replace(/^0+/,'');
 return {sign:digits?(m[1]==='-'?-1:1):0,digits:digits.replace(/0+$/,''),power:digits.length-fraction.length+Number(m[5]||0)};
}
function compareDecimal(a,b){if(a.sign!==b.sign)return a.sign-b.sign;if(!a.sign)return 0;const length=Math.max(a.digits.length,b.digits.length),A=a.digits.padEnd(length,'0'),B=b.digits.padEnd(length,'0');return a.sign*(a.power-b.power||(A<B?-1:A>B?1:0));}
export function runText(slug,a='',b='',o={}){
 guard(a,slug==='text-diff'?LIMITS.diff:LIMITS.text);guard(b,slug==='text-diff'?LIMITS.diff:LIMITS.text);
 const locale=o.locale||'en';
 if(slug==='word-counter'){
  let words=0,graphemes=0,withoutWhitespace=0;
  for(const s of new Intl.Segmenter(locale,{granularity:'word'}).segment(a))if(s.isWordLike)words++;
  for(const s of new Intl.Segmenter(locale,{granularity:'grapheme'}).segment(a)){graphemes++;if(!/^\s+$/u.test(s.segment))withoutWhitespace++;}
  const speed=number(o.wpm??200,'Reading speed',1,2000);
  const stats={Words:words,'Characters (graphemes)':graphemes,'Characters without whitespace':withoutWhitespace,'Unicode code points':[...a].length,Sentences:a.trim()?[...new Intl.Segmenter(locale,{granularity:'sentence'}).segment(a)].length:0,Lines:lines(a).length,'Estimated reading seconds':Math.ceil(words/speed*60)};
  return result(Object.entries(stats).map(([k,v])=>`${k}: ${v}`).join('\n'),`${words} words · ${graphemes} visible characters`,{stats});
 }
 if(slug==='text-cleaner'){
  let text=a;const stats={};
  const replace=(label,re,value)=>{let count=0;text=text.replace(re,(...args)=>{count++;return typeof value==='function'?value(...args):value;});stats[label]=count;};
  replace('Line endings normalized',/\r\n?/g,'\n');
  if(o.nbsp!==false)replace('Non-breaking spaces replaced',/\u00a0/g,' ');
  if(o.tabs)replace('Tabs replaced',/\t/g,' ');
  if(o.trim!==false)replace('Line edges trimmed',/^[ \t]+|[ \t]+$/gm,'');
  if(o.spaces!==false)replace('Repeated spaces collapsed',/ {2,}/g,' ');
  if(o.blank)replace('Extra blank lines collapsed',/\n{3,}/g,'\n\n');
  if(o.join==='paragraphs')replace('Hard wraps joined',/([^\n])\n(?=[^\n])/g,(_,c)=>c+' ');
  if(o.join==='all')replace('Line breaks joined',/\n+/g,' ');
  if(o.zeroWidth)replace('Zero-width characters removed',/[\u200b\u200c\u200d\ufeff]/g,'');
  return result(text,`${Object.values(stats).reduce((x,y)=>x+y,0)} cleanup matches changed. Original input retained.`,{stats});
 }
 if(slug==='remove-duplicate-lines'){
  const rows=lines(a), seen=new Set(),out=[];const ordered=o.keep==='last'?[...rows].reverse():rows;
  for(const row of ordered){const k=key(row,o);if(!seen.has(k)){seen.add(k);out.push(row);}}
  if(o.keep==='last')out.reverse();return result(out.join('\n'),`${out.length} lines retained · ${rows.length-out.length} duplicates removed`);
 }
 if(slug==='sort-lines'){
  const rows=lines(a);const mode=o.mode||'alphabetical';
  const numeric=mode==='numeric'?new Map(rows.map(s=>[s,decimal(s)])):null;
  if(mode==='reverse')rows.reverse();else {const compare=new Intl.Collator(locale,{numeric:mode==='natural',sensitivity:o.ignoreCase?'accent':'variant'}).compare;rows.sort((a,b)=>{const v=mode==='numeric'?compareDecimal(numeric.get(a),numeric.get(b)):mode==='length'?[...a].length-[...b].length:compare(a,b);return o.descending?-v:v;});}
  return result(rows.join('\n'),`${rows.length} lines · ${mode} order. Equal sort keys retain their original order.`);
 }
 if(slug==='case-converter'){
  const lower=a.toLocaleLowerCase(locale);let out=lower;
  if(o.mode==='upper')out=a.toLocaleUpperCase(locale);
  else if(o.mode==='title')out=[...new Intl.Segmenter(locale,{granularity:'word'}).segment(lower)].map(s=>s.isWordLike?s.segment.replace(/^\p{L}/u,c=>c.toLocaleUpperCase(locale)):s.segment).join('');
  else if(o.mode==='sentence')out=lower.replace(/(^|[.!?。！？]\s+)([^\p{L}\p{N}]*)(\p{L})/gu,(_,boundary,prefix,letter)=>boundary+prefix+letter.toLocaleUpperCase(locale));
  return result(out,'Case conversion complete. Review names and acronyms before use.');
 }
 if(slug==='find-and-replace'){
  if(!o.find)throw Error('Enter the literal text you want to find.');
  const escaped=o.find.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const pattern=o.whole?`(?<![\\p{L}\\p{M}\\p{N}_])${escaped}(?![\\p{L}\\p{M}\\p{N}_])`:escaped;
  const expression=new RegExp(pattern,o.ignoreCase?'giu':'gu'),replacement=o.replacement||'',encoder=new TextEncoder();guard(replacement);let count=0,outputBytes=encoder.encode(a).length;const replacementBytes=encoder.encode(replacement).length;
  for(const match of a.matchAll(expression)){count++;outputBytes+=replacementBytes-encoder.encode(match[0]).length;if(outputBytes>LIMITS.output)throw Error('Replacement output would exceed 20 MiB. Use a smaller input or replacement.');}
  const out=a.replace(expression,()=>replacement);
  return result(out,`${count} non-overlapping matches replaced. Replacement text is literal.`);
 }
 if(slug==='compare-lists'){
  const left=lines(a),right=lines(b),A=new Map(),B=new Map();
  left.forEach(s=>{if(!A.has(key(s,o)))A.set(key(s,o),s);});right.forEach(s=>{if(!B.has(key(s,o)))B.set(key(s,o),s);});
  const groups={'Shared': [...A].filter(([k])=>B.has(k)).map(([,v])=>v),'Only in A':[...A].filter(([k])=>!B.has(k)).map(([,v])=>v),'Only in B':[...B].filter(([k])=>!A.has(k)).map(([,v])=>v),'Union':[...A.values(),...[...B].filter(([k])=>!A.has(k)).map(([,v])=>v)]};
  const selection=o.view||'Shared';return result(groups[selection].join('\n'),`${groups.Shared.length} shared · ${left.length-A.size} duplicates in A · ${right.length-B.size} duplicates in B`,{groups,stats:Object.fromEntries(Object.entries(groups).map(([k,v])=>[k,v.length]))});
 }
 if(slug==='text-diff'){
  if(o.ignoreWhitespace){a=a.replace(/\r\n?/g,'\n').replace(/[ \t]+/g,' ').replace(/^ | $/gm,'');b=b.replace(/\r\n?/g,'\n').replace(/[ \t]+/g,' ').replace(/^ | $/gm,'');}
  const parts=(o.mode==='word'?diffWordsWithSpace:diffLines)(a,b,{timeout:1500,maxEditLength:10000});
  if(!parts)throw Error('These versions differ too much for a bounded comparison. Compare smaller sections.');
  return result(parts.map(p=>`${p.added?'+ Added: ':p.removed?'- Removed: ':'  Unchanged: '}${p.value}`).join('\n'),parts.some(p=>p.added||p.removed)?'Differences found. This compares text, not meaning.':'No differences found.',{diff:parts});
 }
 throw Error('Unknown text tool.');
}
