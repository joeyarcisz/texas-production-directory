export async function POST(req) {
  const { email } = await req.json().catch(() => ({}));
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return Response.json({ ok: false }, { status: 400 });
  const key = process.env.RESEND_API_KEY, aud = process.env.RESEND_AUDIENCE_ID;
  if (key && aud) {
    const r = await fetch(`https://api.resend.com/audiences/${aud}/contacts`, { method: "POST", headers: { Authorization: `Bearer ${key}`, "content-type": "application/json" }, body: JSON.stringify({ email, unsubscribed: false }) });
    if (!r.ok) return Response.json({ ok: false }, { status: 502 });
  } else console.log("SUBSCRIBE", email);
  return Response.json({ ok: true });
}
