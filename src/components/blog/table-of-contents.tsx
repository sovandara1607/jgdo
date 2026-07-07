"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { TocEntry } from "@/lib/blog";

export function TableOfContents({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headings = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (observedEntries) => {
        const visible = observedEntries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-96px 0px -70% 0px" }
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="sticky top-24">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        On this page
      </p>
      <ul className="mt-3 space-y-2 border-l border-border">
        {entries.map((entry) => (
          <li key={entry.id} style={{ paddingLeft: entry.depth === 3 ? "1.5rem" : "1rem" }}>
            <a
              href={`#${entry.id}`}
              className={cn(
                "-ml-px block border-l pl-3 text-sm leading-6 transition-colors",
                activeId === entry.id
                  ? "border-accent font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
