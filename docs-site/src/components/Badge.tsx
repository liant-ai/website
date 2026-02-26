const statusLabels = {
  stable: 'Stable',
  dev: 'In Development',
  planned: 'Planned',
} as const;

export function Badge({ status }: { status: 'stable' | 'dev' | 'planned' }) {
  return (
    <span className={`badge badge-${status}`}>
      {statusLabels[status]}
    </span>
  );
}
