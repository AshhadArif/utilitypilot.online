import {readFile,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';

// Preserve the supplied strings: blank metrics are unknown, not zero.
const rows=JSON.parse((await readFile('docs/research/ahrefs-text-keywords.json','utf8')).replace(/^\uFEFF/,''));
const decisions=new Map();
function group(keywords,page,role,action,intent,reason){for(const keyword of keywords.split('|'))decisions.set(keyword,{page,role,action,intent,reason});}
group('word counter','word-counter','Primary','Expand existing page','Count words in pasted text','Expand counting methodology, examples and writing workflows.');
group('word counter online|count words in text','word-counter','Supporting','Consolidate into existing page','Count words in pasted text','Same task and existing counting interface.');
group('character counter|character counter online|count characters in text','word-counter#character-counter','Supporting','Add supporting section','Count characters with and without whitespace','Existing counter already reports graphemes and code points; explain both without a duplicate tool.');
group('line counter|count lines in text','word-counter#line-counter','Supporting','Add supporting section','Count physical text lines','Existing Lines metric; explain blank lines and final terminators.');
group('text analyzer','word-counter#text-analysis','Supporting','Add supporting section','Inspect basic text metrics','Cover only the seven implemented metrics; no readability, sentiment or keyword-density claims.');
group('compare text','text-diff','Primary','Expand existing page','Identify edits between two versions','Highest-volume comparison phrase; preserve the existing text-diff route.');
group('text diff|compare two texts|text comparison tool','text-diff','Supporting','Consolidate into existing page','Identify edits between two versions','One sequence-comparison interface; compare-lists remains a distinct membership task.');
group('title case converter','case-converter#title-case','Primary','Expand existing page','Capitalize a title','Highest-volume supported case query; disclose mechanical capitalization and no named style-guide support.');
group('lowercase converter|uppercase converter|convert text to lowercase|convert text to uppercase|convert text to title case|text case converter','case-converter','Supporting','Consolidate into existing page','Change capitalization','Existing selectable modes; add mode-specific headings and examples, not separate routes.');
group('alphabetize list','sort-lines','Primary','Expand existing page','Arrange entries alphabetically','Existing alphabetical sorting with descending and language options.');
group('sort list alphabetically|sort list online|sort text alphabetically|sort lines','sort-lines','Supporting','Consolidate into existing page','Sort newline-separated items','Explain A–Z, Z–A, natural, numeric, length and reverse modes on one page.');
group('text cleaner','text-cleaner','Primary','Expand existing page','Repair spacing and line breaks','Explain exact defaults, operation order and preserved text.');
group('text formatter|format text online|clean up text online|remove extra spaces','text-cleaner','Supporting','Add supporting section','Format plain-text whitespace','Bounded plain-text formatting only; link to case conversion and literal replacement.');
group('remove whitespace','text-cleaner#whitespace','Supporting','Add supporting section','Remove or normalize unwanted whitespace','Describe supported whitespace operations; removing every whitespace type in one pass is not supported.');
group('remove blank lines|remove empty lines','text-cleaner#blank-lines','Supporting','Add supporting section','Reduce unwanted empty lines','Partial fit: collapse runs to one blank separator; do not promise total blank-line removal.');
group('remove duplicate lines','remove-duplicate-lines','Primary','Expand existing page','Keep unique line entries','Explain exact, case, trim, NFC and first/last matching.');
group('duplicate line remover|remove duplicate lines online','remove-duplicate-lines','Supporting','Consolidate into existing page','Keep unique line entries','Same task, one canonical route.');
group('find and replace text','find-and-replace','Primary','Expand existing page','Replace literal repeated text','Explain case, whole-word boundaries, non-overlap and literal replacement.');
group('remove spaces from text','find-and-replace#remove-spaces','Supporting','Add supporting section','Delete ordinary spaces','Literal space with empty replacement is supported; distinguish tabs and other whitespace.');
group('comma separated list','find-and-replace#comma-separated-list','Supporting','Add supporting section','Join a simple list with commas','Actual newline replacement works for simple entries; explicitly exclude CSV quoting and automatic trailing-separator cleanup.');
group('text to list|list to text','find-and-replace#text-to-list','Supporting','Add supporting section','Split or join using a known delimiter','Literal multiline Find/Replace controls already support this workflow.');
group('text converter','—','Not targeted','Ignore','Broad conversion or decorative fonts','Parent Keyword is font generator; no decorative-font tool or sufficiently specific supported intent.');
group('text separator','—','Not targeted','Ignore','Ambiguous separators or decorative dividers','Parent Keyword is text dividers; no decorative divider generator. Explain literal delimiters under text-to-list instead.');
group('remove duplicate words','—','Not targeted','Ignore','Deduplicate words within a passage','Line deduplication is not word deduplication; splitting prose would destroy its structure.');
assert.equal(rows.length,44);assert.equal(decisions.size,44);
const cell=s=>String(s??'').replace(/\|/g,'\\|').replace(/\r?\n/g,' ');
let doc=`# UtilityPilot Ahrefs content map

Prepared 28 September 2026 before website implementation. Source: [original Ahrefs export](research/google_us_alphabetize-list-character_overview_2026-09-28_23-38-58.csv), Google US, 44 rows. Despite its .csv extension the supplied file is quoted, tab-delimited. [Normalized source rows](research/ahrefs-text-keywords.json) retain every supplied field as a string. Original SHA-256: B46AF4C54BC61A4070144B0BED8E51E6F653CB442552DD58A5F29DE768536A5B. Regenerate this map with \`node scripts/ahrefs-content-map.mjs\`.

## Evidence and interpretation

Volume, Difficulty (KD), Traffic potential and Parent Keyword below are the exact supplied US values. “Not supplied” means an empty source cell; zero stays zero. Parent Keyword is Ahrefs' Parent Topic field in this export. Intent and actions are editorial judgments checked against current source code, not additional Ahrefs metrics. All rows are retained, including ignored opportunities. The export labels most queries Informational; actionable tool intent is described more precisely below.

The unusually low Traffic Potential for “word counter” (2,500), zero for “character counter”, typo parents “word ocunter” and “characted counter”, and 1,010,000 Traffic Potential for “word counter online” are preserved, not corrected or treated as traffic forecasts. Parent Topics can be noisy: “alphabetize list” points to a Docs tutorial even though a list sorter fits the query. No volumes are invented for phrases mentioned in the brief but absent from the export.

## Existing architecture and consolidation

The repository has 32 tools: 8 Text & Lists, 9 Data & Tables, 6 Images and 9 Web & Publishing. Static generation in scripts/build.mjs uses src/render.mjs, tools.json, configs.mjs and tool-content.mjs. There are 12 guides, four category hubs, related tools/guides, browser search, 59 HTML routes and 57 sitemap URLs. Counting, cleaning, comparison and case conversion run in local workers.

There are no separate Character Counter, Line Counter, Text Analyzer, Title Case, Uppercase, Lowercase, Text Formatter, Remove Blank Lines or Comma Separated List routes. Word Counter already supplies character/line statistics; Case Converter has four modes; Text Cleaner has selected whitespace operations; Find and Replace supports literal newline delimiters. Expand these capabilities on their current routes with descriptive fragment links. Compare Lists answers set membership; Text Diff answers sequence changes. Retain both, explain the distinction, and keep compare-text keywords on Text Diff.

## Priority by evidence and fit

1. Word Counter, including character/line/basic analysis sections: word counter 782,000/KD 0; character counter 160,000/KD 0; line counter 5,300/KD 65. Highest demand and already implemented metrics.
2. Text Diff: compare text 13,000/KD 73 and text diff 3,900/KD 0. One page; KD differences do not create different intents.
3. Case Converter: title case converter 8,600/KD 0, plus upper/lower at 900 each. Moves ahead of alphabetizing on supplied demand, with a clear style-rule limitation.
4. Sort Lines: alphabetize list 3,200/KD 0 and supporting sorting queries.
5. Text Cleaner: text formatter 800/KD 55, text cleaner 700/KD 29, whitespace 450/KD 5. Favor direct cleanup intent; formatting is qualified.
6. Find and Replace: comma separated list 2,100/KD 41 is a conditional workflow, not a full CSV maker; prioritize accurate delimiter examples alongside the direct 70/KD 6 query.
7. Remove Duplicate Lines: direct 100/KD 4 plus two close variants.
8. Compare Lists: supporting editorial expansion to distinguish membership from document changes. No exact keyword/volume for this task is supplied in this CSV.

No cluster volumes are added together and no ranking guarantee is implied. All eight existing text pages will receive useful content; no new pages or redirects are planned.

## Keyword decisions

| Keyword | Volume | KD | Traffic Potential | Parent Topic (supplied) | Intent | Existing Page | Primary/Supporting | Action | Reason |
|---|---:|---:|---:|---|---|---|---|---|---|
`;
for(const r of rows){const d=decisions.get(r.Keyword);assert.ok(d,r.Keyword);const page=d.page==='—'?'—':`/tools/text/${d.page.split('#')[0]}/${d.page.includes('#')?'#'+d.page.split('#')[1]:''}`;doc+='| '+[r.Keyword,r.Volume||'Not supplied',r.Difficulty||'Not supplied',r['Traffic potential']||'Not supplied',r['Parent Keyword']||'Not supplied',d.intent,page,d.role,d.action,d.reason].map(cell).join(' | ')+' |\n';}
doc+=`
## Current search research and limits

Research conducted 28 September 2026. Direct Google US requests used gl=us and hl=en for word counter and character counter (including a basic-view request). Google returned a JavaScript redirect/challenge shell instead of readable organic results; the web reader also rejected the Google search URL. Consequently **Google positions, featured snippets and People Also Ask question text were not verified**. Do not present search-provider results as a live Google ranking audit. The supplied Ahrefs SERP Features column remains historical source evidence (for example, People also ask for word counter and alphabetize list), not proof of current questions or placements.

Current web search and direct competitor inspection support these narrower observations:

| Cluster | Pages inspected | Observed page type and expectations | Editorial response |
|---|---|---|---|
| Word counting | [WordCounter](https://wordcounter.net/) | Working editor with counts, reading metrics and a usage explanation; advanced extras also appear. | Tool first, then transparent counting rules and writing examples; do not borrow unsupported extras. |
| Character counting | [Character Counter Online](https://charactercounteronline.com/) | Input plus with/without-space totals and several additional analysis features. | Explain graphemes, whitespace and code points; only document implemented metrics. |
| Text comparison | [Text Compare](https://text-compare.com/) | Two inputs, difference highlighting and instructions; direct comparison intent. | One comparison page with line/word modes and clear added/removed labels. |
| Title case | [Title Case Converter](https://titlecaseconverter.com/) | Tool plus definitions, rules, tips and named style options. | Explain UtilityPilot's every-word capitalization, examples and manual review; no APA/AP/Chicago claim. |
| Alphabetizing | [Text Fixer](https://www.textfixer.com/tools/alphabetical-order.php), [The Alphabetizer](https://alphabetizer.flap.tv/) | Tool forms, ordering/delimiter options, how-to content and FAQs; some offer surname/article handling. | Explain newline input, language, ascending/descending and natural order; no automatic surname or article handling claims. |

The observed tool-first pages vary from compact instructions to extended reference sections. No competitor word-count quota is inferred. Useful questions arise from implemented behavior: what is a character, do spaces count, what happens to a final newline, does Title Case preserve acronyms, and does a diff compare meaning? These are editorial questions, not invented Google PAA quotations. All new copy will be original. No external content is copied into the product.

## New-page and unsupported-intent decisions

No Create new page actions: existing selectable modes and literal replacement cover the supported tasks without duplicating interfaces. Blank-line queries receive a qualified collapse explanation, not a falsely labelled complete remover. “Text analyzer” covers basic statistics only. Literal comma joining is for simple entries without embedded commas, quotes or line breaks; record-aware CSV tasks stay in Data & Tables. The ignored font/divider/duplicate-word intents need capabilities the site does not have. Similar keyword variations are consolidated, not discarded.
`;
await writeFile('docs/UTILITYPILOT-AHREFS-CONTENT-MAP-2026-09-28.md',doc);
console.log(`Mapped ${rows.length} source keywords; ${[...decisions.values()].filter(d=>d.action==='Ignore').length} ignored; no new routes.`);
