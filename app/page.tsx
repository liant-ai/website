import Hero from '@/components/landing/hero';
import Features from '@/components/landing/features';
import Architecture from '@/components/landing/architecture';
import CTA from '@/components/landing/cta';

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Architecture />
      <CTA />
    </main>
  );
}
