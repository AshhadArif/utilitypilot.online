# UtilityPilot existing-site audit

Baseline inspected 1 October 2026, before new-tool implementation. Commit: 71fc38d. This is a snapshot, not the expanded inventory.

## Architecture

- Framework/routing: static HTML generated with Node.js ES modules; no React, Next, app/, pages/ or separate components/ tree. scripts/build.mjs creates 59 HTML routes, 57 indexable sitemap entries, 32 tools, four category hubs and twelve guides. scripts/serve.mjs handles canonical redirects and real 404 responses; Hostinger output is generated separately.
- Components: src/render.mjs supplies the page layout, breadcrumbs, cards, directory, shared labelled tool form, copy/download/reset, errors, results, related tools and guides. Existing prose classes and section content supply expandable editorial pages.
- Tool/data architecture: tools.json is the registry, configs.mjs supplies controls/samples, tool-content.mjs and text-content.mjs provide visible content. categories.mjs and guides.mjs supply hubs and guides. Search consumes a build-time registry projection, not a remote service.
- Processors: text.mjs, data.mjs and web.mjs run in a cancellable worker with an eight-second timeout; image-client.mjs is lazy loaded. common.mjs owns bounds and result contracts. JSON uses a lossless syntax tree, preserves number tokens, rejects duplicate keys and reports line/column errors. The formatter already validates and minifies. No regex, UUID, hash, JWT, timestamp, base conversion, JSON tree UI or structural JSON diff was found.
- SEO: shared canonical/robots/Open Graph/Twitter and WebSite/WebPage/BreadcrumbList data; sitemap generated from indexable manifest routes, no input/query URLs. Content is server-generated HTML readable without JavaScript. Two support/error routes are noindex.
- Privacy/security: local worker or canvas processing, inert text output, no eval, no transform API or automatic input storage. CSP restricts connections. HTTPS/local secure context is relevant to future Web Crypto use.
- Tests: Node processor/prelaunch tests, Chrome/Playwright/Axe browser checks, independent fixtures, route/link/indexability audits, workflow/image/search/reset checks and Ahrefs source/content audits. No TypeScript or lint script is configured. Existing scripts/audit.mjs hardcodes 57 sitemap entries; visible tool counts and search category labels also need safe registry-derived updates when extending.
- Configuration reviewed: package.json/lockfile, site.config.mjs, public/_headers, .gitignore, .gitattributes, build/serve/hostinger scripts. No additional AGENTS.md was found. Working tree was clean at baseline. Release configuration and deployment remain separate from implementation.

## Existing tools

| Tool | URL | Category | Functionality | Main Intent | New Opportunity? |
|---|---|---|---|---|---|
| Word and character counter | /tools/text/word-counter/ | text | Segment Unicode words and graphemes; count paragraph blocks separated by blank lines; reading seconds = ceil(words / chosen WPM * 60). | Count words, characters, paragraphs and lines in one text summary. | Existing intent: no duplicate page |
| Text cleaner | /tools/text/text-cleaner/ | text | Apply an explicit ordered pipeline; retain original and preview before applying. | Repair spacing after copying text. | Existing intent: no duplicate page |
| Remove duplicate lines | /tools/text/remove-duplicate-lines/ | text | Use normalized comparison keys while retaining the selected original line. | Remove repeated entries without changing list order. | Existing intent: no duplicate page |
| Sort lines | /tools/text/sort-lines/ | text | Stable sorting with explicit comparator and descending option. | Put a pasted list into useful order. | Existing intent: no duplicate page |
| Text case converter | /tools/text/case-converter/ | text | Locale-aware casing; documented heuristic sentence and title modes. | Normalize capitalization of pasted copy. | Existing intent: no duplicate page |
| Find and replace text | /tools/text/find-and-replace/ | text | Literal matching by default; preserve source; explicit Apply. | Change repeated literal text without editing each occurrence. | Existing intent: no duplicate page |
| Text difference checker | /tools/text/text-diff/ | text | Bounded diff algorithm in worker; context collapse optional. | Locate edits between two versions. | Existing intent: no duplicate page |
| Compare lists | /tools/text/compare-lists/ | text | Set membership; preserve first-seen order and show duplicate totals separately. | Find shared or missing entries in two lists. | Existing intent: no duplicate page |
| JSON formatter and validator | /tools/data/json-formatter/ | data | Tokenize and parse without eval; preserve number lexemes and key order. | Make JSON readable and identify syntax errors. | Existing intent: no duplicate page |
| JSON to CSV converter | /tools/data/json-to-csv/ | data | Union keys in first-seen order; nested arrays serialized as JSON; explicit object flattening. | Turn object records into spreadsheet-ready rows. | Existing intent: no duplicate page |
| CSV to JSON converter | /tools/data/csv-to-json/ | data | Parse quoted records; strings by default; opt-in types with warnings. | Prepare tabular exports for a JSON consumer. | Existing intent: no duplicate page |
| CSV viewer and validator | /tools/data/csv-viewer/ | data | Real record parser; bounded table preview distinct from full data. | Inspect a file before importing it. | Existing intent: no duplicate page |
| Remove duplicate CSV rows | /tools/data/csv-deduplicate/ | data | Compare tuples of field values rather than joined ambiguous strings. | Remove duplicate records by selected fields. | Existing intent: no duplicate page |
| CSV column editor | /tools/data/csv-column-editor/ | data | Operate on parsed field positions; keyboard reorder controls. | Select, rename and reorder fields for an import. | Existing intent: no duplicate page |
| CSV and TSV delimiter converter | /tools/data/delimiter-converter/ | data | Parse then serialize; never globally replace delimiter characters. | Match the delimiter expected by another application. | Existing intent: no duplicate page |
| Merge CSV files | /tools/data/csv-merge/ | data | MVP requires identical headers in identical order; append records once. | Append repeated exports into one dataset. | Existing intent: no duplicate page |
| Split CSV file | /tools/data/csv-split/ | data | Split parsed records instead of physical lines; generate parts on demand. | Produce smaller import batches. | Existing intent: no duplicate page |
| Image resizer | /tools/image/image-resizer/ | image | Decode orientation; raster resampling; aspect lock default. | Meet a pixel-dimension requirement. | Existing intent: no duplicate page |
| Image compressor | /tools/image/image-compressor/ | image | Bounded quality search for lossy encoders; PNG re-encode with honest limits. | Reduce bytes for an upload. | Existing intent: no duplicate page |
| Image format converter | /tools/image/image-converter/ | image | Decode and re-encode through supported browser codec; verify output MIME. | Use a supported format in another app. | Existing intent: no duplicate page |
| Image cropper | /tools/image/image-cropper/ | image | Integer pixel crop after orientation; numeric controls supplement pointer handles. | Remove unwanted borders or frame an image. | Existing intent: no duplicate page |
| Image size and dimension checker | /tools/image/image-inspector/ | image | Read file properties and decode dimensions; inspect pixels where needed. | Understand why an image fails requirements. | Existing intent: no duplicate page |
| Image color picker | /tools/image/image-color-picker/ | image | Sample decoded sRGB pixel or explicit average; show coordinates. | Sample usable colors from artwork. | Existing intent: no duplicate page |
| URL slug generator | /tools/web/slug-generator/ | web | Normalize with explicit locale and mapping policy; no uniqueness promise. | Prepare readable page or file identifiers. | Existing intent: no duplicate page |
| URL and query-string parser | /tools/web/url-parser/ | web | Use standards-based parser; retain duplicate keys and raw input. | Inspect components and repeated parameters. | Existing intent: no duplicate page |
| URL encoder and decoder | /tools/web/url-encoder-decoder/ | web | UTF-8 percent encoding; explicit mode; one decoding pass. | Encode a component or read escaped data. | Existing intent: no duplicate page |
| UTM campaign URL builder | /tools/web/utm-builder/ | web | Set UTM fields through URL API; preserve unrelated params; preview changes. | Create consistently tagged campaign links. | Existing intent: no duplicate page |
| URL tracking parameter cleaner | /tools/web/url-cleaner/ | web | Conservative versioned parameter list; preview Apply; no remote fetch. | Remove selected tracking fields before sharing. | Existing intent: no duplicate page |
| HEX RGB HSL converter | /tools/web/color-converter/ | web | sRGB conversion with stated rounding; reject unsupported spaces. | Translate a design color into another notation. | Existing intent: no duplicate page |
| Color contrast checker | /tools/web/contrast-checker/ | web | Relative luminance then (Llighter+0.05)/(Ldarker+0.05). | Check a foreground/background text pair. | Existing intent: no duplicate page |
| Base64 encoder and decoder | /tools/web/base64/ | web | Encode bytes with standard or URL-safe alphabet; strict padding validation. | Convert text to or from Base64 representation. | Existing intent: no duplicate page |
| HTML entity encoder and decoder | /tools/web/html-entities/ | web | Audited entity table/parser; no live markup insertion. | Escape markup as text or read encoded characters. | Existing intent: no duplicate page |

## Existing keyword coverage

| Keyword cluster | Existing canonical destination |
|---|---|
| word counter, online word counter, character count/counter, paragraph counter, line counter, basic text analyzer | /tools/text/word-counter/ with existing metric anchors |
| title/upper/lower/sentence case | /tools/text/case-converter/ |
| alphabetize, sort list/text | /tools/text/sort-lines/ |
| text diff, compare text, text comparison | /tools/text/text-diff/ |
| text cleaner, whitespace removal, formatter, hard wraps | /tools/text/text-cleaner/ |
| duplicate lines | /tools/text/remove-duplicate-lines/ |
| literal replacement, simple newline/comma list joining | /tools/text/find-and-replace/ |
| shared/missing list members | /tools/text/compare-lists/ |
| JSON formatter, validator, pretty print, beautifier, minifier | /tools/data/json-formatter/ |
| CSV to JSON; JSON to CSV | Existing respective data routes |
| Base64 encode/decode; percent encode/decode; HTML entities | Existing web/base64, url-encoder-decoder, html-entities routes |
| URL components, query parsing, UTM, link cleanup, slug | Existing web routes |
| HEX/RGB/HSL; WCAG text contrast | Existing color-converter and contrast-checker routes |
| dimensions, raster conversion/compression/crop/resize/color sample | Existing six image routes |

The supplied September Ahrefs overview has 44 text queries. The October export has twelve months and five counting queries; its metrics do not describe developer tools. The earlier keyword-opportunities.csv contains researched hypotheses, not measured Ahrefs volumes. Existing maps retain their original source context; they must not be extrapolated.

## Documentation and source review

Documentation inventory reviewed: ADSENSE-COMPLIANCE.md, BACKLINK-STRATEGY.md, COMPETITOR-RESEARCH.md, CONTENT-INTENT-AUDIT.csv, CONTENT-STRATEGY.md, DATA-PRIVACY-PLAN.md, HOSTINGER-DEPLOYMENT.md, IMPLEMENTATION-REPORT.md, INDEXABILITY-AUDIT.csv, INTERNAL-LINKING-PLAN.md, keyword-opportunities.csv, KEYWORD-RESEARCH.md, LONG-TAIL-OPPORTUNITIES.md, MVP-ROADMAP.md, PRD.md, PRE-LAUNCH-AUDIT.md, PROJECT-DECISIONS.md, RESEARCH-REPORT.md, RESEARCH-SOURCES.md, SEO-LAUNCH-CHECKLIST.md, SEO-PLAN.md, TOOL-CATALOG.md, TOOL-CATEGORY-STRATEGY.md, TOOL-PLATFORM-STRATEGY.md, URL-ARCHITECTURE.md, UTILITYPILOT-AHREFS-CONTENT-MAP-2026-09-28.md, UTILITYPILOT-AHREFS-CONTENT-MAP.md, UTILITYPILOT-AHREFS-SEO-IMPLEMENTATION.md, UTILITYPILOT-SEO-CONTENT-IMPLEMENTATION.md, WEBSITE-SPEC.md. Source/research inventories include docs/research/, src/, public/, tests/ and scripts/. Historical plans describing an empty repository or exactly 32 launch tools are treated as dated records, not current expansion restrictions. Source searches covered the supplied candidate names, transformations, routes, SEO, metadata, canonicals, schema and breadcrumbs. Existing tools and mode-level coverage were checked in processors/configuration, not inferred from navigation labels.

## Extension decision

Preserve every current route and all processors. Reuse the syntax tree for JSON Viewer and JSON Compare; add six distinct developer tools under one useful new hub. Keep the four existing hubs and add a developer guide. Reuse forms/results and lazy-load new processors; add only a bounded tree renderer and optional no-input generator form support. Update counts from registries, never from keyword-page totals. Candidate evidence and decisions are in UTILITYPILOT-NEW-PAGE-RESEARCH.md.
