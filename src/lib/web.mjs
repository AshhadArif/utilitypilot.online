import {decodeHTML,encodeHTML} from 'entities';
import {guard,required,number,result} from './common.mjs';
export function parseColor(s){
 s=String(s).trim();let rgba;
 if(/^#[\da-f]{3,8}$/i.test(s)){
  let h=s.slice(1);if(h.length===3||h.length===4)h=[...h].map(c=>c+c).join('');if(h.length!==6&&h.length!==8)throw Error('HEX needs 3, 4, 6 or 8 digits.');
  rgba=[parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16),h.length===8?parseInt(h.slice(6),16)/255:1];
 }else {
  const m=/^(rgba?|hsla?)\(([^)]+)\)$/i.exec(s);if(!m)throw Error('Enter a HEX, rgb() or hsl() color. Named colors and other color spaces are not supported.');
  const body=m[2].trim();
  if(body.includes('/')&&(body.split('/').length!==2||body.split('/')[0].trim().split(/\s+/).length!==3||/\s/.test(body.split('/')[1].trim())))throw Error('Place / alpha after all three space-separated color channels.');
  if(body.includes(',')&&(body.includes('/')||body.split(',').some(v=>!v.trim()||/\s/.test(v.trim()))))throw Error('Use comma-separated channels or space-separated channels with / alpha; do not mix separators or leave a channel empty.');
  const values=body.includes(',')?body.split(',').map(v=>v.trim()):body.split(/\s*\/\s*|\s+/);
  if(values.length<3||values.length>4||values.some(v=>!v)||(!body.includes(',')&&((body.match(/\//g)||[]).length>1||(values.length===4&&!body.includes('/')))))throw Error('Use three color channels and an optional alpha value after / in space-separated notation.');
  const val=(x,label,max)=>{if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?%?$/i.test(x))throw Error(`${label} must use decimal notation.`);return x.endsWith('%')?number(x.slice(0,-1),label,0,100)/100*max:number(x,label,0,max);};
  const alpha=values[3]===undefined?1:val(values[3],'Alpha',1);
  if(m[1].toLowerCase().startsWith('rgb'))rgba=[...values.slice(0,3).map(x=>val(x,'RGB channel',255)),alpha];
  else {
   const hueText=values[0].replace(/deg$/i,''),hue=Number(hueText);if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(hueText)||!Number.isFinite(hue))throw Error('Hue must be a finite decimal number of degrees.');
   if(!values[1].endsWith('%')||!values[2].endsWith('%'))throw Error('HSL saturation and lightness need percent signs.');
   const h=((hue%360)+360)%360/60,s=val(values[1],'Saturation',1),l=val(values[2],'Lightness',1),c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs(h%2-1)),n=l-c/2;
   const rgb=h<1?[c,x,0]:h<2?[x,c,0]:h<3?[0,c,x]:h<4?[0,x,c]:h<5?[x,0,c]:[c,0,x];rgba=[...rgb.map(v=>(v+n)*255),alpha];
  }
 }return rgba;
}
export function colors(rgba){
 const [r,g,b,a]=rgba, rgb=[r,g,b].map(v=>Math.round(v)),[R,G,B]=rgb.map(v=>v/255),max=Math.max(R,G,B),min=Math.min(R,G,B),d=max-min,l=(max+min)/2;
 let h=d===0?0:max===R?60*(((G-B)/d)%6):max===G?60*((B-R)/d+2):60*((R-G)/d+4);if(h<0)h+=360;const s=d===0?0:d/(1-Math.abs(2*l-1));
 const hex='#'+rgb.map(v=>v.toString(16).padStart(2,'0')).join('')+(a<1?Math.round(a*255).toString(16).padStart(2,'0'):'');
 return {HEX:hex,RGB:`rgb(${rgb.join(' ')}${a<1?' / '+Number(a.toFixed(4)):''})`,HSL:`hsl(${Number(h.toFixed(2))} ${Number((s*100).toFixed(2))}% ${Number((l*100).toFixed(2))}%${a<1?' / '+Number(a.toFixed(4)):''})`};
}
export function contrast(a,b){
 if(a[3]!==1||b[3]!==1)throw Error('Use opaque colors. Composite transparent colors against their actual background first.');
 const luminance=c=>c.slice(0,3).map(v=>{v/=255;return v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4;}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
 const A=luminance(a),B=luminance(b);return (Math.max(A,B)+.05)/(Math.min(A,B)+.05);
}
function httpURL(s){let u;try{u=new URL(s);}catch{throw Error('Enter a complete URL beginning with https:// or http://.');}if(!['https:','http:'].includes(u.protocol))throw Error('Only HTTP and HTTPS links are supported.');if(!/^https?:\/\/[^/\\\s]/i.test(s)||/[\\\x00-\x20\x7f]/.test(s))throw Error('Use a complete HTTP(S) URL with two slashes. Encode spaces and control characters, and replace backslashes.');return u;}
function strictDecode(s,form=false){try{return decodeURIComponent(form?s.replace(/\+/g,' '):s);}catch{throw Error('Invalid percent escape or UTF-8 sequence. Use complete percent-encoded bytes.');}}
export const tracking=['utm_source','utm_medium','utm_campaign','utm_term','utm_content','utm_id','gclid','fbclid','msclkid'];
export function runWeb(slug,a='',b='',o={}){
 guard(a);guard(b);required(a);
 if(slug==='slug-generator'){
  let text=a.normalize('NFKC').toLocaleLowerCase(o.locale||'en');const separator=o.separator==='_'?'_':'-';
  if(o.mode!=='unicode')text=text.replace(/ß/g,'ss').replace(/æ/g,'ae').replace(/œ/g,'oe').replace(/ø/g,'o').replace(/ł/g,'l').normalize('NFKD').replace(/\p{M}/gu,'').replace(/[^a-z0-9]+/g,separator);
  else text=text.replace(/[^\p{L}\p{M}\p{N}]+/gu,separator);
  text=text.replace(/^[-_]+|[-_]+$/g,'');if(!text)throw Error('No supported characters remain. Try Unicode mode or enter a descriptive title.');return result(text,'Slug generated. Check availability and meaning in your publishing system.');
 }
 if(slug==='url-parser'){
  let query=a,components={};if(o.mode!=='query'){const u=httpURL(a.trim());components={scheme:u.protocol,hostname:u.hostname,port:u.port||'(default)',path:u.pathname,fragment:u.hash,credentials:u.username||u.password?'Present (redacted)':'None'};query=u.search;}
  query=query.replace(/^\?/,'');const pairs=query?query.split('&').map(part=>{const i=part.indexOf('='),k=i<0?part:part.slice(0,i),v=i<0?'':part.slice(i+1);return [strictDecode(k,o.form!==false),strictDecode(v,o.form!==false)];}):[];
  return result(JSON.stringify({components,parameters:pairs},null,2),`${pairs.length} parameter pairs. Repeated keys keep their original order.`,{filename:'url-components.json',table:{headers:['Parameter','Value'],rows:pairs.slice(0,50),total:pairs.length}});
 }
 if(slug==='url-encoder-decoder'){
  let text;if(o.action==='decode')text=strictDecode(a,o.mode==='form');else {try{text=encodeURIComponent(a).replace(/[!'()*]/g,c=>'%'+c.charCodeAt(0).toString(16).toUpperCase());}catch{throw Error('Input contains an unpaired Unicode surrogate. Replace the damaged character.');}if(o.mode==='form')text=text.replace(/%20/g,'+');}
  return result(text,`${o.action==='decode'?'Decoded':'Encoded'} one layer in ${o.mode==='form'?'form':'component'} mode.`);
 }
 if(slug==='utm-builder'){
  const u=httpURL(a.trim());if(u.username||u.password)throw Error('Remove embedded credentials before building a campaign link.');const changed=[];
  for(const key of ['source','medium','campaign','term','content']){const v=String(o[key]||'').trim();if(['source','medium','campaign'].includes(key)&&!v)throw Error(`Enter the campaign ${key}.`);if(v){if(u.searchParams.has('utm_'+key))changed.push(key);u.searchParams.set('utm_'+key,v);}}
  return result(u.href,`Campaign link ready. ${changed.length?'Replaced existing '+changed.join(', ')+'.':'Unrelated parameters and the fragment are retained.'}`,{table:{headers:['Parameter','Value'],rows:[...u.searchParams],total:[...u.searchParams].length}});
 }
 if(slug==='url-cleaner'){
  const u=httpURL(a.trim());if(u.username||u.password)throw Error('Remove embedded credentials before cleaning a shareable link.');const allowed=tracking.filter(k=>o[k]!==false),removed=[];
  const raw=u.search.slice(1);const kept=raw?raw.split('&').filter(part=>{const rawKey=part.split('=')[0],k=strictDecode(rawKey,true);if(allowed.includes(k)){removed.push(k);return false;}return true;}):[];
  u.search=kept.length?'?'+kept.join('&'):'';
  return result(u.href,`${removed.length} tracking fields removed${removed.length?': '+removed.join(', '):''}. Unknown parameters remain. Signed links can still break; test the destination yourself.`);
 }
 if(slug==='color-converter'){const values=colors(parseColor(a));return result(Object.entries(values).map(([k,v])=>k+': '+v).join('\n'),'Converted in sRGB; RGB channels rounded to the nearest byte.',{stats:values,swatch:values.HEX});}
 if(slug==='contrast-checker'){
  required(b,'Background color');const foreground=parseColor(a),background=parseColor(b),ratio=contrast(foreground,background),size=number(o.size??16,'Font size (pixels)',1,300),large=size>=24||(o.bold&&size>=14*96/72);
  const stats={'Contrast ratio':ratio.toFixed(2)+':1','AA normal text':ratio>=4.5?'Pass':'Fail','AA large text':ratio>=3?'Pass':'Fail','AAA normal text':ratio>=7?'Pass':'Fail','AAA large text':ratio>=4.5?'Pass':'Fail','Selected text AA':ratio>=(large?3:4.5)?'Pass':'Fail'};
  return result(Object.entries(stats).map(([k,v])=>k+': '+v).join('\n'),`${ratio.toFixed(2)}:1 contrast · ${large?'large':'normal'} text. A color-pair check is not a complete accessibility audit.`,{stats,contrast:{foreground:a.trim(),background:b.trim(),size,bold:!!o.bold}});
 }
 if(slug==='base64'){
  const encode=bytes=>{let binary='';for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));return btoa(binary);};
  if(o.action!=='decode'){let text=encode(new TextEncoder().encode(a));if(o.urlSafe)text=text.replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');return result(text,'UTF-8 bytes encoded. Base64 is a representation, not encryption.');}
  let s=a.trim();if(o.urlSafe){if(!/^[A-Za-z0-9_-]*={0,2}$/.test(s))throw Error('Invalid Base64URL alphabet or padding.');s=s.replace(/-/g,'+').replace(/_/g,'/');if(!s.includes('='))s+='='.repeat((4-s.length%4)%4);}
  if(!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(s)||!s)throw Error('Invalid Base64. Standard Base64 requires complete groups and correct padding.');
  const bytes=Uint8Array.from(atob(s),c=>c.charCodeAt(0));if(encode(bytes)!==s)throw Error('Noncanonical Base64 padding bits. Check the encoded input.');
  try{return result(new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(bytes),`${bytes.length} bytes decoded as UTF-8.`,{bytes,filename:'decoded.txt'});}catch{return result([...bytes.slice(0,64)].map(v=>v.toString(16).padStart(2,'0')).join(' '),'Decoded bytes are not valid UTF-8. Hex preview only; download preserves the original bytes.',{bytes,filename:'decoded.bin'});}
 }
 if(slug==='html-entities'){
  let text;if(o.action==='decode')text=decodeHTML(a);else if(o.numeric)text=[...a].map(c=>/[&<>"']|[^\x20-\x7e]/u.test(c)?'&#'+c.codePointAt(0)+';':c).join('');else text=encodeHTML(a);
  return result(text,`${o.action==='decode'?'Decoded':'Encoded'} one layer. Output is plain text, not executable or sanitized HTML.`);
 }
 throw Error('Unknown web tool.');
}
