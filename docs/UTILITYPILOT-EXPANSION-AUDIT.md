# UtilityPilot expansion audit

Baseline: 2026-10-02, before this expansion. The actual repository contains **40 tools**, five category hubs, 13 guides, 69 HTML routes and 67 indexable sitemap URLs. The original 32 are retained; eight developer/JSON tools were added in the prior release.

## Architecture and review scope

Static Node ES modules, esbuild code splitting and generated HTML; no framework router or server processing API. Reviewed README, package/configuration, source tree, original and added processors, render and client modules, registry, categories, guides, trust pages, build/serve/Hostinger scripts, tests, documentation and research inventories. Earlier strategy documents describe historical counts; executable registry and build manifest determine the current site.

- Routing/content: tools.json owns canonical tool paths. configs.mjs composes options; tool-content.mjs composes editorial data. render.mjs emits the common form, static article, breadcrumbs and related links. Guides and five category hubs are static HTML with crawlable cards.
- Processing: text/data/web dispatch runs in disposable workers with 8-second cancellation; developer and JSON exploration load lazily. Images use bounded local Canvas processing. Copy/download/reset are shared.
- SEO: build.mjs generates sitemap from indexable routes; layout emits canonical, unique metadata, OG and WebPage/BreadcrumbList. Report-an-error and 404 remain noindex. No per-input URLs.
- Search: registry aliases feed a local index; queries are not persisted or transmitted. Categories and footer list actual registered tools.
- Privacy/security: no processing endpoint, input analytics or automatic input persistence found; CSP connect-src none, worker-src self. Safe text nodes are used for results. Trust pages distinguish hosting requests from local input processing. Release builds still require verified operator/contact/hosting facts.
- Accessibility/mobile: labeled native controls, focusable errors, live status, keyboard-accessible result tables and trees; responsive grids and scrollable output. Existing Playwright/Axe audits cover all routes and tools.
- Testing: node:test processor suites, browser workflows, image/reset/search audits, SEO/content/history audits and prior-new-tool audits. No existing lint/typecheck command. Tests containing fixed 40/69/67 counts need expansion without weakening baseline checks.

## Existing tools, routes and coverage

| Tool | URL | Category | Functionality / intent | Expansion decision |
|---|---|---|---|---|
| Word and character counter | /tools/text/word-counter/ | text | Segment Unicode words and graphemes; count paragraph blocks separated by blank lines; reading seconds = ceil(words / chosen WPM * 60). | Preserve; link relevant new workflows |
| Text cleaner | /tools/text/text-cleaner/ | text | Apply an explicit ordered pipeline; retain original and preview before applying. | Preserve; link relevant new workflows |
| Remove duplicate lines | /tools/text/remove-duplicate-lines/ | text | Use normalized comparison keys while retaining the selected original line. | Preserve; link relevant new workflows |
| Sort lines | /tools/text/sort-lines/ | text | Stable sorting with explicit comparator and descending option. | Preserve; link relevant new workflows |
| Text case converter | /tools/text/case-converter/ | text | Locale-aware casing; documented heuristic sentence and title modes. | Preserve; link relevant new workflows |
| Find and replace text | /tools/text/find-and-replace/ | text | Literal matching by default; preserve source; explicit Apply. | Preserve; link relevant new workflows |
| Text difference checker | /tools/text/text-diff/ | text | Bounded diff algorithm in worker; context collapse optional. | Preserve; link relevant new workflows |
| Compare lists | /tools/text/compare-lists/ | text | Set membership; preserve first-seen order and show duplicate totals separately. | Preserve; link relevant new workflows |
| JSON formatter and validator | /tools/data/json-formatter/ | data | Tokenize and parse without eval; preserve number lexemes and key order. | Improve existing page/tool |
| JSON to CSV converter | /tools/data/json-to-csv/ | data | Union keys in first-seen order; nested arrays serialized as JSON; explicit object flattening. | Improve existing page/tool |
| CSV to JSON converter | /tools/data/csv-to-json/ | data | Parse quoted records; strings by default; opt-in types with warnings. | Improve existing page/tool |
| CSV viewer and validator | /tools/data/csv-viewer/ | data | Real record parser; bounded table preview distinct from full data. | Preserve; link relevant new workflows |
| Remove duplicate CSV rows | /tools/data/csv-deduplicate/ | data | Compare tuples of field values rather than joined ambiguous strings. | Preserve; link relevant new workflows |
| CSV column editor | /tools/data/csv-column-editor/ | data | Operate on parsed field positions; keyboard reorder controls. | Preserve; link relevant new workflows |
| CSV and TSV delimiter converter | /tools/data/delimiter-converter/ | data | Parse then serialize; never globally replace delimiter characters. | Preserve; link relevant new workflows |
| Merge CSV files | /tools/data/csv-merge/ | data | MVP requires identical headers in identical order; append records once. | Preserve; link relevant new workflows |
| Split CSV file | /tools/data/csv-split/ | data | Split parsed records instead of physical lines; generate parts on demand. | Preserve; link relevant new workflows |
| Image resizer | /tools/image/image-resizer/ | image | Decode orientation; raster resampling; aspect lock default. | Preserve; link relevant new workflows |
| Image compressor | /tools/image/image-compressor/ | image | Bounded quality search for lossy encoders; PNG re-encode with honest limits. | Preserve; link relevant new workflows |
| Image format converter | /tools/image/image-converter/ | image | Decode and re-encode through supported browser codec; verify output MIME. | Preserve; link relevant new workflows |
| Image cropper | /tools/image/image-cropper/ | image | Integer pixel crop after orientation; numeric controls supplement pointer handles. | Preserve; link relevant new workflows |
| Image size and dimension checker | /tools/image/image-inspector/ | image | Read file properties and decode dimensions; inspect pixels where needed. | Preserve; link relevant new workflows |
| Image color picker | /tools/image/image-color-picker/ | image | Sample decoded sRGB pixel or explicit average; show coordinates. | Preserve; link relevant new workflows |
| URL slug generator | /tools/web/slug-generator/ | web | Normalize with explicit locale and mapping policy; no uniqueness promise. | Preserve; link relevant new workflows |
| URL and query-string parser | /tools/web/url-parser/ | web | Use standards-based parser; retain duplicate keys and raw input. | Preserve; link relevant new workflows |
| URL encoder and decoder | /tools/web/url-encoder-decoder/ | web | UTF-8 percent encoding; explicit mode; one decoding pass. | Improve existing page/tool |
| UTM campaign URL builder | /tools/web/utm-builder/ | web | Set UTM fields through URL API; preserve unrelated params; preview changes. | Preserve; link relevant new workflows |
| URL tracking parameter cleaner | /tools/web/url-cleaner/ | web | Conservative versioned parameter list; preview Apply; no remote fetch. | Preserve; link relevant new workflows |
| HEX RGB HSL converter | /tools/web/color-converter/ | web | sRGB conversion with stated rounding; reject unsupported spaces. | Preserve; link relevant new workflows |
| Color contrast checker | /tools/web/contrast-checker/ | web | Relative luminance then (Llighter+0.05)/(Ldarker+0.05). | Improve existing page/tool |
| Base64 encoder and decoder | /tools/web/base64/ | web | Encode bytes with standard or URL-safe alphabet; strict padding validation. | Improve existing page/tool |
| HTML entity encoder and decoder | /tools/web/html-entities/ | web | Audited entity table/parser; no live markup insertion. | Improve existing page/tool |
| JSON Viewer | /tools/data/json-viewer/ | data | Parse a lossless syntax tree, render bounded expandable nodes and filter by text. | Preserve; link relevant new workflows |
| JSON Compare | /tools/data/json-compare/ | data | Compare parsed objects by key, arrays by position and numbers by exact decimal value. | Preserve; link relevant new workflows |
| Regex Tester | /tools/developer/regex-tester/ | developer | Execute RegExp in a terminated-on-timeout worker, limiting output to 1,000 matches. | Preserve; link relevant new workflows |
| JWT Decoder | /tools/developer/jwt-decoder/ | developer | Strict Base64URL and UTF-8 decoding plus lossless JSON parsing; no signature verification. | Improve existing page/tool |
| UUID Generator | /tools/developer/uuid-generator/ | developer | Browser Web Crypto randomUUID; bounded batches of 1–100. | Preserve; link relevant new workflows |
| SHA Hash Generator | /tools/developer/hash-generator/ | developer | TextEncoder then Web Crypto digest; no trimming or normalization. | Preserve; link relevant new workflows |
| Unix Timestamp Converter | /tools/developer/unix-timestamp/ | developer | Explicit integer units, UTC output and calendar-validated zoned date input. | Preserve; link relevant new workflows |
| Number Base Converter | /tools/developer/number-base-converter/ | developer | Validate all digits and prefixes before BigInt base conversion. | Preserve; link relevant new workflows |

## Coverage and cannibalization

Word/character/paragraph/line counting belongs to the existing Word Counter; text case variants belong to Case Converter; alphabetizing belongs to Sort Lines. Existing text content and Ahrefs research remain intact. JSON validation, beautification and minification already exist in JSON Formatter. JSON Viewer and JSON Compare serve distinct exploration and structural comparison needs. Base64, URL encoding, HTML entities, UUID and SHA aliases must stay on existing URLs.

## Genuine gaps and issues

JSON/YAML conversion, Unicode escapes/code points and Markdown parsing have no processor, config or hidden route. Contrast has correct ratio evaluation but no color picker/swap controls. JWT has correct decode-only warnings but does not interpret time claims inline. Original data/web articles are much shorter than the prior text/developer expansion. These are opportunities to improve existing pages instead of manufacturing aliases. No broken baseline routes were established during source inspection; runtime validation follows implementation.

Existing trust/support pages and image operations will be preserved. No new category is needed: each chosen tool fits an existing populated hub.
