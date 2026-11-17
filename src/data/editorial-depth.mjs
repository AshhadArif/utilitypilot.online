const VERIFICATION={
 'word-counter':`Word Counter was checked with emoji, combining marks, CRLF and LF line endings, CJK text, very long single words and input at the 1 MiB limit. Word boundaries follow the selected language rather than one English rule.`,
 'text-cleaner':`Text Cleaner was checked with non-breaking spaces, tabs, hard-wrapped paragraphs, zero-width joiners, CRLF input and option combinations where one cleanup step creates work for the next.`,
 'remove-duplicate-lines':`Remove Duplicate Lines was checked with case variants, surrounding spaces, Unicode normalization forms, kept-first versus kept-last order and lists close to the 50,000-record ceiling.`,
 'sort-lines':`Sort Lines was checked with natural ordering (item2 before item10), numeric values, mixed case, locale-specific collation, descending mode and large lists.`,
 'case-converter':`Text Case Converter was checked with Turkish dotless i, German sharp s, apostrophes, acronyms, sentence boundaries and title-case edge cases across the supported languages.`,
 'find-and-replace':`Find and Replace Text was checked with literal metacharacters, replacement text containing dollar signs and backslashes, whole-word boundaries, case-insensitive matching and real line breaks.`,
 'text-diff':`Text Diff was checked with line and word modes, whitespace normalization, repeated lines that allow several valid alignments, insertions at the start and end, and 256 KiB inputs.`,
 'compare-lists':`Compare Lists was checked with duplicates inside each list, case and trim options, Unicode normalization, empty lists and each of the shared, only-A, only-B and union export views.`,
 'json-formatter':`JSON Formatter was checked with integers beyond the safe range, duplicate keys, comments and trailing commas, deeply nested input, and minified, two-space and four-space output.`,
 'json-to-csv':`JSON to CSV was checked with nested objects, arrays kept inside one cell, dot-path collisions, missing and null fields, column reordering and identifiers with leading zeros.`,
 'csv-to-json':`CSV to JSON was checked with quoted delimiters, embedded newlines, duplicate and blank headers, typed versus string values and numeric identifiers that must not be rounded.`,
 'csv-viewer':`CSV Viewer was checked with quoted separators, multiline fields, BOM-prefixed files, inconsistent record widths, delimiter choices and previews that must not truncate an export.`,
 'csv-deduplicate':`CSV Deduplicate was checked with whole-row and key-column modes, tuple keys containing the delimiter, case and whitespace differences, first or last retention and large files.`,
 'csv-column-editor':`CSV Column Editor was checked with keep, rename and reorder operations, duplicate header names, every-column-removed guards, delimiter preservation and multi-row data.`,
 'delimiter-converter':`Delimiter Converter was checked with fields containing the target delimiter, doubled quotes, embedded line breaks, CRLF output, a UTF-8 BOM and quote-every-field mode.`,
 'csv-merge':`CSV Merge was checked with different header orders, mismatched column sets, BOM-prefixed files, delimiter changes and inputs near the record ceiling. A structural mismatch is refused rather than guessed.`,
 'csv-split':`CSV Split was checked with quoted newlines, repeated headers, one-record parts, exact multiples of the part size and files near the 50,000-record limit.`,
 'image-resizer':`Image Resizer was checked with fit, stretch and percentage modes, locked and unlocked aspect ratios, upscaling disabled, one-pixel images and outputs near the 16-megapixel limit.`,
 'image-compressor':`Image Compressor was checked with unreachable byte targets, transparent PNGs, JPEG and WebP quality searches, optional dimension reduction and honest reporting of the smallest tested result.`,
 'image-converter':`Image Converter was checked with transparent PNGs flattened onto a chosen matte, JPEG re-encodes, WebP output, one-pixel images and files close to the 10 MiB or 16-megapixel limits.`,
 'image-cropper':`Image Cropper was checked with EXIF-rotated photos, exact pixel rectangles, fixed 1:1, 4:3 and 16:9 ratios, out-of-bounds selections and one-pixel source images.`,
 'image-inspector':`Image Inspector was checked with progressive JPEGs, transparent PNGs, WebP files, one-pixel images, corrupt headers and dimensions near the 16-megapixel limit.`,
 'image-color-picker':`Image Color Picker was checked with transparent pixels, anti-aliased edges, JPEG chroma noise, square averaging at the image boundary and the decoded sRGB values actually selected.`,
 'slug-generator':`Slug Generator was checked with accented Latin text, non-Latin scripts, emoji, punctuation-only input, hyphen and underscore separators and long titles.`,
 'url-parser':`URL Parser was checked with repeated query keys, plus-as-space form mode, credentials that must be redacted, fragments, default ports and malformed percent escapes.`,
 'url-encoder-decoder':`URL Encoder / Decoder was checked with spaces, plus signs, emoji, reserved characters, repeated encode and decode layers and invalid percent sequences.`,
 'utm-builder':`UTM Builder was checked with existing query parameters, a fragment, missing optional fields, values needing percent-encoding and replacement of existing UTM fields.`,
 'url-cleaner':`URL Tracking Parameter Cleaner was checked with mixed-case and unknown parameters, repeated keys, fragments, signed-looking URLs and each individually removable tracking field.`,
 'color-converter':`Color Converter was checked with shorthand and full HEX, RGB percentages, HSL hue wrapping, alpha values, out-of-range channels and malformed notation.`,
 'contrast-checker':`Color Contrast Checker was checked at the exact 4.5:1 and 3:1 boundaries, large and bold text thresholds, fractional channels, identical colours and transparent inputs that need compositing.`,
 'base64':`Base64 was checked with UTF-8 text, emoji, Base64URL, missing or incorrect padding, invalid canonical bits, binary output and empty input.`,
 'html-entities':`HTML Entity Encoder / Decoder was checked with named references, decimal and hexadecimal references, legacy names, unknown names, one-layer decoding and markup-significant characters.`,
 'json-viewer':`JSON Viewer was checked with integers beyond the safe range, duplicate keys, primitive roots, deep trees, large arrays and the 50-level nesting limit.`,
 'json-compare':`JSON Compare was checked with object key order, equivalent number and string spellings, missing versus null values, large integers and differing primitive roots.`,
 'regex-tester':`Regex Tester was checked with capture groups, named groups, zero-width matches, sticky and Unicode flags, invalid patterns and a worker timeout that stops runaway expressions.`,
 'jwt-decoder':`JWT Decoder was checked with standard NumericDate claims, string claims that must not be coerced, malformed segments, unsigned tokens that stay labelled unverified and large numeric values.`,
 'uuid-generator':`UUID Generator was checked for version-4 and variant bits, secure-context behaviour, batch limits and the absence of Math.random or timestamp-based fallbacks.`,
 'hash-generator':`SHA Hash Generator was checked with empty input, multi-byte UTF-8, trailing spaces, exact newlines and known SHA-256, SHA-384 and SHA-512 digests.`,
 'unix-timestamp':`Unix Timestamp Converter was checked with seconds and milliseconds, fractional seconds, negative epochs, the Date range boundary and impossible calendar dates.`,
 'number-base-converter':`Number Base Converter was checked with integers beyond the safe range, signs before prefixes, leading zeros, invalid digits for the selected base and negative zero.`,
 'json-yaml-converter':`JSON / YAML Converter was checked with mappings, core scalar types, block scalars, exact integers, anchors and aliases, duplicate keys and multi-document input.`,
 'unicode-converter':`Unicode Converter was checked with astral pairs, surrogate boundaries, invalid code points, one-layer escapes, combining marks and large inputs.`,
 'markdown-to-html':`Markdown to HTML was checked with headings, lists, tables, fenced code, raw HTML escaping, unsafe link destinations and large documents.`
};

const PRIVACY={
 'word-counter':`Word Counter counts the text you paste inside the page; the text is not uploaded, saved or used to build a profile.`,
 'text-cleaner':`Text Cleaner rewrites the pasted text in page memory; the original and cleaned versions are not sent to a server.`,
 'remove-duplicate-lines':`Remove Duplicate Lines compares and reorders the list locally; no line or file leaves the browser.`,
 'sort-lines':`Sort Lines reorders the pasted list in the page; the list is not uploaded or stored between visits.`,
 'case-converter':`Text Case Converter changes letter case locally; the input text is never sent to a conversion service.`,
 'find-and-replace':`Find and Replace Text performs literal matching in the page; search terms and replacement text stay on the device.`,
 'text-diff':`Text Diff compares the two versions in page memory; neither version is uploaded or retained after you leave.`,
 'compare-lists':`Compare Lists works on the two pasted lists locally; membership results are not sent anywhere.`,
 'json-formatter':`JSON Formatter parses and reformats the JSON in the page; the document is not uploaded to a validation API.`,
 'json-to-csv':`JSON to CSV converts records locally; keys and values are not sent to a conversion server.`,
 'csv-to-json':`CSV to JSON parses the table in page memory; the file or pasted rows are not uploaded.`,
 'csv-viewer':`CSV Viewer reads the file locally to report structure; the rows are not sent to a server.`,
 'csv-deduplicate':`CSV Deduplicate compares rows in the page; key columns and retained records stay on the device.`,
 'csv-column-editor':`CSV Column Editor rewrites headers and column order locally; the table is not uploaded.`,
 'delimiter-converter':`Delimiter conversion parses and re-serializes the table in the page; the file is not sent to a conversion service.`,
 'csv-merge':`CSV Merge combines the selected files in page memory; neither file is uploaded to a merge service.`,
 'csv-split':`CSV Split divides the table locally and creates parts only when you download them; the source file is not uploaded.`,
 'image-resizer':`Image Resizer decodes the selected image into an in-page canvas; the original and resized copies are not uploaded.`,
 'image-compressor':`Image Compressor re-encodes the selected image on the device; the image never goes to a compression server.`,
 'image-converter':`Image Converter decodes and re-encodes the image in the page; the file is not uploaded to a format service.`,
 'image-cropper':`Image Cropper copies the selected rectangle from an in-page canvas; the source image is not uploaded.`,
 'image-inspector':`Image Inspector reads dimensions and headers locally; the image file is not uploaded for analysis.`,
 'image-color-picker':`Image Color Picker samples the decoded image in the page; the image and sampled colours are not sent anywhere.`,
 'slug-generator':`Slug Generator transforms the pasted title locally; the title is not sent to a slug service.`,
 'url-parser':`URL Parser inspects the pasted URL in the page; the address and its query values are not uploaded.`,
 'url-encoder-decoder':`URL Encoder / Decoder processes the text locally; the input and output are not sent to an encoding service.`,
 'utm-builder':`UTM Builder assembles the campaign link in page memory; the base URL and campaign values are not uploaded.`,
 'url-cleaner':`URL Tracking Parameter Cleaner edits the pasted link locally; the URL is not fetched or sent to a server.`,
 'color-converter':`Color Converter changes notation in the page; the entered colour values are not sent to a colour service.`,
 'contrast-checker':`Colour Contrast Checker computes the ratio locally; the foreground and background values are not uploaded.`,
 'base64':`Base64 encodes or decodes in the page; the text or bytes are not sent to an encoding API.`,
 'html-entities':`HTML Entity Encoder / Decoder transforms the pasted text locally; the markup is not uploaded or rendered as active HTML.`,
 'json-viewer':`JSON Viewer parses the document in the page; the JSON tree is not uploaded or stored.`,
 'json-compare':`JSON Compare evaluates both documents locally; neither JSON value is sent to a comparison service.`,
 'regex-tester':`Regex Tester runs the pattern in an in-page worker; the pattern and sample text are not uploaded.`,
 'jwt-decoder':`JWT Decoder splits and decodes the token in the page; the token is not sent to a verification API and is not stored.`,
 'uuid-generator':`UUID Generator uses the browser Web Crypto API locally; generated identifiers are never sent to a server.`,
 'hash-generator':`SHA Hash Generator computes the digest in the page with Web Crypto; the hashed text is not uploaded.`,
 'unix-timestamp':`Unix Timestamp Converter performs date arithmetic locally; the timestamp and resulting date are not sent anywhere.`,
 'number-base-converter':`Number Base Converter converts the integer in page memory; the value is not uploaded to a calculation service.`,
 'json-yaml-converter':`JSON / YAML Converter parses and serializes locally; the document is not uploaded to a conversion API.`,
 'unicode-converter':`Unicode Converter transforms escapes and code points in the page; the text is not sent to a lookup service.`,
 'markdown-to-html':`Markdown to HTML renders the source in the page with raw HTML escaped; the document is not uploaded or executed.`
};

const DEPTH={
 'csv-merge':{
  sections:[
   {id:'merge-requirements',title:'What merge requires from each file',html:`<p>Merge appends records; it does not match rows by a shared ID. Both inputs must use the same delimiter and be readable under the selected header rule. Column order and header names must agree, because the output has one header row and one column order. A file with an extra, missing or renamed column is a structural mismatch and should be aligned first with <a href="/tools/data/csv-column-editor/">CSV Column Editor</a>.</p><p>Leading byte-order marks, quoted newlines and blank records are handled by the parser, but they can still hide a mismatch from a quick visual check. Inspect both files with <a href="/tools/data/csv-viewer/">CSV Viewer</a> before merging, especially when one export came from Excel and the other from a database.</p>`},
   {id:'merge-checklist',title:'A safe merge checklist',html:`<ol><li>Open each file and confirm the delimiter and header setting.</li><li>Compare header names and their order.</li><li>Merge a small sample first.</li><li>Re-open the result and check the first and last record from each source.</li><li>Deduplicate only if duplicate rows are genuinely unwanted; identical IDs can represent different events.</li></ol><p>Merge is not a database join. If you need to attach columns by a key, join on the key inside a database or spreadsheet, then inspect the result for unmatched and duplicated keys. The record ceiling and 5 MiB input limit apply to each file.</p>`}
  ],
  faqs:[
   [`Does merge match rows by ID?`,`No. Records are appended in file order. Shared IDs do not cause matching or replacement, and duplicate IDs remain unless you deduplicate afterwards.`],
   [`What should I do if the headers differ?`,`Rename, remove or reorder columns first with CSV Column Editor so both files have the same header row and column order, then merge again.`]
  ]
 },
 'image-color-picker':{
  sections:[
   {id:'sampling-modes',title:'Pixel sample or square average',html:`<p>Single-pixel sampling is best for flat interface colours, icons and solid backgrounds. Square averaging is better for photographs, gradients and anti-aliased text, where one pixel may sit on a transition edge. The square extends right and down from the chosen coordinate, so an edge sample can include pixels outside the visible subject.</p><p>Alpha is included in the average. A transparent screenshot region can therefore produce a colour that looks different from the composited page. If the image will be placed on a known background, composite it first or sample an opaque area.</p>`},
   {id:'brand-colour',title:'Why a sampled colour may not match the brand',html:`<p>A raster image has already passed through encoding, resizing, colour management and possibly a screenshot pipeline. JPEG compression shifts edge pixels; anti-aliasing blends text into the background; a display profile may map the same values differently. Sampling cannot recover an official brand value from a lossy copy.</p><p>Use the design system HEX or CMYK value when it is available. Sample when you only have a screenshot or a photograph, and record the coordinates and sample size so the result can be reproduced. For contrast work, feed the sampled value into <a href="/tools/web/contrast-checker/">Color Contrast Checker</a> only after deciding the actual text and background colours.</p>`}
  ],
  faqs:[
   [`Does square sampling find the dominant colour?`,`No. It calculates an arithmetic average of the selected pixels, including alpha. Dominant-colour or palette extraction is a different operation.`],
   [`Why is the sampled HEX different from my design app?`,`Compression, anti-aliasing, colour profiles and different coordinates can all shift the value. Compare the exact pixel rather than a nearby edge.`]
  ]
 },
 'image-resizer':{
  sections:[
   {id:'resize-modes',title:'Fit, stretch and percentage modes',html:`<p>Fit preserves the source aspect ratio and places the image inside the target box; one dimension may be smaller than requested. Stretch uses both numbers exactly and can distort the image. Percentage scales from the current dimensions and is useful when you do not know the final pixel size. Locking the aspect ratio ties the second field to the first; unlocking it allows independent values.</p><p>Upscaling is opt-in. If it stays disabled, a request larger than the source is rejected or reported instead of silently inventing pixels. Output dimensions are whole pixels, so a percentage or ratio can round by one pixel.</p>`},
   {id:'dimension-not-bytes',title:'Dimension limits are not byte limits',html:`<p>An upload form may enforce width, height, file size or all three. Resizing changes pixel dimensions; it does not guarantee a smaller file. A large photograph resized to the same dimensions can still exceed a byte cap, and a PNG may grow after resizing. Use <a href="/tools/image/image-inspector/">Image Inspector</a> to identify the binding limit, resize for dimensions, then use <a href="/tools/image/image-compressor/">Image Compressor</a> for a byte target.</p><p>Keep the original. Re-encoding an already compressed JPEG adds another lossy generation, so repeated resizing is not a substitute for one careful export.</p>`}
  ],
  faqs:[
   [`Does resizing reduce the file size?`,`Not reliably. It changes dimensions, and the encoder decides the bytes. Use the compressor for a specific KB target.`],
   [`Why did fit mode produce a smaller image than I asked for?`,`Fit preserves the aspect ratio inside the requested box, so the limiting dimension is reached first.`]
  ]
 },
 'csv-viewer':{
  sections:[
   {id:'preview-scope',title:'What the preview shows',html:`<p>The table preview shows the first 50 data records so the page stays responsive; the record count and the download include every accepted row. All rows must have the same number of fields. A quoted delimiter or newline is part of the field, not a new record. Malformed quoting or inconsistent widths stop the parse and report an error instead of guessing a repair.</p><p>The viewer reports structure, not meaning. It does not decide whether a postal code, date or email address is valid, and it does not convert numeric strings into spreadsheet numbers. That is deliberate: identifiers with leading zeros stay intact.</p>`},
   {id:'one-column',title:'When a CSV appears as one column',html:`<p>Check the delimiter first. A semicolon export opened with comma mode gives one wide column. Next check quoting: an unescaped quote can swallow the rest of the file. A UTF-8 BOM is an encoding marker and may appear as part of the first header in some tools. CRLF line endings are supported, but mixing line-ending styles can produce blank-looking records.</p><p>If the structure is wrong, fix the source or choose the matching delimiter and header setting. The viewer does not edit cells; use <a href="/tools/data/csv-column-editor/">CSV Column Editor</a> for schema changes or a spreadsheet for value edits.</p>`}
  ],
  faqs:[
   [`Does the 50-record preview limit my download?`,`No. Only the on-screen preview is limited; exports contain all accepted records within the stated limits.`],
   [`Can I fix a bad cell in the viewer?`,`No. The viewer reports structure and values but does not edit them. Use a column editor or spreadsheet.`]
  ]
 },
 'image-cropper':{
  sections:[
   {id:'crop-coordinates',title:'How crop coordinates are applied',html:`<p>Crop coordinates refer to the decoded image after EXIF orientation is applied, so a phone photo displays and crops in its intended direction. The selection copies the rectangle without resampling; output dimensions equal the chosen width and height. Drag on the preview for a rough selection, then enter exact left, top, width and height.</p><p>Fixed-ratio mode derives one dimension from the other and rounds to whole pixels. The rectangle must remain inside the source; an out-of-bounds crop is rejected rather than padded. For a one-pixel image, only a one-pixel crop is valid.</p>`},
   {id:'crop-or-resize',title:'Crop first or resize first?',html:`<p>Crop removes unwanted content; resize changes the number of pixels. If both are needed, crop first to establish the composition, then resize to the destination dimensions. Resizing before cropping can discard detail and make the later selection less precise. Neither operation restores detail that was never captured.</p><p>Use the aspect-ratio presets when a destination requires 1:1, 4:3 or 16:9, then adjust the crop inside that frame. Inspect the exported dimensions and byte size before uploading; a correct crop can still exceed a file-size limit.</p>`}
  ],
  faqs:[
   [`Can I crop outside the image?`,`No. The crop must stay inside the decoded image; move the top-left corner or reduce the width and height.`],
   [`Does cropping change the aspect ratio automatically?`,`Only if you choose a ratio preset. A free crop produces the aspect ratio of the rectangle you select.`]
  ]
 },
 'image-converter':{
  sections:[
   {id:'format-choice',title:'Choosing PNG, JPEG or WebP',html:`<p>PNG suits screenshots, line art, text and transparency. JPEG suits photographs where a small lossy change is acceptable and transparency is not needed. WebP can carry transparency and often produces smaller files, but some older applications and email clients still reject it. Choose the format the destination accepts, not only the smallest file.</p><p>JPEG has no alpha channel. A transparent PNG converted to JPEG is flattened onto the chosen matte colour; the default is white. If the image will sit on a coloured background, set the matte to match it before conversion or the edges will show a halo.</p>`},
   {id:'conversion-effects',title:'Why conversion changes size and colour',html:`<p>Each format uses a different encoder. A PNG may become much smaller as JPEG, while a flat PNG converted to WebP may grow. Lossy encoders discard detail; repeated conversions accumulate damage. Colour values can also shift when transparency is composited or when the encoder handles colour profiles differently.</p><p>Convert from the original file each time, not from a previous conversion. Inspect the result with <a href="/tools/image/image-inspector/">Image Inspector</a> when dimensions, format or transparency matter, and use the compressor when the destination enforces a byte limit.</p>`}
  ],
  faqs:[
   [`Why did my transparent PNG get a white background in JPEG?`,`JPEG has no alpha channel. The transparent areas are flattened onto the selected matte colour, white by default.`],
   [`Is WebP always smaller than PNG?`,`No. The result depends on the image content and encoder; compare the actual exported bytes.`]
  ]
 },
 'csv-column-editor':{
  sections:[
   {id:'schema-values',title:'Schema changes without changing values',html:`<p>Column selection uses the original field positions, not header text or content guesses. Keep or remove a column, rename its header, and move it left or right; every row matching field moves with the header. Output header names must be nonempty and unique. At least one column must remain, because a table with no columns cannot produce a useful CSV.</p><p>Renaming a header does not transform the values underneath it. Changing <code>amount_usd</code> to <code>amount_eur</code> does not convert currency, and changing <code>id</code> to <code>customer_id</code> does not create a new identifier. If the input text changes, reload the column controls before applying another change.</p>`},
   {id:'destination-schema',title:'Preparing a file for another application',html:`<p>Match the destination expected header names, order and delimiter. A database import or API may require exact names and a fixed order; a spreadsheet is more forgiving but may re-type identifiers on open. Test with a small file before processing a full export, and keep the original so the schema change can be reversed.</p><p>Use the same delimiter as the receiving system and inspect the output header row and a few data rows. Column editing is structural: it does not validate emails, dates, currency or postal codes.</p>`}
  ],
  faqs:[
   [`Does renaming a column convert its values?`,`No. Only the header changes. Convert units or formats separately with the appropriate tool or script.`],
   [`Can I remove every column?`,`No. At least one column must remain so the output has a usable schema.`]
  ]
 },
 'url-parser':{
  sections:[
   {id:'parse-preserves',title:'What URL parsing preserves',html:`<p>The parser reports the scheme, host, port, path, query and fragment without rewriting the URL through a normalizing serializer. Repeated query keys remain separate pairs, and unrecognized pairs keep their raw encoded spelling and order. Credentials in the authority are flagged and redacted in the report so a password is not copied into a screenshot or ticket.</p><p>Default ports may be omitted by the browser or shown explicitly depending on the input. Percent escapes are decoded only where the selected mode says so. The tool does not fetch the URL, resolve redirects or test whether the destination exists.</p>`},
   {id:'query-only',title:'Parsing a query string on its own',html:`<p>Query-only mode treats the input as the part after <code>?</code>. Form mode decodes <code>+</code> as a space; URL mode keeps <code>+</code> literal. Use query mode when you copied parameters from a form, a log line or a tracking template, and full-URL mode when you need the host and path as well.</p><p>Repeated keys are common in filters and tags; they are not collapsed into one value. If you need to remove tracking fields, use <a href="/tools/web/url-cleaner/">URL Tracking Parameter Cleaner</a> rather than deleting pairs by hand.</p>`}
  ],
  faqs:[
   [`Does the parser decode the URL more than once?`,`No. Apply decoding deliberately; repeated decoding can turn an encoded value into a different string.`],
   [`Are credentials shown in the result?`,`They are detected and redacted in the report so a password is not exposed in copied output.`]
  ]
 },
 'csv-split':{
  sections:[
   {id:'records-not-lines',title:'Splitting records, not physical lines',html:`<p>Split counts data records, not raw newlines. A quoted field can contain line breaks and still belong to one record. The header is repeated in every part when that option is enabled; otherwise only the first part carries it. Each part is generated only when you download it, and record order is preserved.</p><p>The part size is a number of data records, not bytes. A part containing very wide rows can still exceed an upload limit even when the record count looks small. Test one part in the destination before splitting a large export.</p>`},
   {id:'part-size',title:'Choosing a part size',html:`<p>Start from the destination limit and the average row width. If the limit is in bytes, estimate from a sample and leave headroom for the header and quoting. If the limit is a row count, use that number directly. Keep the original file and a note of the split settings so the parts can be regenerated.</p><p>Reassembling parts requires care: repeated headers must be removed and the order restored. Prefer keeping the original file for archival use rather than joining the parts back together.</p>`}
  ],
  faqs:[
   [`Are parts split by file size?`,`No. You choose a number of data records per part; byte size can vary with row width.`],
   [`Does every part include the header?`,`Only when the repeat-header option is enabled.`]
  ]
 },
 'image-inspector':{
  sections:[
   {id:'reported-values',title:'Dimensions, bytes and transparency',html:`<p>The inspector reports the decoded pixel width and height, the encoded file size, the format and whether the image has an alpha channel. Aspect ratio is derived from the actual pixels, not from a filename or a thumbnail. Header checks reject unknown, empty or oversized files before a full decode.</p><p>A file byte size on disk may use decimal kilobytes (1 KB = 1,000 bytes) or binary kibibytes (1 KiB = 1,024 bytes). An upload form that says KB may mean either. Compare the number the tool reports with the form stated unit before deciding that an image is under the limit.</p>`},
   {id:'inspector-limits',title:'What the inspector cannot tell you',html:`<p>It does not judge visual quality, copyright, metadata privacy or whether the content is appropriate for a destination. It does not verify that a JPEG is undamaged beyond what the decoder can read, and it does not convert or compress. Use it to identify the binding constraint, then edit with the matching tool.</p><p>If the dimensions are within limits but the file is too large, compress. If the bytes are fine but the dimensions are too large, resize. If both are binding, resize first, then compress the resized result.</p>`}
  ],
  faqs:[
   [`Does inspecting an image modify it?`,`No. The tool reads the selected file to report its properties and does not overwrite or upload it.`],
   [`Why does the byte size differ from my file manager?`,`The file manager may use binary units or show a different rounded value. Compare the exact bytes and the unit the destination requires.`]
  ]
 },
 'color-converter':{
  sections:[
   {id:'notation-differences',title:'HEX, RGB and HSL describe the same colour differently',html:`<p>HEX writes each sRGB channel as a hexadecimal byte. RGB writes the same channels in decimal, and percentages are scaled to that range. HSL re-expresses the colour as hue, saturation and lightness: hue is an angle, saturation is distance from grey, and lightness runs from black through the colour to white. Alpha adds transparency in every notation.</p><p>HSL is convenient when you want to lighten or desaturate a colour, but it is not perceptually uniform. A 10% lightness change on a yellow and on a blue does not look like the same step. HEX and RGB are better when an exact channel value must be reproduced, such as a design token or a CSS variable.</p>`},
   {id:'rounding-drift',title:'Why a converted value can drift by one step',html:`<p>RGB channels are rounded to whole bytes for HEX output, and HSL is rounded to two decimals. A colour that arrives as fractional HSL can therefore return to a slightly different HEX value after a round trip. Hue also wraps at 360 degrees, so a computed hue below zero is moved into range.</p><p>These conversions are screen sRGB operations. They do not perform CMYK print conversion, colour-profile matching or wide-gamut mapping. For accessibility decisions, take the resulting opaque colours into <a href="/tools/web/contrast-checker/">Color Contrast Checker</a> rather than judging contrast from HSL values.</p>`}
  ],
  faqs:[
   [`Does a HEX to HSL round trip always return the same colour?`,`No. Rounding to whole RGB bytes and two-decimal HSL can shift a channel by one step, especially from fractional input.`],
   [`Can I convert CMYK, named colours or wide-gamut spaces?`,`No. The converter accepts sRGB HEX, rgb() and hsl() notation only and rejects other colour spaces.`]
  ]
 },
 'hash-generator':{
  sections:[
   {id:'what-a-digest-proves',title:'What a SHA digest proves',html:`<p>A digest is a fixed-length fingerprint of the exact input bytes. Change one character and the output changes unpredictably; the same bytes always produce the same digest. That makes hashes useful for integrity checks: compare the full digest after a download, a copy or a build.</p><p>A digest does not prove who created the bytes. Anyone can compute a SHA-256 value, so a matching hash only shows that two inputs are identical. SHA-256, SHA-384 and SHA-512 differ in output length and internal design; the choice should follow the format or protocol that will verify the value.</p>`},
   {id:'exact-input-bytes',title:'Hash the bytes you actually intend to hash',html:`<p>Text is encoded as UTF-8 before hashing. A trailing space, a final newline, CRLF instead of LF, or a different Unicode normalization turns the input into different bytes and produces a different digest. When comparing with a published checksum, confirm how the file was transferred and whether the reference was computed over the file or over its text.</p><p>Fast general-purpose hashes are unsuitable for storing passwords; use a dedicated password KDF such as Argon2, scrypt or bcrypt. Use <a href="/tools/web/base64/">Base64</a> when you need a reversible representation rather than a fingerprint.</p>`}
  ],
  faqs:[
   [`Can I use SHA-256 to store passwords?`,`No. A fast general-purpose hash is easy to brute-force at scale; use a memory-hard password KDF with a per-user salt.`],
   [`Why does another tool produce a different digest?`,`Different bytes or a different algorithm. Check line endings, trailing whitespace, encoding and whether both tools used SHA-256, SHA-384 or SHA-512.`]
  ]
 },
 'csv-deduplicate':{
  sections:[
   {id:'duplicate-key',title:'Decide what makes two records duplicates',html:`<p>Whole-row mode compares every field, so rows that differ in one cell are kept. Key-column mode compares only the selected fields and ignores the rest; a tuple key is the ordered combination of those values. Case, surrounding whitespace and Unicode normalization can be applied before comparing, which changes which rows collide.</p><p>Choose the key from the meaning of the data. For a customer export, an email or customer ID may define a duplicate even when the name or address changed. For an event log, identical values in every column may represent two real events, so deduplication would remove valid records. Inspect the file with <a href="/tools/data/csv-viewer/">CSV Viewer</a> before deleting rows.</p>`},
   {id:'kept-record',title:'Which record is kept, and what is lost',html:`<p>Keep-first retains the earliest occurrence in file order. Keep-last retains the latest occurrence and restores the original order afterwards. Neither mode merges the other fields: the retained row wins entirely, so a later row with a corrected value can replace an earlier row under keep-last, while keep-first discards that correction.</p><p>Deduplication is destructive. Download the result to a new file and keep the source. If two rows share a key but contain different values, decide which record is authoritative or reconcile the fields with <a href="/tools/data/csv-column-editor/">CSV Column Editor</a> before removing anything.</p>`}
  ],
  faqs:[
   [`Does deduplication merge the duplicate rows?`,`No. It keeps one record and drops the others; it does not combine or reconcile their field values.`],
   [`Why were two similar rows not treated as duplicates?`,`They differ in a compared field, or in case, whitespace or Unicode normalization. Select the right key columns or enable the matching options.`]
  ]
 },
 'unix-timestamp':{
  sections:[
   {id:'unit-and-range',title:'Seconds, milliseconds and the supported range',html:`<p>The Unix epoch is 00:00:00 UTC on 1 January 1970. Seconds and milliseconds are the same instant at different scales: a ten-digit value is normally seconds and a thirteen-digit value is normally milliseconds, but the converter uses the unit you select rather than guessing from length. Enter whole numbers only; no separators or exponents.</p><p>Negative values represent instants before the epoch. The supported range is the range of a JavaScript Date, about ±8.64 × 10<sup>15</sup> milliseconds, which is far wider than the 32-bit seconds range associated with the year 2038 problem. Values outside that range are rejected instead of being silently wrapped.</p>`},
   {id:'utc-not-local',title:'UTC output is not your local clock',html:`<p>The converter reports one instant in UTC and returns epoch values as decimal strings so large integers keep every digit. Whether that instant is Monday or Tuesday depends on the viewer timezone. A date input with an explicit offset is converted to the same instant; the tool does not assume the visitor timezone and does not guess a missing offset.</p><p>Leap seconds and the ambiguous 24:00 notation are not supported. Fractional seconds are accepted in date input only, not in numeric epoch input. For scheduling work, store the UTC instant and format it for display separately.</p>`}
  ],
  faqs:[
   [`Is a ten-digit number always seconds?`,`Usually, but the converter does not guess. Select seconds or milliseconds explicitly; the wrong unit produces a date thousands of years away.`],
   [`Does the tool use my local timezone?`,`No. Numeric epochs are treated as UTC and date input requires Z or an explicit offset.`]
  ]
 },
 'image-compressor':{
  sections:[
   {id:'target-search',title:'How the byte target is reached',html:`<p>The compressor does not apply one fixed quality. For JPEG and WebP it searches for the highest quality whose encoded size still meets the target, so the result stays as detailed as the limit allows instead of being smaller than necessary. If no tested quality meets the target, it reports the smallest result honestly rather than claiming success.</p><p>PNG is lossless, so a quality setting has no effect. Allow resizing to step the dimensions down, or convert the image to JPEG or WebP when transparency is not required. The target is entered in kilobytes and interpreted as 1,000 bytes per KB, which may differ from a form that uses kibibytes.</p>`},
   {id:'compression-tradeoffs',title:'What compression cannot recover',html:`<p>Re-encoding an already compressed JPEG adds another lossy generation. Keep the original and compress from it rather than compressing a previous output. Reducing dimensions removes detail permanently, and a very small byte target can make text, edges and gradients visibly blocky.</p><p>Use <a href="/tools/image/image-inspector/">Image Inspector</a> to see which limit is binding. If the bytes are acceptable but the dimensions are not, use <a href="/tools/image/image-resizer/">Image Resizer</a> instead. Inspect the exported file in the destination application before publishing.</p>`}
  ],
  faqs:[
   [`Why did my PNG stay the same size?`,`PNG is lossless and ignores quality levels. Enable resizing or choose JPEG or WebP if the destination accepts them.`],
   [`Why is the output larger than the input?`,`The source may already be well optimised, or the chosen format may suit the content less well. The tool reports the real byte change and retains the original.`]
  ]
 },
 'uuid-generator':{
  sections:[
   {id:'v4-random',title:'What version 4 random UUIDs guarantee',html:`<p>A version-4 UUID contains 122 random bits, with fixed bits identifying the version and variant. Generation uses the browser Web Crypto API, not Math.random and not a timestamp or hardware address. Collisions are possible in principle but negligible for normal identifier use.</p><p>Randomness makes v4 identifiers unguessable enough for many applications, but a UUID is an identifier, not an authentication token or a secret. Do not treat possession of a UUID as authorisation, and do not use one as a password reset code. Generate a fresh value for every record.</p>`},
   {id:'batch-secure-context',title:'Batches, storage and secure contexts',html:`<p>The generator produces between 1 and 100 identifiers per batch and runs locally. Web Crypto is available in a secure context, which means HTTPS or localhost; on an insecure origin the browser may refuse to expose it. Nothing is sent to a server and nothing is stored after you leave the page.</p><p>UUIDs are not sortable, because random values have no chronological order. If you need sortable identifiers, use a database sequence, a ULID or a timestamp-prefixed scheme. If you need a short user-facing code, generate it separately and check for collisions.</p>`}
  ],
  faqs:[
   [`Are UUID v4 values sortable or time-ordered?`,`No. They are random. Use a sequence, ULID or timestamp-based identifier when order matters.`],
   [`Can I generate UUIDs offline?`,`Yes after the page has loaded. Generation runs locally through Web Crypto and makes no network request.`]
  ]
 },
 'utm-builder':{
  sections:[
   {id:'fields-and-preservation',title:'Required fields and what the builder preserves',html:`<p>Source, medium and campaign are required; term and content are optional. The builder edits the URL through the browser URL API, so unrelated query parameters keep their place and the fragment is retained. Supplying a field that already exists replaces that UTM value instead of adding a second copy. Values are percent-encoded where needed.</p><p>Optional fields left empty do not clear existing values. If a link already carries a campaign, review every field before rebuilding it. The result is a readable URL, not a shortened one, and the parameters remain visible to anyone who receives the link.</p>`},
   {id:'naming-discipline',title:'Naming discipline matters more than the tool',html:`<p>Analytics systems treat <code>Email</code> and <code>email</code> as different values. Agree on lowercase source and medium names, a consistent campaign pattern and a limited vocabulary before creating many links. Inconsistent names fragment reports even when every URL is technically valid.</p><p>Do not put personal data, email addresses or secrets in UTM fields; they appear in shared links, logs and referrer data. When cleaning an existing link, use <a href="/tools/web/url-cleaner/">URL Tracking Parameter Cleaner</a>. The <a href="/guides/url-encoding-and-tracking/">tracking guide</a> covers naming and encoding together.</p>`}
  ],
  faqs:[
   [`Will the builder remove unrelated query parameters?`,`No. Non-UTM parameters and the fragment are preserved; only same-name UTM fields are replaced.`],
   [`Does it create a short link?`,`No. It returns the full campaign URL with visible parameters and does not contact a shortener.`]
  ]
 },
 'slug-generator':{
  sections:[
   {id:'ascii-or-unicode',title:'ASCII transliteration or Unicode mode',html:`<p>ASCII mode decomposes accented letters, removes diacritical marks and maps a few common characters, then replaces everything outside <code>a–z</code> and digits with the chosen separator. Unicode mode keeps letters and marks instead of forcing them into Latin equivalents. Hyphen and underscore separators produce different identifiers, and repeated separators are collapsed at the edges.</p><p>Neither mode decides what the slug should say. A slug is a stable identifier in a URL, so choose short, meaningful words rather than a full headline. If the title changes later, changing the slug breaks existing links unless the publishing system provides a redirect.</p>`},
   {id:'slug-stability',title:'Stability, collisions and length',html:`<p>Two different titles can produce the same slug, especially after punctuation is removed. Check for an existing page before publishing and add a distinguishing word rather than a random suffix when possible. Very long titles should be shortened deliberately; the tool does not truncate to a keyword count.</p><p>Slugs are not a place for keyword stuffing. A readable slug helps people recognise a link; search engines treat it as a minor signal. Use <a href="/tools/web/url-encoder-decoder/">URL Encoder / Decoder</a> when a value inside a query string needs encoding, and keep the slug itself free of spaces.</p>`}
  ],
  faqs:[
   [`Why did accented characters disappear?`,`ASCII mode removes diacritics and transliterates some letters. Choose Unicode mode to keep the original letters.`],
   [`Does the tool check whether the slug is already taken?`,`No. It only formats the text; check availability and existing URLs in your publishing system.`]
  ]
 },
 'json-compare':{
  sections:[
   {id:'structural-not-text',title:'Structural comparison, not a text diff',html:`<p>Two documents are compared as data. Object key order is ignored, so <code>{"a":1,"b":2}</code> and <code>{"b":2,"a":1}</code> are equal. Arrays are ordered: moving an item changes the result because position is part of the value. Number spellings that represent the same value, such as <code>1</code>, <code>1.0</code> and <code>1e0</code>, compare equal, while the string <code>"1"</code> remains different from the number.</p><p>Large integers and extreme exponents are compared exactly rather than through floating-point rounding. Duplicate keys are rejected because they make the document ambiguous. A missing key and a key whose value is <code>null</code> are different states and are reported separately.</p>`},
   {id:'reading-changes',title:'Reading the change report',html:`<p>Each change is located with a JSON Pointer path, so <code>/users/0/name</code> identifies a nested value rather than a line number. This makes the report stable when formatting changes. The tool stops at 10,000 reported changes and enforces a 50-level nesting limit and a 1 MiB input limit per side.</p><p>Use <a href="/tools/data/json-viewer/">JSON Viewer</a> to explore one document and <a href="/tools/data/json-formatter/">JSON Formatter</a> to inspect syntax errors. Comparison answers whether two valid documents are equivalent; it does not decide which version is correct.</p>`}
  ],
  faqs:[
   [`Does key order count as a difference?`,`No. Objects are compared by key and value; arrays are compared by position.`],
   [`Does the compare ignore array order?`,`No. Array items are compared by index, so reordering an array is reported as a change.`]
  ]
 },
 'number-base-converter':{
  sections:[
   {id:'exact-bigint',title:'Exact integers instead of floating point',html:`<p>Conversion uses arbitrary-precision integers, so values above JavaScript's safe integer limit keep every digit. The converter reports binary, octal, decimal and hexadecimal forms of the same signed integer. It does not round, and it does not silently switch to exponential notation.</p><p>Only whole numbers are accepted. Fractions, digit separators, exponents and non-ASCII digits are rejected because they would require an interpretation the tool does not provide. Leading zeros are allowed on input and removed in the canonical output.</p>`},
   {id:'prefixes-signs',title:'Prefixes, signs and negative values',html:`<p>A <code>0b</code>, <code>0o</code> or <code>0x</code> prefix must match the selected input base; a mismatched prefix is an error rather than an invitation to guess. A minus sign before the value produces a negative number in every output. Negative values use a sign and magnitude, not fixed-width two's complement, so a bit pattern for a specific word size must be produced separately.</p><p>Check the digit set for the chosen base: binary accepts only 0 and 1, octal 0–7, decimal 0–9 and hexadecimal 0–9 plus a–f. The 4,096-digit input limit is generous for identifiers and flags but not intended for arbitrary-precision arithmetic.</p>`}
  ],
  faqs:[
   [`Can I convert fractional or negative values?`,`Integers only, including negative integers. Fractions and exponents are rejected.`],
   [`Why is my 0x value rejected in decimal mode?`,`The prefix must match the selected input base. Choose hexadecimal or remove the prefix.`]
  ]
 },
 'unicode-converter':{
  sections:[
   {id:'escape-layers',title:'UTF-16 escapes and Unicode code points are different layers',html:`<p>A <code>\\uXXXX</code> escape names one UTF-16 code unit. Characters outside the Basic Multilingual Plane, including most emoji, need a surrogate pair and therefore appear as two escapes. A <code>U+</code> code point names a Unicode scalar value directly and can be written with five or six hexadecimal digits.</p><p>Conversion changes the representation, not the characters. It does not apply NFC or NFD normalization, so a precomposed accent and a base letter plus combining mark remain different sequences until you normalize them explicitly. Invalid code points and unpaired surrogates are rejected instead of being replaced.</p>`},
   {id:'one-layer',title:'Convert one layer at a time',html:`<p>An escaped backslash in the input is data, not an instruction to keep decoding. The converter performs one layer per run, so decoding twice is a deliberate decision. Applying it repeatedly to already decoded text can change meaning, particularly when the original text legitimately contains a sequence that looks like an escape.</p><p>Use <a href="/tools/web/html-entities/">HTML Entity Encoder / Decoder</a> for HTML references and <a href="/tools/web/url-encoder-decoder/">URL Encoder / Decoder</a> for percent escapes. Each notation has its own rules, and mixing them in one pass produces output that no downstream parser expects.</p>`}
  ],
  faqs:[
   [`Why does one emoji become two \\u escapes?`,`Most emoji lie outside the Basic Multilingual Plane and are represented by a UTF-16 surrogate pair, which is two code units.`],
   [`Does the converter normalize accented characters?`,`No. It changes representation only; apply NFC or NFD separately when normalization matters.`]
  ]
 },
 'html-entities':{
  sections:[
   {id:'encoding-not-sanitizing',title:'Encoding is not sanitization',html:`<p>Entity encoding represents markup-significant characters so a browser displays them as text. It is the right operation for a text node, an attribute value or a code sample. It is not a general sanitizer: decoding or encoding does not remove scripts, event handlers or dangerous URL schemes, and correct handling depends on where the value will be inserted.</p><p>The decoder follows HTML entity rules for named, decimal and hexadecimal references. Unknown names are left unchanged rather than guessed. Decoded output is displayed as inert text and is never inserted as executable markup.</p>`},
   {id:'entity-layers',title:'Entity layers and legacy names',html:`<p>Double-encoded text such as <code>&amp;amp;lt;</code> decodes to <code>&amp;lt;</code>, not to <code>&lt;</code>. One pass removes one layer. If a value still shows an entity after decoding, it was encoded more than once or the source intended the entity to remain visible. Numeric mode can encode special characters by code point when named entities are unsuitable.</p><p>Legacy names without a trailing semicolon are accepted where HTML permits them, but writing the semicolon is safer. Use <a href="/tools/web/url-encoder-decoder/">URL Encoder / Decoder</a> for URL components and <a href="/tools/web/markdown-to-html/">Markdown to HTML</a> when the source is Markdown rather than HTML.</p>`}
  ],
  faqs:[
   [`Why is an entity still visible after one decode?`,`It was probably double-encoded. One pass removes one layer, so inspect the source before decoding again.`]
  ]
 }
};

const FAQ_EXTRA={
 'regex-tester':[
  [`What does a zero-width match mean?`,`A zero-width match consumes no characters, so its start and end positions are equal. The tester advances the search position after such a match so the scan cannot loop forever.`],
  [`Why are match positions counted in UTF-16 code units?`,`JavaScript reports string indices in UTF-16 code units, not grapheme clusters. An emoji outside the Basic Multilingual Plane counts as two units, and the end position is exclusive.`]
 ],
 'json-viewer':[
  [`Does the viewer round large numbers?`,`No. Numbers are shown from their original JSON tokens instead of being converted to JavaScript numbers, so integers above the safe range keep every digit.`],
  [`Is there a nesting or size limit?`,`Yes. Documents beyond 50 nesting levels are rejected, and the stated input cap prevents a partial tree from being presented as complete.`]
 ],
 'json-yaml-converter':[
  [`Can I convert a JSON integer larger than 2^53?`,`Yes. Exact integer tokens are preserved instead of being rounded through a JavaScript number, so large identifiers survive the round trip.`],
  [`Why does an empty document produce an error?`,`Conversion needs one complete JSON or YAML value. An empty file, a comments-only file or a bare document marker contains no value to convert.`]
 ],
 'compare-lists':[
  [`Are values compared as text or as numbers?`,`As exact text after the selected options. Leading zeros are part of the value, so 01 and 1 are different members.`],
  [`Can I compare lists of different lengths?`,`Yes. Equal length is not required; the result reports shared, only-A, only-B and union members separately.`]
 ],
 'markdown-to-html':[
  [`Which Markdown features are supported?`,`CommonMark and GFM-style headings, lists, tables, fenced code, blockquotes, links and images. Raw HTML in the source is escaped rather than rendered.`],
  [`Can I paste the output into any CMS?`,`The result is an HTML fragment. A CMS may sanitize, rewrite or reject parts of it, so preview the fragment in that system before publishing.`]
 ],
 'jwt-decoder':[
  [`How are exp, iat and nbf interpreted?`,`As NumericDate values in seconds. The decoder shows the corresponding UTC time and compares it with the current time, but it does not verify the signature that would make those claims trustworthy.`],
  [`Does it support encrypted JWE tokens?`,`No. It decodes three-part JWS-style tokens only; a five-part encrypted token is rejected rather than partially parsed.`]
 ]
};

const PRIVACY_TAIL=` Input stays in browser memory until you reset or leave the page. Copy and download run only when you choose them. No tool input is sent to a processing service. Website pages and scripts still make ordinary hosting requests; the <a href="/privacy-policy/">privacy policy</a> separates those from tool processing.`;

export function applyEditorialDepth(content){
 for(const [slug,c] of Object.entries(content)){
  if(!c)continue;
  if(VERIFICATION[slug])c.verification=VERIFICATION[slug];
  if(PRIVACY[slug]){
   const privacy=`<p>${PRIVACY[slug]}${PRIVACY_TAIL}</p>`;
   c.privacy=privacy;
   if(Array.isArray(c.sections)){
    const i=c.sections.findIndex(s=>s.id==='privacy'||/privacy/i.test(s.title));
    const section={id:'privacy',title:'Processing and privacy',html:privacy};
    if(i>=0)c.sections[i]=section;else c.sections.push(section);
   }
  }
  const depth=DEPTH[slug];
  if(Array.isArray(c.sections)){
   if(depth){
    const i=c.sections.findIndex(s=>s.id==='privacy'||/privacy/i.test(s.title));
    if(i>=0)c.sections.splice(i,0,...depth.sections);else c.sections.push(...depth.sections);
   }
  }else{
   if(depth&&depth.sections.length)c.extraSections=[...(c.extraSections||[]),...depth.sections];
  }
  const additions=[...((depth&&depth.faqs)||[]),...(FAQ_EXTRA[slug]||[])];
  const existing=Array.isArray(c.faqs)?c.faqs:(c.faq?[c.faq]:[]);
  const seen=new Set(),merged=[];
  for(const item of [...existing,...additions]){if(seen.has(item[0]))continue;seen.add(item[0]);merged.push(item);}
  c.faqs=merged;
 }
}
