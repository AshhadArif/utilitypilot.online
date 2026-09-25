# Tool catalog

Research and proposal: 25 September 2026. This records the original planning scope; current implementation and audit status are in IMPLEMENTATION-REPORT.md and PRE-LAUNCH-AUDIT.md. This is the authoritative 32-tool launch scope. P0 and P1 are delivery order within the MVP, not public launch phases. All tools must pass release gates before the complete launch.

## Shared contract

Every tool uses browser processing with no external data, API or server processing. Standards tables and parser libraries are bundled, versioned static dependencies. User input stays in volatile memory; local copies/downloads are user initiated. No automatic input persistence, remote URL import, telemetry payloads or third-party scripts on tool pages. These are proposed controls, not a verified privacy claim about an existing site. Runtime limits and failures must be displayed before processing. See [privacy plan](DATA-PRIVACY-PLAN.md).

Every tool page includes its own instructions, worked example, result interpretation, limits, common mistakes, methodology, related guide and related tools. Search intent is immediate task completion; all five keyword variants below map to the same canonical URL. Public status remains absent until working; internal registry status is planned. No placeholder landing pages.

## Qualitative scoring

High competition is a conservative assessment of observed alternatives, not measured KD. Search opportunity is Medium throughout because task evidence exists but market size and Google rankability are unverified. High user value means the tool completes a concrete workflow, not that it has many users. Privacy scores describe input sensitivity before controls. AdSense quality is Medium/conditional: original working pages may be suitable, but implementation and Google review determine eligibility. No numerical total is used.

## UP001 — Word and character counter

- URL: `/tools/text/word-counter/`; family: text; owner: UtilityPilot; priority: P1.
- User problem / why needed: Measure copy against a length limit. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: Text; locale; reading speed.
- Outputs: Words, graphemes, code points, sentences and estimated reading time.
- How it works: Segment Unicode text; label counting rules; minutes = words / chosen WPM.
- Required original content and acceptance cases: Emoji sequences; CJK segmentation; abbreviations; empty input. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: word counter; character counter without spaces; count words in pasted text; reading time calculator for text; count characters including emoji.
- Complexity: Medium; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: Medium input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/text/text-cleaner/`, `/tools/text/case-converter/`.
- Supporting guide: /guides/clean-copied-text/.
- Evaluation: user value High; search Medium; long-tail Medium; competition High; implementation Medium; external-data burden Low; maintenance Low; privacy risk Medium; content High; linking High; expansion Medium; AdSense quality Medium.
- Rationale: Emoji sequences is a concrete reason to make result behavior explicit. Shared text inputs enable useful follow-on operations; medium implementation difficulty determines test effort, not keyword priority.

## UP002 — Text cleaner

- URL: `/tools/text/text-cleaner/`; family: text; owner: UtilityPilot; priority: P0.
- User problem / why needed: Repair spacing after copying text. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: Text; individually selected whitespace operations.
- Outputs: Cleaned text and per-operation change counts.
- How it works: Apply an explicit ordered pipeline; retain original and preview before applying.
- Required original content and acceptance cases: NBSP; tabs; CRLF; preserve paragraph breaks; never remove zero-width characters silently. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: remove extra spaces from text; remove line breaks from copied pdf text; trim spaces at beginning of each line; remove blank lines from text; replace non breaking spaces with normal spaces.
- Complexity: Medium; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: Medium input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/text/word-counter/`, `/tools/text/remove-duplicate-lines/`.
- Supporting guide: /guides/clean-copied-text/.
- Evaluation: user value High; search Medium; long-tail High; competition High; implementation Medium; external-data burden Low; maintenance Low; privacy risk Medium; content High; linking High; expansion Medium; AdSense quality Medium.
- Rationale: NBSP is a concrete reason to make result behavior explicit. Shared text inputs enable useful follow-on operations; medium implementation difficulty determines test effort, not keyword priority.

## UP003 — Remove duplicate lines

- URL: `/tools/text/remove-duplicate-lines/`; family: text; owner: UtilityPilot; priority: P0.
- User problem / why needed: Remove repeated entries without changing list order. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: Lines; case and trim comparison options; keep first or last.
- Outputs: Unique lines and removed count.
- How it works: Use normalized comparison keys while retaining the selected original line.
- Required original content and acceptance cases: Blank lines; Unicode normalization opt-in; case; final newline. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: remove duplicate lines from text; remove duplicate lines keep order; remove duplicate lines ignore case; keep last duplicate line; remove repeated email addresses from list.
- Complexity: Low; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: Medium input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/text/sort-lines/`, `/tools/text/compare-lists/`.
- Supporting guide: /guides/url-encoding-and-tracking/ — encoding-layer distinctions; include Base64-specific worked examples on this tool page.
- Evaluation: user value High; search Medium; long-tail Medium; competition High; implementation Low; external-data burden Low; maintenance Low; privacy risk Medium; content High; linking High; expansion Medium; AdSense quality Medium.
- Rationale: Blank lines is a concrete reason to make result behavior explicit. Shared text inputs enable useful follow-on operations; low implementation difficulty determines test effort, not keyword priority.

## UP004 — Sort lines

- URL: `/tools/text/sort-lines/`; family: text; owner: UtilityPilot; priority: P0.
- User problem / why needed: Put a pasted list into useful order. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: Lines; alphabetical, natural, numeric or length mode; locale.
- Outputs: Sorted list and explanation of ordering.
- How it works: Stable sorting with explicit comparator and descending option.
- Required original content and acceptance cases: item2 vs item10; invalid numbers; equal keys; locale accents. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: sort lines alphabetically online; natural sort list online; sort numbers one per line; sort lines by length; reverse order of lines.
- Complexity: Medium; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: Medium input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/text/remove-duplicate-lines/`, `/tools/text/compare-lists/`.
- Supporting guide: /guides/url-encoding-and-tracking/ — encoding-layer distinctions; include HTML-entity-specific worked examples on this tool page.
- Evaluation: user value High; search Medium; long-tail Medium; competition High; implementation Medium; external-data burden Low; maintenance Low; privacy risk Medium; content High; linking High; expansion Medium; AdSense quality Medium.
- Rationale: item2 vs item10 is a concrete reason to make result behavior explicit. Shared text inputs enable useful follow-on operations; medium implementation difficulty determines test effort, not keyword priority.

## UP005 — Text case converter

- URL: `/tools/text/case-converter/`; family: text; owner: UtilityPilot; priority: P1.
- User problem / why needed: Normalize capitalization of pasted copy. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: Text; upper, lower, sentence or title mode; locale.
- Outputs: Converted text with editable preview.
- How it works: Locale-aware casing; documented heuristic sentence and title modes.
- Required original content and acceptance cases: Turkish I; acronyms; names; title style is not universal. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: convert text to lowercase; convert text to uppercase; sentence case converter; title case converter online; change capitalization of pasted text.
- Complexity: Medium; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: Medium input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/text/text-cleaner/`, `/tools/web/slug-generator/`.
- Supporting guide: /guides/unicode-counting/.
- Evaluation: user value High; search Medium; long-tail Medium; competition High; implementation Medium; external-data burden Low; maintenance Medium; privacy risk Medium; content High; linking High; expansion Medium; AdSense quality Medium.
- Rationale: Turkish I is a concrete reason to make result behavior explicit. Shared text inputs enable useful follow-on operations; medium implementation difficulty determines test effort, not keyword priority.

## UP006 — Find and replace text

- URL: `/tools/text/find-and-replace/`; family: text; owner: UtilityPilot; priority: P1.
- User problem / why needed: Change repeated literal text without editing each occurrence. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: Text; literal find and replacement; case and whole-word options.
- Outputs: Preview, match count and replaced text.
- How it works: Literal matching by default; preserve source; explicit Apply.
- Required original content and acceptance cases: Empty search disallowed; replacement dollar signs literal; overlapping matches defined. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: find and replace text online; replace multiple occurrences in text; replace text case insensitive; replace whole words online; replace commas with line breaks.
- Complexity: Medium; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: Medium input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/text/text-diff/`, `/tools/text/text-cleaner/`.
- Supporting guide: /guides/clean-copied-text/.
- Evaluation: user value High; search Medium; long-tail Medium; competition High; implementation Medium; external-data burden Low; maintenance Low; privacy risk Medium; content High; linking High; expansion Medium; AdSense quality Medium.
- Rationale: Empty search disallowed is a concrete reason to make result behavior explicit. Shared text inputs enable useful follow-on operations; medium implementation difficulty determines test effort, not keyword priority.

## UP007 — Text difference checker

- URL: `/tools/text/text-diff/`; family: text; owner: UtilityPilot; priority: P1.
- User problem / why needed: Locate edits between two versions. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: Old and new text; line or word view.
- Outputs: Accessible additions, deletions and unchanged passages.
- How it works: Bounded diff algorithm in worker; context collapse optional.
- Required original content and acceptance cases: Repeated lines; CRLF; long lines; whitespace settings; no semantic meaning claim. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: compare two text files online; highlight differences between two texts; compare text ignoring whitespace; word by word text difference; compare pasted text versions.
- Complexity: High; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: Medium input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/text/compare-lists/`, `/tools/text/find-and-replace/`.
- Supporting guide: /guides/compare-lists-and-text/.
- Evaluation: user value High; search Medium; long-tail Medium; competition High; implementation High; external-data burden Low; maintenance Low; privacy risk Medium; content High; linking High; expansion Medium; AdSense quality Medium.
- Rationale: Repeated lines is a concrete reason to make result behavior explicit. Shared text inputs enable useful follow-on operations; high implementation difficulty determines test effort, not keyword priority.

## UP008 — Compare lists

- URL: `/tools/text/compare-lists/`; family: text; owner: UtilityPilot; priority: P0.
- User problem / why needed: Find shared or missing entries in two lists. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: Two newline lists; comparison normalization options.
- Outputs: Intersection, A-only, B-only and union with counts.
- How it works: Set membership; preserve first-seen order and show duplicate totals separately.
- Required original content and acceptance cases: Duplicates vs occurrence counts; empty entries; case; no decision recommendation. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: compare two lists online; find common items in two lists; find missing entries between lists; items in list a not list b; combine two lists without duplicates.
- Complexity: Medium; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: Medium input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/text/remove-duplicate-lines/`, `/tools/text/sort-lines/`.
- Supporting guide: /guides/compare-lists-and-text/.
- Evaluation: user value High; search Medium; long-tail Medium; competition High; implementation Medium; external-data burden Low; maintenance Low; privacy risk Medium; content High; linking High; expansion Medium; AdSense quality Medium.
- Rationale: Duplicates vs occurrence counts is a concrete reason to make result behavior explicit. Shared text inputs enable useful follow-on operations; medium implementation difficulty determines test effort, not keyword priority.

## UP009 — JSON formatter and validator

- URL: `/tools/data/json-formatter/`; family: data; owner: UtilityPilot; priority: P0.
- User problem / why needed: Make JSON readable and identify syntax errors. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: JSON text/file; indentation; compact output option.
- Outputs: Formatted or minified JSON; validation diagnostics.
- How it works: Tokenize and parse without eval; preserve number lexemes and key order.
- Required original content and acceptance cases: Duplicate keys detected; huge integers; trailing commas; depth cap; never silently repair. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: json formatter; json beautifier; validate json online; json minifier; format json without losing large numbers.
- Complexity: High; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: High input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/data/json-to-csv/`, `/tools/data/csv-to-json/`.
- Supporting guide: /guides/nested-json-to-csv/.
- Evaluation: user value High; search Medium; long-tail Medium; competition High; implementation High; external-data burden Low; maintenance Low; privacy risk High; content High; linking High; expansion High; AdSense quality Medium.
- Rationale: Duplicate keys detected is a concrete reason to make result behavior explicit. Shared data inputs enable useful follow-on operations; high implementation difficulty determines test effort, not keyword priority.

## UP010 — JSON to CSV converter

- URL: `/tools/data/json-to-csv/`; family: data; owner: UtilityPilot; priority: P0.
- User problem / why needed: Turn object records into spreadsheet-ready rows. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: Array of objects; field selection; flatten option; delimiter.
- Outputs: CSV preview, row count and downloadable file.
- How it works: Union keys in first-seen order; nested arrays serialized as JSON; explicit object flattening.
- Required original content and acceptance cases: Dot-key collisions; null vs empty; unsafe spreadsheet formulas; no automatic row explosion. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: convert json to csv online; convert nested json to csv; json array of objects to csv; json to csv select columns; json to csv preserve missing fields.
- Complexity: High; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: High input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/data/csv-to-json/`, `/tools/data/csv-column-editor/`.
- Supporting guide: /guides/nested-json-to-csv/.
- Evaluation: user value High; search Medium; long-tail High; competition High; implementation High; external-data burden Low; maintenance Low; privacy risk High; content High; linking High; expansion High; AdSense quality Medium.
- Rationale: Dot-key collisions is a concrete reason to make result behavior explicit. Shared data inputs enable useful follow-on operations; high implementation difficulty determines test effort, not keyword priority.

## UP011 — CSV to JSON converter

- URL: `/tools/data/csv-to-json/`; family: data; owner: UtilityPilot; priority: P0.
- User problem / why needed: Prepare tabular exports for a JSON consumer. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: CSV text/file; delimiter; header choice; explicit type settings.
- Outputs: Array of objects or arrays; diagnostics.
- How it works: Parse quoted records; strings by default; opt-in types with warnings.
- Required original content and acceptance cases: Duplicate headers; leading zeros; multiline values; BOM; empty rows. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: csv to json online; csv to json preserve leading zeros; csv to json with headers; csv to json all values as strings; convert semicolon csv to json.
- Complexity: High; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: High input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/data/json-formatter/`, `/tools/data/json-to-csv/`.
- Supporting guide: /guides/csv-import-troubleshooting/.
- Evaluation: user value High; search Medium; long-tail Medium; competition High; implementation High; external-data burden Low; maintenance Low; privacy risk High; content High; linking High; expansion High; AdSense quality Medium.
- Rationale: Duplicate headers is a concrete reason to make result behavior explicit. Shared data inputs enable useful follow-on operations; high implementation difficulty determines test effort, not keyword priority.

## UP012 — CSV viewer and validator

- URL: `/tools/data/csv-viewer/`; family: data; owner: UtilityPilot; priority: P0.
- User problem / why needed: Inspect a file before importing it. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: CSV/TSV text/file; delimiter; header and encoding settings.
- Outputs: Virtualized table; record/column counts; parse diagnostics.
- How it works: Real record parser; bounded table preview distinct from full data.
- Required original content and acceptance cases: Ragged rows; quoted newlines; duplicate headers; never render cells as HTML. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: csv viewer online; check csv for formatting errors; validate csv column count; view csv with quoted newlines; inspect csv delimiter.
- Complexity: High; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: High input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/data/csv-column-editor/`, `/tools/data/csv-deduplicate/`.
- Supporting guide: /guides/csv-import-troubleshooting/.
- Evaluation: user value High; search Medium; long-tail Medium; competition High; implementation High; external-data burden Low; maintenance Low; privacy risk High; content High; linking High; expansion High; AdSense quality Medium.
- Rationale: Ragged rows is a concrete reason to make result behavior explicit. Shared data inputs enable useful follow-on operations; high implementation difficulty determines test effort, not keyword priority.

## UP013 — Remove duplicate CSV rows

- URL: `/tools/data/csv-deduplicate/`; family: data; owner: UtilityPilot; priority: P0.
- User problem / why needed: Remove duplicate records by selected fields. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: CSV; key columns; first or last retention.
- Outputs: CSV plus retained and removed record counts.
- How it works: Compare tuples of field values rather than joined ambiguous strings.
- Required original content and acceptance cases: Composite key collisions; blanks; header retention; quoted delimiters. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: remove duplicate rows csv online; remove csv duplicates by column; deduplicate csv keep header; keep last duplicate csv row; find duplicate csv records by two columns.
- Complexity: High; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: High input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/data/csv-viewer/`, `/tools/data/csv-merge/`.
- Supporting guide: /guides/deduplicate-csv-by-key/.
- Evaluation: user value High; search Medium; long-tail High; competition High; implementation High; external-data burden Low; maintenance Low; privacy risk High; content High; linking High; expansion High; AdSense quality Medium.
- Rationale: Composite key collisions is a concrete reason to make result behavior explicit. Shared data inputs enable useful follow-on operations; high implementation difficulty determines test effort, not keyword priority.

## UP014 — CSV column editor

- URL: `/tools/data/csv-column-editor/`; family: data; owner: UtilityPilot; priority: P0.
- User problem / why needed: Select, rename and reorder fields for an import. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: CSV; checked columns; ordered names.
- Outputs: Transformed CSV and schema preview.
- How it works: Operate on parsed field positions; keyboard reorder controls.
- Required original content and acceptance cases: Duplicate output names rejected; preserve leading zeros; empty selection rejected. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: select columns from csv online; reorder csv columns online; remove a column from csv; rename csv headers; extract one column from csv.
- Complexity: Medium; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: High input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/data/csv-viewer/`, `/tools/data/json-to-csv/`.
- Supporting guide: /guides/deduplicate-csv-by-key/.
- Evaluation: user value High; search Medium; long-tail High; competition High; implementation Medium; external-data burden Low; maintenance Low; privacy risk High; content High; linking High; expansion High; AdSense quality Medium.
- Rationale: Duplicate output names rejected is a concrete reason to make result behavior explicit. Shared data inputs enable useful follow-on operations; medium implementation difficulty determines test effort, not keyword priority.

## UP015 — CSV and TSV delimiter converter

- URL: `/tools/data/delimiter-converter/`; family: data; owner: UtilityPilot; priority: P0.
- User problem / why needed: Match the delimiter expected by another application. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: Parsed CSV/TSV; input and output delimiter; quoting and line endings.
- Outputs: Re-serialized delimited file and preview.
- How it works: Parse then serialize; never globally replace delimiter characters.
- Required original content and acceptance cases: Embedded tabs and commas; quotes; multiline cells; BOM. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: convert csv to tsv; convert tsv to csv; change csv delimiter to semicolon; replace csv delimiter without changing quoted text; convert pipe delimited file to csv.
- Complexity: Medium; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: High input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/data/csv-viewer/`, `/tools/data/csv-to-json/`.
- Supporting guide: /guides/csv-import-troubleshooting/.
- Evaluation: user value High; search Medium; long-tail Medium; competition High; implementation Medium; external-data burden Low; maintenance Low; privacy risk High; content High; linking High; expansion High; AdSense quality Medium.
- Rationale: Embedded tabs and commas is a concrete reason to make result behavior explicit. Shared data inputs enable useful follow-on operations; medium implementation difficulty determines test effort, not keyword priority.

## UP016 — Merge CSV files

- URL: `/tools/data/csv-merge/`; family: data; owner: UtilityPilot; priority: P1.
- User problem / why needed: Append repeated exports into one dataset. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: Multiple CSV files; ordered inputs; matching headers.
- Outputs: One CSV; per-file row counts and mismatch errors.
- How it works: MVP requires identical headers in identical order; append records once.
- Required original content and acceptance cases: No relational joins; mismatched schema blocks export; header-only file; file order. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: merge csv files same headers; combine csv files into one online; merge csv without duplicate headers; append csv files in browser; merge csv files preserve row order.
- Complexity: High; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: High input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/data/csv-deduplicate/`, `/tools/data/csv-split/`.
- Supporting guide: /guides/csv-import-troubleshooting/.
- Evaluation: user value High; search Medium; long-tail Medium; competition High; implementation High; external-data burden Low; maintenance Low; privacy risk High; content High; linking High; expansion High; AdSense quality Medium.
- Rationale: No relational joins is a concrete reason to make result behavior explicit. Shared data inputs enable useful follow-on operations; high implementation difficulty determines test effort, not keyword priority.

## UP017 — Split CSV file

- URL: `/tools/data/csv-split/`; family: data; owner: UtilityPilot; priority: P1.
- User problem / why needed: Produce smaller import batches. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: CSV; positive rows per part; repeat-header option.
- Outputs: Numbered CSV downloads and manifest counts.
- How it works: Split parsed records instead of physical lines; generate parts on demand.
- Required original content and acceptance cases: Quoted newlines; final partial batch; huge part counts capped; no byte-size guarantee. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: split csv file by rows online; split csv keep header; split csv into 1000 row files; split csv containing multiline fields; split csv without uploading.
- Complexity: High; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: High input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/data/csv-merge/`, `/tools/data/csv-viewer/`.
- Supporting guide: /guides/csv-import-troubleshooting/.
- Evaluation: user value High; search Medium; long-tail Medium; competition High; implementation High; external-data burden Low; maintenance Low; privacy risk High; content High; linking High; expansion High; AdSense quality Medium.
- Rationale: Quoted newlines is a concrete reason to make result behavior explicit. Shared data inputs enable useful follow-on operations; high implementation difficulty determines test effort, not keyword priority.

## UP018 — Image resizer

- URL: `/tools/image/image-resizer/`; family: image; owner: UtilityPilot; priority: P0.
- User problem / why needed: Meet a pixel-dimension requirement. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: JPEG/PNG/WebP; width/height; fit or stretch; format.
- Outputs: Resized image with before/after dimensions and bytes.
- How it works: Decode orientation; raster resampling; aspect lock default.
- Required original content and acceptance cases: No upscaling by default; transparency; metadata behavior; no promise of lossless resizing. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: resize image exact dimensions online; resize image keep aspect ratio; resize image by percentage; resize image without stretching; resize png with transparency.
- Complexity: High; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: Medium input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/image/image-cropper/`, `/tools/image/image-compressor/`.
- Supporting guide: /guides/image-pixels-bytes-formats/.
- Evaluation: user value High; search Medium; long-tail Medium; competition High; implementation High; external-data burden Low; maintenance Low; privacy risk Medium; content High; linking High; expansion High; AdSense quality Medium.
- Rationale: No upscaling by default is a concrete reason to make result behavior explicit. Shared image inputs enable useful follow-on operations; high implementation difficulty determines test effort, not keyword priority.

## UP019 — Image compressor

- URL: `/tools/image/image-compressor/`; family: image; owner: UtilityPilot; priority: P0.
- User problem / why needed: Reduce bytes for an upload. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: JPEG/PNG/WebP; target bytes; quality; optional resize permission.
- Outputs: Best candidate, actual byte size and target met/unmet.
- How it works: Bounded quality search for lossy encoders; PNG re-encode with honest limits.
- Required original content and acceptance cases: Never promise target met; PNG may grow; target impossible; no universal no-quality-loss claim. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: compress image to target size; compress jpeg under 200kb; reduce webp file size online; compress image without resizing; why compressed png is larger.
- Complexity: High; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: Medium input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/image/image-resizer/`, `/tools/image/image-converter/`.
- Supporting guide: /guides/compress-image-to-upload-limit/.
- Evaluation: user value High; search Medium; long-tail High; competition High; implementation High; external-data burden Low; maintenance Low; privacy risk Medium; content High; linking High; expansion High; AdSense quality Medium.
- Rationale: Never promise target met is a concrete reason to make result behavior explicit. Shared image inputs enable useful follow-on operations; high implementation difficulty determines test effort, not keyword priority.

## UP020 — Image format converter

- URL: `/tools/image/image-converter/`; family: image; owner: UtilityPilot; priority: P0.
- User problem / why needed: Use a supported format in another app. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: JPEG/PNG/WebP; output format; JPEG matte color.
- Outputs: Converted file and transparency/size explanation.
- How it works: Decode and re-encode through supported browser codec; verify output MIME.
- Required original content and acceptance cases: WebP encoder availability; alpha to JPEG needs matte; no HEIC SVG animated images MVP. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: webp to png online; png to jpg white background; jpg to webp converter; webp to jpg converter; convert png to webp transparent.
- Complexity: High; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: Medium input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/image/image-inspector/`, `/tools/image/image-compressor/`.
- Supporting guide: /guides/image-pixels-bytes-formats/.
- Evaluation: user value High; search Medium; long-tail Medium; competition High; implementation High; external-data burden Low; maintenance Medium; privacy risk Medium; content High; linking High; expansion High; AdSense quality Medium.
- Rationale: WebP encoder availability is a concrete reason to make result behavior explicit. Shared image inputs enable useful follow-on operations; high implementation difficulty determines test effort, not keyword priority.

## UP021 — Image cropper

- URL: `/tools/image/image-cropper/`; family: image; owner: UtilityPilot; priority: P1.
- User problem / why needed: Remove unwanted borders or frame an image. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: Image; x/y/width/height; free or fixed ratio.
- Outputs: Cropped file and dimension preview.
- How it works: Integer pixel crop after orientation; numeric controls supplement pointer handles.
- Required original content and acceptance cases: Bounds; tiny crops; touch; original retained; no face detection promise. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: crop image to aspect ratio; crop image exact pixels; crop square image online; remove image borders by cropping; crop image without resizing.
- Complexity: High; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: Medium input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/image/image-resizer/`, `/tools/image/image-inspector/`.
- Supporting guide: /guides/crop-versus-resize/.
- Evaluation: user value High; search Medium; long-tail Medium; competition High; implementation High; external-data burden Low; maintenance Low; privacy risk Medium; content High; linking High; expansion High; AdSense quality Medium.
- Rationale: Bounds is a concrete reason to make result behavior explicit. Shared image inputs enable useful follow-on operations; high implementation difficulty determines test effort, not keyword priority.

## UP022 — Image size and dimension checker

- URL: `/tools/image/image-inspector/`; family: image; owner: UtilityPilot; priority: P0.
- User problem / why needed: Understand why an image fails requirements. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: JPEG/PNG/WebP file.
- Outputs: Pixel width/height, actual bytes, MIME observation, ratio and alpha report.
- How it works: Read file properties and decode dimensions; inspect pixels where needed.
- Required original content and acceptance cases: Extension vs detected type; no comprehensive EXIF/GPS claim; pixel count differs from bytes. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: image dimension checker online; check image size in pixels; find aspect ratio of image; check png transparency; check image file size in kb.
- Complexity: Medium; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: Medium input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/image/image-resizer/`, `/tools/image/image-converter/`.
- Supporting guide: /guides/image-pixels-bytes-formats/.
- Evaluation: user value High; search Medium; long-tail Medium; competition High; implementation Medium; external-data burden Low; maintenance Low; privacy risk Medium; content High; linking High; expansion High; AdSense quality Medium.
- Rationale: Extension vs detected type is a concrete reason to make result behavior explicit. Shared image inputs enable useful follow-on operations; medium implementation difficulty determines test effort, not keyword priority.

## UP023 — Image color picker

- URL: `/tools/image/image-color-picker/`; family: image; owner: UtilityPilot; priority: P1.
- User problem / why needed: Sample usable colors from artwork. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: Raster image; pointer or keyboard coordinate; sample area.
- Outputs: HEX/RGB values and selected swatch.
- How it works: Sample decoded sRGB pixel or explicit average; show coordinates.
- Required original content and acceptance cases: ICC conversion/browser differences; transparent pixels; no brand-color certainty. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: pick color from image online; get hex color from image; sample rgb from photo; image color picker exact pixel; average color of selected image area.
- Complexity: Medium; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: Medium input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/web/color-converter/`, `/tools/web/contrast-checker/`.
- Supporting guide: /guides/color-contrast-method/.
- Evaluation: user value High; search Medium; long-tail Medium; competition High; implementation Medium; external-data burden Low; maintenance Low; privacy risk Medium; content High; linking High; expansion High; AdSense quality Medium.
- Rationale: ICC conversion/browser differences is a concrete reason to make result behavior explicit. Shared image inputs enable useful follow-on operations; medium implementation difficulty determines test effort, not keyword priority.

## UP024 — URL slug generator

- URL: `/tools/web/slug-generator/`; family: web; owner: UtilityPilot; priority: P0.
- User problem / why needed: Prepare readable page or file identifiers. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: Text; separator; ASCII transliteration or Unicode mode.
- Outputs: Editable slug with transformation explanation.
- How it works: Normalize with explicit locale and mapping policy; no uniqueness promise.
- Required original content and acceptance cases: Non-Latin text; emoji; empty result; avoid pretending slug changes improve ranking. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: slug generator online; convert title to url slug; unicode slug generator; remove accents from url slug; generate lowercase hyphenated slug.
- Complexity: Medium; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: Medium input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/web/url-parser/`, `/tools/text/text-cleaner/`.
- Supporting guide: /guides/url-encoding-and-tracking/ (where relevant); otherwise page-level examples only.
- Evaluation: user value High; search Medium; long-tail Medium; competition High; implementation Medium; external-data burden Low; maintenance Low; privacy risk Medium; content High; linking High; expansion Medium; AdSense quality Medium.
- Rationale: Non-Latin text is a concrete reason to make result behavior explicit. Shared web inputs enable useful follow-on operations; medium implementation difficulty determines test effort, not keyword priority.

## UP025 — URL and query-string parser

- URL: `/tools/web/url-parser/`; family: web; owner: UtilityPilot; priority: P0.
- User problem / why needed: Inspect components and repeated parameters. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: Absolute URL or query string in separate modes.
- Outputs: Components and ordered key-value pairs; JSON/text copy.
- How it works: Use standards-based parser; retain duplicate keys and raw input.
- Required original content and acceptance cases: Plus-space form semantics; malformed percent escapes; credentials redacted by default. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: url parser online; query string parser; extract domain from url; parse repeated url parameters; decode query string plus signs.
- Complexity: Medium; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: High input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/web/url-encoder-decoder/`, `/tools/web/utm-builder/`.
- Supporting guide: /guides/url-encoding-and-tracking/.
- Evaluation: user value High; search Medium; long-tail High; competition High; implementation Medium; external-data burden Low; maintenance Low; privacy risk High; content High; linking High; expansion Medium; AdSense quality Medium.
- Rationale: Plus-space form semantics is a concrete reason to make result behavior explicit. Shared web inputs enable useful follow-on operations; medium implementation difficulty determines test effort, not keyword priority.

## UP026 — URL encoder and decoder

- URL: `/tools/web/url-encoder-decoder/`; family: web; owner: UtilityPilot; priority: P1.
- User problem / why needed: Encode a component or read escaped data. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: Text; component vs form mode; encode/decode.
- Outputs: Escaped or decoded text with errors.
- How it works: UTF-8 percent encoding; explicit mode; one decoding pass.
- Required original content and acceptance cases: Literal plus; percent25 double encoding; invalid bytes; not link validation. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: url encode online; url decode online; encode query parameter value; decode percent encoded utf8; url decode plus versus space.
- Complexity: Medium; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: Medium input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/web/url-parser/`, `/tools/web/base64/`.
- Supporting guide: /guides/url-encoding-and-tracking/.
- Evaluation: user value High; search Medium; long-tail Medium; competition High; implementation Medium; external-data burden Low; maintenance Low; privacy risk Medium; content High; linking High; expansion Medium; AdSense quality Medium.
- Rationale: Literal plus is a concrete reason to make result behavior explicit. Shared web inputs enable useful follow-on operations; medium implementation difficulty determines test effort, not keyword priority.

## UP027 — UTM campaign URL builder

- URL: `/tools/web/utm-builder/`; family: web; owner: UtilityPilot; priority: P1.
- User problem / why needed: Create consistently tagged campaign links. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: HTTP(S) URL; source/medium/campaign and optional term/content.
- Outputs: Built link, parameter table and warnings.
- How it works: Set UTM fields through URL API; preserve unrelated params; preview changes.
- Required original content and acceptance cases: Existing UTM replacement; fragment; case conventions; no analytics guarantee. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: utm builder online; campaign url builder; add utm parameters to existing url; utm link generator with fragment; build campaign link with spaces.
- Complexity: Medium; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: High input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/web/url-parser/`, `/tools/web/url-cleaner/`.
- Supporting guide: /guides/url-encoding-and-tracking/.
- Evaluation: user value High; search Medium; long-tail Medium; competition High; implementation Medium; external-data burden Low; maintenance Low; privacy risk High; content High; linking High; expansion Medium; AdSense quality Medium.
- Rationale: Existing UTM replacement is a concrete reason to make result behavior explicit. Shared web inputs enable useful follow-on operations; medium implementation difficulty determines test effort, not keyword priority.

## UP028 — URL tracking parameter cleaner

- URL: `/tools/web/url-cleaner/`; family: web; owner: UtilityPilot; priority: P1.
- User problem / why needed: Remove selected tracking fields before sharing. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: HTTP(S) URL; explicit allowlisted removal choices.
- Outputs: Proposed cleaned link and removed-parameter list.
- How it works: Conservative versioned parameter list; preview Apply; no remote fetch.
- Required original content and acceptance cases: Signed URLs may break; unknown parameters retained; no malware/privacy certification. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: remove tracking parameters from url; remove utm parameters from link; remove fbclid from url; clean url keep important parameters; remove gclid from link.
- Complexity: Medium; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: High input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/web/url-parser/`, `/tools/web/utm-builder/`.
- Supporting guide: /guides/url-encoding-and-tracking/.
- Evaluation: user value High; search Medium; long-tail Medium; competition High; implementation Medium; external-data burden Low; maintenance Medium; privacy risk High; content High; linking High; expansion Medium; AdSense quality Medium.
- Rationale: Signed URLs may break is a concrete reason to make result behavior explicit. Shared web inputs enable useful follow-on operations; medium implementation difficulty determines test effort, not keyword priority.

## UP029 — HEX RGB HSL converter

- URL: `/tools/web/color-converter/`; family: web; owner: UtilityPilot; priority: P1.
- User problem / why needed: Translate a design color into another notation. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: HEX/RGB/HSL including supported alpha.
- Outputs: Equivalent values and swatch.
- How it works: sRGB conversion with stated rounding; reject unsupported spaces.
- Required original content and acceptance cases: Short hex; alpha; hue wrap; out-of-range input; no CMYK accuracy claim. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: hex to rgb converter; rgb to hex converter; hex to hsl converter; hsl to rgb online; convert hex color with alpha.
- Complexity: Medium; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: Medium input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/web/contrast-checker/`, `/tools/image/image-color-picker/`.
- Supporting guide: /guides/color-contrast-method/.
- Evaluation: user value High; search Medium; long-tail Medium; competition High; implementation Medium; external-data burden Low; maintenance Low; privacy risk Medium; content High; linking High; expansion Medium; AdSense quality Medium.
- Rationale: Short hex is a concrete reason to make result behavior explicit. Shared web inputs enable useful follow-on operations; medium implementation difficulty determines test effort, not keyword priority.

## UP030 — Color contrast checker

- URL: `/tools/web/contrast-checker/`; family: web; owner: UtilityPilot; priority: P0.
- User problem / why needed: Check a foreground/background text pair. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: Two opaque sRGB colors; text size and weight.
- Outputs: Ratio plus WCAG text thresholds and explanation.
- How it works: Relative luminance then (Llighter+0.05)/(Ldarker+0.05).
- Required original content and acceptance cases: Transparent backgrounds unsupported initially; ratio alone is not accessibility certification. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: color contrast checker; check text background contrast; wcag aa contrast ratio; contrast checker large text; hex color accessibility contrast.
- Complexity: Medium; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: Medium input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/web/color-converter/`, `/tools/image/image-color-picker/`.
- Supporting guide: /guides/color-contrast-method/.
- Evaluation: user value High; search Medium; long-tail Medium; competition High; implementation Medium; external-data burden Low; maintenance Low; privacy risk Medium; content High; linking High; expansion Medium; AdSense quality Medium.
- Rationale: Transparent backgrounds unsupported initially is a concrete reason to make result behavior explicit. Shared web inputs enable useful follow-on operations; medium implementation difficulty determines test effort, not keyword priority.

## UP031 — Base64 encoder and decoder

- URL: `/tools/web/base64/`; family: web; owner: UtilityPilot; priority: P1.
- User problem / why needed: Convert text to or from Base64 representation. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: UTF-8 text or Base64; standard/URL-safe selection.
- Outputs: Encoded text or decoded text/bytes download.
- How it works: Encode bytes with standard or URL-safe alphabet; strict padding validation.
- Required original content and acceptance cases: Invalid UTF-8 not silently replaced; Base64 is not encryption; secret text risk. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: base64 encode utf8; base64 decode online; base64url decoder; decode base64 with emoji; base64 invalid utf8 bytes.
- Complexity: Medium; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: High input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/web/url-encoder-decoder/`, `/tools/web/html-entities/`.
- Supporting guide: /guides/url-encoding-and-tracking/ (where relevant); otherwise page-level examples only.
- Evaluation: user value High; search Medium; long-tail Medium; competition High; implementation Medium; external-data burden Low; maintenance Low; privacy risk High; content High; linking High; expansion Medium; AdSense quality Medium.
- Rationale: Invalid UTF-8 not silently replaced is a concrete reason to make result behavior explicit. Shared web inputs enable useful follow-on operations; medium implementation difficulty determines test effort, not keyword priority.

## UP032 — HTML entity encoder and decoder

- URL: `/tools/web/html-entities/`; family: web; owner: UtilityPilot; priority: P1.
- User problem / why needed: Escape markup as text or read encoded characters. This avoids a manual edit or switching into a larger application for a small task.
- Inputs: Text; encode/decode; named/numeric options.
- Outputs: Escaped or decoded plain text.
- How it works: Audited entity table/parser; no live markup insertion.
- Required original content and acceptance cases: Double encoding; malformed entities; no claim to sanitize executable HTML. Explain these with at least one normal and one failure/edge-case example; expected results must be independently checked.
- Search intent: perform the named operation on user-supplied material. Long tails: html entity decoder; html entity encoder; decode numeric html entities; escape html special characters; decode ampersand lt gt text.
- Complexity: Medium; data/API: none; execution: local browser, worker when processing is expensive; retention: memory until clear/navigation.
- Privacy: Medium input sensitivity. No input or filenames in logs, analytics, URLs or error reports; explicit user action for clipboard/download; no ad scripts on this route.
- Related tools: `/tools/web/base64/`, `/tools/text/text-cleaner/`.
- Supporting guide: /guides/url-encoding-and-tracking/ (where relevant); otherwise page-level examples only.
- Evaluation: user value High; search Medium; long-tail Medium; competition High; implementation Medium; external-data burden Low; maintenance Low; privacy risk Medium; content High; linking High; expansion Medium; AdSense quality Medium.
- Rationale: Double encoding is a concrete reason to make result behavior explicit. Shared web inputs enable useful follow-on operations; medium implementation difficulty determines test effort, not keyword priority.

## Deferred and rejected candidates

These are not additional launch pages. A future label below is an architecture reservation, never a public placeholder.

| Candidate | Decision | Proposed owner |
|---|---|---|
| JWT decoder | Deferred: token sensitivity; decoding is not signature verification | UtilityPilot, only after scope review |
| Regex tester | Deferred: worker cancellation and engine semantics need specialist testing | UtilityPilot, only after scope review |
| Code formatters | Deferred: separate languages only after maintained parsers and audience evidence | UtilityPilot, only after scope review |
| UUID generator | Deferred: genuine function but weak connection to launch workflows | UtilityPilot, only after scope review |
| File checksum | Deferred: useful integrity workflow; bounded memory and no malware claims | UtilityPilot, only after scope review |
| File renamer helper | Deferred: generate renamed copies and mapping; do not promise disk rename | UtilityPilot, only after scope review |
| File metadata viewer | Deferred: per-format support required; basic File properties are insufficient | UtilityPilot, only after scope review |
| PDF organizer | Deferred: local feasibility but signed encrypted and malformed files need larger QA | UtilityPilot, only after scope review |
| Document conversion | Rejected MVP: fidelity OCR and font handling exceed reliable browser scope | UtilityPilot, only after scope review |
| Metadata preview | Deferred: illustrative preview only; no ranking or exact SERP claims | UtilityPilot, only after scope review |
| Webmaster helpers | Deferred: static authoring possible; remote checks need infrastructure | UtilityPilot, only after scope review |
| Advanced data validation | Deferred: distinct contracts and schemas require bounded maintained engines | UtilityPilot, only after scope review |
| Digital unit conversion | Deferred: fits digital work but launch shows file bytes inline | UtilityPilot, only after scope review |
| Percentage tools | OUT OF SCOPE: CalculateHub owns standalone numeric calculation | CalculateHub |
| Business calculators | OUT OF SCOPE: CalculateHub owns standalone business arithmetic | CalculateHub |
| Number tools | OUT OF SCOPE: CalculateHub owns mathematical quantities | CalculateHub |
| Calendar tools | OUT OF SCOPE: DatePilot owns calendar and clock tasks | DatePilot |
| Timestamp tools | OUT OF SCOPE: DatePilot owns timestamps too; link only when useful | DatePilot |
| Physical conversions | OUT OF SCOPE: CalculateHub; no digital artifact being prepared | CalculateHub |
| Scientific conversions | OUT OF SCOPE: CalculateHub; reference tables belong DataAtlas | CalculateHub |

Generic random strings, reversed-character novelty text, fake identity/document generators, password-strength promises, email deliverability checks, link safety verdicts, AI detectors, plagiarism guarantees, arbitrary downloaders, financial/medical calculators and AI content generators are excluded. A syntax check is not verification of a real account, secure system or factual claim. DataAtlas owns reference datasets; CompareForge owns product comparisons and decision advice. Mechanical text/list comparison remains UtilityPilot.
