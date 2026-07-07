import { Apple, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes, formatDate } from "@/lib/utils";
import type { AppRelease } from "@/types";

export function DownloadCard({ release }: { release: AppRelease }) {
  const asset = release.assets[0];

  return (
    <div className="rounded-3xl border border-border bg-surface p-8 sm:p-10">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground text-background">
            <Apple className="h-7 w-7" fill="currentColor" />
          </div>
          <div>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent">
                Latest
              </span>
              Version {release.version} &middot; {formatDate(release.date)}
            </p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              {asset.label} &middot; {asset.arch}
            </p>
            <p className="text-sm text-muted-foreground">{formatBytes(asset.sizeMb)}</p>
          </div>
        </div>
        <Button href={asset.href} size="lg" icon={<Download className="h-4 w-4" />}>
          Download {asset.fileName}
        </Button>
      </div>
    </div>
  );
}
