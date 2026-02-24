const FEATURES = [
  {
    label: '01',
    heading: 'Protocol-first',
    body: 'Every layer boundary is a contract. Swap any component without touching others.',
  },
  {
    label: '02',
    heading: 'Terminal-native',
    body: 'Built on OSC escape sequences, PTY streams, and established terminal conventions.',
  },
  {
    label: '03',
    heading: 'AI orchestration',
    body: 'Spawn agents across tmux panes. Cross-model review loops. Automatic context compaction.',
  },
  {
    label: '04',
    heading: 'Searchable history',
    body: 'Every command, output, and agent interaction captured to libSQL. Full-text search across projects.',
  },
  {
    label: '05',
    heading: 'File-first',
    body: 'Maildir message bus. TOML config. Markdown kanban. Git-trackable everything.',
  },
  {
    label: '06',
    heading: 'Composable',
    body: 'Ghostty + tmux + jj + fzf + starship + mise. Best-in-class tools, thin glue.',
  },
];

export function Features() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div
        className="border-b mb-12"
        style={{ borderColor: 'var(--border)' }}
      >
        <h2
          className="text-xs uppercase tracking-widest pb-4"
          style={{
            fontFamily: 'var(--font-lekton)',
            fontWeight: 400,
            color: 'var(--muted)',
          }}
        >
          What it does
        </h2>
      </div>

      <div>
        {FEATURES.map((feature) => (
          <div
            key={feature.label}
            className="grid grid-cols-1 lg:grid-cols-[4rem_1fr_2fr] gap-4 lg:gap-12 py-10 border-t"
            style={{ borderColor: 'var(--border)' }}
          >
            <span
              className="text-xs"
              style={{
                fontFamily: 'var(--font-lekton)',
                fontWeight: 400,
                color: 'var(--muted)',
                paddingTop: '0.2rem',
              }}
            >
              {feature.label}
            </span>

            <h3
              className="text-xl"
              style={{
                fontFamily: 'var(--font-hepta-slab)',
                fontWeight: 400,
                color: 'var(--foreground)',
              }}
            >
              {feature.heading}
            </h3>

            <p
              className="text-base leading-relaxed"
              style={{
                fontFamily: 'var(--font-atkinson-hyperlegible-next)',
                fontWeight: 400,
                color: 'var(--muted)',
              }}
            >
              {feature.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
