import { NextResponse } from "next/server";
import { verifyCallbackSignature } from "@/lib/payway";

/**
 * Server-to-server callback ABA PayWay posts to `return_url` once a
 * transaction settles. This is the only trustworthy signal that money moved —
 * the browser's continue_success_url redirect can be spoofed by the user, this
 * can't (signature is over the raw body with our API key).
 *
 * There's no database here yet, so this just verifies + logs. Wire in real
 * fulfillment (email a license key, etc.) where the TODO is.
 */
export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-payway-hmac-sha512");

  if (!verifyCallbackSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody) as {
    tran_id: string;
    status: { code: string; message: string };
  };

  if (payload.status.code === "00") {
    // TODO: fulfillment — e.g. email the license key to the customer.
    console.log("[payway] payment confirmed:", payload.tran_id);
  } else {
    console.log("[payway] payment not successful:", payload.tran_id, payload.status);
  }

  return NextResponse.json({ ok: true });
}
