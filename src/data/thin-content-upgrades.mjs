import {escapeHTML as e} from '../lib/common.mjs';
const s=(id,title,html)=>({id,title,html});
const privacy=(note)=>s('privacy','Processing and privacy',`<p>${note} Input stays in page memory until you reset or leave the page. Copy and download run only when you choose them. No tool input is sent to a processing service. Website pages and scripts still make ordinary hosting requests; the <a href="/privacy-policy/">privacy policy</a> separates those from tool processing.</p>`);
const upgrades={
 'delimiter-converter':{
  title:'CSV and TSV Delimiter Converter — Change Separators Safely | UtilityPilot',description:'Convert CSV to TSV or switch between comma, semicolon, tab and pipe delimiters without corrupting quoted values.',h1:'CSV and TSV Delimiter Converter',
  sections:[
   s('why','Why delimiters must change as structure, not as characters','<p>A spreadsheet exported with semicolons often arrives as a single column when a comma-based importer opens it. Global find-and-replace of every comma breaks any value that already contains punctuation. This converter parses each record first, then re-serializes fields with the new separator. Structure and content stay separate.</p><p>Quoted fields protect embedded delimiters. A field containing the target delimiter, a double quote or a line break is quoted automatically; internal quotes are doubled. Quote-every-field and CRLF options support stricter import systems that require consistent quoting or Windows-style line endings.</p>'),
   s('formats','Choosing source and output formats','<p>Comma (CSV) is the default interchange format. Semicolon is common in European locales where the decimal comma is also used. Tab (TSV) avoids delimiter clashes with prose. Pipe is frequent in shell pipelines and log exports. Select the source delimiter that matches the file you loaded—guessing wrong usually produces one oversized column or many empty fields.</p><p>Line endings: LF suits Unix tools and many APIs; CRLF suits Excel and Windows-oriented imports. A UTF-8 BOM can help legacy Windows applications detect encoding, but it is an encoding marker, not a visible header character. Some parsers strip it; others treat it as part of the first field.</p>'),
   s('examples','Worked conversion examples','<pre>Input (comma):\nname,note\nAda,"Hello, world"\nSam,Plain\n\nSemicolon output:\nname;note\nAda;Hello, world\nSam;Plain</pre><p>The comma inside “Hello, world” stays inside the note field because the field was quoted. Without quoting, the note would split into two columns and corrupt the table.</p><p>Pipe output of the same data: <code>name|note</code> / <code>Ada|Hello, world</code> / <code>Sam|Plain</code>. Tab output uses an actual tab character between fields. Inspect a few punctuation-heavy rows before downloading the full file.</p>'),
   s('mistakes','Common conversion mistakes','<p>Converting a file that already uses the target delimiter produces no visible change but can still alter quoting. Unquoted fields containing the source delimiter would already have been split incorrectly at load time—fix the source first.</p><p>Do not mix line-ending styles in one export. Do not strip a BOM unless the destination rejects it. Multi-character separators (for example <code>::</code>) are not supported; split those with a record-aware script instead of a global replace.</p>'),
   s('workflow','When to use this tool in a pipeline','<p>Typical flow: inspect with <a href="/tools/data/csv-viewer/">CSV Viewer</a>, convert the delimiter here, adjust headers with <a href="/tools/data/csv-column-editor/">CSV Column Editor</a>, then convert with <a href="/tools/data/csv-to-json/">CSV to JSON</a> or merge/split. Each step keeps original values; none guesses business meaning.</p><p>If the destination application documents a required delimiter and quoting style, convert to that specification and reopen the result in the destination before processing a larger batch.</p>')
  ],
  faqs:[
   ['Can I choose any delimiter?','This release supports comma, semicolon, tab and pipe. Multi-character separators are not supported.'],
   ['Does the tool change the values inside fields?','No. Only structural delimiters and quoting change. Field text, spacing and case remain as loaded.'],
   ['Why did my semicolon file load as one column?','The source delimiter was probably left as comma. Reload with semicolon selected, then convert or export as needed.'],
   ['Should I keep the UTF-8 BOM?','Keep it if the destination application needs it to detect UTF-8. Remove it only when the importer treats the BOM as part of the first header.'],
   ['Is a converted file safe to open in Excel?','Structurally yes if quoting and line endings match Excel’s expectations. Identifier columns can still be re-typed on open—import them as text when leading zeros matter.']
  ],
  privacyNote:'Delimiter conversion runs entirely in your browser on the text or file you select.'
 },
 'url-cleaner':{
  title:'URL Tracking Parameter Cleaner — Remove UTM and Click IDs | UtilityPilot',description:'Strip known tracking parameters such as utm_*, gclid and fbclid from a link while preserving content parameters and the fragment.',h1:'URL Tracking Parameter Cleaner',
  sections:[
   s('what','Which parameters are removed','<p>The cleaner targets common campaign and click identifiers. UTM fields: <code>utm_source</code>, <code>utm_medium</code>, <code>utm_campaign</code>, <code>utm_term</code>, <code>utm_content</code>, <code>utm_id</code>, <code>utm_name</code>, <code>utm_cid</code>, <code>utm_viz_id</code>, <code>utm_reader</code>, <code>utm_place</code>, <code>utm_social</code>, <code>utm_social-type</code>, <code>utm_swu</code>. Click IDs: <code>gclid</code>, <code>gclsrc</code>, <code>dclid</code>, <code>gbraid</code>, <code>wbraid</code>, <code>srsltid</code>, <code>fbclid</code>, <code>twclid</code>, <code>igshid</code>, <code>mc_cid</code>, <code>mc_eid</code>, <code>yclid</code>, <code>msclkid</code>, <code>ttclid</code>, <code>li_fat_id</code>, <code>epik</code>, <code>vero_id</code>, <code>oly_anon_id</code>, <code>oly_enc_id</code>.</p><p>Matching is exact and case-sensitive. Unrecognized pairs keep their raw encoded spelling and original order rather than being re-serialized through a normalizing serializer.</p>'),
   s('keep','Why some parameters must stay','<p>Parameters often select the actual content: <code>page</code>, <code>q</code>, <code>id</code>, <code>sort</code>, <code>lang</code>, <code>ref</code>, <code>session</code>, <code>token</code>, <code>signature</code>. Deleting them can break the link or invalidate a signed URL. The cleaner never removes unknown names—opt in only to the tracking list.</p><p>A signed or expiring URL may depend on the exact original query string. Any change, even removing a tracking field, can invalidate the signature. Test cleaned links yourself before sharing them.</p>'),
   s('examples','Before and after','<pre>Before:\nhttps://shop.example.com/item/42?utm_source=newsletter&utm_medium=email&utm_campaign=spring&page=2#specs\n\nAfter (default selections):\nhttps://shop.example.com/item/42?page=2#specs</pre><p>The fragment <code>#specs</code> and content parameter <code>page=2</code> remain. Campaign fields are gone. The removal summary lists each deleted pair so you can confirm nothing unexpected was stripped.</p>'),
   s('tracking','Tracking fields explained','<p><strong>utm_source</strong> names the platform (newsletter, twitter, partner-site). <strong>utm_medium</strong> is the channel (email, cpc, social). <strong>utm_campaign</strong> groups a promotion (spring_sale). <strong>utm_term</strong> can carry paid keywords; <strong>utm_content</strong> distinguishes creatives. <strong>gclid</strong> / <strong>fbclid</strong> / <strong>msclkid</strong> are per-click identifiers from Google, Meta and Microsoft ads—removing them stops the destination from joining the click back to an ad platform session when the link is opened later.</p><p>Cleaning a link does not erase history already recorded by the destination when the original was first visited. It only produces a shorter link for future shares.</p>'),
   s('safety','What cleaning does not do','<p>Removing parameters is not a safety verdict. A cleaned URL can still be malicious, and a dirty URL can be harmless. The tool does not fetch the destination, check certificates or detect malware. It does not remove cookies already set by a previous visit, nor does it shorten the link or use a remote shortener.</p><p>Browser URL handling may still normalize host casing or default ports even when query pairs are preserved. Compare the cleaned string against what you expect before pasting it into a message.</p>')
  ],
  faqs:[
   ['Why not remove every parameter?','Parameters often select content (search query, page number, record ID). Deleting them can break the link. Only known tracking names are offered for removal.'],
   ['Does cleaning a link stop all tracking?','No. It removes query-based identifiers from the link you share. Prior visits, cookies and server-side logging are outside this tool’s control.'],
   ['Will the cleaned URL still work?','Usually yes for content parameters you keep. Signed URLs may break if their signature covers the original query string—test before relying on the result.'],
   ['Can I restore removed parameters?','Not with this tool. Keep the original URL if you might need the campaign fields later.'],
   ['Is the destination visited?','No. Parsing and cleaning happen locally; no network request is made to the link.']
  ],
  privacyNote:'Link cleaning runs locally; the destination is never requested by this tool.'
 },
 'color-converter':{
  title:'HEX, RGB and HSL Color Converter with Alpha | UtilityPilot',description:'Convert between HEX, rgb() and hsl() color notation with a visible swatch, alpha support and explicit sRGB rounding.',h1:'HEX, RGB and HSL Color Converter',
  sections:[
   s('notations','How the three notations relate','<p>HEX is a compact base-16 spelling of sRGB channels: <code>#ff8800</code> is red 255, green 136, blue 0. Short form <code>#f80</code> expands each digit to a doubled pair. RGB accepts integers 0–255 or percentages. HSL describes the same color as hue (0–360°), saturation (0–100%) and lightness (0–100%).</p><p>Conversions round for display: RGB outputs whole bytes; HSL uses two decimal places for saturation and lightness. Hue wraps at 360°. Alpha below 1 is retained and included in eight-digit HEX and in rgb()/hsl() alpha components.</p>'),
   s('examples','Conversion examples','<pre>#f00      → #ff0000 · rgb(255 0 0) · hsl(0 100% 50%)\n#0a0a0a   → rgb(10 10 10) · hsl(0 0% 3.9%)\n#ff880080 → rgba(255 136 0, 0.502) · hsla(32 100% 50% / 0.502)</pre><p>The swatch shows the converted color immediately. Copy the notation your editor or stylesheet expects. Two decimal places in HSL can still round when a design system stores one decimal—verify in the destination if exactness matters.</p>'),
   s('alpha','Transparency and compositing','<p>Four-digit HEX (<code>#rgbA</code>) and eight-digit HEX (<code>#rrggbbaa</code>) carry alpha. rgb()/hsl() accept an alpha component or <code>/</code> syntax. Contrast checking requires opaque colors: composite transparent layers against their real background first, then check the resulting pair.</p><p>This converter is not a color-managed pipeline. It works in sRGB, not CMYK, Display-P3 or Rec.2020. Named CSS colors are not expanded here—enter HEX, rgb() or hsl() directly.</p>'),
   s('scope','What this tool does not do','<p>Invalid channel ranges, malformed HEX and unsupported notation are rejected rather than clamped silently. Wide-gamut values outside sRGB are not mapped. The tool does not pick palette harmonies, generate themes or certify accessibility—that is the contrast checker’s job for a specific text/background pair.</p><p>Sampling an image color is a separate step: use <a href="/tools/image/image-color-picker/">Image Color Picker</a> when the source is a pixel, then convert the sampled HEX here if another notation is needed.</p>')
  ],
  faqs:[
   ['Can I enter transparency?','Yes—use four/eight-digit HEX or an alpha component in rgb()/hsl(). Contrast checking separately requires opaque colors.'],
   ['Why does HSL show two decimal places?','Display rounding only. The underlying conversion uses full precision before formatting for the swatch and copy fields.'],
   ['Does this convert print (CMYK) colors?','No. All conversions are sRGB screen colors. A print workflow needs a color-managed application with the correct profile.'],
   ['Are named colors like “rebeccapurple” supported?','Enter HEX, rgb() or hsl() instead. Named-color expansion is not part of this converter.'],
   ['Can I use the result in a contrast check?','Yes. Copy the opaque HEX into the foreground or background field of the Contrast Checker.']
  ],
  privacyNote:'Color conversion is arithmetic on the values you type; nothing is uploaded.'
 },
 'utm-builder':{
  title:'UTM Campaign URL Builder — Consistent Campaign Links | UtilityPilot',description:'Build campaign links with consistent UTM source, medium and campaign fields while preserving existing parameters and fragments.',h1:'UTM Campaign URL Builder',
  sections:[
   s('fields','What each UTM field means','<p><strong>utm_source</strong> — the platform or publisher sending traffic (newsletter, twitter, partner-blog). <strong>utm_medium</strong> — the marketing channel (email, cpc, social, affiliate). <strong>utm_campaign</strong> — the promotion or initiative (spring_sale_2026). <strong>utm_term</strong> — optional paid keyword or audience segment. <strong>utm_content</strong> — optional creative variant (hero_banner, footer_link).</p><p>Source and campaign are required for useful reports. Term and content are optional; empty optional fields leave any existing values unchanged rather than writing empty strings.</p>'),
   s('rules','Naming rules that keep reports readable','<p>Agree on case before creating many links: <code>Email</code> and <code>email</code> become different values in downstream reports. Prefer lowercase snake_case or kebab-case. Spell the medium from a fixed list so totals group correctly. Do not put personally identifying information in campaign fields—analytics tools receive them as-is.</p><p>A supplied field replaces an existing field of the same name. Unrelated query parameters and the <code>#fragment</code> are preserved. Spelling of source and campaign remains exactly as typed so your convention is not “helpfully” rewritten.</p>'),
   s('examples','Example builds','<pre>Base:  https://example.com/pricing?lang=en\nSource: newsletter · Medium: email · Campaign: autumn_launch\n\nResult:\nhttps://example.com/pricing?lang=en&utm_source=newsletter&utm_medium=email&utm_campaign=autumn_launch</pre><p>The existing <code>lang=en</code> parameter stays. A second build with the same source/medium but a different campaign replaces only <code>utm_campaign</code>; other UTM fields you filled remain. Inspect the parameter table before copying the link.</p>'),
   s('scope','What UTM tags do and do not do','<p>UTM parameters are labels for analytics systems that choose to read them. They do not guarantee that a visit is collected, attributed or attributed to the campaign you intended. They are not encryption, not shorteners and not a substitute for server-side campaign configuration.</p><p>This builder does not use a remote shortener or tracking service. The resulting URL is a normal link you can paste anywhere. For cleaning old campaign fields from a shared link, use <a href="/tools/web/url-cleaner/">URL Cleaner</a>.</p>'),
   s('workflow','Building a consistent set','<p>Create a small naming sheet (source, medium, campaign list) before a campaign goes live. Build each link here, paste the parameter table into your campaign doc, and keep the base URL unchanged so A/B tests differ only in the intended fields. Re-check a sample link in the destination’s own analytics preview if available.</p>')
  ],
  faqs:[
   ['Will this shorten a link?','No. It builds readable campaign parameters and does not use a remote shortener or tracking service.'],
   ['What if the URL already has UTM fields?','A supplied field replaces the existing field of the same name. Empty optional fields leave existing values unchanged.'],
   ['Do UTM tags guarantee analytics collection?','No. They are labels. Collection and attribution depend on the analytics configuration of the destination.'],
   ['Can I put personal data in these fields?','Avoid it. Campaign fields are often exported into shared reports. Use campaign names, not customer identifiers.'],
   ['How do I remove old campaign tags later?','Use URL Cleaner and select the UTM parameter names you want stripped while keeping content parameters.']
  ],
  privacyNote:'Link building happens in the page; no campaign data is sent anywhere by this tool.'
 },
 'slug-generator':{
  title:'URL Slug Generator — SEO-Friendly URL and Filename Slugs | UtilityPilot',description:'Turn a title into a readable URL slug with Latin transliteration or Unicode letters, hyphens or underscores.',h1:'URL Slug Generator',
  sections:[
   s('purpose','What a slug is for','<p>A slug is the readable tail of a URL or a filename: <code>cafe-notes-a-better-workflow</code> from “Café notes: A Better Workflow!”. Good slugs are short, stable and meaningful to humans who see them in a shared link. They are not a ranking factor on their own and do not replace descriptive titles or internal linking.</p><p>Generate the slug, then review it in the system that will use it. Some CMSs rewrite slugs again; some filesystems reject characters your slug still contains (for example <code>:</code> on Windows).</p>'),
   s('modes','Latin transliteration versus Unicode','<p><strong>Latin mode</strong> removes combining accents, maps a small explicit set of letters (ß → ss, ø → o, æ → ae) and turns unsupported characters into separators. It is not a complete transliteration engine for every language—Cyrillic, CJK and Arabic characters become separators.</p><p><strong>Unicode mode</strong> keeps letters, marks and numbers from other scripts. Choose it when the non-Latin words are meaningful and must remain readable in the path. Neither mode checks whether the slug already exists on the destination site.</p>'),
   s('examples','Slug examples','<pre>Café notes: A Better Workflow!\n→ cafe-notes-a-better-workflow   (Latin, hyphen)\n→ Cafe_notes_A_Better_Workflow   (Latin, underscore)\n\nДобро утро\n→ dobro-utro                    (Latin transliteration not applied here)\n→ Добро-утро                    (Unicode mode keeps Cyrillic)</pre><p>Punctuation becomes a separator; runs of separators collapse; leading and trailing separators are trimmed. Empty result means no supported characters remained—the tool reports this instead of returning an unusable slug.</p>'),
   s('mistakes','Common slug mistakes','<p>Changing a published slug breaks existing inbound links unless you redirect the old path. Slug length is fine up to a point, but very long slugs truncate in SERPs and chat previews. Do not put dates in slugs for evergreen content you will update—readers and crawlers treat dated paths as archives.</p><p>Unicode slugs are percent-encoded in the address bar; some older tools mishandle them. If the destination system is ASCII-only, prefer Latin mode even if transliteration is imperfect.</p>'),
   s('workflow','Where slugs fit in publishing','<p>Workflow: draft a descriptive title → generate the slug here → paste into the CMS or filename field → keep the title human-readable in the page itself. Related: <a href="/tools/web/url-parser/">URL Parser</a> to inspect an existing address, <a href="/tools/web/utm-builder/">UTM Builder</a> for campaign fields that should not live in the path.</p>')
  ],
  faqs:[
   ['Can a slug be empty?','Yes, if none of the input characters are supported in the selected mode. The tool reports this instead of returning an unusable result.'],
   ['Does a slug improve SEO?','A clean slug helps users and crawlers understand a path. It is one small signal among many; titles, content and links matter more.'],
   ['Should I change slugs on live pages?','Only with redirects from the old URLs. Otherwise shared links and backlinks break.'],
   ['Hyphen or underscore?','Hyphens are the usual web convention for word separation in paths. Underscores are fine for filenames when the system prefers them.'],
   ['Does the tool check if the slug exists?','No. It only transforms your text. Uniqueness must be checked in the destination CMS or filesystem.']
  ],
  privacyNote:'Slug generation is local text processing; the title you paste is not sent anywhere.'
 },
 'csv-deduplicate':{
  title:'Remove Duplicate CSV Rows — Whole-Row or Key Matching | UtilityPilot',description:'Deduplicate CSV records with whole-row or composite key matching and explicit first/last retention.',h1:'Remove Duplicate CSV Rows',
  sections:[
   s('strategy','Whole row versus key columns','<p><strong>Whole-row</strong> duplicates have identical values in every column. <strong>Key duplicates</strong> share selected fields even when other values differ. A customer ID may identify a person; an order ID identifies a transaction. Choose the key that matches your data model—not merely a column that looks unique.</p><p>Never discard rows only because a name looks similar. Shared names and repeated transactions can be legitimate. When unsure, run whole-row first and inspect what remains.</p>'),
   s('keys','Composite keys and exact matching','<p>Enter one-based column positions such as <code>1,2</code> for a composite key. Comparison uses a tuple of field strings, not a delimiter-joined string, so punctuation inside one field cannot impersonate a field boundary. Matching is exact: whitespace, case and leading zeros remain significant.</p><p>Blank values are part of the key unless you clean them first. Letter case differences create different keys. Clean at the source only when your system treats those values as equivalent.</p>'),
   s('examples','Which record survives','<pre>id,address\n007,Old Street\n008,Oak Road\n007,New Street</pre><p>Whole-row: all three records remain (no exact row repeats). Key on column 1, “First”: 007 Old Street survives; 007 New Street is removed. “Last”: 007 New Street survives; retained rows follow last-occurrence order (008 then 007) when that setting is used.</p><p>First/last is a deliberate choice, not a quality judgment. Chronological exports may make “last” meaningful; unordered dumps may not.</p>'),
   s('verify','Verify the discarded count','<p>After deduplication, compare removed and retained counts with the viewer. Spot-check representative records. Then narrow the schema with <a href="/tools/data/csv-column-editor/">CSV Column Editor</a> if the importer needs fewer columns.</p><p>Keep the original export. Deduplication is not a database constraint—future files can reintroduce the same keys. For schema mismatches before merging, align headers first; see <a href="/tools/data/csv-merge/">CSV Merge</a>.</p>'),
   s('limits','Limits and safety','<p>Input limits: 5 MiB per file, 50,000 records, 200 columns. Processing stays in the browser. The tool does not infer business importance, fuzzy-match similar names or sync with a remote database.</p>')
  ],
  faqs:[
   ['Are column positions zero-based?','No. Position 1 means the first column shown in the table.'],
   ['Will it remove rows that only differ by whitespace?','Not unless you enable trimming as part of the key rule at the source. Matching is exact by default.'],
   ['Can I undo a deduplication?','Not inside the tool. Keep the original file; re-load it if you need the discarded rows.'],
   ['What if two records share an ID but different addresses?','Whole-row keeps both. Keying on ID alone discards one according to first/last. Choose deliberately.'],
   ['Does this work on TSV or pipe files?','Yes—select the correct delimiter and header mode before running deduplication.']
  ],
  privacyNote:'Deduplication parses and compares records locally; files are not uploaded to a server.'
 },
 'url-parser':{
  title:'URL and Query-String Parser — Components and Repeated Parameters | UtilityPilot',description:'Break a URL into scheme, host, path, query pairs and fragment while preserving repeated parameters.',h1:'URL and Query-String Parser',
  sections:[
   s('components','What the parser extracts','<p>Complete HTTP(S) URLs are split into scheme, host, port, path, search and fragment using the browser’s URL implementation. Query parameters stay as an ordered list of pairs rather than a collapsed object, so <code>tag=a&amp;tag=b</code> shows two entries. Values are percent-decoded once with strict UTF-8 handling.</p><p>Embedded credentials (user:pass@) are reported as present but redacted in the output. The destination is never fetched. Query-string mode parses a bare <code>?a=1&amp;b=2</code> or <code>a=1&amp;b=2</code> fragment without requiring a full address.</p>'),
   s('plus','Plus signs and form-style spaces','<p>In form-style query decoding, <code>+</code> means space and <code>%2B</code> means a literal plus. In component mode, an unescaped <code>+</code> stays a plus. Select the mode used by the source system—guessing wrong changes search terms and names without producing a syntax error.</p><pre>?q=green+tea   form mode → q = “green tea”\n?x=a+b         component → x = “a+b”</pre>'),
   s('examples','Example parse','<pre>https://user:secret@example.com:8443/search?q=green+tea&tag=a&tag=b#results</pre><p>Reported: scheme https, host example.com, port 8443, path /search, fragment results. Credentials flagged and redacted. Query table: q → green tea (form mode), tag → a, tag → b. Two tag pairs remain separate.</p><p>This structure is useful before cleaning tracking fields (<a href="/tools/web/url-cleaner/">URL Cleaner</a>) or building a campaign link (<a href="/tools/web/utm-builder/">UTM Builder</a>).</p>'),
   s('scope','What parsing does not do','<p>Parsing does not visit the link, verify certificates, detect malware or normalize the query into a unique object. Duplicate keys are legitimate in many systems. Host and path spelling may still be normalized by the browser’s URL implementation even when query pairs are preserved.</p><p>Pasted input with spaces or non-ASCII characters may need encoding first—use <a href="/tools/web/url-encoder-decoder/">URL Encoder / Decoder</a> for component values.</p>')
  ],
  faqs:[
   ['Does the parser visit my link?','No. It inspects the supplied string locally and does not request its destination.'],
   ['Why keep duplicate query keys?','Many APIs and pages accept repeated keys. Collapsing them into an object would lose values.'],
   ['Can I parse a relative path?','Use query-string mode for bare query text. Full component parsing expects an absolute HTTP(S) URL.'],
   ['Are credentials shown in the output?','They are reported as present but redacted. Do not paste production credentials into shared examples.'],
   ['What if the URL has Unicode characters?','Percent-encoded sequences are decoded once with strict UTF-8. Invalid sequences produce an error rather than replacement characters.']
  ],
  privacyNote:'URL parsing is local string inspection; no destination request is made.'
 },
 'csv-column-editor':{
  title:'CSV Column Editor — Keep, Rename and Reorder Fields | UtilityPilot',description:'Select, rename and reorder CSV columns for an import while preserving every field value.',h1:'CSV Column Editor',
  sections:[
   s('schema','Editing schema without touching values','<p>Column selection uses original field positions, not guesses based on content. Unchecking a column drops that field from every record; values in remaining columns are unchanged. Renaming a header changes only the header string—<code>amount_usd</code> → <code>amount_eur</code> does not convert currency.</p><p>Reordering moves every row’s matching field with its header. Output names must be nonempty and unique; duplicate or blank names are rejected rather than silently overwritten.</p>'),
   s('examples','Keep, rename and reorder','<pre>Input:\nid,name,city\n00123,Ada,Lahore\n\nKeep name then id; rename name → full_name:\nfull_name,id\nAda,00123</pre><p>The city column is dropped. Leading zeros in id survive because values are never parsed as numbers. Reload the column controls after changing the input file so the control list matches the new schema.</p>'),
   s('workflow','Before merge and import','<p>Typical use: two exports have the same data in different column orders or with different header spellings. Align both with this tool, then <a href="/tools/data/csv-merge/">merge</a>. For a narrower import schema, uncheck unused fields after alignment. For structural checks first, open the file in <a href="/tools/data/csv-viewer/">CSV Viewer</a>.</p><p>After editing, inspect the exported header order against the receiving application’s documented columns before importing a large batch.</p>'),
   s('mistakes','Common mistakes','<p>Renaming headers to “fix” types does not transform values. Dropping a key column before deduplication removes the ability to deduplicate on it later—reorder operations so keys are still present when needed. After changing the input, always reload controls; stale column lists apply edits to the wrong positions.</p><p>A table with no columns cannot produce useful CSV. Keep at least one field.</p>'),
   s('limits','Limits','<p>5 MiB per input, 50,000 records, 200 columns. The selected input delimiter is used for output. Processing is local; files are not uploaded to a conversion service.</p>')
  ],
  faqs:[
   ['Can I remove every column?','No. A table with no columns cannot produce a useful CSV output. Keep at least one.'],
   ['Does renaming a header change the data?','No. Only the header string changes. Values underneath remain exactly as loaded.'],
   ['Why must headers be unique?','Duplicate names would overwrite fields in JSON conversion and confuse importers. The tool rejects them.'],
   ['Can I create new computed columns?','No. This tool selects, renames and reorders existing fields only.'],
   ['Does it preserve leading zeros?','Yes. Field values are kept as text; no numeric coercion is applied.']
  ],
  privacyNote:'Column editing runs on the file or text you load inside the browser.'
 },
 'image-cropper':{
  title:'Image Cropper — Crop JPEG, PNG and WebP by Ratio or Pixels | UtilityPilot',description:'Crop images with pointer selection, exact pixel coordinates or fixed aspect ratios; inspect exported dimensions.',h1:'Image Cropper',
  sections:[
   s('method','How cropping works','<p>Coordinates refer to the decoded image after EXIF orientation is applied. A crop copies the selected rectangle without resizing its pixels. Drag on the preview for an initial selection, then enter exact left, top, width and height for precision. Fixed-ratio mode derives height from width and rounds to whole pixels.</p><p>The crop must remain entirely inside the source. Out-of-bounds rectangles produce an error—reduce the crop or move its top-left corner. Output dimensions equal the selection size.</p>'),
   s('examples','Example crop','<pre>Source: 400 × 300\nSelection: left 100, top 50, width 200, height 200\n\nOutput: 200 × 200 square from the centre-right of the frame.</pre><p>Pixels outside the rectangle are omitted permanently in the export. Ratio 1:1 with width 200 derives height 200. Ratio 16:9 with width 320 derives height 180.</p>'),
   s('choose','Crop or resize?','<p>Crop removes content; resize changes scale while keeping the whole image (unless you later crop). Use crop when composition can change—photographs, screenshots with unused margins. Use aspect-preserving resize when every part of the image must remain visible. Stretch is a third option and only when changing proportions is intentional.</p><p>After cropping, check byte size separately: a square crop can still exceed an upload limit. Compress with <a href="/tools/image/image-compressor/">Image Compressor</a> if needed. Related guide: <a href="/guides/crop-versus-resize/">Crop or resize an image to fit a frame</a>.</p>'),
   s('scope','What cropping does not do','<p>It does not detect faces, subjects or safe areas—you choose the rectangle. It does not upscale, denoise or re-encode with different dimensions beyond the crop. Very small crops cannot gain detail by later enlargement. EXIF and other metadata of the exported raster are not guaranteed to match the source.</p>')
  ],
  faqs:[
   ['Does it detect faces or subjects?','No. You choose the crop area, so review the composition yourself.'],
   ['Can I crop outside the image bounds?','No. Out-of-bounds rectangles are rejected. Adjust left/top or reduce width/height.'],
   ['Does fixed ratio lock both dimensions?','Yes. Height is derived from width (or vice versa) and rounded to whole pixels.'],
   ['Will cropping reduce file size?','Often yes because fewer pixels are encoded, but it is not guaranteed—check actual bytes after export.'],
   ['Is the original kept?','The source file on your device is untouched. The export is a new raster file.']
  ],
  privacyNote:'Image decoding and cropping happen in the browser canvas; the file is not uploaded.'
 },
 'image-converter':{
  title:'Image Format Converter — JPEG, PNG and WebP | UtilityPilot',description:'Convert between JPEG, PNG and WebP in the browser with explicit matte choice for transparency.',h1:'Image Format Converter',
  sections:[
   s('formats','What each format is for','<p><strong>JPEG</strong> — lossy compression, no alpha; good for photographs. <strong>PNG</strong> — lossless or near-lossless raster with alpha; good for logos, screenshots and sharp text. <strong>WebP</strong> — modern format supporting lossy/lossless and alpha, subject to browser encoder support.</p><p>Changing a file extension does not convert anything. This tool decodes pixels and re-encodes them through the browser’s supported encoder. The exported MIME type is checked rather than inferred from the filename.</p>'),
   s('alpha','Transparency must land somewhere','<p>JPEG has no transparency channel. Transparent regions are composited against the matte colour you choose (white is common, not universal). Preview edges as well as large transparent areas—partially transparent pixels blend with the matte. PNG and WebP can retain alpha.</p><p>Converting JPEG → PNG cannot recover detail already lost to JPEG compression. Animated GIF, SVG and HEIC are not accepted in this release rather than being silently mis-decoded.</p>'),
   s('examples','Conversion example','<pre>Transparent PNG logo → JPEG, background #ffffff\n\nTransparent regions become white pixels.\nOutput dimensions unchanged; file is a real JPEG re-encode.</pre><p>Reverse path: JPEG → PNG keeps the decoded pixels losslessly from the JPEG’s current state; it does not restore original photographic detail.</p>'),
   s('workflow','Choosing a format in a pipeline','<p>Inspect first with <a href="/tools/image/image-inspector/">Image Inspector</a>. Convert only when the destination requires a specific format. If a byte limit also applies, compress after converting (or during, if the compressor’s format matches). Keep the original file—conversions are not generally reversible.</p><p>For dimensions changes, use <a href="/tools/image/image-resizer/">Image Resizer</a> before or after conversion as the workflow requires. Guide: <a href="/guides/image-pixels-bytes-formats/">Image pixels, file size and formats explained</a>.</p>')
  ],
  faqs:[
   ['Will converting to PNG restore JPEG detail?','No. It can preserve the decoded pixels, but information already lost to JPEG compression cannot be recovered.'],
   ['Why not accept GIF or SVG?','Animations and vector formats need different handling; this release supports static JPEG, PNG and WebP only.'],
   ['Does conversion preserve EXIF?','Exports are new raster files. Do not assume metadata is preserved or treat the export as a certified metadata scrub.'],
   ['Can I convert to a custom quality?','JPEG/WebP quality control lives in the compressor tool when a byte target matters. This tool performs a standard re-encode.'],
   ['Is the original modified?','No. The file you selected is only read; the result is a separate download.']
  ],
  privacyNote:'Pixels are decoded and re-encoded locally; no image is uploaded to a conversion service.'
 },
 'image-inspector':{
  title:'Image Size and Dimension Checker — Bytes, Pixels, Aspect Ratio | UtilityPilot',description:'Check image dimensions, actual file bytes, aspect ratio and transparency before editing or uploading.',h1:'Image Size and Dimension Checker',
  sections:[
   s('metrics','What the inspector reports','<p><strong>Pixel dimensions</strong> (width × height) from the decoded image with display orientation applied. <strong>File bytes</strong> from the selected file on disk. <strong>Decimal KB</strong> = bytes ÷ 1,000; <strong>binary KiB</strong> = bytes ÷ 1,024. <strong>Aspect ratio</strong> reduced by the greatest common divisor (400×300 → 4:3). <strong>Detected format</strong> from the file header, which may differ from the filename extension. <strong>Transparency</strong> whether any pixel has alpha below opaque.</p>'),
   s('why','Why bytes and pixels are separate questions','<p>An upload form may cap format, dimensions and file size independently. A 400 × 300 plain-colour logo and a detailed photograph at the same dimensions can differ by an order of magnitude in bytes. Pixel dimensions do not predict compressed size; complexity, encoder and metadata do.</p><pre>400 × 300 · 204,800 bytes\n→ 4:3 · 204.8 KB decimal · 200 KiB binary</pre><p>“200 KB” on a form often means 200,000 bytes. 200 KiB is 204,800 bytes and would exceed that cap. Read the requirement in the same units the form uses, then compress accordingly.</p>'),
   s('workflow','Inspect before you edit','<p>Workflow: inspect → resize if dimensions must change (<a href="/tools/image/image-resizer/">Resizer</a>) → convert if format must change (<a href="/tools/image/image-converter/">Converter</a>) → compress toward a byte target (<a href="/tools/image/image-compressor/">Compressor</a>) → re-inspect the download. Each step can change bytes; only the final inspector reading is authoritative for the file you will submit.</p><p>The built-in sample is a generated coloured graphic; its exact encoded size varies by browser. Guide: <a href="/guides/image-pixels-bytes-formats/">Image pixels, file size and formats explained</a>.</p>'),
   s('scope','What the inspector does not do','<p>It does not enumerate EXIF tags, prove that GPS metadata is absent, validate colour profiles for print, or guarantee that a destination will accept the file. DPI/print-resolution tags are separate from screen pixel dimensions and are not changed here.</p>')
  ],
  faqs:[
   ['Does DPI determine screen dimensions?','Screen pixel dimensions come from width and height. A print-resolution tag is a separate concern and is not changed by this inspector.'],
   ['Why do KB and KiB differ?','KB uses 1,000 bytes per unit; KiB uses 1,024. Upload forms often mean decimal KB—check the form’s wording.'],
   ['Can the detected format differ from the extension?','Yes. The inspector reads the file header. A .png that is really a JPEG is reported as JPEG.'],
   ['Does it check whether the image is “good enough”?','No. It reports objective metrics only. Quality judgments are yours or the destination’s.'],
   ['Is a sample image uploaded?','No. Everything is decoded locally in the browser.']
  ],
  privacyNote:'Image inspection decodes the file locally; nothing is sent to a server.'
 },
 'csv-viewer':{
  title:'CSV Viewer and Validator — Inspect Columns and Records | UtilityPilot',description:'Inspect a CSV or TSV before importing: columns, record counts, delimiter detection and clear syntax errors.',h1:'CSV Viewer and Validator',
  sections:[
   s('inspect','What you see before importing','<p>Choose a local file or paste table text. Select delimiter, header mode and encoding. The screen preview shows the first 50 data records; the full record count is reported separately. Exports contain all accepted records within the stated limits—not only the preview.</p><p>Records are parsed independently of physical line breaks: a newline inside quotes belongs to its field. Every record must have the same number of fields. Malformed quoting and inconsistent widths stop processing with a clear error instead of producing a silent partial file.</p>'),
   s('diagnose','Diagnosing common load failures','<p><strong>One column</strong> — wrong delimiter; try semicolon or tab. <strong>Garbled text</strong> — wrong encoding; choose UTF-8, UTF-16 or Windows-1252 to match the source. <strong>Extra columns mid-file</strong> — an unquoted delimiter inside a value, or a record width mismatch. <strong>Missing first header</strong> — a UTF-8 BOM was present; it is stripped from parsing, not part of the first header.</p><p>This is a structural check, not verification that a postal code, email or business value is correct. Guide: <a href="/guides/csv-import-troubleshooting/">Fix CSV import problems without damaging values</a>.</p>'),
   s('examples','Example inspection','<pre>name,note\nAda,"Hello, world"\nSam,Plain</pre><p>Two data records, two columns. The comma inside the quoted note stays in the field. If this file were loaded as semicolon-delimited, both rows would appear as a single column—select the correct delimiter before judging the data.</p>'),
   s('next','After inspection','<p>Common next steps: <a href="/tools/data/delimiter-converter/">change the delimiter</a>, <a href="/tools/data/csv-column-editor/">adjust columns</a>, <a href="/tools/data/csv-deduplicate/">remove duplicate rows</a>, <a href="/tools/data/csv-to-json/">convert to JSON</a>, or <a href="/tools/data/csv-merge/">merge</a> aligned files. Keep the original export throughout.</p><p>Limits: 5 MiB per input, 50,000 records, 200 columns. Preview truncation does not truncate downloads.</p>')
  ],
  faqs:[
   ['Does the preview truncate my download?','No. Only the table preview is limited to 50 records. Exports contain all accepted records within the limits.'],
   ['Can the tool fix broken quoting?','No. It reports the error. Repair the source file or correct the delimiter/encoding choice.'],
   ['Which encodings are supported?','UTF-8 (default), UTF-16 and Windows-1252. Choose the encoding the source system actually uses.'],
   ['Is this a spreadsheet?','No. It is an inspector with optional download. It does not edit cell values or recalculate formulas.'],
   ['Will opening here change my file?','No. The file is read locally; nothing is rewritten unless you download an explicit export.']
  ],
  privacyNote:'CSV inspection parses your file in the browser; it is not uploaded for conversion.'
 },
 'csv-merge':{
  title:'CSV Merge — Append Multiple Exports Under One Header | UtilityPilot',description:'Combine two to ten CSV files with identical schemas; review per-file record counts before downloading.',h1:'CSV Merge',
  sections:[
   s('schema','Identical headers are required','<p>Every file must have identical header names in identical order. Merge appends data records in input order and writes the first header once. A header-only file contributes no data rows. Schema mismatches are blocked instead of silently filling or dropping fields—this prevents accidental data loss when two exports differ by a column.</p><p>Align differing files first with <a href="/tools/data/csv-column-editor/">CSV Column Editor</a> (rename, reorder, drop), then merge the adjusted files.</p>'),
   s('order','Ordering and counts','<p>Files are merged in the order you arrange them. The result shows per-file record counts so you can reconcile against source row counts. Up to 10 MiB combined input and 50,000 output records are supported. Up to ten files can be selected, or two pasted inputs.</p><pre>File A: id,name · 1,Ada\nFile B: id,name · 2,Sam\n\nMerged:\nid,name\n1,Ada\n2,Sam</pre>'),
   s('not-join','Appending is not a join','<p>Merge concatenates rows; it does not match keys across files like a database join. Duplicate keys across files remain duplicates—deduplicate afterwards with <a href="/tools/data/csv-deduplicate/">CSV Deduplicate</a> if needed. Shared headers do not imply shared business meaning; verify counts and sample rows after merging.</p>'),
   s('workflow','Safe merge workflow','<p>1) Inspect each file in <a href="/tools/data/csv-viewer/">CSV Viewer</a>. 2) Align schemas in Column Editor. 3) Merge and review per-file counts. 4) Deduplicate or split if the importer needs batches (<a href="/tools/data/csv-split/">CSV Split</a>). 5) Re-open a synthetic merged file in the destination before processing a larger batch.</p><p>Keep originals. Merging does not remove duplicates or normalize values.</p>')
  ],
  faqs:[
   ['Can files have different columns?','No. Schema mismatches are blocked. Align names and order with CSV Column Editor first.'],
   ['Does merge remove duplicate records?','No. It appends. Use CSV Deduplicate afterwards if duplicates must go.'],
   ['How many files can I combine?','Two to ten files, up to 10 MiB combined input and 50,000 output records.'],
   ['What if one file has only a header?','It contributes zero data rows. The merged output still contains the shared header once.'],
   ['Is the order of rows preserved?','Yes—files merge in the order you set, and rows keep their order within each file.']
  ],
  privacyNote:'Multiple files are parsed and combined in the browser; they are not uploaded for merging.'
 },
 'image-resizer':{
  title:'Image Resizer — Fit, Stretch or Scale JPEG, PNG, WebP | UtilityPilot',description:'Resize images with aspect-ratio lock, bounding-box fit, percentage scaling or explicit stretch to exact pixels.',h1:'Image Resizer',
  sections:[
   s('modes','Fit, stretch and percentage','<p><strong>Fit</strong> scales by the smaller width/height ratio so both bounds are respected; the image stays proportional (400×300 fitted inside 200×200 → 200×150). <strong>Stretch</strong> changes proportions only when the aspect lock is off. <strong>Percentage</strong> scales both dimensions together. Displayed orientation is applied before measuring.</p><p>Enlarging requires explicit permission and adds interpolated pixels—it does not recover detail absent from the source. The output reports actual dimensions and file size so you can verify the result.</p>'),
   s('examples','Resize examples','<pre>Source 400 × 300\nFit inside 200 × 200  → 200 × 150\nStretch to 200 × 200  → 200 × 200 (aspect lock off)\nScale 50%             → 200 × 150</pre><p>A destination that displays the result may add its own padding; the tool does not invent letterbox bars. Compare exported dimensions with the requirement, then check bytes separately if a size cap also applies.</p>'),
   s('pipeline','Pixels versus bytes','<p>Changing pixels is not the same as meeting a byte limit. Workflow: resize to required dimensions → convert format if needed → compress toward the byte target → re-inspect the download. Halving width and height cuts pixel count to one quarter, but compressed bytes do not follow a fixed ratio.</p><p>Guide: <a href="/guides/crop-versus-resize/">Crop or resize an image to fit a frame</a>. When composition can change instead, use <a href="/tools/image/image-cropper/">Image Cropper</a>.</p>'),
   s('scope','What resizing does not do','<p>It does not preserve EXIF as a guarantee—exports are new raster files and must not be treated as a certified metadata-removal process. It does not upscale intelligently (no AI detail synthesis). It does not compress toward a byte target; that is the compressor’s job.</p>')
  ],
  faqs:[
   ['Does this preserve EXIF metadata?','Exports are new raster files. Do not rely on them to preserve metadata or to provide a certified metadata-removal process.'],
   ['Why does fit not fill a square box?','Fit keeps proportions. The unused space is not padded by the tool; a destination may add its own background.'],
   ['Can I upscale an image?','Yes, with explicit permission. Enlargement interpolates pixels and cannot restore original detail.'],
   ['Does resizing guarantee a smaller file?','Usually, but not by a fixed ratio—content complexity and format matter. Check actual bytes after export.'],
   ['Which formats are supported?','Static JPEG, PNG and WebP up to 10 MiB and 16 megapixels.']
  ],
  privacyNote:'Resizing runs on a local canvas; the image file is not uploaded to a server.'
 },
 'image-color-picker':{
  title:'Image Color Picker — Sample HEX, RGB and HSL from Pixels | UtilityPilot',description:'Pick a color from an exact pixel or average a small square; copy HEX, RGB and HSL for design work.',h1:'Image Color Picker',
  sections:[
   s('sample','Pixel and square sampling','<p>X and Y start at zero in the top-left corner of the decoded image (orientation applied). Click or tap the preview, or enter coordinates. Square sample extends right and down from that coordinate; channels are arithmetically averaged across the selected pixels, including alpha. Values represent the browser’s decoded sRGB image.</p><p>Single-pixel sampling is best for flat UI colours. Square averaging reduces noise on photographic or anti-aliased areas. Neither mode guesses a palette or dominant colours—it samples only what you select.</p>'),
   s('examples','Sampling example','<pre>Coordinate (12, 40) on a solid red region\n\nHEX #ff0000\nRGB rgb(255 0 0)\nHSL hsl(0 100% 50%)</pre><p>Copy the notation you need. To translate between notations further, use <a href="/tools/web/color-converter/">Color Converter</a>. To check a text colour against a background, open <a href="/tools/web/contrast-checker/">Contrast Checker</a> with the sampled HEX.</p>'),
   s('accuracy','Accuracy and colour profiles','<p>A sampled pixel is not necessarily a brand’s official colour. Anti-aliased edges, JPEG artifacts, display profiles and partial transparency all shift values. Transparent pixels need a background before contrast testing. The tool does not manage ICC profiles or convert between display gamuts.</p><p>For brand colours, prefer the official HEX/CMYK from the design system; use sampling when you only have a raster screenshot.</p>'),
   s('workflow','From pixel to design token','<p>Workflow: open image → sample (pixel or square) → copy HEX → convert notation if needed → check contrast for actual text size/weight → record the value in your design tokens. Keep the source image if you will sample again after edits.</p>')
  ],
  faqs:[
   ['Is this a palette generator?','No. It samples the coordinate or square you select rather than guessing dominant colours.'],
   ['Why does the HEX differ from the official brand colour?','Anti-aliasing, compression, display profile and transparency all affect a sampled pixel. Use official brand values when available.'],
   ['Can I sample a transparent pixel?','Yes, but the value includes alpha. Composite against a real background before contrast checking.'],
   ['Does it support wide-gamut displays?','Sampling reports decoded sRGB values. Wide-gamut colour management is outside this tool.'],
   ['Is the image uploaded?','No. Decoding and sampling happen in the browser.']
  ],
  privacyNote:'Images are decoded and sampled locally; no pixel data leaves the page.'
 },
 'csv-split':{
  title:'CSV Split — Break Large CSV Files into Import Batches | UtilityPilot',description:'Split a CSV into numbered record batches with repeated headers and a manifest of per-file counts.',h1:'CSV Split',
  sections:[
   s('records','Split by records, not physical lines','<p>Splitting happens after parsing, so quoted multiline fields stay together in one record. You choose data records per part and whether to repeat the header in each file. Repeated headers do not count toward the batch size. The final part contains remaining records even when fewer than the selected batch size.</p><p>Part names are sequential (part-001.csv, part-002.csv, …). A 100-part limit prevents accidental generation of thousands of downloads.</p>'),
   s('examples','Example split','<pre>Three data records; two records per part\n\npart-001.csv: header + 2 data records\npart-002.csv: header + 1 data record</pre><p>The main download is a manifest describing each part and its record count. Use each numbered Download button to save its CSV file. Verify that the counts add up to the original before submitting to an importer.</p>'),
   s('limits','Row count is not byte size','<p>A row-count limit is not a byte-size limit. Records vary greatly in length. If an import has a strict megabyte cap, inspect each part’s file size after download—not only the record counts. The 10 MiB input and 50,000 record limits still apply to the source.</p><p>When to split: importer rejects large uploads; you need per-batch review; or a downstream process expects fixed-size chunks. When not to: when the destination accepts the full file—unnecessary splits add reassembly work.</p>'),
   s('workflow','Split safely','<p>1) Inspect in <a href="/tools/data/csv-viewer/">CSV Viewer</a>. 2) Align schema if needed (<a href="/tools/data/csv-column-editor/">Column Editor</a>). 3) Split with header repeat on for standalone parts. 4) Download parts and the manifest. 5) Spot-check one part in the destination. Keep the original intact.</p><p>For combining aligned files later, see <a href="/tools/data/csv-merge/">CSV Merge</a>.</p>')
  ],
  faqs:[
   ['Will a field with a line break be split?','No. A quoted newline remains inside its original CSV record.'],
   ['Do repeated headers count toward the batch size?','No. Batch size counts data records only.'],
   ['What does the main download contain?','A manifest listing each part file and its record count. Individual CSVs are separate downloads.'],
   ['How many parts can I create?','Up to 100. The source is also limited to 10 MiB and 50,000 records.'],
   ['Can I split by file size instead of records?','Not in this release. Split by records, then check each part’s bytes if a size cap matters.']
  ],
  privacyNote:'Parsing and splitting run locally; files are not uploaded to a splitting service.'
 },
 'image-compressor':{
  title:'Image Compressor — Meet Upload Byte Limits with Honest Results | UtilityPilot',description:'Compress JPEG, PNG or WebP toward a decimal KB target and see whether the target was actually met.',h1:'Image Compressor',
  sections:[
   s('target','Decimal KB and honest reporting','<p>Enter the target in decimal KB: 200 KB means at most 200,000 bytes. A 204,800-byte file is 200 KiB and exceeds that target—the result reports actual bytes and never presents an unmet target as success. Dimensions stay unchanged unless you explicitly allow resizing.</p><p>JPEG and WebP use a bounded search to retain the highest tested quality that meets the target, or the smallest tested candidate when none meets it. PNG is re-encoded but does not have the same lossy quality control; a PNG may become larger after re-encoding.</p>'),
   s('workflow','Quality first, then dimensions','<p>1) Choose accepted output format and maximum quality. 2) Compress and read the target result. 3) If unmet, allow smaller dimensions (or pre-resize with <a href="/tools/image/image-resizer/">Image Resizer</a>). 4) Re-compress from the original, not from an intermediate lossy file. 5) Inspect text, fine lines and gradients in the preview before download.</p><p>Successive lossy exports accumulate damage. Always restart from the original source when tightening the target. Guide: <a href="/guides/compress-image-to-upload-limit/">Reduce an image for an upload limit</a>.</p>'),
   s('formats','Format choices under a byte cap','<p>Photographs usually reach small sizes as JPEG or lossy WebP. Screenshots with text and flat colour often do better as PNG or lossy WebP with careful quality. Transparency requires PNG or WebP; JPEG needs an opaque matte via the <a href="/tools/image/image-converter/">Converter</a> first.</p><p>Pixel dimensions and format interact: halving both dimensions cuts pixel count to a quarter, after which quality can often be raised while still meeting the byte target.</p>'),
   s('scope','What compression cannot do','<p>Some targets are impossible for the chosen format and dimensions. The tool explicitly reports failure rather than claiming a false success. It does not use AI detail synthesis, does not guarantee visual perfection and does not certify that the destination will accept the file. Browser encoders can differ slightly between versions.</p>')
  ],
  faqs:[
   ['Can you guarantee a target without quality loss?','No. Some targets are impossible for the chosen format and dimensions. The result explicitly reports when the target is not met.'],
   ['Why did my PNG get larger?','PNG re-encoding does not use JPEG-style quality search. Complex images can grow. Try WebP or JPEG if the destination allows.'],
   ['Should I compress a compressed file again?','No—start from the original each time. Repeated lossy passes degrade detail.'],
   ['Does resizing happen automatically?','Only if you allow it. By default dimensions stay fixed; enable resizing when quality alone cannot meet the target.'],
   ['Is the result guaranteed to upload?','The tool reports bytes honestly, but the destination may have additional rules (dimensions, format, content). Test the actual upload.']
  ],
  privacyNote:'Compression runs on local canvas pixels; the image never leaves the browser for processing.'
 }
};
export function upgradeThinContent(content){
 for(const [slug,update] of Object.entries(upgrades)){
  const old=content[slug];if(!old)continue;
  content[slug]={
   ...old,...update,
   sections:[
    s('use','How to use this tool','<ol>'+old.steps.map(x=>'<li>'+e(x)+'</li>').join('')+'</ol>'),
    s('method','How the operation works','<p>'+e(old.explanation)+'</p>'),
    ...update.sections,
    s('original-example','A worked example',`<pre>${e(old.example[0])}</pre><p>${e(old.example[1])}</p><p>${e(old.mistake)}</p>`),
    privacy(update.privacyNote||'This operation runs in your browser on the material you select.')
   ],
   faqs:update.faqs
  };
 }
 // Extra FAQs for hybrid tools that still have only one pair
 const extraFaqs={
  'json-formatter':[
   ['Is formatting the same as validation?','Formatting parses the document first; a successful format implies supported JSON syntax. It does not validate an application schema or required fields.'],
   ['Why reject duplicate keys?','Different consumers choose different surviving values. Rejecting them avoids silent ambiguity in downstream systems.'],
   ['Can I minify without losing string spaces?','Yes. Minification removes structural whitespace only; spaces inside strings remain data.'],
   ['What if my JSON is actually YAML?','Use JSON / YAML Converter with explicit type rules instead of reformatting punctuation by hand.']
  ],
  'base64':[
   ['Is Base64 encryption?','No. Anyone with the encoded string can decode it without a password. It is representation, not secrecy.'],
   ['Why does padding matter?','Standard Base64 requires complete groups. Invalid or noncanonical padding stops decoding rather than guessing.'],
   ['What if the decoded bytes are not text?','The tool shows a hex preview and offers a binary download of the exact bytes.'],
   ['Base64 or Base64URL?','URL-safe mode uses hyphen/underscore and can omit padding. Match the alphabet to the source system.']
  ],
  'contrast-checker':[
   ['Does passing AA mean the page is accessible?','No. Keyboard access, labels, focus and other requirements need separate review.'],
   ['What about gradients and images behind text?','Composite the actual colours behind the text first; one pair cannot represent a varying background.'],
   ['Is this APCA?','No. Results are WCAG 2.x relative-luminance ratios, not APCA scores.'],
   ['Why can 4.50 still fail?','Display rounds to two decimals; Pass/Fail uses the unrounded calculation.']
  ],
  'url-encoder-decoder':[
   ['Should I encode an entire URL?','No—encode component values only. Structural separators must stay unescaped for the address to work.'],
   ['Why decode only one layer?','Repeated decoding can change meaning. One explicit pass keeps control; decode again only if another layer is intended.'],
   ['What about invalid escapes?','They are rejected with an error rather than replaced with replacement characters.'],
   ['Is this the same as HTML entities?','No. Percent escapes and ampersand references are different layers—see HTML Entity tool for the latter.']
  ],
  'json-to-csv':[
   ['Can I convert a single object?','Wrap it in square brackets to make a one-record array. Empty arrays have no tabular schema and are rejected.'],
   ['What happens to nested arrays?','They stay serialized JSON inside one cell; they do not multiply into several rows.'],
   ['Are null and missing different?','Both become empty cells in CSV, so a round trip cannot reconstruct the distinction.'],
   ['Why prefix formula-like cells?','Spreadsheet-safe mode reduces the chance a spreadsheet treats the cell as a formula. Turn it off only for trusted importers.']
  ],
  'csv-to-json':[
   ['Will numeric identifiers be rounded?','Default string mode preserves them. Typed numeric tokens are serialized directly; the reading application must also support their precision.'],
   ['What if headers are duplicated?','They are rejected rather than overwriting fields. Fix the source or rename in Column Editor first.'],
   ['Can a cell contain JSON?','It stays a string unless you deliberately parse it elsewhere. Conversion does not expand cell JSON into objects.'],
   ['TSV as well as CSV?','Yes—select tab as the delimiter and the correct header mode.']
  ],
  'html-entities':[
   ['Does decoding remove dangerous code?','No. It only changes representation. Decoded markup is shown as inert text here; another application must handle it safely.'],
   ['Named or numeric references?','Both are understood. Numeric mode can target specific code points when you need them.'],
   ['Is one decoding pass enough?','Usually—unless the source contains double-encoded text. Inspect the result before decoding again.'],
   ['Can I use this as a sanitizer?','No. Context-appropriate escaping/sanitizing belongs in the application that receives the text.']
  ]
 };
 for(const [slug,faqs] of Object.entries(extraFaqs)){
  if(content[slug]&&!content[slug].faqs?.length)content[slug].faqs=faqs;
  else if(content[slug]&&content[slug].faqs?.length===1)content[slug].faqs=[...content[slug].faqs,...faqs];
 }
}
