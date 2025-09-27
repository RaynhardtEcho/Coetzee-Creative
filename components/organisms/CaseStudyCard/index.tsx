'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import GoldMockup from '@/components/three/GoldMockup';
import GalleryPlane from '@/components/three/GalleryPlane';
import Button from '@/components/atoms/Button';
import { useReveal } from '@/components/ux/useReveal';
import ErrorBoundary from '@/components/ux/ErrorBoundary';
import type { Route } from 'next'; // ⬅️ add this

type Props = {
  variant: 'interio' | 'pieter' | 'boundless';
  title: string;
  description: string;
  quote: string;
  images: [string, ...string[]]; // ensure at least one image for <Image src=...>
  href?: Route; // ⬅️ make href a typed route
};

export default function CaseStudyCard({
  variant,
  title,
  description,
  quote,
  images,
  href = '/contact' as const, // ⬅️ const literal satisfies Route
}: Props) {
  const [hovered, setHovered] = useState(false);
  useReveal(`cs-${variant}`);

  const base = 'mb-6 inline-block rounded-3xl border border-white/10 bg-white/5 overflow-hidden';
  const size = 'w-full';

  return (
    <article
      id={`cs-${variant}`}
      className="break-inside-avoid"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`${base} ${size}`} data-reveal>
        <div className="relative">
          {/* Top visual area */}
          <div className="relative aspect-[16/10]">
            {variant === 'pieter' ? (
              <ErrorBoundary
                fallback={
                  <div className="w-full h-full grid grid-cols-3 gap-1 p-1 bg-white/5">
                    {images.slice(0, 3).map((src) => (
                      <img key={src} src={src} alt="" className="w-full h-full object-cover rounded" />
                    ))}
                  </div>
                }
              >
                <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 4], fov: 60 }}>
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[3, 3, 4]} intensity={1.2} />
                  <Suspense fallback={null}>
                    <GalleryPlane images={images} />
                  </Suspense>
                </Canvas>
              </ErrorBoundary>
            ) : (
              <>
                <Image
                  src={images[0]}
                  alt={title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                {/* 3D mockup on hover */}
                {hovered && (
                  <div className="absolute inset-0">
                    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 3.2], fov: 50 }}>
                      <ambientLight intensity={0.5} />
                      <directionalLight position={[2, 2, 3]} intensity={1.2} />
                      <Suspense fallback={null}>
                        <GoldMockup />
                      </Suspense>
                    </Canvas>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-2xl font-semibold">{title}</h3>
            <p className="text-white/70 mt-2">{description}</p>
            <blockquote className="mt-4 text-white/80 border-l-2 border-gold/60 pl-3">“{quote}”</blockquote>
            <div className="mt-6">
              <Link href={href} aria-label={`View case study ${title}`}>
                <Button className="min-w-44 hover:-translate-y-0.5 active:translate-y-0 transition-transform">
                  View Case Study
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
