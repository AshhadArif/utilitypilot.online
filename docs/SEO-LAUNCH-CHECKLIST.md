# SEO delivery and deployment checklist

September 26, 2026. Local implementation is separate from public deployment and Search Console ownership verification.

## Implemented

- Build-generated `dist/sitemap.xml`: 57 canonical HTTPS URLs. `dist/robots.txt` allows crawling and names the sitemap.
- All 57 indexable pages have index/follow, unique titles and descriptions, canonical URLs and one H1. The 404 and error-report form intentionally retain noindex; neither is a search landing page.
- Stable lowercase descriptive slugs; preview server redirects known case, trailing-slash, index.html and query aliases to canonical paths. Static hosting must implement equivalent behavior.
- Static crawlable content, ordinary internal anchor links, category hubs, related tools/guides, breadcrumbs and JSON-LD WebSite, WebPage and BreadcrumbList where appropriate. No fabricated reviews, ratings or author credentials.
- 1200 × 630 social PNG, OG title/description/URL/image dimensions/alt and large-image Twitter card. OG PNG losslessly reduced from 35,113 to 34,107 bytes; no pixel changes. Regenerate with `node scripts/create-social.mjs` then `node scripts/optimize-social.mjs`.
- Tool image previews have useful alt text, explicit width/height and asynchronous decoding. Decorative SVGs are hidden from assistive technology. No unnecessary hero photographs.
- Minified CSS, narrowly scoped search index, split JavaScript, lazy image processing, workers, gzip in the preview server, system fonts and no third-party tracking scripts. Search entry shrank from 31,735 to 16,040 raw bytes (9,147 to 5,209 gzip bytes).

## Hosting and HTTPS

The owner identified Hostinger. The build now emits `dist/.htaccess` for standard Hostinger Apache/LiteSpeed web hosting; use the [Hostinger deployment instructions](HOSTINGER-DEPLOYMENT.md). The reverse-proxy instructions below apply only if hosting the Node origin instead.

The Node server is an HTTP origin/preview, not a certificate issuer or TLS terminator. For a reverse-proxy deployment, provision a valid certificate for `utilitypilot.online` and `www.utilitypilot.online`. Restrict origin access to the trusted proxy; it must overwrite `X-Forwarded-Proto` with exactly `https` or `http`, never pass through client-supplied values. Then run the origin with `ENFORCE_HTTPS=1` and `TRUST_PROXY=1`. HTTP-origin requests redirect to the fixed HTTPS canonical hostname. Secure forwarded responses carry HSTS for one year. Do not enable this behind an untrusted/publicly accessible origin or a proxy that does not overwrite the header. The default loopback bind helps keep the origin private.

For a static host, configure its HTTPS/hostname redirect and security-header features instead; `scripts/serve.mjs` does not run on static hosting. The supplied `_headers` file is only effective on hosts that recognize that format. Confirm actual response headers on the chosen host. Do not assume local proxy tests prove live TLS.

After deployment, verify certificate coverage, HTTP-to-HTTPS redirects for home/tool/assets, www-to-apex redirects, canonical paths, true 404 responses, security headers, compression, sitemap and robots availability. Confirm redirects do not loop. Use long immutable caching only for hashed assets; revalidate HTML and non-hashed entry assets when deploying updates.

## Search Console ownership verification

For a URL-prefix property `https://utilitypilot.online/`, obtain the real HTML-tag verification value from the owner’s Search Console account. Set `GOOGLE_SITE_VERIFICATION` to that value (not the whole tag), rebuild and deploy. The shared layout safely escapes it. No tag is emitted when the value is absent. Click Verify in the owner account only after the public homepage serves the tag; retain it in subsequent builds. A Domain property instead needs the Google-provided DNS TXT record at the DNS provider. No account verification has been claimed or performed locally. See [Google's verification instructions](https://support.google.com/webmasters/answer/9008080?hl=en).

After successful verification, submit `https://utilitypilot.online/sitemap.xml` and inspect the home, category, guide and representative tool URLs. Submission and technically indexable pages do not guarantee indexing or rankings.

## Core Web Vitals

The changes reduce transferred/parsed JavaScript, CSS and image bytes and reserve output-image space. They do not establish a public Core Web Vitals pass. Run PageSpeed Insights on the deployed site and use Search Console/CrUX when field data exists. Check LCP, INP and CLS by device; test large input interactions separately. Local automated browser checks do not replace real-user measurements. See [Google's measurement guidance](https://web.dev/articles/vitals-measurement-getting-started).

## Release facts still required

Real operator/contact details, hosting provider and log-retention practices remain required by the existing `RELEASE=1` guard. Hosting access and the actual verification token/DNS record must come from the owner. No new ads, analytics, email delivery or external data processing were added.

Backlink work: [editorial strategy](BACKLINK-STRATEGY.md). Independent pre-launch findings: [audit](PRE-LAUNCH-AUDIT.md).

## Checks rerun for this change

- Production build succeeded: 59 routes, 57 sitemap URLs.
- Processor tests: 163 passed.
- Static audit: 2,053 internal links checked; no missing targets; no duplicate titles or descriptions; canonicals, one H1 and indexability passed.
- Chrome browser suite: all 32 tools and 59 routes passed, including mobile layout and automated accessibility checks.
- Independent pre-launch browser suite: all tools, route graph, heading order, sitemap, redirects, malformed paths, privacy and storage passed.
- Added SEO tests: all 59 routes include WebPage schema and OG dimensions/alt; verification-token escaping and omission without a real token passed; HTTPS proxy integration passed. Generated canonical patterns cover all 58 non-404 routes and their case/index/slash aliases. Pattern checks are not a live Apache/LiteSpeed execution test.

No live deployment, certificate validation, account verification, field Core Web Vitals result or earned backlink is claimed.
