---
# Tailored copy for Trackk (trackk.in). Private: route is noindex and unlinked.
# Its npm scripts build to ~/Downloads, never public/.
# Same schema and one-page budget as content/resume.md (src/data/resume.test.ts).
name: Charandeep Kapoor
title: Senior Backend Engineer · Trading Systems
labels:
  systems: Live systems
contact:
  email: charandeepkapoor3@gmail.com
  phone: ""
  location: India
  site: charandeepkapoor.com
  linkedin: https://www.linkedin.com/in/charandeep-kapoor/
  github: https://github.com/SirCharan
  twitter: https://x.com/yourasianquant


systems:
  - name: Stocky Terminal
    href: https://terminal.stockyai.xyz
    line: >-
      Real-time NSE/BSE/MCX terminal in strict TypeScript: Vite, deck.gl, ~60
      Vercel Edge functions, Dhan and Finnhub feeds, OSINT overlays, PWA.
  - name: Stocky
    href: https://charandeepkapoor.com/markets
    hrefLabel: charandeepkapoor.com/markets
    line: >-
      Fine-tuned Claude on a custom Zerodha MCP; it traded live Indian F&O for
      a year. ₹15L to ₹31.57L, +110%, Sharpe 2.29, 73% win rate.
    proof:
      label: verified
      href: https://web.sensibull.com/verified-pnl/imported-hare/longterm-pnl
  - name: Dhan copy-trader
    href: https://charandeepkapoor.com/track-record
    hrefLabel: charandeepkapoor.com/track-record
    line: >-
      Python service mirroring Stratzy options trades onto Dhan at 1–3×, live
      money since 2 Sep 2026. Hourly JWT refresh, FIFO P&L ledger. +10.3% net,
      Sharpe 2.3, 6.4% max DD, 1 Aug to 25 Sep 2026.
  - name: Drishti
    href: https://drishtisignals.in
    line: >-
      Claude signals plus a separate executor daemon on Delta perps: reduce-only
      stops, OCO, orphan guardian, loss breaker, 289 tests. Pro book 56.3% win
      rate on 343 decided signals to Aug 2026. 40k+ users.
  - name: OpenWispr
    href: https://charandeepkapoor.com/openwispr
    hrefLabel: charandeepkapoor.com/openwispr
    line: >-
      On-device macOS dictation. Rust core (serde, regex, chrono) in a Tauri
      shell, WhisperKit on the Neural Engine. Open source.

experience:
  - company: Delta Exchange
    position: AI Product Manager
    duration: Apr 2026 – Present
    bullets:
      - Acqui-hired by Delta Exchange for Stocky; Zerodha and Dhan also bid.
      - "Built the official Delta Exchange MCP server: 40 tools, market data to guarded order execution."
      - "Support Audit: RAG pipeline over 217 articles, 291 drift findings, 222 fixed."
  - company: Timelock Trade
    position: Founder
    duration: Apr 2025 – Apr 2026
    bullets:
      - "Built a liquidation-free exchange: perps, options, prediction markets."
      - $7.3M volume, $2M TVL, 1,000+ users on Monad testnet. Led a team of 6.
  - company: Diffusion Labs
    position: Product Manager
    duration: Dec 2023 – Apr 2025
    one: Scaled Methlab to 20,000+ users and $50M TVL in 6 months; launched Puff ($75M market cap).
  - company: Delta Exchange
    position: Product & Growth Consultant
    duration: Jun 2023 – Jul 2024
    one: "Ran live BTC/ETH algos: ATM straddles +2,860%/yr, MACD +100% over two years."
  - company: Heru Finance
    position: Trader & Investment Analyst
    duration: May 2022 – Feb 2023
    one: Ran a $1M fund at 30%+ delta-neutral yields; hedged $5M+ of exposure.

skills:
  - group: Backend
    items:
      - Rust (working knowledge, learning)
      - Python (asyncio, pydantic, uv)
      - TypeScript, Node
      - Postgres, DuckDB, Redis
  - group: Broking infra
    items:
      - Market data feeds (NSE, BSE, MCX)
      - Broker APIs (Zerodha Kite, Dhan)
      - Order management (OCO, reduce-only, kill switches)
      - Backtesting (walk-forward, PBO)
  - group: Ops
    items:
      - Linux, systemd
      - Vercel Edge, GitHub Actions
  - group: AI
    items:
      - LLM agents, MCP

academics:
  - title: B.Tech, IIT Kanpur
    detail: 2018 – 2022
  - title: JEE Advanced 2018
    detail: AIR 638 (99.96%ile)
  - title: JEE Main 2018
    detail: AIR 272 (99.98%ile)
  # All three sittings, positionally matched, in one row rather than three.
  - title: CAT 2022 · 2023 · 2024
    detail: 99.79 · 99.85 · 98.85%ile
  - title: National Maths Olympiad
    detail: AIR 3

certifications:
  # Three NISM series in one positionally-matched row, as with CAT above. Frees
  # rail height so the whole résumé can carry larger type on one page.
  - title: NISM Series VA · VIII · XV
    detail: Mutual Funds · Equity Derivatives · Research Analyst
  - title: NTSE, KVPY
    detail: Scholar
---

Backend engineer for Indian equities and F&O broking. I build broker integrations on Dhan and Zerodha, order routing with reduce-only stops and kill switches, and real-time NSE/BSE/MCX market data. Acqui-hired by Delta Exchange for Stocky. Python and TypeScript in production; Rust working knowledge, in daily use.
