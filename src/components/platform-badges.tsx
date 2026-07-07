import { AppWindow, MonitorSmartphone, Terminal } from "lucide-react";
import { platformAvailability } from "@/data/downloads";
import { cn } from "@/lib/utils";
import type { Platform } from "@/types";

const icons: Record<Platform, typeof AppWindow> = {
  macos: AppWindow,
  windows: MonitorSmartphone,
  linux: Terminal,
};

export function PlatformBadges({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {platformAvailability.map((platform) => {
        const Icon = icons[platform.platform];
        return (
          <div
            key={platform.platform}
            title={platform.note ?? platform.minVersion}
            className={cn(
              "flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium",
              platform.available
                ? "border-accent/30 bg-accent-soft text-foreground"
                : "border-border text-muted-foreground opacity-70"
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {platform.label}
            {!platform.available ? (
              <span className="text-[10px] uppercase tracking-wide">Soon</span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
