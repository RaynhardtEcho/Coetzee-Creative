'use client';
import { useReveal } from '@/components/ux/useReveal';

export default function ContactMethods() {
  useReveal('contact-methods');
  return (
    <section id="contact-methods" className="container py-10 md:py-14">
      <div className="grid md:grid-cols-4 gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6" data-reveal>
          <div className="text-sm text-white/60">WhatsApp</div>
          <div className="mt-1 text-lg">+27 81 408 0806</div>
          <div className="mt-4 h-28 rounded-xl border border-white/10 bg-gradient-to-br from-gold/10 to-transparent grid place-items-center text-xs text-white/60">
            QR code
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6" data-reveal>
          <div className="text-sm text-white/60">Email</div>
          <div className="mt-1 text-lg">hello@coetzeecreative.co.za</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6" data-reveal>
          <div className="text-sm text-white/60">Phone</div>
          <div className="mt-1 text-lg">+27 81 408 0806</div>
          <div className="mt-1 text-sm text-white/60">Mon–Fri, 09:00–17:00 SAST</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6" data-reveal>
          <div className="text-sm text-white/60">Response</div>
          <div className="mt-1 text-lg text-gold">24-hour response guaranteed</div>
        </div>
      </div>
    </section>
  );
}
