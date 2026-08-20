export const siteConfig = {
  name: "JgDo",
  tagline: "Your windows, finally organized.",
  description:
    "JgDo is a macOS menu bar app that snaps windows into place, switches apps instantly, and remembers your workspaces — so multitasking stops feeling like busywork.",
  url: "https://jgdo.sovandara.lol",
  currentVersion: "0.1.10",
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
    github: "https://github.com/sovandara1607/jgdo-app",
    email: "rithsovandara83@gmail.com",
    supportEmail: "rithsovandara83@gmail.com",
  },
  nav: [
    { label: "Features", href: "/features" },
    { label: "Docs", href: "/docs" },
    { label: "Pricing", href: "/pricing" },
    { label: "Changelog", href: "/changelog" },
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
      { label: "Support", href: "/support" },
      { label: "Documentation", href: "/docs" },
      { label: "GitHub", href: "https://github.com/sovandara1607/jgdo-app" },
      { label: "Contact", href: "/support#contact" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
