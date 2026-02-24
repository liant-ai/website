"use client";

import { useState } from 'react';
import Link from 'next/link';

const INSTALL_CMD = 'curl -fsSL https://liant.ai/install | sh';

export function CTA() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(INSTALL_CMD).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div
        className="border-t pt-12"
        style={{ borderColor: 'var(--border)' }}
      >
        <p
          className="text-xs uppercase tracking-widest mb-8"
          style={{
            fontFamily: 'var(--font-lekton)',
            fontWeight: 400,
            color: 'var(--muted)',
          }}
        >
          Get started
        </p>

        <div
          className="inline-flex items-center mb-6"
          style={{
            background: 'var(--foreground)',
            border: '1px solid var(--border)',
          }}
        >
          <code
            className="text-sm px-4 py-3 select-all"
            style={{
              fontFamily: 'var(--font-lekton)',
              color: 'var(--background)',
            }}
          >
            {INSTALL_CMD}
          </code>
          <button
            onClick={handleCopy}
            className="text-xs px-4 py-3 border-l transition-colors duration-150"
            style={{
              fontFamily: 'var(--font-atkinson-hyperlegible-next)',
              fontWeight: 500,
              color: copied ? 'var(--accent)' : 'var(--muted)',
              borderColor: 'var(--border)',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            {copied ? 'copied' : 'copy'}
          </button>
        </div>

        <div>
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
      </div>
    </section>
  );
}
