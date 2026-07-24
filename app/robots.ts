import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
      },
      {
        userAgent: "Twitterbot",
        allow: "/",
      },
      {
        userAgent: "facebookexternalhit",
        allow: "/",
      },
      // AI / LLM crawlers
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      {
        userAgent: "Perplexity-User",
        allow: "/",
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
      },
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        userAgent: "Claude-SearchBot",
        allow: "/",
      },
      {
        userAgent: "Claude-User",
        allow: "/",
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
      {
        userAgent: "Cohere-AI",
        allow: "/",
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        userAgent: "Google-CloudVertexBot",
        allow: "/",
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
      },
      {
        userAgent: "meta-externalagent",
        allow: "/",
      },
      {
        userAgent: "meta-externalfetcher",
        allow: "/",
      },
      {
        userAgent: "MistralAI-User",
        allow: "/",
      },
      {
        userAgent: "CCBot",
        allow: "/",
      },
      {
        userAgent: "Amazonbot",
        allow: "/",
      },
      {
        userAgent: "DuckAssistBot",
        allow: "/",
      },
    ],
    sitemap: "https://charandeepkapoor.com/sitemap.xml",
  };
}
