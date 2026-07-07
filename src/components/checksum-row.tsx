"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function ChecksumRow({ label, sha256 }: { label: string; sha256: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(sha256);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-surface-muted px-4 py-3">
      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground">{label} &middot; SHA-256</p>
        <p className="mt-0.5 truncate font-mono text-xs text-foreground/80">{sha256}</p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy checksum"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-accent" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}
