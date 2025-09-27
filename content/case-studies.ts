// content/case-studies.ts

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
  },

  {
    slug: 'boundless-retreats',
    title: 'Boundless Retreats',
    subtitle: 'Calm, persuasive booking experience with clear itineraries.',
    year: 2024,
    client: 'Boundless Retreats',
    industry: 'Travel & Hospitality',
    services: ['Website', 'Booking'] as const,
    categories: ['Website', 'Booking'] as const,
    duration: '3 weeks',
    cover: '/portfolio/boundless/cover.jpg',
    gallery: [
      '/portfolio/boundless/gal-1.webp',
      '/portfolio/boundless/gal-2.webp',
      '/portfolio/boundless/gal-3.webp',
    ] as const,

    problem:
      'Prospects were overwhelmed by options and dropped off. They needed clarity and trust signals through the booking journey.',
    approach: [
      'Structured itineraries and simplified primary path to book.',
      'Elevated social proof; improved mobile scannability.',
      'Integrated analytics events on key funnel steps.',
    ] as const,
    results: [
      { label: 'Bookings', value: '↑ 24%' },
      { label: 'Time to decision', value: '↓ 17%' },
    ] as const,

    liveUrl: 'https://example.com/boundless',
    seo: {
      description:
        'We simplified discovery-to-booking with clear pages, concise copy, and supportive visuals.',
      image: '/portfolio/boundless/cover.jpg',
    },
  },

  {
    slug: 'lessing-wines',
    title: 'Lessing Wines',
    subtitle: 'Elegant catalogue with tasting notes and wholesale enquiries.',
    year: 2023,
    client: 'Lessing Wines',
    industry: 'Wine & Beverages',
    services: ['E-commerce', 'Website'] as const,
    categories: ['E-commerce', 'Website'] as const,
    duration: '4 weeks',
    cover: '/portfolio/lessing/cover.jpg',
    gallery: [
      '/portfolio/lessing/gal-1.webp',
      '/portfolio/lessing/gal-2.webp',
      '/portfolio/lessing/gal-3.webp',
    ] as const,

    problem:
      'They needed an elegant way to present products with rich tasting notes, while keeping wholesale routes clear.',
    approach: [
      'Catalogue-forward layouts that let label design shine.',
      'Kept routes to purchase and wholesale prominent and simple.',
      'Optimized assets for faster browsing across devices.',
    ] as const,
    results: [
      { label: 'Catalogue load time', value: '↓ 32%' },
      { label: 'Wholesale enquiries', value: '↑ 19%' },
    ] as const,

    liveUrl: 'https://example.com/lessing',
    seo: {
      description:
        'A catalogue-forward experience with elegant product presentation and clear routes to purchase or enquire.',
      image: '/portfolio/lessing/cover.jpg',
    },
  },
] as const;

// Helper to fetch a case by slug
export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
``