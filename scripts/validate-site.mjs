// These are release checks for this project, not a list of Google requirements.
export function validateSite(site,{release=false}={}){
 const keys=['operator','contactEmail','hostName','hostPrivacyUrl','logRetention'];
 for(const key of keys){
  if(typeof site[key]!=='string'||/[\u0000-\u001f\u007f]/u.test(site[key]))throw Error(`Invalid site configuration: ${key}`);
  if(release&&!site[key].trim())throw Error(`Release requires factual site configuration: ${key}`);
 }
 // A contact value becomes a mailto recipient; reject URI query/header injection.
 if(site.contactEmail&&!/^[A-Za-z0-9.!$'*+_~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/.test(site.contactEmail))throw Error('CONTACT_EMAIL must be a plain email address without URI parameters.');
 if(site.hostPrivacyUrl){
  let url;try{url=new URL(site.hostPrivacyUrl);}catch{throw Error('HOST_PRIVACY_URL must be a complete HTTPS URL.');}
  if(url.protocol!=='https:'||url.username||url.password)throw Error('HOST_PRIVACY_URL must be an HTTPS URL without credentials.');
 }
}
