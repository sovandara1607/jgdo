import { Check } from "lucide-react";
import { StaggerItem } from "@/components/ui/reveal";
import { featureIconMap } from "@/lib/feature-icons";
import type { Feature } from "@/types";
import { cn } from "@/lib/utils";

export function FeatureCard({
  feature,
  className,
}: {
  feature: Feature;
  className?: string;
}) {
  const Icon = featureIconMap[feature.icon] ?? featureIconMap.Sparkles;

  return (
    <StaggerItem
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-foreground/30",
        className
      )}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-muted text-foreground">
        <Icon className="h-5 w-5" strokeWidth={2} />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.description}</p>
      <ul className="mt-4 space-y-2">
        {feature.benefits.map((benefit) => (
          <li key={benefit} className="flex gap-2 text-sm text-muted-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </StaggerItem>
  );
}
