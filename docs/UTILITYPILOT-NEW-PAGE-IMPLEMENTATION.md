# UtilityPilot new-tool implementation

Implementation begun 1 October and validated 2 October 2026. This extends the original site; it is not a rebuild. The [baseline audit](UTILITYPILOT-EXISTING-SITE-AUDIT.md) enumerates all original 32 tools. The [research report](UTILITYPILOT-NEW-PAGE-RESEARCH.md) records candidate decisions made before implementation.

## New tools and routes

Eight working tools, one category hub and one guide add **10 indexable URLs**. The site now contains **40 tools, five hubs, thirteen guides, 69 HTML routes and 67 sitemap URLs**. All original 32 tool routes remain present.

| New tool | Canonical path | Distinct functionality | Editorial words* |
|---|---|---|---:|
| JSON Viewer | `/tools/data/json-viewer/` | Collapsible tree, expand/collapse, literal search, JSON Pointer paths and complete formatted export | 677 |
| JSON Compare | `/tools/data/json-compare/` | Parsed structural comparison, additions/removals/changes, exact numbers, escaped property paths | 631 |
| Regex Tester | `/tools/developer/regex-tester/` | JavaScript pattern/flag testing, named/numbered captures, match positions and optional indices | 672 |
| JWT Decoder | `/tools/developer/jwt-decoder/` | Strict Base64URL/UTF-8 header/payload inspection with an explicit unverified result | 598 |
| UUID Generator | `/tools/developer/uuid-generator/` | Web Crypto UUID v4 batches of 1–100 identifiers | 659 |
| SHA Hash Generator | `/tools/developer/hash-generator/` | SHA-256, SHA-384 and SHA-512 over exact UTF-8 text | 626 |
| Unix Timestamp Converter | `/tools/developer/unix-timestamp/` | Seconds/milliseconds to UTC and explicit-offset dates to epoch values | 636 |
| Number Base Converter | `/tools/developer/number-base-converter/` | Exact signed-integer conversion between binary, octal, decimal and hexadecimal | 675 |

*Measured editorial section/FAQ text, excluding tool controls and site navigation; 5,174 words total. These were not length quotas. Each article has six or seven relevant sections and three task-specific FAQs. The working tool remains above the article. Examples have independently specified processor fixtures, including exact hashes, capture positions, number conversions and timestamp equivalence.

Additional URLs:

- `/tools/developer/`: a six-tool hub explaining token inspection, identifiers versus hashes, integer notation and regex testing.
- `/guides/inspect-api-data/`: a practical workflow distinguishing reading, converting and verifying API data.

## Architecture and processors

- `src/lib/developer.mjs`: bounded, independently testable async developer operations. Uses built-in RegExp, BigInt, TextEncoder/TextDecoder, Date and Web Crypto. JWT JSON parsing reuses the existing lossless parser.
- `src/lib/json-tools.mjs`: reuses `parseJSON` and `formatJSON` from the existing data processor. Objects compare by decoded keys, arrays by index, strings by decoded content and numbers by exact decimal normalization. No floating-point round trip is introduced for JSON values.
- `src/client/json-tree.mjs`: a viewer-only lazy chunk. Native details/summary controls support keyboard expansion. Search filters visible nodes while preserving ancestors. All user labels and values are text nodes; HTML in JSON remains inert.
- `src/data/new-configs.mjs`, `new-content.mjs` and `new-hubs.mjs`: samples/options, static editorial content and hub/guide definitions composed into the existing registries.
- Shared form/result rendering now supports meaningful input labels, per-tool limits, an explicit JWT notice and a no-input generator. Existing Copy, Download, Reset, Cancel, error focus, worker timeouts, table previews and statistics are reused. Downloads can supply their correct JSON MIME type.
- The worker dispatch lazily imports new processor modules only for relevant tools. Existing text/data/web algorithms and all image processors are unchanged. No package dependency was added.

## Important correctness choices

**JSON:** Both new tools reject invalid JSON and duplicate object keys with labelled error locations. Viewer input is limited to 1 MiB, 3,000 values and 50 nesting levels. Compare allows 1 MiB per document, 10,000 changes, 50 levels and 4,096-character numeric tokens. Object order and equivalent numeric spellings do not create differences; array order does. Reports are not executable JSON Patch documents. Before/after fields contain original JSON text, with a null field denoting absence.

**Regex:** The browser's JavaScript engine is explicitly identified. Supported flags are d/g/i/m/s/u/y, without duplicates. Positions are zero-based UTF-16 units, with exclusive ends. Optional unmatched groups become null. Zero-width iteration advances safely; the output is capped at 1,000 matches and marked when truncated. Test text is capped at 256 KiB and patterns at 4 KiB. A disposable worker supports immediate cancellation and an eight-second timeout, including a tested pathological backtracking expression. No eval, replacement code or arbitrary user JavaScript runs.

**JWT:** Three-part compact JSON tokens only; strict unpadded Base64URL, padding bits and UTF-8 checks. Header and payload must be JSON objects, and alg must be a nonempty string. An alg none sample illustrates an empty signature without presenting a real credential. Every result says it is unverified: no signature, issuer, audience, expiry or authorization checking is implied. JWE and non-JSON payloads are unsupported. Input cap is 64 KiB.

**UUID/hash:** Browser cryptographic APIs are required; there is no Math.random or external-service fallback. UUIDs are v4 only, with no global uniqueness guarantee. SHA-2 is hashing, not encryption, password storage or HMAC. Exact textarea text is encoded as UTF-8, including whitespace; malformed surrogate input is rejected. Hash input is bounded at 1 MiB. This is not a binary-file checksum service.

**Timestamp:** Units are explicit. Integer input is range-checked before conversion. Dates require a known numeric offset or Z; invalid calendar dates, 24:00, leap seconds, unknown -00:00 and sub-millisecond date precision are rejected. Both exported epoch values are decimal strings, preserving millisecond precision even at the supported Date range edges. UTC output uses ISO notation; named zones and scheduling are not offered.

**Number bases:** Every digit and optional matching prefix is validated before BigInt conversion. Inputs are limited to 4,096 digits. Results preserve large integers and use a minus sign for negatives, not an assumed two's-complement bit width. Fractions, exponents, internal separators and unsupported bases are rejected.

## Datasets, research and sources

No new reference dataset or third-party dependency is required. Existing Ahrefs exports are preserved unchanged. The user explicitly approved continuing with available research because no new-topic Ahrefs export or connected Keyword Explorer was available. New-topic volume, KD, Traffic Potential and Parent Topic are **N/A**, not invented. Current search-provider observations establish task expectations, not Google rankings, PAA or traffic forecasts.

The research report links the inspected primary product pages and technical sources: RFC 7519, RFC 9562, RFC 6901, RFC 3339, Web Crypto digest, JavaScript RegExp and BigInt documentation. Content is original and specific to this implementation. No platform limits, fake reviews, security certifications or ranking claims were added.

## Navigation, categories and internal links

Existing category URLs and navigation style remain intact. Developer Tools is a genuine six-tool hub, surfaced through the home category strip, directory filters, search, footer and breadcrumbs. Data & Tables now has eleven tools, with hub guidance distinguishing formatting, viewing, comparing and table conversion. Existing Text & Lists and Images counts are unchanged.

New search aliases include json tree viewer, json diff, regex checker, decode jwt, uuid v4 generator, sha256 hash generator, epoch converter and binary to decimal. Search tests exercise all eight new destinations. Visible tool totals are registry-derived; the About page's count/families and social preview asset were updated to reflect the expansion without rewriting trust policies.

Important connections:

- Existing JSON Formatter → JSON Viewer and JSON Compare.
- Existing Text Diff → JSON Compare and Regex Tester.
- Existing Base64 → JWT Decoder and SHA Hash Generator.
- Existing Find and Replace → Regex Tester.
- Existing Color Converter → Number Base Converter.
- New JSON tools → existing formatter, CSV conversion and Text Diff.
- JWT → Base64, timestamp conversion and JSON viewing.
- UUID ↔ hashing, with content explaining the different purposes.
- Number bases → color, Base64 and timestamps, each with a meaningful distinction.
- New tools ↔ the API inspection guide, existing hubs and relevant peers.

## Technical SEO and sitemap

Each new tool has a unique title and description, one H1, static sections, a self-canonical HTTPS URL and crawlable links. New hub/guide pages use the same metadata and breadcrumb generation. Existing WebSite/WebPage/BreadcrumbList schema remains in use; no invented ratings, offers or additional speculative schema was added.

The existing build generates `dist/sitemap.xml` automatically. Its indexable URL count increased from **57 to 67**, with no duplicates, parameters, fragment URLs, test routes or alternate keyword aliases. The route manifest has 69 pages because the existing report/error pages remain noindex. Robots points to the canonical sitemap. Hostinger redirect generation includes new routes automatically.

## Testing and accessibility

Completed validation evidence is recorded in the generated reports under ignored `test-results/` and the refreshed [route inventory](INDEXABILITY-AUDIT.csv). Commands use the production build served locally; set `AUDIT_BASE=http://127.0.0.1:4184` when using this task's preview.

| Check | Scope / result |
|---|---|
| `npm.cmd test` | 268 tests passed: original 186 plus 82 new processor cases |
| `npm.cmd run build` | 40 tools, 13 guides, 69 HTML routes, 67 sitemap URLs |
| `npm.cmd run test:browser` | All 40 tools and 69 routes passed; sample/copy/download/reset, mobile and Axe checks |
| `npm.cmd run audit:new-tools` | New controls, independently expected sample results, error focus, export bytes, tree search/keyboard, inert HTML, regex cancel/timeout, large worker inputs and static content |
| `node tests/new-tools-static.mjs` | Original 32 routes preserved; new page content, sitemap counts and lazy module boundaries checked |
| `npm.cmd run audit:site` | 2,665 internal references; unique metadata, canonicals, indexability, sitemap and bundle checks |
| `node tests/seo-checklist.mjs` | 69 routes; structured metadata, redirect rules, verification escaping and HTTPS proxy handling |
| `npm.cmd run audit:content` | Existing 44-row Ahrefs source and 42 content examples preserved; eight text pages and 357 fragment links checked |
| `npm.cmd run audit:history` | Existing five-keyword source and paragraph/counter functionality, exports and accessibility passed |
| `node tests/prelaunch-browser.mjs` | Passed: 81 independent original non-image fixtures, six image tools, all 69 routes, headings, links, redirects, sitemap, privacy/storage and no orphan pages |
| `node tests/workflows.mjs` | Passed: discovery, file uploads, columns, merge/split, JSON errors, inert markup, large text, image results and report preparation |
| Image/search/reset audit scripts | Passed: orientation, animation/pixel limits, compression, all five hubs' search controls and delayed image/reset cancellation |
| Syntax / type / lint | Node syntax checks for all source, scripts and tests; no configured TypeScript or lint task exists, so those are N/A |

Shared historical assertions that assumed 32 tools, 58 redirects or three JSON search suggestions were updated to registry/result-derived counts. The original synchronous tool smoke tests still cover all original tools; the new async/no-input tools have separate explicit contracts. No existing expected processor result was weakened to hide a regression.

New browser checks use 320, 390, 768 and 1280 pixel widths, keyboard Count/Run and native tree summaries, labelled search, error focus and Axe WCAG 2 A/AA plus 2.1 AA checks. Result screenshots for all eight new tools and a desktop JSON tree are recorded; tree, JWT and UUID results were visually inspected. Automated checks and targeted keyboard use are not a universal assistive-technology certification.

The final new-tool audit additionally passed a 49-level expanded mobile tree, synthetic JWT privacy-marker checks, five large valid worker fixtures, no automatic local/session storage and no cookies. All recorded browser reports have empty error/external-request lists. `git diff --check` passed. A sandbox filesystem restriction interrupted one build; the permitted build retry succeeded without changing build behavior to bypass the restriction.

## Performance and privacy

No new network service, account requirement or third-party script was introduced. All inputs remain in the browser processing workflow. User-provided markup is never inserted as executable HTML. JWT claims are displayed as untrusted data, not authenticated identities. Existing CSP, storage policy and local processing notices remain intact. Copy/download are explicit user actions.

Build inspection confirms developer processors, JSON processors and tree rendering are in lazy chunks, absent from the initial site/tool/worker modules. Approximate gzip sizes in this build: site 6,100 bytes, shared tool 8,135 bytes, worker 5,413 bytes, developer chunk 3,386 bytes, JSON-tools chunk 1,405 bytes and tree chunk 837 bytes. The updated social image is 32,490 bytes. Existing shared parser/entity/image chunks are reused. These are local bundle measurements, not live Core Web Vitals claims.

## Intentionally not built

No duplicate JSON formatter/validator/minifier, CSV conversion, encoding, URL parsing, color, contrast, slug or raster-processing page was created. No separate direction pages for timestamp/base conversions, no algorithm-specific hash pages and no generated input-value URLs exist.

YAML/XML, Markdown/HTML formatting, extraction, MIME lookup, image metadata/SVG, metadata/robots/sitemap generators, readability and QR generation remain conditional for the parser, security, coverage or maintenance reasons documented individually in the research table. Remote Open Graph, canonical and HTTP status checking were not built because reliable arbitrary-site access needs a server architecture with appropriate safeguards. MD5/SHA-1 lack a justified compatibility requirement for this release.

## Known limits and delivery

Tests target the installed Chrome and Node runtime; no claim of complete cross-browser coverage is made. Modern browser support is needed for BigInt, modules, workers and Web Crypto. Regex engine differences, array alignment choices, JSON input limits and unsupported file/date formats are explained on the pages.

Local preview: `http://127.0.0.1:4184/`, while the preview server is running. No commit, remote push or deployment has been performed for this expansion. Live hosting, TLS/CDN cache state, Search Console indexing and ranking outcomes are not established by local tests. Production release still uses the existing factual operator/contact/hosting configuration gate.
