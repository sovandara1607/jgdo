"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Plan = "pro" | "pro-plus";
type Status = "loading" | "ready" | "error";

interface CheckoutData {
  tranId: string;
  qrImage?: string;
  abapayDeeplink?: string;
}

const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS = 5 * 60 * 1000;

export function CheckoutForm({ plan }: { plan: Plan }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("loading");
  const [data, setData] = useState<CheckoutData | null>(null);
  const [timedOut, setTimedOut] = useState(false);
  const pollStartedAt = useRef<number>(0);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("checkout request failed");
        return res.json();
      })
      .then((json: CheckoutData) => {
        if (cancelled) return;
        setData(json);
        setStatus("ready");
        pollStartedAt.current = Date.now();
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [plan]);

  useEffect(() => {
    if (status !== "ready" || !data) return;

    const interval = setInterval(async () => {
      if (Date.now() - pollStartedAt.current > POLL_TIMEOUT_MS) {
        setTimedOut(true);
        clearInterval(interval);
        return;
      }

      try {
        const res = await fetch(`/api/payway/status?tranId=${encodeURIComponent(data.tranId)}`);
        if (!res.ok) return;
        const json: { paymentStatusCode?: number } = await res.json();

        if (json.paymentStatusCode === 0) {
          clearInterval(interval);
          router.push("/checkout/success");
        } else if (json.paymentStatusCode === 3 || json.paymentStatusCode === 4 || json.paymentStatusCode === 7) {
          clearInterval(interval);
          router.push("/checkout/cancel");
        }
      } catch {
        // transient network hiccup — keep polling
      }
    }, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [status, data, router]);

  if (status === "error") {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Couldn&apos;t start checkout</h1>
        <p className="mt-2 text-muted-foreground">
          Something went wrong reaching the payment provider. Please try again.
        </p>
        <Button href={`/checkout?plan=${plan}`} className="mt-6">
          Retry
        </Button>
      </div>
    );
  }

  if (status === "loading" || !data) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Preparing your payment…</h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground">Scan to pay</h1>
      <p className="mt-2 text-muted-foreground">
        Scan this KHQR code with the ABA Mobile app or any participating bank app.
      </p>
      {data.qrImage ? (
        // eslint-disable-next-line @next/next/no-img-element -- dynamically generated data: URI, not a next/image candidate
        <img
          src={data.qrImage}
          alt="ABA KHQR payment code"
          width={280}
          height={280}
          className="mx-auto mt-6 rounded-2xl border border-border"
        />
      ) : null}
      {data.abapayDeeplink ? (
        <Button href={data.abapayDeeplink} className="mt-6 w-full" external>
          Open in ABA Mobile
        </Button>
      ) : null}
      {timedOut ? (
        <p className="mt-4 text-sm text-muted-foreground">
          Still waiting for payment. If you&apos;ve already paid, this can take a minute to
          confirm — otherwise{" "}
          <a href={`/checkout?plan=${plan}`} className="underline">
            start a new payment
          </a>
          .
        </p>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">Waiting for payment confirmation…</p>
      )}
    </div>
  );
}
