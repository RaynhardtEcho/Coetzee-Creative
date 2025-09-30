// content/case-studies.ts
import type { StaticImageData } from 'next/image';

export type ImgSrc = string | StaticImageData;

export type OpenGraphMeta = {
  image: ImgSrc;            // required image for OG/Twitter
  title?: string;
  description?: string;
};

// Optional richer stats block for outcomes
export type ResultStat = {
  label: string;
  value: string;     // keep as string to avoid hydration/locale issues (e.g., "↑ 38%")
  note?: string;
};

export type CaseStudy = {
  // Identity
  slug: string;
  title: string;
  subtitle: string;
  year: number;
  excerpt?: string;

  // Client & scope
  client: string;
  industry: string;
  services: readonly string[];       // canonical: “Website”, “Brand”, etc.
  categories?: readonly string[];    // optional filter tags (defaults to services)
  duration: string;                  // e.g., "3 weeks"

  // Media
  cover: string;                     // /public path
  gallery?: readonly string[];       // optional additional images

  // Narrative
  problem?: string;                  // used by CaseStudyPage (challenge)
  approach?: readonly string[];      // used by CaseStudyPage (our approach)
  results?: readonly ResultStat[];   // used by CaseStudyPage (outcomes)
  testimonial?: { quote: string; author: string };

  // Links
  liveUrl?: string;                  // used by CaseStudyPage “Visit live site”
  websiteUrl?: string;               // alias; kept for compatibility

  // SEO (optional)
  seo?: { description?: string; image?: string };

  // Optional lightweight summary fields (not required by CaseStudyPage)
  overview?: string;
  outcomes?: readonly string[];

  // Open Graph metadata (optional but strongly recommended)
  og?: OpenGraphMeta;
};

// ---------------------------
// DATA — single source of truth
// ---------------------------
export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    slug: 'interio-studio',
    title: 'INTERIO Studio',
    subtitle: 'A refined, conversion-ready site for a boutique interior studio.',
    year: 2024,
    client: 'INTERIO Studio',
    industry: 'Interior Design',
    services: ['Website', 'Brand', 'Motion'] as const,
    categories: ['Website', 'Brand', 'Motion'] as const,
    duration: '3 weeks',
    cover: '/portfolio/interio/cover.jpg',
    gallery: [
      '/portfolio/interio/gal-1.webp',
      '/portfolio/interio/gal-2.webp',
      '/portfolio/interio/gal-3.webp',
    ] as const,

    // Narrative blocks used by CaseStudyPage
    problem:
      'They needed a website that communicates taste and trust, while converting enquiries without feeling salesy.',
    approach: [
      'Clarified value proposition and navigation to reduce friction.',
      'Designed calm, premium UI with restrained motion language.',
      'Implemented responsive build, basic SEO, and analytics events.',
    ] as const,
    results: [
      { label: 'Leads / month', value: '↑ 38%' },
      { label: 'Bounce rate', value: '↓ 22%' },
      { label: 'LCP (4G median)', value: '1.8s' },
    ] as const,
    testimonial: {
      quote: "Raynhardt's strategic thinking made the difference.",
      author: 'Sarah — INTERIO Studio',
    },

    liveUrl: 'https://example.com/interio',
    seo: {
      description:
        'Premium, conversion-ready site for a boutique interior studio — strategy, design, motion, and performance.',
      image: '/portfolio/interio/cover.jpg',
    },

    // Optional summary fields (not required)
    overview:
      'Minimalist layouts with warm photography and subtle motion communicate taste and trust while guiding visitors to enquire.',
    outcomes: [
      'Guided enquiry with clear service hierarchy',
      'Improved mobile performance and readability',
      'Subtle motion that supports brand tone',
    ] as const,

    // Open Graph (used by generateMetadata helper)
    og: {
      image: '/portfolio/interio/cover.jpg',
      title: 'INTERIO Studio — Case Study',
      description:
        'A refined, conversion-ready site with premium visuals, clear UX, and measurable outcomes.',
    },
  },

  {
  slug: 'boundless-apparel',
  title: 'Boundless',
  subtitle: 'Adventure-inspired apparel with a bold, minimal site.',
  year: 2025,
  client: 'Boundless',
  industry: 'Apparel & Lifestyle',
  services: ['Website', 'E-commerce'] as const,
  categories: ['Website', 'E-commerce'] as const,
  duration: '3 weeks',
  cover: '/portfolio/boundless/cover.jpg',
  gallery: [
    '/portfolio/boundless/gal-1.webp',
    '/portfolio/boundless/gal-2.webp',
    '/portfolio/boundless/gal-3.webp',
  ] as const,

  problem:
    'Boundless was ready to launch as a South African adventure apparel brand, but had no digital storefront or brand presence online. They needed a site that matched their vision and made it easy for customers to explore and shop their collections.',
  approach: [
    'Designed a bold, minimalist site aligned with their “Live Wide Open” brand identity.',
    'Built a product-first layout with clear categories and simple mobile shopping flows.',
    'Set up e-commerce foundations with scalable product/gallery sections and integrated checkout.',
  ] as const,
  results: [
    { label: 'Launch readiness', value: 'Complete brand-aligned site ready for first sales' },
    { label: 'Foundation', value: 'SEO, analytics, and growth systems in place' },
  ] as const,

  liveUrl: 'https://www.boundlessapparel.co.za/',
  seo: {
    description:
      'We helped Boundless launch with a bold, minimalist e-commerce site that reflects their adventure-inspired apparel brand.',
    image: '/portfolio/boundless/cover.jpg',
  },

  og: {
    image: '/portfolio/boundless/cover.jpg',
    title: 'Boundless Apparel — Case Study',
    description:
      'From vision to launch: a bold, minimal e-commerce site built for South Africa’s adventure apparel brand.',
  },
},


{
  slug: 'pieter-lessing-art',
  title: 'Pieter Lessing Art',
  subtitle: 'Gallery-first website and shop rooted in African aesthetics.',
  year: 2025,
  client: 'Pieter Lessing',
  industry: 'Fine Art & Sculpture',
  services: ['Website', 'E-commerce'] as const,
  categories: ['Website', 'E-commerce'] as const,
  duration: '4 weeks',
  cover: '/portfolio/pieter/cover.jpg',
  gallery: [
    '/portfolio/pieter/gal-1.jpg',
    '/portfolio/pieter/gal-2.jpg',
    
  ] as const,

  problem:
    'Pieter needed a digital gallery that honours the cultural depth of his work while making it easy to browse, enquire, and purchase.',

  approach: [
    'Gallery-first layouts that let paintings and sculptures take centre stage.',
    'Clean shop flow with clear filters (Fine Art, Sculptures, Home Decor & Hospitality) and simple cart/WhatsApp checkout.',
    'Mobile-first performance and SEO groundwork for future growth.',
  ] as const,

  results: [
    { label: 'Launch readiness', value: 'Gallery and shop aligned with Pieter’s artistic identity' },
    { label: 'Foundation', value: 'Mobile-first design, SEO setup, and scalable shop structure in place' },
  ] as const,

  liveUrl: 'https://example.com/pieter-lessing-art',

  seo: {
    description:
      'A digital gallery and shop for Pieter Lessing’s paintings, sculptures, and mixed media — grounded in African aesthetics.',
    image: '/portfolio/pieter/cover.jpg',
  },

  og: {
    image: '/portfolio/pieter/cover.jpg',
    title: 'Pieter Lessing Art — Case Study',
    description:
      'A gallery-first website and shop showcasing Pieter Lessing’s artworks with a clear path to enquire and purchase.',
  },
}



] as const;

// Helper to fetch a case by slug
export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
