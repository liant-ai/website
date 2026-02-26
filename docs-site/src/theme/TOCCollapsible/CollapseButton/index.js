import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function TOCCollapsibleCollapseButton({ collapsed, label = 'On this page', ...props }) {
  return (
    <button
      type="button"
      {...props}
      className={clsx(
        'clean-btn',
        styles.tocCollapsibleButton,
        !collapsed && styles.tocCollapsibleButtonExpanded,
        props.className,
      )}>
      <span className={styles.leftIcon} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </button>
  );
}
