import {Marked} from 'marked';
import {decodeHTML} from 'entities';
import {guard,required,result,escapeHTML} from './common.mjs';
export function convertMarkdown(a='',o={}){
 guard(a,262144);required(a,'Markdown');let escaped=0,blocked=0;
 const safeURL=(href,image=false)=>{
  const s=decodeHTML(href||'');
  if(/[\u0000-\u0020\u007f\\]/u.test(s))return null;
  try{const url=new URL(s,'https://example.invalid/');return (image?['http:','https:']:['http:','https:','mailto:']).includes(url.protocol)?s:null;}catch{return null;}
 };
 const parser=new Marked({gfm:o.gfm!==false,breaks:!!o.breaks,async:false,renderer:{
  html({text}){escaped++;return escapeHTML(text);},
  link({href,title,tokens}){const label=this.parser.parseInline(tokens),url=safeURL(href);if(url===null){blocked++;return label;}return `<a href="${escapeHTML(url)}"${title?` title="${escapeHTML(decodeHTML(title))}"`:''}>${label}</a>`;},
  image({href,title,text}){const alt=escapeHTML(decodeHTML(text||'')),url=safeURL(href,true);if(url===null){blocked++;return alt;}return `<img src="${escapeHTML(url)}" alt="${alt}"${title?` title="${escapeHTML(decodeHTML(title))}"`:''}>`;}
 }});
 let text;try{text=parser.parse(a);}catch{throw Error('Markdown could not be converted within the parser limits. Reduce deeply nested or unusually complex markup.');}
 return result(text,`HTML source ready. ${escaped} raw HTML fragment(s) escaped; ${blocked} unsupported link/image destination(s) removed. No source was rendered or fetched.`,{filename:'converted.html',mime:'text/html;charset=utf-8',stats:{'Escaped HTML fragments':escaped,'Blocked destinations':blocked}});
}
