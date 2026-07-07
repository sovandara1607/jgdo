import { TestimonialCard } from "@/components/testimonial-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup } from "@/components/ui/reveal";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Loved by multitaskers"
          title="Don't take our word for it"
        />
        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
