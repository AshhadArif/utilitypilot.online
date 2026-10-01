import {newConfigs} from './new-configs.mjs';
const select=(key,label,values,value)=>({key,label,type:'select',values:values.map(v=>Array.isArray(v)?v:[v,v]),value:value??(Array.isArray(values[0])?values[0][0]:values[0])});
const check=(key,label,value=false)=>({key,label,type:'checkbox',value});
const text=(key,label,value='',help='')=>({key,label,type:'text',value,help});
const num=(key,label,value,min=0,max=50000,step=1)=>({key,label,type:'number',value,min,max,step});
const locale=select('locale','Text language',[['en','English'],['tr','Turkish'],['de','German'],['fr','French'],['es','Spanish'],['zh','Chinese'],['ja','Japanese'],['ar','Arabic'],['ur','Urdu']]);
const matching=[check('ignoreCase','Ignore letter case'),check('trim','Ignore surrounding spaces'),check('normalize','Normalize Unicode (NFC)')];
const keep=select('keep','Occurrence to keep',[['first','First'],['last','Last']]);
const delim=select('delimiter','Input delimiter',[[',','Comma'],[';','Semicolon'],['\t','Tab'],['|','Pipe']]);
const outDelim=select('outDelimiter','Output delimiter',[[',','Comma'],[';','Semicolon'],['\t','Tab'],['|','Pipe']]);
const header=check('header','First record contains headers',true);
const safe=check('safe','Spreadsheet-safe export (prefix formula-like cells)',true);
const csv=[delim,header];
const encode=select('action','Operation',[['encode','Encode'],['decode','Decode']]);
const imageFormat=select('format','Output format',[['image/png','PNG'],['image/jpeg','JPEG'],['image/webp','WebP']]);
const imageOut=[imageFormat,num('quality','Quality (JPEG / WebP)',85,1,100),text('matte','JPEG background color','#ffffff')];
export const configs={
 ...newConfigs,
 'word-counter':{sample:'A small task. A clear result. 👋',options:[locale,num('wpm','Reading speed (words/minute)',200,1,2000)],action:'Count text'},
 'text-cleaner':{sample:'  A  useful\u00a0idea\nwrapped across lines.\n\n  A new paragraph.  ',options:[check('nbsp','Replace non-breaking spaces',true),check('tabs','Replace tabs with spaces'),check('trim','Trim line edges',true),check('spaces','Collapse repeated spaces',true),check('blank','Collapse extra blank lines'),select('join','Line breaks',[['keep','Keep line breaks'],['paragraphs','Join hard wraps; keep paragraphs'],['all','Join all lines']]),check('zeroWidth','Remove zero-width characters (can alter emoji/scripts)')],action:'Clean text'},
 'remove-duplicate-lines':{sample:'apple\npear\napple\nApple',options:[...matching,keep],action:'Remove duplicates'},
 'sort-lines':{sample:'item10\nitem2\nitem1',options:[select('mode','Sort order',[['alphabetical','Alphabetical'],['natural','Natural (item2 before item10)'],['numeric','Numeric'],['length','Character length'],['reverse','Reverse current order']]),locale,check('descending','Descending'),check('ignoreCase','Ignore letter case')],action:'Sort lines'},
 'case-converter':{sample:'a practical GUIDE to better TEXT',options:[select('mode','Case style',[['lower','lowercase'],['upper','UPPERCASE'],['sentence','Sentence case'],['title','Title Case']]),locale],action:'Convert case'},
 'find-and-replace':{sample:'red apple, red pear, red cherry',options:[{...text('find','Find','red'),type:'textarea'},{...text('replacement','Replace with','green','Leave empty to remove matching text; actual line breaks are supported.'),type:'textarea'},check('ignoreCase','Ignore letter case'),check('whole','Match whole words only')],action:'Replace matches'},
 'text-diff':{sample:'The draft is ready.\nSend it on Monday.',sampleB:'The final draft is ready.\nSend it on Tuesday.',second:true,options:[select('mode','Compare by',[['line','Lines'],['word','Words']]),check('ignoreWhitespace','Normalize spaces and line endings')],action:'Compare text'},
 'compare-lists':{sample:'apple\npear\npear',sampleB:'pear\ncherry',second:true,options:[...matching,select('view','Result to export',['Shared','Only in A','Only in B','Union'])],action:'Compare lists'},
 'json-formatter':{sample:'{"id":9007199254740993,"name":"Ada","active":true}',file:true,options:[select('indent','Output style',[['2','2-space indent'],['4','4-space indent'],['0','Minified']])],action:'Format & validate'},
 'json-to-csv':{sample:'[{"id":"00123","name":"Ada","address":{"city":"Lahore"},"tags":["editor","writer"]},{"id":"00456","name":"Sam"}]',file:true,options:[check('flatten','Flatten nested objects into dot paths',true),text('columns','Column positions to keep','','Optional, in output order: 1,3,2. Leave blank for all.'),outDelim,safe],action:'Convert to CSV'},
 'csv-to-json':{sample:'id,name\n00123,Ada\n00456,Sam',file:true,options:[...csv,check('types','Convert exact numbers, true, false and null to JSON types')],action:'Convert to JSON'},
 'csv-viewer':{sample:'id,name,note\n00123,Ada,"Hello, world"\n00456,Sam,"two\nlines"',file:true,options:[...csv,safe],action:'Inspect CSV'},
 'csv-deduplicate':{sample:'id,name\n1,Ada\n2,Sam\n1,Ada',file:true,options:[...csv,text('columns','Key column positions','','For example 1,2. Leave blank to compare whole rows.'),keep,safe],action:'Remove duplicate rows'},
 'csv-column-editor':{sample:'id,name,city\n00123,Ada,Lahore\n00456,Sam,Karachi',file:true,options:[...csv,safe],columns:true,action:'Apply column changes'},
 'delimiter-converter':{sample:'name,note\nAda,"Hello, world"',file:true,options:[...csv,outDelim,check('quoteAll','Quote every field'),check('crlf','Use Windows CRLF line endings'),check('bom','Include UTF-8 BOM'),safe],action:'Convert delimiter'},
 'csv-merge':{sample:'id,name\n1,Ada',sampleB:'id,name\n2,Sam',second:true,file:true,multiple:true,options:[delim,safe],action:'Merge CSV files'},
 'csv-split':{sample:'id,name\n1,Ada\n2,Sam\n3,Kim',file:true,options:[...csv,num('rowsPerPart','Data records per file',2,1),check('repeatHeader','Repeat header in every part',true),safe],action:'Split CSV'},
 'image-resizer':{image:true,options:[num('width','Width (pixels)',800,1,16000),num('height','Height (pixels)',600,1,16000),check('lock','Lock aspect ratio',true),select('mode','Resize mode',[['fit','Fit within dimensions'],['stretch','Stretch to exact dimensions'],['percent','Percentage']]),num('percent','Scale percentage',50,1,400),check('upscale','Allow upscaling'),...imageOut],action:'Resize image'},
 'image-compressor':{image:true,options:[num('target','Target file size (KB, 1 KB = 1,000 bytes)',200,.001,10000,.001),...imageOut,check('resize','Allow reducing dimensions if quality is not enough')],action:'Compress image'},
 'image-converter':{image:true,options:imageOut,action:'Convert image'},
 'image-cropper':{image:true,options:[num('x','Left (pixels)',0,0,16000),num('y','Top (pixels)',0,0,16000),num('width','Crop width',100,1,16000),num('height','Crop height',100,1,16000),select('ratio','Aspect ratio',[['free','Free'],['1','1:1 square'],['1.3333333333333333','4:3'],['1.7777777777777777','16:9']]),...imageOut],action:'Crop image'},
 'image-inspector':{image:true,options:[],action:'Inspect image'},
 'image-color-picker':{image:true,options:[num('x','Pixel X',0,0,16000),num('y','Pixel Y',0,0,16000),num('area','Square sample size (pixels)',1,1,100)],action:'Sample color'},
 'slug-generator':{sample:'Café notes: A Better Workflow!',options:[select('mode','Characters',[['ascii','Latin transliteration (ASCII)'],['unicode','Keep Unicode letters']]),select('separator','Word separator',[['-','Hyphen'],['_','Underscore']]),locale],action:'Generate slug'},
 'url-parser':{sample:'https://example.com/search?q=green+tea&tag=a&tag=b#results',options:[select('mode','Input type',[['url','Complete HTTP(S) URL'],['query','Query string only']]),check('form','Decode plus as space (form mode)',true)],action:'Parse URL'},
 'url-encoder-decoder':{sample:'green tea + mint',options:[encode,select('mode','Encoding mode',[['component','URL component (%20 for space)'],['form','Form value (+ for space)']])],action:'Process URL text'},
 'utm-builder':{sample:'https://example.com/article?lang=en#read',options:[text('source','Campaign source','newsletter'),text('medium','Campaign medium','email'),text('campaign','Campaign name','autumn'),text('term','Term (optional)'),text('content','Content (optional)')],action:'Build campaign link'},
 'url-cleaner':{sample:'https://example.com/article?page=2&utm_source=newsletter&fbclid=abc#read',options:['utm_source','utm_medium','utm_campaign','utm_term','utm_content','utm_id','gclid','fbclid','msclkid'].map(k=>check(k,'Remove '+k,true)),action:'Clean link'},
 'color-converter':{sample:'#2d6a4f',options:[],action:'Convert color'},
 'contrast-checker':{sample:'#2d6a4f',sampleB:'#ffffff',second:true,options:[num('size','Text size (pixels)',16,1,300),check('bold','Bold text')],action:'Check contrast'},
 'base64':{sample:'Hello, 世界 👋',options:[encode,check('urlSafe','Use URL-safe alphabet (Base64URL)')],action:'Process Base64'},
 'html-entities':{sample:'<p>Tea & coffee</p>',options:[encode,check('numeric','Use numeric entities when encoding')],action:'Process entities'}
};
