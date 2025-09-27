export type NavItem = { label: string; href: string };
export type Testimonial = { quote: string; author: string; role?: string; avatarUrl?: string };
export type PricingTier = { name: string; price: string; features: string[]; ctaLabel: string };
export type Project = { id: string; title: string; summary: string; image: string; slug: string; tags?: string[] };

// types.ts (or wherever you export ContactFormValues)
export type ContactFormValues = {
  name: string;
  email: string;
  company?: string;
  message: string;
  package?: 'professional' | 'premium' | 'sophisticated';
};
