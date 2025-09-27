import type { Testimonial } from '@/types';

export default function TestimonialCard({ quote, author, role }: Testimonial) {
  return (
    <figure className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <blockquote className="text-white/90">“{quote}”</blockquote>
      <figcaption className="mt-4 text-sm text-white/60">— {author}{role ? `, ${role}` : ''}</figcaption>
    </figure>
  );
}
