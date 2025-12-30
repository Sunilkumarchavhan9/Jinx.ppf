import type { MetadataRoute } from "next";

import { SITE_INFO } from "@/config/site";
import { getAllPosts, getPostsByCategory } from "@/features/blog/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => {
    const raw = post.metadata.updatedAt ?? post.metadata.date ?? null;
    const d = raw ? new Date(raw) : new Date();
    const lastModified = isNaN(d.getTime())
      ? new Date().toISOString()
      : d.toISOString();
    return {
      url: `${SITE_INFO.url}/blog/${post.slug}`,
      lastModified,
    };
  });

  const components = getPostsByCategory("components").map((post) => {
    const raw = post.metadata.updatedAt ?? post.metadata.date ?? null;
    const d = raw ? new Date(raw) : new Date();
    const lastModified = isNaN(d.getTime())
      ? new Date().toISOString()
      : d.toISOString();
    return {
      url: `${SITE_INFO.url}/components/${post.slug}`,
      lastModified,
    };
  });

  const routes = ["", "/blog", "/components"].map((route) => ({
    url: `${SITE_INFO.url}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...posts, ...components];
}
