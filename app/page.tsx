import PageLayout from '@/components/templates/PageLayout';
import HeroPremium from '@/components/organisms/HeroPremium';
import SocialProof from '@/components/organisms/SocialProof';
import PricingPreview from '@/components/organisms/PricingPreview';
import ProcessOverview from '@/components/organisms/ProcessOverview';
import FinalCTA from '@/components/organisms/FinalCTA';

export default function HomePage() {
  return (
    <PageLayout>
      <HeroPremium />
      <SocialProof />
      <PricingPreview />
      <ProcessOverview />
      <FinalCTA/>

    </PageLayout>
  );
}
