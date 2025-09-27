'use client';

import PortfolioHeader from '@/components/organisms/PortfolioHeader';
import CaseStudyCard from '@/components/organisms/CaseStudyCard';
import Credibility from '@/components/organisms/Credibility';
import BeforeAfterSlider from '@/components/interactive/BeforeAfterSlider';
import Lightbox from '@/components/lightbox/Lightbox';
import Link from 'next/link';
import Button from '@/components/atoms/Button';
import { motion } from 'framer-motion';
import { useState } from 'react';

const INTERIO_IMAGES = [
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600',
] as [string, ...string[]];

const PIETER_IMAGES = [
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600',
  'https://images.unsplash.com/photo-1513351105271-8f87fdbfe43f?q=80&w=1600',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1600',
] as [string, ...string[]];

const BOUNDLESS_IMAGES = [
  'https://images.unsplash.com/photo-1520975922284-09f3185a0f2b?q=80&w=1600',
] as [string, ...string[]];

export default function PortfolioPageClient() {
  const [open, setOpen] = useState(false);
  const [startIdx, setStartIdx] = useState(0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PortfolioHeader />
      <section className="container pb-16">
        {/* Masonry: CSS columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {/* INTERIO before/after */}
          <div className="break-inside-avoid mb-6">
            <BeforeAfterSlider
              beforeSrc="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600"
              afterSrc="https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1600"
              alt="INTERIO website before and after"
            />
          </div>

          {/* INTERIO card */}
          <CaseStudyCard
            variant="interio"
            title="INTERIO - Interior Design"
            description="Professional online presence for luxury interior design firm"
            quote="Strategic approach that understood our business needs"
            images={INTERIO_IMAGES}
            href="/services"
          />

          {/* PIETER card */}
          <CaseStudyCard
            variant="pieter"
            title="Pieter Lessing - Artist Portfolio"
            description="Artist portfolio with e-commerce functionality"
            quote="Captured our creative vision perfectly"
            images={PIETER_IMAGES}
            href="/services"
          />

          {/* PIETER lightbox thumbs */}
          <div className="break-inside-avoid mb-6 flex gap-3">
            {PIETER_IMAGES.slice(0, 3).map((src, idx) => (
              <button
                key={src}
                className="relative w-1/3 aspect-[4/3] rounded-xl overflow-hidden border border-white/10 hover:border-gold/60 transition"
                onClick={() => {
                  setStartIdx(idx);
                  setOpen(true);
                }}
                aria-label={`Open Pieter image ${idx + 1}`}
              >
                <img src={src} alt={`Pieter image ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          {open && <Lightbox images={PIETER_IMAGES} start={startIdx} onClose={() => setOpen(false)} />}

          {/* BOUNDLESS card */}
          <CaseStudyCard
            variant="boundless"
            title="Boundless - Business Services"
            description="Custom business website with lead generation focus"
            quote="Delivered exactly what we promised our clients"
            images={BOUNDLESS_IMAGES}
            href="/services"
          />
        </div>

        {/* Conversion strip */}
        <div className="mt-12 flex items-center justify-center">
          <Link href="/contact" aria-label="Discuss your project">
            <Button className="min-w-56">Discuss Your Project</Button>
          </Link>
        </div>
      </section>

      <Credibility />

      {/* Geographic trust indicator */}
      <section className="container py-16 md:py-24">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-semibold">Serving clients nationwide</h3>
          <p className="text-white/70 mt-2">Cape Town • Johannesburg • Durban • Pretoria • Port Elizabeth</p>
        </div>
      </section>
    </motion.div>
  );
}

