import { NextResponse } from "next/server";
import { z } from "zod";
import { checkTransaction } from "@/lib/payway";

const schema = z.object({ tranId: z.string().min(1).max(20) });

export async function GET(request: Request) {
  const parsed = schema.safeParse({
    tranId: new URL(request.url).searchParams.get("tranId"),
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Missing tranId." }, { status: 400 });
  }

  const result = await checkTransaction(parsed.data.tranId);

  if (result.statusCode !== "00") {
    return NextResponse.json({ error: result.statusMessage }, { status: 502 });
  }

  return NextResponse.json({
    paymentStatusCode: result.paymentStatusCode,
    paymentStatus: result.paymentStatus,
  });
}
