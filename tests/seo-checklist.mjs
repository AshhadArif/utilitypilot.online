import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {transport} from '../src/lib/transport.mjs';
import {layout} from '../src/render.mjs';
import site from '../site.config.mjs';
assert.equal(transport({'x-forwarded-proto':'https'}).hsts,false);
for(const value of [undefined,'http','https,http','HTTPS'])assert.equal(transport({'x-forwarded-proto':value},{enforce:true,trustProxy:true}).redirect,true);
assert.deepEqual(transport({'x-forwarded-proto':'https'},{enforce:true,trustProxy:true}),{redirect:false,hsts:true});
site.googleSiteVerification='test"<token';
const html=layout({path:'/',title:'Test',description:'Test',body:'<h1>Test</h1>'});
assert.ok(html.includes('name="google-site-verification" content="test&quot;&lt;token"'));
site.googleSiteVerification='';
const routes=JSON.parse(await readFile('dist/route-manifest.json','utf8'));
const hosting=await readFile('dist/.htaccess','utf8');
const allRules=[...hosting.matchAll(/^RewriteRule (\S+) (\S+) \[R=301,L,NC,QSD\]$/gm)];
const privacyAlias=allRules.find(r=>r[1].startsWith('^privacy('));
assert.ok(privacyAlias);assert.equal(privacyAlias[2],'/privacy-policy/');
const rules=allRules.filter(r=>r!==privacyAlias);
assert.equal(rules.length,routes.filter(r=>r.path!=='/404/').length);
for(const route of routes.filter(r=>r.path!=='/404/')){
 const rule=rules.find(r=>r[2]===route.path);assert.ok(rule);
 const rx=new RegExp(rule[1],'i');
 for(const alias of [route.path.slice(1),route.path.slice(1).toUpperCase(),route.path.slice(1)+'index.html',route.path==='/'?'':route.path.slice(1,-1)])assert.ok(rx.test(alias));
 assert.ok(!rx.test('not-a-real-page'));
}
for(const route of routes){
 const source=await readFile(`dist${route.path}index.html`,'utf8');
 assert.ok(source.includes('property="og:image:width" content="1200"'));
 assert.ok(source.includes('property="og:image:alt" content="UtilityPilot'));
 const schema=JSON.parse(source.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
 assert.ok(schema.some(x=>x['@type']==='WebPage'&&x.url===site.origin+route.path));
 assert.ok(!source.includes('google-site-verification'),'No fabricated verification token');
}
const child=spawn(process.execPath,['scripts/serve.mjs'],{env:{...process.env,PORT:'4185',ENFORCE_HTTPS:'1',TRUST_PROXY:'1'},stdio:['ignore','pipe','pipe']});
try{
 await Promise.race([once(child.stdout,'data'),new Promise((_,reject)=>{const timer=setTimeout(()=>reject(Error('HTTPS test server startup timeout')),10000);timer.unref();})]);
 const base='http://127.0.0.1:4185';
 const redirect=await fetch(base+'/tools/text/word-counter',{redirect:'manual'});
 assert.equal(redirect.status,308);assert.equal(redirect.headers.get('location'),'https://utilitypilot.online/tools/text/word-counter/');
 const secure=await fetch(base+'/',{headers:{'X-Forwarded-Proto':'https'}});
 assert.equal(secure.status,200);assert.equal(secure.headers.get('strict-transport-security'),'max-age=31536000');
 const spoof=await fetch(base+'/',{headers:{'X-Forwarded-Proto':'https,http'},redirect:'manual'});assert.equal(spoof.status,308);
 for(const path of ['/privacy','/privacy/','/PRIVACY/index.html?unused=1']){
  const alias=await fetch(base+path,{headers:{'X-Forwarded-Proto':'https'},redirect:'manual'});
  assert.equal(alias.status,308);assert.equal(alias.headers.get('location'),'/privacy-policy/');
 }
 const missing=await fetch(base+'/adsense-missing-page/',{headers:{'X-Forwarded-Proto':'https'},redirect:'manual'});
 assert.equal(missing.status,404);assert.equal(missing.headers.get('location'),null);
 console.log(`SEO additions checked on ${routes.length} routes; verification escaping and HTTPS proxy integration passed.`);
}finally{child.kill();}
