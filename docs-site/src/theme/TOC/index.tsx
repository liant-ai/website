import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import TOCItems from '@theme/TOCItems';
import type { Props } from '@theme/TOC';
import styles from './styles.module.css';

const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight';
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';

export default function TOC({ className, ...props }: Props) {
  return (
    <div className={clsx(styles.tableOfContents, 'thin-scrollbar', className)}>
      <h2 className="toc-title">
        <Translate id="theme.docs.tocTitle" description="The title of the in-page table of contents">
          On this page
        </Translate>
      </h2>
      <TOCItems
        {...props}
        linkClassName={LINK_CLASS_NAME}
        linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
      />
    </div>
  );
}
