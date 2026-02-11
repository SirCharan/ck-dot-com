# LLM Project Summary – crypto-math-folio-web

Concise overview for LLMs working on this codebase.

## What This Is

Next.js portfolio for **Charandeep Kapoor** – crypto, finance, and mathematics expert. Main portfolio has a cyberpunk-style UI; **Writings** at `/blog` uses a light, Codex-style minimal design.

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
  blog/           Writings at /blog (index, [slug] with prev/next nav, layout nav, feed.xml)
  layout.tsx      Root layout, meta, RSS link
  page.tsx        Main entry

src/
  components/     Hero, About, Experience, Academic, Personal, FinancialTools,
                  ResearchPapers, Contact, Sidebar, CryptoWidget, blog/MarkdownRenderer
  views/         Index (main portfolio), NotFound
  lib/            blog.ts (post loading), utils
  index.css       Global styles, CSS variables, blog styles

content/
  blog/           Markdown posts (.md)
```

## Design System

- **Colors**: `--neon-purple` (#a855f7), `--neon-cyan` (#06b6d4), `--deep-bg`, `--glass-bg`
- **Fonts**: Orbitron (headings), Rajdhani (subtitles), Inter (body)
- **Components**: `GlassCard` (HUD corners), `Collapsible` for expandable content
- **Writings**: Light-only (#fffef7), narrow column, prism syntax theme

## Key Components

| Component       | Purpose                                    |
|----------------|---------------------------------------------|
| Hero           | Landing, canvas particles, 3D polyhedron, nav |
| Experience     | Work history with collapsible cards         |
| FinancialTools | Stocky AI, Zerodha MCP, Option Calc, etc.   |
| Personal       | Stock market, portfolio performance         |
| SEO            | Dynamic meta tags via react-helmet-async    |

## Writings (at /blog)

- **Display label**: "Writings" (nav, page title, back links)
- **Route**: `/blog` (kept for URLs)
- **Nav**: Codex-style header (Home · Writings · RSS) in layout; prev/next post links at bottom of each post.
- **Content**: Markdown in `content/blog/*.md`. Front matter: title, date (for sort only, not shown), excerpt, tags. Copy `_template.md` for new posts. Current posts: order-of-things-to-target-money-first, why-ai-cant-replace-a-genius, power-law-average-waste-150-crore-country.
- **RSS**: `/blog/feed.xml`

## Stocky AI (Featured Tool)

- **Title**: Stocky AI
- **Links**: Live (stockai-red.vercel.app), Latest (LinkedIn), Sensibull
- **Summary**: 100%+ ROI, 73% win rate, Claude 3.5 Sonnet + MCP + Zerodha

## Common Tasks

- **Add a tool**: Edit `tools` array in `src/components/FinancialTools.tsx`.
- **Add a writing**: Copy `content/blog/_template.md` to `your-slug.md`; edit front matter (title, date, excerpt, tags).
- **Change meta**: `app/layout.tsx` for static defaults, `SEO.tsx` for dynamic overrides.
- **Update experience**: Edit `experiences` in `src/components/Experience.tsx`.

## More Detail

See `docs/llm-documentation.md` for full architecture and patterns.
