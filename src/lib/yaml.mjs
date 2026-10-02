import {parseAllDocuments,stringify,isAlias,isMap,isSeq,isScalar,LineCounter} from 'yaml';
import {guard,required,result} from './common.mjs';
import {parseJSON,formatJSON} from './data.mjs';

function decimalKey(s){
 if(s.length>4096)throw Error('Numeric values are limited to 4,096 characters.');
 const m=/^([+-]?)(\d*)(?:\.(\d*))?(?:[eE]([+-]?\d+))?$/.exec(s);
 if(!m||!(m[2]||m[3]))throw Error('Unsupported numeric representation.');
 let d=(m[2]+(m[3]||'')).replace(/^0+/,'');if(!d)return '0';
 const z=d.length-d.replace(/0+$/,'').length;d=d.slice(0,d.length-z);
 return (m[1]==='-'?'-':'')+d+'e'+(BigInt(m[4]||0)-BigInt((m[3]||'').length)+BigInt(z));
}
function checkedFloat(raw){
 const n=Number(raw);
 if(!Number.isFinite(n)||decimalKey(raw)!==decimalKey(String(n)))throw Error('This numeric value would lose precision. Quote it as a string before conversion.');
 return n;
}
export function convertYAML(a='',o={}){
 guard(a);required(a,'Source');const indent=Number(o.indent||2);if(![2,4].includes(indent))throw Error('Choose 2 or 4 spaces.');
 let count=0;
 const limit=depth=>{if(depth>50||++count>20000)throw Error('Conversion limit: 50 nesting levels and 20,000 values.');};
 if(o.direction==='toYAML'){
  const root=parseJSON(a);
  const walk=(n,depth=0)=>{limit(depth);
   if(n.type==='object')return new Map(n.values.map(([k,v])=>{if(!k.value.isWellFormed())throw Error('JSON keys must contain valid Unicode.');return [k.value,walk(v,depth+1)];}));
   if(n.type==='array')return n.values.map(v=>walk(v,depth+1));
   if(n.type==='string'){if(!n.value.isWellFormed())throw Error('JSON strings must contain paired Unicode surrogates for YAML conversion.');return n.value;}
   if(n.type==='number'){if(n.raw.length>4096)throw Error('Numeric values are limited to 4,096 characters.');return /^-?\d+$/.test(n.raw)&&n.raw!=='-0'?BigInt(n.raw):checkedFloat(n.raw);}
   return JSON.parse(n.raw);
  };
  const value=walk(root);
  // Quote all strings, including mapping keys, to keep types stable in YAML consumers.
  const text=stringify(value,{version:'1.2',indent,defaultStringType:'QUOTE_DOUBLE',defaultKeyType:'QUOTE_DOUBLE',lineWidth:0});
  return result(text,'Converted to YAML 1.2. Strings are quoted; integer digits are preserved. Number spelling and formatting may change.',{filename:'converted.yaml',mime:'application/yaml;charset=utf-8'});
 }
 if(o.direction&&o.direction!=='toJSON')throw Error('Choose YAML to JSON or JSON to YAML.');
 const lineCounter=new LineCounter();
 const docs=parseAllDocuments(a,{version:'1.2',schema:'core',intAsBigInt:true,strict:true,uniqueKeys:true,lineCounter,prettyErrors:false,logLevel:'silent'});
 if(docs.length!==1)throw Error('Enter exactly one YAML document. Multiple documents and empty streams are not supported.');
 const doc=docs[0];
 const problem=doc.errors[0]||doc.warnings[0];
 if(problem){const pos=lineCounter.linePos(problem.pos?.[0]||0);throw Error(`Invalid or unsupported YAML at line ${pos.line}, column ${pos.col}: ${problem.message}`);}
 if(doc.directives.yaml.version!=='1.2')throw Error('Only YAML 1.2 is supported. Remove a YAML 1.1 directive after checking the scalar types.');
 if(doc.contents===null||(isScalar(doc.contents)&&doc.contents.value===null&&!doc.contents.source))throw Error('YAML has no value. Enter a mapping, sequence or scalar such as null.');
 const walk=(n,depth=0)=>{limit(depth);
  if(n===null)return 'null';
  if(isAlias(n)||n.anchor)throw Error('YAML anchors and aliases are not supported. Expand them explicitly before conversion.');
  if(n.tag&&!['tag:yaml.org,2002:str','tag:yaml.org,2002:int','tag:yaml.org,2002:float','tag:yaml.org,2002:bool','tag:yaml.org,2002:null','tag:yaml.org,2002:map','tag:yaml.org,2002:seq'].includes(n.tag))throw Error('Custom YAML tags are not supported.');
  if(isMap(n)){
   if(n.items.some(({key})=>key?.anchor))throw Error('YAML anchors and aliases are not supported, including mapping keys.');
   const keys=new Set();return '{'+n.items.map(({key,value})=>{if(!isScalar(key)||typeof key.value!=='string')throw Error('JSON requires string mapping keys. Quote numeric/boolean keys; complex keys are unsupported.');if(key.value==='<<')throw Error('YAML merge keys are not supported. Expand mappings before conversion.');if(keys.has(key.value))throw Error('Duplicate mapping key.');keys.add(key.value);if(!key.value.isWellFormed())throw Error('Mapping keys must contain valid Unicode.');return JSON.stringify(key.value)+':'+walk(value,depth+1);}).join(',')+'}';
  }
  if(isSeq(n))return '['+n.items.map(v=>walk(v,depth+1)).join(',')+']';
  if(!isScalar(n))throw Error('Unsupported YAML node.');
  const v=n.value;
  if(typeof v==='bigint'){if(String(v).length>4096)throw Error('Numeric values are limited to 4,096 characters.');return v===0n&&n.source?.startsWith('-')?'-0':String(v);}
  if(typeof v==='number'){const val=checkedFloat(n.source);return Object.is(val,-0)?'-0':String(val);}
  if(typeof v==='string'&&!v.isWellFormed())throw Error('Strings must contain valid Unicode.');
  return JSON.stringify(v);
 };
 // Format through the existing lossless JSON parser, not JSON.parse's floating point values.
 const raw=walk(doc.contents);
 // Indent already validated JSON text with its token-preserving formatter.
 return result(formatJSONText(raw,indent),'Converted from YAML 1.2 core types. Comments and YAML presentation are not retained; aliases and merge keys are rejected.',{filename:'converted.json',mime:'application/json;charset=utf-8'});
}
const formatJSONText=(raw,indent)=>formatJSON(parseJSON(raw),indent);
