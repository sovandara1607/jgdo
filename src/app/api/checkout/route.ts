import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { createTransaction } from "@/lib/payway";
import { siteConfig } from "@/data/site";
import { pricingTiers } from "@/data/pricing";

const schema = z.object({
  period: z.enum(["monthly", "yearly"]),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid checkout request." }, { status: 400 });
  }

  const pro = pricingTiers.find((tier) => tier.id === "pro");
  const amount = pro?.price[parsed.data.period];
  if (typeof amount !== "number" || amount <= 0) {
    return NextResponse.json({ error: "That plan isn't purchasable." }, { status: 400 });
  }

  const tranId = `pro-${Date.now().toString(36)}-${randomUUID().slice(0, 6)}`;

  const result = await createTransaction({
    tranId,
    amount,
    currency: "USD",
    items: [
      {
        name: `JgDo Pro (${parsed.data.period === "yearly" ? "Yearly" : "Monthly"})`,
        quantity: 1,
        price: amount,
      },
    ],
    returnUrl: `${siteConfig.url}/api/payway/callback`,
    cancelUrl: `${siteConfig.url}/checkout/cancel`,
    continueSuccessUrl: `${siteConfig.url}/checkout/success`,
    customFields: { plan: "pro", period: parsed.data.period },
  });

  if (result.status?.code !== "00") {
    return NextResponse.json(
      { error: result.status?.message ?? "Payment provider rejected the request." },
      { status: 502 }
    );
  }

  return NextResponse.json({
    tranId: result.tranId,
    qrString: result.qrString,
    qrImage: result.qrImage,
    abapayDeeplink: result.abapayDeeplink,
  });
}
