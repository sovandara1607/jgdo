import type { Metadata } from "next";
import { FaqSection } from "@/components/sections/faq-section";
import { PricingCards } from "@/components/pricing-cards";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { pricingFaqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple pricing for JgDo: Pro for power users, and Pro+ to back development — both one-time purchases, no subscription.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-16 sm:pt-20">
        <Container className="text-center">
          <Reveal>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Simple pricing, <span className="emphasis">no surprises</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              A one-time purchase unlocks the full app — no free tier, no subscription. Pick Pro or Pro+ below.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <PricingCards />
        </Container>
      </section>

      <FaqSection items={pricingFaqs} eyebrow="Pricing FAQ" title="Common questions" />
    </>
  );
}
