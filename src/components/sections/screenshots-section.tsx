import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function ScreenshotsSection() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="See it in action"
          title="A closer look at the everyday workflow"
          description="Four core surfaces, one shared design language."
        />
        <div className="mt-14">
          <ScreenshotGallery />
        </div>
      </Container>
    </section>
  );
}
