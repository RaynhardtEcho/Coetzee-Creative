// app/contact/page.tsx
import PageLayout from '@/components/templates/PageLayout';
import ContactForm from '@/components/forms/ContactFormPro';

type PackageSlug = 'professional' | 'premium' | 'sophisticated';

function toSlug(v?: string | null): PackageSlug | undefined {
  const s = (v ?? '').toLowerCase();
  if (s === 'professional' || s.includes('professional')) return 'professional';
  if (s === 'premium' || s.includes('premium')) return 'premium';
  if (s === 'sophisticated' || s.includes('sophisticated')) return 'sophisticated';
  return undefined;
}

export default function ContactPage({
  searchParams,
}: {
  // be lenient with Next’s searchParams (could be arrays)
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const get = (k: string) => {
    const v = searchParams?.[k];
    return Array.isArray(v) ? v[0] : v;
  };

  // support both ?package= and ?tier= (links from TierCard use "tier")
  const initialPackage =
    toSlug(get('package')) ?? toSlug(get('tier')) ?? undefined;

  return (
    <PageLayout>
      <section className="container py-16 md:py-20">
        <h1 className="text-3xl md:text-4xl font-semibold mb-6">
          Tell us about your project
        </h1>
        <ContactForm initialPackage={initialPackage} />
      </section>
    </PageLayout>
  );
}
