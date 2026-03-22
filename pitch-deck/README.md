# Stocky AI — Seed Deck

Raising **$1.5M at $15M valuation**.

## Files

| File | Purpose |
|------|---------|
| `slides.json` | Structured data for all 13 slides (titles, bullets, stats, layout metadata) |
| `deck.html` | Styled HTML deck (1920x1080, dark theme) — open in browser, copy text into Figma |
| `slide-01.svg` to `slide-13.svg` | Individual SVG slides — drag directly into Figma |

## How to Use in Figma

### Option 1: Import SVGs (Recommended)
1. Open Figma → New file → Frame (1920x1080)
2. Drag each `slide-XX.svg` into Figma
3. All text layers are editable — update copy, swap fonts, resize
4. Replace image placeholders (dashed rectangles) with actual screenshots

### Option 2: Copy from HTML
1. Open `deck.html` in Chrome
2. Select text from any slide → Copy → Paste into Figma
3. Formatting won't transfer, but content structure is clear

### Option 3: Use JSON
1. Open `slides.json` in any editor
2. Each slide has structured `title`, `bullets`, `stats`, `layout` fields
3. Use as a content source while designing in Figma

## Design System

| Token | Value |
|-------|-------|
| Background | `#0A0A0A` |
| Gold accent | `#C9A96E` |
| Primary text | `#FFFFFF` |
| Secondary text | `#A0A0A0` |
| Card background | `#111111` |
| Card border | `#1a1a1a` |
| Font | Inter |
| Title size | 48px / 700 weight |
| Body size | 24px / 400 weight |
| Stat size | 56px / 800 weight |
| Aspect ratio | 16:9 (1920x1080) |

## Image Placeholders to Replace

| Slide | Placeholder | Source |
|-------|------------|--------|
| 4 | Terminal screenshot | `public/images/stocky/stocky-terminal-gods-eye.png` |
| 5 | La Nina/NFL trade | screenshot from blog |
| 5 | Polymarket Hormuz | screenshot from blog |
| 6 | Stocky Fun | `public/images/stocky/stocky-fun-btc.png` |
| 11 | PnL stats | `public/images/stocky/stocky-pnl-stats.png` |
| 12 | Founder photo | your headshot |

## Slide Order

1. Title
2. Problem
3. Solution (Two Theses)
4. Product — Stocky Terminal
5. Edge in Action (trade examples)
6. Product — Stocky Fun
7. Why Now
8. Market Size (TAM/SAM/SOM)
9. Business Model
10. Competitive Landscape
11. Traction
12. Founder
13. Vision + Ask
