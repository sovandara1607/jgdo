import { FeatureCard } from "@/components/feature-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup } from "@/components/ui/reveal";
import { features } from "@/data/features";

export function FeatureHighlights() {
  const highlighted = features.slice(0, 6);

  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Everything you need"
          title="One menu bar app, a dozen habits fixed"
          description="JgDo replaces window dragging, blind ⌘-Tab cycling, and a scattered clipboard with a handful of shortcuts you'll actually remember."
        />
        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {highlighted.map((feature) => (
            <FeatureCard key={feature.slug} feature={feature} />
          ))}
        </StaggerGroup>
        <div className="mt-12 flex justify-center">
          <Button href="/features" variant="secondary" size="lg">
            See every feature
          </Button>
        </div>
      </Container>
    </section>
  );
}
