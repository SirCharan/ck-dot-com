import Link from "next/link";
import { SITE, BIO } from "@/data/site";
import { getAllPosts } from "@/lib/blog";
import { getTrackRecord, curveValue } from "@/lib/trackRecord";
import { EquityCurveSvg } from "@/components/lab/EquityCurveSvg";
import stocky from "@/data/stocky-curve.json";

const pctY = (v: number) => `${v >= 0 ? "+" : ""}${Math.round(v)}%`;

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

function Chp({ children, tone }: { children: React.ReactNode; tone: "on" | "off" }) {
  const cls =
    tone === "on"
      ? "border-[rgb(var(--accent)/0.45)] text-accent"
      : "border-[rgb(var(--faint)/0.4)] text-[rgb(var(--faint))]";
  return (
    <span className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${cls}`}>
      {children}
    </span>
  );
}

function AccountBlock({
  title,
  method,
  methodOn,
  status,
  statusOn,
  meta,
  headline,
  sub,
  blurb,
  footer,
  children,
}: {
  title: string;
  method: string;
  methodOn: boolean;
  status: string;
  statusOn: boolean;
  meta: string;
  headline: string;
  sub: string;
  blurb: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[rgb(var(--rule))] border-t-[rgb(var(--line-hi))] bg-[rgb(var(--bg))] p-6 md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[rgb(var(--faint))]">{title}</span>
          <Chp tone={methodOn ? "on" : "off"}>{method}</Chp>
          <Chp tone={statusOn ? "on" : "off"}>{status}</Chp>
        </div>
        <span className="font-mono text-[11px] tracking-[0.06em] text-accent">{meta}</span>
      </div>

      <div className="mt-5 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:items-center">
        <div>
          <div className="font-grotesk text-[clamp(1.7rem,3.2vw,2.5rem)] font-bold tabular-nums leading-none text-ink">
            {headline}
          </div>
          <div className="mt-2 font-mono text-[12.5px] text-accent">{sub}</div>
          <p className="mt-4 max-w-[44ch] text-[14.5px] leading-[1.6] text-[rgb(var(--mute))]">{blurb}</p>
          <div className="mt-5 font-mono text-[13px]">{footer}</div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export async function McTrackRecord() {
  const dhan = await getTrackRecord();
  const H = stocky.headline;
  const e0 = dhan?.meta?.e0 ?? 0;
  const dhanGross = dhan?.metrics?.grossCumulative ?? dhan?.metrics?.cumulative ?? null;
  const dhanPct =
    dhanGross != null && e0 > 0 ? `${dhanGross >= 0 ? "+" : ""}${((dhanGross / e0) * 100).toFixed(1)}%` : "—";

  return (
    <section className="border-y border-[rgb(var(--rule))] bg-[rgb(var(--panel))]">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <Eyebrow label="Track record" meta="real capital, two accounts" />
        <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.6] text-[rgb(var(--mute))]">
          Two accounts, two methods — one an <span className="text-ink">AI that placed its own trades</span>, one a{" "}
          <span className="text-ink">rule-based algorithm running live</span>. Both on real capital, shown in the open.
        </p>

        <div className="mt-10 space-y-6">
          {/* Zerodha / Stocky — the AI account (retired) */}
          <AccountBlock
            title="Zerodha · Stocky"
            method="AI"
            methodOn
            status="retired"
            statusOn={false}
            meta="Jun 2025 – May 2026"
            headline="₹15L → ₹31.6L"
            sub={`+110% net · ${H.winRate} win · Sharpe ${H.sharpe} · externally verified`}
            blurb={
              <>
                A fine-tuned <span className="text-ink">Claude Haiku</span> model that read the market and placed
                every trade itself — Indian F&amp;O and commodities. Ran for a year, then retired.
              </>
            }
            footer={
              <a href={STOCKY_VERIFIED} className="text-accent hover:underline">Verified PnL ↗</a>
            }
          >
            <EquityCurveSvg series={stocky.series} valueOf={(p) => p.pct} height={190} showAxes formatY={pctY} />
          </AccountBlock>

          {/* Dhan — the algorithmic account (live) */}
          <AccountBlock
            title="Dhan · live"
            method="algorithmic"
            methodOn={false}
            status="live"
            statusOn
            meta={dhan?.asOf ? `as of ${dhan.asOf.slice(0, 10)}` : "accumulating"}
            headline={`${dhanPct} return`}
            sub="rule-based · no LLM in the loop · updates daily"
            blurb={
              <>
                A <span className="text-ink">rule-based algorithm</span> — not AI — trading my own capital in the
                open. Reconstructed from the trade book every day; a real, honest sample as it accrues.
              </>
            }
            footer={
              <Link href="/track-record" className="text-ink hover:text-accent">Live track record →</Link>
            }
          >
            {dhan && dhan.series.length >= 2 ? (
              <EquityCurveSvg
                series={dhan.series}
                valueOf={(s) => (e0 > 0 ? (curveValue(s) / e0) * 100 : 0)}
                height={190}
                showAxes
                formatY={pctY}
                provisional={dhan.provisional}
              />
            ) : (
              <div className="grid h-[190px] place-items-center rounded-lg border border-dashed border-[rgb(var(--accent)/0.3)]">
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[rgb(var(--mute))]">
                  accumulating from live data
                </span>
              </div>
            )}
          </AccountBlock>
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
          AI Product Manager &amp; Engineer at Delta Exchange. I work where a model meets a
          market — where the AI has to be right <em>and</em> the trade has to fill. I&apos;ve founded
          two trading companies, run a hedge-fund book, and now build those systems end to end.
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
          <span className="text-[rgb(var(--faint))]">© {new Date().getFullYear()} {SITE.name}</span>
        </div>
      </div>
    </footer>
  );
}
