'use client';
import * as THREE from 'three';
import { useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

type Props = {
  color?: string;   // defaults to neutral border
  opacity?: number; // 0..1
  speed?: number;   // motion multiplier
};

export default function SubtleStrands({
  color = '#C6C6C6',
  opacity = 0.18,
  speed = 1,
}: Props) {
  // Path points once
  const points = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    const len = 180;
    for (let i = 0; i < len; i++) {
      const t = i / len;
      const x = (t - 0.5) * 8;
      const y = Math.sin(t * Math.PI * 2) * 0.35;
      const z = Math.cos(t * Math.PI) * 0.15;
      arr.push(new THREE.Vector3(x, y, z));
    }
    return arr;
  }, []);

  // Geometry & material
  const geometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(points),
    [points]
  );

  const material = useMemo(() => {
    const m = new THREE.LineBasicMaterial({ transparent: true });
    m.color = new THREE.Color(color);
    m.opacity = opacity;
    return m;
  }, [color, opacity]);

  // The actual THREE.Line object
  const obj = useMemo(() => new THREE.Line(geometry, material), [geometry, material]);

  // Animate
  useFrame((_, d) => {
    obj.rotation.y += d * 0.05 * speed;
    obj.rotation.x += d * 0.02 * speed;
  });

  // Clean up GPU resources
  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  return <primitive object={obj} />;
}
