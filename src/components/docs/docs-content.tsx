"use client";

import { useMemo, useState } from "react";
import {
  Download,
  LayoutGrid,
  MousePointer2,
  PanelsTopLeft,
  Columns2,
  Command,
  ClipboardList,
  LayoutTemplate,
  AppWindow,
  BarChart3,
  Code2,
  Keyboard,
  Monitor,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { SearchInput } from "@/components/docs/search-input";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { docs, docCategories, type DocItem } from "@/data/docs";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  Download,
  LayoutGrid,
  MousePointer2,
  PanelsTopLeft,
  Columns2,
  Command,
  ClipboardList,
  LayoutTemplate,
  AppWindow,
  BarChart3,
  Code2,
  Keyboard,
  Monitor,
};

function DocCard({ doc }: { doc: DocItem }) {
  const Icon = iconMap[doc.icon] ?? Download;
  const isExternal = doc.href.startsWith("http");

  return (
    <StaggerItem>
      <a
        href={doc.href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-5 transition-all hover:border-accent/40 hover:shadow-sm"
      >
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </div>
          {doc.badge ? (
            <Badge className="bg-accent-soft text-accent border-accent/20">
              {doc.badge}
            </Badge>
          ) : null}
        </div>
        <h3 className="mt-3 font-semibold text-foreground group-hover:text-accent transition-colors">
          {doc.title}
        </h3>
        <p className="mt-1.5 text-sm leading-6 text-muted-foreground line-clamp-2">
          {doc.description}
        </p>
        <span className="mt-auto pt-3 inline-flex items-center gap-1 text-xs font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
          Read more
          <ArrowRight className="h-3 w-3" />
        </span>
      </a>
    </StaggerItem>
  );
}

export function DocsContent() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredDocs = useMemo(() => {
    const q = query.toLowerCase().trim();
    return docs.filter((doc) => {
      const matchesCategory = activeCategory === "all" || doc.category === activeCategory;
      const matchesQuery =
        !q ||
        doc.title.toLowerCase().includes(q) ||
        doc.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  const groupedDocs = useMemo(() => {
    return docCategories
      .map((cat) => ({
        ...cat,
        items: filteredDocs.filter((d) => d.category === cat.id),
      }))
      .filter((group) => group.items.length > 0);
  }, [filteredDocs]);

  return (
    <>
      <section className="relative overflow-hidden pb-12 pt-16 sm:pt-20">
        <Container className="text-center">
          <Reveal>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Documentation
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Everything you need to get the most out of JgDo — from installation to advanced workflows.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mx-auto mt-8 max-w-lg">
            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder="Search documentation..."
            />
          </Reveal>
        </Container>
      </section>

      <section className="pb-8">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setActiveCategory("all")}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  activeCategory === "all"
                    ? "bg-accent text-accent-foreground"
                    : "bg-surface-muted text-muted-foreground hover:text-foreground"
                )}
              >
                All
              </button>
              {docCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                    activeCategory === cat.id
                      ? "bg-accent text-accent-foreground"
                      : "bg-surface-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          {filteredDocs.length === 0 ? (
            <Reveal className="py-16 text-center">
              <p className="text-muted-foreground">
                No results found for &ldquo;{query}&rdquo;. Try a different search term.
              </p>
            </Reveal>
          ) : (
            groupedDocs.map((group) => (
              <div key={group.id} className="mb-16 last:mb-0">
                <Reveal>
                  <div className="mb-2">
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                      {group.label}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {group.description}
                    </p>
                  </div>
                </Reveal>
                <StaggerGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((doc) => (
                    <DocCard key={doc.slug} doc={doc} />
                  ))}
                </StaggerGroup>
              </div>
            ))
          )}
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <Reveal>
            <div className="rounded-2xl border border-border bg-surface p-8 text-center">
              <h2 className="text-xl font-semibold text-foreground">
                Can&rsquo;t find what you&rsquo;re looking for?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Check the full feature list or reach out on Discord.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="/features"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-muted px-5 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/40"
                >
                  All features
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://discord.gg/jgdo"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
                >
                  Ask on Discord
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
