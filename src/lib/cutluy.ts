import { createHmac, timingSafeEqual } from "crypto";

const CUTLUY_BASE_URL = "https://cutluy.com";

function getApiKey(): string {
  const key = process.env.CUTLUY_API_KEY;
  if (!key) throw new Error("Missing required env var: CUTLUY_API_KEY");
  return key;
}

function getWebhookSecret(): string {
  const secret = process.env.CUTLUY_WEBHOOK_SECRET;
  if (!secret) throw new Error("Missing required env var: CUTLUY_WEBHOOK_SECRET");
  return secret;
}

function headers() {
  return {
    Authorization: `Bearer ${getApiKey()}`,
    "Content-Type": "application/json",
  };
}

/* ── Create payment ─────────────────────────────────────────────────────── */

export interface CreatePaymentParams {
  amount: number;
  referenceId?: string;
  metadata?: Record<string, unknown>;
  idempotencyKey?: string;
}

export interface CutluyPayment {
  id: string;
  status: string;
  amount: string;
  currency: string;
  checkout_url: string;
  qr_string: string;
  metadata?: Record<string, unknown> | null;
}

export interface CutluyError {
  error: string;
  message: string;
}

export async function createPayment(
  params: CreatePaymentParams
): Promise<CutluyPayment> {
  const body: Record<string, unknown> = {
    amount: Math.round(params.amount * 100) / 100, // ensure 2 decimal places
  };
  if (params.referenceId) body.reference_id = params.referenceId;
  if (params.metadata) body.metadata = params.metadata;
  if (params.idempotencyKey) body.idempotency_key = params.idempotencyKey;

  const res = await fetch(`${CUTLUY_BASE_URL}/v1/payments`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    const err = data as CutluyError;
    throw new Error(
      `CutLuy API error ${res.status}: ${err.error} — ${err.message}`
    );
  }

  return data as CutluyPayment;
}

/* ── Read payment ───────────────────────────────────────────────────────── */

export async function getPayment(id: string): Promise<CutluyPayment> {
  const res = await fetch(`${CUTLUY_BASE_URL}/v1/payments/${id}`, {
    headers: headers(),
  });

  const data = await res.json();

  if (!res.ok) {
    const err = data as CutluyError;
    throw new Error(
      `CutLuy API error ${res.status}: ${err.error} — ${err.message}`
    );
  }

  return data as CutluyPayment;
}

/* ── Webhook signature verification ─────────────────────────────────────── */

export type WebhookEvent =
  | "payment.completed"
  | "payment.scanned"
  | "payment.expired"
  | "payment.failed";

export interface WebhookHeaders {
  event: WebhookEvent;
  signature: string;
}

export interface VerifiedWebhook {
  event: WebhookEvent;
  payload: Record<string, unknown>;
}

/**
 * Parses and validates the X-CutLuy-Event / X-CutLuy-Signature headers.
 * Returns the parsed payload only if the HMAC signature is valid and the
 * timestamp is within 5 minutes of now.
 */
export function verifyWebhookSignature(
  rawBody: string,
  headers: WebhookHeaders
): VerifiedWebhook | null {
  const sigHeader = headers.signature;
  if (!sigHeader) return null;

  // Parse "t=<unix>,v1=<hex>"
  const parts = Object.fromEntries(
    sigHeader.split(",").map((p) => {
      const [k, ...v] = p.split("=");
      return [k, v.join("=")];
    })
  );

  const t = parts.t;
  const v1 = parts.v1;
  if (!t || !v1) return null;

  // Reject replays older than 5 minutes
  const timestamp = Number(t);
  if (Number.isNaN(timestamp)) return null;
  const age = Math.abs(Date.now() / 1000 - timestamp);
  if (age > 300) return null;

  // HMAC-SHA256 over "${t}.${rawBody}"
  const secret = getWebhookSecret();
  const expected = createHmac("sha256", secret)
    .update(`${t}.${rawBody}`)
    .digest("hex");

  const expectedBuf = Buffer.from(expected, "hex");
  const receivedBuf = Buffer.from(v1, "hex");
  if (expectedBuf.length !== receivedBuf.length) return null;
  if (!timingSafeEqual(expectedBuf, receivedBuf)) return null;

  const event = headers.event;
  const payload = JSON.parse(rawBody) as Record<string, unknown>;

  return { event, payload };
}
