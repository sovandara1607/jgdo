"use client";

import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { StaggerItem } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { BlogPostMeta } from "@/types";

function AuthorAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft text-[11px] font-semibold text-accent">
      {initials}
    </div>
  );
}

export function BlogCard({
  post,
  featured = false,
}: {
  post: BlogPostMeta;
  featured?: boolean;
}) {
  if (featured) {
    return (
      <StaggerItem>
        <Link
          href={`/blog/${post.slug}`}
          className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent/40 hover:shadow-md sm:p-8"
        >
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full bg-accent-soft px-2.5 py-1 font-medium text-accent">
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readingTime}
            </span>
            <span>&middot;</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-3xl">
            {post.title}
          </h2>
          <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground sm:text-base">
            {post.description}
          </p>
          {post.tags.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <Badge key={tag} className="text-[11px]">
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}
          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <AuthorAvatar name={post.author} />
              <div>
                <p className="text-sm font-medium text-foreground">{post.author}</p>
                {post.authorRole ? (
                  <p className="text-xs text-muted-foreground">{post.authorRole}</p>
                ) : null}
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
              Read
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </Link>
      </StaggerItem>
    );
  }

  return (
    <StaggerItem>
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-5 transition-all hover:border-accent/40 hover:shadow-sm"
      >
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-accent-soft px-2.5 py-1 font-medium text-accent">
            {post.category}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingTime}
          </span>
        </div>
        <h3 className="mt-3 text-base font-semibold text-foreground transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-muted-foreground">
          {post.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AuthorAvatar name={post.author} />
            <div>
              <p className="text-xs font-medium text-foreground">{post.author}</p>
              <time dateTime={post.date} className="text-[11px] text-muted-foreground">
                {formatDate(post.date)}
              </time>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
        </div>
      </Link>
    </StaggerItem>
  );
}
