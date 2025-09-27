'use client';
import { useReveal } from '@/components/ux/useReveal';

export default function TrustSignals() {
  useReveal('trust-signals');
  return (
    <section id="trust-signals" className="py-12 md:py-16 bg-white/5 border-y border-white/10">
      <div className="container grid md:grid-cols-2 gap-10">
        <div data-reveal>
          <h2 className="text-2xl md:text-3xl font-semibold">Serving businesses across South Africa</h2>
          <p className="text-white/70 mt-2">Based in Bloemfontein, working nationally. Local market understanding with professional standards.</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-white/70">
            <li>• Bloemfontein</li><li>• Cape Town</li><li>• Johannesburg</li><li>• Durban</li><li>• Pretoria</li><li>• Gqeberha</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8" data-reveal>
          <h3 className="text-lg font-semibold">Quality & Support</h3>
          <ul className="mt-2 space-y-2 text-sm text-white/80">
            <li>• Professional quality guarantee</li>
            <li>• Structured revision policy</li>
            <li>• Ongoing support & care plans</li>
            <li>• Prompt responses within 24 hours</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
