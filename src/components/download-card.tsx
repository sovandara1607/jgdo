import { Download } from "lucide-react";
import { GithubIcon } from "@/components/icons/brand-icons";
import { JgdoIcon } from "@/components/icons/jgdo-icon";
import { Button } from "@/components/ui/button";
import { CopyCommandRow } from "@/components/copy-command-row";
import { siteConfig } from "@/data/site";
import { formatBytes, formatDate } from "@/lib/utils";
import type { AppRelease } from "@/types";

export function DownloadCard({ release }: { release: AppRelease }) {
  const asset = release.assets[0];
  const githubReleaseUrl = `${siteConfig.links.github}/releases/download/v${release.version}/${asset.fileName}`;

  return (
    <div className="rounded-3xl border border-border bg-surface p-8 sm:p-10">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <JgdoIcon className="h-14 w-14 rounded-2xl" />
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
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={asset.href} size="lg" icon={<Download className="h-4 w-4" />}>
            Download {asset.fileName}
          </Button>
          <Button
            href={githubReleaseUrl}
            variant="secondary"
            size="lg"
            icon={<GithubIcon className="h-4 w-4" />}
          >
            Download from GitHub
          </Button>
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-6">
        <p className="text-xs font-medium text-muted-foreground">Or install via Homebrew</p>
        <CopyCommandRow
          className="mt-2"
          command="brew tap sovandara1607/jgdo && brew install --cask jgdo"
        />
      </div>
    </div>
  );
}
