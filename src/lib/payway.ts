import { createHmac, timingSafeEqual } from "crypto";

/**
 * ABA PayWay "Purchase" (ecommerce checkout) request builder.
 * Docs: https://developer.payway.com.kh/purchase-14530820e0
 */

type PaywayEnvVar = "PAYWAY_MERCHANT_ID" | "PAYWAY_API_KEY" | "PAYWAY_BASE_URL";

function getEnv(name: PaywayEnvVar) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

export interface PurchaseItem {
  name: string;
  quantity: number;
  price: number;
}

export interface BuildPurchaseParams {
  tranId: string;
  amount: number;
  currency?: "USD" | "KHR";
  items?: PurchaseItem[];
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  returnUrl: string;
  cancelUrl: string;
  continueSuccessUrl: string;
  customFields?: Record<string, string>;
}

/**
 * Fields must stay in this exact order for the hash — PayWay's hash order
 * differs from the request-parameter order, and every position must be
 * present (empty string, not omitted) even for fields we don't send.
 */
export function buildPurchasePayload(params: BuildPurchaseParams) {
  const merchantId = getEnv("PAYWAY_MERCHANT_ID");
  const apiKey = getEnv("PAYWAY_API_KEY");

  const reqTime = formatReqTime(new Date());
  const currency = params.currency ?? "USD";
  const items = params.items
    ? Buffer.from(JSON.stringify(params.items)).toString("base64")
    : "";
  const customFields = params.customFields
    ? Buffer.from(JSON.stringify(params.customFields)).toString("base64")
    : "";

  const fields = {
    req_time: reqTime,
    merchant_id: merchantId,
    tran_id: params.tranId,
    amount: params.amount.toFixed(2),
    items,
    shipping: "",
    firstname: params.firstname ?? "",
    lastname: params.lastname ?? "",
    email: params.email ?? "",
    phone: params.phone ?? "",
    type: "purchase",
    payment_option: "",
    return_url: Buffer.from(params.returnUrl).toString("base64"),
    cancel_url: params.cancelUrl,
    continue_success_url: params.continueSuccessUrl,
    return_deeplink: "",
    currency,
    custom_fields: customFields,
    return_params: "",
    payout: "",
    lifetime: "",
    additional_params: "",
    google_pay_token: "",
    skip_success_page: "1",
  };

  const hashInput =
    fields.req_time +
    fields.merchant_id +
    fields.tran_id +
    fields.amount +
    fields.items +
    fields.shipping +
    fields.firstname +
    fields.lastname +
    fields.email +
    fields.phone +
    fields.type +
    fields.payment_option +
    fields.return_url +
    fields.cancel_url +
    fields.continue_success_url +
    fields.return_deeplink +
    fields.currency +
    fields.custom_fields +
    fields.return_params +
    fields.payout +
    fields.lifetime +
    fields.additional_params +
    fields.google_pay_token +
    fields.skip_success_page;

  const hash = createHmac("sha512", apiKey).update(hashInput).digest("base64");

  // The hash string needs every position filled (see above), but PayWay's
  // API validates whatever we actually POST — sending e.g. shipping=""
  // fails with "Wrong shipping price" instead of being treated as "none".
  // So only post fields that have a real value, plus the hash.
  const postFields: Record<string, string> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value !== "") postFields[key] = value;
  }
  postFields.hash = hash;

  return {
    action: `${getEnv("PAYWAY_BASE_URL")}/api/payment-gateway/v1/payments/purchase`,
    fields: postFields,
  };
}

function formatReqTime(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    date.getUTCFullYear().toString() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds())
  );
}

/**
 * Verifies the X_PAYWAY_HMAC_SHA512 header PayWay sends on the return_url
 * (server-to-server) callback, so we don't act on a spoofed POST.
 */
export function verifyCallbackSignature(rawBody: string, signatureHeader: string | null) {
  if (!signatureHeader) return false;
  const apiKey = getEnv("PAYWAY_API_KEY");
  const expected = createHmac("sha512", apiKey).update(rawBody).digest("base64");

  const expectedBuf = Buffer.from(expected);
  const receivedBuf = Buffer.from(signatureHeader);
  if (expectedBuf.length !== receivedBuf.length) return false;
  return timingSafeEqual(expectedBuf, receivedBuf);
}

export interface CreateTransactionResult {
  tranId: string;
  status: { code: string; message: string };
  qrString?: string;
  qrImage?: string;
  abapayDeeplink?: string;
}

/**
 * Calls the Purchase API server-to-server (not from the browser) and
 * returns the QR/deeplink payload to render ourselves. Browser-side calls
 * to this endpoint (e.g. via the checkout2-0.js plugin) are subject to
 * PayWay's domain whitelist and silently no-op on unwhitelisted domains;
 * a server call avoids that entirely.
 */
export async function createTransaction(params: BuildPurchaseParams): Promise<CreateTransactionResult> {
  const { action, fields } = buildPurchasePayload(params);

  const res = await fetch(action, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(fields).toString(),
  });

  const data = await res.json();

  return {
    tranId: params.tranId,
    status: data.status,
    qrString: data.qr_string,
    qrImage: data.qr_image,
    abapayDeeplink: data.abapay_deeplink,
  };
}

export interface CheckTransactionResult {
  statusCode: string;
  statusMessage: string;
  paymentStatusCode?: number;
  paymentStatus?: string;
}

/**
 * Polls the Check Transaction API for a previously created transaction.
 * payment_status_code: 0 = approved, 2 = pending, 3/4/7 = declined/refunded/cancelled.
 */
export async function checkTransaction(tranId: string): Promise<CheckTransactionResult> {
  const merchantId = getEnv("PAYWAY_MERCHANT_ID");
  const apiKey = getEnv("PAYWAY_API_KEY");
  const reqTime = formatReqTime(new Date());

  const hash = createHmac("sha512", apiKey)
    .update(reqTime + merchantId + tranId)
    .digest("base64");

  const res = await fetch(
    `${getEnv("PAYWAY_BASE_URL")}/api/payment-gateway/v1/payments/check-transaction-2`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ req_time: reqTime, merchant_id: merchantId, tran_id: tranId, hash }),
    }
  );

  const data = await res.json();

  return {
    statusCode: data.data?.status?.code,
    statusMessage: data.data?.status?.message,
    paymentStatusCode: data.data?.payment_status_code,
    paymentStatus: data.data?.payment_status,
  };
}
