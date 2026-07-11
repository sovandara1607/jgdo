import { JgdoIcon } from "@/components/icons/jgdo-icon";
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
      <JgdoIcon className="h-7 w-7 rounded-lg" />
      <span className="text-[17px] tracking-tight">{siteConfig.name}</span>
    </span>
  );
}
