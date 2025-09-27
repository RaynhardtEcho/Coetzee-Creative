'use client';
import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function GoldMockup() {
  const group = useRef<THREE.Group>(null!);
  useFrame((_, d) => {
    if (!group.current) return;
    group.current.rotation.y += d * 0.4;
  });

  return (
    <group ref={group}>
      <mesh>
        <boxGeometry args={[1.6, 1, 0.06]} />
        <meshStandardMaterial color={'#D4AF37'} metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0, -0.08]}>
        <boxGeometry args={[1.7, 1.1, 0.02]} />
        <meshStandardMaterial color={'#9c7c2a'} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}
