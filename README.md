# Charandeep Kapoor – Personal Portfolio

A cyberpunk-themed portfolio showcasing expertise in crypto, finance, and mathematics. Built with React, TypeScript, Tailwind CSS, Framer Motion, and Next.js.

**Live:** [charandeepkapoor.com](https://charandeepkapoor.com)

## Features

- **Cyberpunk UI** – Neon purple/cyan accents, glass cards, HUD-style corners
- **Animated Hero** – Canvas particles, 3D polyhedron, aurora background, rotating subtitles
- **Writings** – Light, Codex-style blog at `/blog` with markdown posts, RSS feed
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
│   ├── [slug]/page.tsx # Post page
│   ├── feed.xml/       # RSS
│   ├── layout.tsx
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
│   └── blog.ts           # Post loading from content/blog
└── index.css

content/
└── blog/                 # Markdown posts
```

## Quick Start

```bash
git clone https://github.com/SirCharan/crypto-math-folio-web.git
cd crypto-math-folio-web
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

## License

MIT
