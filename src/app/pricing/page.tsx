import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import { FaqSection } from "@/components/sections/faq-section";
import { PricingCards } from "@/components/pricing-cards";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { pricingComparison, pricingTiers } from "@/data/pricing";
import { pricingFaqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple pricing for JgDo: a generous Free tier, Pro for power users, and Enterprise for teams.",
  alternates: { canonical: "/pricing" },
};

function renderCell(value: string | boolean) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="mx-auto h-4 w-4 text-accent" />
    ) : (
      <X className="mx-auto h-4 w-4 text-border" />
    );
  }
  return <span>{value}</span>;
}

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
              Start free. Upgrade only when you&apos;re sure. Cancel any time from Settings.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <PricingCards />
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <SectionHeading eyebrow="Compare" title="Every plan, side by side" />
          <Reveal className="mt-12 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-muted text-left">
                  <th className="px-6 py-4 font-medium text-muted-foreground">Feature</th>
                  {pricingTiers.map((tier) => (
                    <th key={tier.id} className="px-6 py-4 text-center font-semibold text-foreground">
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pricingComparison.map((row) => (
                  <tr key={row.label} className="border-b border-border last:border-0">
                    <td className="px-6 py-4 text-foreground/85">{row.label}</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">
                      {renderCell(row.free)}
                    </td>
                    <td className="px-6 py-4 text-center text-muted-foreground">
                      {renderCell(row.pro)}
                    </td>
                    <td className="px-6 py-4 text-center text-muted-foreground">
                      {renderCell(row.enterprise)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </Container>
      </section>

      <FaqSection items={pricingFaqs} eyebrow="Pricing FAQ" title="Common questions" />
    </>
  );
}
