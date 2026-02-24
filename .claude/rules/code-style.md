# Code Style

## Tools
- NEVER use `sed` or `awk` via Bash for file modifications — use `Edit` or `Write` tools
- Use `Glob` to find files, `Grep` to search content — never `find`/`grep`/`rg` via Bash

## CSS / Tailwind
- All colors defined as CSS custom properties in `app/global.css` — never hardcode hex values in components
- Use Tailwind utility classes registered via `@theme` block: `text-muted`, `bg-surface`, `font-heading`, etc.
- Avoid inline `style={{}}` — only acceptable for CSS functions Tailwind can't express (e.g., `color-mix`)
- OKLCH values with hex fallbacks inside `@supports (color: oklch(0 0 0))` blocks
- Sharp corners only: `rounded-none` or `rounded-sm` max

## Components
- Landing page is a single file (`app/page.tsx`) — no separate component files
- `"use client"` directive required for any component using `useState`, `useEffect`, or browser APIs like `navigator.clipboard`
- Fumadocs components used for docs pages — don't override their internals

## Content
- Docs MDX files live in `content/docs/`
- `meta.json` format: `{ "pages": [...] }` (object), NOT bare arrays
- Internal doc links use relative paths within `/docs`
