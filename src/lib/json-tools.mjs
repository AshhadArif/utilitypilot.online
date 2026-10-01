import {guard,result} from './common.mjs';
import {parseJSON,formatJSON} from './data.mjs';
const pointer=(path,key)=>path+'/'+String(key).replaceAll('~','~0').replaceAll('/','~1');
function numberKey(raw){
 if(raw.length>4096)throw Error('JSON Compare supports number tokens up to 4,096 characters.');
 const m=/^(-?)(\d+)(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/.exec(raw);
 let digits=(m[2]+(m[3]||'')).replace(/^0+/,'');if(!digits)return '0';
 const zeros=digits.length-digits.replace(/0+$/,'').length;digits=digits.slice(0,digits.length-zeros);
 return m[1]+digits+'e'+(BigInt(m[4]||'0')-BigInt((m[3]||'').length)+BigInt(zeros));
}
export function runJSONTool(slug,a='',b=''){
 guard(a);guard(b);let root;try{root=parseJSON(a);}catch(e){throw Error('Input A: '+e.message);}
 if(slug==='json-viewer'){
  let count=0;
  const walk=(node,path='',label='Root')=>{if(++count>3000)throw Error('Tree view supports up to 3,000 values. Use JSON Formatter for larger documents.');const container=['array','object'].includes(node.type);return {label,path,type:node.type,...(container?{children:node.values.map((item,i)=>node.type==='object'?walk(item[1],pointer(path,item[0].value),item[0].value):walk(item,pointer(path,i),String(i)))}:{value:formatJSON(node,0)})};};
  const tree=walk(root);return result(formatJSON(root,2),'Valid JSON. Explore the tree or copy the complete formatted document.',{tree,filename:'viewed.json',mime:'application/json;charset=utf-8',stats:{Values:count,'Root type':root.type}});
 }
 if(slug!=='json-compare')throw Error('Unknown JSON tool.');
 let other;try{other=parseJSON(b);}catch(e){throw Error('Input B: '+e.message);}
 const checkNumbers=node=>{if(node.type==='number'&&node.raw.length>4096)throw Error('JSON Compare supports number tokens up to 4,096 characters.');if(node.type==='array')node.values.forEach(checkNumbers);if(node.type==='object')node.values.forEach(([,v])=>checkNumbers(v));};checkNumbers(root);checkNumbers(other);
 const changes=[];
 const add=(type,path,before,after)=>{if(changes.length>=10000)throw Error('More than 10,000 changes. Compare a smaller document.');changes.push({type,path,before:before?formatJSON(before,0):null,after:after?formatJSON(after,0):null});};
 const walk=(x,y,path='')=>{
  if(!x)return add('added',path,null,y);if(!y)return add('removed',path,x,null);
  if(x.type!==y.type)return add('changed',path,x,y);
  if(x.type==='object'){const xm=new Map(x.values.map(([k,v])=>[k.value,v])),ym=new Map(y.values.map(([k,v])=>[k.value,v]));for(const k of new Set([...xm.keys(),...ym.keys()]))walk(xm.get(k),ym.get(k),pointer(path,k));}
  else if(x.type==='array'){for(let i=0;i<Math.max(x.values.length,y.values.length);i++)walk(x.values[i],y.values[i],pointer(path,i));}
  else if(x.type==='number'?numberKey(x.raw)!==numberKey(y.raw):x.type==='string'?x.value!==y.value:x.raw!==y.raw)add('changed',path,x,y);
 };
 walk(root,other);
 return result(JSON.stringify({equal:changes.length===0,changes},null,2),changes.length?`${changes.length} structural changes. Objects ignore key order; arrays compare by index.`:'Structurally equal. Formatting, key order and equivalent decimal number spelling are ignored.',{filename:'json-differences.json',mime:'application/json;charset=utf-8',table:{headers:['Change','JSON Pointer','Before (JSON)','After (JSON)'],rows:changes.map(c=>[c.type,c.path||'(root)',c.before??'—',c.after??'—']),total:changes.length}});
}
