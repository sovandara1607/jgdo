export const siteConfig = {
  name: "JgDo",
  tagline: "Your windows, finally organized.",
  description:
    "JgDo is a macOS menu bar app that snaps windows into place, switches apps instantly, and remembers your workspaces — so multitasking stops feeling like busywork.",
  url: "https://jgdo.app",
  currentVersion: "1.0",
  keywords: [
    "window manager",
    "macOS window manager",
    "window snapping",
    "app switcher",
    "productivity app",
    "menu bar app",
    "clipboard manager",
    "workspace manager",
  ],
  links: {
    github: "https://github.com/jgdo-app/jgdo",
    discord: "https://discord.gg/jgdo",
    twitter: "https://twitter.com/jgdoapp",
    email: "hello@jgdo.app",
    supportEmail: "support@jgdo.app",
  },
  nav: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Changelog", href: "/changelog" },
    { label: "Blog", href: "/blog" },
    { label: "Support", href: "/support" },
  ],
  footerNav: {
    product: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Download", href: "/download" },
      { label: "Changelog", href: "/changelog" },
    ],
    resources: [
      { label: "Blog", href: "/blog" },
      { label: "Support", href: "/support" },
      { label: "Documentation", href: "/support#docs" },
      { label: "GitHub", href: "https://github.com/jgdo-app/jgdo" },
    ],
    company: [
      { label: "Contact", href: "/support#contact" },
      { label: "Discord", href: "https://discord.gg/jgdo" },
      { label: "Twitter / X", href: "https://twitter.com/jgdoapp" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
