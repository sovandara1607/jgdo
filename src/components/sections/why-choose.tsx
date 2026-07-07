import { Check, X } from "lucide-react";
import { AnimatedCounter } from "@/components/animated-counter";
import { Container } from "@/components/ui/container";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  display?: string;
}

const stats: Stat[] = [
  { value: 12000, suffix: "+", label: "active users" },
  { value: 4.9, label: "average rating", display: "4.9" },
  { value: 3, suffix: "M+", label: "windows snapped / month" },
  { value: 1, prefix: "<", suffix: "%", label: "idle CPU usage" },
];

const comparison = [
  { label: "Arrange windows", before: "Drag every edge by hand", after: "One shortcut, every time" },
  { label: "Find a window", before: "Blind ⌘-Tab cycling", after: "Search with live thumbnails" },
  { label: "Reuse a setup", before: "Rebuild it from scratch", after: "Restore a saved workspace" },
  { label: "Old clipboard items", before: "Gone the moment you copy again", after: "Searchable history, pinned favorites" },
];

export function WhyChoose() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Why JgDo"
          title="Built for how multitasking actually feels"
          description="Not another Mission Control clone — JgDo is the layer that was missing between you and a dozen open windows."
        />

        <StaggerGroup className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.label} className="text-center">
              <p className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {stat.display ?? (
                  <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                )}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-16 overflow-hidden rounded-3xl border border-border">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr]">
            <div className="hidden bg-surface-muted p-6 sm:block" />
            <div className="border-b border-border bg-surface-muted p-6 text-sm font-semibold text-muted-foreground sm:border-b-0 sm:border-l">
              Without JgDo
            </div>
            <div className="border-l border-t border-border bg-accent-soft p-6 text-sm font-semibold text-foreground sm:border-t-0">
              With JgDo
            </div>
            {comparison.map((row) => (
              <div key={row.label} className="contents">
                <div className="border-t border-border p-6 text-sm font-medium text-foreground">
                  {row.label}
                </div>
                <div className="flex items-start gap-2 border-t border-border p-6 text-sm text-muted-foreground sm:border-l">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400/80" />
                  {row.before}
                </div>
                <div className="flex items-start gap-2 border-l border-t border-border bg-accent-soft/40 p-6 text-sm text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {row.after}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
