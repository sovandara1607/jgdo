import { NextResponse } from "next/server";
import { verifyCallbackSignature } from "@/lib/payway";
import { generateLicenseKey } from "@/lib/license";

/**
 * Server-to-server callback ABA PayWay posts to `return_url` once a
 * transaction settles. This is the only trustworthy signal that money moved —
 * the browser's continue_success_url redirect can be spoofed by the user, this
 * can't (signature is over the raw body with our API key).
 *
 * Note: PayWay doesn't include customer email in the callback. The license key
 * will need to be sent via the success page redirect or a separate flow.
 * For now, we log the confirmed payment for manual fulfillment.
 */
export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-payway-hmac-sha512");

  if (!verifyCallbackSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody) as {
    tran_id: string;
    custom_fields?: string;
    status: { code: string; message: string };
  };

  if (payload.status.code === "00") {
    // custom_fields is the JSON string we set at checkout: { plan: "pro" | "pro-plus" }
    let plan: "pro" | "pro-plus" = "pro";
    try {
      const custom = payload.custom_fields ? JSON.parse(payload.custom_fields) : null;
      if (custom?.plan === "pro-plus") plan = "pro-plus";
    } catch {
      // malformed custom_fields — fall back to "pro", fix up manually if needed
    }

    const licenseKey = generateLicenseKey(plan);
    console.log(`[payway] payment confirmed: ${payload.tran_id} plan=${plan} license=${licenseKey}`);

    // TODO: PayWay doesn't return the customer's email in this callback, so we
    // can't auto-email the key here yet. Either capture email at checkout and
    // pass it through custom_fields (same as `plan`), or fulfil manually using
    // this log line until that's wired up.
  } else {
    console.log("[payway] payment not successful:", payload.tran_id, payload.status);
  }

  return NextResponse.json({ ok: true });
}
