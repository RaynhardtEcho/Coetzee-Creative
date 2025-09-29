// app/error.tsx
'use client';
export default function Error({ error }: { error: Error }) {
  return (
    <section className="container py-24 text-center">
      <h1 className="text-3xl font-semibold">Something went wrong</h1>
      <p className="text-white/70 mt-2">{error.message}</p>
    </section>
  );
}
