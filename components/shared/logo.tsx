import type { HTMLAttributes } from 'react';

interface LogoProps extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

export function Logo({ className, ...props }: LogoProps) {
  return (
    <span
      className={className}
      style={{ fontFamily: 'var(--font-hepta-slab)', fontWeight: 400 }}
      {...props}
    >
      liant
    </span>
  );
}
