'use client';
import { useReveal } from '@/components/ux/useReveal';

function Item({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6" data-reveal>
      <div className="flex items-center gap-3 mb-2">
        <div className="size-3 rounded-full bg-gold" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-white/70">{desc}</p>
    </div>
  );
}

export default function Credibility() {
  useReveal('why-us');
  return (
    <section id="why-us" className="py-16 md:py-24 bg-white/5 border-y border-white/10">
      <div className="container">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-[2px] w-10 bg-gold" />
          <h2 className="text-2xl md:text-3xl font-semibold">Why Choose Us?</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Item title="100% client satisfaction record" desc="We measure success by outcomes and relationships." />
          <Item title="On-time delivery guarantee" desc="Clear timelines, weekly updates, and dependable execution." />
          <Item title="Custom solutions, not templates" desc="Every build is tailored to your brand and business goals." />
        </div>
      </div>
    </section>
  );
}
