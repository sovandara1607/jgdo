import { Clock, Pin, Search, Star } from "lucide-react";
import { DeviceFrame } from "@/components/mockups/device-frame";

const panelBase = "h-[280px] bg-surface-muted p-4 sm:h-[320px]";

export function SnapGalleryMockup() {
  return (
    <DeviceFrame title="Window Snapping">
      <div className={panelBase}>
        <div className="grid h-full grid-cols-4 grid-rows-2 gap-2">
          <div className="col-span-2 row-span-2 rounded-lg bg-accent/20 ring-1 ring-accent/30" />
          <div className="col-span-2 row-span-1 rounded-lg bg-foreground/10" />
          <div className="col-span-1 row-span-1 rounded-lg bg-foreground/10" />
          <div className="col-span-1 row-span-1 rounded-lg bg-foreground/10" />
        </div>
      </div>
    </DeviceFrame>
  );
}

export function PaletteGalleryMockup() {
  const rows = [
    { name: "Figma", detail: "3 windows", active: true },
    { name: "Terminal", detail: "1 window", active: false },
    { name: "Notes", detail: "2 windows", active: false },
    { name: "Safari", detail: "5 windows", active: false },
  ];

  return (
    <DeviceFrame title="Command Palette">
      <div className={panelBase}>
        <div className="glass flex items-center gap-2 rounded-full px-3 py-2 text-xs text-muted-foreground">
          <Search className="h-3.5 w-3.5" />
          Search windows…
        </div>
        <div className="mt-3 space-y-1.5">
          {rows.map((row) => (
            <div
              key={row.name}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs ${
                row.active ? "bg-accent/15 ring-1 ring-accent/30" : "bg-foreground/[0.04]"
              }`}
            >
              <span className="font-medium text-foreground">{row.name}</span>
              <span className="text-muted-foreground">{row.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </DeviceFrame>
  );
}

export function ClipboardGalleryMockup() {
  const items = [
    { text: "https://jgdo.app/download", pinned: true },
    { text: "Q3 roadmap notes.pdf", pinned: false },
    { text: "npm run build --turbopack", pinned: false },
  ];

  return (
    <DeviceFrame title="Clipboard History">
      <div className={panelBase}>
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.text}
              className="flex items-center justify-between rounded-lg bg-foreground/[0.04] px-3 py-2.5 text-xs"
            >
              <span className="truncate font-mono text-foreground/80">{item.text}</span>
              {item.pinned ? (
                <Pin className="h-3.5 w-3.5 shrink-0 text-accent" />
              ) : (
                <Clock className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
      </div>
    </DeviceFrame>
  );
}

export function WorkspacesGalleryMockup() {
  const workspaces = [
    { name: "Deep Work", apps: 4 },
    { name: "Support Triage", apps: 3 },
    { name: "Client: Nova", apps: 5 },
  ];

  return (
    <DeviceFrame title="Workspaces">
      <div className={panelBase}>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {workspaces.map((ws, i) => (
            <div
              key={ws.name}
              className="rounded-xl border border-border bg-surface p-3"
            >
              <div className="flex items-center justify-between">
                <Star className={`h-3.5 w-3.5 ${i === 0 ? "text-accent" : "text-muted-foreground"}`} />
                <span className="text-[10px] text-muted-foreground">{ws.apps} apps</span>
              </div>
              <p className="mt-2 text-xs font-semibold text-foreground">{ws.name}</p>
              <div className="mt-3 grid grid-cols-2 gap-1">
                <div className="h-6 rounded bg-foreground/10" />
                <div className="h-6 rounded bg-foreground/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DeviceFrame>
  );
}
