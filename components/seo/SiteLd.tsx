// components/seo/SiteLd.tsx
import JsonLd from '@/components/seo/JsonLd';

export default function SiteLd() {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Coetzee Creative',
        url: 'https://www.coetzeecreative.co.za',
        sameAs: [
          'https://www.instagram.com/coetzee.creative',
        ],
        logo: 'https://www.coetzeecreative.co.za/brand/logo.png',
      }} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Coetzee Creative',
        url: 'https://www.coetzeecreative.co.za',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://www.coetzeecreative.co.za/search?q={query}',
          'query-input': 'required name=query',
        },
      }} />
    </>
  );
}
