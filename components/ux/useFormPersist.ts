'use client';
import { useEffect } from 'react';
import type { UseFormReturn } from 'react-hook-form';

/** Persists a react-hook-form to localStorage by key */
export function useFormPersist<T>(key: string, form: UseFormReturn<T>) {
  const { watch, reset } = form;
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) reset(JSON.parse(raw));
    } catch {}
    const sub = watch((values) => {
      try { localStorage.setItem(key, JSON.stringify(values)); } catch {}
    });
    return () => sub.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, reset]);
}
