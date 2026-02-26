'use client';

import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import SearchBar from '@theme/SearchBar';
import styles from './index.module.css';

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
  { layer: 'L0', name: 'Ghostty + tmux', protocol: 'PTY + OSC 133' },
  { layer: 'L1', name: 'Block Capture', protocol: 'JSONL' },
  { layer: 'L2', name: 'AMQ + libSQL', protocol: 'SQL + Maildir' },
  { layer: 'L3', name: 'pi-mono', protocol: 'JSON-RPC' },
  { layer: 'L4', name: 'Orchestration', protocol: 'kanban-md' },
  { layer: 'L5', name: 'Quality Gates', protocol: 'AMQ' },
  { layer: 'L6', name: 'Shell Integration', protocol: '' },
  { layer: 'L7', name: 'TUI Screens', protocol: 'Ratatui' },
];

const FEATURE_COLORS = [
  'var(--accent)',
  'var(--teal)',
  'var(--rose)',
  'var(--deep-blue)',
  'var(--terracotta)',
  'var(--accent)',
];

const LAYER_COLORS_INVERTED = [
  'var(--teal)',
  'var(--accent)',
  'var(--rose)',
  'var(--deep-blue)',
  'var(--terracotta)',
  'var(--accent)',
  'var(--teal)',
  'var(--rose)',
];

const MOSAIC_COLORS = [
  'var(--accent)',
  'var(--teal)',
  'var(--rose)',
  'var(--deep-blue)',
  'var(--terracotta)',
];

function MosaicStrip() {
  return (
    <div className={styles.mosaic} aria-hidden="true">
      {Array.from({ length: 40 }, (_, i) => (
        <div key={i} className={styles.mosaicCell} style={{ backgroundColor: MOSAIC_COLORS[i % 5] }} />
      ))}
    </div>
  );
}

export default function HomePage() {
  const { siteConfig } = useDocusaurusContext();
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const stackRef = useRef<HTMLElement | null>(null);
  const [stripLanded, setStripLanded] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const current = root.getAttribute('data-theme');
    if (current === 'dark' || current === 'light') {
      setTheme(current);
      return;
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const next = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        if (next === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        setTheme(next);
      }
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const stackEl = stackRef.current;
      if (!stackEl) return;
      setStripLanded(stackEl.getBoundingClientRect().top <= 59);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [stackRef]);

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;
    root.setAttribute('data-theme', nextTheme);
    if (nextTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', nextTheme);
    setTheme(nextTheme);
  }

  function handleCopy() {
    const onCopied = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    const fallbackCopy = () => {
      const textArea = document.createElement('textarea');
      textArea.value = INSTALL_CMD;
      textArea.setAttribute('readonly', 'true');
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      onCopied();
    };

    navigator.clipboard
      .writeText(INSTALL_CMD)
      .then(onCopied)
      .catch(() => {
        try {
          fallbackCopy();
        } catch {
          setCopied(false);
        }
      });
  }

  return (
    <div className={styles.page}>
      <Head>
        <title>{`${siteConfig.title} — ${siteConfig.tagline}`}</title>
        <meta name="description" content="Orchestrate AI coding agents, capture searchable command history, and run cross-model review loops inside Ghostty + tmux." />
      </Head>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link to="/" className={styles.brand}>
            liant<span className={styles.brandDot}>.</span>
          </Link>
          <nav className={styles.topNav}>
            <Link to="/docs" className={styles.topNavLink}>
              Docs
            </Link>
            <a
              href="https://github.com/liant-ai/defuse"
              className={styles.topNavLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <SearchBar />
            <button type="button" className={styles.modeToggle} onClick={toggleTheme}>
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </nav>
        </div>
        {!stripLanded && <MosaicStrip />}
      </header>

      <main className={styles.main}>
        <section className={clsx(styles.hero, styles.container)}>
          <div className={styles.heroBar} />
          <h1 className={styles.heroTitle}>The binding agent for your terminal workflow</h1>
          <p className={styles.heroLead}>
            defuse orchestrates AI coding agents, captures every command to a searchable database,
            and runs cross-model review loops — inside Ghostty + tmux.
          </p>

          <div className={styles.heroActions}>
            <div className={styles.installBox}>
              <code className={styles.installCode}>{INSTALL_CMD}</code>
              <button onClick={handleCopy} className={clsx(styles.copyButton, copied && styles.copyButtonActive)}>
                {copied ? 'copied ✓' : 'copy'}
              </button>
            </div>
            <div className={styles.linksRow}>
              <Link to="/docs/getting-started" className={styles.primaryLink}>
                Read the docs <span className={styles.arrow}>→</span>
              </Link>
              <span className={styles.separator}>|</span>
              <a
                href="https://github.com/liant-ai/defuse"
                className={styles.secondaryLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source code <span className={styles.arrow}>↗</span>
              </a>
            </div>
          </div>
        </section>

        {stripLanded && <MosaicStrip />}

        <section ref={stackRef} className={styles.stack}>
          <div className={styles.container}>
            <div className={styles.stackHeader}>
              <span className={styles.stackTitle}>Eight layers</span>
              <span className={styles.stackSub}>— protocol contracts all the way down</span>
            </div>
            <div className={styles.stackGrid}>
              {STACK.map((row, i) => (
                <div key={row.layer} className={styles.stackCell}>
                  <span className={styles.layerLabel} style={{ color: LAYER_COLORS_INVERTED[i] }}>
                    {row.layer}
                  </span>
                  <span className={styles.layerName}>{row.name}</span>
                  {row.protocol && <span className={styles.layerProto}>{row.protocol}</span>}
                </div>
              ))}
            </div>
            <p className={styles.stackFoot}>~5,000 lines of glue · ~2,000,000 lines of existing tools</p>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.container}>
            {FEATURES.map((feature, i) => (
              <div key={feature.label} className={clsx(styles.featureRow, i > 0 && styles.featureRowBorder)}>
                <h3 className={styles.featureTitle}>
                  <span className={styles.featureNum} style={{ color: FEATURE_COLORS[i] }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {feature.label}
                </h3>
                <p className={styles.featureBody}>{feature.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.ethos}>
          <div className={styles.container}>
            <div className={styles.ethosInner}>
              <div className={styles.ethosBar} />
              <p className={styles.ethosLead}>
                The name comes from French <em>liant</em> — the binding agent. The cement in
                concrete, the oil in paint, the rosin on a bow.
              </p>
              <p className={styles.ethosCopy}>
                It holds things together without being the thing itself. Community-maintained
                tools, composed through protocol contracts. Swap any layer. Keep the rest.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <MosaicStrip />
        <div className={clsx(styles.container, styles.footerInner)}>
          <p className={styles.footerTag}>liant — that which binds.</p>
          <nav className={styles.footerNav}>
            <a
              href="https://github.com/liant-ai/defuse"
              className={styles.footerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <Link to="/docs" className={styles.footerLink}>
              Docs
            </Link>
            <a
              href="https://opensource.org/licenses/MIT"
              className={styles.footerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              MIT
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
