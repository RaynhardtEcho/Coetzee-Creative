'use client';
import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

type Props = { images: [string, ...string[]] }; // ensure at least one image

export default function GalleryPlane({ images }: Props) {
  const mesh = useRef<THREE.Mesh>(null!);

  const textures = useLoader(TextureLoader, images, (loader) => {
    (loader as TextureLoader).setCrossOrigin('anonymous');
  });

  // Colorspace + filtering
  textures.forEach((t) => {
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    t.generateMipmaps = true;
    t.needsUpdate = true;
  });

  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        metalness: 0.2,
        roughness: 0.8,
        // assign an initial map (or null) to satisfy Texture | null
        map: textures[0] ?? null,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = Math.sin(clock.elapsedTime * 0.4) * 0.2;

    if (textures.length > 0) {
      const idx = Math.floor(clock.elapsedTime / 3) % textures.length;
      const next = textures[idx] ?? null; // Texture | null
      if (mat.map !== next) {
        mat.map = next;
        mat.needsUpdate = true;
      }
    }
  });

  return (
    <mesh ref={mesh} material={mat}>
      <planeGeometry args={[2.2, 1.4]} />
    </mesh>
  );
}
