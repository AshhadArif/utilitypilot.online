# Data and privacy plan

Status: planned controls, not an assertion about implemented software. Every selected tool is listed in [TOOL-CATALOG](TOOL-CATALOG.md), with local processing, no external data and no transform API. No sensitive input needs to leave the browser to deliver MVP functionality.

## Data flow

User chooses/pastes input -> in-memory processor or local worker -> preview/result -> explicit copy/download or next-tool transfer -> clear/navigation releases app references. No automatic persistence, no share links containing input and no upload endpoint.

The website host still receives ordinary requests for pages/assets and potentially IP/HTTP metadata. “Processed in your browser” must refer to the tool input; it must not imply the entire website makes no network requests. Never claim “100% private,” guaranteed secure erasure or absence of all device/browser/extension risks.

## Processing inventory

| Tools | Input sensitivity and risk | External processing/data | Storage and mitigation |
|---|---|---|---|
| UP001–UP008 | Text may contain personal/confidential material | None; local string/worker operations | Memory only; no logging or rendered HTML |
| UP009–UP017 | CSV/JSON can contain records, tokens and identifiers | None; bundled parser code | Memory only; preserve strings; block silent data loss |
| UP018–UP023 | Images may contain faces, location tags or documents | None; local decoder/canvas | Memory/object URLs; revoke on clear; no public galleries |
| UP024 | Slug text may contain unpublished titles | None | Memory; no input-bearing URL state |
| UP025–UP028 | URLs may contain credentials, auth codes and signed queries | None; do not fetch entered URL | Memory; mask credentials; no link previews/prefetch |
| UP029–UP030 | Color values usually low sensitivity | None; static formula | Memory; still no input telemetry |
| UP031–UP032 | Encoded text may hide secrets; decoding does not remove sensitivity | None | Plain-text rendering; explicit bytes export; no live HTML |

Static dependencies contain standards/algorithms, never external user data. UTM outputs are local link construction; visiting the destination remains a separate explicit action. No malicious-link or signature-validity verdicts.

## Script isolation and monetization decision

No third-party advertising, analytics, chat widgets, remote fonts or session replay scripts on tool routes. Same-page scripts can access inputs even when transformations are local. Merely placing ads visually below an editor does not isolate them. Host reviewed scripts locally and constrain network access with a tested CSP. A worker is a responsiveness boundary, not complete privacy isolation.

Future ads may run on editorial/hub pages following provider/consent review. Clear tool input before any route transition that could load third-party scripts; avoid persistent app stores spanning such routes. Cross-tool transfer is only between compatible ad-free tool pages, after explicit action, in memory. Full reload clears it; no session/local storage fallback.

## Local security rules

Render user strings as text, never HTML. Do not eval JSON, execute code, run macros, auto-open decoded URLs or resolve external XML entities. Reject dangerous URL schemes for generated clickable links. Prefer displaying URLs as text; disable automatic resource fetching. Validate file signatures/support where feasible; MIME and extension alone are not trust signals.

CSV exports can be interpreted as formulas by spreadsheet applications. Detect dangerous formula-like cells; offer a clearly described spreadsheet-safe export, stating that escaping changes representation and is not universal protection across applications. Preserve an explicit raw export only with warning and deliberate choice. Test tabs/newlines and Unicode edge cases; do not claim CSV escaping alone eliminates all injection.

Bound bytes, nesting, fields, output expansion and time. Workers must support termination. Regex is deferred. File checksums do not prove a file is safe and are not password storage.

## Retention and external services

- Tool content: no application server retention; app holds memory until clear/unload; garbage collection timing is outside our guarantee.
- Downloads/clipboard: remain under user/device control; website cannot recall copied or downloaded content.
- Preferences: do not store by default in MVP. If favorites or settings are later persisted, document exactly what and provide clear control.
- Contact/error reports: user-initiated and external to tool processing. Form must never attach input automatically. Ask for synthetic reproduction where possible.
- Host logs: provider and retention not selected. Proposed target: minimal access logs, short operational retention (for example up to 30 days), confirmed against provider capabilities before publishing policy.
- Contact records: proposed deletion after resolution within 90 days, subject to actual operator needs and configured provider. This is a design target, not an existing practice.
- Ad/CMP data: provider-specific destinations and retention must be disclosed before activation. No invented “deleted immediately” statement.

## Verification before privacy copy goes live

Record network behavior during paste, processing, options changes, errors, clear, copy/download and navigation, including delayed requests. Use distinctive synthetic markers and inspect request bodies/URLs/headers. Repeat offline after dependencies load, but don't treat offline success alone as proof. Inspect storage, service workers, telemetry/error SDK configuration and production CSP. Test script behavior after ads are enabled elsewhere. Keep screenshots/log evidence free of real private content.

Suggested precise copy after passing verification: “This tool processes your input in your browser. UtilityPilot does not upload or save that input. See our privacy policy for website hosting and other data practices.”

## Policies and consent

The owner must supply actual operator details, providers, contact channel and retention before legal pages are published. [Google privacy-disclosure policy](https://support.google.com/publisherpolicies/answer/10437794?hl=en) requires disclosure of relevant ad-related data practices. [Google CMP requirements](https://support.google.com/adsense/answer/13554020?hl=en-GB) and [TCF integration](https://support.google.com/adsense/answer/9804260?hl=en-GB) inform future regional ad consent. Non-personalized ads are not a universal exemption from consent duties. Review the actual current configuration before ad activation.

