# Story 1: Landing Page

## Goal

Build the full marketing landing page at `/` following the brand guidelines and anti-slop rules. Replace the placeholder components created by Story 0.

## Prerequisites

Story 0 must be merged to main. Branch from the post-Story-0 main.

## Files to Modify (ONLY these files — do not touch anything else)

- `components/landing/hero.tsx`
- `components/landing/features.tsx`
- `components/landing/architecture.tsx`
- `components/landing/cta.tsx`
- `components/shared/logo.tsx`
- `app/page.tsx`

## DO NOT MODIFY

- `app/layout.tsx`
- `app/globals.css`
- Any file under `app/docs/`
- Any file under `content/`
- Any config file (`package.json`, `tsconfig.json`, etc.)

## Brand & Design Rules

**Typography** (fonts are already loaded in layout.tsx as CSS variables):
- Headings: `var(--font-heading)` (Hepta Slab) — weight 300–400 for sections, 500–600 for hero H1
- Body/UI: `var(--font-body)` (Atkinson Hyperlegible Next) — weight 400 body, 500–600 buttons/nav
- Code/terminal: `var(--font-mono)` (Lekton)

**Colors** (CSS custom properties already defined in globals.css):
- Use `var(--background)`, `var(--foreground)`, `var(--muted)`, `var(--border)`, `var(--accent)`, `var(--accent-foreground)` or the Fumadocs `fd-` equivalents via Tailwind

**Anti-slop rules** (violations = rejection):
- NO centered H1 hero sections — use left-aligned or split-screen layout
- NO identical card grids with uniform box shadows — use border-top, negative space, or typographic hierarchy
- NO gradient blobs, mesh backgrounds, glassmorphism
- NO rounded-2xl — sharp corners only (rounded-none or rounded-sm max)
- NO stock illustrations, hero images, decorative SVGs
- NO framer-motion — CSS transitions only
- NO emojis in content

**Design feel**: The precision of a machinist's blueprint. The restraint of a Dieter Rams product.

## Component Specifications

### `components/shared/logo.tsx`
- "liant" wordmark in Hepta Slab (the heading font), lowercase
- Export a `Logo` component that accepts optional className

### `components/landing/hero.tsx`
- **Layout**: Split-screen or strong left-aligned — NOT centered
- **Heading** (Hepta Slab, weight 500–600): "Composable terminal platform for AI-assisted development"
- **Subhead** (Atkinson, regular): "Orchestrate agents, capture searchable history, run cross-model review loops — all inside Ghostty + tmux."
- **Install CTA**: Terminal-styled block with copy button:
  ```
  curl -fsSL https://liant.ai/install | sh
  ```
  Style as monospace (Lekton), dark surface with border, copy-to-clipboard button
- **Secondary link**: "Read the docs →" — accent-colored, links to `/docs`
- Right side or below: subtle monospace ASCII showing architecture stack, OR generous empty space. NOT an illustration.

### `components/landing/features.tsx`
- **Layout**: Vertical list with border-top separators and generous whitespace. NOT a grid of identical cards.
- Each feature: small monospace label (Lekton), heading (Hepta Slab), body text (Atkinson)
- Features (use these exact items):
  1. **Protocol-first** — Every layer boundary is a contract. Swap any component without touching others.
  2. **Terminal-native** — Built on OSC escape sequences, PTY streams, and established terminal conventions.
  3. **AI orchestration** — Spawn agents across tmux panes. Cross-model review loops. Automatic context compaction.
  4. **Searchable history** — Every command, output, and agent interaction captured to libSQL. Full-text search across projects.
  5. **File-first** — Maildir message bus. TOML config. Markdown kanban. Git-trackable everything.
  6. **Composable** — Ghostty + tmux + jj + fzf + starship + mise. Best-in-class tools, thin glue.

### `components/landing/architecture.tsx`
- Monospace `<pre>` block (Lekton font) showing:
  ```
  Ghostty ←OSC 133→ tmux ←PTY→ shells/agents
                      ↕ JSON-RPC
                  orchestrator
                      ↕ SQL
                    libSQL
  ```
- Caption below: "~5K lines of glue wiring ~2M lines of existing tools."
- Dark surface background, subtle border

### `components/landing/cta.tsx`
- Terminal-styled install block (same as hero but can be standalone section)
- "Read the docs →" link to `/docs`

### `app/page.tsx`
- Import and compose: Hero → Features → Architecture → CTA → Footer
- **Footer** at bottom of page:
  - Links: GitHub · Docs · MIT License
  - "liant — that which binds."
  - No fluff, no emoji, no "made with" credits
- Page should use `var(--background)` and `var(--foreground)` for theming

## Verification

```bash
pnpm build
```

Must pass. Then visually verify:
- Landing page renders at `/`
- Left-aligned hero (NOT centered)
- Features displayed as vertical list with border-top separators (NOT card grid)
- Architecture diagram renders as monospace block
- Copy button on install CTA works
- Footer has correct links and tagline
- Works in both dark and light mode (check via theme toggle)

## Commit

```
feat: build landing page with hero, features, architecture, and footer

Left-aligned split-screen hero, border-top separated feature list,
monospace architecture diagram, terminal-styled install CTA.
```
