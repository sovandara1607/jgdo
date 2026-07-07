import type { FAQItem } from "@/types";

export const generalFaqs: FAQItem[] = [
  {
    question: "What is JgDo?",
    answer:
      "JgDo is a lightweight macOS menu bar app for window management: instant snapping, a searchable app switcher and command palette, a clipboard manager, and saved workspaces — all driven by shortcuts you control.",
  },
  {
    question: "Which macOS versions are supported?",
    answer:
      "The current build requires macOS 27 beta on Apple Silicon. It relies on very recent system APIs (like live window thumbnails via ScreenCaptureKit), so support for earlier macOS versions and Intel Macs isn't available yet.",
  },
  {
    question: "Does JgDo need Accessibility or Screen Recording permissions?",
    answer:
      "Yes. Accessibility access lets JgDo read and move windows on your behalf, and Screen Recording access powers live thumbnails in the Command Palette. JgDo only requests Screen Recording the first time you open the palette, and never uploads anything — all processing stays on your Mac.",
  },
  {
    question: "Is JgDo available for Windows or Linux?",
    answer:
      "Not yet. JgDo is built around macOS-specific APIs (Accessibility, ScreenCaptureKit) to keep window snapping fast and reliable. Windows and Linux support are on the roadmap — join the Discord to get notified.",
  },
  {
    question: "Will JgDo slow down my Mac?",
    answer:
      "No. JgDo is event-driven rather than polling in a busy loop, and expensive work like live thumbnails or system metrics only runs while its popover is actually open.",
  },
  {
    question: "Can I customize every shortcut?",
    answer:
      "Yes. Every action — snapping, switching, the palette, clipboard — can be rebound from Settings → Shortcuts, with built-in conflict detection.",
  },
];

export const pricingFaqs: FAQItem[] = [
  {
    question: "Can I try Pro before paying?",
    answer:
      "Yes. Every Pro feature is unlocked for 14 days after install, no credit card required. You'll drop back to the Free tier automatically if you don't upgrade.",
  },
  {
    question: "What happens to my data if I downgrade?",
    answer:
      "Nothing is deleted. Workspaces and clipboard history beyond the Free tier's limits are kept locally but paused until you upgrade again.",
  },
  {
    question: "Do you offer team or education discounts?",
    answer:
      "Yes — reach out at hello@jgdo.app with your team size or .edu email and we'll get you a discount code.",
  },
  {
    question: "Is there a one-time purchase option?",
    answer:
      "Pro is available as an annual subscription or a one-time lifetime license. The lifetime option is shown at checkout when you select Pro.",
  },
];
