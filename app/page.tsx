"use client";

import { useState, useEffect, useRef, RefObject } from 'react';
import Link from 'next/link';

const INSTALL_CMD = 'curl -fsSL https://liant.ai/install | sh';

const FEATURES = [
  {
    label: 'Protocol-first',
    body: 'Every layer boundary is a contract. Swap any component — terminal, multiplexer, VCS, database — without touching others.',
  },
  {
    label: 'Terminal-native',
    body: 'Built on OSC escape sequences, PTY streams, and shell hooks. No Electron. No web sockets pretending to be terminals.',
  },
  {
    label: 'AI orchestration',
    body: 'Spawn agents across tmux panes. Cross-model review loops catch what single-model workflows miss.',
  },
  {
    label: 'Searchable history',
    body: 'Every command, output block, and agent interaction captured to libSQL. Full-text search across all projects.',
  },
  {
    label: 'File-first',
    body: 'Maildir message bus. TOML config. Markdown kanban. Everything is a file, everything is git-trackable.',
  },
  {
    label: 'Composable',
    body: 'Ghostty + tmux + jj + fzf + starship + mise. Thin glue wiring best-in-class existing tools.',
  },
];

const STACK = [
  { layer: 'L7', name: 'Ghostty', protocol: 'OSC 133' },
  { layer: 'L6', name: 'tmux', protocol: 'PTY' },
  { layer: 'L5', name: 'zsh + hooks', protocol: 'JSONL' },
  { layer: 'L4', name: 'dfs daemon', protocol: 'JSON-RPC' },
  { layer: 'L3', name: 'pi-mono', protocol: 'AMQ' },
  { layer: 'L2', name: 'libSQL', protocol: 'SQL' },
  { layer: 'L1', name: 'jj / git', protocol: '' },
];

const FEATURE_COLORS = [
  'text-accent',        // 01 — amber
  'text-teal',          // 02 — teal
  'var(--rose)',         // 03 — rose
  'var(--deep-blue)',    // 04 — deep-blue
  'var(--terracotta)',   // 05 — terracotta
  'text-accent',        // 06 — amber
];

/* ── Layer colors for the inverted (dark bg) section ─────────────────
   Brighter variants so they read clearly on near-black.
   ─────────────────────────────────────────────────────────────────── */

const LAYER_COLORS_INVERTED = [
  '#dba020', // L7 — amber
  '#50b0b0', // L6 — teal
  '#c08080', // L5 — rose
  '#8080c0', // L4 — deep-blue
  '#c08060', // L3 — terracotta
  '#dba020', // L2 — amber
  '#50b0b0', // L1 — teal
];

/* ── Mosaic strip ────────────────────────────────────────────────────
   Static decorative border between the dark layers section and the
   features section. A single row of tesserae — the mortar that binds
   the layers together, rendered as a thin mosaic band.
   ─────────────────────────────────────────────────────────────────── */

const MOSAIC_COLORS = ['#dba020', '#50b0b0', '#c08080', '#8080c0', '#c08060'];

function MosaicStrip() {
  return (
    <div className="h-[3px] flex" aria-hidden="true">
      {Array.from({ length: 40 }, (_, i) => (
        <div
          key={i}
          className="flex-1"
          style={{ backgroundColor: MOSAIC_COLORS[i % 5] }}
        />
      ))}
    </div>
  );
}

/* ── Scroll-reveal hook ──────────────────────────────────────────── */

function useReveal(): [RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ── Page ─────────────────────────────────────────────────────────── */

export default function HomePage() {
  const [copied, setCopied] = useState(false);
  const [stackRef, stackVisible] = useReveal();
  const [featuresRef, featuresVisible] = useReveal();
  const [ethosRef, ethosVisible] = useReveal();
  const [stripLanded, setStripLanded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const stackEl = (stackRef as React.RefObject<HTMLElement>).current;
      if (!stackEl) return;
      // Header is 56px (h-14) + 3px strip = 59px. When the dark section
      // top reaches that point, the header strip should disappear.
      setStripLanded(stackEl.getBoundingClientRect().top <= 59);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [stackRef]);

  function handleCopy() {
    navigator.clipboard.writeText(INSTALL_CMD).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Nav */}
      <header
        className="sticky top-0 z-50 backdrop-blur"
        style={{ background: 'color-mix(in srgb, var(--background) 80%, transparent)' }}
      >
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-lg font-heading font-medium text-foreground tracking-tight">
            liant<span className="text-accent">.</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/docs" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
              Docs
            </Link>
            <Link href="https://github.com/liant-ai/defuse" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
              GitHub
            </Link>
          </nav>
        </div>
        {!stripLanded && <MosaicStrip />}
      </header>

      <main className="flex-1">
        {/* Hero — above the fold, no reveal needed */}
        <section className="max-w-5xl mx-auto px-6 pt-24 pb-20 lg:pt-32 lg:pb-24">
          <div className="w-12 h-0.5 bg-accent mb-8" />
          <h1 className="text-4xl lg:text-[3.25rem] leading-[1.08] mb-8 max-w-2xl font-semibold text-foreground tracking-tight">
            The binding agent for your terminal workflow
          </h1>
          <p className="text-lg lg:text-xl mb-12 max-w-xl leading-relaxed text-muted">
            defuse orchestrates AI coding agents, captures every command to a searchable
            database, and runs cross-model review loops — inside Ghostty&nbsp;+&nbsp;tmux.
          </p>

          {/* Install */}
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center self-start border border-border bg-surface">
              <code className="text-sm px-5 py-3 select-all text-teal">
                {INSTALL_CMD}
              </code>
              <button
                onClick={handleCopy}
                className={`text-xs px-4 py-3 border-l border-border font-medium cursor-pointer transition-all duration-150 ${
                  copied
                    ? 'text-accent bg-accent/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-surface'
                }`}
              >
                {copied ? 'copied ✓' : 'copy'}
              </button>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/docs/getting-started"
                className="group text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
              >
                Read the docs <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
              <span className="text-border">|</span>
              <Link
                href="https://github.com/liant-ai/defuse"
                className="group text-sm font-medium text-muted hover:text-foreground transition-colors"
              >
                Source code <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">↗</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Mosaic strip — lands on top of the dark section */}
        {stripLanded && <MosaicStrip />}

        {/* Stack — the proof */}
        <section
          ref={stackRef as React.Ref<HTMLElement>}
          className={`bg-foreground text-background transition-all duration-300 ease-out ${stackVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
        >
          <div className="max-w-5xl mx-auto px-6 py-10 lg:py-14">
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-xs uppercase tracking-widest font-mono text-accent opacity-80">
                Eight layers
              </span>
              <span className="text-xs text-teal-muted font-mono opacity-60">
                — protocol contracts all the way down
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(7,1fr)] gap-px bg-background/10">
              {STACK.map((row, i) => (
                <div key={row.layer} className="bg-foreground px-3 py-3 flex flex-col gap-1 hover:bg-background/5 transition-colors">
                  <span
                    className="text-[0.7rem] uppercase tracking-widest font-mono font-bold"
                    style={{ color: LAYER_COLORS_INVERTED[i] }}
                  >
                    {row.layer}
                  </span>
                  <span className="text-base font-mono text-background font-bold">
                    {row.name}
                  </span>
                  {row.protocol && (
                    <span className="text-sm font-mono" style={{ color: '#70c0c0' }}>
                      {row.protocol}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-background opacity-50 font-mono">
              ~5,000 lines of glue · ~2,000,000 lines of existing tools
            </p>
          </div>
        </section>

        {/* Features */}
        <section
          ref={featuresRef as React.Ref<HTMLElement>}
          className={`relative bg-surface transition-all duration-300 ease-out ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
        >
          <div className="max-w-5xl mx-auto px-6 py-14 lg:py-20">
            {FEATURES.map((f, i) => {
              const colorToken = FEATURE_COLORS[i];
              const isCssVar = colorToken.startsWith('var(');
              return (
                <div
                  key={f.label}
                  className={`py-8 lg:py-10 grid grid-cols-1 lg:grid-cols-[14rem_1fr] gap-2 lg:gap-12 hover:translate-x-1 transition-transform duration-200 ${i > 0 ? 'border-t border-border' : ''}`}
                >
                  <h3 className="text-sm font-heading font-medium text-foreground">
                    <span
                      className={`mr-2 font-mono text-sm font-bold${isCssVar ? '' : ` ${colorToken}`}`}
                      {...(isCssVar ? { style: { color: colorToken } } : {})}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {f.label}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">{f.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Ethos */}
        <section
          ref={ethosRef as React.Ref<HTMLElement>}
          className={`border-t border-border transition-all duration-300 ease-out ${ethosVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
        >
          <div className="max-w-5xl mx-auto px-6 py-20 lg:py-28">
            <div className="max-w-xl">
              <div className="w-8 h-0.5 mb-6" style={{ backgroundColor: 'var(--terracotta)' }} />
              <p className="text-lg lg:text-xl leading-relaxed text-foreground font-heading font-light">
                The name comes from French <em>liant</em> — the binding agent.
                The cement in concrete, the oil in paint, the rosin on a bow.
              </p>
              <p className="text-base leading-relaxed text-muted mt-4">
                It holds things together without being the thing itself.
                Community-maintained tools, composed through protocol contracts.
                Swap any layer. Keep the rest.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface">
        <MosaicStrip />
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs font-mono text-muted">
            liant — that which binds.
          </p>
          <nav className="flex items-center gap-5">
            <Link href="https://github.com/liant-ai/defuse" className="text-xs text-muted hover:text-foreground transition-colors">
              GitHub
            </Link>
            <Link href="/docs" className="text-xs text-muted hover:text-foreground transition-colors">
              Docs
            </Link>
            <Link href="https://opensource.org/licenses/MIT" className="text-xs text-muted hover:text-foreground transition-colors">
              MIT
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
