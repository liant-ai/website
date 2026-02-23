# Story 4: Reference Docs

## Goal

Replace the placeholder MDX files in `content/docs/reference/` with scaffolded reference documentation for the CLI and config file. Since the product doesn't exist yet, this is scaffolded content.

## Prerequisites

Story 0 must be merged to main. Branch from the post-Story-0 main.

## Files to Modify (ONLY these — do not touch anything else)

- `content/docs/reference/cli.mdx`
- `content/docs/reference/config.mdx`

## DO NOT MODIFY

- Any file outside `content/docs/reference/`
- The `meta.json` in `content/docs/reference/` (already created by Story 0)

## Source Material

Read `/Users/gable/src/liant/internal-docs/readme-v08.md` for source content.

## Writing Style

- Reference documentation style: terse, scannable, table-heavy
- Every command/option gets a code block example
- Second person, imperative
- No marketing language
- Every page needs frontmatter with `title` and `description`

## Content Specifications

### `reference/cli.mdx`

**Frontmatter**:
```yaml
---
title: CLI Reference
description: Complete command reference for the dfs CLI.
---
```

**Content** (adapt from readme-v08.md Usage + Day-to-day commands):
1. **Overview** — `dfs` is the CLI entry point. Brief description.
2. **Commands** — one subsection per command, each with synopsis, description, example:
   - `dfs init` — initialize a project
   - `dfs start` — open workspace
   - `dfs launch [task]` — launch an agent (include variants: basic, `ab`, `tree`)
   - `dfs status` — show active agents, reviews, costs
   - `dfs search <query>` — full-text search across blocks + messages
   - `dfs review` — open review TUI
   - `dfs answer <id> <response>` — respond to agent question
   - `dfs kill <agent>` — stop an agent
   - `dfs clean` — remove abandoned workspaces
   - `dfs doctor` — verify tooling
   - `dfs setup shell` — one-time shell configuration
   - `dfs setup credentials` — configure API keys
   - `dfs update` — update defuse
   - `dfs uninstall` — remove defuse
   - `dfs slice-to-kanban` — convert shaped slices to kanban tasks
3. **Keyboard shortcuts** — table from readme-v08.md (Ctrl+R, Ctrl+B N, etc.)

### `reference/config.mdx`

**Frontmatter**:
```yaml
---
title: Configuration Reference
description: Complete reference for config.toml settings.
---
```

**Content** (adapt from readme-v08.md Global Config Reference):
1. **File locations** — global `~/.config/defuse/config.toml`, project `.defuse/config.toml`
2. **Resolution order** — project overrides global, API keys global-only
3. **Full reference** — one subsection per TOML section, each with:
   - Table of keys, types, defaults, descriptions
   - Example TOML block
   - Sections: `[terminal]`, `[vcs]`, `[notifications]`, `[cost_limits]`, `[providers.*]`, `[aliases]`
4. **Model aliases** — explain the alias system (write once, reference everywhere)
5. **Environment variables** — `ANTHROPIC_API_KEY`, `OPENAI_API_KEY` as alternatives to config

## Verification

```bash
pnpm build
```

Must pass. Pages should render at `/docs/reference/cli` and `/docs/reference/config`.

## Commit

```
docs: add CLI and configuration reference pages

Complete dfs command reference with examples and keyboard shortcuts.
Full config.toml reference with all sections documented.
```
