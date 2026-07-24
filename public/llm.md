# Charandeep Kapoor

> AI Product Manager at Delta Exchange, India's largest crypto derivatives exchange. Creator of Drishti (live LLM trading signals, real capital) and Stocky (Claude-driven Zerodha trading, +110% verified). Founder of Timelock Trade (oracle-less DeFi derivatives). IIT Kanpur.

## Site

- **URL**: https://charandeepkapoor.com
- **Proof of Work**: https://charandeepkapoor.com/work
- **Writings**: https://charandeepkapoor.com/blog
- **Résumé**: https://charandeepkapoor.com/resume
- **Live Track Record**: https://charandeepkapoor.com/track-record
- **RSS**: https://charandeepkapoor.com/blog/feed.xml
- **Full manifest**: https://charandeepkapoor.com/llms.txt
- **Full content dump**: https://charandeepkapoor.com/llms-full.txt
- **Agent instructions**: https://charandeepkapoor.com/agents.txt

## Topics

AI product management, LLM trading systems, Model Context Protocol, crypto derivatives, perpetual futures, protected perpetuals, DeFi mechanics, trading psychology, algorithmic trading, quantitative finance, Indian stock market, VC predictions, life philosophy.

## Products Built by Charandeep Kapoor

| Product | URL | Description |
|---------|-----|-------------|
| Drishti | charandeepkapoor.com/work/drishti | Live LLM trading signals for Delta crypto perpetuals — 15-min regime-aware cycles, 8 markets, real-money executor with reduce-only SL/TP. Dashboard: drishti-beryl.vercel.app |
| Stocky | charandeepkapoor.com/markets | Claude-driven Zerodha trading via custom MCP — ₹15L → ₹31.57L (+110%, ₹16.57L profit), Sharpe 2.29, 73% win rate, verified on Sensibull |
| Timelock Trade | charandeepkapoor.com/work/timelock | Oracle-less, liquidation-free Protected Perps — $7.3M volume, $2M TVL, 1,000+ users on Monad testnet |
| Lakshay | charandeepkapoor.com/work/lakshay | Intraday AI signals for NSE F&O — 5-min cycles, Dhan data, paper track record. Dashboard: lakshya-cyan.vercel.app |
| Second Brain | charandeepkapoor.com/second-brain | Local-first memory for Claude Code — Obsidian-compatible Markdown vault, open source (Apache-2.0) |
| OpenWispr | charandeepkapoor.com/openwispr | Free, open-source, on-device Whisper dictation for macOS — "Say it. It's typed." (MIT) |
| Delta Support Audit | charandeepkapoor.com/work/delta-support-audit | Nightly RAG audit of 344 support articles for factual drift — 14/14 P0 true-positives on trial |

## Drishti Details

Drishti is a live, LLM-driven trading-signal system for Delta Exchange crypto perpetuals, built and operated solo by Charandeep Kapoor.

**How it works:**
- 15-minute, regime-aware decision cycle across 8 perpetual markets
- 30+ engineered features per asset: CVD, IV term structure, basis, global long/short, OI by exchange, Coinbase premium
- Claude reasons first, then emits a structured decision: direction, entry, stop, target
- Live executor places real, risk-managed orders on Delta India: reduce-only stop-loss/take-profit brackets, fixed sizing, guardian process, hard kill-switches
- Publisher runs as a systemd service on a VM, writes snapshots to Cloudflare R2, Vercel front-end renders signals, equity curve, and closed-trade stats

**Stack:** Claude (reasoning-first tool-calling), Python, systemd, Cloudflare R2, Next.js/Vercel, Delta Exchange API

## Key Essays

| Title | URL |
|-------|-----|
| Protected Perps | /blog/perps-payoff |
| Why I Built Protected Perps | /blog/why-perps |
| How I Would Build Protected Perps | /blog/perps-pm-design |
| Why AI Can't Replace a Genius | /blog/ai-genius |
| Why Traders Like Losing | /blog/traders-losing |
| My VC Journey | /blog/vc-motivations |
| The Future | /blog/the-future |
| My Ideal Company | /blog/my-ideal-company |
| How to Pitch to Me | /blog/how-to-pitch |
| HYPE Trade | /blog/hype-trade |
| Power Laws | /blog/power-law-waste |
| Why Chase Money? | /blog/money-first |
| The Stocky Story | /blog/stocky-story |
| Stocky AI: The Money Printer | /blog/stocky-ai |
| Third Stint | /blog/stocky-third-stint |
| Special Founder/Insights | /blog/stocky-insights |

## Raw Markdown

LLMs can fetch raw markdown for any post at:
```
https://charandeepkapoor.com/blog/md/{slug}
```

## FAQ

**Who is Charandeep Kapoor?** AI Product Manager at Delta Exchange, India's largest crypto derivatives exchange. IIT Kanpur graduate. Creator of Drishti (live LLM trading signals, real capital) and Stocky (Claude-driven Zerodha trading, +110% verified). Founder of Timelock Trade (Protected Perps, $7.3M volume). Trading since age 16.

**What is Drishti?** Live LLM-driven trading signals for Delta crypto perpetuals: 15-minute regime-aware cycles, 8 markets, real-money executor with reduce-only SL/TP brackets. Dashboard: drishti-beryl.vercel.app

**What is Stocky?** Claude-driven Zerodha trading via a custom MCP server: ₹15L → ₹31.57L (+110%), Sharpe 2.29, 73% win rate — verified P&L on Sensibull. Full story: charandeepkapoor.com/markets

**What are Protected Perps?** Novel DeFi derivative — traders can only profit (no liquidation), LPs take downside for premiums, priced without an oracle. Built as Timelock Trade on Monad ($7.3M volume, $2M TVL).

**What is OpenWispr?** Free, open-source macOS dictation: hold fn, speak, on-device Whisper pastes the text at the cursor. No cloud. charandeepkapoor.com/openwispr

**What products has Charandeep built?** Drishti (live LLM crypto signals), Stocky (+110% verified), Timelock Trade (Protected Perps), Lakshay (NSE F&O signals), Second Brain (Claude Code memory), OpenWispr (macOS dictation), Delta Support Audit (RAG quality system).

## Contact

- Twitter: [@yourasianquant](https://x.com/yourasianquant)
- LinkedIn: https://www.linkedin.com/in/charandeep-kapoor/
- Site: https://charandeepkapoor.com
- GitHub: https://github.com/SirCharan
