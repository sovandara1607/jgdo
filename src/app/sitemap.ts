import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { getAllPosts } from "@/lib/blog";

const staticRoutes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/download", changeFrequency: "weekly", priority: 0.9 },
  { path: "/features", changeFrequency: "monthly", priority: 0.8 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/changelog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/blog", changeFrequency: "daily", priority: 0.7 },
  { path: "/support", changeFrequency: "monthly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
