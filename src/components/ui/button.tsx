"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  icon?: ReactNode;
  disabled?: boolean;
  external?: boolean;
  /** Use on a dark (bg-foreground) surface so borders/text stay visible. */
  inverted?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-foreground hover:opacity-90",
  secondary: "border border-border text-foreground hover:bg-surface-muted",
  ghost: "text-foreground/80 hover:text-foreground hover:bg-surface-muted",
};

const invertedVariantStyles: Record<ButtonVariant, string> = {
  primary: "bg-background text-foreground hover:opacity-90",
  secondary: "border border-background/30 text-background hover:bg-background/10",
  ghost: "text-background/80 hover:text-background hover:bg-background/10",
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "h-10 px-5 text-sm gap-2",
  lg: "h-12 px-7 text-[15px] gap-2.5",
};

export function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className,
  icon,
  disabled,
  external,
  inverted = false,
}: ButtonProps) {
  const classes = cn(
    "inline-flex select-none items-center justify-center whitespace-nowrap rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
    inverted ? invertedVariantStyles[variant] : variantStyles[variant],
    sizeStyles[size],
    className
  );

  const content = (
    <>
      {children}
      {icon}
    </>
  );

  const motionProps = {
    whileHover: disabled ? undefined : { scale: 1.02 },
    whileTap: disabled ? undefined : { scale: 0.97 },
    transition: { type: "spring" as const, stiffness: 400, damping: 25 },
  };

  if (href) {
    if (external || href.startsWith("http")) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noreferrer"
          className={classes}
          {...motionProps}
        >
          {content}
        </motion.a>
      );
    }
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link href={href} className={classes}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
