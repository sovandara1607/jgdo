"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 90 });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest).toLocaleString()}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
