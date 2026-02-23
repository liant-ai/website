# Plan: Scaffold liant.ai — Fumadocs + Next.js

## Context

Build the liant.ai website in `website/` — a Fumadocs + Next.js site serving both the marketing landing page and documentation for defuse (`dfs`), a composable terminal platform for AI-assisted development. Source material is the v08 docs in `internal-docs/`.

## Key Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Tailwind version | **v4 (CSS config)** | Fumadocs v16 requires it; no `tailwind.config.ts` |
| Fumadocs version | **v16** (latest) | fumadocs-ui 16.x, fumadocs-core 16.x, fumadocs-mdx 14.x |
| Logo font | **Hepta Slab** | Consistent with heading typeface, per user preference |
| Source material | **v08 files** | Only version available; product name confirmed as "Defuse" / `dfs` |
| Package manager | **pnpm** | Per prompt spec |
| Search | **Orama** (Fumadocs built-in) | Default, self-hosted, free |

## File Structure

```
website/
├── app/
│   ├── layout.tsx              # RootProvider, fonts, metadata
│   ├── global.css              # Tailwind v4 imports + oklch tokens + Fumadocs preset
│   ├── page.tsx                # Landing page
│   ├── docs/
│   │   ├── layout.tsx          # DocsLayout (sidebar, TOC)
│   │   └── [[...slug]]/
│   │       └── page.tsx        # Fumadocs catch-all
│   └── api/search/route.ts     # Orama search API
├── content/docs/               # MDX content
│   ├── index.mdx
│   ├── meta.json               # Fumadocs sidebar ordering
│   ├── getting-started/
│   │   ├── meta.json
│   │   ├── index.mdx           # Install + setup
│   │   └── configuration.mdx   # Config reference
│   ├── concepts/
│   │   ├── meta.json
│   │   ├── architecture.mdx
│   │   ├── components.mdx
│   │   └── workflows.mdx
│   └── reference/
│       ├── meta.json
│       ├── cli.mdx
│       └── config.mdx
├── components/
│   ├── landing/
│   │   ├── hero.tsx
│   │   ├── features.tsx
│   │   ├── architecture.tsx
│   │   └── cta.tsx
│   └── shared/
│       └── logo.tsx            # Hepta Slab wordmark
├── lib/
│   └── source.ts               # Fumadocs loader
├── source.config.ts            # Fumadocs MDX config
├── mdx-components.tsx          # MDX component mappings
├── next.config.mjs
├── tsconfig.json
├── package.json
├── postcss.config.mjs
└── .gitignore
```

## Implementation Steps

### 1. Initialize project

- `pnpm init` in `website/`
- Install deps: `next@15`, `react@19`, `react-dom@19`, `fumadocs-ui@16`, `fumadocs-core@16`, `fumadocs-mdx@14`, `tailwindcss@4`, `@tailwindcss/postcss`, `typescript`, `@types/react`, `@types/node`
- Create `tsconfig.json`, `next.config.mjs` (wrapped with `createMDX`), `postcss.config.mjs`
- Create `.gitignore` (node_modules, .next, .source, out)

### 2. Tailwind + Fumadocs CSS (`global.css`)

```css
@import 'tailwindcss';
@import 'fumadocs-ui/css/neutral.css';
@import 'fumadocs-ui/css/preset.css';

@theme {
  /* Override Fumadocs variables with oklch brand tokens */
  --color-fd-background: oklch(0.98 0.005 75);
  --color-fd-foreground: oklch(0.13 0.005 75);
  --color-fd-primary: oklch(0.65 0.14 75);
  --color-fd-border: oklch(0.90 0.005 75);
  --color-fd-muted: oklch(0.55 0.005 75);
  /* ... dark mode via .dark selector */
}
```

Also define semantic `--background`, `--foreground`, `--accent`, etc. custom properties for landing page components.

### 3. Fonts (root `layout.tsx`)

Load via `next/font/google`:
- **Hepta Slab** (variable, weights 300-600) → headings + logo
- **Atkinson Hyperlegible Next** (variable, weights 400-600) → body/UI
- **Lekton** (400, 700) → code/terminal

Apply via CSS variables on `<html>`, reference in Tailwind config via `@theme`.

### 4. Root layout (`app/layout.tsx`)

- `RootProvider` from `fumadocs-ui/provider` wrapping children
- Font CSS variables on `<html>`
- Metadata: title template `%s — liant`, default title, description, OG image, metadataBase

### 5. Fumadocs source config

**`source.config.ts`**: `defineDocs({ dir: 'content/docs' })`

**`lib/source.ts`**: Import generated `.source` collections, create loader with `docs.toFumadocsSource()`

**`app/docs/layout.tsx`**: `DocsLayout` with sidebar from source tree

**`app/docs/[[...slug]]/page.tsx`**: Render MDX with `source.getPage()`, generate static params

**`app/api/search/route.ts`**: `createFromSource(source)`

### 6. Landing page components

All components follow the anti-slop rules: left-aligned, sharp corners, no card grids, no gradient blobs.

**`hero.tsx`**: Split layout — left side has Hepta Slab H1 ("Composable terminal platform for AI-assisted development"), subhead in Atkinson, install CTA in Lekton mono styled as terminal prompt with copy button. Right side: empty or subtle monospace architecture diagram.

**`features.tsx`**: Vertical list with border-top separators, generous whitespace. Each feature: small mono label, Hepta Slab heading, Atkinson body. The 6 features from the prompt.

**`architecture.tsx`**: Monospace `<pre>` block showing the protocol diagram. Caption below.

**`cta.tsx`**: Terminal-styled install block + "Read the docs →" link.

**`logo.tsx`**: "liant" in Hepta Slab, lowercase.

### 7. Landing page (`app/page.tsx`)

Compose: Hero → Features → Architecture → CTA → Footer. Footer: GitHub · Docs · MIT License + "liant — that which binds."

### 8. MDX documentation content

Adapt from v08 source files (rewrite for docs audience, 2nd person, imperative):

| MDX file | Source | Content |
|----------|--------|---------|
| `index.mdx` | — | Docs landing, brief overview + nav |
| `getting-started/index.mdx` | `readme-v08.md` | Install Ghostty, install defuse, shell setup, API keys |
| `getting-started/configuration.mdx` | `readme-v08.md` config section | `config.toml` reference, directory layout |
| `concepts/architecture.mdx` | `prd-v08-overview.md` | 8-layer stack, protocol-first, swappability |
| `concepts/components.mdx` | `prd-v08-components.md` | Ghostty, tmux, libSQL, AMQ, pi-mono, etc. |
| `concepts/workflows.mdx` | `prd-v08-workflows.md` | Key workflows (block capture, agent launch, review loop, recursive decomposition) |
| `reference/cli.mdx` | `readme-v08.md` CLI section | `dfs` command reference |
| `reference/config.mdx` | `readme-v08.md` config section | Full TOML config reference |

Each MDX file gets frontmatter: `title`, `description`.

### 9. Theme / dark mode

- Fumadocs `RootProvider` handles `next-themes` integration
- Design dark-first (dark is hero mode), verify light works
- Override Fumadocs `fd-` CSS variables in both `:root` and `.dark`

## Verification

1. `pnpm install` — clean install, no errors
2. `pnpm dev` — starts without errors
3. `/` — landing page renders in both light/dark
4. `/docs` — docs render with sidebar navigation
5. Theme toggle works
6. Search works at `/docs`
7. Internal links resolve (docs nav, landing → docs)
8. `pnpm build` — succeeds with no type errors
