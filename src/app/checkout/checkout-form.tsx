"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";

const waitSteps = [
  "Complete the payment in your banking app",
  "We check for confirmation automatically every few seconds — no need to refresh",
  "You're redirected here and emailed your license key the moment it's confirmed",
];

type Plan = "pro" | "pro-plus";
type Provider = "payway" | "cutluy";
type Status = "idle" | "loading" | "ready" | "error" | "success";

interface PaywayData {
  provider: "payway";
  tranId: string;
  qrImage?: string;
  abapayDeeplink?: string;
}

interface CutluyData {
  provider: "cutluy";
  orderId: string;
  paymentId: string;
  checkoutUrl: string;
  qrString: string;
}

type CheckoutData = PaywayData | CutluyData;

const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS = 5 * 60 * 1000;

export function CheckoutForm({ plan }: { plan: Plan }) {
  const router = useRouter();
  const [provider, setProvider] = useState<Provider>("cutluy");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<CheckoutData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [timedOut, setTimedOut] = useState(false);
  const pollStartedAt = useRef<number>(0);

  const startCheckout = async () => {
    if (provider === "cutluy" && !email.trim()) {
      setError("Email is required to receive your license key.");
      return;
    }

    setStatus("loading");
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, provider, email: email || undefined }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error(json?.error || "checkout request failed");
      }

      const json: CheckoutData = await res.json();
      setData(json);
      setStatus("ready");
      pollStartedAt.current = Date.now();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("idle");
    }
  };

  useEffect(() => {
    if (status !== "ready" || !data) return;

    const interval = setInterval(async () => {
      if (Date.now() - pollStartedAt.current > POLL_TIMEOUT_MS) {
        setTimedOut(true);
        clearInterval(interval);
        return;
      }

      try {
        if (data.provider === "payway") {
          const res = await fetch(`/api/payway/status?tranId=${encodeURIComponent(data.tranId)}`);
          if (!res.ok) return;
          const json: { paymentStatusCode?: number } = await res.json();

          if (json.paymentStatusCode === 0) {
            clearInterval(interval);
            setStatus("success");
            router.push("/checkout/success");
          } else if (
            json.paymentStatusCode === 3 ||
            json.paymentStatusCode === 4 ||
            json.paymentStatusCode === 7
          ) {
            clearInterval(interval);
            router.push("/checkout/cancel");
          }
        } else {
          const res = await fetch(
            `/api/cutluy/status?paymentId=${encodeURIComponent(data.paymentId)}`
          );
          if (!res.ok) return;
          const json: { status?: string } = await res.json();

          if (json.status === "paid") {
            clearInterval(interval);
            setStatus("success");
            router.push("/checkout/success");
          } else if (json.status === "expired" || json.status === "failed") {
            clearInterval(interval);
            router.push("/checkout/cancel");
          }
        }
      } catch {
        // transient network hiccup — keep polling
      }
    }, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [status, data, router]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground">Upgrade to {plan === "pro-plus" ? "Pro+" : "Pro"}</h1>
      <p className="mt-2 text-muted-foreground">One-time purchase. Lifetime access.</p>

      {/* Provider selector */}
      <div className="mt-6 flex gap-2 rounded-lg border border-border p-1">
        <button
          onClick={() => setProvider("cutluy")}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            provider === "cutluy"
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Bakong KHQR
        </button>
        <button
          onClick={() => setProvider("payway")}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            provider === "payway"
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          ABA PayWay
        </button>
      </div>

      {/* Email input (CutLuy only) */}
      {provider === "cutluy" && status === "idle" && (
        <div className="mt-4">
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
            Email for license key
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mt-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Start checkout button */}
      {status === "idle" && (
        <Button onClick={startCheckout} className="mt-6 w-full" size="lg">
          Pay ${(plan === "pro-plus" ? 2.5 : 1.99).toFixed(2)}
        </Button>
      )}

      {/* Loading state */}
      {status === "loading" && (
        <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          Preparing payment…
        </div>
      )}

      {/* QR code display */}
      {status === "ready" && data && (
        <>
          <p className="mt-6 text-sm text-muted-foreground">
            Scan this KHQR code with any participating bank app (ABA, Wing, TrueMoney, etc.).
          </p>

          <div className="mt-4 flex justify-center">
            {data.provider === "cutluy" ? (
              <div className="rounded-2xl border border-border bg-white p-4">
                <QRCodeSVG value={data.qrString} size={260} />
              </div>
            ) : data.qrImage ? (
              // eslint-disable-next-line @next/next/no-img-element -- dynamically generated data: URI
              <img
                src={data.qrImage}
                alt="ABA KHQR payment code"
                width={260}
                height={260}
                className="rounded-2xl border border-border"
              />
            ) : null}
          </div>

          {data.provider === "cutluy" && (
            <Button href={data.checkoutUrl} className="mt-4 w-full" external variant="secondary">
              Open payment page
            </Button>
          )}
          {data.provider === "payway" && data.abapayDeeplink && (
            <Button href={data.abapayDeeplink} className="mt-4 w-full" external variant="secondary">
              Open in ABA Mobile
            </Button>
          )}

          {timedOut ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Still waiting. If you&apos;ve already paid, this can take a minute to confirm — otherwise{" "}
              <button onClick={() => { setStatus("idle"); setData(null); setTimedOut(false); }} className="underline">
                start over
              </button>.
            </p>
          ) : (
            <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
              Waiting for payment…
            </p>
          )}

          <ol className="mt-6 space-y-3 rounded-2xl border border-border bg-surface p-5 text-left">
            {waitSteps.map((step, i) => (
              <li key={step} className="flex gap-3 text-sm text-muted-foreground">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface-muted text-[11px] font-semibold text-foreground">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}
