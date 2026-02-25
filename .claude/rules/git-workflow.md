# Git Workflow

- NEVER use `git -C` — always `cd` to the directory first, then run `git`

- NEVER merge to main (local or origin) without explicit user approval — always ask first
- NEVER push to any remote without explicit user approval
- Only the orchestrator (main session) handles merges — subagents must not merge
- Current feature branch: `feat/scaffold-fumadocs-site`
- Remote: `git@github.com:liant-ai/website.git`
