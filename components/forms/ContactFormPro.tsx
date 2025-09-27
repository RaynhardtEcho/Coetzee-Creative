'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

const PackageEnum = z.enum(['professional', 'premium', 'sophisticated']);
type PackageSlug = z.infer<typeof PackageEnum>;

const Schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  company: z.string().optional(),
  message: z.string().min(10, 'A little more detail helps (10+ chars)'),
  package: PackageEnum.optional(),
});
export type ContactFormValues = z.infer<typeof Schema>;

const PRICE_BY_PACKAGE: Record<PackageSlug, string> = {
  professional: 'R8,000',
  premium: 'R12,000',
  sophisticated: 'R18,000',
};
const TIMELINE_BY_PACKAGE: Record<PackageSlug, string> = {
  professional: '2–3 weeks',
  premium: '3–4 weeks',
  sophisticated: '4–6 weeks',
};

function templateFor(pkg: PackageSlug) {
  const Pretty = pkg.charAt(0).toUpperCase() + pkg.slice(1);
  const price = PRICE_BY_PACKAGE[pkg];
  const timeline = TIMELINE_BY_PACKAGE[pkg];

  return [
    `Project: ${Pretty} Website (${price}, ${timeline})`,
    '',
    'Business name:',
    'Industry:',
    'Goals for the site (2–3 bullets):',
    '—',
    'Pages needed (rough list):',
    '—',
    'Inspiration (links):',
    '—',
    'Deadline / constraints:',
    '',
    'Anything else we should know?:',
  ].join('\n');
}

function tierToSlug(t?: string | null): PackageSlug | undefined {
  const s = (t ?? '').toLowerCase();
  if (s.includes('professional')) return 'professional';
  if (s.includes('premium')) return 'premium';
  if (s.includes('sophisticated')) return 'sophisticated';
  if (s === 'professional' || s === 'premium' || s === 'sophisticated') return s as PackageSlug;
  return undefined;
}

function track(name: string, props?: Record<string, any>) {
  try { (window as any)?.dataLayer?.push({ event: name, ...props }); } catch {}
}

export default function ContactForm({ initialPackage }: { initialPackage?: PackageSlug }) {
  const search = useSearchParams();

  // Derive seed from URL (?tier= / ?package=)
  const seedPackage = useMemo<PackageSlug | undefined>(() => {
    return (
      initialPackage ||
      tierToSlug(search.get('package')) ||
      tierToSlug(search.get('tier')) ||
      undefined
    );
  }, [initialPackage, search]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    getValues,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(Schema),
    defaultValues: {
      package: seedPackage,
      message: '', // seeded via effects to avoid clobbering user typing
    },
  });

  const [submitted, setSubmitted] = useState(false);
  const userTypedMessageRef = useRef(false);
  const selected = watch('package');

  // Seed template on mount when we have a seedPackage
  useEffect(() => {
    if (!seedPackage) return;
    const current = (getValues('message') || '').trim();
    const looksLikeTemplate = current.startsWith('Project:');
    const userTyped = userTypedMessageRef.current;

    if (!userTyped || looksLikeTemplate || current.length < 5) {
      setValue('message', templateFor(seedPackage), { shouldValidate: true });
    }
    setValue('package', seedPackage, { shouldValidate: false });
  }, [seedPackage, getValues, setValue]);

  // Re-seed when user changes the package (but do not overwrite real input)
  useEffect(() => {
    if (!selected) return;
    const current = (getValues('message') || '').trim();
    const looksLikeTemplate = current.startsWith('Project:');
    const userTyped = userTypedMessageRef.current;

    if (!userTyped || looksLikeTemplate || current.length < 5) {
      setValue('message', templateFor(selected), { shouldValidate: true });
    }
  }, [selected, getValues, setValue]);

  const onSubmit = async (data: ContactFormValues) => {
    track('contact_submit', { pkg: data.package });
    // Replace with your real endpoint/integration:
    console.log('Contact form submitted', data);
    setSubmitted(true);
    // Demo UX only
    setTimeout(() => setSubmitted(false), 4000);
  };

  // error id helpers for a11y
  const errId = (k: keyof ContactFormValues) => (errors[k] ? `${k}-error` : undefined);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Package (optional) */}
      <label className="block space-y-1">
        <span className="text-sm text-white/70">Package (optional)</span>
        <div className="relative">
          <select
            className="
              w-full appearance-none rounded-md bg-white/5 border border-white/15
              px-3 py-2 pr-9 text-white
              focus:outline-none focus:ring-2 focus:ring-[var(--ui-border)]/60
            "
            aria-invalid={!!errors.package || undefined}
            {...register('package')}
          >
            <option value="">No preference yet</option>
            <option value="professional">Professional — R8,000</option>
            <option value="premium">Premium — R12,000</option>
            <option value="sophisticated">Sophisticated — R18,000</option>
          </select>
          {/* caret */}
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/60">▾</span>
        </div>
      </label>

      <Input
        label="Name"
        aria-invalid={!!errors.name || undefined}
        aria-describedby={errId('name')}
        {...register('name')}
      />
      {errors.name && <p id="name-error" className="text-sm text-red-400">{errors.name.message}</p>}

      <Input
        label="Email"
        type="email"
        aria-invalid={!!errors.email || undefined}
        aria-describedby={errId('email')}
        {...register('email')}
      />
      {errors.email && <p id="email-error" className="text-sm text-red-400">{errors.email.message}</p>}

      <Input label="Company (optional)" {...register('company')} />

      <label className="block space-y-1">
        <span className="text-sm text-white/70">Message</span>
        <textarea
          className="
            w-full min-h-[160px] rounded-md bg-white/5 border border-white/15
            px-3 py-2 text-white
            outline-none focus:ring-2 focus:ring-[var(--ui-border)]/60
          "
          aria-invalid={!!errors.message || undefined}
          aria-describedby={errId('message')}
          placeholder="Tell us about your project…"
          {...register('message', {
            onChange: () => { userTypedMessageRef.current = true; },
            onBlur:   () => { userTypedMessageRef.current = true; },
          })}
        />
      </label>
      {errors.message && <p id="message-error" className="text-sm text-red-400">{errors.message.message}</p>}

      {/* Honeypot (basic spam guard) */}
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden name="website" />

      <div className="pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Send'}
        </Button>
      </div>

      {/* lightweight success note */}
      {submitted && (
        <div className="rounded-md border border-white/15 bg-white/[0.04] p-3 text-sm text-white/80" role="status" aria-live="polite">
          Thanks — we’ve received your message. We’ll reply shortly.
        </div>
      )}
    </form>
  );
}
