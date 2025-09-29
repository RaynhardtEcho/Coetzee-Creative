// lib/validation/contact.ts
import { z } from 'zod';

export const PackageEnum = z.enum(['professional', 'premium', 'sophisticated']);
export type PackageSlug = z.infer<typeof PackageEnum>;

export const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10),
  package: PackageEnum.optional(),
  // honeypot
  website: z.string().max(0).optional(), // must stay empty
});

export type ContactPayload = z.infer<typeof ContactSchema>;
