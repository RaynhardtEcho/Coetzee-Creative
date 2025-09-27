import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/types';

export default function ProjectCard({ title, summary, image, slug, tags }: Project) {
  return (
    <Link href={`/portfolio/${slug}`} className="group block rounded-2xl overflow-hidden border border-white/10 bg-white/5">
      <div className="relative aspect-[16/10]">
        <Image src={image} alt={title} fill className="object-cover transition group-hover:scale-[1.03]" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-white/70 text-sm">{summary}</p>
        {tags && <div className="mt-2 flex flex-wrap gap-2">{tags.map(t => <span key={t} className="text-xs px-2 py-1 rounded bg-white/10">{t}</span>)}</div>}
      </div>
    </Link>
  );
}
