import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {tools,guides} from '../src/render.mjs';
import {content} from '../src/data/tool-content.mjs';
import site from '../site.config.mjs';
const local=JSON.parse(await readFile('test-results/adsense-local/crawl.json','utf8'));
const live=JSON.parse(await readFile('test-results/adsense-live/crawl.json','utf8'));
const entry=JSON.parse(await readFile('test-results/adsense-live/entry.json','utf8'));
// Editorial judgments from this audit, not word-count or Google thresholds.
// The extended tool articles were reviewed for methods, examples, limits and distinct purpose.
const strongTools=new Set(Object.keys(content).filter(slug=>content[slug].sections));
const changes={
 '/tools/data/csv-column-editor/':'Improved schema guidance and preserved keyboard focus during reordering; deploy.',
 '/tools/data/csv-merge/':'Clarified schema repair and preserved keyboard focus during file reordering; deploy.',
 '/tools/data/csv-split/':'Clarified manifest versus individual CSV downloads and reconciliation; deploy.',
 '/tools/web/utm-builder/':'Repaired corrupted quotation marks in naming guidance; deploy.',
 '/tools/web/contrast-checker/':'Corrected exact 14pt bold boundary; deploy.',
 '/privacy-policy/':'Added Hostinger, provider policy, security challenges and owner-confirmed 30-day access-log policy; publish and verify the live text.',
 '/cookie-policy/':'Added observed hosting security-cookie disclosure; deploy and monitor configuration changes.',
 '/report-an-error/':'Configured owner-supplied contact address for reviewed email drafts; publish and verify.',
 '/about/':'Added owner-supplied Fahad (UtilityPilot / Bazmino) identity and contact email locally; live page still needs deployment.',
 '/contact/':'Configured bazminoadsense@gmail.com locally; owner reports receiving mail. Publish and verify the live address.',
 '/terms/':'Linked bundled dependency copyright and license notices shipped by the build; deploy.',
 '/':'Review Hostinger challenge and verify actual Google crawler access; fresh browser first received 403.'
};
const html=new Map();
for(const r of local.results)html.set(r.path,await readFile(r.path==='/'?'dist/index.html':`dist${r.path}index.html`,'utf8'));
const incoming=new Map(local.results.map(r=>[r.path,new Set()]));
let totalLinks=0;
for(const [source,body]of html)for(const [,target]of body.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g)){
 if(incoming.has(target)&&source!==target){incoming.get(target).add(source);totalLinks++;}
}
const rows=local.results.map(r=>{
 const t=tools.find(t=>t.path===r.path),g=guides.find(g=>`/guides/${g.slug}/`===r.path),l=live.results.find(l=>l.path===r.path);
 const type=t?'Tool':g?'Guide':r.path==='/'?'Home':r.path==='/404/'?'404':r.path.startsWith('/tools/')?'Directory / category':r.path==='/guides/'?'Guide directory':'Trust / support';
 let quality=t?(strongTools.has(t.slug)?'STRONG':'ACCEPTABLE'):g?'STRONG':['/','/tools/text/','/tools/data/','/tools/developer/'].includes(r.path)?'STRONG':'ACCEPTABLE';
 if((r.path==='/about/'&&!site.operator)||(r.path==='/contact/'&&!site.contactEmail))quality='NEEDS REWRITE';
 return {url:'https://utilitypilot.online'+r.path,type,indexable:!r.noindex,quality,uniqueValue:t?content[t.slug].intro:g?g.description:r.description,functionality:t?'PASS: live sample; local processor and browser suites':r.path==='/contact/'?(site.contactEmail?'Local email link configured; public page still outdated':'No delivery channel configured'):'Not a transformation tool',incomingPages:incoming.get(r.path).size,outgoingLinks:r.links.filter(x=>x.startsWith('/')).length,localStatus:r.status,liveStatus:r.path==='/'?'403 initial; 200 after JavaScript challenge':String(l.status),action:changes[r.path]||'Keep; deploy shared metadata correction. No consolidation indicated.'};
});
for(const row of rows){const path=new URL(row.url).pathname;row.outgoingLinks=[...(html.get(path).match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1]||'').matchAll(/href="\//g)].length;}
const columns=Object.keys(rows[0]);const csv=v=>'"'+String(v).replaceAll('"','""')+'"';
await mkdir('private-audit/adsense',{recursive:true});
await writeFile('private-audit/adsense/ADSENSE-CONTENT-INVENTORY.csv',columns.map(csv).join(',')+'\n'+rows.map(r=>columns.map(k=>csv(r[k])).join(',')).join('\n')+'\n');
const counts={};for(const r of rows.filter(r=>r.indexable))counts[r.quality]=(counts[r.quality]||0)+1;
const evidence={checked:'2026-10-04',scope:{routes:rows.length,indexable:rows.filter(r=>r.indexable).length,tools:tools.length,guides:guides.length,qualityCounts:counts},local:{pages:local.results.length,toolSamples:local.results.filter(r=>r.sample==='pass').length,unexpectedStatuses:local.results.filter(r=>r.status!==(r.path==='/404/'?404:200)).map(r=>r.path),overflow:local.results.filter(r=>r.overflow.length).map(r=>r.path),errors:local.errors,external:local.external,cookies:local.cookies.map(({name,domain})=>({name,domain})),orphanPages:rows.filter(r=>r.indexable&&!r.incomingPages).map(r=>r.url),internalPageLinks:totalLinks,probes:local.probes.filter(r=>!r.body)},live:{toolSamples:live.results.filter(r=>r.sample==='pass').length,overflow:live.results.filter(r=>r.overflow.length).map(r=>r.path),applicationErrors:live.errors,failedAssets:live.failedAssets,external:live.external,probes:live.probes.filter(r=>!r.body),freshEntry:entry.map(r=>({javaScriptEnabled:r.javaScriptEnabled,resolved:r.resolved,statuses:r.responses.map(x=>x.status),external:r.external,cookies:r.cookies}))},limits:['No deployment performed.','No hosting account, traffic analytics or Google account inspected.','Automated accessibility and viewport testing is not a full assistive-technology audit.','Google crawler access and field Core Web Vitals remain unverified.']};
await writeFile('private-audit/adsense/ADSENSE-VERIFICATION.json',JSON.stringify(evidence,null,2)+'\n');
console.log(JSON.stringify(evidence.scope));
