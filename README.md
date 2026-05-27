# Charandeep Kapoor — Personal Site

Editorial-style personal site for Charandeep Kapoor — founder of Timelock Trade, creator of Stocky AI, six years across product, research and VC in crypto and quant finance.

**Live:** [charandeepkapoor.com](https://charandeepkapoor.com)

---

## Stack

| Layer      | Tech                                             |
|------------|--------------------------------------------------|
| Framework  | Next.js 15 (App Router)                          |
| UI         | React 18 + TypeScript + Tailwind CSS             |
| Typography | EB Garamond (display), Inter (body), JetBrains Mono (data) |
| Content    | Markdown blog under `content/blog/`              |
| Hosting    | Vercel                                           |

---

## Layout

- **Home (`app/page.tsx`)** — single editorial flow: Hero · Stocky verified-PnL module · Latest essay · Work · Tools · Research · Bio · Footer.
- **Blog (`/blog`)** — `content/blog/*.md` is the source of truth. Codex-style typography, RSS at `/blog/feed.xml`, raw markdown at `/blog/md/[slug]`, OG images, llms.txt.
- **Data (`src/data/site.ts`)** — single source for bio, experience, tools, research.
- **Stocky PnL (`src/data/stocky-pnl.json`)** — bumped by `npm run pull:pnl` (see below).

---

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

---

## Refresh Stocky verified-PnL

The Stocky module on the homepage reads from `src/data/stocky-pnl.json`. The numbers come from the verified-PnL page at [Sensibull](https://web.sensibull.com/verified-pnl/imported-hare/longterm-pnl), which is a JS-rendered SPA — so refreshing the JSON requires a headless browser.

One-time setup:

```bash
npm i -D tsx playwright
npx playwright install chromium
```

Then to refresh:

```bash
npm run pull:pnl
```

Inspect the diff in `src/data/stocky-pnl.json`, commit when happy, deploy.

---

## SEO & AI discoverability

- Dynamic sitemap at `app/sitemap.ts`
- Robots at `app/robots.ts` (allows PerplexityBot, OAI-SearchBot, Claude-Web, GPTBot)
- RSS at `app/blog/feed.xml/route.ts`
- Raw markdown for LLM ingestion at `app/blog/md/[slug]/route.ts`
- `public/llms.txt`, `public/llm.txt`, `public/agents.txt`
- Schema.org structured data in `src/components/RootStructuredData.tsx` and `src/components/blog/BlogStructuredData.tsx`

---

## License

MIT
