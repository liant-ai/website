// eslint-disable-next-line @typescript-eslint/no-var-requires
const { themes } = require('prism-react-renderer');

const config = {
  title: 'liant',
  titleDelimiter: '—',
  tagline: 'composable terminal platform',
  url: 'https://liant.ai',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  trailingSlash: false,
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'docs',
          sidebarPath: './sidebars.js',
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
          breadcrumbs: false,
          editUrl: 'https://github.com/liant-ai/website/edit/main/docs-site/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        docsRouteBasePath: 'docs',
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'liant',
      items: [
        {
          to: '/docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/liant-ai/defuse',
          label: 'GitHub',
          position: 'right',
          target: '_blank',
        },
      ],
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: false,
      },
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    prism: {
      theme: themes.github,
      darkTheme: themes.dracula,
      additionalLanguages: ['toml', 'bash', 'json'],
    },
  },
};

export default config;
