// lib/utils/number.ts
// Deterministic thousands formatting — identical on server & client.
// Default separator: comma. Pass '\u202F' (narrow no-break space) if you prefer "18 000".

type Num = number | string | null | undefined;

function toInt(n: Num): number {
  if (typeof n === 'number') return Math.trunc(n);
  if (!n) return 0;
  const cleaned = String(n).replace(/[^\d-]/g, '');
  const parsed = parseInt(cleaned, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

function groupInt(absStr: string, sep: string): string {
  return absStr.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
}

export function formatNumber(n: Num, opts?: { separator?: string }): string {
  const separator = opts?.separator ?? ',';           // change to '\u202F' for thin space
  const num = toInt(n);
  const sign = num < 0 ? '-' : '';
  const absStr = Math.abs(num).toString();
  return sign + groupInt(absStr, separator);
}

export function formatCurrencyZAR(n: Num, opts?: { separator?: string }): string {
  return `R${formatNumber(n, opts)}`;
}
