import type { Metadata } from "next";
import { Book, LifeBuoy, Rocket, Settings } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { DiscordIcon, GithubIcon } from "@/components/icons/brand-icons";
import { FaqSection } from "@/components/sections/faq-section";
import { Container } from "@/components/ui/container";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { generalFaqs } from "@/data/faqs";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Support",
  description: "Documentation, FAQs, and ways to get in touch with the JgDo team.",
  alternates: { canonical: "/support" },
};

const docs = [
  {
    icon: Rocket,
    title: "Getting started",
    description: "Install JgDo, grant permissions, and learn the default shortcuts.",
    href: "/download",
  },
  {
    icon: Settings,
    title: "Shortcuts & customization",
    description: "Remap any action and resolve shortcut conflicts.",
    href: "/features",
  },
  {
    icon: Book,
    title: "Guides",
    description: "Deep dives on workspaces, the Command Palette, and more.",
    href: "/blog",
  },
];

export default function SupportPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-16 sm:pt-20">
        <Container className="text-center">
          <Reveal>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              How can we help?
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Browse the docs, ask the community, or reach the team directly.
            </p>
          </Reveal>
        </Container>
      </section>

      <section id="docs" className="scroll-mt-24 pb-24">
        <Container>
          <SectionHeading eyebrow="Documentation" title="Start here" />
          <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-3">
            {docs.map((doc) => (
              <StaggerItem key={doc.title}>
                <a
                  href={doc.href}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <doc.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{doc.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {doc.description}
                  </p>
                </a>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <SectionHeading eyebrow="Community" title="Ask the community" />
          <StaggerGroup className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-2">
            <StaggerItem>
              <a
                href={siteConfig.links.discord}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <DiscordIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Discord</p>
                  <p className="text-sm text-muted-foreground">Chat with the team & community</p>
                </div>
              </a>
            </StaggerItem>
            <StaggerItem>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <GithubIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">GitHub</p>
                  <p className="text-sm text-muted-foreground">Report bugs & request features</p>
                </div>
              </a>
            </StaggerItem>
          </StaggerGroup>
        </Container>
      </section>

      <FaqSection items={generalFaqs} />

      <section id="contact" className="scroll-mt-24 pb-24">
        <Container className="max-w-2xl">
          <SectionHeading
            eyebrow="Contact"
            title="Still stuck?"
            description="Send us a message — a human reads every one."
          />
          <Reveal className="mt-10 rounded-3xl border border-border bg-surface p-8">
            <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <LifeBuoy className="h-4 w-4 text-accent" />
              {siteConfig.links.supportEmail}
            </div>
            <ContactForm />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
