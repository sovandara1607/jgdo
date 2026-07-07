import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { ArrowLeft } from "lucide-react";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { mdxComponents } from "@/components/mdx-components";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { extractToc, getAllPosts, getPostBySlug } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/data/site";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      url: `${siteConfig.url}/blog/${post.slug}`,
    },
    alternates: { canonical: `${siteConfig.url}/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const toc = extractToc(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
  };

  return (
    <article className="py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container className="max-w-3xl">
        <Reveal>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to blog
          </Link>

          <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full bg-accent-soft px-2.5 py-1 font-medium text-accent">
              {post.category}
            </span>
            <span>&middot;</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>&middot;</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">{post.description}</p>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
              {post.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{post.author}</p>
              {post.authorRole ? (
                <p className="text-xs text-muted-foreground">{post.authorRole}</p>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Container>

      <Container className="mt-12 max-w-5xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_220px]">
          <div className="prose-content min-w-0 max-w-3xl">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  rehypePlugins: [
                    rehypeSlug,
                    [rehypePrettyCode, { theme: "github-dark", keepBackground: true }],
                  ],
                },
              }}
            />
          </div>
          <aside className="hidden lg:block">
            <TableOfContents entries={toc} />
          </aside>
        </div>
      </Container>
    </article>
  );
}
