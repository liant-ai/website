---
paths:
  - "app/**"
  - "lib/**"
  - "content/**"
  - "components/**"
---

# Subagent Rules

Rules for subagents spawned by the orchestrator to do parallel write-only work.

## Tools

- **Use**: Read, Write, Edit, Glob, Grep
- **NEVER use**: Bash — you do not have permission in worktree paths
- To find files: `Glob` (not `find` or `ls`)
- To search content: `Grep` (not `grep` or `rg`)
- To modify files: `Write` or `Edit` (not `sed` or `awk`)

## Workflow

1. Read the task file at the absolute path given in your prompt
2. Use Glob/Grep/Read to understand the current state of files you'll modify
3. Write or Edit the files specified in the task — nothing else
4. Do NOT run builds, tests, or dev servers — the orchestrator handles that after merge

## Constraints

- Only modify files explicitly listed in your task — do not touch other files
- Do NOT create new files unless the task explicitly says to
- Do NOT delete files — overwrite with Write if the task requires removal
- Do NOT commit, merge, push, or run any git operations
- Do NOT install dependencies or run package managers
- `.claude/tasks/` is gitignored and won't exist in your worktree — that's why the orchestrator gives you the absolute path

## Common mistakes

- **Reverting to old patterns**: Your worktree may have stale files. Trust the task file over what you see in the worktree. If the task says "the current page.tsx looks like X", believe it.
- **Scope creep**: If you notice other issues while working, ignore them. Only do what the task says.
- **Trying Bash**: It will fail. Don't waste turns on it. Write files only.
- **Creating component files the task didn't ask for**: Stick to the file list in the task. Single-file components are intentional.
