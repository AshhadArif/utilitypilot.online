# Product requirements

Research date: 25 September 2026. Status: proposed build specification; no website code authorized in Prompt 1.

## Product outcome

A visitor finds a relevant tool, understands inputs, completes a small digital task, receives a trustworthy result, understands limits, and can continue with a related tool. Primary promise: Practical online tools for everyday digital tasks.

## MVP scope

Exactly 32 selected tools are defined in [TOOL-CATALOG](TOOL-CATALOG.md). Build all four families with no public placeholders. P0 means foundations/early implementation; P1 means completion of the same initial portfolio. Directory, finder, home, four hubs, 12 original guides, guides index, seven trust/contact pages, 404, sitemap and robots complete the site.

## User requirements

1. Discover by task wording and aliases without knowing a category.
2. Paste or choose a supported local file; drag/drop is optional, never the only path.
3. See instructions, processing behavior and limits before providing data.
4. Try clearly labelled sample input; real user processing must work independently of samples.
5. Change meaningful settings with defaults that preserve information.
6. See results, counts, warnings and a clear success/failure state.
7. Copy or download a real output after successful processing.
8. Keep original input available, reset it explicitly, and avoid accidental replacement.
9. Open relevant tools/guides without loss hidden behind navigation.
10. Use keyboard, mobile and screen reader affordances.

## Non-goals

Accounts, paid plans, cloud saves, remote imports, external transformation APIs, arbitrary file conversion, PDF editing, AI generators, browser extensions, ranking dashboards and API products are not MVP requirements. No finance/date/reference-data portal.

## Acceptance definition

Each tool has verified fixtures for normal, boundary, malformed and applicable Unicode/security cases; an actual export reopened by an independent reader; declared limits; no payload transmission; responsive and accessible controls; unique supporting content; and useful related links. No silent truncation. Partial previews must distinguish themselves from complete exports. Aborted jobs cannot overwrite newer results.

Every public route returns the intended HTTP response, metadata and indexability. Every public tool in the registry is working; every registry relation resolves. Guides contain original worked examples, not generic introductions. Trust text matches deployed services.

## Product measures

After launch, consider aggregate tool opens, locally derived success/error counts, export actions, related-tool navigation and coarse returning visits only where collection is disclosed and permitted. Do not transmit input, output, clipboard, filenames, raw search terms or error excerpts. With no analytics on tool routes, initial measurement can use Search Console, aggregate host requests and voluntary reports; any additional measurement requires a privacy design revision.

No target impressions, conversion rates, traffic, revenue or AdSense probability are invented. Establish a baseline then choose targets. Interpret downloads as a proxy, not proof that a task succeeded.

## Release gate ownership

Prompt 2 implementer owns functional/SEO/accessibility evidence. Site owner must supply real operator/contact details and choose hosting, reporting and any ad/CMP providers before deployment. Missing operator details need not block implementation of tools but must block publication of fabricated legal/contact pages. Prompt 1 makes no hosting purchases or external changes.

