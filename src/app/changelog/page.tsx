import type { Metadata } from "next";
import { ReleaseNotesCard } from "@/components/release-notes-card";
import { Container } from "@/components/ui/container";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/reveal";
import { releases } from "@/data/changelog";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Changelog",
  description: `Every ${siteConfig.name} release, in reverse chronological order — new features, improvements, and fixes.`,
  alternates: { canonical: "/changelog" },
};

export default function ChangelogPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-16 sm:pt-20">
        <Container className="text-center">
          <Reveal>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Changelog
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Every release, straight from the source. Currently on v{releases[0].version}.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <StaggerGroup className="mx-auto max-w-3xl space-y-4">
            {releases.map((release, i) => (
              <StaggerItem key={release.version}>
                <ReleaseNotesCard release={release} showChecksum defaultOpen={i === 0} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>
    </>
  );
}
