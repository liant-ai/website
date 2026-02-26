module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,mdx}',
    './docs/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Hepta Slab', 'serif'],
        body: ['Atkinson Hyperlegible Next', 'sans-serif'],
        mono: ['Lekton', 'monospace'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        border: 'var(--border)',
        surface: 'var(--surface)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        teal: 'var(--teal)',
        'teal-muted': 'var(--teal-muted)',
        rose: 'var(--rose)',
        terracotta: 'var(--terracotta)',
        'deep-blue': 'var(--deep-blue)',
      },
    },
  },
  plugins: [],
};
