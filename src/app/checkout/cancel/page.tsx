import type { Metadata } from "next";
import { XCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Payment cancelled",
  robots: { index: false, follow: false },
};

export default function CheckoutCancelPage() {
  return (
    <section className="pb-24 pt-16 sm:pt-20">
      <Container className="mx-auto max-w-md text-center">
        <XCircle className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-semibold text-foreground">Payment cancelled</h1>
        <p className="mt-2 text-muted-foreground">
          No charge was made. You can try again whenever you&apos;re ready.
        </p>
        <Button href="/pricing" className="mt-6">
          Back to pricing
        </Button>
      </Container>
    </section>
  );
}
