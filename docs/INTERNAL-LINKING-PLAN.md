# Internal linking and cross-tool workflows

Navigation hierarchy: home -> directory/category -> tool; guide index -> guide -> relevant tools. Related links are real anchors, not JavaScript-only navigation. Each published tool has a parent hub and two or more relevant peer tools where useful.

## Workflow graph

| Workflow | Steps | Why the transition helps |
|---|---|---|
| Prepare copied content | Text cleaner -> word counter -> slug generator | Repair text, check length, prepare a publishing identifier |
| Reconcile two lists | Compare lists -> remove duplicate lines -> sort lines | Find missing members, clean output, order it |
| Repair an import | CSV viewer -> delimiter converter -> column editor -> CSV dedupe | Diagnose, adapt schema, remove repeated records |
| Prepare an API export | JSON formatter -> JSON to CSV -> CSV viewer -> column editor | Check structure then produce inspectable tabular output |
| Split an import batch | CSV viewer -> CSV split; reverse path via CSV merge | Respect parsed records and repeated headers |
| Meet image constraints | Image inspector -> crop/resizer -> compressor -> converter as needed | Understand dimensions and choose the smallest required change |
| Prepare campaign links | Slug generator -> UTM builder -> URL parser | Create readable names and inspect actual parameters |
| Share a link | URL parser -> URL cleaner -> URL parser | Inspect before removing selected tracking fields |
| Use an image color | Image color picker -> color converter -> contrast checker | Translate sampled color and check a proposed text pair |
| Inspect escaped material | HTML entities/Base64 -> text cleaner or URL parser when compatible | Decode first, then inspect; no automatic execution |

Conversion/compression order depends on target format; the interface should recommend the relevant next operation rather than enforce a universal sequence. Lossy image chains should warn about repeated re-encoding and allow returning to the original.

## Transfer behavior

In MVP, related links always work. “Use this result in…” additionally transfers compatible text/table/image state only by explicit click within the same ad-free runtime. Announce source and destination, preserve original, show what will transfer and allow cancellation. No automatic clipboard writes, URL serialization, persistence or upload. If transfer cannot survive navigation safely, provide copy/download then navigation instead; do not advertise seamless transfer until verified.

Structured data must preserve schema/options; a partial CSV preview is not a transferable full dataset. Image transfers must clarify whether using original or exported bytes. Never push tokens, URLs or text to another domain.

## Link rules

The full peer map is in TOOL-CATALOG. Every tool links to its relevant guide if one adds value; guides link back to tools used in their examples. Hubs feature the matching guides, not all guides. Avoid full cross-link meshes and repetitive exact-keyword anchors. Use task descriptions such as “Inspect the CSV before exporting.”

Cross-portfolio links are optional editorial links only, labelled with the destination website. Verify exact destination URLs exist before adding them. No shared sitewide keyword footers, copied tool pages or redirects funneling several domains into one tool.

## Verification

Build-time registry checks detect missing/self/deferred destinations. Crawl rendered pages for orphans and link failures. Manually follow each workflow with synthetic data, confirm state behavior, mobile navigation and clear labels. A broken transfer must not silently discard data or produce a success notice.

