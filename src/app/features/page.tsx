import type { Metadata } from "next";
import { CTABanner } from "@/components/cta-banner";
import { FeatureCard } from "@/components/feature-card";
import { Container } from "@/components/ui/container";
import { Reveal, StaggerGroup } from "@/components/ui/reveal";
import { featureCategories, features } from "@/data/features";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Every JgDo feature: window snapping, drag-to-snap, the Command Palette, clipboard manager, workspaces, workflow insights, and more.",
  alternates: { canonical: "/features" },
};

export default function FeaturesPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-16 sm:pt-20">
        <Container className="text-center">
          <Reveal>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Every feature, <span className="emphasis">in one place</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              {siteConfig.name} is a collection of small, obvious ideas that add up to a genuinely
              faster way to work across windows.
            </p>
          </Reveal>
        </Container>
      </section>

      {featureCategories.map((category, index) => {
        const categoryFeatures = features.filter((f) => f.category === category.id);
        if (!categoryFeatures.length) return null;

        return (
          <section key={category.id} className={index === 0 ? "pb-20" : "py-20"}>
            <Container>
              <Reveal>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  {category.label}
                </h2>
              </Reveal>
              <StaggerGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {categoryFeatures.map((feature) => (
                  <FeatureCard key={feature.slug} feature={feature} />
                ))}
              </StaggerGroup>
            </Container>
          </section>
        );
      })}

      <CTABanner />
    </>
  );
}
