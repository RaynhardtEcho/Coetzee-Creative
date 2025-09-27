'use client';
import { useReveal } from '@/components/ux/useReveal';

export default function NextSteps() {
  useReveal('next-steps');
  const steps = [
    { t: 'Free consultation', d: 'A short call to understand your goals, constraints, and success criteria.' },
    { t: 'Custom proposal', d: 'Clear scope, investment, and milestones aligned to business outcomes.' },
    { t: 'Project kickoff', d: 'Planning, access setup, and a focused path to measurable results.' },
  ];
  return (
    <section id="next-steps" className="container py-10 md:py-14">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6" data-reveal>What happens after you contact us</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map(s => (
          <div key={s.t} className="rounded-2xl border border-white/10 bg-white/5 p-6" data-reveal>
            <div className="h-[2px] w-10 bg-gold mb-3" />
            <h3 className="text-lg font-semibold">{s.t}</h3>
            <p className="text-sm text-white/70 mt-2">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
