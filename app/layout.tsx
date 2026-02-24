import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Hepta_Slab, Atkinson_Hyperlegible_Next, Lekton } from 'next/font/google';
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

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${heptaSlab.variable} ${atkinson.variable} ${lekton.variable}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
