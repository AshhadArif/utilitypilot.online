# UtilityPilot pre-launch audit and fixes

Audit completed locally on 26 September 2026, following inspection begun on 25 September. Scope: actual source, generated production HTML, production-equivalent local server, all 32 tools, all 59 routes, and the researched content/SEO/privacy contracts. No additional tools or keyword pages were introduced.

## Verdict

**The audited local implementation passes the executed checks after fixes. Public release and AdSense submission remain blocked by missing operational facts and deployment.** This is not an approval prediction, security certification or claim of exhaustive browser/input coverage.

The audit found and addressed 18 groups of implementation/content weaknesses. The earlier implementation report was treated as historical evidence, not proof that these cases worked.

## Confirmed findings and changes

Severity describes practical consequence, not a calculated risk score. All findings below are fixed in the current source and build.

| ID | Severity | Reproduction / weakness | Fix and verification |
|---|---|---|---|
| A01 | High | Numeric sorting treated 9007199254740993 and 9007199254740992 as equal after floating-point rounding | Decimal spelling comparison preserves integer/fraction precision, signs and exponents. Independent large-number and negative-fraction fixtures pass. |
| A02 | High | Literal replacement could allocate an enormous expanded string before the worker checked output size | Compute the UTF-8 output budget while matching; reject expansion above 20 MiB before allocating the result. A 20,000-character input with a 2,000-character replacement is rejected. |
| A03 | Medium | Headerless CSV accepted 50,001 data records despite the 50,000-record contract | Enforce the data-record count after the header choice. Exactly 50,000 accepted; 50,001 rejected. |
| A04 | Medium | Flattening an empty JSON parent key lost the path boundary and could report a false collision | Distinguish a root prefix from an empty key; `{"":{"x":1},"x":2}` produces `.x,x` and preserves both values. |
| A05 | Medium | Whole-word replacement could split a decomposed accented word | Combining marks participate in word boundaries. `cafe` does not replace the base letters inside `cafe` plus a combining accent. |
| A06 | Medium | Malformed color separators such as `rgb(1,,2,3)` were silently accepted; contrast previews rounded channels differently from the calculation | Validate channel/separator grammar and decimal notation. Preserve fractional input colors in the contrast preview. Invalid syntax and exact preview fixtures pass. |
| A07 | Medium | UTF-8 Base64 decoding silently dropped an initial BOM character from copied text | Preserve the decoded character while retaining exact downloaded bytes. `77u/QQ==` decodes to U+FEFF followed by A. |
| A08 | Medium | Compression kept the smallest tested file even when a better-quality candidate met the target; resizing used a hard-coded quality | Retain the highest tested acceptable quality. Resized attempts respect the selected maximum. Impossible targets remain explicit; deterministic quality-search and real encoder tests pass. |
| A09 | Medium | Pointer crops excluded the final selected pixel, and a click retained the previous crop | Inclusive coordinate bounds and an initial 1×1 selection. Dragging across a 40×20 fixture exports 40×20; a single click exports 1×1. |
| A10 | Medium | Native URL repair silently accepted missing slashes, backslashes and control characters | Require complete HTTP(S) syntax and encoded spaces/control characters for full URL operations. Query-only parsing remains separate. |
| A11 | Medium | Case variants on Windows, repeated slashes, percent-spelled paths and index.html variants served duplicate HTML | Manifest-based route normalization issues permanent redirects to existing canonical routes. Invalid encoded paths are rejected, unknown pages remain genuine 404s, and the www-host match is exact. |
| A12 | Medium | Clear/Escape could leave stale finder targets; first ArrowUp selected the wrong suggestion | Clear suggestion state on close, gate Enter on an open result list, handle initial ArrowUp correctly, and close when focus leaves. Keyboard regressions pass. |
| A13 | Medium | Empty search displayed a paragraph inside a listbox without required option children | Separate the no-results message from the closed listbox. Axe and clear/Enter checks pass on the homepage, directory and all four category hubs. |
| A14 | Medium | Find/replace instructions promised actual line breaks but the controls were single-line inputs | Use labeled multiline fields. Comma-to-newline replacement was tested through the actual UI. |
| A15 | Low | Image replacement could retain stale source details/handlers; a delayed column-loader import could restore obsolete controls | Release image module references and details when loading a replacement; version-check asynchronous column and sample-image loading before applying it. Reset cannot be undone by a late sample-image callback. Existing reset/upload/column workflows pass. |
| A16 | Medium | Editing a prepared report left stale content available for copying/downloading; navigation did not explicitly clear report state | Invalidate the prepared report on edits and reset it on pagehide. Actual report editing behavior is verified. No report is transmitted automatically. |
| A17 | Medium | Category task paragraphs repeated generic copy; guide index skipped from H1 to H3; some explanations and an archived contrast formula were inaccurate | Write 12 concrete category workflow descriptions, add the guide-index H2, clarify numeric/sentence-case/compression semantics, correct UTM case example, system-font privacy wording and the archived 2.4 exponent. All-route heading checks pass. |
| A18 | Low | Word counting retained large arrays of segment objects unnecessarily | Count segments in a streaming loop. Existing and independent Unicode results remain correct; a near-1-MiB fixture completed in approximately 999 ms in the recorded local Node run. |

## Executed verification

| Check | Observed result |
|---|---|
| Production build | Passed; 32 tools, 12 guides, 59 HTML routes, 57 sitemap URLs |
| Processor tests | 163 passed, zero failed: original 52 plus 111 added tests |
| Independent text/data/web fixtures | 78 hand-worked cases across all 26 non-image tools; executed in Node and browser |
| All-tool interaction suite | 32/32 passed: real samples, result, clipboard, downloaded file, reset, empty handling and 320/390px tool layouts |
| Independent image cases | All six tools tested with a separate 40×20 raster, a 1×1 raster, empty input, spoofed content and oversized bytes |
| Additional image regressions | EXIF orientation 6 displayed as 20×40; 4000×4000 accepted; 4001×4000 rejected; animated PNG rejected; inclusive pointer crop and one-pixel crop correct; impossible compression target reported |
| Route crawl | 59/59 intended responses, metadata, rendered headings, schema breadcrumbs, fragments, canonical URLs and navigation checked |
| Indexability | 57 unique intended sitemap destinations, no excluded intended page, no orphan indexable page |
| Static link audit | 2,053 internal route/asset references checked; zero broken targets |
| Automated accessibility | All 59 routes passed configured Axe WCAG A/AA checks; populated tool outputs included. Additional dynamic empty-search checks passed on six discovery pages. |
| Responsive reflow | All 59 routes checked at 320, 768 and 1280 CSS pixels; all tool sample-result layouts additionally checked at 320 and 390 pixels; no document horizontal overflow detected |
| Browser execution | Chrome interaction/Axe suite; independent audit also passed in Microsoft Edge. Both are installed Chromium browsers. |
| Runtime/network | No unexpected console/page errors or failed assets in the independent audit; expected 404 responses are not counted as application failures. Zero external requests observed. |
| Input privacy | Distinctive synthetic marker absent from recorded request URLs/bodies. No cookies, local/session storage, IndexedDB databases or service-worker registrations found in the tested context. |
| Dependency advisory check | `npm audit --json` returned zero known advisories for the installed lockfile at audit time |
| Release guard | `RELEASE=1` rejected missing operator configuration before modifying the existing build |

The full interaction and independent route suites were rerun after the processor/image changes. The final discovery changes received targeted Axe and interaction tests across every affected discovery template. The delayed-sample reset fix received a controlled asynchronous regression, followed by a production build and static audit. No blanket claim is made that every imaginable combination of settings was tested.

Test evidence: `test-results/browser-report.json`, `test-results/prelaunch/report.json`, `test-results/prelaunch/image-report.json`, screenshots and performance measurements. These generated artifacts are excluded from Git; reproducible tests are included in the project source. The independent audit report records the Edge pass. Chrome evidence is in the general browser report.

## Per-tool coverage and result review

The complete fixture inventory is in `tests/audit-cases.mjs`; the independent browser runner applies those inputs/options through each real form. The existing sample suite independently checks clipboard/download/reset for every tool. Empty and oversized inputs are additionally tested for every text/data/web processor.

| Tool | Additional representative result or failure |
|---|---|
| Word and character counter | Combining accent is one grapheme; emoji-aware word count; invalid reading speed rejected |
| Text cleaner | NBSP/CRLF normalization and paragraph-preserving joins; joiners retained by default |
| Remove duplicate lines | Case/trim key retains original spelling; keep-last order; blank-line input |
| Sort lines | Adjacent unsafe integers, exact negative fractions, scientific notation, invalid numeric line |
| Case converter | Turkish dotted/dotless I; mechanical sentence-case boundaries |
| Find and replace | Actual multiline replacement; decomposed accents; empty search; bounded expansion |
| Text difference checker | Equal texts, insertion into empty input, deletion to empty input |
| Compare lists | Greek entries, duplicates and union; one-sided empty list |
| JSON formatter | Large exponent spelling, escaped duplicate key, raw Unicode and prototype-like key |
| JSON to CSV | Empty parent-key paths; null/missing cells; invalid non-object record |
| CSV to JSON | Leading zeros, large numeric token, duplicate headers |
| CSV viewer | Quoted separators/newlines, empty cells, uneven records and record cap |
| CSV deduplication | Key-column keep-last records; Unicode duplicates; invalid key position |
| CSV column editor | Unicode fields; malformed row; real UI removal, rename and reorder workflow |
| Delimiter converter | Quoted comma becomes data under semicolon output; TSV output; malformed quote |
| CSV merge | Header-only contribution, mismatched headers and uploaded-file reordering |
| CSV split | Last partial batch, one record, header-only error and actual part download |
| Image resizer | Independently expected 40×20 → 20×10 and one-pixel source |
| Image compressor | Actual bytes, impossible target, selected maximum quality and optional resizing |
| Image converter | Actual JPEG decoding and opaque matte; dimensions preserved |
| Image cropper | 20×20 region, inclusive full-image drag and one-pixel click |
| Image inspector | 2:1 ratio, alpha detection, byte units, oriented dimensions and 16-MP boundary |
| Image color picker | Exact blue/red/green fixture channels; one-pixel sample |
| Slug generator | Accented Latin, non-Latin Unicode mode and unsupported-only input |
| URL parser | Repeated pairs, literal plus/form space, forbidden scheme and redacted credentials |
| URL encoder/decoder | UTF-8 escapes, single-layer decoding and malformed UTF-8 |
| UTM builder | Replaced parameter, encoded spaces, fragment retention and required missing field |
| URL cleaner | Unknown raw query spelling retained, deselected tracking key and credentials rejected |
| Color converter | Short alpha HEX, negative hue wrap and malformed channel syntax |
| Contrast checker | 21:1, 1:1, alpha rejection, unrounded thresholds and fractional-color preview |
| Base64 | Chinese text, BOM preservation, binary bytes and noncanonical padding |
| HTML entities | Inert script-shaped text, Unicode numeric encoding and unknown entities |

Not every string transformation has an “invalid character”: arbitrary text and script-shaped text are legitimate data for cleanup/diff/encoding. Such inputs must remain inert rather than being indiscriminately removed. Browser-only file tests distinguish supported formats from renamed or suspicious content. Download names are generated by the application, not copied from input filenames.

## SEO and indexability findings

[INDEXABILITY-AUDIT.csv](INDEXABILITY-AUDIT.csv) lists all 59 routes with actual status, indexability, canonical, title, H1, description and internal-link count. The intended indexable set is the 51 substantive pages plus six trust pages. Error reporting and 404 are intentionally noindex and absent from the sitemap. Ordinary missing URLs return 404 instead of the homepage.

Titles and descriptions are unique; supporting explanations and links exist in initial HTML. Structured data is limited to truthful WebSite and visible BreadcrumbList information. No invented ratings, authors or certifications were added. Not using optional application/article markup is not an indexing defect. Open Graph metadata and the social image are present. Search/filter/input state does not generate crawlable routes.

Canonical path aliases now redirect in the supplied server. The static host must implement equivalent behavior; a `_headers` file alone does not configure host redirects or guarantee 404 status. HTTPS termination, live hostname/DNS behavior and production Search Console inspection cannot be verified on localhost. Google's canonical documentation treats canonical signals as hints; matching sitemap, internal links and redirects does not guarantee Google's selection. [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)

## Content, search intent and cannibalization

[CONTENT-INTENT-AUDIT.csv](CONTENT-INTENT-AUDIT.csv) reviews every one of the 51 substantive pages: purpose, user problem, related tools, overlap assessment and disposition. No page was added solely to meet a count, and no consolidation was warranted by the current functional/editorial intent review.

Key distinctions retained: text sequence diff versus set membership; CSV-to-JSON versus JSON-to-CSV; image pixel resizing versus byte compression; syntax validation versus tutorial/troubleshooting. Guides about JSON conversion, formatting and image upload limits have moderate topical overlap with their tools, but explain decisions and failure modes instead of presenting another tool with the same controls. This is an editorial assessment, not proof about live search behavior. Reassess if future Search Console data shows the wrong page repeatedly serving a task query.

The content review corrected generic category paragraphs and methodology mismatches. Tool explanations use real examples and limitations. The About/Contact/legal pages are useful drafts of actual application behavior, but missing real operator and provider details prevent treating them as finished public operational pages. No ranking, volume, KD, CPC, traffic or approval metrics were invented. Google warns against doorway, scaled low-value and misleading-functionality pages; the current portfolio keeps synonyms and conversion directions consolidated where they share one operation. [Google Search spam policies](https://developers.google.com/search/docs/essentials/spam-policies)

## AdSense assessment

**Do not submit this local-only build for approval yet.** The working tools and explanatory content provide value without ads, and navigation exposes real destinations. There are no ad units, deceptive download controls, copied review claims or fake testimonials in the audited build. There is no invented publisher ID or ads.txt record.

Google's readiness guidance emphasizes useful original content and clear navigation; a particular number of pages is not an approval outcome. The 51-page count is product scope, not an AdSense qualification score. [Google site-readiness guidance](https://support.google.com/adsense/answer/7299563?hl=en)

If ads are introduced, keep them clearly distinct from tool/navigation actions and follow the current program rules. Maintain the project's decision to keep third-party scripts off input-handling tool routes. [AdSense program policies](https://support.google.com/adsense/answer/48182?hl=en)

Before advertising, document actual ad-related collection and provider behavior, and implement applicable consent handling. Google's current requirements specify a certified CMP integrated with the TCF for serving ads in the EEA, UK and Switzerland. No CMP is installed or tested in this ad-free build. [Privacy disclosures](https://support.google.com/publisherpolicies/answer/10437794?hl=en), [Google CMP requirements](https://support.google.com/adsense/answer/13554020?hl=en)

## Security, privacy and performance limits

No transformation server, remote URL fetch, arbitrary code evaluation or user-input HTML rendering was found. Workers have an eight-second processing limit; resource caps and image signature/decode checks remain explicit. The supplied CSP blocks external connections and embedding. The development server binds to loopback by default. Dependency-audit results cover known registry advisories, not all possible vulnerabilities.

All observed tool processing stayed local. Hosting will still receive ordinary page/asset requests. The network evidence is scoped to the executed workflows; it is not a claim of guaranteed privacy against browser extensions, compromised devices or future third-party scripts.

The final shared site entry is 9,147 gzip bytes; the tool entry is 7,025 gzip bytes. Additional processors load as needed. Node v25.9.0 on this Windows machine measured approximately 225 ms for a 100-KiB word-count input, 999 ms for 1,048,575 bytes, and 266 ms for 50,000 CSV records. These are local processor measurements while audit work was running, not mobile-browser or public-network benchmarks. No Lighthouse/Core Web Vitals score is claimed.

Chrome/Edge tests and emulated viewport checks do not replace iOS Safari, Firefox, physical-device or manual screen-reader testing. External standards links were reviewed where used; this was not a whole-web plagiarism check. Image encoders can legitimately produce different bytes on different browsers.

## Remaining release dependencies

| Item | Owner / action | State |
|---|---|---|
| Real operator identity and verified contact address | Site owner supplies facts; configure SITE_OPERATOR and CONTACT_EMAIL | Required before public release |
| Hosting provider, privacy URL and actual log retention | Choose provider; configure HOST_NAME, HOST_PRIVACY_URL and LOG_RETENTION | Required before public release |
| HTTPS deployment and production routing | Deploy built files with correct headers, redirects and genuine 404 responses; run audits against that origin | Not deployed |
| Support delivery | Test the configured email draft/recipient; report preparation alone does not deliver messages | Awaiting real address |
| Advertising/consent | Review actual provider/account/region requirements before adding scripts or applying | Not activated or submitted |
| Additional browser/assistive technology coverage | Test Safari/Firefox, a physical phone and screen-reader workflows | Recommended follow-up; not claimed completed |

No confirmed reproducible code failure remains in the executed audit suites. The listed operational requirements remain unresolved; they were not bypassed with fabricated details.

## Reproduce the audit

Start a fresh production preview on port 4183 so an older server does not mask routing changes. In PowerShell:

```powershell
npm.cmd test
npm.cmd run build
$env:PORT='4183'
npm.cmd start
```

In another terminal:

```powershell
$env:AUDIT_BASE='http://127.0.0.1:4183'
npm.cmd run audit:site
npm.cmd run test:browser
node tests/workflows.mjs
node tests/image-audit.mjs
node tests/search-audit.mjs
node tests/reset-audit.mjs
npm.cmd run audit:prelaunch
$env:AUDIT_CHANNEL='msedge'
npm.cmd run audit:prelaunch
npm.cmd audit --json
```

Chrome and Edge must be installed for their named channels. The independent crawl writes the indexability CSV and evidence JSON; the content-intent CSV is an editorial review artifact. Original implementation documentation describes the earlier state; this report records the subsequent audit and fixes.
