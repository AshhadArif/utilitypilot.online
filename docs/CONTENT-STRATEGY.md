# Launch content strategy

Target: 51 useful indexable content pages, plus trust/support. This is an editorial scope decision, not an AdSense page-count threshold.

## Inventory

| Type | Count | Reason to exist |
|---|---:|---|
| Home | 1 | Explain the product and start discovery |
| Tool directory | 1 | Search and browse all supported tasks |
| Category hubs | 4 | Explain a coherent family and its workflows |
| Tools | 32 | Complete distinct tasks with original supporting explanations |
| Guides index | 1 | Browse practical learning by task/family |
| Guides | 12 | Explain cross-tool methods and difficult cases |
| Total excluding trust/support | 51 | Every route must pass quality review |

Seven trust/contact routes are specified in WEBSITE-SPEC/URL-ARCHITECTURE. They must be factual rather than padded SEO pages. Do not publish an empty guide index.

## Tool content briefs

TOOL-CATALOG is authoritative for every tool's inputs, outputs, method, edge cases, query mapping and related tools. Each page must include a worked input/output example checked against the implementation, one realistic failure case, limits that match actual support, result interpretation, and specific common mistakes. There is no mandatory word count.

For example, CSV dedupe explains that two records with the same customer ID can differ in other fields and that keeping the last changes which record survives. Image compression shows bytes actually produced and explains an unmet target. JSON formatting demonstrates number preservation and duplicate-key diagnostics. These are the kind of useful details that earn a page.

## Twelve guide briefs

### G01 — Clean copied text without losing paragraphs

- URL: /guides/clean-copied-text/; family: text.
- Distinct reader question / original material: Show a PDF-copy example with hard wraps, NBSP and intentional paragraph breaks; explain reversible cleanup and multilingual caveats.
- Integrated tools: /tools/text/text-cleaner/, /tools/text/word-counter/.
- Required structure: concrete problem, reproducible synthetic input, exact steps, verified result, failure case, limits and appropriate primary references.
- Editorial acceptance: guide explains a decision or problem across operations; it does not repeat a tool page's instructions. Link to the working tool at the relevant step.

### G02 — Choose list comparison or text difference

- URL: /guides/compare-lists-and-text/; family: text.
- Distinct reader question / original material: Same members in a different order: list equality versus changed document; demonstrate duplicates and case rules. This is an operation guide, not a product comparison.
- Integrated tools: /tools/text/compare-lists/, /tools/text/text-diff/.
- Required structure: concrete problem, reproducible synthetic input, exact steps, verified result, failure case, limits and appropriate primary references.
- Editorial acceptance: guide explains a decision or problem across operations; it does not repeat a tool page's instructions. Link to the working tool at the relevant step.

### G03 — Why word and character counts differ

- URL: /guides/unicode-counting/; family: text.
- Distinct reader question / original material: Count a combining accent and family emoji as graphemes versus code points; explain segmentation and reading-time assumptions.
- Integrated tools: /tools/text/word-counter/, /tools/text/case-converter/.
- Required structure: concrete problem, reproducible synthetic input, exact steps, verified result, failure case, limits and appropriate primary references.
- Editorial acceptance: guide explains a decision or problem across operations; it does not repeat a tool page's instructions. Link to the working tool at the relevant step.

### G04 — Fix CSV import problems without damaging values

- URL: /guides/csv-import-troubleshooting/; family: data.
- Distinct reader question / original material: Original fixture with quoted comma, newline, UTF-8 BOM, leading-zero ID and inconsistent field count; show before/after diagnostics.
- Integrated tools: /tools/data/csv-viewer/, /tools/data/delimiter-converter/, /tools/data/csv-to-json/.
- Required structure: concrete problem, reproducible synthetic input, exact steps, verified result, failure case, limits and appropriate primary references.
- Editorial acceptance: guide explains a decision or problem across operations; it does not repeat a tool page's instructions. Link to the working tool at the relevant step.

### G05 — Deduplicate CSV records by the right columns

- URL: /guides/deduplicate-csv-by-key/; family: data.
- Distinct reader question / original material: Duplicate customer IDs with changed addresses; compare whole-row and key matching; make first/last retention explicit.
- Integrated tools: /tools/data/csv-deduplicate/, /tools/data/csv-column-editor/.
- Required structure: concrete problem, reproducible synthetic input, exact steps, verified result, failure case, limits and appropriate primary references.
- Editorial acceptance: guide explains a decision or problem across operations; it does not repeat a tool page's instructions. Link to the working tool at the relevant step.

### G06 — Convert nested JSON to CSV without hidden data loss

- URL: /guides/nested-json-to-csv/; family: data.
- Distinct reader question / original material: Objects, arrays, missing keys, null, dot-key collisions and large integer IDs; document exactly what does not round-trip.
- Integrated tools: /tools/data/json-to-csv/, /tools/data/json-formatter/.
- Required structure: concrete problem, reproducible synthetic input, exact steps, verified result, failure case, limits and appropriate primary references.
- Editorial acceptance: guide explains a decision or problem across operations; it does not repeat a tool page's instructions. Link to the working tool at the relevant step.

### G07 — JSON syntax, formatting and common errors

- URL: /guides/json-syntax-and-formatting/; family: data.
- Distinct reader question / original material: Comments, trailing commas, duplicate keys and unsafe integers; distinguish grammar validity, formatting and schema validity.
- Integrated tools: /tools/data/json-formatter/, /tools/data/csv-to-json/.
- Required structure: concrete problem, reproducible synthetic input, exact steps, verified result, failure case, limits and appropriate primary references.
- Editorial acceptance: guide explains a decision or problem across operations; it does not repeat a tool page's instructions. Link to the working tool at the relevant step.

### G08 — Image pixels, file size and formats explained

- URL: /guides/image-pixels-bytes-formats/; family: image.
- Distinct reader question / original material: Use original photo and logo fixtures to compare dimensions and actual output bytes; transparency and JPEG matte choices.
- Integrated tools: /tools/image/image-inspector/, /tools/image/image-resizer/, /tools/image/image-converter/.
- Required structure: concrete problem, reproducible synthetic input, exact steps, verified result, failure case, limits and appropriate primary references.
- Editorial acceptance: guide explains a decision or problem across operations; it does not repeat a tool page's instructions. Link to the working tool at the relevant step.

### G09 — Reduce an image for an upload limit

- URL: /guides/compress-image-to-upload-limit/; family: image.
- Distinct reader question / original material: Show quality search before optional resizing; display a failed target honestly; distinguish decimal KB and KiB.
- Integrated tools: /tools/image/image-compressor/, /tools/image/image-resizer/.
- Required structure: concrete problem, reproducible synthetic input, exact steps, verified result, failure case, limits and appropriate primary references.
- Editorial acceptance: guide explains a decision or problem across operations; it does not repeat a tool page's instructions. Link to the working tool at the relevant step.

### G10 — Crop or resize an image to fit a frame

- URL: /guides/crop-versus-resize/; family: image.
- Distinct reader question / original material: Same source in fit, stretch and crop views; list information lost by each operation and show mobile numeric controls.
- Integrated tools: /tools/image/image-cropper/, /tools/image/image-resizer/.
- Required structure: concrete problem, reproducible synthetic input, exact steps, verified result, failure case, limits and appropriate primary references.
- Editorial acceptance: guide explains a decision or problem across operations; it does not repeat a tool page's instructions. Link to the working tool at the relevant step.

### G11 — URL encoding, repeated parameters and tracking fields

- URL: /guides/url-encoding-and-tracking/; family: web.
- Distinct reader question / original material: Demonstrate plus vs percent20, duplicate keys, fragments and signed links; show why deleting all parameters breaks URLs. Include a small encoding-layer example distinguishing HTML entities in markup, percent encoding in URL components, and Base64URL payloads; decoding any of these does not verify safety or authenticity.
- Integrated tools: /tools/web/url-parser/, /tools/web/url-encoder-decoder/, /tools/web/utm-builder/, /tools/web/url-cleaner/, /tools/web/base64/, /tools/web/html-entities/.
- Required structure: concrete problem, reproducible synthetic input, exact steps, verified result, failure case, limits and appropriate primary references.
- Editorial acceptance: guide explains a decision or problem across operations; it does not repeat a tool page's instructions. Link to the working tool at the relevant step.

### G12 — How text color contrast is calculated

- URL: /guides/color-contrast-method/; family: web.
- Distinct reader question / original material: Worked black/white example plus a borderline pair; define sRGB luminance, large text and rounding; clarify limits of a color-pair check.
- Integrated tools: /tools/web/contrast-checker/, /tools/web/color-converter/, /tools/image/image-color-picker/.
- Required structure: concrete problem, reproducible synthetic input, exact steps, verified result, failure case, limits and appropriate primary references.
- Editorial acceptance: guide explains a decision or problem across operations; it does not repeat a tool page's instructions. Link to the working tool at the relevant step.

## Publication quality

Use only original examples or licensed materials with provenance. Prefer small synthetic fixtures with stable expected outcomes. Explain method versions and update dates when behavior changes. Credit real authors/reviewers only; do not invent credentials or testing claims. FAQs answer questions encountered in research/testing rather than repeating headings.

Guide /json-syntax-and-formatting/ may include “What is JSON?” as a short prerequisite section. Do not create a generic standalone definition page simply for another keyword. JSONL coverage is deferred with its future tool unless a brief comparison clarifies current limitations. Product comparisons belong CompareForge; operation-selection guides belong here.

## Editorial workflow

Draft after processor behavior is established -> verify worked examples independently -> review scope and duplication -> review accessibility/privacy language -> add meaningful tool/guide links -> publish only with working referenced tools. Review high-change URL rules and browser codec limitations on releases; do not change dates for cosmetic SEO freshness.

No daily article quota. Add guides only when a recurring user problem deserves a complete explanation not already supplied by a tool page.
