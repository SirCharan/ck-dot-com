import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const SITE_URL = "https://charandeepkapoor.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const today = new Date().toISOString().split("T")[0];

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: today,
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: today,
      changeFrequency: "weekly" as const,
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/llms.txt`,
      lastModified: today,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/llm.txt`,
      lastModified: today,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/agents.txt`,
      lastModified: today,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/llm.md`,
      lastModified: today,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date || today,
    changeFrequency: "yearly" as const,
    priority: 0.85,
  }));

  // Raw markdown routes for AI/LLM ingestion (Perplexity, ChatGPT)
  const blogMdPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/md/${post.slug}`,
    lastModified: post.date || today,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages, ...blogMdPages];
}
