import PageLayout from '@/components/templates/PageLayout';
import HeroPremium from '@/components/organisms/HeroPremium';
import SocialProof from '@/components/organisms/SocialProof';
import PricingPreview from '@/components/organisms/PricingPreview';
import ProcessOverview from '@/components/organisms/ProcessOverview';
import FinalCTA from '@/components/organisms/FinalCTA';
import SiteLd from '@/components/seo/SiteLd';

export default function HomePage() {
  return (
   
    <PageLayout>
      <SiteLd/>
      <HeroPremium />
      <SocialProof />
      <PricingPreview />
      <ProcessOverview />
      <FinalCTA/>
<SiteLd/>
    </PageLayout>
  );
}
