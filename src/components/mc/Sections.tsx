import Image from "next/image";
import Link from "next/link";
import { SITE, BIO } from "@/data/site";
import { getAllPosts } from "@/lib/blog";
import { getTrackRecord, curveValue } from "@/lib/trackRecord";
import { EquityCurveSvg } from "@/components/lab/EquityCurveSvg";
import { FadeIn } from "@/components/FadeIn";
import { WorkBento } from "@/components/mc/WorkBento";
import stocky from "@/data/stocky-curve.json";

const pctY = (v: number) => `${v >= 0 ? "+" : ""}${Math.round(v)}%`;

/**
 * Mission-Control landing — teaser hub. Wide shell + screenshot bento for work;
 * track record side-by-side; short copy. Detail lives on subpages.
 */

const STOCKY_VERIFIED = "https://web.sensibull.com/verified-pnl/imported-hare/longterm-pnl";

const shell = "mx-auto max-w-[var(--mc-shell)] px-6 md:px-8";

function Eyebrow({ n, label }: { n?: string; label: string }) {
  return (
    <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[rgb(var(--faint))]">
      {n && <span>{n} / </span>}
      {label}
    </div>
  );
}

export function McHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[rgb(var(--rule))] bg-[rgb(var(--bg))]">
      <div className={`flex items-center justify-between py-4 ${shell}`}>
        <Link href="/" className="flex items-center gap-2 font-grotesk text-[15px] font-bold tracking-tight text-ink">
          <Image
            src="/images/signature-neon-trans.png"
            alt=""
            width={36}
            height={36}
            className="h-8 w-8 object-contain grayscale brightness-[1.9]"
            aria-hidden
          />
          <span>CK.</span>
        </Link>
        <nav className="hidden gap-6 font-mono text-[12.5px] text-[rgb(var(--mute))] sm:flex">
          <Link href="/work" className="hover:text-ink">
            Work
          </Link>
          <Link href="/track-record" className="hover:text-ink">
            Track record
          </Link>
          <Link href="/blog" className="hover:text-ink">
            Writing
          </Link>
          <Link href="/resume" className="hover:text-ink">
            About
          </Link>
        </nav>
        <a
          href={SITE.socials.topmate}
          className="rounded-md bg-[rgb(var(--ink))] px-3 py-1.5 font-mono text-[12.5px] text-[rgb(var(--bg))]"
        >
          Book a call
        </a>
      </div>
    </header>
  );
}

export function McWork() {
  return (
    <section id="work" className="border-y border-[rgb(var(--rule))] py-20 md:py-28">
      <div className="mc-section-inner">
        <FadeIn>
          <Eyebrow n="01" label="Selected work" />
        </FadeIn>
        <div className="mt-8">
          <WorkBento />
        </div>
      </div>
    </section>
  );
}

function Chp({ children, tone }: { children: React.ReactNode; tone: "on" | "off" }) {
  const cls =
    tone === "on"
      ? "border-[rgb(var(--ink)/0.3)] text-ink"
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
    <div className="mc-panel flex h-full flex-col rounded-2xl p-6 md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[rgb(var(--faint))]">
            {title}
          </span>
          <Chp tone={methodOn ? "on" : "off"}>{method}</Chp>
          <Chp tone={statusOn ? "on" : "off"}>{status}</Chp>
        </div>
        <span className="font-mono text-[11px] tracking-[0.06em] text-[rgb(var(--faint))]">{meta}</span>
      </div>

      <div className="mt-5 flex flex-1 flex-col gap-5">
        <div>
          <div className="font-grotesk text-[clamp(1.7rem,3.2vw,2.5rem)] font-bold tabular-nums leading-none text-ink">
            {headline}
          </div>
          <div className="mt-2 font-mono text-[12.5px] text-[rgb(var(--mute))]">{sub}</div>
          <p className="mt-3 max-w-[44ch] text-[14.5px] leading-[1.5] text-[rgb(var(--mute))]">{blurb}</p>
          <div className="mt-4 font-mono text-[13px]">{footer}</div>
        </div>
        <div className="mt-auto">{children}</div>
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
    dhanGross != null && e0 > 0
      ? `${dhanGross >= 0 ? "+" : ""}${((dhanGross / e0) * 100).toFixed(1)}%`
      : "—";

  return (
    <section className="border-y border-[rgb(var(--rule))]">
      <div className="mc-section-inner py-20 md:py-28">
        <FadeIn>
          <Eyebrow n="02" label="Track record" />
        </FadeIn>

        <div className="mt-10 grid gap-6 xl:grid-cols-2">
          <AccountBlock
            title="Zerodha · Stocky"
            method="AI"
            methodOn
            status="retired"
            statusOn={false}
            meta="Jun 2025 – May 2026"
            headline="₹15L → ₹31.57L"
            sub={`+110% net · ${H.winRate} win · Sharpe ${H.sharpe} · verified`}
            blurb={
              <>
                Fine-tuned <span className="text-ink">Claude Haiku</span> placed every trade for a year, then
                retired.
              </>
            }
            footer={
              <a href={STOCKY_VERIFIED} className="text-ink underline decoration-[rgb(var(--ink)/0.3)] underline-offset-2 hover:decoration-[rgb(var(--ink)/0.6)]">
                Verified PnL ↗
              </a>
            }
          >
            <EquityCurveSvg series={stocky.series} valueOf={(p) => p.pct} height={190} showAxes formatY={pctY} />
          </AccountBlock>

          <AccountBlock
            title="Dhan · live"
            method="algorithmic"
            methodOn={false}
            status="live"
            statusOn
            meta={dhan?.asOf ? `as of ${dhan.asOf.slice(0, 10)}` : "accumulating"}
            headline={`${dhanPct} return`}
            sub="rule-based · no LLM in the loop · daily"
            blurb={
              <>
                <span className="text-ink">Rule-based algo</span> on my capital · daily rebuild from the trade
                book.
              </>
            }
            footer={
              <Link href="/track-record" className="text-ink hover:text-ink">
                Live track record →
              </Link>
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
    <section id="writing" className={`${shell} py-20 md:py-28`}>
      <FadeIn>
        <Eyebrow n="03" label="Writing" />
        <h2 className="mt-3 font-grotesk text-[clamp(1.6rem,3.4vw,2.6rem)] font-bold tracking-[-0.02em] text-ink">
          On markets, machines &amp; building
        </h2>
      </FadeIn>
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
      <Link href="/blog" className="mt-6 inline-block font-mono text-[13px] text-ink underline decoration-[rgb(var(--ink)/0.3)] underline-offset-2 hover:decoration-[rgb(var(--ink)/0.6)]">
        All writing →
      </Link>
    </section>
  );
}

export function McAbout() {
  return (
    <section id="about" className="border-y border-[rgb(var(--rule))] bg-[rgb(var(--panel)/0.55)]">
      <div className={`${shell} py-20 md:py-28`}>
        <FadeIn>
          <Eyebrow n="04" label="About" />
          <p className="mt-6 max-w-[52ch] font-serif text-[clamp(1.15rem,2vw,1.45rem)] leading-[1.5] text-ink">
            AI Product Manager &amp; Engineer at Delta Exchange — where a model meets a market.
          </p>
          <p className="mt-3 font-mono text-[13px] text-[rgb(var(--mute))]">
            {BIO.highlights[3]}
          </p>
          <Link href="/resume" className="mt-6 inline-block font-mono text-[13px] text-ink underline decoration-[rgb(var(--ink)/0.3)] underline-offset-2 hover:decoration-[rgb(var(--ink)/0.6)]">
            About &amp; résumé →
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

export function McContact() {
  const s = SITE.socials;
  return (
    <footer id="contact" className="border-t border-[rgb(var(--rule))]">
      <div className={`${shell} py-20 md:py-28`}>
        <Eyebrow n="05" label="Contact" />
        <h2 className="mt-4 font-grotesk text-[clamp(1.8rem,4.5vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.02em] text-ink">
          Let&apos;s build something.{" "}
          <a href={s.topmate} className="text-ink underline decoration-[rgb(var(--ink)/0.3)] underline-offset-2 hover:decoration-[rgb(var(--ink)/0.6)]">
            Book a call ↗
          </a>
        </h2>
        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[13px] text-[rgb(var(--mute))]">
          <a href={s.topmate} className="hover:text-ink">
            Topmate ↗
          </a>
          <a href={s.twitter} className="hover:text-ink">
            X / @{SITE.handle}
          </a>
          <a href={s.linkedin} className="hover:text-ink">
            LinkedIn
          </a>
          <a href={s.github} className="hover:text-ink">
            GitHub
          </a>
          <a href={s.telegram} className="hover:text-ink">
            Telegram
          </a>
          <span className="text-[rgb(var(--faint))]">
            © {new Date().getFullYear()} {SITE.name}
          </span>
        </div>

        <div className="mt-12 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
          <Image
            src="/images/signature-neon-trans.png"
            alt={`${SITE.name} CK monogram signature`}
            width={200}
            height={200}
            className="h-24 w-auto opacity-95 grayscale brightness-[1.9] sm:h-28"
            priority={false}
          />
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[rgb(var(--faint))]">
            signed · ck monogram
          </p>
        </div>
      </div>
    </footer>
  );
}
