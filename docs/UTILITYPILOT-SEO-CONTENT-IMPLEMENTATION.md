# UtilityPilot SEO content implementation

Implemented and verified locally, 28–29 September 2026. The existing tools, route structure and design are preserved. Eight Text & Lists pages now contain 8,159 words of task-specific editorial content in total, excluding the navigation, footer, tool controls and contents lists. This is a measured outcome, not a word-count requirement. Three existing guides received contextual links.

## Pages Updated

| Existing route | Editorial words | Main improvements |
|---|---:|---|
| `/tools/text/word-counter/` | 1,619 | Word counting; character counter; graphemes/code points; whitespace; line counter; all seven metrics; reading-time calculation; writing workflows; four FAQs |
| `/tools/text/text-diff/` | 1,022 | Compare-text intent; line/word methodology; labels; whitespace normalization; revision/configuration examples; membership distinction; limits |
| `/tools/text/case-converter/` | 1,024 | Title Case, uppercase, lowercase and sentence-case sections; actual casing rules; language examples; acronym review |
| `/tools/text/sort-lines/` | 791 | Alphabetize-list intent; A–Z/Z–A; natural/numeric/length/reverse modes; name/title handling; sorting problems |
| `/tools/text/text-cleaner/` | 1,180 | Whitespace operations; defaults; order of transformations; hard wraps; blank-line limitations; plain-text formatting |
| `/tools/text/find-and-replace/` | 1,088 | Literal replacement; case and boundaries; spaces; comma-separated list; splitting/joining; CSV limitations |
| `/tools/text/remove-duplicate-lines/` | 739 | Exact/trim/case/NFC matching; preserved originals; first/last ordering; blank entries; examples |
| `/tools/text/compare-lists/` | 696 | Shared/A-only/B-only/union; set membership; matching and ordering; duplicate and blank-entry behavior |
| `/guides/clean-copied-text/` | Existing article retained | Contextual links to character counting and literal replacement |
| `/guides/compare-lists-and-text/` | Existing article retained | Direct links distinguishing list membership from text differences |
| `/guides/unicode-counting/` | Existing article retained | Links to the character-count explanation and language-aware casing |

All eight tool pages have individually authored titles, meta descriptions, H1s, introductions, descriptive H2/H3 sections, worked examples and three or four useful FAQs. The table of contents appears below the working tool, with stable fragment links to the explanatory sections. Content is present in the initial static HTML even with JavaScript disabled.

The homepage, directory, four category pages and related-tool system retain their existing structure. Their shared search index gains supported task aliases. No image/data/web tool article was rewritten. The shared search behavior was also corrected as described under validation.

## Keywords Covered

All 44 supplied keywords, original metrics, Parent Topics, roles, actions and reasons are in [the content map](UTILITYPILOT-AHREFS-CONTENT-MAP.md). This table accounts for the 41 mapped keywords; the remaining three are listed below.

| Keywords from the actual export | Target page / section |
|---|---|
| word counter; word counter online; count words in text | `/tools/text/word-counter/` |
| character counter; character counter online; count characters in text | `/tools/text/word-counter/#character-counter` |
| line counter; count lines in text | `/tools/text/word-counter/#line-counter` |
| text analyzer | `/tools/text/word-counter/#text-analysis` — basic metrics only |
| compare text; text diff; compare two texts; text comparison tool | `/tools/text/text-diff/` |
| title case converter; lowercase converter; uppercase converter; convert text to lowercase; convert text to uppercase; text case converter; convert text to title case | `/tools/text/case-converter/`, with dedicated mode sections |
| alphabetize list; sort list alphabetically; sort list online; sort text alphabetically; sort lines | `/tools/text/sort-lines/` |
| text cleaner; text formatter; format text online; clean up text online; remove extra spaces | `/tools/text/text-cleaner/`, including `#text-formatter` |
| remove whitespace | `/tools/text/text-cleaner/#whitespace` — selected whitespace transformations, not universal deletion |
| remove blank lines; remove empty lines | `/tools/text/text-cleaner/#blank-lines` — qualified explanation of collapse behavior, not a claim of full removal |
| remove duplicate lines; duplicate line remover; remove duplicate lines online | `/tools/text/remove-duplicate-lines/` |
| find and replace text | `/tools/text/find-and-replace/` |
| remove spaces from text | `/tools/text/find-and-replace/#remove-spaces` — ordinary-space deletion |
| comma separated list | `/tools/text/find-and-replace/#comma-separated-list` — simple literal joining, not CSV serialization |
| text to list; list to text | `/tools/text/find-and-replace/#text-to-list` — known literal separators |

Compare Lists received supporting content because it is part of these workflows and must remain distinguishable from Text Diff. No search volume was assigned to it: the supplied export has no direct compare-lists keyword. Phrases from the brief that are absent from the CSV are not presented as measured Ahrefs opportunities.

## Content Added

- Counting: language-aware word boundaries, punctuation, document selection, character units, with/without-whitespace behavior, physical versus wrapped lines, final-newline semantics, seven implemented metrics and reading-time assumptions. No unsupported readability or linguistic scores.
- Text comparison: directional A/B interpretation, jsdiff line and word-with-space tokens, additions/removals, normalization semantics, bounded comparisons, literal report format and practical review workflows. No semantic or plagiarism claims.
- Case conversion: every-word title capitalization, lowercasing before title/sentence casing, short words, sentence-boundary heuristic, Turkish I, German ß and proper-name review. No named style-guide compliance claims.
- List sorting and deduplication: actual modes, stable equal-key order, decimal precision, code-point length, exact/normalized matching, original spelling preservation, blank lines and record-aware CSV alternatives.
- Cleanup and replacement: supported character sets and operation order, hard wraps versus paragraphs, blank-line collapse, literal matching, non-overlap, whole-word boundaries, actual multiline separators and simple list examples. No regex or CSV quoting claims.

Editorial source: `src/data/text-content.mjs`, imported by the existing `tool-content.mjs`. The template supports structured sections and FAQ arrays for expanded pages and retains the existing fallback for the other 24 tool pages. Build metadata can now use distinct title/description fields rather than requiring the introduction to double as the meta description. No new rendering framework, third-party script or content API was added.

## Internal Links Added

- Word Counter links to Text Cleaner, Text Diff, Remove Duplicate Lines, CSV Viewer and the Unicode guide, with intra-page links between its character/line explanations.
- Text Cleaner links to character/line counting, case conversion, literal space removal, comma joining, deduplication, Text Diff and the cleanup guide.
- Text Diff links to Find and Replace, Text Cleaner, Compare Lists, JSON Formatter and the comparison guide.
- Case Converter links to counting, cleanup, deduplication, replacement and Text Diff; its existing related Slug Generator link is retained.
- Alphabetize List links to separator conversion, cleanup, deduplication, list comparison, character-count methodology and CSV inspection.
- Find and Replace connects the simple split/join workflow to sorting/deduplication and sends structured data to the CSV delimiter converter.
- Compare Lists and Remove Duplicate Lines link to each other and clearly identify Text Diff as the sequence-comparison alternative.
- Three guide articles link directly to relevant tools or section fragments rather than relying exclusively on their existing end-of-article cards.
- Related-tool lists preserve all prior links and add 15 relevant relationships. All referenced routes and section IDs are checked.

The static site audit checks 2,122 internal link/asset references; the content audit additionally verifies 253 fragment links across all generated routes. The independent route-graph audit reports no orphan pages.

## Pages Consolidated

No existing URLs were deleted, redirected or merged. Consolidation here means keyword-intent ownership on existing canonical pages:

- Word/character/line counters and basic text analysis use the same implemented counting tool.
- Title/upper/lower/sentence casing remain modes of one Case Converter.
- Compare text, text diff, compare two texts and text comparison tool belong to Text Diff. Compare Lists remains separate because it answers set-membership questions.
- Alphabetize/sort variants belong to Sort Lines.
- Whitespace cleanup and qualified plain-text formatting belong to Text Cleaner.
- Literal separator conversion and ordinary-space deletion are supporting workflows on Find and Replace.

The existing repository did not contain separate Character Counter, Line Counter, Text Analyzer, uppercase/lowercase/title-case, Text Formatter or comma-list routes. Creating duplicates would have repeated interfaces and overstated the catalogue. Fragment links provide focused explanations without additional canonical pages.

## New Pages

None. The site remains at 32 tools, 12 guides, 59 HTML routes and 57 sitemap URLs. Research files and implementation documentation are repository artifacts, not published keyword pages.

## Keywords Not Targeted

| Keyword | Reason |
|---|---|
| text converter | Ambiguous broad query; supplied Parent Keyword is font generator. Decorative font conversion is unsupported. |
| text separator | Supplied Parent Keyword is text dividers, which may refer to decorative separators. No divider generator exists; supported literal splitting is explained under text-to-list. |
| remove duplicate words | The existing tool matches complete lines. Word deduplication inside prose is a different unsupported operation. |

Similar variants were consolidated rather than ignored. Partial-fit queries are explicitly qualified: blank-line collapse is not remove-all-empty-lines, basic metrics are not advanced text analysis, and literal comma joining is not a CSV maker. No new capability was invented to accommodate a keyword.

## Technical Validation

| Check | Result / evidence |
|---|---|
| Production build | Passed with `npm.cmd run build`; 32 tools, 12 guides, 59 routes, 57 sitemap URLs. One sandboxed attempt was denied directory access by esbuild; the authorized build outside the sandbox passed. |
| Existing processor tests | `npm.cmd test`: 163 passed, zero failed. |
| Static SEO audit | `npm.cmd run audit:site`: 59 routes, 2,122 internal references, unique titles/descriptions, one H1 per route, correct canonicals and indexability. |
| Sitemap | 57 distinct canonical URLs; existing report/404 exclusions retained; checked against route manifest. |
| SEO/hosting tests | `node tests/seo-checklist.mjs`: all 59 routes, metadata/schema, verification escaping, hosting patterns and HTTPS proxy integration passed. |
| Browser tool suite | `npm.cmd run test:browser`: all 32 tools and 59 routes; sample output, copy, download, reset, empty handling, 320/390px layouts, automated Axe WCAG A/AA checks, no uncaught browser errors or unexpected external requests. |
| Independent browser audit | `node tests/prelaunch-browser.mjs` with AUDIT_BASE set to the preview: 78 text/data/web fixtures plus six image tools; routes, logical headings, links, sitemap, redirects, malformed paths, privacy/storage and no orphans passed. |
| Existing workflow suite | `node tests/workflows.mjs`: passed after the filter-clear bug fix below; discovery, uploads, columns, merge/split, JSON, inert markup, large text, images and report preparation. |
| Additional existing suites | `tests/image-audit.mjs`, `tests/search-audit.mjs` and `tests/reset-audit.mjs` passed with AUDIT_BASE set to the preview. |
| Ahrefs/source fidelity | `npm.cmd run audit:content`: original SHA-256 and every field in all 44 parsed rows match the normalized source; every keyword appears once in the decision table. Missing values remain unknown. |
| Published examples | Content audit verifies 37 independently expected examples/results against the actual processors. |
| Expanded content | All eight titles, descriptions, H1s and sections are checked in a browser with JavaScript disabled. Unique IDs and all 253 fragment links pass. |
| Mobile and visual review | All eight expanded articles fit at 320/390px; screenshots of the counter workspace, character explanation, blank-line explanation and title-case example were reviewed. Existing typography/layout retained. |
| Search discovery | Character counter, line counter, text analyzer, title case converter, alphabetize list and comma separated list resolve to the intended existing tool. |
| Console | Expanded-page/search checks and the independent browser audit report no JavaScript console/page errors. |

The existing workflow suite exposed a reproducible directory interaction bug: blurring a no-results search hid a message and moved the Clear filters button between pointer-down and click. `src/client/site.mjs` now keeps that message in place on blur/outside clicks; query changes and explicit clearing still remove it. The workflow and accessible-search suites pass after the fix. No tool algorithm, input/output processor, worker contract, copy/download behavior or image/JSON/CSV code changed.

Evidence is generated under `test-results/`: `browser-report.json`, `prelaunch/report.json`, `prelaunch/image-report.json`, and `seo-content/report.json` plus screenshots. The browser audit refreshed `docs/INDEXABILITY-AUDIT.csv` to reflect the modified titles, descriptions and guide links. Generated test artifacts and `dist/` remain Git-ignored; all verification scripts are reproducible from source.

Run after starting the preview:

```powershell
npm.cmd test
npm.cmd run build
npm.cmd run audit:site
node tests/seo-checklist.mjs
# Start npm.cmd start in a separate terminal.
$env:AUDIT_BASE='http://127.0.0.1:4173'
npm.cmd run test:browser
node tests/prelaunch-browser.mjs
node tests/workflows.mjs
node tests/image-audit.mjs
node tests/search-audit.mjs
node tests/reset-audit.mjs
npm.cmd run audit:content
```

Automated accessibility and Chromium testing do not establish complete assistive-technology or every-browser coverage. No public deployment was performed. Existing release configuration requirements remain unchanged.

## Research limitations

Direct Google US search requests returned a JavaScript challenge/redirect shell, so current Google positions, featured snippets and PAA questions could not be verified. The content map documents the attempted queries and links to directly inspected competitor pages; these support task expectations, not claimed Google rankings. Ahrefs metrics are reproduced exactly, including unusual Parent Topics and Traffic Potential values. No traffic or ranking outcome is promised.
