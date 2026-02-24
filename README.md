# Liant Website

Marketing site and documentation for [liant.ai](https://liant.ai), built with Next.js 16 and Fumadocs. Deployed to Cloudflare Workers.

## Tech stack

- **Next.js 16** (App Router)
- **Fumadocs** — MDX-based documentation
- **Tailwind CSS v4** — CSS-first config
- **OpenNext + Cloudflare Workers** — edge deployment
- **pnpm** — package manager

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Docs are served at `/docs` locally, and at `docs.liant.ai` in production (via middleware rewrite).

## Project structure

```
app/
  page.tsx          # Landing page
  layout.tsx        # Root layout (fonts, global styles)
  docs/             # Fumadocs docs app
content/
  docs/             # MDX source files
lib/
  source.ts         # Fumadocs source loader
  layout.shared.tsx # Shared nav config
middleware.ts       # docs.liant.ai → /docs rewrite
source.config.ts    # Fumadocs MDX config
wrangler.jsonc      # Cloudflare Workers config
```

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start local dev server |
| `pnpm build` | Production build (Next.js) |
| `pnpm preview` | Build + preview with Wrangler locally |
| `pnpm deploy` | Build + deploy to Cloudflare Workers |
| `pnpm lint` | Run ESLint |
| `pnpm types:check` | Type-check TypeScript |

## Adding docs

Create MDX files under `content/docs/`. Update `meta.json` in each directory to control page order:

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
- `docs.liant.ai/*`
