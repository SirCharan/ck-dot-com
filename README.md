# Charandeep Kapoor – Personal Portfolio

A cyberpunk-themed portfolio showcasing expertise in crypto, finance, and mathematics. Built with React, TypeScript, Tailwind CSS, Framer Motion, and Next.js.

**Live:** [charandeepkapoor.com](https://charandeepkapoor.com)  
**Repo:** [github.com/SirCharan/ck-dot-com](https://github.com/SirCharan/ck-dot-com)

## Features

- **Cyberpunk UI** – Neon purple/cyan accents, glass cards, HUD-style corners
- **Animated Hero** – Canvas particles, 3D polyhedron, aurora background, rotating subtitles
- **Writings** – Light, Codex-style blog at `/blog` with markdown posts, RSS feed, nav (Home · Writings · RSS), prev/next post links (AI, life philosophy, priorities, power laws, trading psychology)
- **Stocky AI** – Featured financial tool: Claude-powered Zerodha trading system (100%+ ROI, 73% win rate)
- **Financial Tools** – Voice-powered Zerodha automation, Option Premium Calculator, Market Matters With CK, Delta trading bot
- **Responsive Design** – Mobile-first, dark theme
- **SEO** – OG tags, Twitter cards, structured data, sitemap, robots.txt

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS, shadcn/ui
- **Animation**: Framer Motion, Canvas API
- **Analytics**: Vercel Analytics

## Design System

- **Fonts**: Orbitron (headings), Rajdhani (subtitles), Inter (body)
- **Colors**: `--neon-purple`, `--neon-cyan`, `--deep-bg`, `--glass-bg`
- **Components**: GlassCard (HUD corners), collapsible tool/experience cards

## Project Structure

```
app/
├── blog/               # Writings at /blog (light, Codex-style)
│   ├── [slug]/page.tsx # Post page (with prev/next nav)
│   ├── feed.xml/       # RSS
│   ├── layout.tsx     # Nav: Home · Writings · RSS
│   └── page.tsx
├── layout.tsx
└── page.tsx

src/
├── components/
│   ├── Hero.tsx          # Landing, particles, 3D, nav
│   ├── About.tsx
│   ├── Experience.tsx    # Collapsible role cards
│   ├── Academic.tsx
│   ├── Personal.tsx      # Stock market, portfolio
│   ├── FinancialTools.tsx # Stocky AI, Zerodha MCP, etc.
│   ├── ResearchPapers.tsx
│   ├── Contact.tsx
│   ├── Sidebar.tsx
│   ├── CryptoWidget.tsx
│   └── blog/             # MarkdownRenderer for writings
├── views/
│   ├── Index.tsx         # Main portfolio
│   └── NotFound.tsx
├── lib/
│   └── blog.ts           # Post loading, getAdjacentPosts
└── index.css

content/
└── blog/                 # Markdown posts: why-traders-like-losing-90-percent-failure, order-of-things-to-target-money-first, why-ai-cant-replace-a-genius, power-law-average-waste-150-crore-country, _template.md, README.md
```

## Quick Start

```bash
git clone https://github.com/SirCharan/ck-dot-com.git
cd ck-dot-com
npm install   # or bun install
npm run dev   # or bun dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Next.js) |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |

## Deployment

Deployed via Vercel at [charandeepkapoor.com](https://charandeepkapoor.com).

## Agents & LLMs

Guidance for AI assistants (Cursor, Copilot, etc.) working on this codebase:

| File | Purpose |
|------|---------|
| `agents.md` | Agent instructions: conventions, file locations, content guidelines |
| `llm.md` | LLM-friendly project summary and common tasks |
| `docs/llm-documentation.md` | Detailed architecture and component docs |

## License

MIT
