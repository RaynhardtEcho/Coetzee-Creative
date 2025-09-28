// components/ux/useFormPersist.ts
'use client';

import { useEffect } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';

type Options<T extends FieldValues> = {
  /** keys you do NOT want to persist (e.g. passwords) */
  exclude?: (keyof T)[];
  /** custom storage (defaults to localStorage on the client) */
  storage?: Storage;
};

export function useFormPersist<T extends FieldValues>(
  key: string,
  form: UseFormReturn<T>,
  opts: Options<T> = {}
) {
  const { watch, reset, getValues } = form;

  // Prefer caller-provided storage, else use localStorage if we're on the client
  const storage =
    opts.storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
  const exclude = opts.exclude ?? [];

  useEffect(() => {
    if (!storage) return;

    // 1) Rehydrate once on mount
    try {
      const raw = storage.getItem(key);
      if (raw) {
        const data = JSON.parse(raw) as Partial<T>;
        // Merge with current values so we keep defaults for missing keys
        const merged = { ...getValues(), ...data } as T;
        reset(merged);
      }
    } catch {
      // ignore bad JSON or access errors
    }

    // 2) Subscribe to changes and persist
    const sub = watch((values) => {
      try {
        // shallow omit excluded keys
        const toSave: Record<string, unknown> = { ...values };
        for (const k of exclude) delete toSave[k as string];
        storage.setItem(key, JSON.stringify(toSave));
      } catch {
        // ignore quota / access errors
      }
    });

    return () => sub.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, storage]); // watch/reset/getValues are stable from RHF
}
