import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: 'liant',
  repo: 'website',
  branch: 'main',
};

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'liant',
      url: '/',
    },
    links: [
      { text: 'GitHub', url: 'https://github.com/liant-ai/defuse' },
    ],
  };
}
