import { CTABanner } from "@/components/cta-banner";
import { FaqSection } from "@/components/sections/faq-section";
import { FeatureHighlights } from "@/components/sections/feature-highlights";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { ScreenshotsSection } from "@/components/sections/screenshots-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { WhyChoose } from "@/components/sections/why-choose";
import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import { generalFaqs } from "@/data/faqs";

export default function Home() {
  return (
    <>
      <CinematicHero />
      <FeatureHighlights />
      <ScreenshotsSection />
      <WhyChoose />
      <TestimonialsSection />
      <FaqSection items={generalFaqs} />
      <NewsletterSection />
      <CTABanner />
    </>
  );
}
