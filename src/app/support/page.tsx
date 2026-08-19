import type { Metadata } from "next";
import { ArrowRight, LifeBuoy } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { GithubIcon } from "@/components/icons/brand-icons";
import { FaqSection } from "@/components/sections/faq-section";
import { Container } from "@/components/ui/container";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { generalFaqs } from "@/data/faqs";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Support",
  description: "FAQs, community links, and ways to get in touch with the JgDo team.",
  alternates: { canonical: "/support" },
};

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
              Browse the docs, report an issue on GitHub, or reach the team directly.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24">
        <Container className="max-w-2xl">
          <Reveal>
            <a
              href="/docs"
              className="group flex items-center justify-between rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40"
            >
              <div>
                <h2 className="font-semibold text-foreground">Documentation</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Installation, shortcuts, guides, and deep dives.
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
            </a>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <SectionHeading eyebrow="Community" title="Report bugs & request features" />
          <StaggerGroup className="mx-auto mt-12 grid max-w-md gap-5">
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
