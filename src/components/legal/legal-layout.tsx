import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export interface LegalSection {
  id: string;
  title: string;
  body: ReactNode;
}

export function LegalLayout({
  eyebrow,
  title,
  effectiveDate,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  effectiveDate: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <section className="pb-24 pt-16 sm:pt-20">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
            {eyebrow}
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">Effective {effectiveDate}</p>
        </Reveal>

        <Reveal delay={0.05} className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-base leading-7 text-muted-foreground">{intro}</p>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-5xl gap-12 lg:grid-cols-[220px_1fr]">
          <nav aria-label="Table of contents" className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                On this page
              </p>
              <ol className="mt-4 space-y-2.5 border-l border-border pl-4 text-sm">
                {sections.map((section, i) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {i + 1}. {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="min-w-0 space-y-14">
            {sections.map((section, i) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  <span className="text-muted-foreground">{i + 1}.</span> {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-[15px] leading-7 text-foreground/80">
                  {section.body}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
