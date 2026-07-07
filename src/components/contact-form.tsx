"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-accent/30 bg-accent-soft p-8 text-center">
        <p className="font-medium text-foreground">Message sent.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          We typically reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm outline-none focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm outline-none focus:border-accent"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={5}
          className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent"
        />
      </div>
      {status === "error" ? (
        <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
      ) : null}
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-accent-foreground transition hover:brightness-110 disabled:opacity-60"
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        Send message
      </button>
    </form>
  );
}
