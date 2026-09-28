# UtilityPilot

32 local browser tools, 12 practical guides, four category hubs, a searchable directory, and seven trust/support pages. Built as crawlable static HTML with small JavaScript modules and local workers. No application server is needed for transformations.

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

The September 2026 text-content expansion uses the supplied 44-row Ahrefs export. See the [keyword content map](docs/UTILITYPILOT-AHREFS-CONTENT-MAP.md) and [implementation report](docs/UTILITYPILOT-SEO-CONTENT-IMPLEMENTATION.md). After building and starting the preview, run `npm run audit:content` to verify the source metrics, published examples, static content, fragment links, search aliases and mobile layouts. The eight text pages share the existing tools; no keyword-variant routes were added.

The independent pre-launch audit added precision, bounds, image, URL, discovery and content fixes. See [the audit report](docs/PRE-LAUNCH-AUDIT.md), [all-route indexability inventory](docs/INDEXABILITY-AUDIT.csv), and [51-page intent review](docs/CONTENT-INTENT-AUDIT.csv). The report includes commands for the additional browser, image and search regression suites. Use `AUDIT_BASE` to point browser tests to a fresh preview, and `AUDIT_CHANNEL=msedge` for the independent Edge audit.

## Production release

The local build is functional. Public release needs factual operator and hosting details. Set `SITE_OPERATOR`, `CONTACT_EMAIL`, `HOST_NAME`, `HOST_PRIVACY_URL`, and `LOG_RETENTION`, then build with `RELEASE=1`. The build rejects missing facts. Contact opens an email draft only when the real address is configured; reports are otherwise prepared/copied/downloaded locally, never silently submitted.

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
