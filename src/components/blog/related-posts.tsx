"use client";

import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { StaggerGroup, StaggerItem } from "@/components/ui/reveal";
import { formatDate } from "@/lib/utils";
import type { BlogPostMeta } from "@/types";

export function RelatedPosts({ posts }: { posts: BlogPostMeta[] }) {
  return (
    <div>
      <h2 className="text-xl font-semibold tracking-tight text-foreground">
        Continue reading
      </h2>
      <StaggerGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <StaggerItem key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-5 transition-all hover:border-accent/40 hover:shadow-sm"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="rounded-full bg-accent-soft px-2.5 py-1 font-medium text-accent">
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readingTime}
                </span>
              </div>
              <h3 className="mt-3 text-sm font-semibold text-foreground transition-colors group-hover:text-accent line-clamp-2">
                {post.title}
              </h3>
              <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-5 text-muted-foreground">
                {post.description}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>{post.author}</span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}
