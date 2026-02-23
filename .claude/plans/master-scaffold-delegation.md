# Master Plan: Scaffold liant.ai via Delegated Subagents

## Context

We're building the liant.ai website from a blank repo using Fumadocs + Next.js 15. The work is broken into 6 stories (0–5) designed for delegation to sonnet/haiku subagents running in isolated git worktrees. The critical constraint is **minimizing merge conflicts** — each story owns a distinct set of files with zero overlap.

**Note**: The product (defuse/dfs) doesn't exist yet. Docs content is scaffolded/stubbed — written as if documenting a real product, but not dependent on working software.

## Execution Strategy

```
                    ┌─────────────┐
                    │  Story 0    │  ← Sequential (foundation)
                    │  Foundation │
                    └──────┬──────┘
                           │ merge to main
           ┌───────┬───────┼───────┬───────┐
           ▼       ▼       ▼       ▼       ▼
        Story 1  Story 2  Story 3  Story 4  Story 5   ← All parallel
        Landing  Get-     Concepts Reference Docs
        Page     Started  Docs    Docs      Landing
           │       │       │       │       │
           └───────┴───────┴───────┴───────┘
                           │ merge all to main
                    ┌──────▼──────┐
                    │  Verify &   │  ← Me (orchestrator)
                    │  Reconcile  │
                    └─────────────┘
```

### Story 0: Foundation Scaffold (SEQUENTIAL — must complete first)
- **Agent**: sonnet (worktree, foreground — we need its result before proceeding)
- **Creates**: Every file in the project skeleton with placeholder/minimal content
- **Verification**: `pnpm install && pnpm build` passes
- **Task file**: `.claude/tasks/story-0-foundation.md`

### Story 1: Landing Page (PARALLEL — after Story 0 merges)
- **Agent**: sonnet (worktree)
- **Owns**: `components/landing/*.tsx`, `components/shared/logo.tsx`, `app/page.tsx`
- **Does NOT touch**: `app/layout.tsx`, `app/globals.css`, any docs files
- **Verification**: Landing page renders at `/` in dev, both light/dark modes
- **Task file**: `.claude/tasks/story-1-landing.md`

### Story 2: Getting Started Docs (PARALLEL — after Story 0 merges)
- **Agent**: sonnet (worktree)
- **Owns**: `content/docs/getting-started/index.mdx`, `content/docs/getting-started/configuration.mdx`
- **Source material**: `/Users/gable/src/liant/internal-docs/readme-v08.md`
- **Does NOT touch**: Any file outside `content/docs/getting-started/`
- **Task file**: `.claude/tasks/story-2-getting-started.md`

### Story 3: Concepts Docs (PARALLEL — after Story 0 merges)
- **Agent**: sonnet (worktree)
- **Owns**: `content/docs/concepts/architecture.mdx`, `content/docs/concepts/components.mdx`, `content/docs/concepts/workflows.mdx`
- **Source material**: `prd-v08-overview.md`, `prd-v08-components.md`, `prd-v08-workflows.md`
- **Does NOT touch**: Any file outside `content/docs/concepts/`
- **Task file**: `.claude/tasks/story-3-concepts.md`

### Story 4: Reference Docs (PARALLEL — after Story 0 merges)
- **Agent**: haiku (worktree) — straightforward content extraction
- **Owns**: `content/docs/reference/cli.mdx`, `content/docs/reference/config.mdx`
- **Source material**: `/Users/gable/src/liant/internal-docs/readme-v08.md` (CLI + config sections)
- **Does NOT touch**: Any file outside `content/docs/reference/`
- **Task file**: `.claude/tasks/story-4-reference.md`

### Story 5: Docs Landing Page (PARALLEL — after Story 0 merges)
- **Agent**: haiku (worktree) — small, simple page
- **Owns**: `content/docs/index.mdx`
- **Does NOT touch**: Any file outside that single file
- **Task file**: `.claude/tasks/story-5-docs-landing.md`

## Conflict Analysis

| File | Owner | Risk |
|------|-------|------|
| `package.json`, `tsconfig.json`, `next.config.mjs`, etc. | Story 0 only | None — never touched again |
| `app/layout.tsx`, `app/globals.css` | Story 0 only | None — never touched again |
| `app/page.tsx` | Story 0 creates placeholder → Story 1 replaces | None — only Story 1 touches it |
| `components/landing/*.tsx`, `components/shared/logo.tsx` | Story 0 creates placeholder → Story 1 replaces | None — only Story 1 touches it |
| `content/docs/getting-started/*.mdx` | Story 0 creates placeholder → Story 2 replaces | None — only Story 2 touches them |
| `content/docs/concepts/*.mdx` | Story 0 creates placeholder → Story 3 replaces | None — only Story 3 touches them |
| `content/docs/reference/*.mdx` | Story 0 creates placeholder → Story 4 replaces | None — only Story 4 touches them |
| `content/docs/index.mdx` | Story 0 creates placeholder → Story 5 replaces | None — only Story 5 touches it |
| `app/docs/**`, `lib/source.ts`, `source.config.ts` | Story 0 only | None — never touched again |

**Conflict risk: ZERO** — every story owns a disjoint set of files.

## Merge Procedure

1. **Story 0**: Merge to main immediately (it's the foundation)
2. **Stories 1–5**: All branch from post-Story-0 main. Merge in any order — no conflicts expected
3. After all merges: run `pnpm install && pnpm build && pnpm dev` for final verification
4. Spot-check: landing page at `/`, docs at `/docs`, theme toggle, search, internal links

## Verification Checklist (post-merge)

- [ ] `pnpm install` — clean
- [ ] `pnpm build` — no type errors
- [ ] `/` renders landing page (dark + light)
- [ ] `/docs` renders docs landing with sidebar
- [ ] `/docs/getting-started` — content renders
- [ ] `/docs/concepts/architecture` — content renders
- [ ] `/docs/reference/cli` — content renders
- [ ] Theme toggle works
- [ ] Search works at `/docs`
- [ ] All internal links resolve

## Deployment (Cloudflare Pages via @opennextjs/cloudflare)

Story 0 includes the Cloudflare deployment config. After all stories are merged and verified:

1. **Push to GitHub** — ensure remote repo exists for `liant/website`
2. **Deploy to Cloudflare Pages**:
   ```bash
   pnpm run deploy   # runs: opennextjs-cloudflare build && opennextjs-cloudflare deploy
   ```
   Or: connect the GitHub repo in Cloudflare dashboard for automatic deploys on push to `main`
3. **Configure domain**: point `liant.ai` to the Cloudflare Pages project in DNS/dashboard
4. **Verify production**: check all pages render at the live URL

This is a manual step performed by the orchestrator (me) after all stories are merged — not delegated to subagents.

### Cloudflare-specific details (baked into Story 0)
- **Adapter**: `@opennextjs/cloudflare` (NOT the deprecated `@cloudflare/next-on-pages`)
- **Config**: `open-next.config.ts` + `wrangler.jsonc`
- **Compat flags**: `nodejs_compat` required
- **No edge runtime**: don't use `export const runtime = "edge"` anywhere
- **Output**: `.open-next/` directory (added to .gitignore)

## One-Shot Enablement Notes

Story 0 is the highest-risk story for one-shotting. To mitigate:
- **Every config file has exact, copy-pasteable code** in the task file — no API guesswork
- **Font names verified**: `Hepta_Slab`, `Atkinson_Hyperlegible_Next`, `Lekton` (all confirmed on Google Fonts)
- **Fumadocs API patterns verified** against current docs: exact imports, function signatures, component names
- **Next.js 15 async params**: `params: Promise<{ slug?: string[] }>` with `await props.params` (not the old sync API)
- **Tailwind v4 CSS syntax**: `@import 'tailwindcss'` not `@tailwind base/components/utilities`
- **tsconfig paths**: includes `"fumadocs-mdx:collections/*": [".source/*"]` for generated source files

Stories 1–5 are lower risk because they only write TSX/MDX content into existing file slots.
