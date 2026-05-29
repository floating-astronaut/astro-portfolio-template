// Generic Cloudflare Pages Function backing the contact form (POST /api/contact).
//
// It emails the submission via Resend IF these env vars are set in your
// Cloudflare Pages project (Settings → Environment variables):
//   RESEND_API_KEY   — your Resend API key
//   CONTACT_TO       — where submissions are delivered, e.g. you@example.com
//   CONTACT_FROM     — verified Resend sender, e.g. "Site <hello@example.com>"
//
// If they're unset, it returns a clear "not configured" message instead of
// failing silently. Swap Resend for your provider of choice — the contract
// the form expects is just: 200 → ok, non-200 → error.

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json(400, { ok: false, error: 'Invalid JSON.' });
  }

  const name = String(body.name ?? '').trim().slice(0, 200);
  const email = String(body.email ?? '').trim().slice(0, 200);
  const message = String(body.message ?? '').trim().slice(0, 5000);

  if (!name || !email || !message) {
    return json(400, { ok: false, error: 'Name, email, and message are required.' });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json(400, { ok: false, error: 'Please provide a valid email.' });
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
    return json(503, {
      ok: false,
      error:
        'Contact endpoint is not configured. Set RESEND_API_KEY, CONTACT_TO, and CONTACT_FROM ' +
        'in your Cloudflare Pages env, or point the form at your own handler.',
    });
  }

  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM,
      to: env.CONTACT_TO,
      reply_to: email,
      subject: `New contact form message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  });

  if (!resp.ok) {
    return json(502, { ok: false, error: 'Could not send — please try again later.' });
  }
  return json(200, { ok: true });
};

function json(status: number, data: unknown): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
