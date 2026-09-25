# MVP and expansion roadmap

No implementation has started. This is the exact work sequence for Prompt 2; it authorizes no purchases or deployment by itself.

## Prompt 2 implementation plan

1. **Inspect and initialize.** Read all research docs, repository instructions and any new user scope. Choose a maintained static-first stack after checking current documentation and deployment constraints. Set up reproducible scripts/lockfile and only dependencies needed for the selected processors. Do not install a general utility template with duplicate routes.
2. **Create registry and content contracts.** Encode the 32 catalog entries, four categories and 12 guide briefs. Validate identifiers, canonical paths, SEO and relationship resolution. Keep planned/unverified entries non-public. Track behavior versions and fixture ownership.
3. **Build shared product foundations.** Accessible page shell, navigation, labelled inputs, errors, result summaries, copy/download, file selection, workers/cancel, bounds and in-memory reset. Define an ad-free tool environment and tested script/network policy. Build static content paths without publishing fake tools.
4. **Implement Text & Lists.** Cleanup, dedupe, sort, list comparison, counter, case conversion, literal find/replace and bounded diff. Prove Unicode/line ending and set-vs-sequence behavior. P0 first, then P1.
5. **Implement Data & Tables.** A real CSV record parser and serializer, column identity and string-preserving typed contracts. Implement viewer, delimiter/column/dedupe operations, CSV-to-JSON, lossless JSON formatter, JSON-to-CSV, then merge/split. Test no silent dropping, rounding or partial exports.
6. **Implement Images.** Support only stated static JPEG/PNG/WebP inputs after validated detection. Implement dimension inspector, resize, conversion, compression, crop and color sampling. Verify orientation, transparency and output MIME. Match caps to actual browser/device performance.
7. **Implement Web & Publishing.** Slug, URL/query parser, URL codec, UTM builder, conservative cleaner, color converter, contrast checker, Base64 and HTML entities. Test duplicated parameters and inert rendering. Do not add remote crawlers.
8. **Build discovery and workflow navigation.** Home, complete directory, four useful hubs, local alias search, keyboard autocomplete and empty states. Add only tested compatible in-memory transfers; normal links and copy/download remain available.
9. **Write original content.** Tool-specific worked examples based on verified behavior; 12 guide briefs and guides index. Make result explanations precise. No AI filler, copied competitor descriptions or invented author credentials.
10. **Finish trust and operational routes.** Obtain actual operator/contact/provider details where missing; implement functional reporting without auto-attached input. Write policies from actual behavior. Add HTTP 404, canonical redirects, sitemap and robots. Missing legal facts block publication, not unrelated tool work.
11. **Verify the whole product.** Functional fixtures, output reopening, privacy network/storage audit, keyboard/screen reader/mobile checks, route crawl, metadata/indexability and performance. Resolve defects before widening scope.
12. **Prepare reviewable delivery.** Report tools/routes implemented, test evidence, measured limits and remaining deployment-specific settings. No public placeholders. Deployment or account actions follow Prompt 2 authorization; do not imply they occurred automatically.

## Independent verification matrix

| Area | Required fixtures / expected result |
|---|---|
| Text dedupe | A, B, A -> A, B; case-insensitive comparison preserves chosen original; keep-last order documented |
| List comparison | A=[a,b,b], B=[b,c] -> shared b; A-only a; B-only c; union a,b,c; duplicate count separate |
| Unicode count | combining accent and joined emoji; grapheme/code-point labels cannot be interchangeable |
| Text cleanup | CRLF and NBSP; paragraph-preserving default; output reversible by restoring original |
| Literal replacement | Dollar signs are literal; empty find errors; whole-word locale behavior documented |
| CSV parsing | Quoted comma and newline are single cell content; malformed quotes produce a located error |
| CSV preservation | 00123 stays a string; duplicate headers require resolution; embedded delimiters survive conversion |
| CSV dedupe | Composite keys represented as tuples; no accidental delimiter-key collisions |
| CSV split/merge | Recombined data rows match source; repeated headers correct; mismatched headers block merge |
| JSON | Large integer 9007199254740993 preserved; duplicate key reported; trailing comma rejected |
| JSON-to-CSV | Missing/null/nested fields and dot-key collision; explicit warning where information changes |
| Images | Transparent PNG -> JPEG uses selected matte; rotated JPEG upright; exported MIME and dimensions verified |
| Compression | Impossible byte target reports unmet; actual output never mislabelled; original remains downloadable |
| URL | ?a=1&a=2 preserves both; plus and percent2B differ in form mode; fragment remains intact |
| Cleaner | Unknown parameters retained; selected known fields removed; signed-link caveat visible |
| Base64 | UTF-8 emoji round-trip; invalid alphabet/padding/UTF-8 yield explicit diagnostics or bytes export |
| HTML entities | Decoded script-like string remains inert text; no requests or execution |
| Color | black/white contrast 21:1; equal colors 1:1; alpha unsupported in contrast gets clear error |
| Navigation | All relations resolve; no published tools missing processors; no orphan guides |
| Privacy | Synthetic input absent from all requests/storage/reports throughout lifecycle |
| SEO | 51 content routes + 6 indexable trust routes in final sitemap if all published; report form excluded |

Expected outcomes must be checked independently, not asserted from implementation output. Use primary standards and manually checked small examples. Test parser/processor correctness separately from user interaction; avoid snapshot-only assurance.

Contrast methodology: convert each sRGB channel c in [0,1] to c/12.92 if c <= 0.04045, otherwise ((c+0.055)/1.055)^2.4. Relative luminance = 0.2126R + 0.7152G + 0.0722B. Contrast = (lighter+0.05)/(darker+0.05); compare unrounded ratio to thresholds, round only display. AA normal text requires 4.5:1, large text 3:1; large means at least 18pt regular or 14pt bold. AAA normal 7:1, large 4.5:1. [W3C contrast explanation](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)

Image byte savings = (input bytes - output bytes)/input bytes * 100 for nonempty input. Show negative savings as a larger output, not successful compression. Reading-time estimate = words / user-selected WPM, with an explicit assumption, not a comprehension guarantee.

## Completion gates

No launch until every public tool works, supporting copy matches tested behavior, export files open, privacy claims have evidence, legal/contact facts are real, and technical/accessible navigation checks pass. If a selected tool cannot meet its contract, resolve it or document a deliberate scope revision; never replace it with a demo. Thirty-two is the intended coherent portfolio, not permission to ship unfinished work.

## Expansion phases and triggers

| Phase | Work | Entry evidence |
|---|---|---|
| 1: Core | All 32 selected tools and complete supporting site | Functional/privacy/editorial release gates |
| 2: Deepen strong clusters | Data filtering, CSV schema mapping, JSONL, image batches, palette extraction | Repeated user need, current query evidence, no overlap, measured browser capacity |
| 3: Advanced utilities | File checksum, renamed-copy exports, typed metadata, carefully bounded PDF organizer | Maintained dependency, format-fixture corpus, worker/memory testing, truthful limitations |
| 4: New families | Small document or specialized developer family only when coherent | At least three distinct ready tools, clear workflow, content and maintenance owner |
| 5: APIs/integrations | Optional upload/transform service or integrations | Documented need that local tools cannot satisfy; budget, auth, abuse controls, retention and privacy review |

No automated pivot to more tools because traffic is low. Improve discoverability, correctness and task completion first. API work adds hosting cost, rate limits, abuse/SSRF controls and privacy obligations; no launch tool depends on it.

## Maintenance

Review processor dependencies at releases; monitor relevant security advisories. Version URL cleanup rules and change logs. Rerun fixture regressions after parser/codec changes. Audit broken links and indexing on releases. Review policy/ad/CMP configuration before monetization changes. Publish factual change dates; do not create artificial freshness.

