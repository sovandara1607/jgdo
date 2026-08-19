"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StaggerGroup, StaggerItem } from "@/components/ui/reveal";
import { pricingTiers } from "@/data/pricing";
import { cn } from "@/lib/utils";

export function PricingCards() {
  return (
    <StaggerGroup className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
      {pricingTiers.map((tier) => {
        const priceLabel = tier.price === 0 ? "$0" : `$${tier.price.toFixed(2)}`;

        return (
          <StaggerItem
            key={tier.id}
            className={cn(
              "relative flex flex-col overflow-hidden rounded-3xl border p-8 transition-colors",
              tier.highlighted
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-surface hover:border-foreground/30"
            )}
          >
            {/* Same soft blue glow as the global body background, just
                dialed up slightly so it still reads against a dark card. */}
            {tier.highlighted ? (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(96,165,250,0.3), transparent 70%)",
                }}
              />
            ) : null}

            {tier.badge ? (
              <span
                className={cn(
                  "relative mb-5 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold",
                  tier.highlighted
                    ? "bg-background text-foreground"
                    : "bg-accent-soft text-foreground"
                )}
              >
                {tier.badge}
              </span>
            ) : null}

            <h3 className="relative text-lg font-semibold">{tier.name}</h3>
            <p
              className={cn(
                "relative mt-1 text-sm",
                tier.highlighted ? "text-background/70" : "text-muted-foreground"
              )}
            >
              {tier.description}
            </p>

            <div className="relative mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-semibold tracking-tight">{priceLabel}</span>
              {tier.price > 0 ? (
                <span
                  className={cn(
                    "text-sm",
                    tier.highlighted ? "text-background/60" : "text-muted-foreground"
                  )}
                >
                  one-time
                </span>
              ) : null}
            </div>

            <Button
              href={tier.href}
              variant={tier.highlighted ? "primary" : "secondary"}
              inverted={tier.highlighted}
              className="relative mt-6 w-full"
            >
              {tier.cta}
            </Button>

            <p
              className={cn(
                "relative mt-6 text-xs font-semibold uppercase tracking-wider",
                tier.highlighted ? "text-background/50" : "text-muted-foreground"
              )}
            >
              What&rsquo;s included
            </p>
            <ul className="relative mt-3 space-y-3">
              {tier.features.map((feature) => (
                <li
                  key={feature}
                  className={cn(
                    "flex gap-2.5 text-sm",
                    tier.highlighted ? "text-background/85" : "text-foreground/85"
                  )}
                >
                  <Check
                    className={cn(
                      "mt-0.5 h-4 w-4 shrink-0",
                      tier.highlighted ? "text-background" : "text-accent"
                    )}
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </StaggerItem>
        );
      })}
    </StaggerGroup>
  );
}
