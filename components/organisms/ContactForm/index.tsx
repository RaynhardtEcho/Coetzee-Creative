'use client';

import { useEffect, useRef } from 'react';
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

export default function ContactForm({ initialPackage }: { initialPackage?: PackageSlug }) {
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
      package: initialPackage, // server-provided default
      message: '',             // we seed below
    },
  });

  const userTypedMessageRef = useRef(false);
  const selected = watch('package');

  // Seed template on mount if initialPackage present & user hasn't typed
  useEffect(() => {
    if (!initialPackage) return;
    const current = (getValues('message') || '').trim();
    const looksLikeTemplate = current.startsWith('Project:');
    const userTyped = userTypedMessageRef.current;

    if (!userTyped || looksLikeTemplate || current.length < 5) {
      setValue('message', templateFor(initialPackage), { shouldValidate: true });
    }
    // ensure the select shows the initial package too
    setValue('package', initialPackage, { shouldValidate: false });
  }, [initialPackage, getValues, setValue]);

  // Re-seed when the user changes the package (but do not overwrite real input)
  useEffect(() => {
    if (!selected) return;
    const current = (getValues('message') || '').trim();
    const looksLikeTemplate = current.startsWith('Project:');
    const userTyped = userTypedMessageRef.current;

    if (!userTyped || looksLikeTemplate || current.length < 5) {
      setValue('message', templateFor(selected), { shouldValidate: true });
    }
  }, [selected, getValues, setValue]);

  const onSubmit = (data: ContactFormValues) => {
    console.log('Contact form submitted', data);
    alert('Form submitted (demo). Check console.');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Package (optional) */}
      <label className="block space-y-1">
        <span className="text-sm text-white/70">Package (optional)</span>
        <select
          className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white"
          {...register('package')}
        >
          <option value="">No preference yet</option>
          <option value="professional">Professional — R8,000</option>
          <option value="premium">Premium — R12,000</option>
          <option value="sophisticated">Sophisticated — R18,000</option>
        </select>
      </label>

      <Input label="Name" {...register('name')} />
      {errors.name && <p className="text-sm text-red-400">{errors.name.message}</p>}

      <Input label="Email" type="email" {...register('email')} />
      {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}

      <Input label="Company (optional)" {...register('company')} />

      <label className="block space-y-1">
        <span className="text-sm text-white/70">Message</span>
        <textarea
          className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white min-h-[160px]"
          {...register('message', {
            onChange: () => { userTypedMessageRef.current = true; },
            onBlur:   () => { userTypedMessageRef.current = true; },
          })}
          placeholder="Tell us about your project…"
        />
      </label>
      {errors.message && <p className="text-sm text-red-400">{errors.message.message}</p>}

      {/* Real button element so type/disabled are valid */}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Send'}
      </Button>
    </form>
  );
}
