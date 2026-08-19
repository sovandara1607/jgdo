export type DocCategory = "getting-started" | "windows" | "productivity";

export interface DocItem {
  slug: string;
  title: string;
  description: string;
  category: DocCategory;
  href: string;
  icon: string;
  badge?: string;
}

export const docCategories: { id: DocCategory; label: string; description: string }[] = [
  {
    id: "getting-started",
    label: "Getting started",
    description: "Install JgDo, grant permissions, and get productive in minutes.",
  },
  {
    id: "windows",
    label: "Window management",
    description: "Snap, drag, resize, and tile windows like a pro.",
  },
  {
    id: "productivity",
    label: "Productivity",
    description: "Switch apps, jump to windows, manage your clipboard, and save workspaces.",
  },
];

export const docs: DocItem[] = [
  // Getting started
  {
    slug: "installation",
    title: "Installation & setup",
    description: "Download, install, and grant the permissions JgDo needs to manage your windows.",
    category: "getting-started",
    href: "/download",
    icon: "Download",
  },
  {
    slug: "system-requirements",
    title: "System requirements",
    description: "Supported macOS versions, hardware requirements, and permission details.",
    category: "getting-started",
    href: "/download#system-requirements",
    icon: "Monitor",
  },
  {
    slug: "first-shortcuts",
    title: "Your first shortcuts",
    description: "The default keyboard shortcuts you'll use every day, plus how to remap them.",
    category: "getting-started",
    href: "/features",
    icon: "Keyboard",
    badge: "Popular",
  },

  // Window management
  {
    slug: "window-snapping",
    title: "Window snapping shortcuts",
    description:
      "The handful of shortcuts that cover almost every layout you'll ever need, plus the cycling trick most people miss.",
    category: "windows",
    href: "/features#window-snapping",
    icon: "LayoutGrid",
  },
  {
    slug: "drag-to-snap",
    title: "⌘-drag to snap anywhere",
    description:
      "Hold ⌘ while dragging a window and JgDo finds the available space — no grid required.",
    category: "windows",
    href: "/features#drag-to-snap",
    icon: "MousePointer2",
  },
  {
    slug: "adjacent-resize",
    title: "Resize with neighbors",
    description:
      "Resize one window and its neighbors resize with it, so your layout stays tidy instead of overlapping.",
    category: "windows",
    href: "/features#adjacent-resize",
    icon: "PanelsTopLeft",
  },
  {
    slug: "dual-tiling",
    title: "Dual-app tiling",
    description:
      "One shortcut snaps your active window and automatically tiles the next window beside it.",
    category: "windows",
    href: "/features#dual-tiling",
    icon: "Columns2",
  },

  // Productivity
  {
    slug: "command-palette",
    title: "Command Palette",
    description:
      "A Spotlight-style, window-level switcher with live thumbnails — jump to any window across every open app in under a second.",
    category: "productivity",
    href: "/features#command-palette",
    icon: "Command",
  },
  {
    slug: "clipboard-manager",
    title: "Clipboard manager",
    description:
      "JgDo quietly keeps a searchable history of everything you copy — text, images, and files — so nothing gets lost.",
    category: "productivity",
    href: "/features#clipboard-manager",
    icon: "ClipboardList",
  },
  {
    slug: "workspaces",
    title: "Workspaces",
    description:
      "Save every visible window's app and position, then restore the entire arrangement later — including launching whatever isn't already running.",
    category: "productivity",
    href: "/features#workspaces",
    icon: "LayoutTemplate",
  },
  {
    slug: "app-switcher",
    title: "App switcher HUD",
    description:
      "A searchable, on-screen switcher (⌥Space) replaces blind ⌘-Tab cycling with something you can actually see.",
    category: "productivity",
    href: "/features#app-switcher",
    icon: "AppWindow",
  },
  {
    slug: "workflow-insights",
    title: "Workflow insights",
    description:
      'A quiet "Focus Today" view shows where your time actually goes and which apps you bounce between most.',
    category: "productivity",
    href: "/features#workflow-insights",
    icon: "BarChart3",
  },
];
