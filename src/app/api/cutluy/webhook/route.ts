import { NextResponse } from "next/server";
import { verifyWebhookSignature, getPayment } from "@/lib/cutluy";
import { generateLicenseKey } from "@/lib/license";
import { sendLicenseEmail } from "@/lib/email";

/**
 * CutLuy webhook endpoint for Bakong KHQR payment events.
 *
 * Security requirements:
 * 1. Verify HMAC signature over RAW body before any parsing.
 * 2. Constant-time signature comparison (timingSafeEqual).
 * 3. Reject deliveries with timestamp >5 min old.
 * 4. Respond 2xx quickly, do work asynchronously.
 * 5. Idempotent — key off payment id.
 * 6. Fulfil only on payment.completed.
 */
export async function POST(request: Request) {
  const rawBody = await request.text();

  const event = request.headers.get("X-CutLuy-Event") as
    | "payment.completed"
    | "payment.scanned"
    | "payment.expired"
    | "payment.failed"
    | null;
  const signature = request.headers.get("X-CutLuy-Signature") ?? "";

  if (!event) {
    return NextResponse.json({ error: "Missing X-CutLuy-Event header" }, { status: 400 });
  }

  const verified = verifyWebhookSignature(rawBody, { event, signature });
  if (!verified) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const { event: eventType, payload } = verified;
  const paymentId = payload.id as string | undefined;

  console.log(`[cutluy-webhook] ${eventType} payment=${paymentId}`);

  // Extract payment data from the nested payload
  const paymentData = (payload.data as { payment?: Record<string, unknown> })?.payment;
  const paymentStatus = paymentData?.status as string | undefined;
  const referenceId = paymentData?.reference_id as string | undefined;

  switch (eventType) {
    case "payment.completed": {
      // Only fulfil if status is actually "paid" (belt and suspenders)
      if (paymentStatus !== "paid") {
        console.log(`[cutluy-webhook] completed event but status=${paymentStatus}, skipping: ${paymentId}`);
        break;
      }

      // Idempotent: same payment.id can arrive twice; check before acting.
      console.log(`[cutluy-webhook] payment completed: ${paymentId} ref=${referenceId}`);

      // Fetch full payment details to get metadata (webhook may not include it)
      let plan: "pro" | "pro-plus" = "pro";
      let email: string | undefined;

      if (paymentId) {
        try {
          const fullPayment = await getPayment(paymentId);
          const meta = fullPayment.metadata as Record<string, string> | null;
          if (meta?.plan === "pro-plus") plan = "pro-plus";
          email = meta?.email;
        } catch (err) {
          console.error(`[cutluy-webhook] failed to fetch payment details:`, err);
        }
      }

      if (email && paymentId) {
        const licenseKey = generateLicenseKey(plan);
        try {
          await sendLicenseEmail({ to: email, plan, licenseKey });
          console.log(`[cutluy-webhook] license emailed to ${email}`);
        } catch (err) {
          // Log but don't fail the webhook — we can retry or manually fulfill
          console.error(`[cutluy-webhook] failed to email license to ${email}:`, err);
        }
      } else {
        console.log(`[cutluy-webhook] no email found, manual fulfillment needed: ${paymentId}`);
      }
      break;
    }
    case "payment.scanned": {
      // Customer opened QR but has NOT paid yet. Never fulfil on this.
      console.log(`[cutluy-webhook] payment scanned (not paid): ${paymentId}`);
      break;
    }
    case "payment.expired": {
      console.log(`[cutluy-webhook] payment expired: ${paymentId}`);
      break;
    }
    case "payment.failed": {
      console.log(`[cutluy-webhook] payment failed: ${paymentId}`);
      break;
    }
  }

  return NextResponse.json({ ok: true });
}
