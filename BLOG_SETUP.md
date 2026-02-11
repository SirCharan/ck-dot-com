# Blog Setup Guide

This document describes the blog section added to charandeepkapoor.com using **Next.js 14+ (App Router)**.

## Migration: Vite → Next.js

The project has been migrated from Vite to Next.js 14. Key changes:

- **`npm run dev`** → runs `next dev` (port 3000)
- **`npm run build`** → runs `next build`
- **`npm run start`** → runs `next start` (production)
- Removed: `vite`, `@vitejs/plugin-react-swc`, `react-router-dom`
- Renamed: `src/pages/` → `src/views/` (to avoid Next.js Pages Router conflict)

## Blog Structure

```
content/blog/           # Markdown posts with frontmatter
├── volatility-surface-arbitrage-crypto.md
├── building-personal-backtester.md
└── onchain-metrics-still-matter.md

app/
├── blog/
│   ├── layout.tsx      # Codex-style light theme wrapper
│   ├── page.tsx        # Blog index
│   ├── [slug]/
│   │   └── page.tsx    # Single post
│   └── feed.xml/
│       └── route.ts    # RSS feed

src/
├── lib/blog.ts         # Read posts, get slugs, parse frontmatter
└── components/blog/
    └── MarkdownRenderer.tsx   # Renders markdown with code blocks, math, etc.
```

## Adding a Blog Link to Main Nav

The Blog link has been added to:

- **Hero header nav**: `/blog`
- **Hero footer tabs**: Blog
- **Sidebar**: Blog (BookOpen icon)

## Creating a New Post

1. Create a new `.md` file in `content/blog/` with frontmatter:

```md
---
title: "My Post Title"
date: "2026-02-10"
slug: "my-post-slug"
excerpt: "A short teaser for the index."
tags: ["crypto", "trading"]
---

Your content here. Supports **markdown**, `inline code`, and math:

$$
E = mc^2
$$

Code blocks with syntax highlighting:

\`\`\`python
def hello():
    print("world")
\`\`\`
```

2. The slug (filename without `.md`) becomes the URL: `/blog/my-post-slug`

## Design (Codex-inspired)

- **Max width**: 720px centered column
- **Typography**: Inter/system-ui, 18–20px body, line-height 1.7–1.8
- **Colors**: Light bg `#fdfdfd`, dark text `#111`; respects `prefers-color-scheme: dark`
- **No images, cards, or heavy animations** — text focus
- **Code blocks**: Prism One Dark theme, copy button
- **Math**: KaTeX for inline and block equations

## RSS Feed

- **URL**: `/blog/feed.xml`
- **Link in head**: `<link rel="alternate" type="application/rss+xml" href="/blog/feed.xml" />`

## Dependencies Added

- `next` — framework
- `gray-matter` — frontmatter parsing
- `react-markdown` — markdown rendering
- `remark-gfm` — GitHub Flavored Markdown
- `remark-math` + `rehype-katex` — math (LaTeX)
- `rehype-raw` — raw HTML in markdown
- `react-syntax-highlighter` — code highlighting
