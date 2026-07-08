import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Payment successful",
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  return (
    <section className="pb-24 pt-16 sm:pt-20">
      <Container className="mx-auto max-w-md text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
        <h1 className="mt-4 text-2xl font-semibold text-foreground">Payment received</h1>
        <p className="mt-2 text-muted-foreground">
          Thanks for upgrading to Pro! We&apos;ll email your license details to the address you
          paid with shortly. If it doesn&apos;t arrive within a few minutes, reach out at{" "}
          <a href={`mailto:${siteConfig.links.supportEmail}`} className="underline">
            {siteConfig.links.supportEmail}
          </a>
          .
        </p>
        <Button href="/download" className="mt-6">
          Download JgDo
        </Button>
      </Container>
    </section>
  );
}
