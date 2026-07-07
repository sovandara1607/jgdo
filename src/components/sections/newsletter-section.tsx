import { Mail } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function NewsletterSection() {
  return (
    <section className="py-24">
      <Container className="max-w-2xl text-center">
        <Reveal className="flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
            <Mail className="h-5 w-5" />
          </div>
          <h2 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Get new features before everyone else
          </h2>
          <p className="mt-3 max-w-md text-muted-foreground">
            One email a month. Release notes, workflow tips, and the occasional early beta invite.
          </p>
          <NewsletterForm className="relative mt-8 justify-center" />
        </Reveal>
      </Container>
    </section>
  );
}
