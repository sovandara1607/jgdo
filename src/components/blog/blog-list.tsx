"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { BlogCard } from "@/components/blog/blog-card";
import { NewsletterForm } from "@/components/blog/newsletter-form";
import { StaggerGroup } from "@/components/ui/reveal";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
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

  const featured = filtered[0];
  const rest = filtered.slice(1);

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
        <>
          {featured ? (
            <div className="mt-10">
              <BlogCard post={featured} featured />
            </div>
          ) : null}

          {rest.length > 0 ? (
            <StaggerGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </StaggerGroup>
          ) : null}
        </>
      )}

      <Reveal className="mt-20">
        <NewsletterForm />
      </Reveal>
    </div>
  );
}
