import {guard,required,integer,result} from './common.mjs';

const jsonResult=(value,summary,filename)=>result(JSON.stringify(value,null,2),summary,{filename,mime:'application/json;charset=utf-8'});
function base64url(s,label,empty=false){
 if((!s&&!empty)||!/^[A-Za-z0-9_-]*$/.test(s)||s.length%4===1)throw Error(`${label} is not unpadded Base64URL.`);
 let raw;try{raw=atob(s.replaceAll('-','+').replaceAll('_','/')+'='.repeat((4-s.length%4)%4));}catch{throw Error(`${label} could not be decoded as Base64URL.`);}
 if(btoa(raw).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'')!==s)throw Error(`${label} has invalid Base64URL padding bits.`);
 return Uint8Array.from(raw,c=>c.charCodeAt(0));
}

export function timestamp(a,o={}){
 required(a,'Timestamp or date');const s=a.trim();let ms;
 if((o.direction||'toDate')==='toDate'){
  if(!/^-?\d+$/.test(s)||s.length>18)throw Error('Enter a whole-number timestamp, without commas or an exponent.');
  if(!['seconds','milliseconds'].includes(o.unit||'seconds'))throw Error('Choose seconds or milliseconds.');
  const n=BigInt(s)*(o.unit==='milliseconds'?1n:1000n);
  if(n < -8640000000000000n||n>8640000000000000n)throw Error('Timestamp is outside the supported date range.');
  ms=Number(n);
 }else if(o.direction==='toTimestamp'){
  const m=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?(Z|[+-]\d{2}:\d{2})$/.exec(s);
  if(!m)throw Error('Use YYYY-MM-DDTHH:mm:ss[.SSS]Z or an explicit offset such as +05:00.');
  const [y,mo,d,h,mi,se]=m.slice(1,7).map(Number),fraction=Number((m[7]||'').padEnd(3,'0'));
  const date=new Date(0);date.setUTCFullYear(y,mo-1,d);date.setUTCHours(h,mi,se,fraction);
  if(mo<1||mo>12||d<1||h>23||mi>59||se>59||date.getUTCFullYear()!==y||date.getUTCMonth()!==mo-1||date.getUTCDate()!==d)throw Error('Invalid calendar date or time. Leap seconds and 24:00 are not supported.');
  let offset=0;if(m[8]!=='Z'){const oh=Number(m[8].slice(1,3)),om=Number(m[8].slice(4));if(oh>23||om>59||m[8]==='-00:00')throw Error('Use a known UTC offset with hours 00–23 and minutes 00–59; -00:00 is unspecified.');offset=(oh*60+om)*60000*(m[8][0]==='-'?-1:1);}
  ms=date.getTime()-offset;
 }else throw Error('Choose a supported conversion direction.');
 const magnitude=BigInt(ms<0?-ms:ms),fraction=String(magnitude%1000n).padStart(3,'0').replace(/0+$/,'');
 const seconds=(ms<0?'-':'')+String(magnitude/1000n)+(fraction?'.'+fraction:'');
 return jsonResult({utc:new Date(ms).toISOString(),unixSeconds:seconds,unixMilliseconds:String(ms)},'One instant in UTC. Epoch values are decimal strings to preserve every digit; no local timezone is assumed.','timestamp.json');
}

export async function runDeveloper(slug,a='',b='',o={}){
 guard(a);guard(b);
 if(slug==='uuid-generator'){
  const count=integer(o.count??1,'UUID count',1,100);
  if(!globalThis.crypto?.randomUUID)throw Error('UUID generation requires Web Crypto in an HTTPS browser or localhost.');
  const ids=Array.from({length:count},()=>crypto.randomUUID());
  return result(ids.join('\n'),`${count} random version-4 UUID${count===1?'':'s'} generated.`,{filename:'uuids.txt',stats:{Version:4,Generated:count}});
 }
 if(slug==='hash-generator'){
  const algorithm=o.algorithm||'SHA-256';if(!['SHA-256','SHA-384','SHA-512'].includes(algorithm))throw Error('Choose SHA-256, SHA-384 or SHA-512.');
  if(!globalThis.crypto?.subtle)throw Error('Hashing requires Web Crypto in an HTTPS browser or localhost.');
  if(!a.isWellFormed())throw Error('Text contains an unpaired Unicode surrogate. Correct it before hashing UTF-8.');
  const bytes=new TextEncoder().encode(a);let digest;try{digest=await crypto.subtle.digest(algorithm,bytes);}catch{throw Error('The browser could not calculate this digest. Try a supported HTTPS browser.');}
  return result([...new Uint8Array(digest)].map(n=>n.toString(16).padStart(2,'0')).join(''),`${algorithm} of ${bytes.length} UTF-8 bytes. Spaces and line breaks are included.`,{filename:algorithm.toLowerCase()+'.txt',stats:{Algorithm:algorithm,'Input bytes':bytes.length,'Digest bits':digest.byteLength*8}});
 }
 if(slug==='number-base-converter'){
  required(a,'Integer');const base=Number(o.base||10);if(![2,8,10,16].includes(base))throw Error('Choose binary, octal, decimal or hexadecimal.');
  let s=a.trim(),negative=s.startsWith('-');if(/^[+-]/.test(s))s=s.slice(1);
  const prefix=/^0([box])/i.exec(s);if(prefix){if(({b:2,o:8,x:16})[prefix[1].toLowerCase()]!==base)throw Error('The prefix does not match the selected input base.');s=s.slice(2);}
  if(!s||s.length>4096)throw Error('Enter between 1 and 4,096 digits.');
  if(!({2:/^[01]+$/,8:/^[0-7]+$/,10:/^\d+$/,16:/^[\da-f]+$/i})[base].test(s))throw Error('Invalid digit for this base. Fractions, separators and exponents are not supported.');
  let n=BigInt(({2:'0b',8:'0o',10:'',16:'0x'})[base]+s);if(negative)n=-n;
  return jsonResult({binary:n.toString(2),octal:n.toString(8),decimal:n.toString(10),hexadecimal:n.toString(16)},'Exact integer conversion. Negative values use a minus sign, not fixed-width two’s complement.','base-conversion.json');
 }
 if(slug==='unix-timestamp')return timestamp(a,o);
 if(slug==='jwt-decoder'){
  guard(a,65536);required(a,'JWT');const parts=a.trim().split('.');
  if(parts.length!==3)throw Error('Use a three-part compact JWT: header.payload.signature. Encrypted five-part JWE is not supported.');
  const {parseJSON,formatJSON}=await import('./data.mjs');
  const decode=(s,label)=>{let text;try{text=new TextDecoder('utf-8',{fatal:true}).decode(base64url(s,label));}catch(e){if(e.message.includes('Base64'))throw e;throw Error(`${label} is not valid UTF-8.`);}let node;try{node=parseJSON(text);}catch(e){throw Error(`${label}: ${e.message}`);}if(node.type!=='object')throw Error(`${label} must be a JSON object.`);return node;};
  const header=decode(parts[0],'Header'),payload=decode(parts[1],'Payload');
  const alg=header.values.find(([k])=>k.value==='alg')?.[1];if(alg?.type!=='string'||!alg.value)throw Error('Header must contain a nonempty string alg field.');
  const signature=base64url(parts[2],'Signature',alg.value==='none');
  return result('{\n  "verification": "NOT VERIFIED — decoding does not establish authenticity",\n  "header": '+formatJSON(header,2)+',\n  "payload": '+formatJSON(payload,2)+',\n  "signatureBase64url": '+JSON.stringify(parts[2])+',\n  "signatureBytes": '+signature.length+'\n}', 'Decoded only. Signature, issuer, audience and time claims have NOT been verified.',{filename:'decoded-jwt.json',mime:'application/json;charset=utf-8'});
 }
 if(slug==='regex-tester'){
  guard(a,262144);const pattern=String(o.pattern??''),flags=String(o.flags??'g');guard(pattern,4096);
  if(/[^dgimsuy]/.test(flags)||new Set(flags).size!==flags.length)throw Error('Use each supported flag at most once: d, g, i, m, s, u, y.');
  let regex;try{regex=new RegExp(pattern,flags);}catch{throw Error('Invalid regular expression. Check brackets, escapes, group syntax and flags for JavaScript.');}
  const matches=[];let m,truncated=false;
  while((m=regex.exec(a))!==null){
   if(matches.length===1000){truncated=true;break;}
   matches.push({match:m[0],start:m.index,end:m.index+m[0].length,groups:m.slice(1).map(x=>x??null),namedGroups:m.groups?Object.fromEntries(Object.entries(m.groups).map(([k,v])=>[k,v??null])):{},...(m.indices?{indices:m.indices.map(x=>x??null)}:{})});
   if(!regex.global&&!regex.sticky)break;
   if(m[0]===''){const i=regex.lastIndex;regex.lastIndex=i+(regex.unicode&&a.codePointAt(i)>0xffff?2:1);}
  }
  return jsonResult({engine:'JavaScript RegExp',positions:'zero-based UTF-16 code units; end is exclusive',truncated,matches},`${matches.length} match${matches.length===1?'':'es'}${truncated?' shown; stopped after 1,000 matches':''}. Execution is bounded by the browser worker timeout.`,'regex-matches.json');
 }
 throw Error('Unknown developer tool.');
}
