# Website specification

Prompt 2 implementation contract. This document describes the future site; no frontend exists.

## Homepage

Lead with UtilityPilot and “Practical online tools for everyday digital tasks.” Place a labelled tool search directly below a short explanation: prepare text, tables, images and links, with clear results.

The page then provides:
1. Four category entry points showing their task coverage and representative tools.
2. Curated starting tools grouped by “Clean up material”, “Convert an export”, “Prepare an image” and “Prepare a link”.
3. Three compact workflow sequences with meaningful next steps.
4. Recently added tools derived from actual release dates, never random labels.
5. Editorial guides chosen for recurring task problems.
6. A concise processing explanation and links to privacy and error reporting.
7. A complete navigable footer.

Until usage evidence exists use “Start here,” not fabricated “Most popular.” Later popularity must use an identified aggregate method and period, without sending user content. Home should be a navigable workspace directory, not a large decorative hero with six unrelated cards.

## Tool directory /tools/

One crawlable canonical page listing all live tools with unique short descriptions, category sections and task tags. Introduce what material can be processed and what is outside scope. Provide local search, category filtering, count, alphabetical sorting and recently added ordering. Categories are links as well as filter controls. A static complete list remains useful without JavaScript.

Cards/rows show name, purpose, category and concise processing label. Avoid duplicated “free online tool” blurbs. Do not invent usage counters, testimonials or trust seals. No indexable filtered/search variations.

## Finder

Search a small locally bundled public registry. Normalize case and accents for matching; trim and tokenize; resolve curated aliases before fuzzy fallback. Rank exact name/slug/alias first, prefix/token matches next, purpose/description next, small typo fallback last. Use deterministic tie-break by name. Avoid popularity boosts without evidence.

Return up to six autocomplete results with name, family and brief purpose; Enter opens the selected item or expands directory results. Arrow keys move, Escape closes, focus behavior follows an accessible combobox pattern. Clear is keyboard accessible. Provide all results as links. On mobile, use a full-width list below the field without covering it or trapping the keyboard.

Category filter combines with the query; show a clear count and “Clear filters.” No result: preserve the query, suggest broader supported verbs/formats, list categories and offer tool request/error reporting. Do not transmit raw queries.

Acceptance examples:
- “json” -> JSON formatter, JSON-to-CSV and CSV-to-JSON.
- “word count” -> Word and character counter.
- “image size” -> Image inspector, then resizer/compressor with distinct descriptions.
- “base64” -> one encoder/decoder page.
- “percentage” -> no local match; explain standalone calculators are outside scope. A labelled CalculateHub destination can be added only after its relevant page is verified live; never link to a fabricated route.
- Misspelling “delimeter” -> delimiter converter through curated alias.

## Tool page anatomy

Title; one H1; one short task explanation; labelled interactive input; concise before-input privacy/limit notice; settings; action; result with interpretation; copy/download; related next action. Supporting HTML follows: how it works, independent examples, important limits, common mistakes, useful FAQs where needed, related guide and related tools. Breadcrumbs link home > tools > family > tool.

The interface is primary and visible early. Do not force reading an article before use. Input, settings and output stack on mobile. Wider screens may use side-by-side views if reading order remains logical. Destructive operations require explicit Apply; instant derived counts may update without Apply.

States: empty, sample loaded, ready, validation error, processing with cancel, complete, complete with warnings, unsupported and failed. Clear results that are stale after input edits or explicitly mark them stale. Errors identify the relevant field/record and offer correction. No generic “Something went wrong” for expected input failures. Never report success with incomplete exports.

## Central registry contract

Documented model, not code:

| Field | Purpose / validation |
|---|---|
| tool_id | Stable unique ID, UP001–UP032; never recycle |
| name, slug, category | Unique public identity; category enum text/data/image/web |
| canonical_path | Explicit stable path; single primary category |
| description, purpose | Specific task, unique brief search description |
| aliases, tags | Local discovery only; no generated routes |
| inputs, outputs | Typed fields, supported MIME/encoding, downloadable format |
| processing_method | browser-main or browser-worker; no external transform API |
| privacy_behavior | Input network destinations none; memory retention; clear/download behavior |
| limits | Input bytes, records, pixels, depth, batch count; measured before publication |
| seo | Unique title, H1, description, canonical, robots, OG title/description/image |
| related_tools, related_guides | IDs resolve to live routes; no self links |
| status | planned, in-development, verified, published, retired |
| release_date, updated_at | Real release/substantive-update dates |
| implementation_version, methodology_version | Traceable behavior changes |
| content_key, acceptance_fixture_ids | Tool-specific content and independent expected results |

Publish only status=published after verification. Planned entries must be excluded from routes, sitemap, search and navigation. Fail the build on duplicate paths, missing SEO fields, unknown relationships, or published tools missing implementation/content. The catalog supplies inputs/outputs/relations; Prompt 2 constructs the registry.

## Accessibility and mobile

Target WCAG 2.2 AA as an internal quality goal, not a claim of certification. Semantic labels, instructions, focus rings, skip link, keyboard controls, visible error text and appropriate live announcements are required. Color does not carry meaning alone. Diff views include explicit added/deleted text. Tables use captions/headers and bounded horizontal scrolling. Reordering requires buttons as an alternative to drag. Crop coordinates are editable by keyboard.

Test at 320 CSS pixels, zoom/reflow and portrait/landscape. Aim for 44px touch controls; validate actual accessibility criteria rather than treating one size as total compliance. Virtualized tables must expose counts and an accessible limited preview/export; do not announce thousands of cells. Respect reduced motion. No sticky overlays covering actions or mobile input.

## Performance and implementation direction

Recommend static-generated supporting HTML with isolated client-side tool modules and workers. Choose the actual maintained framework after checking hosting constraints in Prompt 2; an empty repository supplies no existing stack to preserve. A static-first framework or equivalent is appropriate. Do not preselect unstable dependency versions from memory.

Keep search and navigation lightweight. Load image/data processors only on relevant routes, editor highlighting only when needed, and workers on demand. Bundle libraries locally; no remote fonts/CDN code on tool pages. Avoid heavy general code editors for plain text. Paginate/virtualize previews while preserving the complete export. Revoke object URLs and discard buffers on clear; cancel stale tasks.

Provisional engineering budgets, not measured outcomes: shared initial JS <=80 KiB gzip; ordinary text route <=150 KiB total gzip; heavier route code loaded on demand. Target <=200ms for small transformations on a documented midrange device. Measure large jobs and expose progress/cancel. Document evidence for any budget exception.

Provisional safety caps: plain text 1 MiB; diff 256 KiB per side; CSV/JSON 5 MiB, 50,000 records, 200 columns, nesting depth 50; CSV merge 10 files / 10 MiB aggregate; image 10 MiB and 16 megapixels, one at a time. These are conservative proposed limits, not tested supported capacities. Enforce both raw and parsed limits, benchmark on iOS Safari/Android Chrome, then lower or adjust with evidence. Bound worker execution and output expansion; don't promise unlimited processing.

## Standards and correctness

Use a real CSV parser; quoted newlines are not row separators. CSV values remain strings by default. Never evaluate data as code. Token-aware JSON formatting must preserve large numeric lexemes and detect duplicate keys before a native object parse could lose them. If that cannot be delivered, fail rather than silently round.

Native browser image export can vary by browser; verify actual output MIME and decode exported files. Reject unsupported animated/vector/HEIC input in MVP; do not quietly export a single frame. Clearly document metadata/orientation behavior after testing. A palette generator is not part of the image pixel picker.

Primary references: [File API](https://developer.mozilla.org/en-US/docs/Web/API/File_API), [Canvas export](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob), [CSV format](https://www.rfc-editor.org/rfc/rfc4180), [JSON interoperability](https://www.rfc-editor.org/rfc/rfc8259), [WCAG contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

