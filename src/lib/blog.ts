import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogFrontmatter, BlogPostMeta } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogPost extends BlogPostMeta {
  content: string;
}

function readSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function readPost(slug: string): BlogPost {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as BlogFrontmatter;

  return {
    ...frontmatter,
    slug,
    content,
    readingTime: readingTime(content).text,
  };
}

export function getAllPosts(): BlogPost[] {
  return readSlugs()
    .map(readPost)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Strips MDX body content, for passing post metadata to client components without the payload. */
export function toPostMeta(post: BlogPost): BlogPostMeta {
  const {
    slug,
    title,
    description,
    date,
    category,
    author,
    authorRole,
    tags,
    coverImage,
    readingTime,
  } = post;
  return {
    slug,
    title,
    description,
    date,
    category,
    author,
    authorRole,
    tags,
    coverImage,
    readingTime,
  };
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  if (!readSlugs().includes(slug)) return undefined;
  return readPost(slug);
}

export function getAllCategories(): string[] {
  const categories = new Set(getAllPosts().map((post) => post.category));
  return ["All", ...Array.from(categories)];
}

export interface TocEntry {
  depth: 2 | 3;
  text: string;
  id: string;
}

export function extractToc(content: string): TocEntry[] {
  const headingPattern = /^(#{2,3})\s+(.+)$/gm;
  const entries: TocEntry[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingPattern.exec(content)) !== null) {
    const depth = match[1].length as 2 | 3;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    entries.push({ depth, text, id });
  }

  return entries;
}
