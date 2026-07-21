import Image from "next/image";
import Link from "next/link";
import { CASE_STUDIES } from "@/data/site";

export type WorkBentoItem = {
  title: string;
  line: string;
  cover: string;
  coverAlt: string;
  live?: string;
  github?: string;
  detail?: string;
};

const STOCKY_VERIFIED =
  "https://web.sensibull.com/verified-pnl/imported-hare/longterm-pnl";

/** Primary 2×2: Drishti · Timelock · Stocky · Delta Support Audit. Andrea sits below. */
export function defaultWorkBentoItems(): WorkBentoItem[] {
  const bySlug = Object.fromEntries(CASE_STUDIES.map((c) => [c.slug, c]));
  const cover = (slug: string, fallback: string, alt: string) => {
    const shot = bySlug[slug]?.shots?.[0];
    return { cover: shot?.src ?? fallback, coverAlt: shot?.alt ?? alt };
  };

  return [
    {
      title: "Drishti",
      line: bySlug.drishti?.tagline ?? "Live LLM signals · real capital.",
      ...cover(
        "drishti",
        "/images/work/drishti/equity-curve.png",
        "Drishti equity curve and live stats",
      ),
      live: "https://drishti-beryl.vercel.app",
      detail: "/work/drishti",
    },
    {
      title: "Timelock",
      line: bySlug.timelock?.tagline ?? "Oracle-less DeFi perps.",
      ...cover(
        "timelock",
        "/images/work/timelock/perps-terminal.jpg",
        "Timelock Protected Perps trading terminal",
      ),
      live: "https://perps.timelock.trade/",
      detail: "/work/timelock",
    },
    {
      title: "Stocky AI",
      line: "Claude trading Indian F&O · +110% · 73% win · verified.",
      cover: "/images/stocky/stocky-terminal.png",
      coverAlt: "Stocky Terminal — multi-panel market intelligence dashboard",
      live: STOCKY_VERIFIED,
      github: "https://github.com/SirCharan/Zerodha-MCP-Tradin",
      detail: "/markets",
    },
    {
      title: "Delta Support Audit",
      line: bySlug["delta-support-audit"]?.tagline ?? "Nightly RAG audit of support articles.",
      ...cover(
        "delta-support-audit",
        "/images/work/delta-support-audit/cover.png",
        "Delta Support Audit dashboard",
      ),
      live: "https://delta-support-audit.vercel.app/",
      detail: "/work/delta-support-audit",
    },
  ];
}

export function andreaWorkItem(): WorkBentoItem {
  const bySlug = Object.fromEntries(CASE_STUDIES.map((c) => [c.slug, c]));
  const shot = bySlug["andrea-world"]?.shots?.[0];
  return {
    title: "Andrea's World",
    line: bySlug["andrea-world"]?.tagline ?? "Hand-built interactive 3D web world.",
    cover: shot?.src ?? "/images/work/andrea-world/cover.png",
    coverAlt: shot?.alt ?? "Andrea's World interactive island",
    live: "https://andrea-world.vercel.app",
    detail: "/work/andrea-world",
  };
}

export function secondBrainWorkItem(): WorkBentoItem {
  return {
    title: "Second Brain",
    line: "Local-first memory for Claude Code — every AI session captured to Markdown on your disk. Open source.",
    cover: "/images/work/second-brain/cover.png",
    coverAlt: "Second Brain — the chat ends, the memory stays",
    github: "https://github.com/SirCharan/second-brain",
    detail: "/second-brain",
  };
}

function Chip({ href, children, internal }: { href: string; children: React.ReactNode; internal?: boolean }) {
  const cls =
    "relative z-10 font-mono text-[12px] text-[rgb(var(--mute))] transition-colors hover:text-accent";
  return internal ? (
    <Link href={href} className={cls}>
      {children}
    </Link>
  ) : (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function Card({
  item,
  priority,
  className = "",
}: {
  item: WorkBentoItem;
  priority?: boolean;
  className?: string;
}) {
  const detailHref = item.detail ?? "#";
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[rgb(var(--rule))] bg-[rgb(var(--panel)/0.55)] transition-[border-color,box-shadow,transform] hover:border-[rgb(var(--accent)/0.45)] hover:border-[rgb(var(--accent)/0.4)] ${className}`}
    >
      <Link href={detailHref} className="absolute inset-0 z-0" aria-label={`${item.title} details`} />
      <div className="relative aspect-[16/10] overflow-hidden border-b border-[rgb(var(--rule))]">
        <Image
          src={item.cover}
          alt={item.coverAlt}
          fill
          sizes="(min-width:1024px) 45vw, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          priority={priority}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg)/0.85)] via-transparent to-transparent"
        />
      </div>
      <div className="relative z-10 flex flex-1 flex-col p-4 md:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h3 className="font-grotesk text-[clamp(1.15rem,2vw,1.45rem)] font-bold tracking-[-0.01em] text-accent transition-[text-shadow] group-hover:[text-shadow:0_0_18px_rgb(var(--accent)/0.4)]">
            {item.title}
          </h3>
          <div className="flex flex-wrap gap-x-3">
            {item.live && <Chip href={item.live}>live ↗</Chip>}
            {item.github && <Chip href={item.github}>github ↗</Chip>}
            {item.detail && (
              <Chip href={item.detail} internal>
                details →
              </Chip>
            )}
          </div>
        </div>
        <p className="mt-1.5 max-w-[48ch] text-[14.5px] leading-[1.45] text-[rgb(var(--mute))]">{item.line}</p>
      </div>
    </article>
  );
}

export function WorkBento({
  items = defaultWorkBentoItems(),
  below,
  footerHref = "/work",
  footerLabel = "All work & tools →",
}: {
  items?: WorkBentoItem[];
  /** Optional row under the 2×2 (e.g. Andrea). */
  below?: WorkBentoItem[];
  footerHref?: string;
  footerLabel?: string;
}) {
  const under = below ?? [andreaWorkItem(), secondBrainWorkItem()];
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
        {items.map((item, i) => (
          <Card key={item.title} item={item} priority={i === 0} />
        ))}
      </div>
      {under.length > 0 && (
        <div className={`mt-4 grid gap-4 lg:gap-5 ${under.length === 1 ? "sm:grid-cols-1" : "sm:grid-cols-2"}`}>
          {under.map((item) => (
            <Card key={item.title} item={item} className={under.length === 1 ? "sm:max-w-xl" : ""} />
          ))}
        </div>
      )}
      {footerHref && (
        <Link href={footerHref} className="mt-6 inline-block font-mono text-[13px] text-accent hover:underline">
          {footerLabel}
        </Link>
      )}
    </div>
  );
}
