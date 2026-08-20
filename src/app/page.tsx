import { CTABanner } from "@/components/cta-banner";
import { FeatureHighlights } from "@/components/sections/feature-highlights";
import { FounderNoteSection } from "@/components/sections/founder-note-section";
import { ScreenshotsSection } from "@/components/sections/screenshots-section";
import { WhyChoose } from "@/components/sections/why-choose";
import { CinematicHero } from "@/components/ui/cinematic-landing-hero";

export default function Home() {
  return (
    <>
      <CinematicHero />
      <FeatureHighlights />
      <ScreenshotsSection />
      <WhyChoose />
      <FounderNoteSection />
      <CTABanner />
    </>
  );
}
