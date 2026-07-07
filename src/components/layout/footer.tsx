import Link from "next/link";
import { DiscordIcon, GithubIcon, XIcon } from "@/components/icons/brand-icons";
import { Logo } from "@/components/logo";
import { NewsletterForm } from "@/components/newsletter-form";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/data/site";

const socials = [
  { label: "GitHub", href: siteConfig.links.github, icon: GithubIcon },
  { label: "Discord", href: siteConfig.links.discord, icon: DiscordIcon },
  { label: "Twitter / X", href: siteConfig.links.twitter, icon: XIcon },
];

const navGroups = [
  { title: "Product", items: siteConfig.footerNav.product },
  { title: "Resources", items: siteConfig.footerNav.resources },
  { title: "Company", items: siteConfig.footerNav.company },
  { title: "Legal", items: siteConfig.footerNav.legal },
];

export function Footer() {
  return (
    <footer className="mt-32 bg-foreground text-background">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-sm">
            <Logo inverted />
            <p className="mt-4 text-sm leading-6 text-background/60">
              {siteConfig.description}
            </p>
            <p className="mt-6 text-sm font-medium">Get product updates, not spam.</p>
            <NewsletterForm className="mt-3" inverted />
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-background/25 text-background/70 transition-colors hover:border-background hover:text-background"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {navGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold">{group.title}</h3>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-background/60 transition-colors hover:text-background"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-background/15 pt-8 text-xs text-background/50 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Built for macOS. Crafted with care.</p>
        </div>
      </Container>

      <div aria-hidden className="overflow-hidden border-t border-background/10 py-4">
        <p className="select-none whitespace-nowrap text-center text-[9rem] font-semibold leading-none tracking-tight text-transparent [-webkit-text-stroke:1px_var(--color-background)] opacity-20 sm:text-[12rem]">
          {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
