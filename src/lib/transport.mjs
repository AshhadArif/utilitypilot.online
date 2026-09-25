// Enable only when an inaccessible-to-the-public origin sits behind a trusted
// TLS proxy that overwrites X-Forwarded-Proto (never merely appends to it).
export function transport(headers,{enforce=false,trustProxy=false}={}){
 const secure=trustProxy&&headers['x-forwarded-proto']==='https';
 return {redirect:enforce&&!secure,hsts:enforce&&secure};
}
