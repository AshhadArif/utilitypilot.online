import {mkdir,writeFile,readFile,cp,rm,stat} from 'node:fs/promises';
import path from 'node:path';
import {build,transform} from 'esbuild';
import {layout,home,directory,toolPage,guidePage,guideCard,crumbs,search,tools,categories,guides} from '../src/render.mjs';
import {trust,trustPage} from '../src/trust.mjs';
import {configs} from '../src/data/configs.mjs';
import {content} from '../src/data/tool-content.mjs';
import site from '../site.config.mjs';
import {hostingerConfig} from './hostinger.mjs';
const out=path.resolve('dist');if(out!==path.join(process.cwd(),'dist'))throw Error('Invalid build directory');
if(process.env.RELEASE==='1'){
 for(const key of ['operator','contactEmail','hostName','hostPrivacyUrl','logRetention'])if(!site[key])throw Error(`Release requires factual site configuration: ${key}`);
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.contactEmail))throw Error('CONTACT_EMAIL must be a verified valid address.');
}
const paths=new Set();for(const t of tools){if(paths.has(t.path)||!configs[t.slug]||!content[t.slug])throw Error('Invalid tool registry '+t.slug);paths.add(t.path);for(const p of t.related)if(!tools.some(x=>x.path===p))throw Error('Unknown related tool '+p);if(!guides.some(g=>g.slug===content[t.slug].guide))throw Error('Unknown guide');}
await rm(out,{recursive:true,force:true});await mkdir(out,{recursive:true});await cp('public',out,{recursive:true});await mkdir(path.join(out,'assets'),{recursive:true});
const bundle=await build({entryPoints:{site:'src/client/site.mjs',tool:'src/client/tool.mjs',worker:'src/client/worker.mjs'},bundle:true,format:'esm',splitting:true,outdir:'dist/assets',entryNames:'[name]',chunkNames:'chunks/[name]-[hash]',minify:true,sourcemap:false,target:['es2022'],metafile:true,logLevel:'warning',plugins:[{name:'search-index',setup(b){b.onResolve({filter:/^utilitypilot:search-index$/},()=>({path:'search-index',namespace:'utilitypilot'}));b.onLoad({filter:/.*/,namespace:'utilitypilot'},()=>({loader:'json',contents:JSON.stringify(tools.map(({name,slug,description,aliases,path,category})=>({name,slug,description,aliases,path,category})))}));}}]});
await writeFile('dist/assets/styles.css',(await transform(await readFile('src/styles.css','utf8'),{loader:'css',minify:true})).code);
const pages=[];
async function page(pathname,title,description,body,options={}){const html=layout({path:pathname,title,description,body,...options});const file=pathname==='/'?'index.html':pathname.slice(1)+'index.html';await mkdir(path.dirname(path.join(out,file)),{recursive:true});await writeFile(path.join(out,file),html);pages.push({path:pathname,title,description,noindex:!!options.noindex,kind:options.kind||'page'});return html;}
await page('/','UtilityPilot — Practical tools for everyday digital tasks',`${tools.length} browser tools for text, CSV, JSON, images, web publishing and development. Clear results with local processing and useful explanations.`,home(),{kind:'home'});
await page('/tools/',`All ${tools.length} Online Tools | UtilityPilot`,'Find tools for text, lists, CSV, JSON, images and web publishing. Search by task and browse five focused collections.',directory());
for(const c of categories)await page(`/tools/${c.id}/`,`${c.name} Tools | UtilityPilot`,c.description,directory(c.id),{category:c.id,breadcrumbs:[['Tools','/tools/'],[c.name]]});
for(const t of tools)await page(t.path,content[t.slug].title||`${t.name} | UtilityPilot`,content[t.slug].description||content[t.slug].intro,toolPage(t),{kind:'tool',category:t.category,breadcrumbs:[['Tools','/tools/'],[categories.find(c=>c.id===t.category).name,`/tools/${t.category}/`],[t.name]]});
await page('/guides/','Practical Guides for Digital Tasks | UtilityPilot','Understand text cleanup, CSV imports, JSON conversion, image constraints and URL behavior with worked examples and connected tools.',`${crumbs([['Guides']])}<section class="page-heading"><p class="eyebrow">A LITTLE KNOW-HOW</p><h1>Understand the task.<br>Trust the result.</h1><p>Practical explanations for the details that matter. Real examples, clear methods, and the right tool for the next step.</p></section><section class="guides-directory"><h2>Find a practical guide</h2><div class="guide-grid">${guides.map(guideCard).join('')}</div></section>`);
for(const g of guides)await page(`/guides/${g.slug}/`,`${g.title} | UtilityPilot`,g.description,guidePage(g),{kind:'guide',category:g.category,breadcrumbs:[['Guides','/guides/'],[g.title]]});
for(const [slug,p] of Object.entries(trust))await page(`/${slug}/`,`${p.title} | UtilityPilot`,p.description,trustPage(slug),{noindex:slug==='report-an-error',breadcrumbs:[[p.title]]});
const notFound=await page('/404/','Page not found | UtilityPilot','Find the tool you need in the UtilityPilot directory.',`<section class="not-found"><p class="eyebrow">404 · A SMALL DETOUR</p><h1>This page isn’t here.<br>Your next tool probably is.</h1><p>The link may have changed or the address may be mistyped. Search for a task or return to the complete tool directory.</p><a class="button primary" href="/tools/">Browse all tools →</a>${search('not-found-search')}</section>`,{noindex:true});await writeFile('dist/404.html',notFound);
const urls=pages.filter(p=>!p.noindex);await writeFile('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls.map(p=>`<url><loc>${site.origin}${p.path}</loc></url>`).join('')+'</urlset>\n');
await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${site.origin}/sitemap.xml\n`);
await writeFile('dist/route-manifest.json',JSON.stringify(pages,null,2));
await writeFile('dist/.htaccess',hostingerConfig(pages));
await mkdir('test-results',{recursive:true});await writeFile('test-results/bundle.json',JSON.stringify(bundle.metafile,null,2));
console.log(`Built ${tools.length} working-tool routes, ${guides.length} guides; ${pages.length} HTML routes, ${urls.length} sitemap URLs.`);
if(!site.contactEmail)console.log('Local build: operator/contact/hosting facts are not configured. Release gate remains closed.');
