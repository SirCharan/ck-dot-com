# GTM & Marketing Recommendations – Charandeep Kapoor Portfolio

Actionable ideas to improve growth, visibility, and distribution over time. Updated Feb 2025.

---

## 1. AI Discoverability (Perplexity, ChatGPT, Claude)

**Status**: Implemented

- robots.txt allows PerplexityBot, OAI-SearchBot, GPTBot, Claude-Web
- llms.txt at /llms.txt with curated page manifest
- Dynamic sitemap including /blog/md/* for raw markdown ingestion
- Schema.org Person, WebSite, Article structured data

**Ongoing**:

- Monitor server logs for OAI-SearchBot, PerplexityBot hits
- Add Google Search Console verification if not done
- Submit sitemap to Bing Webmaster Tools (ChatGPT uses Bing index)

---

## 2. Content Distribution

- **RSS**: `/blog/feed.xml` – consider syndication to Medium, Substack, or dev.to (with canonical back to charandeepkapoor.com)
- **Social**: Share new posts on Twitter (@yourasianquant), LinkedIn with clear CTAs
- **Newsletters**: Optional – collect emails for new essay notifications
- **Repurpose**: Turn key essays into Twitter threads, LinkedIn posts, or short videos

---

## 3. Backlinks & Authority

- Guest posts on crypto/DeFi/finance blogs (link back to portfolio)
- Comment and contribute in relevant communities (e.g. /r/algotrading, Hacker News) with value-first posts
- List in directories: Crypto Twitter lists, quant finance aggregators
- Partner with other writers (cross-links, roundups)

---

## 4. Analytics & Tracking

- **Vercel Analytics**: Already in use – review traffic by page
- **utm_source**: Use for shares (e.g. `?utm_source=twitter`, `?utm_source=perplexity`)
- **AI referrals**: Check for `utm_source=chatgpt.com` or Perplexity referrers
- **Heatmaps**: Optional – Hotjar or Plausible for behavior insights

---

## 5. Conversion & CTA

- Clear CTAs on each page: “Read writings”, “Contact”, “Stocky AI”
- Blog posts: End with “Back to Writings” + link to related posts
- Contact form: Consider minimal lead capture (e.g. “Get in touch for consulting”)

---

## 6. Technical SEO (Ongoing)

- Ensure all images have `alt` text
- Use semantic headings (H1 → H2 → H3) in blog posts
- Keep meta descriptions under 160 chars, titles under 60
- Mobile-first: Test on real devices

---

## 7. Future Ideas

- **Podcast appearances**: Share expertise, link to site
- **Conference talks**: Crypto/finance events → profile visibility
- **Open source**: Publish small tools (e.g. calculators) with attribution
- **Newsletter**: “Charan’s Weekly” or similar – essays + market thoughts

---

## Checklist for New Blog Posts

- [ ] Add to `content/blog/` with correct front matter (title, date, excerpt, tags)
- [ ] Sitemap auto-updates via `app/sitemap.ts`
- [ ] Share on Twitter/LinkedIn with link to post
- [ ] Consider cross-posting with canonical URL if using Medium/Substack
