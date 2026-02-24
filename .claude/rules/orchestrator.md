---
paths:
  - ".claude/plans/**"
  - ".claude/tasks/**"
---

# Orchestrator Rules

Rules for the main session orchestrating parallel subagent work.

## Agent invocation

- Always use `subagent_type: general-purpose` — never `Bash` agent type (it only has Bash, no Read/Write/Edit)
- Always use `isolation: worktree` + `run_in_background: true` for parallel work
- Always use `model: sonnet` for subagents

## Prompt design

- Keep prompts short — point to task file by absolute path, set 2-3 guardrails, done
- Use absolute paths: `.claude/tasks/` is gitignored, won't exist in worktrees. Always use `/Users/gable/src/liant/website/.claude/tasks/<name>.md`
- Never duplicate task content inline — the task file IS the prompt
- Never pre-script shell commands — let agents read the task file and decide
- Tell agents what NOT to do: "No Bash. Write files only. Do NOT use expect."

## Task file quality

- Eliminate "likely" and "probably" — give exact paths or say "use Glob to find"
- Make CLI commands fully non-interactive — find all flags to suppress prompts
- Specify exact file formats — verify against the library before writing specs
- Cross-reference variable names between tasks that share interfaces
- Don't say "delete" if agent can't `rm` — say "overwrite with Write"

## Workflow

```
1. Do foundation work yourself (scaffolding, interactive CLIs)
2. pnpm install in main working tree (so worktrees can symlink)
3. Launch parallel subagents (write-only, worktree, background)
   Prompt: "Read [absolute path to task]. Write files only. No Bash."
4. Merge worktree branches — STAY IN MAIN WORKING TREE
   git merge <branch> --no-edit
5. Single pnpm build to verify everything
6. Clean up: git worktree remove --force && git branch -D <branch>
```

## Pitfalls

- **CWD drift**: if you `cd` into a worktree, subsequent git commands operate on the wrong branch. Always use absolute paths or verify `pwd` first.
- **Token waste**: subagents spend 5-10 turns trying Bash before giving up. Tell them upfront: "No Bash."
- **gitignored files missing**: `.claude/tasks/`, `node_modules/`, `.next/`, `.source/` don't exist in worktrees
- **Worktree removal**: build artifacts block `git worktree remove` — always use `--force`
- **Subagent scope creep**: agents may revert to old file structures if worktree has stale files. Task files must be explicit about what the current state looks like.
