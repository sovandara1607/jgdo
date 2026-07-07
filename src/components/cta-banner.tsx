import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function CTABanner({
  title = "Stop fighting with window placement.",
  description = "Free to start. Takes less than a minute to install.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Container>
      <Reveal className="rounded-3xl bg-foreground px-8 py-16 text-center text-background sm:px-16">
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-background/70">{description}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/download" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
            Download for free
          </Button>
          <Button href="/pricing" size="lg" variant="secondary" inverted>
            View pricing
          </Button>
        </div>
      </Reveal>
    </Container>
  );
}
