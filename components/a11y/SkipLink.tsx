'use client';
export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only fixed left-3 top-3 z-[100] rounded-md bg-black/80 px-3 py-2 text-white outline outline-2 outline-white/50"
    >
      Skip to content
    </a>
  );
}
