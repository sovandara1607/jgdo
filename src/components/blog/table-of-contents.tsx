"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { TocEntry } from "@/lib/blog";

export function TableOfContents({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (entries.length === 0) return;

    const headings = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (observedEntries) => {
        if (!mountedRef.current) return;
        const visible = observedEntries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-96px 0px -70% 0px" }
    );

    headings.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="sticky top-24">
      <div className="rounded-xl border border-border bg-surface p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          On this page
        </p>
        <ul className="mt-3 space-y-0.5">
          {entries.map((entry) => {
            const isActive = activeId === entry.id;
            return (
              <li
                key={entry.id}
                style={{ paddingLeft: entry.depth === 3 ? "1.25rem" : "0" }}
              >
                <a
                  href={`#${entry.id}`}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] leading-none transition-all",
                    isActive
                      ? "bg-accent/10 font-medium text-accent"
                      : "text-muted-foreground hover:bg-surface-muted hover:text-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 shrink-0 rounded-full transition-colors",
                      isActive ? "bg-accent" : "bg-foreground/15"
                    )}
                  />
                  {entry.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
