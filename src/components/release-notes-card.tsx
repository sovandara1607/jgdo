import { Bug, Sparkles, Wrench } from "lucide-react";
import { ChecksumRow } from "@/components/checksum-row";
import { formatBytes, formatDate } from "@/lib/utils";
import type { AppRelease } from "@/types";

const groups = [
  { key: "features" as const, label: "New", icon: Sparkles, color: "text-accent" },
  { key: "improvements" as const, label: "Improved", icon: Wrench, color: "text-sky-500" },
  { key: "fixes" as const, label: "Fixed", icon: Bug, color: "text-emerald-500" },
];

export function ReleaseNotesCard({
  release,
  showChecksum = false,
  defaultOpen = true,
}: {
  release: AppRelease;
  showChecksum?: boolean;
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-2xl border border-border bg-surface open:pb-6"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent">
            v{release.version}
          </span>
          {release.latest ? (
            <span className="rounded-full bg-foreground px-2.5 py-1 text-xs font-semibold text-background">
              Latest
            </span>
          ) : null}
          <span className="text-sm text-muted-foreground">{formatDate(release.date)}</span>
        </div>
        <span className="text-xs text-muted-foreground transition-transform group-open:rotate-180">
          &#9660;
        </span>
      </summary>

      <div className="space-y-6 px-6">
        {groups.map(({ key, label, icon: Icon, color }) => {
          const entries = release[key];
          if (!entries.length) return null;
          return (
            <div key={key}>
              <p className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide ${color}`}>
                <Icon className="h-3.5 w-3.5" />
                {label}
              </p>
              <ul className="mt-2.5 space-y-2">
                {entries.map((entry) => (
                  <li key={entry} className="text-sm leading-6 text-foreground/85">
                    {entry}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        {showChecksum
          ? release.assets.map((asset) => (
              <ChecksumRow
                key={asset.fileName}
                label={`${asset.fileName} (${formatBytes(asset.sizeMb)})`}
                sha256={asset.sha256}
              />
            ))
          : null}
      </div>
    </details>
  );
}
