import test from 'node:test';
import assert from 'node:assert/strict';
import {validateSite} from '../scripts/validate-site.mjs';
import {runWeb} from '../src/lib/web.mjs';
import {layout} from '../src/render.mjs';
import {hostingerConfig} from '../scripts/hostinger.mjs';
const empty={operator:'',contactEmail:'',hostName:'',hostPrivacyUrl:'',logRetention:''};
const fixture={operator:'Test fixture',contactEmail:'test@example.com',hostName:'Fixture host',hostPrivacyUrl:'https://example.com/privacy',logRetention:'Fixture value'};
test('release guard rejects missing/blank facts; preview accepts absent facts',()=>{
 assert.doesNotThrow(()=>validateSite(empty));
 for(const key of Object.keys(empty))assert.throws(()=>validateSite({...fixture,[key]:'  '},{release:true}),/Release requires/);
 assert.doesNotThrow(()=>validateSite(fixture,{release:true}));
});
test('configuration cannot inject mail headers or executable privacy links',()=>{
 for(const email of ['a@example.com?bcc=b@example.org','a?bcc=x@example.com','a%0abcc=x@example.com','a@example.com\n'])assert.throws(()=>validateSite({...fixture,contactEmail:email}));
 for(const url of ['javascript:alert(1)','http://example.com','https://user:pass@example.com','not a url'])assert.throws(()=>validateSite({...fixture,hostPrivacyUrl:url}));
});
test('14pt bold meets the exact large-text boundary without decimal rounding',()=>{
 const check=size=>runWeb('contrast-checker','#888','#fff',{bold:true,size}).stats['Selected text AA'];
 assert.equal(check(14*96/72),'Pass');assert.equal(check(14*96/72-0.000001),'Fail');
});
test('structured metadata preserves angle brackets without closing the script',()=>{
 const title='A < B </script><script>unsafe</script>';
 const html=layout({path:'/',title,description:title,body:'<h1>Fixture</h1>'});
 const raw=html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1];
 assert.ok(!raw.includes('<'));assert.equal(JSON.parse(raw)[1].name,title);
});
test('privacy alias redirects to the existing policy instead of adding a duplicate',()=>{
 assert.ok(hostingerConfig([]).includes('RewriteRule ^privacy(?:/index\\.html|/)?$ /privacy-policy/ [R=301,L,NC,QSD]'));
});
test('404 redirect checks the original request so internal error documents stay 404',()=>{
 const config=hostingerConfig([]);
 assert.ok(config.includes('RewriteCond %{THE_REQUEST} "\\s/+404\\.html(?:[?\\s])" [NC]'));
 assert.ok(!config.includes('ENV:REDIRECT_STATUS'));
});
