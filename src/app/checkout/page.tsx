import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { CheckoutForm } from "./checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

type Plan = "pro" | "pro-plus";

function parsePlan(value: string | string[] | undefined): Plan | null {
  if (value === "pro" || value === "pro-plus") return value;
  return null;
}

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const plan = parsePlan((await searchParams).plan);
  if (!plan) notFound();

  return (
    <section className="pb-24 pt-16 sm:pt-20">
      <Container className="mx-auto max-w-md text-center">
        <CheckoutForm plan={plan} />
      </Container>
    </section>
  );
}
