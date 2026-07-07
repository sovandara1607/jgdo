import type { PricingFeatureRow, PricingTier } from "@/types";

export const pricingTiers: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    price: { monthly: 0, yearly: 0 },
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
    price: { monthly: 6, yearly: 48 },
    description: "For anyone who lives in a dozen windows at once.",
    cta: "Start 14-day trial",
    href: "/download",
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
    id: "enterprise",
    name: "Enterprise",
    price: { monthly: "custom", yearly: "custom" },
    description: "Centralized licensing and support for teams.",
    cta: "Contact sales",
    href: "/support#contact",
    features: [
      "Everything in Pro, for every seat",
      "Volume licensing & centralized billing",
      "MDM-friendly deployment & configuration profiles",
      "Priority onboarding for your team",
      "Dedicated Slack/Discord support channel",
    ],
  },
];

export const pricingComparison: PricingFeatureRow[] = [
  { label: "Window snapping & layouts", free: true, pro: true, enterprise: true },
  { label: "⌘-drag snap & adjacent resize", free: "Snap only", pro: true, enterprise: true },
  { label: "App switcher HUD", free: true, pro: true, enterprise: true },
  { label: "Command Palette with thumbnails", free: false, pro: true, enterprise: true },
  { label: "Clipboard history", free: "20 items", pro: "Unlimited", enterprise: "Unlimited" },
  { label: "Saved workspaces", free: "1", pro: "Unlimited", enterprise: "Unlimited" },
  { label: "Workflow insights", free: false, pro: true, enterprise: true },
  { label: "Custom shortcuts", free: true, pro: true, enterprise: true },
  { label: "Volume licensing", free: false, pro: false, enterprise: true },
  { label: "MDM deployment profiles", free: false, pro: false, enterprise: true },
  { label: "Support", free: "Community", pro: "Priority email", enterprise: "Dedicated channel" },
];
