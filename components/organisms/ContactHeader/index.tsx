'use client';
import { useReveal } from '@/components/ux/useReveal';

export default function ContactHeader() {
  useReveal('contact-header');
  return (
    <section id="contact-header" className="container py-16 md:py-20">
      <h1 className="text-3xl md:text-5xl font-semibold leading-tight" data-reveal>
        Ready to grow your business online?
      </h1>
      <div className="mt-3 h-[2px] w-24 bg-gold" aria-hidden="true" data-reveal />
      <p className="mt-4 text-white/70 max-w-3xl" data-reveal>
        We partner with ambitious South African businesses to design, build, and evolve high-performing websites.
        Tell us about your goals and we’ll recommend the best path forward.
      </p>
    </section>
  );
}
