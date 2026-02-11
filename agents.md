# Agent Instructions – crypto-math-folio-web

Instructions for AI agents (Cursor, GitHub Copilot, etc.) working on this codebase.

## Project Overview

Personal portfolio for **Charandeep Kapoor** – crypto, finance, and mathematics expert. Next.js app with cyberpunk design theme and a separate **Writings** section at `/blog`.

- **Stack**: React 18, TypeScript, Next.js 15 (App Router), Tailwind CSS, shadcn/ui, Framer Motion
- **Deployment**: Vercel at charandeepkapoor.com
- **Design**: Dark theme on main portfolio; light Codex-style theme for Writings at `/blog`

## Key Conventions

1. **Components**: Functional components only. Use TypeScript interfaces for props.
2. **Styling**: Tailwind CSS + CSS variables (`--neon-purple`, `--neon-cyan`, etc.) in `src/index.css`.
3. **Cards**: Prefer `GlassCard` from `@/components/ui/GlassCard` for section content.
4. **Collapsibles**: Use `Collapsible` from shadcn for expandable sections (Experience, FinancialTools).

## File Locations

| Concern | Location |
|--------|----------|
| Hero, particles, nav | `src/components/Hero.tsx` |
| Experience entries | `src/components/Experience.tsx` |
| Financial tools (Stocky AI, etc.) | `src/components/FinancialTools.tsx` |
| Main page layout | `src/views/Index.tsx` |
| Writings (blog) | `app/blog/`, `src/lib/blog.ts`, `content/blog/`. Nav in layout; prev/next in post page. |
| SEO meta | `app/layout.tsx`, `src/components/SEO.tsx` |
| Design tokens | `src/index.css` |

## Content Guidelines

- **Stocky AI**: Title is "Stocky AI". Links: Live (stockai-red.vercel.app), Latest (LinkedIn post), Sensibull showcase.
- **Personal bio**: 6+ years in crypto, quant, product, research, VC. Building products 0→1.
- **Writings**: Display label "Writings"; route `/blog`. Codex-style nav (Home · Writings · RSS). Prev/next post links. No dates shown. Copy `_template.md` for new posts. Current posts: clubs-perps, lps-downside, exchange-payoffs, money-first, power-law-waste, perps-payoff, web2-perps, perps-next, ai-genius, why-perps, traders-losing.
- **Social**: @yourasianquant (Twitter), LinkedIn, Telegram (ck_timekeeper), GitHub.

## Do Not

- Remove or alter the gptengineer.js script tag in `index.html` (if present).
- Change OG/Twitter meta tags without updating both `app/layout.tsx` and `SEO.tsx` defaults.

## See Also

- `docs/llm-documentation.md` – detailed component and architecture docs
- `llm.md` – LLM-friendly project summary
