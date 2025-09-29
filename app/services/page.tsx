import PageLayout from '@/components/templates/PageLayout';
import ServicesHeader from '@/components/organisms/ServicesHeader';
import ServicesSubNav from '@/components/organisms/ServicesSubNav';
import PricingTiers from '@/components/organisms/PricingTiers';
import CarePlans from '@/components/tables/CarePlans';
import ValueProposition from '@/components/organisms/ValueProposition';
import ROICalculator from '@/components/interactive/ROICalculator';
import TierTestimonials from '@/components/organisms/TierTestimonials';
import Link from 'next/link';
import Button from '@/components/atoms/Button';
import type { Metadata } from 'next';
import TierComparison from '@/components/organisms/TierComparison';
import FinalCTA from '@/components/organisms/FinalCTA';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Website packages and care plans designed for clarity, performance, and measurable ROI.',
  alternates: { canonical: '/services' },
  openGraph: { url: '/services' },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Web Design Packages',
  areaServed: 'ZA',
  provider: { '@type': 'Organization', name: 'Coetzee Creative' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Packages',
    itemListElement: [
      { '@type': 'Offer', name: 'Professional Business Site', priceCurrency: 'ZAR', price: '8000' },
      { '@type': 'Offer', name: 'Premium Business Site',      priceCurrency: 'ZAR', price: '12000' },
      { '@type': 'Offer', name: 'Sophisticated Custom Site',  priceCurrency: 'ZAR', price: '18000' },
    ],
  },
};

export default function ServicesPage() {
  return (
    <PageLayout>
      <ServicesHeader />
      <ServicesSubNav />

      {/* Use scroll-margin so anchor jumps don’t hide under sticky bars */}
      <section id="packages" className="scroll-mt-[9rem] md:scroll-mt-[10rem]">
        <PricingTiers />
        <TierComparison />
      </section>

      <section id="care" className="scroll-mt-[9rem] md:scroll-mt-[10rem]">
        <CarePlans />
      </section>

      <section id="included" className="scroll-mt-[9rem] md:scroll-mt-[10rem]">
        <ValueProposition />
      </section>

      <section id="roi" className="scroll-mt-[9rem] md:scroll-mt-[10rem]">
        <ROICalculator />
      </section>

      <TierTestimonials />

    {/* Conversion strip */}
<FinalCTA
  variant="inline"
  heading="Ready to move forward?"
  sub="Tell us about your project and we’ll recommend the best fit."
  primary={{ href: { pathname: '/contact', query: { source: 'services-strip' } }, label: 'Get Started' }}
  secondary={{ href: { pathname: '/contact', query: { source: 'services-consult' } }, label: 'Schedule Consultation' }}
/>



      {/* JSON-LD for SEO */}
      <JsonLd data={serviceSchema} />
    </PageLayout>
  );
}
