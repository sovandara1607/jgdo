import type { PlatformAvailability } from "@/types";

export const platformAvailability: PlatformAvailability[] = [
  {
    platform: "macos",
    label: "macOS",
    available: true,
    minVersion: "macOS 14 Sonoma or later",
  },
  {
    platform: "windows",
    label: "Windows",
    available: false,
    note: "On the roadmap — join Discord for updates",
  },
  {
    platform: "linux",
    label: "Linux",
    available: false,
    note: "On the roadmap — join Discord for updates",
  },
];

export const systemRequirements = [
  "macOS 14 Sonoma or later (Apple Silicon or Intel)",
  "4 GB RAM minimum, 8 GB recommended",
  "50 MB free disk space",
  "Accessibility permission (for window management)",
  "Screen Recording permission (optional, for window thumbnails)",
];

export const installSteps = [
  {
    title: "Download the .dmg and open it",
    description: "Grab the latest build using the button above, then double-click the .dmg to mount it.",
  },
  {
    title: "Drag JgDo.app to Applications",
    description: "Standard macOS install — no installer script involved.",
  },
  {
    title: "Launch JgDo from Applications",
    description:
      "The app is signed with a Developer ID certificate and notarized by Apple, so Gatekeeper will allow it without warnings.",
  },
  {
    title: "Grant Accessibility access when prompted",
    description:
      "System Settings → Privacy & Security → Accessibility → enable JgDo. This is required for window snapping and focus.",
  },
  {
    title: "(Optional) Enable Launch at Login",
    description:
      "Open the menu bar popover → Settings → enable 'Launch at Login' for auto-start on boot.",
  },
];
