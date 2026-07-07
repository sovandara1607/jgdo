"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { StaggerGroup, StaggerItem } from "@/components/ui/reveal";
import { formatDate, cn } from "@/lib/utils";
import type { BlogPostMeta } from "@/types";

export function BlogList({
  posts,
  categories,
}: {
  posts: BlogPostMeta[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = category === "All" || post.category === category;
      const haystack = `${post.title} ${post.description} ${post.tags.join(" ")}`.toLowerCase();
      const matchesQuery = haystack.includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [posts, query, category]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                category === c
                  ? "border-accent bg-accent-soft text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            className="h-10 w-full rounded-full border border-border bg-surface pl-10 pr-4 text-sm outline-none focus:border-accent"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-sm text-muted-foreground">
          No posts match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <StaggerItem key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full bg-accent-soft px-2.5 py-1 font-medium text-accent">
                    {post.category}
                  </span>
                  <span>&middot;</span>
                  <span>{post.readingTime}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">
                  {post.description}
                </p>
                <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{post.author}</span>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      )}
    </div>
  );
}
