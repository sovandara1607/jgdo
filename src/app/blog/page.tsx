import type { Metadata } from "next";
import { BlogList } from "@/components/blog/blog-list";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { getAllCategories, getAllPosts, toPostMeta } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Product updates, guides, and engineering notes from the JgDo team.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts().map(toPostMeta);
  const categories = getAllCategories();

  return (
    <>
      <section className="relative overflow-hidden pb-12 pt-16 sm:pt-20">
        <Container className="text-center">
          <Reveal>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              The JgDo blog
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Product updates, workflow guides, and the occasional engineering deep dive.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <BlogList posts={posts} categories={categories} />
        </Container>
      </section>
    </>
  );
}
