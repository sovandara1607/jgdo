"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium",
          inverted
            ? "border-background/30 bg-background/10 text-background"
            : "border-border bg-surface-muted text-foreground",
          className
        )}
      >
        <Check className="h-4 w-4" />
        You&apos;re on the list — check your inbox to confirm.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex w-full max-w-md gap-2", className)}>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={cn(
          "h-11 min-w-0 flex-1 rounded-full border px-4 text-sm outline-none transition-colors",
          inverted
            ? "border-background/25 bg-transparent text-background placeholder:text-background/40 focus:border-background"
            : "border-border bg-surface focus:border-foreground"
        )}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full px-5 text-sm font-medium transition hover:opacity-90 disabled:opacity-60",
          inverted ? "bg-background text-foreground" : "bg-accent text-accent-foreground"
        )}
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Subscribe
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
      {status === "error" ? (
        <p className="absolute mt-14 text-xs text-red-400">Something went wrong. Try again.</p>
      ) : null}
    </form>
  );
}
