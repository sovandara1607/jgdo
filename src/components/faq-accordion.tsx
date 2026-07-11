"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { FAQItem } from "@/types";
import { cn } from "@/lib/utils";

export function FAQAccordion({
  items,
  className,
}: {
  items: FAQItem[];
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div className={cn("divide-y divide-border rounded-2xl border border-border bg-surface", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => {
                if (isAnimating) return;
                setIsAnimating(true);
                setOpenIndex(isOpen ? null : index);
              }}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-[15px] font-medium text-foreground">
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-muted text-foreground"
              >
                <Plus className="h-3.5 w-3.5" />
              </motion.span>
            </button>
            <AnimatePresence initial={false} onExitComplete={() => setIsAnimating(false)}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                  onAnimationComplete={() => setIsAnimating(false)}
                >
                  <p className="px-6 pb-5 text-sm leading-6 text-muted-foreground">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
