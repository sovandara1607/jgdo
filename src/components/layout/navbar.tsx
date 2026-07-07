"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Close the mobile menu on route change (pathname is an external signal from the router).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-border py-3" : "border-b border-transparent py-5"
      )}
    >
      <div className={cn("absolute inset-0 -z-10 transition-opacity", scrolled ? "glass opacity-100" : "opacity-0")} />
      <Container className="flex items-center justify-between">
        <Link href="/" aria-label={`${siteConfig.name} home`}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-muted",
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeSwitcher />
          <Button href="/download" size="md">
            Download free
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeSwitcher />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="glass overflow-hidden md:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-surface-muted hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <Button href="/download" className="mt-2 w-full">
                Download free
              </Button>
            </Container>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
