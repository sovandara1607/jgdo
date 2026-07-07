import { siteConfig } from "@/data/site";

export const ogImageSize = { width: 1200, height: 630 };

export function OgImageContent() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
        padding: 80,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            display: "flex",
            width: 64,
            height: 64,
            borderRadius: 18,
            background: "#fafafa",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            color: "#0a0a0a",
            fontWeight: 700,
          }}
        >
          J
        </div>
        <span style={{ fontSize: 40, color: "#fafafa", fontWeight: 600 }}>
          {siteConfig.name}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 48,
          fontSize: 64,
          fontWeight: 600,
          color: "#fafafa",
          textAlign: "center",
          maxWidth: 900,
          lineHeight: 1.2,
        }}
      >
        {siteConfig.tagline}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 28,
          fontSize: 28,
          color: "#a1a1aa",
          textAlign: "center",
          maxWidth: 780,
        }}
      >
        The macOS menu bar app for window snapping, switching, and workspaces.
      </div>
    </div>
  );
}
