import type { Feature } from "@/types";

export const features: Feature[] = [
  {
    slug: "window-snapping",
    title: "Instant window snapping",
    description:
      "Ten built-in layouts and edge-to-edge snapping put any window exactly where you want it, without touching the mouse.",
    benefits: [
      "Halves, thirds, corners, and full-screen presets out of the box",
      "Cycle the same shortcut through multiple sizes — 50%, 66%, 33%",
      "Ghost preview shows the target rect before you commit",
    ],
    icon: "LayoutGrid",
    category: "windows",
  },
  {
    slug: "drag-to-snap",
    title: "⌘-drag to snap anywhere",
    description:
      "Hold ⌘ while dragging a window and JgDo finds the available space around your other windows — no grid required.",
    benefits: [
      "Works with any window arrangement, not just fixed halves",
      "A searchable picker lets you target a specific window to snap beside",
      "Smooth, spring-animated preview tracks your cursor in real time",
    ],
    icon: "MousePointer2",
    category: "windows",
  },
  {
    slug: "adjacent-resize",
    title: "⌘-resize pushes neighbors",
    description:
      "Resize one window and its neighbors resize with it, so your layout stays tidy instead of overlapping.",
    benefits: [
      "Detects edge-adjacent windows automatically",
      "Keeps a sensible minimum size for every window involved",
      "Feels like resizing panes in a tiling window manager",
    ],
    icon: "PanelsTopLeft",
    category: "windows",
  },
  {
    slug: "dual-tiling",
    title: "Dual-app tiling",
    description:
      "One shortcut snaps your active window and automatically tiles the next window beside it.",
    benefits: [
      "Instant side-by-side setup for any two apps",
      "Built-in multi-window layouts for coding, writing, and research",
      "No manual dragging required for common pairings",
    ],
    icon: "Columns2",
    category: "windows",
  },
  {
    slug: "app-switcher",
    title: "App switcher HUD",
    description:
      "A searchable, on-screen switcher (⌥Space) replaces blind ⌘-Tab cycling with something you can actually see.",
    benefits: [
      "Type to filter instead of cycling one app at a time",
      "Arrow keys and Enter for fully keyboard-driven navigation",
      "Picking an app can snap it side-by-side automatically",
    ],
    icon: "AppWindow",
    category: "productivity",
  },
  {
    slug: "command-palette",
    title: "Command Palette",
    description:
      "A Raycast-style palette (⌘⌥Space) for jumping to any window across every open app, with live thumbnails.",
    benefits: [
      "Fuzzy search across every window, not just app names",
      "Live thumbnails so you recognize windows at a glance",
      "The active app expands inline while others stay tucked away",
    ],
    icon: "Command",
    category: "productivity",
  },
  {
    slug: "clipboard-manager",
    title: "Clipboard manager",
    description:
      "JgDo quietly keeps a searchable history of everything you copy — text, images, and files — so nothing gets lost.",
    benefits: [
      "Pin favorites so they never age out",
      "Paste-in-place returns focus to your previous app automatically",
      "Skips password managers and other sensitive clipboard content",
    ],
    icon: "ClipboardList",
    category: "productivity",
  },
  {
    slug: "workspaces",
    title: "Workspaces",
    description:
      "Save your entire window arrangement and restore it later, even if the apps aren't running yet.",
    benefits: [
      "One shortcut captures every visible window's app and position",
      "Restoring launches any missing apps and places them automatically",
      "Perfect for switching between projects or work and focus modes",
    ],
    icon: "LayoutTemplate",
    category: "productivity",
  },
  {
    slug: "workflow-insights",
    title: "Workflow insights",
    description:
      "A quiet \"Focus Today\" view shows where your time actually goes and which apps you bounce between most.",
    benefits: [
      "Per-app time tracking for the current day",
      "Surfaces your most common app-switch pairing",
      "All data stays on your Mac",
    ],
    icon: "BarChart3",
    category: "focus",
  },
  {
    slug: "cleaning-mode",
    title: "Keyboard cleaning mode",
    description:
      "Lock your keyboard behind a countdown overlay so you can wipe it down without triggering a cascade of shortcuts.",
    benefits: [
      "A visible countdown ring on every display",
      "Unlocks on countdown end, a mouse click, or a safety shortcut",
      "Configurable duration from 15 seconds to 5 minutes",
    ],
    icon: "Sparkles",
    category: "system",
  },
  {
    slug: "monitor-controls",
    title: "Volume & brightness controls",
    description:
      "Adjust volume, mute, and display brightness right from the menu bar popover — no function keys required.",
    benefits: [
      "Works across multiple displays",
      "Gracefully hides brightness controls on monitors that don't support it",
      "One place for the controls you reach for most",
    ],
    icon: "SunMedium",
    category: "system",
  },
  {
    slug: "custom-shortcuts",
    title: "Fully remappable shortcuts",
    description:
      "Every action in JgDo — snapping, switching, clipboard, palette — can be rebound to the keys you actually want.",
    benefits: [
      "Built-in conflict detection while recording a new shortcut",
      "Reset a single shortcut or everything back to defaults",
      "No shortcut is hard-coded",
    ],
    icon: "Keyboard",
    category: "system",
  },
];

export const featureCategories = [
  { id: "windows", label: "Window management" },
  { id: "productivity", label: "Productivity" },
  { id: "focus", label: "Focus & insights" },
  { id: "system", label: "System" },
] as const;
