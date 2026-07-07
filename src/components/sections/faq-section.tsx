import { FAQAccordion } from "@/components/faq-accordion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { FAQItem } from "@/types";

export function FaqSection({
  items,
  eyebrow = "FAQ",
  title = "Questions, answered",
}: {
  items: FAQItem[];
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section className="py-24">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="mt-12">
          <FAQAccordion items={items} />
        </div>
      </Container>
    </section>
  );
}
