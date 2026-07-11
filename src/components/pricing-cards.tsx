"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StaggerGroup, StaggerItem } from "@/components/ui/reveal";
import { pricingTiers } from "@/data/pricing";
import { cn } from "@/lib/utils";

export function PricingCards() {
  return (
    <StaggerGroup className="grid gap-6 lg:grid-cols-3">
      {pricingTiers.map((tier) => {
        const priceLabel = tier.price === 0 ? "$0" : `$${tier.price.toFixed(2)}`;

        return (
          <StaggerItem
            key={tier.id}
            className={cn(
              "relative flex flex-col rounded-3xl border p-8",
              tier.highlighted
                ? "border-2 border-foreground bg-surface"
                : "border-border bg-surface"
            )}
          >
            {tier.highlighted ? (
              <span className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                Most popular
              </span>
            ) : null}
            <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{tier.description}</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-semibold tracking-tight text-foreground">
                {priceLabel}
              </span>
              {tier.price > 0 ? (
                <span className="text-sm text-muted-foreground">one-time</span>
              ) : null}
            </div>
            <Button
              href={tier.href}
              variant={tier.highlighted ? "primary" : "secondary"}
              className="mt-6 w-full"
            >
              {tier.cta}
            </Button>
            <ul className="mt-8 space-y-3">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-2.5 text-sm text-foreground/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
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
