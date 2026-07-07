import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { DownloadCard } from "@/components/download-card";
import { PlatformBadges } from "@/components/platform-badges";
import { ReleaseNotesCard } from "@/components/release-notes-card";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { installSteps, systemRequirements } from "@/data/downloads";
import { latestRelease, releases } from "@/data/changelog";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Download",
  description: `Download ${siteConfig.name} ${latestRelease.version} for macOS. Free to start, with checksums, release notes, and previous versions.`,
  alternates: { canonical: "/download" },
};

export default function DownloadPage() {
  const previousReleases = releases.filter((r) => !r.latest);

  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-16 sm:pt-20">
        <Container className="text-center">
          <Reveal>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Download <span className="emphasis">{siteConfig.name}</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Free to install in under a minute. Upgrade to Pro any time from inside the app.
            </p>
            <div className="mt-6 flex justify-center">
              <PlatformBadges />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <DownloadCard release={latestRelease} />
          </Reveal>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading align="left" title="System requirements" className="ml-0 text-left" />
            <ul className="mt-6 space-y-3">
              {systemRequirements.map((req) => (
                <li key={req} className="flex gap-3 text-sm text-foreground/85">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {req}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeading align="left" title="Installation" className="ml-0 text-left" />
            <ol className="mt-6 space-y-5">
              {installSteps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{step.title}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading
            eyebrow={`v${latestRelease.version}`}
            title="Release notes"
            description="What shipped in the latest version, plus the checksum to verify your download."
          />
          <div className="mx-auto mt-10 max-w-3xl">
            <ReleaseNotesCard release={latestRelease} showChecksum />
          </div>
        </Container>
      </section>

      {previousReleases.length > 0 ? (
        <section className="py-16">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading align="left" title="Previous versions" className="ml-0 text-left" />
              <Link
                href="/changelog"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
              >
                Full changelog
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <StaggerGroup className="mx-auto mt-10 max-w-3xl space-y-4">
              {previousReleases.map((release) => (
                <StaggerItem key={release.version}>
                  <ReleaseNotesCard release={release} showChecksum defaultOpen={false} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Container>
        </section>
      ) : null}
    </>
  );
}
