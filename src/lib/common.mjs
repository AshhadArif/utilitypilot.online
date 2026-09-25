export const LIMITS={text:1048576,data:5242880,diff:262144,records:50000,columns:200,depth:50,output:20971520};
export function guard(s,max=LIMITS.text){if(typeof s!=='string')throw Error('Enter text to process.');if(new TextEncoder().encode(s).length>max)throw Error(`Input is too large. Limit: ${max/1024} KiB.`);return s;}
export function required(s,label='Input'){if(!s?.trim())throw Error(`${label} is empty. Paste text or choose a supported file.`);return s;}
export function number(v,label,min=0,max=1e9){const n=Number(v);if(String(v).trim()===''||!Number.isFinite(n)||n<min||n>max)throw Error(`${label} must be a number from ${min} to ${max}.`);return n;}
export function integer(v,label,min=1,max=50000){const n=number(v,label,min,max);if(!Number.isInteger(n))throw Error(`${label} must be a whole number.`);return n;}
export function lines(s){if(s==='')return [];const a=s.replace(/\r\n?/g,'\n').split('\n');if(a.at(-1)==='')a.pop();return a;}
export function key(s,o={}){let k=o.trim?s.trim():s;if(o.normalize)k=k.normalize('NFC');if(o.ignoreCase)k=k.toLocaleLowerCase(o.locale||'en');return k;}
export function result(text,summary,extra={}){return {text:String(text),summary,filename:'result.txt',...extra};}
export function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
