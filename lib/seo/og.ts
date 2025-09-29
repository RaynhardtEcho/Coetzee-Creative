// lib/seo/og.ts
import type { StaticImageData } from 'next/image';

export type ImgSrc = string | StaticImageData;

export const resolveImg = (src?: ImgSrc) =>
  !src ? undefined : typeof src === 'string' ? src : src.src;

export const toOgImages = (
  src?: ImgSrc,
  alt?: string,
  width = 1200,
  height = 630
) => {
  const url = resolveImg(src);
  return url ? [{ url, width, height, alt }] : undefined;
};
