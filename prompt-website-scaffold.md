# Scaffold liant.ai — Fumadocs + Next.js

## What you're building

A website for **liant** (`liant.ai`) — a composable terminal platform for AI-assisted development. The CLI tool is called **defuse** (`dfs`). Liant is the org/brand ("that which binds," from French *liant* — the cement in concrete, the oil in paint), defuse is the product.

Create a complete Fumadocs + Next.js site in this repo (`website/`) that serves both the marketing landing page and documentation. Deploy target is Vercel. Domain is `liant.ai`.

## Design philosophy

Before writing any code, read and internalize these principles. They override any generic defaults.

**Taste parameters** (adapted from [taste-skill](https://github.com/Leonxlnx/taste-skill)):
- `DESIGN_VARIANCE: 5` — Structured but not boring. Left-aligned hero, asymmetric whitespace. No centered-everything layouts.
- `MOTION_INTENSITY: 3` — Subtle. Fade-ins on scroll, hover state transitions. No spring physics, no parallax, no magnetic cursors.
- `VISUAL_DENSITY: 3` — Airy. Generous whitespace. Let content breathe. This is a developer tool site, not a dashboard.

**Anti-slop rules:**
- Centered hero H1 sections are BANNED. Use left-aligned or split-screen layouts.
- Generic card grids with identical box shadows are BANNED. Use border-top, negative space, or typographic hierarchy to separate content.
- Stock gradient blobs, mesh backgrounds, and glassmorphism are BANNED.
- Rainbow or multi-color accent schemes are BANNED. One accent hue, varied by lightness.
- Rounded-2xl on everything is BANNED. Use sharp corners (rounded-none or rounded-sm max) — this is a terminal tool.
- `"Built with ❤️"` or similar filler footer copy is BANNED.

**What it should feel like:** The physical texture of a well-bound book. The precision of a machinist's blueprint. The restraint of a Dieter Rams product.

**Reference sites** (study these for layout, spacing, and tone):
- [kaneo.app](https://kaneo.app/) — clean hierarchy, generous whitespace, restrained feature sections, no visual noise
- [llmgateway.io](https://llmgateway.io/) — strong typographic hierarchy, muted palette with confident accent, feature list as scannable blocks not card soup
- [ui.shadcn.com](https://ui.shadcn.com/) — the gold standard for developer tool aesthetics. Sharp, systematic, no decoration
- cmux.dev and opencode.ai — for overall tone and speed

---

## Brand guidelines

### Name & voice
- **Brand name**: liant (lowercase, always)
- **Product name**: defuse (lowercase in prose, `dfs` in CLI context)
- **Tagline**: "that which binds."
- **Voice**: Direct, technical, zero-filler. Write like a senior engineer's README — not a marketing team's landing page.

### Typography
- **Slab serif** (headings): **Hepta Slab** (Google Fonts, variable font). Load via `next/font/google`. A slab-serif revival based on Bruce & Co. Antique 307 — geometric, industrial, quietly confident. Use weight 300–400 for elegant section headings, 500–600 for hero H1. The variable axis (Hairline → Black) gives full range from a single file.
- **Sans** (body, UI): **Atkinson Hyperlegible Next** (Google Fonts, variable font). Load via `next/font/google`. Calm, highly legible, humanist grotesque. Use weight 400 for body, 500–600 for nav/buttons/emphasis. Designed for maximum letterform distinction — every character is unambiguous.
- **Mono** (code, CLI): **Lekton** (Google Fonts). Load via `next/font/google`. Inspired by Olivetti typewriters — trispaced (250/500/750 unit widths), industrial character. Shares mid-century material heritage with Hepta Slab. Use for code blocks, inline `code`, install CTA, terminal output.
- **Scale**: Restrained. H1 is large but not comically huge. Body is 16–18px. The slab-serif headings create hierarchy through weight and texture, not size extremes.
- **Pairing rule**: Hepta Slab for editorial/marketing headings (landing page H1, section titles, hero). Atkinson for everything functional (body prose, nav, buttons, docs content, UI labels). Lekton for anything that would appear in a terminal.

### Color system — OKLCH

All colors defined in OKLCH (`oklch(L C H)`) for perceptual uniformity. Define CSS custom properties with oklch values and hex fallbacks using `@supports`.

#### Palette

**Accent: Amber/Gold** — warm, grounded, evokes binding agents (resin, rosin, linseed oil). The palette should feel *muted but bold* — colors that are confident and saturated enough to command attention, but desaturated enough to never feel garish or startup-y. Think aged brass, not neon yellow.

```css
/* Accent scale — hue ~75 (amber/gold), moderate chroma for muted boldness */
--accent-50:  oklch(0.97 0.015 75);  /* barely-there tint for hover backgrounds */
--accent-100: oklch(0.92 0.04 75);
--accent-200: oklch(0.84 0.08 75);
--accent-300: oklch(0.74 0.12 75);
--accent-400: oklch(0.65 0.14 75);   /* primary accent — links, buttons, highlights */
--accent-500: oklch(0.55 0.12 75);   /* accent on dark backgrounds */
--accent-600: oklch(0.45 0.10 75);
--accent-700: oklch(0.35 0.08 75);
```

**Neutral scale — achromatic (chroma ~0.005 for slight warmth)**

```css
/* Dark mode neutrals */
--gray-950: oklch(0.13 0.005 75);    /* page background (dark) */
--gray-900: oklch(0.17 0.005 75);    /* card/surface background (dark) */
--gray-800: oklch(0.23 0.005 75);    /* borders (dark) */
--gray-700: oklch(0.30 0.005 75);    /* muted text (dark) */
--gray-400: oklch(0.55 0.005 75);    /* secondary text (dark) */
--gray-200: oklch(0.80 0.005 75);    /* primary text (dark) */
--gray-100: oklch(0.90 0.005 75);    /* headings (dark) */
--gray-50:  oklch(0.96 0.005 75);    /* bright text (dark) */

/* Light mode neutrals */
--gray-50:  oklch(0.98 0.005 75);    /* page background (light) */
--gray-100: oklch(0.95 0.005 75);    /* surface background (light) */
--gray-200: oklch(0.90 0.005 75);    /* borders (light) */
--gray-300: oklch(0.80 0.005 75);    /* muted text (light) */
--gray-600: oklch(0.45 0.005 75);    /* secondary text (light) */
--gray-800: oklch(0.23 0.005 75);    /* primary text (light) */
--gray-900: oklch(0.17 0.005 75);    /* headings (light) */
--gray-950: oklch(0.13 0.005 75);    /* strongest text (light) */
```

#### Implementation

Define semantic tokens in `app/globals.css` using `@supports` for oklch with hex fallbacks:

```css
@layer base {
  :root {
    /* Light mode semantic tokens */
    --background: #fafaf8;
    --foreground: #1a1a18;
    --muted: #737370;
    --border: #e5e5e2;
    --accent: #b8860b;
    --accent-foreground: #1a1a18;

    @supports (color: oklch(0 0 0)) {
      --background: oklch(0.98 0.005 75);
      --foreground: oklch(0.13 0.005 75);
      --muted: oklch(0.55 0.005 75);
      --border: oklch(0.90 0.005 75);
      --accent: oklch(0.65 0.14 75);
      --accent-foreground: oklch(0.13 0.005 75);
    }
  }

  .dark {
    --background: #1a1a18;
    --foreground: #e5e5e2;
    --muted: #737370;
    --border: #2e2e2b;
    --accent: #d4a030;
    --accent-foreground: #fafaf8;

    @supports (color: oklch(0 0 0)) {
      --background: oklch(0.13 0.005 75);
      --foreground: oklch(0.90 0.005 75);
      --muted: oklch(0.55 0.005 75);
      --border: oklch(0.23 0.005 75);
      --accent: oklch(0.74 0.12 75);
      --accent-foreground: oklch(0.96 0.005 75);
    }
  }
}
```

Wire these tokens into Tailwind and Fumadocs theming so both the landing page and docs consume the same palette.

### Theme switching

Support light and dark mode via Fumadocs' built-in theme provider (which uses `next-themes`). Default to system preference. Include a toggle in the nav. Dark mode is the "hero" mode — design dark-first, then verify light mode works cleanly.

---

## Tech stack

- Next.js 15 (App Router)
- Fumadocs (`fumadocs-core` + `fumadocs-ui` + `fumadocs-mdx`) — latest
- Tailwind CSS v4
- TypeScript
- `pnpm` as package manager

## Repo structure

```
website/
├── app/
│   ├── layout.tsx              # root layout (fonts, metadata, theme provider)
│   ├── globals.css             # oklch tokens, theme variables, base styles
│   ├── page.tsx                # marketing landing page at liant.ai
│   ├── docs/
│   │   └── [[...slug]]/
│   │       └── page.tsx        # fumadocs catch-all route
│   └── api/search/route.ts     # fumadocs search API
├── content/docs/               # MDX doc pages (fumadocs content dir)
│   ├── index.mdx               # docs landing (/docs)
│   ├── getting-started/
│   │   ├── index.mdx           # install + setup
│   │   └── configuration.mdx   # config reference
│   ├── concepts/
│   │   ├── architecture.mdx    # protocol-first architecture
│   │   ├── components.mdx      # swappable components
│   │   └── workflows.mdx       # agent orchestration workflows
│   └── reference/
│       ├── cli.mdx             # dfs CLI reference
│       └── config.mdx          # TOML config file reference
├── lib/
│   └── source.ts               # fumadocs source config
├── source.config.ts            # fumadocs MDX config
├── components/
│   ├── landing/
│   │   ├── hero.tsx            # hero section (left-aligned, split layout)
│   │   ├── features.tsx        # feature grid (NO generic cards)
│   │   ├── architecture.tsx    # architecture diagram section
│   │   └── cta.tsx             # install CTA
│   └── shared/
│       ├── logo.tsx            # liant wordmark (set in Geist Mono, lowercase)
│       └── nav.tsx             # top nav (shared between landing + docs)
├── public/
│   └── og.png                  # placeholder OG image (1200×630)
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .gitignore
```

## Landing page design (app/page.tsx)

### Hero section (left-aligned or split-screen — NOT centered)
- Large heading in **Hepta Slab** (weight 500–600): "Composable terminal platform for AI-assisted development"
- Subhead: "Orchestrate agents, capture searchable history, run cross-model review loops — all inside Ghostty + tmux."
- Install CTA block styled as a terminal prompt with copy button:
  ```
  curl -fsSL https://liant.ai/install | sh
  ```
- Secondary link: "Read the docs →" (accent-colored)
- Right side or below: subtle monospace ASCII showing the architecture stack, or empty space. Not an illustration, not a screenshot, not a gradient blob.

### Features section (NOT a grid of identical cards)
Use typographic hierarchy and whitespace to differentiate. Options: alternating left/right text blocks, a single column with generous spacing, or a border-top-separated list. Each item:

1. **Protocol-first** — Every layer boundary is a contract. Swap any component without touching others.
2. **Terminal-native** — Built on OSC escape sequences, PTY streams, and established terminal conventions.
3. **AI orchestration** — Spawn agents across tmux panes. Cross-model review loops. Automatic context compaction.
4. **Searchable history** — Every command, output, and agent interaction captured to libSQL. Full-text search across projects.
5. **File-first** — Maildir message bus. TOML config. Markdown kanban. Git-trackable everything.
6. **Composable** — Ghostty + tmux + jj + fzf + starship + mise. Best-in-class tools, thin glue.

### Architecture section
- Show the protocol-boundary diagram as a styled monospace block:
  ```
  Ghostty ←OSC 133→ tmux ←PTY→ shells/agents
                      ↕ JSON-RPC
                  orchestrator
                      ↕ SQL
                    libSQL
  ```
- Caption: "~5K lines of glue wiring ~2M lines of existing tools."

### Footer
- Links: GitHub · Docs · MIT License
- "liant — that which binds."
- No fluff, no emoji, no "made with" credits.

---

## Docs pages (content/docs/)

Populate the MDX files with real content extracted from the project files in this repo. The source material is in the v07 files:

- `readme-v07.md` → getting-started (install, setup, usage, config reference)
- `prd-v07-overview.md` → concepts/architecture
- `prd-v07-components.md` → concepts/components
- `prd-v07-workflows.md` → concepts/workflows
- `readme-v07.md` CLI section → reference/cli
- `readme-v07.md` config section → reference/config

Rewrite content for a docs audience (second person, imperative, concise). Don't just copy-paste — adapt the PRD language into user-facing documentation. Strip internal planning notes, `[UNOWNED]` tags, and decision logs.

## Fumadocs configuration

- Enable built-in search (Fumadocs search API route)
- Light and dark mode via built-in theme provider (default to system preference)
- Sidebar navigation matching the `content/docs/` directory structure
- Code blocks with copy button and syntax highlighting
- Breadcrumbs enabled

## Fumadocs theming

Override Fumadocs' default theme to use the oklch brand tokens defined in globals.css:
- Background, text, borders, accent all from CSS custom properties
- Same typography (Geist/Geist Mono)
- The docs should feel like a seamless continuation of the landing page, not a separate product

## SEO & metadata

- Root metadata in layout.tsx:
  - Title template: `%s — liant`
  - Default title: `liant — composable terminal platform`
  - Description: "Orchestrate AI coding agents, capture searchable command history, and run cross-model review loops inside Ghostty + tmux."
  - `metadataBase`: `https://liant.ai`
- Each docs page gets title + description from MDX frontmatter
- OpenGraph image: placeholder `og.png` (1200×630, dark bg with "liant" wordmark in Geist Mono)

## What NOT to do

- No cookie banners, analytics, or tracking.
- No blog section (yet).
- No custom 404 page (Next.js default is fine for now).
- No Vercel analytics or speed insights.
- No `docker-compose` or deployment config — just the app code.
- No component libraries beyond what Fumadocs provides. Plain TSX.
- No placeholder "coming soon" pages. Only pages with real content from the project files.
- No `framer-motion` or other animation libraries. CSS transitions only.
- No stock illustrations, hero images, or decorative SVGs.
- No centered H1 hero layouts.
- No identical-card grids with uniform box shadows.
- No rounded-2xl on containers. Sharp corners (rounded-none or rounded-sm).
- No gradient blobs, glassmorphism, or mesh backgrounds.

## Verification

After scaffolding, the site should:
1. `pnpm install` cleanly
2. `pnpm dev` starts without errors
3. Landing page renders at `/` in both light and dark mode
4. Docs render at `/docs` with working sidebar navigation
5. Theme toggle works (light/dark/system)
6. Search works at `/docs` (Fumadocs built-in)
7. All internal links resolve
8. oklch colors render correctly (check in both Chrome and Safari)
9. `pnpm build` succeeds with no type errors
