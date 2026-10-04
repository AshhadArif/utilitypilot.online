export function hostingerConfig(pages){
 const aliases=pages.filter(p=>p.path!=='/404/').map(({path})=>{
  const stem=path.slice(1,-1).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const pattern=path==='/'?'^(?:index\\.html)?$':`^${stem}(?:/index\\.html|/)?$`;
  return `RewriteCond %{REQUEST_URI} !^${path}$ [OR]\nRewriteCond %{QUERY_STRING} !^$\nRewriteRule ${pattern} ${path} [R=301,L,NC,QSD]`;
 }).join('\n');
 return `# Generated for Hostinger static web hosting (Apache/LiteSpeed).
# Install a valid SSL certificate before uploading. Do not use flexible HTTP-origin TLS.
Options -Indexes -MultiViews
DirectoryIndex index.html
ErrorDocument 404 /404.html
RewriteEngine On
RewriteCond %{HTTPS} !=on [OR]
RewriteCond %{HTTP_HOST} !^utilitypilot\\.online$ [NC]
RewriteRule ^ https://utilitypilot.online%{REQUEST_URI} [R=301,L]
# Build metadata is not a public resource.
RewriteRule ^(?:route-manifest\\.json|_headers)$ - [R=404,L]
RewriteRule ^404(?:/index\\.html|/)?$ - [R=404,L,NC]
RewriteCond %{THE_REQUEST} "\\s/+404\\.html(?:[?\\s])" [NC]
RewriteRule ^404\\.html$ /404/ [R=301,L]
# Canonicalize only known pages; unknown URLs remain genuine 404s.
RewriteRule ^privacy(?:/index\\.html|/)?$ /privacy-policy/ [R=301,L,NC,QSD]
${aliases}
<IfModule mod_headers.c>
 Header always set X-Content-Type-Options "nosniff"
 Header always set Referrer-Policy "no-referrer"
 Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
 Header always set Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; font-src 'self'; connect-src 'none'; worker-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"
 <FilesMatch "\\.(html|js|css|json|xml|txt|png|svg)$">
  Header set Cache-Control "public, max-age=0, must-revalidate"
 </FilesMatch>
 <FilesMatch "-[A-Z0-9]{8}\\.js$">
  Header set Cache-Control "public, max-age=31536000, immutable"
 </FilesMatch>
</IfModule>
<IfModule mod_deflate.c>
 AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json application/xml text/plain image/svg+xml
</IfModule>
`;
}
