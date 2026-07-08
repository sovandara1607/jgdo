import { CTABanner } from "@/components/cta-banner";
import { FaqSection } from "@/components/sections/faq-section";
import { FeatureHighlights } from "@/components/sections/feature-highlights";
import { FounderNoteSection } from "@/components/sections/founder-note-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { ScreenshotsSection } from "@/components/sections/screenshots-section";
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
      <FounderNoteSection />
      <FaqSection items={generalFaqs} />
      <NewsletterSection />
      <CTABanner />
    </>
  );
}
