# Story 5: Docs Landing Page

## Goal

Replace the placeholder `content/docs/index.mdx` with a proper docs landing page that orients readers and links to key sections.

## Prerequisites

Story 0 must be merged to main. Branch from the post-Story-0 main.

## Files to Modify (ONLY this file — do not touch anything else)

- `content/docs/index.mdx`

## DO NOT MODIFY

- Any other file

## Writing Style

- Brief, direct, scannable
- Second person
- No marketing fluff
- Frontmatter with `title` and `description`

## Content Specification

**Frontmatter**:
```yaml
---
title: Documentation
description: Documentation for defuse, a composable terminal platform for AI-assisted development.
---
```

**Content**:

1. **Opening paragraph** (~2 sentences): defuse (`dfs`) is a composable terminal platform for AI-assisted development. It orchestrates agents, captures searchable command history, and runs cross-model review loops inside Ghostty + tmux.

2. **Quick links section** — a short list pointing to the main doc areas:
   - **[Getting Started](/docs/getting-started)** — Install, configure, and start using defuse
   - **[Architecture](/docs/concepts/architecture)** — The eight-layer protocol-first stack
   - **[Components](/docs/concepts/components)** — Tools and services that make up defuse
   - **[Workflows](/docs/concepts/workflows)** — Common workflows and message flows
   - **[CLI Reference](/docs/reference/cli)** — Complete `dfs` command reference
   - **[Configuration](/docs/reference/config)** — `config.toml` reference

3. **Architecture overview** (~3–4 sentences): Briefly explain that defuse composes ~2M lines of existing tools (Ghostty, tmux, libSQL, pi-mono, jj, fzf, starship, etc.) through protocol contracts. ~5K lines of custom glue. Every component is independently swappable.

4. **Key concepts** — bullet list of 3–4 defining characteristics:
   - Protocol-first: every layer boundary is a contract
   - Terminal-native: built on existing terminal conventions
   - Composable: best-in-class tools, thin glue
   - File-first: Maildir messages, TOML config, Markdown kanban — all git-trackable

## Verification

```bash
pnpm build
```

Must pass. Page should render at `/docs` with working links to subsections.

## Commit

```
docs: add docs landing page with overview and navigation

Brief product overview, quick links to all doc sections,
architecture summary, and key concepts.
```
