import Link from "next/link";
import { SITE, BIO } from "@/data/site";
import { getAllPosts } from "@/lib/blog";

/**
 * Mission-Control landing — a TEASER hub. Each section shows a short, standout
 * summary and links out to its full page (Work / Writing / About / Track
 * record); the detail lives on those pages, not here. Trading is one pillar of
 * several. Never surfaces the seed portfolio.json.
 */

const STOCKY_VERIFIED = "https://web.sensibull.com/verified-pnl/imported-hare/longterm-pnl";

function Eyebrow({ label, meta }: { label: string; meta?: string }) {
  return (
    <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-[rgb(var(--faint))]">
      <span>{label}</span>
      {meta && <span className="text-accent">{meta}</span>}
    </div>
  );
}

export function McHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[rgb(var(--rule))] bg-[rgb(var(--bg))]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-grotesk text-[15px] font-bold tracking-tight text-ink">
          CK<span className="text-accent">.</span>
        </Link>
        <nav className="hidden gap-6 font-mono text-[12.5px] text-[rgb(var(--mute))] sm:flex">
          <Link href="/work" className="hover:text-ink">Work</Link>
          <Link href="/track-record" className="hover:text-ink">Track record</Link>
          <Link href="/blog" className="hover:text-ink">Writing</Link>
          <Link href="/resume" className="hover:text-ink">About</Link>
        </nav>
        <a
          href={SITE.socials.topmate}
          className="rounded-md bg-accent px-3 py-1.5 font-mono text-[12.5px] text-[rgb(var(--bg))]"
        >
          Book a call
        </a>
      </div>
    </header>
  );
}

// Standout work bullets — bold neon name + one line + link chips.
type WorkItem = { title: string; line: string; live?: string; github?: string; detail?: string };
const WORK: WorkItem[] = [
  { title: "Drishti", line: "Live LLM signals that trade real money on a 15-minute cycle, 8 markets.", live: "https://drishti-beryl.vercel.app", detail: "/work/drishti" },
  { title: "Timelock", line: "Oracle-less, liquidation-free DeFi derivatives — $7.3M volume, 1k+ users.", live: "https://perps.timelock.trade/", detail: "/work/timelock" },
  { title: "Delta MCP", line: "The first official crypto-exchange MCP server — 21 tools for LLMs.", live: "https://delta-mcp.vercel.app", detail: "/work/delta-mcp" },
  { title: "Stocky AI", line: "Fine-tuned Claude to trade Indian F&O & commodities on real capital — ₹15L → ₹16.57L profit (+110%), 73% win, externally verified.", live: STOCKY_VERIFIED, github: "https://github.com/SirCharan/Zerodha-MCP-Tradin", detail: "/markets" },
  { title: "Delta Support Audit", line: "A nightly RAG system auditing 344 support articles for correctness.", detail: "/work/delta-support-audit" },
  { title: "Andrea's World", line: "A playful, hand-built interactive 3D world on the web — for the joy of it.", live: "https://andrea-world.vercel.app", detail: "/work/andrea-world" },
];

function Chip({ href, children, internal }: { href: string; children: React.ReactNode; internal?: boolean }) {
  const cls = "font-mono text-[12px] text-[rgb(var(--mute))] hover:text-accent";
  return internal ? (
    <Link href={href} className={cls}>{children}</Link>
  ) : (
    <a href={href} className={cls}>{children}</a>
  );
}

export function McWork() {
  return (
    <section id="work" className="mx-auto max-w-5xl px-6 py-16 md:py-20">
      <Eyebrow label="Selected work" meta="what I've built" />
      <h2 className="mt-3 font-grotesk text-[clamp(1.6rem,3.4vw,2.6rem)] font-bold tracking-[-0.02em] text-ink">
        Things I&apos;ve built
      </h2>
      <ul className="mt-8 border-t border-[rgb(var(--rule))]">
        {WORK.map((w) => (
          <li key={w.title} className="border-b border-[rgb(var(--rule))] py-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-grotesk text-[clamp(1.2rem,2.4vw,1.5rem)] font-bold tracking-[-0.01em] text-accent">
                {w.title}
              </h3>
              <div className="flex flex-wrap gap-x-4">
                {w.live && <Chip href={w.live}>live ↗</Chip>}
                {w.github && <Chip href={w.github}>github ↗</Chip>}
                {w.detail && <Chip href={w.detail} internal>details →</Chip>}
              </div>
            </div>
            <p className="mt-1.5 max-w-[62ch] text-[15px] leading-[1.5] text-[rgb(var(--mute))]">{w.line}</p>
          </li>
        ))}
      </ul>
      <Link href="/work" className="mt-6 inline-block font-mono text-[13px] text-accent hover:underline">
        All work &amp; tools →
      </Link>
    </section>
  );
}

export function McTrackRecord() {
  return (
    <section className="border-y border-[rgb(var(--rule))] bg-[rgb(var(--panel))]">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <Eyebrow label="Track record" meta="real capital" />
        <div className="mt-6 flex flex-wrap items-end justify-between gap-8">
          <div>
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              {[
                ["+110%", "Stocky ROI · verified"],
                ["2.29", "Sharpe"],
                ["73%", "Win rate"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="font-grotesk text-[clamp(1.6rem,3vw,2.4rem)] font-bold tabular-nums text-ink">{n}</div>
                  <div className="mt-1 font-mono text-[11px] text-[rgb(var(--faint))]">{l}</div>
                </div>
              ))}
            </div>
            <p className="mt-5 max-w-[52ch] text-[15px] leading-[1.6] text-[rgb(var(--mute))]">
              Stocky is externally verified; a live Dhan account is{" "}
              <span className="text-ink">accumulating a real, honest sample</span> — the full curve,
              calendar and ratios update daily on the track-record page.
            </p>
          </div>
          <div className="flex flex-col gap-3 font-mono text-[13px]">
            <a href={STOCKY_VERIFIED} className="text-accent hover:underline">Verified PnL ↗</a>
            <Link href="/track-record" className="text-ink hover:text-accent">Live track record →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function McWriting() {
  const posts = getAllPosts().slice(0, 3);
  return (
    <section id="writing" className="mx-auto max-w-5xl px-6 py-16 md:py-20">
      <Eyebrow label="Writing" meta={`${getAllPosts().length} essays`} />
      <h2 className="mt-3 font-grotesk text-[clamp(1.6rem,3.4vw,2.6rem)] font-bold tracking-[-0.02em] text-ink">
        On markets, machines &amp; building
      </h2>
      <ul className="mt-8 border-t border-[rgb(var(--rule))]">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className="grid grid-cols-[auto_1fr] items-baseline gap-4 border-b border-[rgb(var(--rule))] py-4 transition-[padding] hover:pl-2"
            >
              <span className="font-mono text-[12px] text-[rgb(var(--faint))]">{p.date.slice(0, 7)}</span>
              <span className="font-serif text-[clamp(1rem,1.9vw,1.35rem)] text-ink">{p.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/blog" className="mt-6 inline-block font-mono text-[13px] text-accent hover:underline">
        All writing →
      </Link>
    </section>
  );
}

export function McAbout() {
  return (
    <section id="about" className="border-t border-[rgb(var(--rule))]">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <Eyebrow label="About" meta="/ ck" />
        <p className="mt-6 max-w-[60ch] font-serif text-[clamp(1.15rem,2vw,1.5rem)] leading-[1.5] text-ink">
          AI Product Manager &amp; Engineer at Delta Exchange. I ship the whole thing — the model, the
          protocol, the interface, and the essay explaining it.
        </p>
        <p className="mt-3 max-w-[58ch] font-serif text-[1rem] leading-[1.6] text-[rgb(var(--mute))]">
          {BIO.highlights[3] /* IIT-K · JEE AIR 638 · Maths Olympiad AIR 3 */}
        </p>
        <Link href="/resume" className="mt-6 inline-block font-mono text-[13px] text-accent hover:underline">
          About &amp; résumé →
        </Link>
      </div>
    </section>
  );
}

export function McContact() {
  const s = SITE.socials;
  return (
    <footer id="contact" className="border-t border-[rgb(var(--rule))]">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <Eyebrow label="Contact" meta="↓" />
        <h2 className="mt-4 font-grotesk text-[clamp(1.8rem,4.5vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.02em] text-ink">
          Let&apos;s build something.{" "}
          <a href={s.topmate} className="text-accent hover:underline">Book a call ↗</a>
        </h2>
        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[13px] text-[rgb(var(--mute))]">
          <a href={s.topmate} className="hover:text-accent">Topmate ↗</a>
          <a href={s.twitter} className="hover:text-accent">X / @{SITE.handle}</a>
          <a href={s.linkedin} className="hover:text-accent">LinkedIn</a>
          <a href={s.github} className="hover:text-accent">GitHub</a>
          <a href={s.telegram} className="hover:text-accent">Telegram</a>
          <span className="text-[rgb(var(--faint))]">© {new Date().getFullYear()} {SITE.name} · Bangalore</span>
        </div>
      </div>
    </footer>
  );
}
