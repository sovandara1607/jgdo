import type { Metadata } from "next";
import { DocsContent } from "@/components/docs/docs-content";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Everything you need to get the most out of JgDo — from installation to advanced workflows.",
  alternates: { canonical: "/docs" },
};

export default function DocsPage() {
  return <DocsContent />;
}
