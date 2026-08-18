import { NextResponse } from "next/server";
import { z } from "zod";
import { getPayment } from "@/lib/cutluy";

const schema = z.object({ paymentId: z.string().min(1) });

export async function GET(request: Request) {
  const parsed = schema.safeParse({
    paymentId: new URL(request.url).searchParams.get("paymentId"),
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Missing paymentId." }, { status: 400 });
  }

  try {
    const payment = await getPayment(parsed.data.paymentId);
    return NextResponse.json({ status: payment.status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to check payment";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
