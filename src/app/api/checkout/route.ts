import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { createTransaction } from "@/lib/payway";
import { createPayment } from "@/lib/cutluy";
import { siteConfig } from "@/data/site";
import { pricingTiers } from "@/data/pricing";

const schema = z.object({
  plan: z.enum(["pro", "pro-plus"]),
  provider: z.enum(["payway", "cutluy"]).default("payway"),
  email: z.string().email().optional(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid checkout request." }, { status: 400 });
  }

  const tier = pricingTiers.find((tier) => tier.id === parsed.data.plan);
  const amount = tier?.price;
  if (!tier || typeof amount !== "number" || amount <= 0) {
    return NextResponse.json({ error: "That plan isn't purchasable." }, { status: 400 });
  }

  const orderId = `${parsed.data.plan}-${Date.now().toString(36)}-${randomUUID().slice(0, 6)}`;

  if (parsed.data.provider === "cutluy") {
    try {
      const payment = await createPayment({
        amount,
        referenceId: orderId,
        metadata: { plan: parsed.data.plan, email: parsed.data.email },
        idempotencyKey: orderId,
      });

      return NextResponse.json({
        orderId,
        provider: "cutluy",
        paymentId: payment.id,
        checkoutUrl: payment.checkout_url,
        qrString: payment.qr_string,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "CutLuy payment failed";
      return NextResponse.json({ error: message }, { status: 502 });
    }
  }

  // Default: ABA PayWay
  const result = await createTransaction({
    tranId: orderId,
    amount,
    currency: "USD",
    items: [
      {
        name: `JgDo ${tier.name}`,
        quantity: 1,
        price: amount,
      },
    ],
    returnUrl: `${siteConfig.url}/api/payway/callback`,
    cancelUrl: `${siteConfig.url}/checkout/cancel`,
    continueSuccessUrl: `${siteConfig.url}/checkout/success`,
    customFields: { plan: parsed.data.plan },
  });

  if (result.status?.code !== "00") {
    return NextResponse.json(
      { error: result.status?.message ?? "Payment provider rejected the request." },
      { status: 502 }
    );
  }

  return NextResponse.json({
    orderId,
    provider: "payway",
    tranId: result.tranId,
    qrString: result.qrString,
    qrImage: result.qrImage,
    abapayDeeplink: result.abapayDeeplink,
  });
}
