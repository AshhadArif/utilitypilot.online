import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {parseCSV} from '../src/lib/data.mjs';

const file='docs/research/ahrefs-counter-search-volume-history-2026-10-01.csv';
const bytes=await readFile(file),data=parseCSV(bytes.toString('utf8'));
const headers=data.shift(),keywords=headers.slice(2);
assert.deepEqual(headers,['Date','Total volume','word counter','character counter','character count','word counter online','paragraph counter']);
assert.equal(data.length,12);
const months=data.map(row=>({date:row[0],total:Number(row[1]),volumes:row.slice(2).map(Number)}));
assert.ok(months.every(m=>m.volumes.every(Number.isFinite)));
const latest=months.at(-1);assert.equal(latest.date,'2026-09-01');
const target='/tools/text/word-counter/';
const decisions=[
 ['Count words and check a draft length',target,'Primary','Expand existing page','Retain the established counting tool; add paragraph functionality, metric comparisons and realistic writing examples.'],
 ['Count characters with and without whitespace',target+'#character-counter','Supporting','Expand existing section','Existing grapheme/code-point outputs already satisfy the operation; strengthen instructions, examples and character-count use cases.'],
 ['Check the number of characters in text',target+'#character-counter','Supporting','Consolidate into existing section','Same task as character counter; no character-count route or duplicated tool.'],
 ['Count words using a browser tool',target,'Supporting','Consolidate into existing page','Same operation as word counter; explain explicit Count text action, local processing and result export.'],
 ['Count paragraph blocks in pasted text',target+'#paragraph-counter','Supporting','Add genuine metric and supporting section','Count runs of nonblank lines separated by blank lines. Add the metric to the existing form and explain paragraphs versus lines, rather than creating a duplicate interface.']
];
const fmt=n=>n.toLocaleString('en-US');
let doc=`# UtilityPilot Ahrefs content map

Prepared 1 October 2026 before implementation of this update. Primary source: [the supplied search-volume history export](research/ahrefs-counter-search-volume-history-2026-10-01.csv), originally named \`my_535b04645f71b9e6b7a3f7fb32681763_search-volume-history_2026-10-01_01-48-07.csv\`. SHA-256: \`${createHash('sha256').update(bytes).digest('hex')}\`. There are 12 monthly rows, October 2025–September 2026, and exactly five keyword columns. The other history export in Downloads contains age/date keywords and is not a UtilityPilot source.

## Scope and provenance

This is historical volume data, not the earlier Google US overview. The file does not include a country/search-engine column, KD, Traffic Potential, CPC, Parent Topic, ranks, clicks or backlinks. Geography and engine are **N/A**; do not infer a market from the filename. All absent metrics below are **N/A**. Values are estimates supplied by Ahrefs, not visits or ranking forecasts. No Parent Topic relationships are inferred from unavailable metrics: clustering below is an editorial judgment about task overlap and the current implementation.

The [28 September overview map](UTILITYPILOT-AHREFS-CONTENT-MAP-2026-09-28.md) and its 44-keyword source are preserved as a separate historical artifact. Its 782,000 word-counter figure and other metrics are not substituted into this dataset. The old generator now writes only that archived map. Recreate this current map with \`node scripts/ahrefs-history-content-map.mjs\`.

## Keyword → intent → existing page → action

| Keyword | Sept 2026 Volume | Historical Pattern | Search Intent | Target Page | Primary/Supporting | Action |
|---|---:|---|---|---|---|---|
`;
keywords.forEach((keyword,i)=>{
 const values=months.map(m=>m.volumes[i]),min=Math.min(...values),max=Math.max(...values),peak=months[values.indexOf(max)].date.slice(0,7);
 const pattern=`Oct ${fmt(values[0])} → Sept ${fmt(values.at(-1))}; range ${fmt(min)}–${fmt(max)}; peak ${peak}`;
 const [intent,page,role,action]=decisions[i];
 doc+=`| ${keyword} | ${fmt(latest.volumes[i])} | ${pattern} | ${intent} | ${page} | ${role} | ${action} |\n`;
});
doc+=`
| Keyword | KD | Traffic Potential | CPC | Parent Topic | Rank / Clicks / Backlinks |
|---|---|---|---|---|---|
${keywords.map(k=>`| ${k} | N/A | N/A | N/A | N/A | N/A |`).join('\n')}

## Monthly source values and total discrepancy

| Month | Source Total volume | word counter | character counter | character count | word counter online | paragraph counter | Sum of five keyword columns | Source total minus sum |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
`;
for(const m of months){const sum=m.volumes.reduce((a,b)=>a+b,0);doc+=`| ${m.date.slice(0,7)} | ${[m.total,...m.volumes,sum,m.total-sum].map(fmt).join(' | ')} |\n`;}
const sums=months.map(m=>m.volumes.reduce((a,b)=>a+b,0));
doc+=`
The source Total volume does not equal the sum of its five visible keyword columns in any month. In September it reports **46,276**, while those columns sum to **46,043**, a difference of **233**. Keep both numbers as labelled; the file does not explain the mismatch. The visible-keyword sum ranges from **${fmt(Math.min(...sums))}** to **${fmt(Math.max(...sums))}** over the year. These are arithmetic totals of estimates for potentially overlapping audiences, not unique users, clicks or Traffic Potential.

Word counter consistently supplies the largest measured volume. Character-count wording has meaningful recurring demand and shares one operation with character counter. Word counter online belongs on the same tool rather than a new online variant. Paragraph counter falls from an early peak of 792 in November to 22 in September; prioritize a useful, bounded addition to the current counter rather than treating its peak as current demand. A small paragraph total still merits an accurate implemented metric and explanation.

## Architecture and implementation plan

The audited repository currently has 32 tools (8 text, 9 data, 6 image, 9 web), 12 guides, four hubs, 59 HTML routes and 57 sitemap URLs. Static HTML is generated by scripts/build.mjs using src/render.mjs and the central data modules. src/data/text-content.mjs already supplies substantial content for all eight Text & Lists tools. Browser workers run text/data/web processors; the counter currently reports seven metrics but not paragraphs. Search, related tools, guide links and canonicals already use the established routes.

There is no separate Character Counter or Paragraph Counter page. Keep Word Counter as the one canonical tool serving the existing word/character/line metrics and add paragraph counting to that tool. Character Counter and Paragraph Counter will have distinct explanatory sections and hub links, not fabricated standalone H1s or URLs. Preserve all current route counts and functionality. The additional paragraph metric is the only planned processor change; existing counts retain their definitions.

Paragraph rule: normalize CRLF/CR to LF for line boundaries; a paragraph is a contiguous run of nonblank lines. A line that is empty after JavaScript trim is blank. Single newlines within a block do not start another paragraph; repeated blank lines do not create empty paragraphs. Empty/whitespace-only input returns zero paragraphs. This is plain-text structure, not an interpretation of HTML, Word/PDF styling or body-paragraph intent.

${keywords.map((k,i)=>`- **${k}:** ${decisions[i][4]}`).join('\n')}

Also improve the Text & Lists hub with task descriptions and direct links to counting, formatting, case conversion, diff and list operations. Audit all eight current text articles, add missing workflow links rather than repeat existing explanations, and connect the cleanup/Unicode guides to paragraph methodology. Preserve data/image/web tools and metadata; do not extrapolate this five-query dataset into claims about their demand.

## Supporting wording without measured volume

The following phrases come from the brief or clear task descriptions, not additional columns in the history export. Their volume, KD and Traffic Potential are **N/A**. Use only where natural; this is not an instruction to insert every phrase.

| Supporting intent terms | Target |
|---|---|
| online word counter; word count; word count checker; count words; count words online; words counter; word counter tool; word counter tool online; online word count | ${target} |
| character counter online; character count tool; count characters; character counter tool | ${target}#character-counter |
| paragraph count; count paragraphs | ${target}#paragraph-counter |
| line counter; text analyzer | Existing ${target}#line-counter and #text-analysis sections |
| text formatter; remove whitespace; remove extra spaces | Existing Text Cleaner; qualify the supported operations |
| title case; uppercase; lowercase; text diff; alphabetize list; duplicate removal; find and replace; simple list conversion | Existing task-specific text pages; retain previous content and add useful connections only |

## Search-intent research, 1 October 2026

Current search-provider results and directly inspected primary product pages show working input-first tools rather than article-only results. [WordCounter's character-count page](https://wordcounter.net/character-count) presents character counting as a text-input task. [WordCount's paragraph counter](https://wordcount.com/paragraph-counter) exposes paragraphs alongside lines and describes blank-line boundaries; it also has options and per-paragraph metrics that UtilityPilot does not claim to support. [Text Fixer's character counter](https://www.textfixer.com/tools/character-counter-online.php) covers with/without-space counts. These observations support the task explanations; they do not establish Google rank, KD or expected traffic.

The architecture decision is our inference: the existing combined counter already provides character metrics, and adding one paragraph metric gives useful additional output without another copy of the form. Related wording should share that canonical page. Search-provider observations are not a location-specific Google SERP audit; live Google positions, PAA and featured snippets are **N/A**. No competitor prose or unsupported platform limits will be copied.

## Pages intentionally not created

No new routes: /word-counter-online/, /online-word-counter/, /word-count-checker/, /count-words-online/, /character-count/, /character-count-tool/, /count-characters/ and duplicate counter interfaces are unnecessary. Paragraph counting will be real functionality within the current counter. Existing #character-counter links remain valid and a new #paragraph-counter section supplies the explanation. No fragment becomes its own canonical or sitemap entry.
`;
await writeFile('docs/UTILITYPILOT-AHREFS-CONTENT-MAP.md',doc);
console.log('Mapped five history keywords and preserved all 12 monthly rows; missing metrics N/A.');
