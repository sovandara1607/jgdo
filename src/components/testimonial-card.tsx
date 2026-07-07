import { Star } from "lucide-react";
import { StaggerItem } from "@/components/ui/reveal";
import type { Testimonial } from "@/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <StaggerItem className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < testimonial.rating
                ? "fill-accent text-accent"
                : "fill-transparent text-border"
            }`}
          />
        ))}
      </div>
      <p className="mt-4 flex-1 text-[15px] leading-6 text-foreground/90">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
          {testimonial.avatarInitials}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
    </StaggerItem>
  );
}
