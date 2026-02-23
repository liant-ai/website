# Story 2: Getting Started Docs

## Goal

Replace the placeholder MDX files in `content/docs/getting-started/` with real documentation scaffolded from the internal docs. Since the product doesn't exist yet, this is scaffolded/stubbed content — write it as if documenting a real product, but don't worry about broken links to downloads or install scripts.

## Prerequisites

Story 0 must be merged to main. Branch from the post-Story-0 main.

## Files to Modify (ONLY these — do not touch anything else)

- `content/docs/getting-started/index.mdx`
- `content/docs/getting-started/configuration.mdx`

## DO NOT MODIFY

- Any file outside `content/docs/getting-started/`
- The `meta.json` in `content/docs/getting-started/` (already created by Story 0)

## Source Material

Read `/Users/gable/src/liant/internal-docs/readme-v08.md` for source content.

## Writing Style

- Second person ("you"), imperative ("install", "run", "configure")
- Direct, technical, zero filler — like a senior engineer's README
- No marketing language, no exclamation marks
- Use code blocks liberally with syntax highlighting (```zsh, ```toml, etc.)
- Every page needs frontmatter with `title` and `description`

## Content Specifications

### `getting-started/index.mdx`

**Frontmatter**:
```yaml
---
title: Getting Started
description: Install Ghostty, set up defuse, and configure your environment.
---
```

**Content** (adapt from readme-v08.md Install + Usage sections):
1. **Requirements** — macOS or Linux, zsh, Ghostty
2. **Install Ghostty** — brew install on macOS, link to ghostty.org for Linux
3. **Install Defuse** — curl install command, what the installer does (numbered list)
4. **Shell setup** — `dfs setup shell` and what it adds to .zshrc
5. **Configure API keys** — `dfs setup credentials`, env var alternatives
6. **Initialize a project** — `dfs init` in a git repo
7. **Start working** — `dfs start`, keyboard shortcuts table
8. **Launch agents** — basic examples: single agent, A/B comparison, recursive decomposition

### `getting-started/configuration.mdx`

**Frontmatter**:
```yaml
---
title: Configuration
description: Global and per-project configuration reference for defuse.
---
```

**Content** (adapt from readme-v08.md Directory Layout + Config Reference):
1. **Directory layout** — global (`~/.config/defuse/`, `~/.local/share/defuse/`) and per-project (`.defuse/`, `.agent-mail/`, `kanban/`)
2. **Config resolution** — project overrides global, API keys global-only
3. **Global config reference** — full annotated `config.toml` example with sections:
   - `[terminal]` — shell, sidebar
   - `[vcs]` — default VCS, auto_snapshot
   - `[notifications]` — review, error, budget alerts
   - `[cost_limits]` — daily/monthly budgets
   - `[providers]` — API key references
   - `[aliases]` — model aliases (writer, reviewer, fast)
4. **Per-project config** — what overrides are available, example

## Verification

```bash
pnpm build
```

Must pass. The pages should render at `/docs/getting-started` and `/docs/getting-started/configuration`.

## Commit

```
docs: add getting started and configuration guides

Scaffolded from internal v08 docs. Covers installation, shell setup,
API keys, project init, directory layout, and config reference.
```
