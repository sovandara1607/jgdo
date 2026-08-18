import { createHmac, randomBytes } from "crypto";

/**
 * Generates a self-verifying license key: `{PLAN}-{XXXX}-{XXXX}-{CHECKSUM}`.
 *
 * The key is NOT looked up against a database — it's verified offline by the
 * app itself (see JgDo/LicenseManager.swift), which recomputes the same
 * HMAC-SHA256 checksum from a secret shared between this server and the
 * compiled app. That's what makes "paste a key, no internet required" work.
 *
 * Tradeoff: LICENSE_SECRET must be embedded in the shipped app binary to do
 * that offline check, so it's extractable (e.g. via `strings`) by a
 * sufficiently motivated user, who could then mint their own valid keys.
 * Acceptable for a low-price indie utility; move to server-side verification
 * (a `/api/verify-license` call) if that risk profile ever changes.
 *
 * IMPORTANT: LICENSE_SECRET here must be the exact same string as the
 * `secret` constant in JgDo/LicenseManager.swift, or every key this
 * generates will fail to validate in the app.
 */

const ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // base36, uppercase

function getSecret(): string {
  const secret = process.env.LICENSE_SECRET;
  if (!secret) throw new Error("Missing required env var: LICENSE_SECRET");
  return secret;
}

function randomPayload(len: number): string {
  const bytes = randomBytes(len);
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
}

function checksum(planCode: string, payload: string): string {
  const hash = createHmac("sha256", getSecret())
    .update(`${planCode}${payload}`)
    .digest("hex")
    .toUpperCase();
  return hash.slice(0, 4);
}

export type Plan = "pro" | "pro-plus";

const PLAN_CODES: Record<Plan, string> = {
  pro: "PRO0",
  "pro-plus": "PLUS",
};

export function generateLicenseKey(plan: Plan): string {
  const planCode = PLAN_CODES[plan];
  const payload = randomPayload(8); // 8 base36 chars, split into two groups of 4
  const sum = checksum(planCode, payload);
  return `${planCode}-${payload.slice(0, 4)}-${payload.slice(4, 8)}-${sum}`;
}
