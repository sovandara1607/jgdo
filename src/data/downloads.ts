import type { PlatformAvailability } from "@/types";

export const platformAvailability: PlatformAvailability[] = [
  {
    platform: "macos",
    label: "macOS",
    available: true,
    minVersion: "macOS 27 (beta) — Apple Silicon",
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
  "macOS 27 beta or later, Apple Silicon only (Intel build not available yet)",
  "4 GB RAM minimum, 8 GB recommended",
  "50 MB free disk space",
  "Accessibility permission (for window management)",
  "Screen Recording permission (optional, for Command Palette thumbnails)",
];

export const installSteps = [
  {
    title: "Download the .zip and unzip it",
    description: "Grab the latest build using the button above, then double-click the .zip to extract JgDo.app.",
  },
  {
    title: "Drag JgDo.app to Applications",
    description: "Standard macOS install — no installer script involved.",
  },
  {
    title: "Right-click JgDo and choose Open",
    description:
      "This build is ad-hoc signed (not yet notarized with a paid Developer ID), so Gatekeeper will warn about an unidentified developer on first launch. Right-click → Open (or System Settings → Privacy & Security → \"Open Anyway\") bypasses that one-time warning.",
  },
  {
    title: "Grant Accessibility access when prompted",
    description:
      "System Settings → Privacy & Security → Accessibility → enable JgDo. This is required for window snapping and focus.",
  },
  {
    title: "(Optional) Grant Screen Recording access",
    description:
      "Only needed the first time you open the Command Palette, for live window thumbnails.",
  },
];
