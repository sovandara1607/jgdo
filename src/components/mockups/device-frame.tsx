import { cn } from "@/lib/utils";

export function DeviceFrame({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)]",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface-muted px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        {title ? (
          <span className="ml-2 truncate text-xs font-medium text-muted-foreground">
            {title}
          </span>
        ) : null}
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
