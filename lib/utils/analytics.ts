// Safe analytics with UTM storage + forwarding
type EventPayload = Record<string, unknown>;

const isProd = process.env.NODE_ENV === 'production';

export function trackEvent(name: string, props: EventPayload = {}) {
  try {
    if (!isProd) return; // no-op in dev
    // GA4 example (replace with your stack or forward to your API)
    (window as any).gtag?.('event', name, props);
    (window as any).dataLayer?.push?.({ event: name, ...props });
  } catch {}
}

// Call once on app load / layout mount
export function captureUtmsFromUrl(now = new Date()) {
  try {
    const usp = new URLSearchParams(window.location.search);
    let changed = false;
    ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].forEach((k) => {
      const v = usp.get(k);
      if (v) {
        localStorage.setItem(`utm.${k}`, v);
        changed = true;
      }
    });
    if (changed) localStorage.setItem('utm.ts', String(now.getTime()));
  } catch {}
}

// Attach UTM params to any URL (e.g. WhatsApp/mailto/contact)
export function withStoredUtms(href: string) {
  try {
    const url = new URL(href, window.location.origin);
    ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].forEach((k) => {
      const v = localStorage.getItem(`utm.${k}`);
      if (v && !url.searchParams.get(k)) url.searchParams.set(k, v);
    });
    return url.toString();
  } catch {
    return href;
  }
}
