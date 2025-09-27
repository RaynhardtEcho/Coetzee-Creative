import PageLayout from '@/components/templates/PageLayout';
import AboutHeader from '@/components/organisms/AboutHeader';
import AboutIntro from '@/components/organisms/AboutIntro';
import Process5 from '@/components/organisms/Process5';
import ProTestimonials from '@/components/organisms/ProTestimonials';
import Guarantees from '@/components/organisms/Guarantees';
import AboutCTA from '@/components/organisms/AboutCTA';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'About — Coetzee Creative' };

export default function AboutPage() {
  return (
    <PageLayout>
      <AboutHeader />
      <AboutIntro />
      <Process5 />
      <ProTestimonials />
      <Guarantees />
      <AboutCTA />
    </PageLayout>
  );
}
