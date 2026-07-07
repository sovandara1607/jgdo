import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(200),
  email: z.email(),
  message: z.string().min(10).max(5000),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please fill in every field with a valid value." },
      { status: 400 }
    );
  }

  // TODO: forward to your support inbox / ticketing system (e.g. via Resend or a helpdesk API)
  console.log("[contact] new message:", parsed.data);

  return NextResponse.json({ ok: true });
}
