import { Hero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { Architecture } from '@/components/landing/architecture';
import { CTA } from '@/components/landing/cta';
import { Logo } from '@/components/shared/logo';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: 'var(--background)',
        color: 'var(--foreground)',
      }}
    >
      {/* Nav */}
      <header
        className="border-b"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo className="text-xl" />
          <nav className="flex items-center gap-6">
            <Link
              href="/docs"
              className="text-sm transition-colors duration-150"
              style={{
                fontFamily: 'var(--font-atkinson-hyperlegible-next)',
                fontWeight: 500,
                color: 'var(--muted)',
              }}
            >
              Docs
            </Link>
            <Link
              href="https://github.com/liant-ai/liant"
              className="text-sm transition-colors duration-150"
              style={{
                fontFamily: 'var(--font-atkinson-hyperlegible-next)',
                fontWeight: 500,
                color: 'var(--muted)',
              }}
            >
              GitHub
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        <Features />
        <Architecture />
        <CTA />
      </main>

      {/* Footer */}
      <footer
        className="border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p
            className="text-sm"
            style={{
              fontFamily: 'var(--font-hepta-slab)',
              fontWeight: 300,
              color: 'var(--muted)',
            }}
          >
            liant — that which binds.
          </p>
          <nav className="flex items-center gap-6">
            <Link
              href="https://github.com/liant-ai/liant"
              className="text-sm transition-colors duration-150"
              style={{
                fontFamily: 'var(--font-atkinson-hyperlegible-next)',
                fontWeight: 400,
                color: 'var(--muted)',
              }}
            >
              GitHub
            </Link>
            <Link
              href="/docs"
              className="text-sm transition-colors duration-150"
              style={{
                fontFamily: 'var(--font-atkinson-hyperlegible-next)',
                fontWeight: 400,
                color: 'var(--muted)',
              }}
            >
              Docs
            </Link>
            <Link
              href="https://opensource.org/licenses/MIT"
              className="text-sm transition-colors duration-150"
              style={{
                fontFamily: 'var(--font-atkinson-hyperlegible-next)',
                fontWeight: 400,
                color: 'var(--muted)',
              }}
            >
              MIT License
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
