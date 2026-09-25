import {guard,required,integer,result,LIMITS} from './common.mjs';

export function parseCSV(text,delimiter=','){
 guard(text,LIMITS.data);required(text,'Delimited input');
 if(![',',';','\t','|'].includes(delimiter))throw Error('Choose a supported delimiter.');
 text=text.replace(/^\ufeff/,'');const rows=[];let row=[],field='',state=0,line=1;
 const pushField=()=>{row.push(field);field='';state=0;if(row.length>LIMITS.columns)throw Error('Limit: 200 columns. Select a smaller export.');};
 const pushRow=()=>{pushField();rows.push(row);row=[];if(rows.length>LIMITS.records+1)throw Error('Limit: 50,000 data records. Split the source locally first.');};
 for(let i=0;i<text.length;i++){
  const c=text[i];
  if(state===1){if(c==='"'){if(text[i+1]==='"'){field+='"';i++;}else state=2;}else {field+=c;if(c==='\n')line++;}continue;}
  if(c===delimiter){pushField();continue;}
  if(c==='\n'||c==='\r'){if(c==='\r'&&text[i+1]==='\n')i++;pushRow();line++;continue;}
  if(state===2)throw Error(`Unexpected character after a closing quote near line ${line}. Check the delimiter and quoting.`);
  if(c==='"'){if(field!=='')throw Error(`Quote inside an unquoted field near line ${line}. Quote the whole field and double internal quotes.`);state=1;}else field+=c;
 }
 if(state===1)throw Error(`Unclosed quoted field near line ${line}. Add the missing closing quote.`);
 if(field!==''||row.length||state===2||![ '\n','\r'].includes(text.at(-1)))pushRow();
 const width=rows[0]?.length||0;const bad=rows.findIndex(r=>r.length!==width);
 if(bad>=0)throw Error(`Record ${bad+1} has ${rows[bad].length} fields; expected ${width}. Check the selected delimiter and missing cells.`);
 return rows;
}
export function serializeCSV(rows,delimiter=',',o={}){
 let escaped=0;
 const text=rows.map(row=>row.map(value=>{
  let s=String(value??'');if(o.safe!==false&&/^[\s\uFEFF]*[=+\-@]|^[\t\r\n]/u.test(s)){s="'"+s;escaped++;}
  return o.quoteAll||s.includes(delimiter)||/["\r\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s;
 }).join(delimiter)).join(o.crlf?'\r\n':'\n');
 if(new TextEncoder().encode(text).length>LIMITS.output)throw Error('Output would exceed 20 MiB. Process a smaller selection.');
 return {text:(o.bom?'\ufeff':'')+text,escaped};
}
export function table(text,o={}){
 const rows=parseCSV(text,o.delimiter||',');const header=o.header!==false;
 if(rows.length-(header?1:0)>LIMITS.records)throw Error('Limit: 50,000 data records. Split the source locally first.');
 const headers=header?rows[0]:rows[0].map((_,i)=>`Column ${i+1}`);
 if(header&&new Set(headers).size!==headers.length)throw Error('Duplicate column headers. Give each header a unique name before processing.');
 if(header&&headers.some(s=>s===''))throw Error('A column header is empty. Add a name or turn off the header option.');
 return {headers,rows:header?rows.slice(1):rows,hasHeader:header};
}

// A small JSON syntax tree preserves number lexemes and object member order.
export function parseJSON(text){
 guard(text,LIMITS.data);required(text,'JSON input');let at=0,nodes=0;
 const fail=message=>{const before=text.slice(0,at),line=before.split('\n').length,column=at-before.lastIndexOf('\n');throw Error(`${message} at line ${line}, column ${column}.`);};
 const ws=()=>{while(/[\x20\t\r\n]/.test(text[at]||'x'))at++;};
 const string=()=>{const start=at++;while(at<text.length){if(text[at]==='\\'){at+=2;continue;}if(text[at++]==='"'){const raw=text.slice(start,at);try{return {type:'string',value:JSON.parse(raw),raw};}catch{fail('Invalid string escape or control character');}}}fail('Unclosed string');};
 const value=(depth=0)=>{
  if(depth>LIMITS.depth)fail('JSON exceeds the nesting limit of 50');if(++nodes>250000)fail('JSON contains too many values');ws();const c=text[at];
  if(c==='"')return string();
  if(c==='{'||c==='['){const object=c==='{',end=object?'}':']';at++;ws();const values=[],seen=new Set();if(text[at]===end){at++;return {type:object?'object':'array',values};}
   while(at<text.length){ws();let member;
    if(object){if(text[at]!=='"')fail('Expected a quoted object key');member=string();if(seen.has(member.value))fail('Duplicate object key');seen.add(member.value);ws();if(text[at++]!==':')fail('Expected a colon after the key');}
    const v=value(depth+1);values.push(object?[member,v]:v);ws();if(text[at]===end){at++;return {type:object?'object':'array',values};}if(text[at++]!==',')fail('Expected a comma or closing bracket');
   }fail('Unclosed object or array');
  }
  const match=/^(?:-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?|true|false|null)/.exec(text.slice(at));
  if(!match)fail('Expected a JSON value');const raw=match[0];at+=raw.length;return {type:raw==='null'?'null':raw==='true'||raw==='false'?'boolean':'number',raw};
 };
 const root=value();ws();if(at!==text.length)fail('Unexpected text after the JSON value');return root;
}
export function formatJSON(node,space=2,level=0){
 if(!['array','object'].includes(node.type))return node.raw;
 const object=node.type==='object',open=object?'{':'[',close=object?'}':']';if(!node.values.length)return open+close;
 const children=node.values.map(item=>object?item[0].raw+':'+(space?' ':'')+formatJSON(item[1],space,level+1):formatJSON(item,space,level+1));
 return space?open+'\n'+children.map(s=>' '.repeat((level+1)*space)+s).join(',\n')+'\n'+' '.repeat(level*space)+close:open+children.join(',')+close;
}
const cell=node=>node.type==='string'?node.value:node.type==='null'?'':formatJSON(node,0);
function flattenNode(node,flatten,prefix=undefined,out=new Map()){
 for(const [k,v] of node.values){const path=prefix!==undefined?prefix+'.'+k.value:k.value;
  if(flatten&&v.type==='object'&&v.values.length)flattenNode(v,true,path,out);
  else {if(out.has(path))throw Error(`Flattened column collision at ${path}. Disable flattening or rename the source key.`);out.set(path,cell(v));}
 }return out;
}
function selected(value,total){if(!String(value||'').trim())return Array.from({length:total},(_,i)=>i);const indices=String(value).split(',').map(x=>integer(x.trim(),'Column position',1,total)-1);if(new Set(indices).size!==indices.length)throw Error('Select each column only once.');return indices;}
export function runData(slug,a='',b='',o={},files=[]){
 guard(a,LIMITS.data);guard(b,LIMITS.data);
 if(slug==='json-formatter'){const root=parseJSON(a);const space=integer(o.indent??2,'Indent size',0,8);return result(formatJSON(root,space),'Valid JSON. Number spelling and object member order are preserved.',{filename:'formatted.json'});}
 if(slug==='json-to-csv'){
  const root=parseJSON(a);if(root.type!=='array'||root.values.some(n=>n.type!=='object'))throw Error('Use a JSON array of objects, such as [{"name":"Ada"}].');
  if(!root.values.length)throw Error('The array contains no records to convert.');if(root.values.length>LIMITS.records)throw Error('Limit: 50,000 records.');
  const maps=root.values.map(n=>flattenNode(n,o.flatten!==false));const headers=[...new Set(maps.flatMap(m=>[...m.keys()]))];
  if(!headers.length||headers.length>LIMITS.columns)throw Error('JSON must produce between 1 and 200 columns.');
  const keys=selected(o.columns,headers.length).map(i=>headers[i]);const rows=maps.map(m=>keys.map(k=>m.get(k)??''));
  return csvResult(keys,rows,o,`${rows.length} records converted. Null and missing values become empty cells; nested arrays remain JSON text.`);
 }
 if(slug==='csv-merge'){
  const sources=files.length?files:[a,b].filter(s=>s!=='');if(sources.length<2)throw Error('Choose at least two CSV files, or paste both CSV inputs.');
  if(sources.length>10||sources.reduce((n,s)=>n+new TextEncoder().encode(s).length,0)>10485760)throw Error('Merge supports up to 10 files and 10 MiB combined.');
  const tables=sources.map(s=>table(s,{...o,header:true}));const headers=tables[0].headers;
  tables.forEach((t,i)=>{if(JSON.stringify(t.headers)!==JSON.stringify(headers))throw Error(`File ${i+1} headers do not match the first file in name and order. Reorder or rename the columns first.`);});
  const rows=tables.flatMap(t=>t.rows);if(rows.length>LIMITS.records)throw Error('Merged output exceeds 50,000 records.');
  return csvResult(headers,rows,o,`Merged ${tables.length} inputs: ${tables.map((t,i)=>`file ${i+1}: ${t.rows.length} rows`).join('; ')}.`,{header:true});
 }
 const t=table(a,o);let headers=t.headers,rows=t.rows;
 if(slug==='csv-to-json'){
  let conversions=0;
  const convert=s=>{if(!o.types)return JSON.stringify(s);if(s==='true'||s==='false'||s==='null'){conversions++;return s;}if(/^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?$/.test(s)){conversions++;return s;}return JSON.stringify(s);};
  const text='[\n'+rows.map(row=>t.hasHeader?'  {'+row.map((s,i)=>JSON.stringify(headers[i])+': '+convert(s)).join(', ')+'}':'  ['+row.map(convert).join(', ')+']').join(',\n')+'\n]';
  return result(text,`${rows.length} records converted. ${o.types?`${conversions} exact numeric/boolean/null values typed; leading-zero values remain strings.`:'All values remain strings.'}`,{filename:'converted.json'});
 }
 if(slug==='csv-deduplicate'){
  const keys=selected(o.columns,headers.length),seen=new Set(),out=[];const ordered=o.keep==='last'?[...rows].reverse():rows;
  for(const row of ordered){const k=JSON.stringify(keys.map(i=>row[i]));if(!seen.has(k)){seen.add(k);out.push(row);}}
  if(o.keep==='last')out.reverse();return csvResult(headers,out,o,`${rows.length-out.length} duplicate records removed · ${out.length} retained.`);
 }
 if(slug==='csv-column-editor'){
  const selection=Array.isArray(o.columnConfig)?o.columnConfig.filter(x=>x.keep):selected(o.columns,headers.length).map(i=>({index:i,name:headers[i]}));
  if(!selection.length)throw Error('Keep at least one column.');
  headers=selection.map(x=>String(x.name));if(headers.some(s=>!s.trim())||new Set(headers).size!==headers.length)throw Error('Output column names must be nonempty and unique.');
  rows=rows.map(r=>selection.map(x=>r[integer(x.index,'Column index',0,t.headers.length-1)]));return csvResult(headers,rows,o,`${headers.length} columns selected in your chosen order.`);
 }
 if(slug==='csv-split'){
  const size=integer(o.rowsPerPart??1000,'Rows per part');if(!rows.length)throw Error('The CSV contains a header but no data records.');const count=Math.ceil(rows.length/size);if(count>100)throw Error('This creates more than 100 files. Increase rows per part.');
  const parts=[];for(let i=0;i<rows.length;i+=size){const chunk=rows.slice(i,i+size);parts.push({name:`part-${String(parts.length+1).padStart(3,'0')}.csv`,text:serializeCSV(t.hasHeader&&o.repeatHeader!==false?[headers,...chunk]:chunk,o.outDelimiter||o.delimiter||',',o).text,rows:chunk.length});}
  return result(parts.map(p=>`${p.name}: ${p.rows} records`).join('\n'),`${count} files ready. Splits follow records, including quoted multiline fields.`,{parts,filename:'split-manifest.txt'});
 }
 if(slug==='csv-viewer'||slug==='delimiter-converter')return csvResult(headers,rows,o,`${rows.length} data records · ${headers.length} columns. Preview shows up to 50 records; download contains all records.`);
 throw Error('Unknown data tool.');
}
function csvResult(headers,rows,o,summary,extra={}){
 const {text,escaped}=serializeCSV((extra.header??o.header)!==false?[headers,...rows]:rows,o.outDelimiter||o.delimiter||',',o);
 return result(text,summary+(escaped?` ${escaped} formula-like cells prefixed with an apostrophe for spreadsheet use.`:''),{filename:(o.outDelimiter==='\t'?'result.tsv':'result.csv'),table:{headers,rows:rows.slice(0,50),total:rows.length},...extra});
}
