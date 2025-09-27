// components/seo/JsonLd.tsx
'use client';

type JsonLdProps = {
  /** Raw schema.org object. You may include @type here, or pass `type` prop. */
  data: Record<string, unknown>;
  /** Optional convenience prop. If provided and data['@type'] is missing, it will be injected. */
  type?: string;
};

export default function JsonLd({ data, type }: JsonLdProps) {
  const payload =
    type && (data as any)['@type'] === undefined
      ? { ...data, '@type': type }
      : data;

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
