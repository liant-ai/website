# Story 3: Concepts Docs

## Goal

Replace the placeholder MDX files in `content/docs/concepts/` with scaffolded documentation adapted from the internal PRD docs. Since the product doesn't exist yet, this is scaffolded content — write as if documenting a real product.

## Prerequisites

Story 0 must be merged to main. Branch from the post-Story-0 main.

## Files to Modify (ONLY these — do not touch anything else)

- `content/docs/concepts/architecture.mdx`
- `content/docs/concepts/components.mdx`
- `content/docs/concepts/workflows.mdx`

## DO NOT MODIFY

- Any file outside `content/docs/concepts/`
- The `meta.json` in `content/docs/concepts/` (already created by Story 0)

## Source Material

Read these files from `/Users/gable/src/liant/internal-docs/`:
- `prd-v08-overview.md` → architecture.mdx
- `prd-v08-components.md` → components.mdx
- `prd-v08-workflows.md` → workflows.mdx

## Writing Style

- Second person ("you"), imperative
- Direct, technical, zero filler
- Strip all `[UNOWNED]` tags, `[DECIDED]` tags, internal planning notes, decision logs, and priority markers
- Strip all PRD-specific language ("this PRD", "we propose", "gap analysis")
- Rewrite as user-facing documentation, not internal planning
- Use code blocks, tables, and diagrams where helpful
- Every page needs frontmatter with `title` and `description`

## Content Specifications

### `concepts/architecture.mdx`

**Frontmatter**:
```yaml
---
title: Architecture
description: The eight-layer protocol-first architecture of defuse.
---
```

**Content** (adapt from prd-v08-overview.md):
1. **Design principles** — terminal-native, protocol-first, modular, incremental, composable (from §1.1)
2. **The eight-layer stack** — render the ASCII stack diagram showing L0 through L7 (from §4.1)
3. **Protocol contracts** — table showing each layer boundary, protocol, current implementation, and what it could swap to (from §4.2)
4. **Swappability** — explain that the architecture is defined by protocols between layers, not implementations. Every component is independently replaceable (from §8)
5. **Key insight** — "~5,000 lines of glue connecting ~2,000,000 lines of existing tools" (from §1.3, adapted)

Do NOT include: gap analysis, unowned items, future planning, decision logs, priority markers.

### `concepts/components.mdx`

**Frontmatter**:
```yaml
---
title: Components
description: The tools and services that make up defuse.
---
```

**Content** (adapt from prd-v08-components.md):
1. **Terminal emulation** — Ghostty: GPU rendering, OSC 133, synchronized output, Kitty graphics (from §2.1)
2. **Multiplexing** — tmux: session/pane management, layout definitions (from §2.2)
3. **Block capture** — shell hooks emitting JSONL, daemon ingestion (from §2.3)
4. **Storage & search** — libSQL with FTS5, concurrent writers, WAL mode (from §2.4)
5. **Message bus** — AMQ Maildir protocol, message kinds, priority (from §2.5)
6. **Agent middleware** — pi-mono/pi-ai, 20+ providers, RPC mode (from §2.6)
7. **The dfs daemon** — actor architecture overview (from §2.13, simplified)

For each component: what it does, why it was chosen, what protocol it speaks. Keep it practical, not theoretical.

Do NOT include: internal data model details (§2.14 aggregates), extension SDK internals, implementation estimates.

### `concepts/workflows.mdx`

**Frontmatter**:
```yaml
---
title: Workflows
description: Common workflows and message flows in defuse.
---
```

**Content** (adapt from prd-v08-workflows.md §5):
1. **Command → Block → Search** — how shell commands become searchable blocks
2. **Agent launch** — spawning an agent on a task, what happens under the hood
3. **Review loop** — cross-model adversarial review via AMQ messaging
4. **Recursive decomposition** — parent agent decomposes task, children execute in parallel
5. **Shaped work → parallel execution** — from Shape Up shapes to kanban tasks to agent execution

For each workflow: brief description, then a step-by-step flow. Use numbered lists or simple diagrams. Keep each workflow to ~100–200 words.

Do NOT include: cost estimates, code line counts, milestone timelines, implementation language decisions, roadmap.

## Verification

```bash
pnpm build
```

Must pass. Pages should render at `/docs/concepts/architecture`, `/docs/concepts/components`, `/docs/concepts/workflows`.

## Commit

```
docs: add architecture, components, and workflows concept guides

Scaffolded from internal v08 PRDs. Covers eight-layer stack, protocol
contracts, component inventory, and five key workflows.
```
