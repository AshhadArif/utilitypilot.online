# URL architecture

Latest Ahrefs expansion: [implementation report](UTILITYPILOT-EXPANSION-IMPLEMENTATION.md). Current totals are **43 tools, five hubs, 13 guides, 72 HTML routes and 70 indexable sitemap URLs**. Added `/tools/data/json-yaml-converter/`, `/tools/developer/unicode-converter/` and `/tools/web/markdown-to-html/`. All previous paths remain canonical and available. The earlier expansion and launch notes below are historical.

Expansion update, 2 October 2026: the [new-tool implementation](UTILITYPILOT-NEW-PAGE-IMPLEMENTATION.md) adds eight tool routes, `/tools/developer/` and `/guides/inspect-api-data/`. Current totals are 40 tools, five hubs, thirteen guides, 69 HTML routes and 67 indexable sitemap URLs. Existing canonical paths are preserved. The original launch plan below is historical.

Canonical origin: https://utilitypilot.online. Lowercase, hyphens, trailing slash for HTML pages. One primary category per tool. Stable artifact-based paths make scope legible and future additions predictable. No year, version, device, locale or “free-online” tokens in tool slugs.

## Public structure

- / — homepage.
- /tools/ — complete directory.
- /tools/text/, /tools/data/, /tools/image/, /tools/web/ — four launch hubs.
- /tools/{family}/{tool}/ — exactly 32 canonical tools from TOOL-CATALOG.
- /guides/ — editorial index.
- /guides/{topic}/ — 12 guides from CONTENT-STRATEGY.
- /about/, /contact/, /privacy-policy/, /terms/, /cookie-policy/, /disclaimer/, /report-an-error/ — seven trust/contact routes.
- /404/ — optional rendered 404 resource; unknown requested URLs must themselves return HTTP 404.
- /sitemap.xml and /robots.txt — generated technical endpoints.

No /privacy/ duplicate: use /privacy-policy/ for actual practices. Methodology lives on each tool and the relevant guides; no thin /methodology/ index at launch. No /tools/calculators/ or /tools/developer/ launch category. No public deferred URLs.

## URL state

Finder query, filters, sorting and tool settings stay client-side and must not create crawlable URL variants. Tool input/output must never enter query strings or fragments, browser history, canonical metadata or share URLs. Tool-state sharing is outside MVP.

If a legacy/external ?q= request is supported, return noindex,follow and keep it out of sitemap; allow crawling to see noindex. Unknown query parameters must not generate new content. Tracking-only duplicates canonicalize to the clean page and may be cleaned by redirect without losing required campaign attribution. Define behavior at host/router level, not merely a client effect.

## Redirects and failures

Redirect HTTP -> HTTPS, www -> apex and missing slash -> canonical with a permanent redirect where supported, avoiding chains. Retired same-intent aliases redirect to the surviving tool. Do not create aliases just to target keywords. No future routes returning a generic 200 homepage. Unknown paths return true 404 with search/category links.

If a tool is removed and no equivalent exists, return 404/410 and remove internal links/sitemap entry. Do not redirect unrelated removed tools to home. If category changes after launch, preserve existing tool URL unless there is a strong migration reason.

## Page accounting

51 intended indexable content pages = 1 home + 1 directory + 4 hubs + 32 tools + 1 guides index + 12 guides. Seven trust/contact pages are additional; robots/indexing choices are in SEO-PLAN. 404/search/state/generated downloads are not content inventory.
