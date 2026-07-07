import { AppWindow } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";

export function Logo({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-semibold",
        inverted ? "text-background" : "text-foreground",
        className
      )}
    >
      <span
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-lg",
          inverted ? "bg-background text-foreground" : "bg-foreground text-background"
        )}
      >
        <AppWindow className="h-4 w-4" strokeWidth={2.4} />
      </span>
      <span className="text-[17px] tracking-tight">{siteConfig.name}</span>
    </span>
  );
}
