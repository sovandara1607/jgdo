import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/data/site";

export function FounderNoteSection() {
  return (
    <section className="py-24">
      <Container className="max-w-2xl">
        <Reveal className="rounded-3xl border border-border bg-surface p-8 text-center sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Why I built this
          </p>
          <p className="mt-6 text-lg leading-8 text-foreground/90 sm:text-xl">
            I&apos;m a CS student who always ends up with a dozen windows open — an editor, a
            terminal, browser tabs for research, Figma for whatever I&apos;m designing that week. I
            got tired of dragging windows into place by hand and switching apps blind with
            ⌘-Tab, so I built the tool I actually wanted: the snapping of Magnet, the searchable
            switching of Raycast, and the quiet menu-bar presence of OneMenu, combined into one
            small app.
          </p>
          <p className="mt-4 text-lg leading-8 text-foreground/90 sm:text-xl">
            JgDo is what I use every day now. It&apos;s brand new — just launched — so if you run
            into rough edges, that&apos;s on me, not you.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
              SR
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">Sovandara Rith</p>
              <p className="text-xs text-muted-foreground">Creator of {siteConfig.name}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
