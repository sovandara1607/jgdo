"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ClipboardGalleryMockup,
  PaletteGalleryMockup,
  SnapGalleryMockup,
  WorkspacesGalleryMockup,
} from "@/components/mockups/gallery-mockups";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: "snapping",
    label: "Window Snapping",
    caption: "Ten built-in layouts, plus ⌘-drag to snap into any available space.",
    Mockup: SnapGalleryMockup,
  },
  {
    id: "palette",
    label: "Command Palette",
    caption: "Fuzzy search every window across every app, with live thumbnails.",
    Mockup: PaletteGalleryMockup,
  },
  {
    id: "clipboard",
    label: "Clipboard History",
    caption: "Text, images, and files — searchable, pinnable, pasted right back in place.",
    Mockup: ClipboardGalleryMockup,
  },
  {
    id: "workspaces",
    label: "Workspaces",
    caption: "Save a whole arrangement and restore it, launching missing apps for you.",
    Mockup: WorkspacesGalleryMockup,
  },
];

export function ScreenshotGallery() {
  const [index, setIndex] = useState(0);
  const active = slides[index];

  return (
    <div>
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <active.Mockup />
            <p className="mt-5 text-center text-muted-foreground">{active.caption}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => setIndex(i)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              i === index
                ? "border-accent bg-accent-soft text-foreground"
                : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            {slide.label}
          </button>
        ))}
      </div>
    </div>
  );
}
