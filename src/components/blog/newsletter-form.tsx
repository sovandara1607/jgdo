"use client";

import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-8 text-center sm:p-10">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
        <Mail className="h-5 w-5" />
      </div>
      <h2 className="mt-4 text-xl font-semibold text-foreground">
        Stay in the loop
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Get notified when we publish new guides, product updates, and engineering deep dives.
      </p>
      {submitted ? (
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-soft px-5 py-2.5 text-sm font-medium text-accent">
          <CheckCircle2 className="h-4 w-4" />
          You&rsquo;re subscribed!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-sm gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="h-10 flex-1 rounded-full border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
          <button
            type="submit"
            className="h-10 rounded-full bg-accent px-5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Subscribe
          </button>
        </form>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        No spam. Unsubscribe any time.
      </p>
    </div>
  );
}
