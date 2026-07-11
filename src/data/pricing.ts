import type { PricingFeatureRow, PricingTier } from "@/types";

export const pricingTiers: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    description: "Everything you need to stop fighting with window placement.",
    cta: "Download for free",
    href: "/download",
    features: [
      "Window snapping (10 built-in layouts)",
      "⌘-drag to snap into available space",
      "App switcher HUD (⌥Space)",
      "Clipboard history (last 20 items)",
      "1 saved workspace",
      "Community Discord support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 1.99,
    description: "For anyone who lives in a dozen windows at once. One-time purchase.",
    cta: "Get Pro",
    href: "/checkout?plan=pro",
    highlighted: true,
    features: [
      "Everything in Free",
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
  { label: "Window snapping & layouts", free: true, pro: true, proPlus: true },
  { label: "⌘-drag snap & adjacent resize", free: "Snap only", pro: true, proPlus: true },
  { label: "App switcher HUD", free: true, pro: true, proPlus: true },
  { label: "Command Palette with thumbnails", free: false, pro: true, proPlus: true },
  { label: "Clipboard history", free: "20 items", pro: "Unlimited", proPlus: "Unlimited" },
  { label: "Saved workspaces", free: "1", pro: "Unlimited", proPlus: "Unlimited" },
  { label: "Workflow insights", free: false, pro: true, proPlus: true },
  { label: "Custom shortcuts", free: true, pro: true, proPlus: true },
  { label: "Lifetime free updates", free: false, pro: false, proPlus: true },
  { label: "Early access to new features", free: false, pro: false, proPlus: true },
  { label: "Support", free: "Community", pro: "Priority email", proPlus: "Priority email" },
];
