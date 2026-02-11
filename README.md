# Charandeep Kapoor – Personal Portfolio

A cyberpunk-themed portfolio showcasing expertise in **crypto**, **quant finance**, and **mathematics**. Built with React, TypeScript, Tailwind CSS, Framer Motion, and Next.js.

**Live:** [charandeepkapoor.com](https://charandeepkapoor.com)  
**Repo:** [github.com/SirCharan/crypto-math-folio-web](https://github.com/SirCharan/crypto-math-folio-web)

---

## Features

- **Cyberpunk UI** – Neon purple/cyan accents, glass cards, HUD-style corners
- **Animated Hero** – Canvas particles, 3D polyhedron, aurora background, rotating subtitles
- **Writings** – Light, Codex-style blog at `/blog` with markdown posts, RSS feed, prev/next nav
- **Stocky AI** – Featured financial tool: Claude-powered Zerodha trading system (100%+ ROI, 73% win rate)
- **Financial Tools** – Voice-powered Zerodha automation, Option Premium Calculator, Delta trading bot
- **Responsive Design** – Mobile-first, dark theme
- **SEO & AI Discoverability** – OG tags, Twitter cards, Schema.org structured data, dynamic sitemap, robots.txt (PerplexityBot, OAI-SearchBot, GPTBot), llms.txt for AI crawlers

---

## Tech Stack

| Layer      | Tech                       |
|-----------|----------------------------|
| Frontend  | React 18, TypeScript       |
| Framework | Next.js 15 (App Router)    |
| Styling   | Tailwind CSS, shadcn/ui   |
| Animation | Framer Motion, Canvas API  |
| Analytics | Vercel Analytics           |

---

## SEO & AI Visibility

- **Dynamic sitemap** – `app/sitemap.ts` generates sitemap for home, blog, blog posts, and `/blog/md/*` (raw markdown for LLM ingestion)
- **Structured data** – Person, WebSite, Article schemas (Schema.org JSON-LD) for Perplexity & ChatGPT citation
- **llms.txt** – At `/llms.txt` for AI crawlers (manifest of key pages and essays)
- **robots.txt** – Allows PerplexityBot, OAI-SearchBot (ChatGPT Search), Claude-Web, GPTBot
- **RSS** – `/blog/feed.xml` for syndication

---

## Project Structure

```
app/
├── blog/                 # Writings at /blog
│   ├── [slug]/page.tsx    # Post page (prev/next nav)
│   ├── md/[slug]/route.ts # Raw markdown for AI ingestion
│   ├── feed.xml/route.ts  # RSS
│   ├── layout.tsx         # Nav: Home · Writings · RSS
│   └── page.tsx
├── layout.tsx             # Root layout, meta, structured data
├── page.tsx
└── sitemap.ts             # Dynamic sitemap

src/
├── components/
│   ├── Hero.tsx, About.tsx, Experience.tsx
│   ├── FinancialTools.tsx, ResearchPapers.tsx
│   ├── SEO.tsx, StructuredData.tsx, RootStructuredData.tsx
│   └── blog/              # MarkdownRenderer, BlogStructuredData, etc.
├── views/Index.tsx
└── lib/blog.ts

content/blog/              # Markdown posts
public/
├── llms.txt               # LLM manifest (served at /llms.txt)
└── robots.txt
```

---

## Quick Start

```bash
git clone https://github.com/SirCharan/crypto-math-folio-web.git
cd crypto-math-folio-web
npm install   # or bun install
npm run dev   # or bun dev
```

| Command        | Description          |
|----------------|----------------------|
| `npm run dev`  | Start dev server     |
| `npm run build`| Production build     |
| `npm run start`| Run production       |
| `npm run lint` | Run ESLint           |

---

## Deployment

Deployed via **Vercel** at [charandeepkapoor.com](https://charandeepkapoor.com).

---

## Agents & LLMs

Guidance for AI assistants (Cursor, Copilot, Claude, etc.) working on this codebase:

| File                      | Purpose                                             |
|---------------------------|-----------------------------------------------------|
| `agents.md`                | Agent instructions: conventions, file locations    |
| `llm.md`                   | LLM-friendly project summary and common tasks       |
| `docs/llm-documentation.md`| Detailed architecture and component docs            |
| `public/llms.txt`          | LLM manifest for AI crawlers (served at /llms.txt) |

---

## License

MIT
