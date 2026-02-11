# Agent Instructions – crypto-math-folio-web

Instructions for AI agents (Cursor, GitHub Copilot, Claude, etc.) working on this codebase.

## Project Overview

Personal portfolio for **Charandeep Kapoor** – crypto, quant finance, and mathematics expert. Next.js app with cyberpunk design theme and a **Writings** section at `/blog`.

- **Stack**: React 18, TypeScript, Next.js 15 (App Router), Tailwind CSS, shadcn/ui, Framer Motion
- **Deployment**: Vercel at charandeepkapoor.com
- **Design**: Dark theme on main portfolio; light Codex-style theme for Writings at `/blog`

## SEO & AI Discoverability

- **Sitemap**: Dynamic at `app/sitemap.ts` – generates URLs for home, blog index, blog posts, and `/blog/md/*` (raw markdown for LLM ingestion)
- **Structured data**: `RootStructuredData.tsx` (Person, WebSite) in layout; `BlogStructuredData.tsx` (Article, BreadcrumbList) on post pages
- **llms.txt**: `public/llms.txt` served at `/llms.txt` – manifest for AI crawlers (Perplexity, ChatGPT)
- **robots.txt**: Allows PerplexityBot, OAI-SearchBot (ChatGPT Search), Claude-Web, GPTBot
- When changing meta or schema, ensure consistency across `app/layout.tsx`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, and `src/components/SEO.tsx`

## Key Conventions

1. **Components**: Functional components only. Use TypeScript interfaces for props.
2. **Styling**: Tailwind CSS + CSS variables (`--neon-purple`, `--neon-cyan`, etc.) in `src/index.css`.
3. **Cards**: Prefer `GlassCard` from `@/components/ui/GlassCard` for section content.
4. **Collapsibles**: Use `Collapsible` from shadcn for expandable sections (Experience, FinancialTools).

## File Locations

| Concern                 | Location                                        |
|-------------------------|-------------------------------------------------|
| Hero, particles, nav    | `src/components/Hero.tsx`                       |
| Experience entries      | `src/components/Experience.tsx`                |
| Financial tools        | `src/components/FinancialTools.tsx`             |
| Main page layout        | `src/views/Index.tsx`                           |
| Writings (blog)         | `app/blog/`, `src/lib/blog.ts`, `content/blog/` |
| SEO meta                | `app/layout.tsx`, `src/components/SEO.tsx`      |
| Structured data         | `src/components/RootStructuredData.tsx`, `src/components/blog/BlogStructuredData.tsx` |
| Sitemap                 | `app/sitemap.ts`                                |
| Design tokens           | `src/index.css`                                |

## Content Guidelines

- **Stocky AI**: Title is "Stocky AI". Links: Live (stockai-red.vercel.app), Latest (LinkedIn), Sensibull showcase.
- **Personal bio**: 6+ years in crypto, quant, product, research, VC. Building products 0→1.
- **Writings**: Display label "Writings"; route `/blog`. Codex-style nav (Home · Writings · RSS). Prev/next post links. No dates on index. Copy `content/blog/_template.md` for new posts.
- **Social**: @yourasianquant (Twitter), LinkedIn, Telegram (ck_timekeeper), GitHub.

## Do Not

- Remove or alter the gptengineer.js script tag in `index.html` (if present).
- Change OG/Twitter meta or structured data without updating `app/layout.tsx`, `app/blog/[slug]/page.tsx`, and `SEO.tsx` where relevant.
- Block PerplexityBot or OAI-SearchBot in robots.txt (needed for AI visibility).

## See Also

- `docs/llm-documentation.md` – detailed component and architecture docs
- `llm.md` – LLM-friendly project summary
- `docs/GTM_MARKETING.md` – GTM and marketing recommendations
