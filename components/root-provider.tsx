import type { ReactNode } from 'react';

export function AppRootProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
