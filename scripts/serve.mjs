import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {gzipSync} from 'node:zlib';
import {transport} from '../src/lib/transport.mjs';
const enforce=process.env.ENFORCE_HTTPS==='1',trustProxy=process.env.TRUST_PROXY==='1';
if(enforce&&!trustProxy)throw Error('HTTPS mode requires a trusted TLS proxy and TRUST_PROXY=1; this server does not terminate TLS.');
const root=path.resolve('dist'),port=Number(process.env.PORT||4173),host=process.env.BIND_HOST||'127.0.0.1';
const csp="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; font-src 'self'; connect-src 'none'; worker-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'";
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.xml':'application/xml','.txt':'text/plain; charset=utf-8','.svg':'image/svg+xml','.png':'image/png'};
const routes=JSON.parse(await readFile(path.join(root,'route-manifest.json'),'utf8'));
const routeMap=new Map(routes.map(r=>[r.path,r]));
const server=http.createServer(async(req,res)=>{try{
 res.setHeader('Content-Security-Policy',csp);res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});res.end();return;}
 if(!req.url.startsWith('/')||req.url.startsWith('//')||/[\\\x00-\x20]/.test(req.url)){res.writeHead(400);res.end('Invalid path');return;}
 const url=new URL(req.url,'http://localhost');let pathname;try{pathname=decodeURIComponent(url.pathname);}catch{res.writeHead(400);res.end('Invalid path');return;}
 if(/[\\\x00-\x1f\x7f]/.test(pathname)||/%(?:2f|5c)/i.test(url.pathname)){res.writeHead(400);res.end('Invalid path');return;}
 const normalized=pathname.replace(/\/{2,}/g,'/').toLowerCase().replace(/\/index\.html$/,'/');
 const canonical=['/privacy','/privacy/'].includes(normalized)?'/privacy-policy/':routeMap.has(normalized)?normalized:routeMap.has(normalized+'/')?normalized+'/':null;
 const tls=transport(req.headers,{enforce,trustProxy});
 if(tls.redirect){res.writeHead(308,{Location:'https://utilitypilot.online'+(canonical||url.pathname),'Cache-Control':'no-store'});res.end();return;}
 if(tls.hsts)res.setHeader('Strict-Transport-Security','max-age=31536000');
 const www=/^www\.utilitypilot\.online(?::\d+)?$/i.test(req.headers.host||'');
 if(canonical&&(url.pathname!==canonical||url.search||www)){res.writeHead(308,{Location:(www?'https://utilitypilot.online':'')+canonical,'Cache-Control':'no-store'});res.end();return;}
 if(!canonical&&www){res.writeHead(308,{Location:'https://utilitypilot.online'+url.pathname});res.end();return;}
 if(!canonical&&url.search){res.writeHead(308,{Location:url.pathname,'Cache-Control':'no-store'});res.end();return;}
 if(canonical)pathname=canonical;
 let file=path.resolve(root,'.'+pathname);if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 let code=200;try{if(canonical)file=path.join(file,'index.html');else if(!pathname.startsWith('/assets/')&&!['/favicon.svg','/sitemap.xml','/robots.txt','/404.html'].includes(pathname))throw Error('Unknown route');if((await stat(file)).isDirectory())throw Error('Not a resource');if(pathname==='/404/'||pathname==='/404.html')code=404;}catch{file=path.join(root,'404.html');code=404;}
 let body=await readFile(file),ext=path.extname(file);const headers={'Content-Type':types[ext]||'application/octet-stream','Content-Security-Policy':csp,'X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Permissions-Policy':'camera=(), microphone=(), geolocation=()','Cache-Control':ext==='.html'?'no-cache':'public, max-age=3600'};
 if(/\bgzip\b/.test(req.headers['accept-encoding']||'')&&['.html','.js','.css','.json','.xml','.svg'].includes(ext)){body=gzipSync(body);headers['Content-Encoding']='gzip';headers.Vary='Accept-Encoding';}
 headers['Content-Length']=body.length;res.writeHead(code,headers);res.end(req.method==='HEAD'?undefined:body);
 }catch{res.writeHead(500,{'Content-Type':'text/plain'});res.end('Unable to serve this request.');}});
server.listen(port,host,()=>console.log(`UtilityPilot preview: http://${host}:${port}`));
