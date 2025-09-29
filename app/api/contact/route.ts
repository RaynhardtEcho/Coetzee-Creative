// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactSchema } from '@/lib/validation/contact';

const resend = new Resend(process.env.RESEND_API_KEY);

// basic allow-list for From/To
const TO = process.env.CONTACT_TO_EMAIL!;
const FROM = process.env.CONTACT_FROM_EMAIL || 'noreply@on.resend.dev';

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = ContactSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: 'Invalid input' }, { status: 400 });
    }

    const data = parsed.data;

    // Honeypot (bots fill this)
    if (data.website && data.website.length > 0) {
      // Pretend success (don’t tip off bots)
      return NextResponse.json({ ok: true });
    }

    // Compose a nice email
    const subject = `New inquiry${data.package ? ` — ${capitalize(data.package)}` : ''} — ${data.name}`;
    const lines = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.company ? `Company: ${data.company}` : undefined,
      data.package ? `Package: ${capitalize(data.package)}` : undefined,
      '',
      'Message:',
      data.message,
    ].filter(Boolean);

    await resend.emails.send({
      from: FROM,
      to: TO,
      subject,
      text: lines.join('\n'),
      // Optional: simple HTML
      html: lines.map(l => `<p style="margin:0 0 8px">${escapeHTML(l as string)}</p>`).join(''),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function escapeHTML(s: string) {
  return s.replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]!));
}
