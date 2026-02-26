/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    { type: 'doc', id: 'index' },
    {
      type: 'category',
      label: 'Getting Started',
      items: ['getting-started/index', 'getting-started/configuration'],
    },
    {
      type: 'category',
      label: 'Concepts',
      items: ['concepts/architecture', 'concepts/components', 'concepts/workflows'],
    },
    {
      type: 'category',
      label: 'Reference',
      items: ['reference/cli', 'reference/config'],
    },
  ],
};

module.exports = sidebars;
