'use client';
import { useEffect, useState } from 'react';

/** Mount children only when hovered or in view to save perf */
export function useHoverMount() {
  const [mounted, setMounted] = useState(false);
  const onEnter = () => setMounted(true);
  const onLeave = () => setMounted(false);
  useEffect(() => () => setMounted(false), []);
  return { mounted, onEnter, onLeave };
}
