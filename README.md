# UtilityPilot

The [4 October 2026 AdSense audit](private-audit/adsense/ADSENSE-FINAL-AUDIT.md) covers all 72 routes and 43 tools locally and on the live site. See the [page inventory](private-audit/adsense/ADSENSE-CONTENT-INVENTORY.csv), [official policy sources](private-audit/adsense/ADSENSE-CURRENT-POLICY-SOURCES.md) and [owner follow-up](private-audit/adsense/ADSENSE-OWNER-FOLLOW-UP.md). These reports are kept outside the deployable source and are never copied into `dist/`. Owner-supplied operator/contact details and a 30-day log policy are now configured, and the release build passes. Fresh public checks still show the older pages and routing; deployment and AdSense crawler access require verification.

43 local browser tools, 13 practical guides, five category hubs, a searchable directory, and seven trust/support pages. Built as crawlable static HTML with small JavaScript modules and local workers. No application server is needed for transformations.

The latest Ahrefs expansion adds JSON/YAML conversion, Unicode notation conversion and Markdown-to-HTML conversion, expands eight existing tool pages, and improves contrast controls and JWT time-claim inspection. See the [expansion audit](docs/UTILITYPILOT-EXPANSION-AUDIT.md), [40-keyword decision map](docs/UTILITYPILOT-AHREFS-EXPANSION-RESEARCH.md) and [implementation report](docs/UTILITYPILOT-EXPANSION-IMPLEMENTATION.md). Run `npm run audit:expansion` against a running preview (default port 4186 for this focused audit; set `AUDIT_BASE` to use another port).

## Run locally

Requires Node.js 22 or newer. On Windows use `npm.cmd` if PowerShell blocks `npm.ps1`.

```sh
npm ci
npm run build
npm start
```

Open http://127.0.0.1:4173. The production output is `dist/`.

## Verify

```sh
npm test
npm run build
npm run audit:site
npm start
# In another terminal, with Google Chrome installed:
npm run test:browser
node tests/workflows.mjs
```

The browser suite checks all tools, all routes, copy/download/reset, 320px and 390px tool layouts, and automated WCAG checks. Processor tests cover independently expected results and boundary cases. Automated accessibility checks do not replace assistive-technology testing.

The October 2026 counter update uses the supplied five-keyword, 12-month Ahrefs history export. See the [current content map](docs/UTILITYPILOT-AHREFS-CONTENT-MAP.md) and [history implementation report](docs/UTILITYPILOT-AHREFS-SEO-IMPLEMENTATION.md). The existing Word Counter now also counts blank-line-separated paragraph blocks. Run `npm run audit:history` with the preview running to check the source data, actual paragraph output, clipboard/download, keyboard use, discovery and accessibility.

The earlier 44-keyword dataset remains separate in the [September content map](docs/UTILITYPILOT-AHREFS-CONTENT-MAP-2026-09-28.md) and [September implementation report](docs/UTILITYPILOT-SEO-CONTENT-IMPLEMENTATION.md). Run `npm run audit:content` to check its preserved source metrics plus current published examples, static text content, fragment links and mobile layouts. Both updates preserve the existing 32 tools and avoid keyword-variant routes.

The independent pre-launch audit added precision, bounds, image, URL, discovery and content fixes. See [the audit report](docs/PRE-LAUNCH-AUDIT.md), [all-route indexability inventory](docs/INDEXABILITY-AUDIT.csv), and [51-page intent review](docs/CONTENT-INTENT-AUDIT.csv). The report includes commands for the additional browser, image and search regression suites. Use `AUDIT_BASE` to point browser tests to a fresh preview, and `AUDIT_CHANNEL=msedge` for the independent Edge audit.

## Production release

Run `npm run build:release` (or `npm.cmd run build:release` on Windows). Owner-confirmed defaults are Fahad (UtilityPilot / Bazmino), bazminoadsense@gmail.com, Hostinger and 30-day access-log retention. Use `SITE_OPERATOR`, `CONTACT_EMAIL`, `LOG_RETENTION`, `HOST_NAME` and `HOST_PRIVACY_URL` to override those facts when they change. The release build rejects missing facts and unsafe contact/link values. This is a project release guard, not Google's eligibility checklist. Contact opens an email draft; reports are never silently submitted. Mailbox delivery and hosting-log deletion are owner-confirmed, not tested through this repository.

Deploy `dist/` on an HTTPS static host. Preserve `_headers` where supported, or copy its security headers into the host configuration. Configure trailing-slash redirects, the non-www canonical host, genuine HTTP 404 responses using `404.html`, and stripping unused query parameters. Do not configure a single-page-app fallback returning HTTP 200 for missing paths. The supplied Node server demonstrates these behaviors and can run behind an HTTPS reverse proxy with `BIND_HOST` and `PORT` configured.

Recheck headers, 404 status, canonical redirects, and network requests on the actual host. Record the provider's real log retention and privacy URL. No hosting account, DNS configuration or deployment credentials were supplied; this repository does not imply that utilitypilot.online is already deployed.

## Structure

SEO and hosting handover: [SEO checklist](docs/SEO-LAUNCH-CHECKLIST.md), [Hostinger deployment](docs/HOSTINGER-DEPLOYMENT.md), and [backlink strategy](docs/BACKLINK-STRATEGY.md). Run `node tests/seo-checklist.mjs` after building to verify the added metadata, verification escaping, canonical hosting patterns and HTTPS proxy behavior. Live TLS and Search Console verification require deployment and owner access.

- `src/data/`: central registry, tool controls, original tool explanations and guides.
- `src/lib/`: bounded text, CSV/JSON, web/color and image processors.
- `src/client/`: search, shared tool interactions, worker, lazy image controls.
- `src/render.mjs`: static layout, homepage, directory, category/tool/guide templates and metadata.
- `src/trust.mjs`: support and factual data-handling pages.
- `scripts/`: build, local server and static audit.
- `tests/`: processor and real-browser verification.
- `docs/`: original research and implementation handover.

Add tools through the registry, configuration, processor and content together. Add meaningful tests, related links and a guide association. Only working, supported tools should be included in the public registry. Do not rerun `import-catalog.mjs` without reviewing its diff against current implementation metadata.

## New tool expansion

Eight distinct tools extend the original 32-tool collection. See [the existing-site audit](docs/UTILITYPILOT-EXISTING-SITE-AUDIT.md), [candidate research](docs/UTILITYPILOT-NEW-PAGE-RESEARCH.md) and [implementation report](docs/UTILITYPILOT-NEW-PAGE-IMPLEMENTATION.md). New tools use local processors, with JSON tree exploration and a six-tool Developer Tools hub. Run `npm run audit:new-tools` against the preview after building.
