import type { PricingFeatureRow, PricingTier } from "@/types";

export const pricingTiers: PricingTier[] = [
  {
    id: "pro",
    name: "Pro",
    price: 1.99,
    description: "Everything you need to stop fighting with window placement. One-time purchase.",
    cta: "Get Pro",
    href: "/checkout?plan=pro",
    highlighted: true,
    features: [
      "Window snapping (10 built-in layouts)",
      "⌘-drag to snap into available space",
      "App switcher HUD (⌥Space)",
      "Command Palette with live window thumbnails",
      "Unlimited clipboard history + pinning",
      "Unlimited saved workspaces",
      "Workflow insights (Focus Today)",
      "Adjacent-window resize",
      "Priority email support",
    ],
  },
  {
    id: "pro-plus",
    name: "Pro+",
    price: 2.5,
    description: "Everything in Pro, plus a little extra to back development.",
    cta: "Get Pro+",
    href: "/checkout?plan=pro-plus",
    features: [
      "Everything in Pro",
      "Lifetime free updates",
      "Early access to new features",
      "Name in the app's supporter credits",
      "Directly funds indie development",
    ],
  },
];

export const pricingComparison: PricingFeatureRow[] = [
  { label: "Window snapping & layouts", pro: true, proPlus: true },
  { label: "⌘-drag snap & adjacent resize", pro: true, proPlus: true },
  { label: "App switcher HUD", pro: true, proPlus: true },
  { label: "Command Palette with thumbnails", pro: true, proPlus: true },
  { label: "Clipboard history", pro: "Unlimited", proPlus: "Unlimited" },
  { label: "Saved workspaces", pro: "Unlimited", proPlus: "Unlimited" },
  { label: "Workflow insights", pro: true, proPlus: true },
  { label: "Custom shortcuts", pro: true, proPlus: true },
  { label: "Lifetime free updates", pro: false, proPlus: true },
  { label: "Early access to new features", pro: false, proPlus: true },
  { label: "Support", pro: "Priority email", proPlus: "Priority email" },
];
