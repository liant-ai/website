import React from 'react';
import clsx from 'clsx';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { translate } from '@docusaurus/Translate';
import IconLightMode from '@theme/Icon/LightMode';
import IconDarkMode from '@theme/Icon/DarkMode';
import IconSystemColorMode from '@theme/Icon/SystemColorMode';

import styles from './styles.module.css';

function getNextColorMode(colorMode, respectPrefersColorScheme) {
  if (!respectPrefersColorScheme) {
    return colorMode === 'dark' ? 'light' : 'dark';
  }

  switch (colorMode) {
    case null:
      return 'light';
    case 'light':
      return 'dark';
    case 'dark':
      return null;
    default:
      throw new Error(`unexpected color mode ${colorMode}`);
  }
}

function getColorModeLabel(colorMode) {
  switch (colorMode) {
    case null:
      return 'system mode';
    case 'light':
      return 'light mode';
    case 'dark':
      return 'dark mode';
    default:
      throw new Error(`unexpected color mode ${colorMode}`);
  }
}

function getColorModeAriaLabel() {
  return translate({
    message: 'Toggle Theme',
    id: 'theme.colorToggle.ariaLabel',
    description: 'The ARIA label for the color mode toggle',
  });
}

function CurrentColorModeIcon() {
  return (
    <>
      <IconLightMode aria-hidden className={clsx(styles.toggleIcon, styles.lightToggleIcon)} />
      <IconDarkMode aria-hidden className={clsx(styles.toggleIcon, styles.darkToggleIcon)} />
      <IconSystemColorMode aria-hidden className={clsx(styles.toggleIcon, styles.systemToggleIcon)} />
    </>
  );
}

export default function ColorModeToggle({ className, buttonClassName, respectPrefersColorScheme, value, onChange }) {
  const isBrowser = useIsBrowser();
  return (
    <div className={clsx(styles.toggle, className)}>
      <button
        className={clsx('clean-btn', styles.toggleButton, !isBrowser && styles.toggleButtonDisabled, buttonClassName)}
        type="button"
        onClick={() => onChange(getNextColorMode(value, respectPrefersColorScheme))}
        disabled={!isBrowser}
        title={getColorModeLabel(value)}
        aria-label={getColorModeAriaLabel()}>
        <CurrentColorModeIcon />
      </button>
    </div>
  );
}
