# LLM Project Summary – crypto-math-folio-web

Concise overview for LLMs working on this codebase.

## What This Is

Next.js portfolio for **Charandeep Kapoor** – crypto, quant finance, and mathematics expert. Main portfolio has a cyberpunk-style UI; **Writings** at `/blog` uses a light, Codex-style minimal design. Optimized for SEO and AI discoverability (Perplexity, ChatGPT, Claude).

## Tech Stack

- React 18, TypeScript
- Next.js 15 (App Router)
- Tailwind CSS, shadcn/ui (Radix primitives)
- Framer Motion, Canvas API
- Vercel Analytics
- Deployed at charandeepkapoor.com

## Structure

```
app/
  blog/           Writings at /blog (index, [slug] with prev/next nav, md/[slug] for raw markdown, layout nav, feed.xml)
  layout.tsx      Root layout, meta, RootStructuredData
  page.tsx        Main entry
  sitemap.ts      Dynamic sitemap (home, blog, posts, blog/md/*)

src/
  components/     Hero, About, Experience, Academic, Personal, FinancialTools,
                  ResearchPapers, Contact, Sidebar, CryptoWidget, RootStructuredData
                  blog/ MarkdownRenderer, BlogStructuredData, BlogProtectedPerpsCollapsible
  views/          Index (main portfolio), NotFound
  lib/            blog.ts (post loading), utils
  index.css       Global styles, CSS variables, blog styles

content/
  blog/           Markdown posts (.md)

public/
  llms.txt        LLM manifest (served at /llms.txt)
  robots.txt      Allows PerplexityBot, OAI-SearchBot, Claude-Web, GPTBot
```

## SEO & AI Visibility

- Dynamic sitemap at `/sitemap.xml`
- llms.txt at `/llms.txt` for AI crawlers
- Person + WebSite schema in layout; Article + BreadcrumbList on blog posts
- RSS at `/blog/feed.xml`
- Raw markdown at `/blog/md/[slug]` for LLM ingestion

## Key Components

| Component         | Purpose                                           |
|-------------------|---------------------------------------------------|
| Hero              | Landing, canvas particles, 3D polyhedron, nav      |
| Experience        | Work history with collapsible cards               |
| FinancialTools    | Stocky AI, Zerodha MCP, Option Calc, etc.         |
| Personal          | Stock market, portfolio performance               |
| SEO               | Dynamic meta tags via react-helmet-async         |
| RootStructuredData| Person + WebSite schema on all pages             |

## Writings (at /blog)

- **Display label**: "Writings"
- **Route**: `/blog`
- **Nav**: Home · Writings · RSS
- **New post**: Copy `content/blog/_template.md`, set title, date, excerpt, tags
- **Raw markdown**: `/blog/md/[slug]` for AI crawlers

## Stocky AI

- Title: Stocky AI
- Links: Live (stockai-red.vercel.app), Latest (LinkedIn), Sensibull
- Summary: 100%+ ROI, 73% win rate, Claude 3.5 Sonnet + MCP + Zerodha

## Common Tasks

- Add tool: Edit `tools` in `src/components/FinancialTools.tsx`
- Add writing: Copy `content/blog/_template.md` → `your-slug.md`
- Change meta: `app/layout.tsx`, `SEO.tsx`, `app/blog/[slug]/page.tsx`
- Update sitemap: `app/sitemap.ts` (auto-includes new posts from `getAllPosts()`)
- Update experience: Edit `experiences` in `src/components/Experience.tsx`

## More Detail

See `docs/llm-documentation.md` for full architecture and patterns.
