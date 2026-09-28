# Keyword and problem research

Update, 29 September 2026: the historical discovery dataset below remains unchanged. The newly supplied Google US Ahrefs export provides actual metrics for 44 Text & Lists keywords; use the [Ahrefs content map](UTILITYPILOT-AHREFS-CONTENT-MAP.md) for those metrics and implementation decisions. The “unavailable” statements below refer to the earlier 260-row dataset, not the new export.

Research conducted: 25 September 2026. Audience assumption: global English. Dataset: [260 opportunities in CSV](keyword-opportunities.csv). Provenance: [source ledger](RESEARCH-SOURCES.md).

## What the dataset does and does not say

There are 160 candidate query variants for the 32 MVP tools and 100 candidates for deferred/rejected families. Of all 260 rows, 32 are S (exact query submitted to the search provider) and 228 are H (research-derived hypotheses). All rows have an explicit evidence scope. An H row's source supports the general task/category, not exact wording or measured demand.

Direct Google SERPs and autocomplete were inaccessible in this session. Search-provider examples cannot establish a Google rank, location-specific competitor set, PAA feature, suggestion, traffic or volume. Search volume, KD, CPC and traffic are unavailable for every row. No paid keyword database or Search Console property was accessed.

This is a usable problem-discovery dataset, not 260 individually verified Google opportunities. Unverified candidates must not become automatically generated pages.

## Field dictionary

- Query and user_problem: user wording to investigate, not a traffic claim.
- Intent, family, proposed_tool, tool_id and proposed_url: one-intent mapping. Reserved URLs are internal proposals only.
- SERP type, competition, existing solution quality: sample-bound observations or explicitly unavailable. Competitor functionality was not executed.
- Content and interactive opportunities: proposed value to build and demonstrate.
- Original value: implementation distinction or behavior worth documenting; not proof competitors lack it.
- Cannibalization risk: whether separate variants would overlap an existing or portfolio-owned destination.
- Priority/decision/owner: delivery selection independent of volume.
- Evidence status, source scope, source URL and checked date: audit trail.
- Quantitative metrics: unavailable, never zero or guessed.

## User intent findings

Task queries dominate the inspected samples: remove duplicates, inspect CSV, convert formats, resize and compress, parse links. Some specific CSV merge searches return programming Q&A as well as tools, suggesting different preferred solutions. A browser utility should explain its small-file limits and link to general local-workflow guidance where appropriate; it should not promise to replace large-data pipelines.

Head terms are crowded and long tails also have specialist tools. “Low competition” is not defensible from these observations. The strategy prioritizes usable controls, consistent outcomes and connected workflows rather than a claim of easy rankings.

## Cannibalization decisions

| Variants | Single owner |
|---|---|
| word/character/sentence count and reading estimate | /tools/text/word-counter/ |
| extra spaces, blank lines and line breaks | /tools/text/text-cleaner/ |
| JSON formatter, beautifier, validator, minifier | /tools/data/json-formatter/ |
| CSV/TSV and delimiter directions | /tools/data/delimiter-converter/ |
| JPEG/PNG/WebP conversion directions | /tools/image/image-converter/ |
| HEX/RGB/HSL conversion directions | /tools/web/color-converter/ |
| Base64 encode/decode and Base64URL | /tools/web/base64/ |
| Calendar or timestamp queries | DatePilot; no UtilityPilot route |
| Standalone numeric/physical conversion queries | CalculateHub; no UtilityPilot route |

JSON-to-CSV and CSV-to-JSON retain separate pages: opposite inputs, typing decisions, nesting behavior and error explanations create meaningfully different workflows. Text diff and list comparison are also distinct: ordered edit detection versus membership. No separate exact pixel, file-size, spelling, locale or device keyword pages.

## Next research decisions

Before expanding, inspect Google manually in chosen markets/device contexts and record result types. If authorized keyword exports become available, retain source, period, location and method with every metric. Interview a few actual users about completed workflows; distinguish feedback from promotional forum posts. After launch, use query impressions and page engagement to improve an existing page before proposing a new one.

No metric validation is required to build an honest small tool; it is required before claiming quantified market opportunity.
