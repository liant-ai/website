const statusLabels = {
  stable: 'Stable',
  dev: 'In Development',
  planned: 'Planned',
} as const;

export function Badge({ status }: { status: 'stable' | 'dev' | 'planned' }) {
  return (
    <span
      className={`badge-${status} inline-block rounded-sm px-1.5 py-0.5 font-mono text-xs leading-none align-middle`}
    >
      {statusLabels[status]}
    </span>
  );
}
