# Ahrefs expansion research and decisions

Date: 2026-10-02. Primary metrics below are transcribed from the US Google Ahrefs summary supplied in the current user message. No new developer-topic CSV exists in docs/research; older files cover text/counter topics. These are supplied estimates, not a fresh Ahrefs API measurement. N/A means unavailable, including all Parent Topics except the two explicitly provided. Related wording is an editorial intent cluster, not an invented Ahrefs Parent Topic. No rankings, clicks or competition measurements have been inferred. Traffic Potential is not summed across overlapping keywords.

## Keyword decisions

A = BUILD NEW TOOL; B = IMPROVE EXISTING TOOL; C = MERGE INTO EXISTING TOOL; D = CREATE/EXPAND CONTENT ONLY; E = RESEARCH FURTHER; F = DO NOT BUILD. C means consolidate keyword targeting, not delete an existing route.

| Keyword | Volume | KD | Traffic Potential | Parent Topic | Existing coverage | Target URL / cluster | Decision | Intent, rationale and scope |
|---|---:|---:|---:|---|---|---|---|---|
| password generator | 404000 | 76 | 490000 | N/A | None | N/A | E: RESEARCH FURTHER | High-difficulty, security-sensitive intent already served by established password managers. Research a differentiated use case before building. |
| json formatter | 66000 | 66 | 2300 | N/A | JSON formatter and validator | /tools/data/json-formatter/ | B: IMPROVE EXISTING TOOL | Expand syntax, numeric precision, formatting and error examples. |
| json viewer | 23000 | 36 | 300 | N/A | JSON Viewer | /tools/data/json-viewer/ | D: CREATE/EXPAND CONTENT ONLY | Existing tree is distinct from formatting; add a conversion next step. |
| base64 decode | 19000 | 0 | 66000 | base64 | Base64 encoder and decoder | /tools/web/base64/ | B: IMPROVE EXISTING TOOL | Keep encode/decode on one page; expand UTF-8, padding and binary-output guidance. |
| json validator | 17000 | 0 | 400 | online json validator | JSON formatter and validator | /tools/data/json-formatter/ | C: MERGE INTO EXISTING TOOL | Existing strict parser already validates and reports locations. Give validation a substantial section on that page. |
| json beautifier | 12000 | 0 | 4000 | N/A | JSON formatter and validator | /tools/data/json-formatter/ | C: MERGE INTO EXISTING TOOL | Beautifying is the existing indentation operation. No duplicate URL. |
| uuid generator | 12000 | 0 | 3200 | N/A | UUID Generator | /tools/developer/uuid-generator/ | D: CREATE/EXPAND CONTENT ONLY | Existing Web Crypto v4 generator meets the intent; retain tested implementation and detailed content. |
| color contrast checker | 9900 | 0 | 28000 | N/A | Color contrast checker | /tools/web/contrast-checker/ | B: IMPROVE EXISTING TOOL | Add pickers and swap, preserve WCAG luminance calculations, expand threshold explanations. |
| base64 encode | 8400 | 0 | 5800 | N/A | Base64 encoder and decoder | /tools/web/base64/ | C: MERGE INTO EXISTING TOOL | Same reversible encoding engine and useful shared explanation. |
| regex tester | 7500 | 0 | 26000 | N/A | Regex Tester | /tools/developer/regex-tester/ | D: CREATE/EXPAND CONTENT ONLY | Existing bounded JavaScript worker, captures and positions satisfy the intent. Improve Unicode follow-up. |
| json to csv | 6800 | 0 | 1500 | N/A | JSON to CSV converter | /tools/data/json-to-csv/ | B: IMPROVE EXISTING TOOL | Expand record shape, escaping, nesting, missing/null and safe spreadsheet export content. |
| json compare | 6200 | 59 | 12000 | N/A | JSON Compare | /tools/data/json-compare/ | D: CREATE/EXPAND CONTENT ONLY | Existing structural diff preserves precision; connect configuration conversion. |
| csv to json | 3400 | 69 | 2300 | N/A | CSV to JSON converter | /tools/data/csv-to-json/ | B: IMPROVE EXISTING TOOL | Expand delimiters, quoted records, header validation and explicit typing. |
| url decoder | 3000 | 67 | 6700 | N/A | URL encoder and decoder | /tools/web/url-encoder-decoder/ | B: IMPROVE EXISTING TOOL | Expand component/form modes and malformed UTF-8 guidance on existing page. |
| yaml to json | 2800 | 0 | 2100 | N/A | None | /tools/data/json-yaml-converter/ | A: BUILD NEW TOOL | Genuine gap: reputable YAML parser, explicit JSON-compatible subset and no silent numeric loss. |
| html formatter | 2600 | 61 | 3400 | N/A | None | N/A | E: RESEARCH FURTHER | Distinct gap, but requires syntax-aware formatter and embedded-language policy. Defer rather than implement whitespace heuristics. |
| json to yaml | 2600 | 5 | 3100 | N/A | None | /tools/data/json-yaml-converter/ | A: BUILD NEW TOOL | Same bidirectional configuration conversion engine; one substantial page for both directions. |
| jwt decoder | 2400 | 47 | 22000 | N/A | JWT Decoder | /tools/developer/jwt-decoder/ | B: IMPROVE EXISTING TOOL | Add UTC interpretation of time claims; preserve unverified status and original numeric tokens. |
| url encoder | 2400 | 0 | 7500 | N/A | URL encoder and decoder | /tools/web/url-encoder-decoder/ | C: MERGE INTO EXISTING TOOL | Use operation selection on the existing encoder/decoder. |
| markdown to html | 1800 | 0 | 2000 | N/A | None | /tools/web/markdown-to-html/ | A: BUILD NEW TOOL | Genuine publishing gap; established Markdown parser, safe generated markup and source output. |
| html to markdown | 1600 | 0 | 1100 | N/A | None | N/A | E: RESEARCH FURTHER | Reverse conversion is not lossless and needs table, embedded content and style-loss policy. Defer a dedicated DOM conversion implementation. |
| regex generator | 1600 | 0 | 10 | N/A | Regex Tester | /tools/developer/regex-tester/ | F: DO NOT BUILD | No natural-language generation engine. Tester is not marketed as a generator. |
| unicode converter | 1100 | 0 | 1400 | N/A | None | /tools/developer/unicode-converter/ | A: BUILD NEW TOOL | Genuine escape/code-point conversion gap; reject malformed surrogates, keep HTML/URL encodings with existing tools. |
| md5 hash generator | 700 | 45 | 3900 | N/A | SHA Hash Generator | /tools/developer/hash-generator/ | F: DO NOT BUILD | Current SHA-only tool intentionally excludes MD5. No compatibility requirement justifies a broken cryptographic algorithm or extra dependency here. |
| javascript formatter | 600 | 69 | 3900 | N/A | None | N/A | E: RESEARCH FURTHER | Requires grammar-aware parser and language-version support; do not fake formatting with string replacement. |
| css formatter | 500 | 70 | 150 | N/A | None | N/A | E: RESEARCH FURTHER | Requires reliable CSS grammar support; defer with related code-formatting research. |
| color converter | 500 | 25 | 1200 | N/A | HEX RGB HSL converter | /tools/web/color-converter/ | D: CREATE/EXPAND CONTENT ONLY | Existing HEX/RGB/HSL engine is sufficient; link contrast workflow. |
| html decoder | 400 | 8 | 700 | N/A | HTML entity encoder and decoder | /tools/web/html-entities/ | B: IMPROVE EXISTING TOOL | Expand entity syntax, one-pass decoding and distinction from sanitization. |
| slug generator | 300 | 3 | 600 | N/A | URL slug generator | /tools/web/slug-generator/ | D: CREATE/EXPAND CONTENT ONLY | Existing ASCII/Unicode modes cover intent; preserve canonical. |
| url parser | 250 | 62 | 20 | N/A | URL and query-string parser | /tools/web/url-parser/ | D: CREATE/EXPAND CONTENT ONLY | Existing ordered query pairs and credential redaction serve this task. |
| random uuid generator | 250 | 0 | 17000 | N/A | UUID Generator | /tools/developer/uuid-generator/ | C: MERGE INTO EXISTING TOOL | Same v4 generation intent; no separate random UUID page. |
| jwt debugger | 200 | 48 | 22000 | N/A | JWT Decoder | /tools/developer/jwt-decoder/ | C: MERGE INTO EXISTING TOOL | Inspection and time interpretation share decoder page; never imply signature verification. |
| hash generator | 200 | 50 | 3700 | N/A | SHA Hash Generator | /tools/developer/hash-generator/ | D: CREATE/EXPAND CONTENT ONLY | Existing SHA-256/384/512 text fingerprinting remains clearly scoped. |
| html encoder | 200 | 6 | 600 | N/A | HTML entity encoder and decoder | /tools/web/html-entities/ | C: MERGE INTO EXISTING TOOL | One bidirectional entity page. |
| json minifier | 200 | 10 | 700 | N/A | JSON formatter and validator | /tools/data/json-formatter/ | C: MERGE INTO EXISTING TOOL | Minification already exists as indentation zero; explain the mode. |
| sha256 generator | 150 | 28 | 3500 | N/A | SHA Hash Generator | /tools/developer/hash-generator/ | C: MERGE INTO EXISTING TOOL | Algorithm selection already includes SHA-256; no separate route. |
| base64 encoder decoder | 70 | 71 | 70000 | N/A | Base64 encoder and decoder | /tools/web/base64/ | C: MERGE INTO EXISTING TOOL | Consolidate reversible operations; do not sum Traffic Potential across rows. |
| html entity decoder | 50 | N/A | N/A | N/A | HTML entity encoder and decoder | /tools/web/html-entities/ | C: MERGE INTO EXISTING TOOL | Existing named/numeric entity decoder. |
| html entity encoder | 40 | 7 | 200 | N/A | HTML entity encoder and decoder | /tools/web/html-entities/ | C: MERGE INTO EXISTING TOOL | Existing named/numeric entity encoder. |
| mime type lookup | N/A | N/A | N/A | N/A | None | N/A | F: DO NOT BUILD | No useful supplied demand evidence; reliable maintained mapping would be a separate reference product. |

## Selection and implementation difficulty

Tier 1: improve existing Base64, JSON Formatter, CSV/JSON, URL encoding and HTML entity explanations; add color controls and JWT claim interpretation. Low implementation difficulty, clear direct tool intent, minimal cannibalization risk when current URLs remain owners. UUID/regex/hash/viewer/compare already have substantial explanations and tested functionality: retain them with relevant new links.

Tier 1 new: Unicode Converter, low/medium complexity. Reversible UTF-16 escapes and scalar code-point notation solve a different task from Base64 bytes or HTML entities.

Tier 2 selected: JSON/YAML Converter (medium/high complexity, a maintained parser plus a deliberately bounded JSON-compatible subset) and Markdown to HTML (medium complexity, established parser with raw HTML escaped and unsafe links blocked). Both have supplied demand and distinct utility. One JSON/YAML page owns both conversion directions. Only three new routes are selected.

Tier 2 deferred: HTML-to-Markdown and grammar-aware HTML/CSS/JavaScript formatting need separate fidelity policies and fixtures. These are legitimate gaps but are not prerequisites for the selected tools. Tier 3: password generation needs differentiated value against established password-manager tools and security-focused review; large volume alone is insufficient. MIME lookup lacks useful evidence in this export. MD5 compatibility is not added to SHA tools; regex generation is not implied by a tester.

## Current search review (not a rank-position audit)

Available web search results were reviewed on this date. The tool does not expose a reproducible signed-out Google US SERP or PAA capture; no exact Google ranking, featured-snippet or PAA claim is made. Observations are intent evidence, not promises of traffic.

- [Base64.dev](https://base64.dev/): encode/decode share a tool, with UTF-8 and binary distinctions. Supports consolidating both directions.
- [JSON Formatter](https://json-formatter.org/): combined formatter/validator interface supports keeping beautification, validation and minification together here.
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/): color-pair input, ratio and normal/large text outcomes support improving the existing checker.
- [UseFormatter JSON/YAML](https://useformatter.dev/json-yaml) and [YAMLJSON](https://yamljson.com/): interactive configuration conversion with type/loss explanations; supports a bidirectional converter with explicit limitations.
- [Unicode escape tool](https://hcju.com/en/unicode-converter): text/escape/code-point operations confirm a distinct representation task.
- [MarkdownToHTML](https://markdowntohtml.online/): source conversion is a distinct publishing operation. [HTML-to-Markdown](https://www.w3schools.com/tools/tool_html_markdown.php) illustrates that the reverse direction requires a separate parsing policy.
- [Bitwarden generator](https://bitwarden.com/password-generator/) and [1Password generator](https://1password.com/password-generator): established security products offer interactive generation and related storage workflows. Defer until UtilityPilot can articulate additional value; do not assume impossible competition from KD alone.
- Existing researched regex/JWT/UUID/JSON-diff intent is recorded in [the previous research](UTILITYPILOT-NEW-PAGE-RESEARCH.md); repository verification confirms these tools already exist. Supplied metrics now replace N/A for this expansion's decisions, without retroactively rewriting historical research.

## Technical sources and constraints

- [YAML parser API](https://eemeli.org/yaml/): document AST, schema, strict errors, aliases and scalar types. Use the real maintained parser; restrict unsupported YAML constructs explicitly.
- [Marked documentation](https://marked.js.org/): Markdown parser is not a sanitizer. Escape raw HTML, restrict generated link/image URLs, keep output in a textarea; never execute source.
- [MDN lexical grammar](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar): Unicode escapes and UTF-16 distinctions; conversion must not use eval.
- [WCAG 2.2 contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): retain relative luminance and unrounded threshold decisions, normal/large distinction; no whole-site compliance claims.
- [RFC 7519](https://www.rfc-editor.org/rfc/rfc7519.html): NumericDate uses seconds; displaying a time is not claim or signature verification.

## Page purpose and internal links

New JSON/YAML page links formatter, viewer, structural compare and CSV conversion. Unicode links regex, Base64, HTML entities and URL encoding. Markdown links entities, text diff and slug generation. Existing tools, guides and the three affected category hubs link back. All selected pages use the registry-driven sitemap/canonical architecture; no alias pages, empty hubs or input-generated URLs.

## Per-keyword risk, effort and opportunity

These are qualitative implementation judgments, not fabricated SEO scores. Intent is the named operation in the main decision table. D-class existing tools with already substantial explanations are retained after review; new contextual links are added where useful.

| Keyword | Intended owner | Cannibalization risk | Implementation difficulty | Opportunity assessment |
|---|---|---|---|---|
| password generator | N/A | Low overlap; distinct credential generation | High security-review burden | Large supplied demand; differentiation unresolved |
| json formatter | /tools/data/json-formatter/ | Low when the established canonical retains ownership | Low: existing processor, editorial/search/internal-link work | Improve or retain a working tool matching supplied demand |
| json viewer | /tools/data/json-viewer/ | Low when the established canonical retains ownership | Low: existing processor, editorial/search/internal-link work | Improve or retain a working tool matching supplied demand |
| base64 decode | /tools/web/base64/ | Low when the established canonical retains ownership | Low: existing processor, editorial/search/internal-link work | Improve or retain a working tool matching supplied demand |
| json validator | /tools/data/json-formatter/ | High for a separate synonym route; low on existing owner | Low: existing processor, editorial/search/internal-link work | Supporting intent on the existing tool; no new URL |
| json beautifier | /tools/data/json-formatter/ | High for a separate synonym route; low on existing owner | Low: existing processor, editorial/search/internal-link work | Supporting intent on the existing tool; no new URL |
| uuid generator | /tools/developer/uuid-generator/ | Low when the established canonical retains ownership | Low: existing processor, editorial/search/internal-link work | Improve or retain a working tool matching supplied demand |
| color contrast checker | /tools/web/contrast-checker/ | Low when the established canonical retains ownership | Medium: small functional enhancement and regression tests | Improve or retain a working tool matching supplied demand |
| base64 encode | /tools/web/base64/ | High for a separate synonym route; low on existing owner | Low: existing processor, editorial/search/internal-link work | Supporting intent on the existing tool; no new URL |
| regex tester | /tools/developer/regex-tester/ | Low when the established canonical retains ownership | Low: existing processor, editorial/search/internal-link work | Improve or retain a working tool matching supplied demand |
| json to csv | /tools/data/json-to-csv/ | Low when the established canonical retains ownership | Low: existing processor, editorial/search/internal-link work | Improve or retain a working tool matching supplied demand |
| json compare | /tools/data/json-compare/ | Low when the established canonical retains ownership | Low: existing processor, editorial/search/internal-link work | Improve or retain a working tool matching supplied demand |
| csv to json | /tools/data/csv-to-json/ | Low when the established canonical retains ownership | Low: existing processor, editorial/search/internal-link work | Improve or retain a working tool matching supplied demand |
| url decoder | /tools/web/url-encoder-decoder/ | Low when the established canonical retains ownership | Low: existing processor, editorial/search/internal-link work | Improve or retain a working tool matching supplied demand |
| yaml to json | /tools/data/json-yaml-converter/ | Low with one bidirectional page | Medium/high: parser and type fidelity | Distinct configuration workflow backed by supplied demand |
| html formatter | N/A | Low; existing entities tool is not a formatter | High: grammar and embedded languages | Distinct need but deferred implementation |
| json to yaml | /tools/data/json-yaml-converter/ | High if split into near-identical conversion pages | Shared YAML processor | Combine reverse directions on the selected new page |
| jwt decoder | /tools/developer/jwt-decoder/ | Low when the established canonical retains ownership | Medium: small functional enhancement and regression tests | Improve or retain a working tool matching supplied demand |
| url encoder | /tools/web/url-encoder-decoder/ | High for a separate synonym route; low on existing owner | Low: existing processor, editorial/search/internal-link work | Supporting intent on the existing tool; no new URL |
| markdown to html | /tools/web/markdown-to-html/ | Low; syntax conversion differs from entities | Medium: parser and safe output policy | Distinct publishing utility |
| html to markdown | N/A | Low; reverse conversion distinct | Medium/high: loss and DOM conversion rules | Potential follow-up after fidelity fixtures |
| regex generator | /tools/developer/regex-tester/ | High if tester is mislabeled | High for honest general-language generation | No supported generation capability; do not target |
| unicode converter | /tools/developer/unicode-converter/ | Low; different from bytes/HTML entities | Medium: surrogate and notation validation | Distinct character-debugging utility |
| md5 hash generator | /tools/developer/hash-generator/ | High if separate hash page duplicates shell | Medium: compatibility/security policy | Unsupported algorithm intentionally excluded |
| javascript formatter | N/A | Low; no current JavaScript formatting | High: parser and language versions | Distinct need but reliable syntax support required |
| css formatter | N/A | Low; no current CSS formatting | Medium/high: grammar and syntax variants | Smaller supplied demand; defer with formatter research |
| color converter | /tools/web/color-converter/ | Low when the established canonical retains ownership | Low: existing processor, editorial/search/internal-link work | Improve or retain a working tool matching supplied demand |
| html decoder | /tools/web/html-entities/ | Low when the established canonical retains ownership | Low: existing processor, editorial/search/internal-link work | Improve or retain a working tool matching supplied demand |
| slug generator | /tools/web/slug-generator/ | Low when the established canonical retains ownership | Low: existing processor, editorial/search/internal-link work | Improve or retain a working tool matching supplied demand |
| url parser | /tools/web/url-parser/ | Low when the established canonical retains ownership | Low: existing processor, editorial/search/internal-link work | Improve or retain a working tool matching supplied demand |
| random uuid generator | /tools/developer/uuid-generator/ | High for a separate synonym route; low on existing owner | Low: existing processor, editorial/search/internal-link work | Supporting intent on the existing tool; no new URL |
| jwt debugger | /tools/developer/jwt-decoder/ | High for a separate synonym route; low on existing owner | Low: existing processor, editorial/search/internal-link work | Supporting intent on the existing tool; no new URL |
| hash generator | /tools/developer/hash-generator/ | Low when the established canonical retains ownership | Low: existing processor, editorial/search/internal-link work | Improve or retain a working tool matching supplied demand |
| html encoder | /tools/web/html-entities/ | High for a separate synonym route; low on existing owner | Low: existing processor, editorial/search/internal-link work | Supporting intent on the existing tool; no new URL |
| json minifier | /tools/data/json-formatter/ | High for a separate synonym route; low on existing owner | Low: existing processor, editorial/search/internal-link work | Supporting intent on the existing tool; no new URL |
| sha256 generator | /tools/developer/hash-generator/ | High for a separate synonym route; low on existing owner | Low: existing processor, editorial/search/internal-link work | Supporting intent on the existing tool; no new URL |
| base64 encoder decoder | /tools/web/base64/ | High for a separate synonym route; low on existing owner | Low: existing processor, editorial/search/internal-link work | Supporting intent on the existing tool; no new URL |
| html entity decoder | /tools/web/html-entities/ | High for a separate synonym route; low on existing owner | Low: existing processor, editorial/search/internal-link work | Supporting intent on the existing tool; no new URL |
| html entity encoder | /tools/web/html-entities/ | High for a separate synonym route; low on existing owner | Low: existing processor, editorial/search/internal-link work | Supporting intent on the existing tool; no new URL |
| mime type lookup | N/A | Low; distinct reference lookup | Medium: maintained authoritative dataset | Insufficient supplied US evidence |
