import {guard,result} from './common.mjs';
export function convertUnicode(a='',o={}){
 guard(a,262144);
 const action=o.action||'encode',format=o.format||'escapes';
 if(!['encode','decode'].includes(action)||!['escapes','points'].includes(format))throw Error('Choose a supported operation and notation.');
 if(!a.isWellFormed())throw Error('Input contains an unpaired Unicode surrogate. Correct the source text.');
 let text;
 if(action==='encode')text=format==='escapes'?a.split('').map(c=>'\\u'+c.charCodeAt(0).toString(16).padStart(4,'0')).join(''):[...a].map(c=>'U+'+c.codePointAt(0).toString(16).toUpperCase().padStart(4,'0')).join(' ');
 else if(format==='points'){
  const tokens=a.trim()?a.trim().split(/\s+/):[];
  text=tokens.map(t=>{if(!/^U\+[\da-f]{4,6}$/i.test(t))throw Error('Use whitespace-separated code points such as U+0041 U+1F44B.');const n=parseInt(t.slice(2),16);if(n>0x10ffff||(n>=0xd800&&n<=0xdfff))throw Error('Code points must be Unicode scalar values: U+0000–U+10FFFF, excluding surrogates.');return String.fromCodePoint(n);}).join('');
 }else{
  // Decode one layer. No eval and no interpretation of arbitrary language syntax.
  text='';for(let i=0;i<a.length;){
   if(a[i]!=='\\'){text+=a[i++];continue;}
   const m=/^\\u([\da-f]{4})/i.exec(a.slice(i,i+6));
   if(!m)throw Error('Each backslash must begin a four-digit \\uXXXX escape. Encode a literal backslash as \\u005c.');
   text+=String.fromCharCode(parseInt(m[1],16));i+=6;
  }
  if(!text.isWellFormed())throw Error('Escapes contain an unpaired surrogate. Emoji outside the basic plane need a complete high/low surrogate pair.');
 }
 const decoded=action==='encode'?a:text;
 return result(text,`${action==='encode'?'Encoded':'Decoded'} one layer. No normalization or character replacement was applied.`,{filename:'unicode.txt',stats:{'Unicode code points':[...decoded].length,'UTF-16 units':decoded.length,'UTF-8 bytes':new TextEncoder().encode(decoded).length}});
}
