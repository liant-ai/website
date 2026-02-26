import './global.css';
import googleFonts from 'next/font/google';
import type { ReactNode } from 'react';
import { AppRootProvider } from '@/components/root-provider';

// @ts-expect-error vinext's font shim uses a Proxy that doesn't export our fonts by name
const { Hepta_Slab, Atkinson_Hyperlegible_Next, Lekton } = googleFonts as Record<
  string,
  (opts: Record<string, unknown>) => { className: string; style: { fontFamily: string }; variable: string }
>;
import type { Metadata } from 'next';

const heptaSlab = Hepta_Slab({
  subsets: ['latin'],
  variable: '--font-hepta-slab',
  display: 'swap',
});

const atkinson = Atkinson_Hyperlegible_Next({
  subsets: ['latin'],
  variable: '--font-atkinson-hyperlegible-next',
  display: 'swap',
  adjustFontFallback: false, // font not in Next.js metrics DB
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
});

const lekton = Lekton({
  subsets: ['latin'],
  variable: '--font-lekton',
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s — liant',
    default: 'liant — composable terminal platform',
  },
  description:
    'Orchestrate AI coding agents, capture searchable command history, and run cross-model review loops inside Ghostty + tmux.',
  metadataBase: new URL('https://liant.ai'),
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${heptaSlab.variable} ${atkinson.variable} ${lekton.variable}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <AppRootProvider>{children}</AppRootProvider>
      </body>
    </html>
  );
}
