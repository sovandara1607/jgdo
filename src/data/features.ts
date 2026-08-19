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
    slug: "window-parking",
    title: "Window parking",
    description:
      "Tuck a window out of the way into its own named, searchable list — different from minimize, and it comes back exactly where it was.",
    benefits: [
      "Captures the window's frame, display, and app identity before it's parked",
      "Restores to the right spot even if a monitor reconnects in between",
      "Give a parked window a name so you can find it later",
    ],
    icon: "ParkingSquare",
    category: "windows",
  },
  {
    slug: "always-on-top",
    title: "Always-on-top pinning",
    description:
      "Pin any window so it floats above everything else, even while you work in other apps.",
    benefits: [
      "Keep a reference doc, video call, or timer visible no matter what's focused",
      "Unpin the same way — one shortcut, no digging through menus",
      "Works on any app's window, not just JgDo's own panels",
    ],
    icon: "Pin",
    category: "windows",
  },
  {
    slug: "snap-groups",
    title: "Snap groups",
    description:
      "Capture the windows you have arranged right now as a named group, then move, resize, or minimize them together as one unit.",
    benefits: [
      "You decide what belongs in a group — no automatic or AI grouping",
      "Grouped windows carry a small badge wherever Window Search shows them",
      "Move, resize, minimize, hide, or close the whole group in one action",
    ],
    icon: "Group",
    category: "windows",
  },
  {
    slug: "layout-presets",
    title: "Layout presets",
    description:
      "Save the shape of your current window arrangement and reapply it later — to whatever apps happen to be open at the time.",
    benefits: [
      "Captures fractional geometry, not specific apps, so it fits any day's window set",
      "Reapply a saved shape in one shortcut instead of rebuilding it by hand",
      "Complements Workspaces for when you want the layout, not the exact apps",
    ],
    icon: "LayoutPanelTop",
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
      "Reaches into open browser tabs, not just top-level windows",
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
      "Copied screenshots are OCR'd automatically, so the text inside is searchable too",
      "Skips password managers and other sensitive clipboard content",
    ],
    icon: "ClipboardList",
    category: "productivity",
  },
  {
    slug: "scratchpad",
    title: "Scratchpad",
    description:
      "A tiny persistent notes panel, one shortcut away, for jotting something down without switching to a notes app.",
    benefits: [
      "Auto-saves on every keystroke — nothing to save or lose",
      "Same frosted, floating panel as the rest of JgDo",
      "Always there, always in the same place",
    ],
    icon: "StickyNote",
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
    slug: "focus-mode",
    title: "Focus mode",
    description:
      "Hide every other app in one shortcut, leaving only the one you're working in — then bring them all back exactly the same way.",
    benefits: [
      "Toggle on to hide everything but the frontmost app",
      "Toggle off to unhide exactly the apps this session hid",
      "No per-window state to manage — it's just the apps you were already using",
    ],
    icon: "Focus",
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
  {
    slug: "battery-alerts",
    title: "Low-battery alerts",
    description:
      "An always-on, event-driven watcher fires a real notification when your battery drops below a threshold you set — no popover has to be open.",
    benefits: [
      "Reacts to power-source changes directly, not a polling loop",
      "Fires exactly once per discharge cycle, not a repeating nag",
      "Threshold is yours to configure",
    ],
    icon: "BatteryWarning",
    category: "system",
  },
  {
    slug: "storage-breakdown",
    title: "Storage breakdown",
    description:
      "See what's actually taking up space in your home folder — Applications, Desktop, Documents, and the other usual culprits — on demand, in seconds.",
    benefits: [
      "Scans a handful of common folders concurrently, not your whole disk",
      "Runs only when you ask, never automatically in the background",
      "A faster, lighter alternative to macOS's own Storage pane for a quick check",
    ],
    icon: "HardDrive",
    category: "system",
  },
  {
    slug: "settings-backup",
    title: "Settings backup",
    description:
      "Export every shortcut and preference to a portable file, and restore it on this Mac or a new one in a click.",
    benefits: [
      "Covers shortcuts and behavior settings — not license state or clipboard data",
      "Old backups still import cleanly even after new settings are added",
      "Moving to a new Mac keeps your exact setup",
    ],
    icon: "DatabaseBackup",
    category: "system",
  },
];

export const featureCategories = [
  { id: "windows", label: "Window management" },
  { id: "productivity", label: "Productivity" },
  { id: "focus", label: "Focus & insights" },
  { id: "system", label: "System" },
] as const;
