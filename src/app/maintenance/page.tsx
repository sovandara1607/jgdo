import type { Metadata } from "next";
import { Wrench } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Down for maintenance",
  description: `${siteConfig.name} is briefly down for maintenance. Back shortly.`,
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <section className="flex min-h-[80vh] items-center pb-24 pt-16 sm:pt-20">
      <Container className="mx-auto max-w-md text-center">
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="mx-auto mt-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-muted text-foreground">
          <Wrench className="h-6 w-6" strokeWidth={2} />
        </div>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
          Down for maintenance
        </h1>
        <p className="mt-2 text-muted-foreground">
          We&apos;re making some quick improvements. {siteConfig.name} will be back shortly —
          thanks for your patience.
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          Something urgent?{" "}
          <a
            href={`mailto:${siteConfig.links.supportEmail}`}
            className="font-medium text-foreground underline underline-offset-4"
          >
            {siteConfig.links.supportEmail}
          </a>
        </p>
      </Container>
    </section>
  );
}
