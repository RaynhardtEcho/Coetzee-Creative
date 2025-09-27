import type { PricingTier } from '@/types';
import Button from '@/components/atoms/Button';

export default function PricingCard({ name, price, features, ctaLabel }: PricingTier) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col gap-4">
      <h3 className="text-2xl font-semibold">{name}</h3>
      <div className="text-3xl font-bold text-gold">{price}</div>
      <ul className="space-y-2 text-white/70 list-disc list-inside">
        {features.map((f, i) => <li key={i}>{f}</li>)}
      </ul>
      <Button className="mt-auto">{ctaLabel}</Button>
    </div>
  );
}
