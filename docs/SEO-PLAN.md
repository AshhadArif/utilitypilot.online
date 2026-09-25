# Search and technical SEO plan

Recommendations below are project decisions informed by official Google guidance. They are not promises of rankings or AdSense approval.

## Content and metadata

Every indexable page has a unique title, one clear H1, meaningful H2/H3 structure, concise distinct description, absolute canonical, intended robots, Open Graph metadata, crawlable explanations and relevant links. One H1 is a project convention, not a claim of a Google ranking requirement. Render metadata and supporting content in initial HTML. JavaScript enhances tools rather than supplying the only indexable explanation.

Example for text dedupe: title “Remove Duplicate Lines and Keep List Order | UtilityPilot”; H1 “Remove duplicate lines”; description explaining case/trim choices and preserved order. Do not stamp identical introductions on all tools. Image-converter copy covers supported formats on one page, not many direction aliases.

Google may generate titles/snippets differently from supplied metadata; do not promise exact character limits or previews. [Google snippet guidance](https://developers.google.com/search/docs/appearance/snippet)

## Crawl/index matrix

| URL type | Response | Indexing / canonical | Sitemap |
|---|---|---|---|
| Home, directory, four hubs, 32 tools, guides index, 12 guides | 200 | index,follow; self canonical | Yes |
| About | 200 | index,follow; self canonical | Yes |
| Contact, privacy policy, terms, cookie policy, disclaimer | 200 | index,follow; self canonical; no traffic-target copy | Yes |
| Report an error | 200 | noindex,follow; functional support form | No |
| Optional search/query/filter URL | 200 if supported | noindex,follow; no input echoed into metadata | No |
| Tool state/download blob | No separate indexable page | In-memory only | No |
| Unknown/removed with no replacement | 404/410 | Actual HTTP failure; no soft-404 fallback | No |
| Private preview/staging | Auth preferred; otherwise noindex | Not linked publicly | No |

Final sitemap therefore has 57 indexable HTML URLs if all 51 content pages and six indexable trust pages are published. 51 remains the launch content target excluding trust pages. No indexable report submission/success pages.

robots.txt permits public content/assets needed for rendering and points to the sitemap. Do not use robots blocking as a substitute for noindex: crawlers need access to read noindex. [Google noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing)

Canonical tags, internal links, redirects and sitemap entries must agree. Canonical is a signal rather than a guarantee. [Canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)

## Structured data

Use truthful WebSite/Organization metadata with supplied operator details, BreadcrumbList for genuine visible breadcrumbs and appropriate Article metadata on authored guides. WebApplication/SoftwareApplication is optional descriptive markup only when required facts are present; do not invent ratings/reviews/prices to chase rich results. Schema.org validity does not guarantee a supported Google enhancement.

No FAQ/HowTo rich-result dependency. The former FAQ documentation redirected to Search updates during research; verify current supported features before implementation. Useful FAQs can remain plain content. All markup must reflect visible content. [Google structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)

## Original value and spam avoidance

No keyword doorway variants, target-size pages, thousands of conversion pairs, cross-domain copies, scraped guides or pretend tools. Public tool links must open working functions. Page quantity cannot substitute for utility. [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies)

## Internal discovery

Use real anchors with href for tools, hubs and guides; keep every published tool within home -> directory/hub -> tool. Related links reflect input/output compatibility and user intent. No empty categories or links to planned tools. [Google link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)

## Prompt 2 checks

Crawl the built output and a production-like server. Verify all status codes, canonical hosts/slashes, title/meta/H1 uniqueness, robots/noindex, sitemap parity, non-orphan links, no broken guide relations, and initial HTML content with JS disabled. Inspect actual output behind CDN redirects. Validate chosen structured data against current official tooling where available.

Performance targets are internal budgets in WEBSITE-SPEC; measure actual mobile loading and interaction, not guessed scores. Reserve any editorial ad space to reduce layout movement. Search Console setup and sitemap submission require access to the real property and are deployment work, not performed in Prompt 1.

## Ongoing work

Monitor indexing, genuine query impressions, user-reported failures and broken internal links. Improve existing pages before creating new ones. Recheck policy/dependency changes before monetization or major releases. No paid link schemes or reciprocal portfolio link blocks.

