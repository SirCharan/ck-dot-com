import Link from "next/link";
import { CASE_STUDIES, SITE, BIO } from "@/data/site";
import { getAllPosts } from "@/lib/blog";

/**
 * Mission-Control landing sections (Phase 4). Server components, mc-scoped,
 * reusing the real content in src/data + the blog. Trading is one pillar of
 * several — Selected Work weighs Drishti / Timelock / Delta MCP / Support
 * Audit / Stocky / Perps evenly. Never surfaces the seed portfolio.json.
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
    <header className="sticky top-0 z-30 border-b border-[rgb(var(--rule))] bg-[rgb(var(--bg)/0.85)] backdrop-blur-[2px]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-grotesk text-[15px] font-bold tracking-tight text-ink">
          CK<span className="text-accent">.</span>
        </Link>
        <nav className="hidden gap-6 font-mono text-[12.5px] text-[rgb(var(--mute))] sm:flex">
          <a href="#work" className="hover:text-ink">Work</a>
          <Link href="/track-record" className="hover:text-ink">Track record</Link>
          <a href="#writing" className="hover:text-ink">Writing</a>
          <a href="#about" className="hover:text-ink">About</a>
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

type WorkCard = { title: string; kicker: string; tagline: string; stat: string; href: string; external?: boolean };

const WORK: WorkCard[] = [
  ...CASE_STUDIES.map((cs) => ({
    title: cs.title,
    kicker: cs.kicker,
    tagline: cs.tagline,
    stat: cs.metrics[0] ? `${cs.metrics[0].value} · ${cs.metrics[0].label}` : "",
    href: `/work/${cs.slug}`,
  })),
  {
    title: "Stocky AI",
    kicker: "Markets · Verified",
    tagline: "An options engine run on real capital — publicly, third-party-verified returns.",
    stat: "+150% ROI · Sharpe 2.29 · verified",
    href: STOCKY_VERIFIED,
    external: true,
  },
  {
    title: "Perps at Delta",
    kicker: "Product · Derivatives",
    tagline: "Product on perpetual futures — payoff design, PM systems, and the writing behind them.",
    stat: "exchange product · India",
    href: "#about",
  },
];

export function McWork() {
  return (
    <section id="work" className="mx-auto max-w-5xl px-6 py-16 md:py-20">
      <Eyebrow label="Selected work" meta={`/ ${WORK.length}`} />
      <h2 className="mt-3 font-grotesk text-[clamp(1.6rem,3.4vw,2.6rem)] font-bold tracking-[-0.02em] text-ink">
        Things I&apos;ve built
      </h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WORK.map((w) => {
          const inner = (
            <>
              <div className="font-mono text-[11px] text-[rgb(var(--faint))]">{w.kicker}</div>
              <h3 className="mt-2 font-grotesk text-[19px] font-semibold text-ink">{w.title}</h3>
              <p className="mt-2 max-w-[34ch] text-[14px] leading-[1.5] text-[rgb(var(--mute))]">{w.tagline}</p>
              <div className="mt-4 font-mono text-[12px] text-accent">{w.stat}</div>
            </>
          );
          const cls =
            "group block rounded-xl border border-[rgb(var(--rule))] bg-[rgb(var(--panel))] p-5 transition-colors hover:border-accent";
          return w.external ? (
            <a key={w.title} href={w.href} className={cls}>
              {inner}
            </a>
          ) : (
            <Link key={w.title} href={w.href} className={cls}>
              {inner}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function McTrackRecord() {
  return (
    <section className="border-y border-[rgb(var(--rule))] bg-[rgb(var(--panel))]">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <Eyebrow label="Track record" meta="real capital" />
        <div className="mt-6 grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              {[
                ["+150%", "Stocky ROI · verified"],
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
              Stocky&apos;s returns are externally verified on a public Sensibull PnL page. A separate live
              Dhan account is <span className="text-ink">accumulating a smaller, honest sample</span> —
              watch it grow on the track-record page.
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
  const posts = getAllPosts().slice(0, 5);
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
        <div className="mt-6 grid gap-10 md:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-4">
            {BIO.paragraphs.map((para) => (
              <p key={para.slice(0, 24)} className="max-w-[54ch] font-serif text-[clamp(1rem,1.8vw,1.2rem)] leading-[1.6] text-[rgb(var(--mute))]">
                {para}
              </p>
            ))}
          </div>
          <ul className="space-y-2 font-mono text-[12.5px] leading-[1.7] text-[rgb(var(--mute))]">
            {BIO.highlights.map((h) => (
              <li key={h.slice(0, 20)} className="border-l-2 border-[rgb(var(--line-hi))] pl-3">
                {h}
              </li>
            ))}
          </ul>
        </div>
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
          <span className="text-[rgb(var(--faint))]">© {new Date().getFullYear()} {SITE.name}</span>
        </div>
      </div>
    </footer>
  );
}
