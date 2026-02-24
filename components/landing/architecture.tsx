const DIAGRAM = `Ghostty ←OSC 133→ tmux ←PTY→ shells/agents
                    ↕ JSON-RPC
                orchestrator
                    ↕ SQL
                  libSQL`;

export function Architecture() {
  return (
    <section
      className="border-t border-b"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div
          className="border p-8"
          style={{
            background: 'var(--foreground)',
            borderColor: 'var(--border)',
          }}
        >
          <pre
            className="text-sm leading-loose overflow-x-auto"
            style={{
              fontFamily: 'var(--font-lekton)',
              color: 'var(--background)',
              whiteSpace: 'pre',
            }}
          >
            {DIAGRAM}
          </pre>
        </div>

        <p
          className="mt-6 text-sm"
          style={{
            fontFamily: 'var(--font-atkinson-hyperlegible-next)',
            fontWeight: 400,
            color: 'var(--muted)',
          }}
        >
          ~5K lines of glue wiring ~2M lines of existing tools.
        </p>
      </div>
    </section>
  );
}
