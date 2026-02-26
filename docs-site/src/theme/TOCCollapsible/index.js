import React from 'react';
import clsx from 'clsx';
import { useCollapsible, Collapsible } from '@docusaurus/theme-common';
import TOCItems from '@theme/TOCItems';
import CollapseButton from '@theme/TOCCollapsible/CollapseButton';
import styles from './styles.module.css';

function stripHtml(value) {
  return (value || '').replace(/<[^>]+>/g, '').trim();
}

export default function TOCCollapsible({
  toc,
  className,
  minHeadingLevel,
  maxHeadingLevel,
}) {
  const { collapsed, toggleCollapsed } = useCollapsible({ initialState: true });
  const currentLabel = stripHtml(toc?.[0]?.value) || 'On this page';

  return (
    <div
      className={clsx(
        styles.tocCollapsible,
        !collapsed && styles.tocCollapsibleExpanded,
        className,
      )}>
      <CollapseButton collapsed={collapsed} onClick={toggleCollapsed} label={currentLabel} />
      <Collapsible lazy className={styles.tocCollapsibleContent} collapsed={collapsed}>
        <TOCItems toc={toc} minHeadingLevel={minHeadingLevel} maxHeadingLevel={maxHeadingLevel} />
      </Collapsible>
    </div>
  );
}
