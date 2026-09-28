# UtilityPilot Ahrefs content map

Prepared 28 September 2026 before website implementation. Source: [original Ahrefs export](research/google_us_alphabetize-list-character_overview_2026-09-28_23-38-58.csv), Google US, 44 rows. Despite its .csv extension the supplied file is quoted, tab-delimited. [Normalized source rows](research/ahrefs-text-keywords.json) retain every supplied field as a string. Original SHA-256: B46AF4C54BC61A4070144B0BED8E51E6F653CB442552DD58A5F29DE768536A5B. Regenerate this map with `node scripts/ahrefs-content-map.mjs`.

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
| word counter | 782000 | 0 | 2500 | word ocunter | Count words in pasted text | /tools/text/word-counter/ | Primary | Expand existing page | Expand counting methodology, examples and writing workflows. |
| character counter | 160000 | 0 | 0 | characted counter | Count characters with and without whitespace | /tools/text/word-counter/#character-counter | Supporting | Add supporting section | Existing counter already reports graphemes and code points; explain both without a duplicate tool. |
| compare text | 13000 | 73 | 55000 | text compare | Identify edits between two versions | /tools/text/text-diff/ | Primary | Expand existing page | Highest-volume comparison phrase; preserve the existing text-diff route. |
| title case converter | 8600 | 0 | 19000 | title case converter | Capitalize a title | /tools/text/case-converter/#title-case | Primary | Expand existing page | Highest-volume supported case query; disclose mechanical capitalization and no named style-guide support. |
| word counter online | 6200 | 0 | 1010000 | word counter | Count words in pasted text | /tools/text/word-counter/ | Supporting | Consolidate into existing page | Same task and existing counting interface. |
| line counter | 5300 | 65 | 80 | text line counter | Count physical text lines | /tools/text/word-counter/#line-counter | Supporting | Add supporting section | Existing Lines metric; explain blank lines and final terminators. |
| text diff | 3900 | 0 | 122000 | diff checker | Identify edits between two versions | /tools/text/text-diff/ | Supporting | Consolidate into existing page | One sequence-comparison interface; compare-lists remains a distinct membership task. |
| text converter | 3400 | 46 | 712000 | font generator | Broad conversion or decorative fonts | — | Not targeted | Ignore | Parent Keyword is font generator; no decorative-font tool or sufficiently specific supported intent. |
| alphabetize list | 3200 | 0 | 10 | how to alphabetize in docs | Arrange entries alphabetically | /tools/text/sort-lines/ | Primary | Expand existing page | Existing alphabetical sorting with descending and language options. |
| comma separated list | 2100 | 41 | 4400 | column to comma separated | Join a simple list with commas | /tools/text/find-and-replace/#comma-separated-list | Supporting | Add supporting section | Actual newline replacement works for simple entries; explicitly exclude CSV quoting and automatic trailing-separator cleanup. |
| character counter online | 1600 | 76 | 15000 | character count | Count characters with and without whitespace | /tools/text/word-counter/#character-counter | Supporting | Add supporting section | Existing counter already reports graphemes and code points; explain both without a duplicate tool. |
| compare two texts | 1200 | 72 | 52000 | text compare | Identify edits between two versions | /tools/text/text-diff/ | Supporting | Consolidate into existing page | One sequence-comparison interface; compare-lists remains a distinct membership task. |
| count words in text | 1100 | 77 | 1020000 | word counter | Count words in pasted text | /tools/text/word-counter/ | Supporting | Consolidate into existing page | Same task and existing counting interface. |
| lowercase converter | 900 | 0 | 61000 | convert case | Change capitalization | /tools/text/case-converter/ | Supporting | Consolidate into existing page | Existing selectable modes; add mode-specific headings and examples, not separate routes. |
| uppercase converter | 900 | 42 | 60000 | case converter | Change capitalization | /tools/text/case-converter/ | Supporting | Consolidate into existing page | Existing selectable modes; add mode-specific headings and examples, not separate routes. |
| text formatter | 800 | 55 | 1600 | text formatter | Format plain-text whitespace | /tools/text/text-cleaner/ | Supporting | Add supporting section | Bounded plain-text formatting only; link to case conversion and literal replacement. |
| text cleaner | 700 | 29 | 1600 | text cleaner | Repair spacing and line breaks | /tools/text/text-cleaner/ | Primary | Expand existing page | Explain exact defaults, operation order and preserved text. |
| text analyzer | 600 | 15 | 900 | text analyzer | Inspect basic text metrics | /tools/text/word-counter/#text-analysis | Supporting | Add supporting section | Cover only the seven implemented metrics; no readability, sentiment or keyword-density claims. |
| remove whitespace | 450 | 5 | 1200 | space remover | Remove or normalize unwanted whitespace | /tools/text/text-cleaner/#whitespace | Supporting | Add supporting section | Describe supported whitespace operations; removing every whitespace type in one pass is not supported. |
| text comparison tool | 450 | 71 | 126000 | diff checker | Identify edits between two versions | /tools/text/text-diff/ | Supporting | Consolidate into existing page | One sequence-comparison interface; compare-lists remains a distinct membership task. |
| remove spaces from text | 250 | 9 | 1900 | remove spaces | Delete ordinary spaces | /tools/text/find-and-replace/#remove-spaces | Supporting | Add supporting section | Literal space with empty replacement is supported; distinguish tabs and other whitespace. |
| convert text to lowercase | 200 | 18 | 73000 | case converter | Change capitalization | /tools/text/case-converter/ | Supporting | Consolidate into existing page | Existing selectable modes; add mode-specific headings and examples, not separate routes. |
| count characters in text | 200 | 76 | 245000 | character counter | Count characters with and without whitespace | /tools/text/word-counter/#character-counter | Supporting | Add supporting section | Existing counter already reports graphemes and code points; explain both without a duplicate tool. |
| sort list alphabetically | 200 | 0 | 22000 | alphabetizer | Sort newline-separated items | /tools/text/sort-lines/ | Supporting | Consolidate into existing page | Explain A–Z, Z–A, natural, numeric, length and reverse modes on one page. |
| text case converter | 150 | 27 | 71000 | case converter | Change capitalization | /tools/text/case-converter/ | Supporting | Consolidate into existing page | Existing selectable modes; add mode-specific headings and examples, not separate routes. |
| convert text to uppercase | 100 | 12 | 67000 | case converter | Change capitalization | /tools/text/case-converter/ | Supporting | Consolidate into existing page | Existing selectable modes; add mode-specific headings and examples, not separate routes. |
| remove duplicate lines | 100 | 4 | 2000 | remove duplicates | Keep unique line entries | /tools/text/remove-duplicate-lines/ | Primary | Expand existing page | Explain exact, case, trim, NFC and first/last matching. |
| format text online | 90 | 57 | 500 | text formatter | Format plain-text whitespace | /tools/text/text-cleaner/ | Supporting | Add supporting section | Bounded plain-text formatting only; link to case conversion and literal replacement. |
| sort list online | 70 | 13 | 350 | sort list online | Sort newline-separated items | /tools/text/sort-lines/ | Supporting | Consolidate into existing page | Explain A–Z, Z–A, natural, numeric, length and reverse modes on one page. |
| remove extra spaces | 70 | 3 | 250 | space remover | Format plain-text whitespace | /tools/text/text-cleaner/ | Supporting | Add supporting section | Bounded plain-text formatting only; link to case conversion and literal replacement. |
| find and replace text | 70 | 6 | 1500 | text replacer | Replace literal repeated text | /tools/text/find-and-replace/ | Primary | Expand existing page | Explain case, whole-word boundaries, non-overlap and literal replacement. |
| text separator | 60 | 1 | 3100 | text dividers | Ambiguous separators or decorative dividers | — | Not targeted | Ignore | Parent Keyword is text dividers; no decorative divider generator. Explain literal delimiters under text-to-list instead. |
| remove duplicate words | 60 | 1 | 500 | remove duplicates | Deduplicate words within a passage | — | Not targeted | Ignore | Line deduplication is not word deduplication; splitting prose would destroy its structure. |
| duplicate line remover | 60 | 3 | 1900 | remove duplicates | Keep unique line entries | /tools/text/remove-duplicate-lines/ | Supporting | Consolidate into existing page | Same task, one canonical route. |
| remove blank lines | 50 | 0 | 100 | remove empty lines | Reduce unwanted empty lines | /tools/text/text-cleaner/#blank-lines | Supporting | Add supporting section | Partial fit: collapse runs to one blank separator; do not promise total blank-line removal. |
| remove duplicate lines online | 50 | 3 | 2000 | remove duplicates | Keep unique line entries | /tools/text/remove-duplicate-lines/ | Supporting | Consolidate into existing page | Same task, one canonical route. |
| remove empty lines | 40 | 0 | 100 | remove empty lines | Reduce unwanted empty lines | /tools/text/text-cleaner/#blank-lines | Supporting | Add supporting section | Partial fit: collapse runs to one blank separator; do not promise total blank-line removal. |
| sort text alphabetically | 40 | 22 | 21000 | alphabetizer | Sort newline-separated items | /tools/text/sort-lines/ | Supporting | Consolidate into existing page | Explain A–Z, Z–A, natural, numeric, length and reverse modes on one page. |
| count lines in text | 40 | 65 | 200 | list counter | Count physical text lines | /tools/text/word-counter/#line-counter | Supporting | Add supporting section | Existing Lines metric; explain blank lines and final terminators. |
| sort lines | 40 | 0 | 150 | text organizer | Sort newline-separated items | /tools/text/sort-lines/ | Supporting | Consolidate into existing page | Explain A–Z, Z–A, natural, numeric, length and reverse modes on one page. |
| text to list | 30 | 0 | 20 | text to list | Split or join using a known delimiter | /tools/text/find-and-replace/#text-to-list | Supporting | Add supporting section | Literal multiline Find/Replace controls already support this workflow. |
| convert text to title case | 20 | 54 | 20000 | title case converter | Change capitalization | /tools/text/case-converter/ | Supporting | Consolidate into existing page | Existing selectable modes; add mode-specific headings and examples, not separate routes. |
| list to text | 10 | Not supplied | Not supplied | Not supplied | Split or join using a known delimiter | /tools/text/find-and-replace/#text-to-list | Supporting | Add supporting section | Literal multiline Find/Replace controls already support this workflow. |
| clean up text online | Not supplied | Not supplied | Not supplied | Not supplied | Format plain-text whitespace | /tools/text/text-cleaner/ | Supporting | Add supporting section | Bounded plain-text formatting only; link to case conversion and literal replacement. |

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
