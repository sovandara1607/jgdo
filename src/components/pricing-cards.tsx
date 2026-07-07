"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StaggerGroup, StaggerItem } from "@/components/ui/reveal";
import { pricingTiers } from "@/data/pricing";
import { cn } from "@/lib/utils";

export function PricingCards() {
  const [yearly, setYearly] = useState(true);

  return (
    <div>
      <div className="mx-auto flex w-fit items-center gap-1 rounded-full border border-border bg-surface-muted p-1">
        {(["monthly", "yearly"] as const).map((period) => (
          <button
            key={period}
            onClick={() => setYearly(period === "yearly")}
            className={cn(
              "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
              (period === "yearly") === yearly
                ? "bg-surface text-foreground shadow-sm"
                : "text-muted-foreground"
            )}
          >
            {period === "monthly" ? "Monthly" : "Yearly"}
            {period === "yearly" ? (
              <span className="ml-1.5 rounded-full bg-accent-soft px-1.5 py-0.5 text-[10px] font-semibold text-accent">
                -33%
              </span>
            ) : null}
          </button>
        ))}
      </div>

      <StaggerGroup className="mt-10 grid gap-6 lg:grid-cols-3">
        {pricingTiers.map((tier) => {
          const price = yearly ? tier.price.yearly : tier.price.monthly;
          const priceLabel =
            price === "custom" ? "Custom" : price === 0 ? "$0" : `$${price}`;
          const period = price === "custom" || price === 0 ? "" : yearly ? "/yr" : "/mo";

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
                <span className="text-sm text-muted-foreground">{period}</span>
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
    </div>
  );
}
