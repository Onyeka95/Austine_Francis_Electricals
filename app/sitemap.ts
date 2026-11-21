import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";
import { getAllPosts } from "@/lib/getPosts";

/** Every public page, plus one entry per blog post. /quotation is left out on purpose (private tool). */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl.replace(/\/$/, "");

  const pages = [
    "",
    "/about",
    "/experience",
    "/services",
    "/gallery",
    "/products",
    "/blog",
    "/contact",
  ];

  const pageEntries = pages.map(
    (path): MetadataRoute.Sitemap[number] => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.7,
    })
  );

  const postEntries = getAllPosts().map(
    (post): MetadataRoute.Sitemap[number] => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    })
  );

  return [...pageEntries, ...postEntries];
}