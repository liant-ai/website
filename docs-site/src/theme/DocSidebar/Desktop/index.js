import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import Content from '@theme/DocSidebar/Desktop/Content';

import styles from './styles.module.css';

function openDocsSearch() {
  const targets = [
    'button[aria-label="Open Search"]',
    'button[aria-label="Search"]',
    'button.DocSearch-Button',
    '.DocSearch-Button',
  ];

  for (const selector of targets) {
    const el = document.querySelector(selector);
    if (el instanceof HTMLElement) {
      el.click();
      return;
    }
  }

  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }));
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }));
}

function DocSidebarDesktop({ path, sidebar, onCollapse, isHidden }) {
  return (
    <div className={clsx(styles.sidebar, isHidden && styles.sidebarHidden)}>
      <div className={styles.sidebarTop}>
        <Link to="/" className={styles.brand}>
          liant
        </Link>
        <button
          type="button"
          className={styles.collapseControl}
          onClick={onCollapse}
          aria-label="Collapse sidebar"
          title="Collapse sidebar"
        >
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <rect x="2" y="2" width="12" height="12" rx="2" />
            <line x1="8" y1="2" x2="8" y2="14" />
          </svg>
        </button>
        <div className={styles.searchWrap}>
          <button type="button" className={styles.searchButton} onClick={openDocsSearch}>
            <span className={styles.searchIcon} aria-hidden="true">
              <svg viewBox="0 0 16 16" focusable="false">
                <circle cx="7" cy="7" r="4.25" />
                <line x1="10.5" y1="10.5" x2="14" y2="14" />
              </svg>
            </span>
            <span>Search</span>
            <span className={styles.searchHint}>⌘ K</span>
          </button>
        </div>
        <div className={styles.utilityRow}>
          <a
            href="https://github.com/liant-ai/defuse"
            className={styles.utilityLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
      <Content path={path} sidebar={sidebar} />
      <div className={styles.sidebarBottom}>
        <NavbarColorModeToggle className={styles.modeToggle} />
      </div>
    </div>
  );
}

export default React.memo(DocSidebarDesktop);
