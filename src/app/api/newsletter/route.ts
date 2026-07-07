import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.email(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  // TODO: wire up to your email provider (Resend, Mailchimp, Buttondown, etc.)
  console.log("[newsletter] new subscriber:", parsed.data.email);

  return NextResponse.json({ ok: true });
}
