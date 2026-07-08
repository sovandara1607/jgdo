import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { CheckoutForm } from "./checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

type Period = "monthly" | "yearly";

function parsePeriod(value: string | string[] | undefined): Period | null {
  if (value === "monthly" || value === "yearly") return value;
  return null;
}

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const period = parsePeriod((await searchParams).period);
  if (!period) notFound();

  return (
    <section className="pb-24 pt-16 sm:pt-20">
      <Container className="mx-auto max-w-md text-center">
        <CheckoutForm period={period} />
      </Container>
    </section>
  );
}
