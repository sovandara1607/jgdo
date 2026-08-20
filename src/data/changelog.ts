import type { AppRelease } from "@/types";

/**
 * Single source of truth for releases. The Download and Changelog pages both
 * read from this file, so shipping a new build means updating one array.
 * `assets[].sha256` is the real digest of the file in `public/downloads/` —
 * regenerate it (`shasum -a 256 <file>`) any time that file changes.
 */
export const releases: AppRelease[] = [
  {
    version: "0.1.11",
    date: "2026-08-20",
    latest: true,
    highlights: [
      "The menu bar icon now shows the actual JgDo logo instead of a generic system symbol",
      "Pick any image as your menu bar icon, with an optional monochrome mode that matches the system look",
    ],
    features: [
      "Settings → General → Menu Bar: choose any image to replace the menu bar icon",
      "Optional monochrome/template rendering so a custom icon adapts to light and dark menu bars",
    ],
    improvements: [
      "Custom menu bar icons are copied into Application Support so they keep working even if the source file is moved or deleted",
    ],
    fixes: [],
    assets: [
      {
        platform: "macos",
        label: "macOS",
        arch: "Apple Silicon",
        fileName: "JgDo-v0.1.11.dmg",
        href: "https://github.com/sovandara1607/jgdo-app/releases/download/v0.1.11/JgDo-v0.1.11.dmg",
        sizeMb: 3.15,
        sha256: "92745bb033662ac92790c28acd1fa3bc257396e710b82367339ff7041eb4ddc0",
      },
    ],
  },
  {
    version: "0.1.10",
    date: "2026-08-19",
    latest: false,
    highlights: [
      "Window parking, snap groups, and layout presets for organizing and restoring window arrangements",
      "Focus mode, low-battery alerts, and a storage breakdown tile",
      "Clipboard OCR and browser-tab search, plus a scratchpad and settings backup/restore",
    ],
    features: [
      "Window parking: tuck a window into a named, searchable list and restore it to its captured frame later",
      "Always-on-top pinning for any app's window",
      "Snap groups: capture the current on-screen windows as a named group and move/resize/minimize/hide/close them together",
      "Layout presets: save the shape of the current window arrangement and reapply it later",
      "Focus mode: hide every other app in one shortcut, restore on toggle",
      "Low-battery alerts, independent of whether a JgDo panel is open",
      "Browser-tab search (via AXTabs) feeding into Window Search",
      "Clipboard OCR: auto-extract text from copied images",
      "Storage breakdown: on-demand disk usage by common home folders",
      "Settings backup: export/import shortcuts and preferences",
      "Scratchpad: a tiny persistent notes panel",
    ],
    improvements: [],
    fixes: [
      "The DMG only contained JgDo.app with no Applications shortcut to drag onto, so the standard drag-to-install gesture silently did nothing",
    ],
    assets: [
      {
        platform: "macos",
        label: "macOS",
        arch: "Apple Silicon",
        fileName: "JgDo-v0.1.10.dmg",
        href: "https://github.com/sovandara1607/jgdo-app/releases/download/v0.1.10/JgDo-v0.1.10.dmg",
        sizeMb: 3.15,
        sha256: "b2b0e4c6fdbad2b07d9f31b5538fb1fb99072bfa57a1300745a3f7eba76f099c",
      },
    ],
  },
  {
    version: "0.1.9",
    date: "2026-08-18",
    latest: false,
    highlights: [
      "JgDo now requires a Pro or Pro+ license key to activate — no free tier",
      "Redesigned status popover: icon toolbar, colorful per-metric stat cards, live sparkline graphs",
    ],
    features: [
      "Activation window shown at first launch and from the menu bar until a license key is entered",
      "Settings → License tab for viewing status and deactivating a key",
      "Live sparkline graphs for CPU, Memory, and Disk in the status popover",
    ],
    improvements: [
      "Status popover redesigned around a System Settings-style icon toolbar instead of a tab bar",
      "Per-metric mini stat cards (CPU/Memory/Disk) with distinct colors for at-a-glance scanning",
    ],
    fixes: [],
    assets: [
      {
        platform: "macos",
        label: "macOS",
        arch: "Apple Silicon",
        fileName: "JgDo-v0.1.9.dmg",
        href: "https://github.com/sovandara1607/jgdo-app/releases/download/v0.1.9/JgDo-v0.1.9.dmg",
        sizeMb: 2.78,
        sha256: "d7cefcf769bc25e088edc1927dbf203a3a11ec3d31a03b21f465cb2c8820d0e8",
      },
    ],
  },
  {
    version: "0.1.8",
    date: "2026-08-18",
    latest: false,
    highlights: [
      "Multi-monitor fix: window operations on secondary displays no longer affect other screens",
      "Redesigned status popover with elevated dashboard style and dark mode support",
      "Automated release pipeline with Sparkle auto-updates",
    ],
    features: [
      "Pill-style tab bar in status popover for easier navigation",
      "Rounded rectangle background (16px) with subtle stroke and dark mode support",
      "Wider popover frame (320px) with enhanced header and accent colors",
      "GitHub Actions CI/CD for automated builds and releases",
    ],
    improvements: [
      "Fixed AppKit ↔ CG coordinate conversion to use the correct screen's frame for each window",
      "Status popover now uses .thinMaterial background for better visual hierarchy",
      "Improved tab animation with spring timing",
    ],
    fixes: [
      "Fixed multi-monitor coordinate conversion across 6 files: WindowManagerService, WindowDragController, WindowResizeService, WorkspaceService, LayoutPreset, DragTargetPickerOverlay",
      "Fixed window positioning on secondary monitors",
      "Fixed workspace save/restore across multiple displays",
      "Fixed snap preview overlay positioning on non-primary screens",
    ],
    assets: [
      {
        platform: "macos",
        label: "macOS",
        arch: "Apple Silicon",
        fileName: "JgDo-v0.1.8.dmg",
        href: "https://github.com/sovandara1607/jgdo-app/releases/download/v0.1.8/JgDo-v0.1.8.dmg",
        sizeMb: 2.68,
        sha256: "7ca569911e99e877585d57cbedb7cd498b6551fbc7f729b094a53fea5c1e8637",
      },
    ],
  },
  {
    version: "0.1.1",
    date: "2026-07-07",
    latest: false,
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
          "cdeea19825d6101c83ca7882eedbaa5444c5edabdded2712f9a509fa30b2fe1a",
      },
    ],
  },
];

export const latestRelease = releases.find((r) => r.latest) ?? releases[0];
