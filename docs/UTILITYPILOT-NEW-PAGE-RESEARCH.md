# UtilityPilot new-tool research and decisions

Prepared 1 October 2026 **before implementation**. Read the [32-tool baseline audit](UTILITYPILOT-EXISTING-SITE-AUDIT.md) first. The requested seeds are candidates, not a URL quota.

## Evidence and unavailable metrics

No connected Ahrefs Keyword Explorer or new-topic Ahrefs export is available in this session. Additional data was requested; implementation proceeds using current search-provider results, first-party tool descriptions and official technical sources. **Volume, KD, Traffic Potential, CPC, Ahrefs Parent Topic and Questions data are N/A for every new candidate.** No numerical ranking score, rank, traffic forecast or competitor traffic is asserted. Search-provider observations are not a localized Google SERP audit; current Google PAA, featured snippets and other SERP features are N/A. Related keywords below are intent variants researched or inferred from the task, not measured Ahrefs data.

Existing source metrics remain in the September overview and October counting maps. They are not transferred to JSON or developer queries. Parent-topic clustering below is editorial intent judgment; the Ahrefs Parent Topic field stays N/A.

## Candidate opportunities and coverage

| Candidate | Primary keyword | Related keywords | Parent Topic | Intent | Existing coverage | New functionality / evidence | New tool? | Decision |
|---|---|---|---|---|---|---|---|---|
| JSON Formatter | json formatter | json beautifier, pretty print json | N/A | Read indented JSON | /tools/data/json-formatter/ | Already lossless formatting with indent choices; S1 | No | DO NOT BUILD |
| JSON Validator | json validator | validate json, json syntax checker | N/A | Diagnose syntax | Same formatter | Already line/column errors, duplicate-key rejection; S1 | No | DO NOT BUILD |
| JSON Minifier | json minifier | compact json, minify json | N/A | Compact valid JSON | Same formatter, minified mode | Same parser/output operation; S1 | No | DO NOT BUILD |
| JSON Viewer | json viewer | json tree viewer, view json | N/A | Explore nested properties | Formatting only | Collapsible tree, paths and text search; S2 | Yes, Tier 2 | BUILD |
| JSON Compare | json compare | json diff, compare two json files | N/A | Find structural differences | Text Diff compares sequences | Lossless parsed key/value comparison, JSON Pointer paths; S3 | Yes, Tier 2 | BUILD |
| CSV to JSON | csv to json | csv to json converter | N/A | Convert records | /tools/data/csv-to-json/ | Existing delimiters/header/types/export | No | DO NOT BUILD |
| JSON to CSV | json to csv | json to csv converter | N/A | Export object records | /tools/data/json-to-csv/ | Existing collision-aware flattening and nested arrays | No | DO NOT BUILD |
| JSON/YAML | json to yaml | yaml to json, yaml converter | N/A | Exchange configuration formats | No YAML parser | S4; schema, aliases, tags, numeric preservation require a maintained parser and dedicated review | Potential, Tier 2 | CONDITIONAL |
| XML formatting/validation | xml formatter | xml beautifier, xml validator | N/A | Read/check XML | None | S5; mixed content, entity handling and well-formedness versus XSD need explicit parser policy | Potential, Tier 2 | CONDITIONAL |
| Base64 | base64 decode | base64 encode, base64url | N/A | Represent bytes/text | /tools/web/base64/ | Already strict UTF-8 and byte output; S6 | No | DO NOT BUILD |
| URL encoding | url encoder | url decoder, percent encoding | N/A | Encode/decode components | /tools/web/url-encoder-decoder/ | Existing form versus component modes | No | DO NOT BUILD |
| HTML entities | html entity decoder | html encoder, numeric entities | N/A | Escape/unescape text | /tools/web/html-entities/ | Existing entities dependency; no executable preview | No | DO NOT BUILD |
| Regex Tester | regex tester | regex checker, regular expression tester | N/A | Test patterns against text | Literal replacement only | Matches, captures, flags, positions with worker termination; S7 | Yes, Tier 2 | BUILD |
| JWT Decoder | jwt decoder | decode jwt, jwt token decoder | N/A | Inspect header/claims | Base64 only | Three-segment parsing and strict UTF-8 JSON; explicit unverified state; S8 | Yes, Tier 1 | BUILD |
| UUID Generator | uuid generator | uuid v4 generator, random uuid | N/A | Generate identifiers | None | Web Crypto UUID v4 and bounded batches; S9 | Yes, Tier 1 | BUILD |
| SHA Hash Generator | sha256 hash generator | sha384, sha512, text hash | N/A | Fingerprint exact text bytes | None | Web Crypto SHA-2 UTF-8 digests; S10 | Yes, Tier 1 | BUILD |
| MD5/SHA-1 | md5 hash generator | sha1 hash | N/A | Legacy compatibility | None | No established compatibility need; avoid obsolete algorithms in this release | No | DO NOT BUILD |
| Unix Timestamp | unix timestamp converter | epoch converter, timestamp to date | N/A | Translate epoch/date representations | No existing epoch tool | Explicit seconds/milliseconds and timezone-qualified dates; S11 | Yes, Tier 1 | BUILD |
| Timestamp-to-date variants | timestamp to date | date to timestamp | N/A | Same bidirectional conversion | New unified timestamp tool | One interface, no direction wrappers | No extra | DO NOT BUILD |
| Markdown to HTML | markdown to html | markdown converter | N/A | Render markup | Entities only | S12; parser dialect, sanitization, preview sandbox and remote-resource policy need separate review | Potential, Tier 2 | CONDITIONAL |
| HTML Formatter | html formatter | html beautifier, html pretty print | N/A | Reformat markup | Entities are not formatting | Whitespace in inline/pre/script content needs a maintained parser | Potential, Tier 2 | CONDITIONAL |
| Email Extractor | email extractor | extract emails from text | N/A | Extract address candidates | New regex tester can inspect candidate patterns | Specialized address rules/false-positive handling need distinct added value | Potential, Tier 3 | CONDITIONAL |
| URL Extractor | url extractor | extract urls from text | N/A | Extract links from prose | URL parser needs one URL | Boundary/punctuation/IDN policy, not a remote crawler | Potential, Tier 3 | CONDITIONAL |
| URL Parser | url parser | query string parser | N/A | Inspect URL fields | /tools/web/url-parser/ | Already components, duplicate query keys and redacted credentials | No | DO NOT BUILD |
| Color Converter | color converter | hex to rgb, rgb to hsl | N/A | Change notation | /tools/web/color-converter/ | Existing HEX/RGB/HSL with alpha; S13 | No | DO NOT BUILD |
| Contrast Checker | color contrast checker | WCAG contrast checker | N/A | Check text color pairs | /tools/web/contrast-checker/ | Existing luminance and normal/large AA/AAA | No | DO NOT BUILD |
| Slug Generator | slug generator | url slug generator | N/A | Prepare identifiers | /tools/web/slug-generator/ | Existing Unicode/Latin modes and separators | No | DO NOT BUILD |
| MIME Lookup | mime type lookup | mime type by extension | N/A | Reference extension/type mapping | No maintained dataset | IANA registers media types but extensions can be ambiguous; needs versioned mapping and coverage owner | Potential, Tier 3 | CONDITIONAL |
| Number Base Converter | number base converter | binary to decimal, decimal to hex, octal converter | N/A | Convert integer notation | None | Exact BigInt conversion across four bases; S14 | Yes, Tier 1 | BUILD |
| Raster dimensions/conversion | image dimensions | png to jpg, jpg to png, webp converter | N/A | Inspect/convert images | Existing inspector/converter | Six existing image tools inspected; no format-direction wrappers | No | DO NOT BUILD |
| Crop/resize/compress | image compressor | image cropper, image resizer | N/A | Prepare uploads | Existing three tools | No new function | No | DO NOT BUILD |
| Image metadata | image metadata viewer | EXIF viewer | N/A | Inspect camera/location tags | Inspector explicitly lacks full EXIF | S15; requires audited metadata parser and honest format coverage | Potential, Tier 2 | CONDITIONAL |
| SVG to PNG | svg to png | rasterize svg | N/A | Convert vector source | Raster converter excludes SVG | Active markup/external resource security and supported-feature policy needed | Potential, Tier 2 | CONDITIONAL |
| Meta tags | meta tag generator | SEO meta generator | N/A | Draft head markup | Site builds its own metadata, no public generator | S16; useful but need a focused preview/escaping contract, not rankings claims | Potential, Tier 3 | CONDITIONAL |
| robots.txt | robots txt generator | robots rule tester | N/A | Compose crawler rules | Site builds its own robots.txt | S16; crawl rules versus noindex and authentication need careful explanation | Potential, Tier 3 | CONDITIONAL |
| Sitemap Generator | sitemap generator | XML sitemap maker | N/A | Build site inventory | Site already generates its own sitemap | A real remote crawl requires server architecture; manual URL wrapper adds limited value now | Potential, Tier 3 | CONDITIONAL |
| Open Graph Preview | open graph preview | social preview | N/A | Inspect remote metadata | No fetch service | Browser CORS prevents reliable arbitrary-site fetching; a mock preview is not a live checker | No now | DO NOT BUILD |
| Canonical/HTTP checker | canonical checker | url status checker | N/A | Inspect remote response | No fetch service | Needs SSRF-safe server fetch, limits and operational support | No now | DO NOT BUILD |
| UTM Builder | utm builder | campaign url builder | N/A | Tag campaign links | /tools/web/utm-builder/ | Existing working tool | No | DO NOT BUILD |
| Readability Checker | readability checker | reading level | N/A | Estimate prose difficulty | Counter estimates reading time only | Language/formula validation, scope and explanatory value need research | Potential, Tier 3 | CONDITIONAL |
| QR Generator | qr code generator | URL QR code | N/A | Encode a scannable symbol | None | Legitimate gap but requires maintained encoder, capacity/error-correction/scan fixtures | Potential, Tier 2 | CONDITIONAL |

## Research ledger and search intent

Search queries submitted in this session covered JSON format/validate/minify/view/compare, CSV conversion, YAML, XML, Base64/percent/HTML encoding, regex, JWT, UUID, SHA256, epoch, Markdown/HTML, extraction, MIME, number bases, color/contrast, slugs/parser, SVG/metadata and publishing candidates. Current results are predominantly interactive utilities for the selected eight tasks. This supports **tool intent**, not a volume or low-competition claim. Competitor functionality was observed through page/search descriptions, not independently performance-tested. No competitor prose is copied.

| Evidence | Source and observation |
|---|---|
| S1 | [JSONPretty](https://jsonpretty.app/) presents formatter, validator and minifier together; supports keeping existing modes consolidated. |
| S2 | [JSON tree viewer](https://www.jsonformatter.me/tree) and [CodesBeautify viewer](https://codesbeautify.com/json-viewer) expose nested exploration, a distinct task from printed indentation. |
| S3 | [JSON2X comparison](https://json2x.com/tools/json-diff) describes structural added/removed/changed paths; raw line diff alone does not meet that task. |
| S4 | [UseFormatter YAML/JSON](https://useformatter.dev/json-yaml) combines directions; one future converter is preferable to direction variants. |
| S5 | [XMLFormatter](https://xmlformatter.org/) exposes XML formatting/validation; correctness extends beyond inserting line breaks. |
| S6 | [Base64.dev](https://base64.dev/) exposes both encoding and decoding; existing UtilityPilot already covers the core text intent. |
| S7 | [Omnibus regex tester](https://omnibus.tools/regex-tester) exposes matches, captures and JavaScript flags; engine identification matters. |
| S8 | [JWT.io](https://jwt.io/) exposes decoded header/payload and verification features; our decoder will explicitly offer inspection only. |
| S9 | [UUIDCore](https://www.uuidcore.com/) exposes v4 generation and batching; our scope is only v4, without uniqueness guarantees. |
| S10 | [SHA generator](https://www.shagenerator.com/) distinguishes text hashes, files and HMAC; our tool will cover exact UTF-8 text SHA-2 only. |
| S11 | [EpochConverter](https://www.epochconverter.com/) exposes both epoch/date directions; one page with explicit units satisfies them. |
| S12 | [MarkdownToHTML](https://markdowntohtml.online/) exposes conversion and export; a safe preview requires additional rendering work. |
| S13 | [Hysen Labs color utility](https://hysenlabs.com/en/tools/color-converter) exposes color conversion/contrast; both operations already exist here. |
| S14 | [W3Schools base converter](https://www.w3schools.com/tools/tool_number_base.php) groups binary/octal/decimal/hex; one exact-integer tool fits all directions. |
| S15 | [ToolMint metadata viewer](https://www.tool-mint.com/tools/image-metadata-viewer) describes interpreted tags; dimensions alone should not be relabelled full metadata. |
| S16 | [Crawlink robots generator](https://tools.crawlink.com/robots-txt-generator) combines rules and sitemap references; a generator must distinguish crawler access from privacy. |

## Technical sources and implementation constraints

- [RFC 7519](https://www.rfc-editor.org/rfc/rfc7519): JWT structure and NumericDate; successful decoding is not authentication. Support compact three-part JSON tokens only, not encrypted JWE.
- [RFC 9562](https://www.rfc-editor.org/rfc/rfc9562): UUID v4 version/variant and random-bit layout. Use browser cryptographic randomness, never Math.random.
- [Web Crypto digest](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest): SHA-256/384/512 digest API. UTF-8 bytes are input, with no silent trimming/normalization; hashing is not encryption or password storage.
- [RegExp exec](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec): matches, captures and lastIndex. Bound results, advance zero-width matches correctly, execute in terminable workers.
- [JSON Pointer RFC 6901](https://www.rfc-editor.org/rfc/rfc6901): escape path segments; compare objects without key-order sensitivity and arrays by index. Preserve number tokens and use exact decimal normalization for numeric equality.
- [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt): integer operations preserve large values; reject fractions and invalid digits rather than partially parsing.
- [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339): timestamp structure. Accept a clearly documented timezone-qualified millisecond subset; reject impossible calendar dates and leap-second inputs instead of silently normalizing them.

## Selected release and architecture

Tier 1: JWT Decoder, UUID v4 Generator, SHA Hash Generator, Unix Timestamp Converter, Number Base Converter. Tier 2 selected: JSON Viewer, JSON Compare, Regex Tester because the existing parser, form/result components and cancellable workers make these bounded implementations practical. Remaining conditional tools are not placeholders or public routes.

Add two routes to Data & Tables and six to a Developer Tools hub. Keep existing four categories/URLs. Add one API-inspection guide connecting new tools with existing Base64/JSON/text tools. Use `/tools/data/json-viewer/`, `/tools/data/json-compare/` and `/tools/developer/{regex-tester,jwt-decoder,uuid-generator,hash-generator,unix-timestamp,number-base-converter}/`.

Expected release: 40 tools, five hubs and thirteen guides; 69 HTML routes and 67 sitemap URLs if no additional routes are necessary. Sitemap generation stays manifest-based. No separate keyword-direction routes, query-value pages or duplicate forms. Complete the final implementation report with observed results rather than assuming these planned checks pass.
