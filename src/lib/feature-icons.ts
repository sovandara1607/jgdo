import {
  AppWindow,
  BarChart3,
  ClipboardList,
  Columns2,
  Command,
  Keyboard,
  LayoutGrid,
  LayoutTemplate,
  MousePointer2,
  PanelsTopLeft,
  Sparkles,
  SunMedium,
  type LucideIcon,
} from "lucide-react";

/**
 * Explicit icon map (rather than `import * as Icons`) so bundlers only
 * include the handful of icons features.ts actually references.
 */
export const featureIconMap: Record<string, LucideIcon> = {
  LayoutGrid,
  MousePointer2,
  PanelsTopLeft,
  Columns2,
  AppWindow,
  Command,
  ClipboardList,
  LayoutTemplate,
  BarChart3,
  Sparkles,
  SunMedium,
  Keyboard,
};
