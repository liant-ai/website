# Liant Website

Marketing site and docs for [liant.ai](https://liant.ai), built with Next.js 16 + Vinext and deployed to Cloudflare Workers.

## Tech stack

- **Next.js 16** (App Router)
- **Docusaurus** (workspace package `docs-site`) — docs source, bundled into `/docs`
- **Tailwind CSS v4** — CSS-first config
- **Vinext + Cloudflare Workers** — edge deployment
- **pnpm** — package manager

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) (or the next available Vite port).

Docs are served at `/docs` from the same deployment artifact.

## Project structure

```
app/
  page.tsx          # Landing page
  layout.tsx        # Root layout (fonts, global styles)
docs-site/          # Docusaurus docs source
worker/
  index.ts          # Cloudflare Worker entry
vite.config.ts      # Vinext/Vite configuration
wrangler.jsonc      # Cloudflare Workers config
```

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the primary site |
| `pnpm dev:web` | Start only the primary site (Vite) |
| `pnpm dev:prod-shape` | Build and run through `wrangler dev` (closest local prod runtime) |
| `pnpm dev:docs-site` | Start the docs source site directly (Docusaurus dev server) |
| `pnpm build` | Build the primary site and bundle docs into `/docs` |
| `pnpm preview` | Build + preview the primary site locally |
| `pnpm preview:docs-site` | Build + serve docs source site output |
| `pnpm deploy` | Build + deploy to Cloudflare Workers |
| `pnpm lint` | Run ESLint |
| `pnpm types:check` | Type-check TypeScript |

`dev:prod-shape` intentionally uses quieter Wrangler logging to hide non-actionable tooling noise while preserving real warnings/errors.

## Docs Development

Create MDX files under `docs-site/docs/`. They are bundled into this app at `/docs` during `pnpm build`. Update `meta.json` in each directory to control page order:

```json
{ "pages": ["index", "configuration"] }
```

## Deployment

Pushes to `main` automatically deploy via GitHub Actions (`.github/workflows/deploy-workers.yml`).

### Required secrets

| Secret | Description |
|---|---|
| `CLOUDFLARE_API_TOKEN` | API token with Workers Scripts: Edit, Workers Routes: Edit, Account Settings: Read |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID |

### Custom domain

In the Cloudflare dashboard, add Worker routes for your domain:

- `liant.ai/*`
- `www.liant.ai/*`
