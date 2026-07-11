import { useId, type SVGProps } from "react";

/**
 * Full-color app icon mark from the JgDo logo/icon system: a dark tile
 * with two "window pane" outlines and one accent pane snapped into the
 * top-right corner. Self-contained (own background), so it doesn't need
 * a wrapping box the way a plain glyph would.
 */
export function JgdoIcon(props: SVGProps<SVGSVGElement>) {
  const id = useId();
  const bg = `${id}-bg`;
  const glow = `${id}-glow`;
  const sheen = `${id}-sheen`;
  const accent = `${id}-accent`;

  return (
    <svg viewBox="0 0 100 100" {...props}>
      <defs>
        <linearGradient id={accent} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFA24D" />
          <stop offset="100%" stopColor="#FF5B1E" />
        </linearGradient>
        <linearGradient id={bg} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#26282f" />
          <stop offset="100%" stopColor="#131417" />
        </linearGradient>
        <linearGradient id={sheen} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={glow} cx="78%" cy="30%" r="45%">
          <stop offset="0%" stopColor="#FF7A2E" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FF7A2E" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="1" y="1" width="98" height="98" rx="22" fill={`url(#${bg})`} />
      <rect x="1" y="1" width="98" height="98" rx="22" fill={`url(#${glow})`} />
      <rect
        x="1.5"
        y="1.5"
        width="97"
        height="97"
        rx="21.5"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.08"
      />

      {/* left tall pane */}
      <rect
        x="10"
        y="10"
        width="49"
        height="80"
        rx="9"
        fill="#ffffff"
        fillOpacity="0.055"
        stroke="#ffffff"
        strokeOpacity="0.14"
        strokeWidth="1.2"
      />
      <rect x="10" y="10" width="49" height="18" rx="9" fill="#ffffff" fillOpacity="0.05" />

      {/* bottom-right pane */}
      <rect
        x="63"
        y="52"
        width="27"
        height="38"
        rx="8"
        fill="#ffffff"
        fillOpacity="0.055"
        stroke="#ffffff"
        strokeOpacity="0.14"
        strokeWidth="1.2"
      />

      {/* top-right accent pane (the active snap) */}
      <rect x="63" y="10" width="27" height="36" rx="8" fill={`url(#${accent})`} />
      <rect x="63" y="10" width="27" height="14" rx="8" fill="#ffffff" fillOpacity="0.18" />
      <rect
        x="63"
        y="10"
        width="27"
        height="36"
        rx="8"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.18"
      />

      <rect x="1" y="1" width="98" height="98" rx="22" fill={`url(#${sheen})`} />
    </svg>
  );
}

/**
 * Monochrome, `currentColor`-driven glyph version of the JgDo mark, for
 * small inline use (e.g. inside a themed square) where the full-color
 * tile's own background would clash with the surrounding surface.
 */
export function JgdoGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="none" {...props}>
      <rect x="10" y="10" width="49" height="80" rx="9" stroke="currentColor" strokeOpacity="0.9" strokeWidth="6" />
      <rect x="63" y="52" width="27" height="38" rx="8" stroke="currentColor" strokeOpacity="0.9" strokeWidth="6" />
      <rect x="63" y="10" width="27" height="36" rx="8" fill="currentColor" />
    </svg>
  );
}
