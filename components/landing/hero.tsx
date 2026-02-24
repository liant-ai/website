"use client";

import { useState } from 'react';
import Link from 'next/link';

const INSTALL_CMD = 'curl -fsSL https://liant.ai/install | sh';

const ASCII_STACK = `  ghostty
     │ OSC 133
   tmux
  ╱    ╲
 sh   agent
  ╲    ╱
 orchestrator
      │
   libSQL`;

export function Hero() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(INSTALL_CMD).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <section
      className="border-b"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left column */}
        <div>
          <h1
            className="text-4xl lg:text-5xl leading-tight mb-6"
            style={{
              fontFamily: 'var(--font-hepta-slab)',
              fontWeight: 600,
              color: 'var(--foreground)',
            }}
          >
            Composable terminal platform for AI-assisted development
          </h1>

          <p
            className="text-lg mb-10 leading-relaxed"
            style={{
              fontFamily: 'var(--font-atkinson-hyperlegible-next)',
              fontWeight: 400,
              color: 'var(--muted)',
            }}
          >
            Orchestrate agents, capture searchable history, run cross-model review loops — all inside Ghostty + tmux.
          </p>

          {/* Install block */}
          <div
            className="mb-6"
            style={{
              background: 'var(--foreground)',
              border: '1px solid var(--border)',
            }}
          >
            <div className="flex items-center justify-between px-4 py-3">
              <code
                className="text-sm select-all"
                style={{
                  fontFamily: 'var(--font-lekton)',
                  color: 'var(--background)',
                }}
              >
                {INSTALL_CMD}
              </code>
              <button
                onClick={handleCopy}
                className="ml-4 text-xs px-3 py-1 transition-colors duration-150"
                style={{
                  fontFamily: 'var(--font-atkinson-hyperlegible-next)',
                  fontWeight: 500,
                  color: copied ? 'var(--accent)' : 'var(--muted)',
                  border: '1px solid var(--border)',
                  background: 'transparent',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                {copied ? 'copied' : 'copy'}
              </button>
            </div>
          </div>

          <Link
            href="/docs"
            className="text-sm transition-colors duration-150"
            style={{
              fontFamily: 'var(--font-atkinson-hyperlegible-next)',
              fontWeight: 500,
              color: 'var(--accent)',
            }}
          >
            Read the docs →
          </Link>
        </div>

        {/* Right column — architecture sketch */}
        <div className="lg:pt-2">
          <pre
            className="text-sm leading-relaxed"
            style={{
              fontFamily: 'var(--font-lekton)',
              color: 'var(--muted)',
              whiteSpace: 'pre',
            }}
          >
            {ASCII_STACK}
          </pre>
        </div>
      </div>
    </section>
  );
}
