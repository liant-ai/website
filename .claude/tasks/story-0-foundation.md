# Story 0: Foundation Scaffold

## Goal

Create the complete project skeleton for a Fumadocs + Next.js 15 site so that `pnpm install && pnpm build` passes. Every file that any subsequent story will need must exist (as a placeholder if necessary).

## Prerequisites

None — this is the first story.

## Strategy: Scaffold First, Then Customize

Use `pnpm create fumadocs-app` to get a **known-working baseline**, then customize it. This eliminates config guesswork for version-specific Fumadocs/Next.js/Tailwind v4 APIs.

## Step 1: Scaffold with create-fumadocs-app

```bash
cd /path/to/worktree
pnpm create fumadocs-app . --name liant-website
```

If the CLI prompts for options, choose:
- Content source: **Fumadocs MDX**
- Package manager: **pnpm**

Verify the scaffold works before making any changes:
```bash
pnpm install && pnpm build
```

If `pnpm build` fails at this stage, debug the scaffold itself before proceeding.

## Step 2: Add Cloudflare deployment

```bash
pnpm add @opennextjs/cloudflare
pnpm add -D wrangler
```

Add to `package.json` scripts:
```json
"preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
"deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy"
```

Create `open-next.config.ts`:
```typescript
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig();
```

Create `wrangler.jsonc`:
```jsonc
{
  "name": "liant-website",
  "main": ".open-next/worker.js",
  "compatibility_date": "2024-09-23",
  "compatibility_flags": ["nodejs_compat"]
}
```

Add `.open-next/` to `.gitignore`.

## Step 3: Customize Fonts

Replace the default fonts in the root `app/layout.tsx` with these three, loaded via `next/font/google`:

```typescript
import { Hepta_Slab, Atkinson_Hyperlegible_Next, Lekton } from 'next/font/google';

const heptaSlab = Hepta_Slab({
  subsets: ['latin'],
  variable: '--font-hepta-slab',
  display: 'swap',
});

const atkinson = Atkinson_Hyperlegible_Next({
  subsets: ['latin'],
  variable: '--font-atkinson-hyperlegible-next',
  display: 'swap',
});

const lekton = Lekton({
  subsets: ['latin'],
  variable: '--font-lekton',
  weight: ['400', '700'],
  display: 'swap',
});
```

Apply all three font variables to the `<html>` element's `className`. Set the body font to Atkinson via `font-family: var(--font-atkinson-hyperlegible-next)` (in CSS or as a className).

**Font roles:**
- `--font-hepta-slab` → headings, logo (Hepta Slab — slab serif)
- `--font-atkinson-hyperlegible-next` → body, UI, nav (Atkinson Hyperlegible Next — sans)
- `--font-lekton` → code blocks, terminal, CLI references (Lekton — mono)

## Step 4: Customize Colors (OKLCH brand tokens)

Edit the main CSS file (likely `app/globals.css` or `app/global.css` — check what the scaffold created) to override Fumadocs CSS variables with the brand palette.

**Keep all existing Fumadocs imports** (`@import 'tailwindcss'`, `@import 'fumadocs-ui/css/...'`, etc). Add/override these variables:

```css
:root {
  /* Brand semantic tokens — hex fallbacks */
  --background: #fafaf8;
  --foreground: #1a1a18;
  --muted: #737370;
  --border: #e5e5e2;
  --accent: #b8860b;
  --accent-foreground: #1a1a18;

  /* Override Fumadocs variables for light mode */
  --color-fd-background: #fafaf8;
  --color-fd-foreground: #1a1a18;
  --color-fd-primary: #b8860b;
  --color-fd-border: #e5e5e2;
  --color-fd-muted-foreground: #737370;
}

@supports (color: oklch(0 0 0)) {
  :root {
    --background: oklch(0.98 0.005 75);
    --foreground: oklch(0.13 0.005 75);
    --muted: oklch(0.55 0.005 75);
    --border: oklch(0.90 0.005 75);
    --accent: oklch(0.65 0.14 75);
    --accent-foreground: oklch(0.13 0.005 75);

    --color-fd-background: oklch(0.98 0.005 75);
    --color-fd-foreground: oklch(0.13 0.005 75);
    --color-fd-primary: oklch(0.65 0.14 75);
    --color-fd-border: oklch(0.90 0.005 75);
    --color-fd-muted-foreground: oklch(0.55 0.005 75);
  }
}

.dark {
  --background: #1a1a18;
  --foreground: #e5e5e2;
  --muted: #737370;
  --border: #2e2e2b;
  --accent: #d4a030;
  --accent-foreground: #fafaf8;

  --color-fd-background: #1a1a18;
  --color-fd-foreground: #e5e5e2;
  --color-fd-primary: #d4a030;
  --color-fd-border: #2e2e2b;
  --color-fd-muted-foreground: #737370;
}

@supports (color: oklch(0 0 0)) {
  .dark {
    --background: oklch(0.13 0.005 75);
    --foreground: oklch(0.90 0.005 75);
    --muted: oklch(0.55 0.005 75);
    --border: oklch(0.23 0.005 75);
    --accent: oklch(0.74 0.12 75);
    --accent-foreground: oklch(0.96 0.005 75);

    --color-fd-background: oklch(0.13 0.005 75);
    --color-fd-foreground: oklch(0.90 0.005 75);
    --color-fd-primary: oklch(0.74 0.12 75);
    --color-fd-border: oklch(0.23 0.005 75);
    --color-fd-muted-foreground: oklch(0.55 0.005 75);
  }
}
```

## Step 5: Customize Metadata

In `app/layout.tsx`, set:

```typescript
export const metadata: Metadata = {
  title: {
    template: '%s — liant',
    default: 'liant — composable terminal platform',
  },
  description:
    'Orchestrate AI coding agents, capture searchable command history, and run cross-model review loops inside Ghostty + tmux.',
  metadataBase: new URL('https://liant.ai'),
};
```

## Step 6: Update Docs Layout Nav

In the docs layout file (likely `app/docs/layout.tsx`), set the nav title to `'liant'`.

## Step 7: Update Fumadocs Source Config

Ensure `source.config.ts` points to `content/docs`:
```typescript
export const docs = defineDocs({
  dir: 'content/docs',
});
```

And update `lib/source.ts` to use `/docs` as the base URL:
```typescript
export const source = loader({
  baseUrl: '/docs',
  source: createMDXSource(docs, meta),
});
```

(If the scaffold already has this, leave it.)

## Step 8: Create Placeholder Landing Components

Create these files with minimal valid React components:

### `components/landing/hero.tsx`
```typescript
export default function Hero() {
  return <section className="py-24"><h1>Hero placeholder</h1></section>;
}
```

### `components/landing/features.tsx`
```typescript
export default function Features() {
  return <section className="py-24"><h2>Features placeholder</h2></section>;
}
```

### `components/landing/architecture.tsx`
```typescript
export default function Architecture() {
  return <section className="py-24"><h2>Architecture placeholder</h2></section>;
}
```

### `components/landing/cta.tsx`
```typescript
export default function CTA() {
  return <section className="py-24"><h2>CTA placeholder</h2></section>;
}
```

### `components/shared/logo.tsx`
```typescript
export function Logo({ className }: { className?: string }) {
  return <span className={className}>liant</span>;
}
```

### `app/page.tsx`
Replace whatever the scaffold created with:
```typescript
import Hero from '@/components/landing/hero';
import Features from '@/components/landing/features';
import Architecture from '@/components/landing/architecture';
import CTA from '@/components/landing/cta';

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Architecture />
      <CTA />
    </main>
  );
}
```

## Step 9: Create Placeholder MDX Content

Delete whatever example docs the scaffold created. Replace with:

### `content/docs/meta.json`
```json
["getting-started", "concepts", "reference"]
```

### `content/docs/index.mdx`
```mdx
---
title: Documentation
description: Documentation for defuse, a composable terminal platform.
---

Welcome to the defuse documentation.
```

### `content/docs/getting-started/meta.json`
```json
["index", "configuration"]
```

### `content/docs/getting-started/index.mdx`
```mdx
---
title: Getting Started
description: Install and configure defuse.
---

Getting started guide.
```

### `content/docs/getting-started/configuration.mdx`
```mdx
---
title: Configuration
description: Configure defuse for your environment.
---

Configuration reference.
```

### `content/docs/concepts/meta.json`
```json
["architecture", "components", "workflows"]
```

### `content/docs/concepts/architecture.mdx`
```mdx
---
title: Architecture
description: The eight-layer protocol-first architecture.
---

Architecture overview.
```

### `content/docs/concepts/components.mdx`
```mdx
---
title: Components
description: Tools and services that make up defuse.
---

Component reference.
```

### `content/docs/concepts/workflows.mdx`
```mdx
---
title: Workflows
description: Common workflows and message flows.
---

Workflow documentation.
```

### `content/docs/reference/meta.json`
```json
["cli", "config"]
```

### `content/docs/reference/cli.mdx`
```mdx
---
title: CLI Reference
description: Complete dfs command reference.
---

CLI reference.
```

### `content/docs/reference/config.mdx`
```mdx
---
title: Configuration Reference
description: Complete config.toml reference.
---

Configuration reference.
```

## Design Rules (apply to ALL files)
- Sharp corners only: `rounded-none` or `rounded-sm` max
- No gradient blobs, glassmorphism, mesh backgrounds
- No centered H1 hero layouts
- No identical-card grids with uniform box shadows
- No framer-motion or animation libraries — CSS transitions only
- No component libraries beyond Fumadocs
- **No `export const runtime = "edge"`** anywhere — Cloudflare deployment uses Node.js compat mode

## Verification

Run these commands — ALL must pass:
```bash
pnpm install
pnpm build
```

If `pnpm build` fails after your customizations, diff against the scaffold baseline to find what broke.

Report back with:
1. The worktree path
2. The branch name
3. Output of `pnpm build` (success or errors)
4. List of all files created/modified
5. What the scaffold generated vs. what you customized

## Commit

After verification passes, commit all files with message:
```
feat: scaffold fumadocs + next.js 15 project skeleton

Scaffolded via create-fumadocs-app, customized with oklch brand
tokens, fonts (Hepta Slab, Atkinson Hyperlegible Next, Lekton),
Cloudflare Pages deployment config, and placeholder content.
```
