# Subagent Orchestration

See @../../.claude/projects/-Users-gable-src-liant-website/memory/orchestrator-learnings.md for detailed patterns.

## Key rules

- Always use `subagent_type: general-purpose` — never `Bash` agent type
- Subagents in worktrees CANNOT run Bash — permission scoping doesn't extend to worktree paths
- Subagents should only write files (Write/Edit) — orchestrator handles build + commit + merge
- Use absolute paths for task files — `.claude/tasks/` is gitignored, won't exist in worktrees
- Keep prompts short: point to task file, set guardrails, done
- Tell agents what NOT to do: "No Bash. Write files only."
- Per-worktree builds are redundant — one final build after merging is sufficient

## Workflow

1. Launch parallel subagents (write-only, worktree isolation, background)
2. Wait for completion
3. Merge worktree branches into feature branch (stay in main working tree)
4. Single `pnpm build` to verify
5. Clean up: `git worktree remove --force` + `git branch -D`
