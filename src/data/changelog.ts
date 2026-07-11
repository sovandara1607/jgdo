import type { AppRelease } from "@/types";

/**
 * Single source of truth for releases. The Download and Changelog pages both
 * read from this file, so shipping a new build means updating one array.
 * `assets[].sha256` is the real digest of the file in `public/downloads/` —
 * regenerate it (`shasum -a 256 <file>`) any time that file changes.
 */
export const releases: AppRelease[] = [
  {
    version: "0.1.1",
    date: "2026-07-07",
    latest: true,
    highlights: [
      "First real build: window snapping, the Command Palette, clipboard manager, and workspaces all in one menu bar app",
      "Apple Silicon only for now — Intel and a notarized, Developer ID–signed build are on the way",
    ],
    features: [
      "Window snapping: 10 built-in layouts, ⌘-drag to snap into any available space, ⌘-resize to push neighboring windows",
      "App switcher HUD (⌥Space) and Command Palette (⌘⌥Space) with live window thumbnails",
      "Clipboard history with pin/favorite and paste-in-place",
      "Workspaces: save a window arrangement and restore it later, launching missing apps automatically",
      "Status popover: Overview / System / Workspace tabs with live CPU, memory, disk, and network",
      "Keyboard cleaning mode, volume/brightness controls, and fully remappable shortcuts",
    ],
    improvements: [],
    fixes: [],
    assets: [
      {
        platform: "macos",
        label: "macOS",
        arch: "Apple Silicon",
        fileName: "JgDo-0.1.1-arm64.dmg",
        href: "/downloads/JgDo-0.1.1-arm64.dmg",
        sizeMb: 1.26,
        sha256:
          "6e5eb7cad36e9f45ed43ad6d1f8afd493504336d8bf8f1fb004e2511fbb3da1f",
      },
    ],
  },
];

export const latestRelease = releases.find((r) => r.latest) ?? releases[0];
