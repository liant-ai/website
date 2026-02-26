'use client';

import { useMemo, useState } from 'react';
import { Check, ChevronDown, Copy, ExternalLinkIcon } from 'lucide-react';

const cache = new Map<string, string>();

export function CopyMarkdownButton({ markdownUrl }: { markdownUrl?: string }) {
  const [isLoading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  async function onClick() {
    if (!markdownUrl) return;
    const url: string = markdownUrl;
    const cached = cache.get(url);
    setLoading(true);
    try {
      const content: string = cached ?? (await fetch(url).then((res) => res.text()));
      cache.set(url, content);
      try {
        await navigator.clipboard.writeText(content);
      } catch {
        const textArea = document.createElement('textarea');
        textArea.value = content;
        textArea.setAttribute('readonly', 'true');
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setChecked(true);
      setTimeout(() => setChecked(false), 1500);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      disabled={isLoading || !markdownUrl}
      className="docs-action-button"
      onClick={onClick}
    >
      {checked ? <Check size={14} /> : <Copy size={14} />}
      Copy Markdown
    </button>
  );
}

export function ViewOptions({ markdownUrl, githubUrl }: { markdownUrl?: string; githubUrl?: string }) {
  const items = useMemo(() => {
    const fullMarkdownUrl =
      typeof window !== 'undefined' && markdownUrl
        ? new URL(markdownUrl, window.location.origin).toString()
        : markdownUrl ?? '';
    const q = `Read ${fullMarkdownUrl}, I want to ask questions about it.`;

    return [
      {
        title: 'View This Page Source',
        href: githubUrl,
      },
      {
        title: 'Open Defuse Project',
        href: 'https://github.com/liant-ai/defuse',
      },
      {
        title: 'Open in Scira AI',
        href: `https://scira.ai/?${new URLSearchParams({ q })}`,
      },
      {
        title: 'Open in ChatGPT',
        href: `https://chatgpt.com/?${new URLSearchParams({ hints: 'search', q })}`,
      },
      {
        title: 'Open in Claude',
        href: `https://claude.ai/new?${new URLSearchParams({ q })}`,
      },
      {
        title: 'Open in Cursor',
        href: `https://cursor.com/link/prompt?${new URLSearchParams({ text: q })}`,
      },
    ].filter((item) => item.href);
  }, [githubUrl, markdownUrl]);

  if (items.length === 0) return null;

  return (
    <details className="docs-action-dropdown">
      <summary className="docs-action-button">
        Open <ChevronDown size={14} />
      </summary>
      <div className="docs-action-menu">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            rel="noreferrer noopener"
            target="_blank"
            className="docs-action-menu-item"
          >
            <span>{item.title}</span>
            <ExternalLinkIcon size={12} />
          </a>
        ))}
      </div>
    </details>
  );
}

export function PageActions({ markdownUrl, githubUrl }: { markdownUrl?: string; githubUrl?: string }) {
  return (
    <div className="docs-actions">
      <CopyMarkdownButton markdownUrl={markdownUrl} />
      <ViewOptions markdownUrl={markdownUrl} githubUrl={githubUrl} />
    </div>
  );
}
