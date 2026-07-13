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
  featured?: boolean;
};

const STOCKY_VERIFIED =
  "https://web.sensibull.com/verified-pnl/imported-hare/longterm-pnl";

/** Home + /work shared covers. Prefer CASE_STUDIES shots[0]; Stocky is markets pillar. */
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
      ...cover("drishti", "/images/work/drishti/feed.png", "Drishti live feed"),
      live: "https://drishti-beryl.vercel.app",
      detail: "/work/drishti",
      featured: true,
    },
    {
      title: "Timelock",
      line: bySlug.timelock?.tagline ?? "Oracle-less DeFi perps.",
      ...cover("timelock", "/images/work/timelock/protected-perps.jpg", "Timelock Protected Perps"),
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
    {
      title: "Andrea's World",
      line: bySlug["andrea-world"]?.tagline ?? "Hand-built interactive 3D web world.",
      ...cover("andrea-world", "/images/work/andrea-world/cover.png", "Andrea's World interactive island"),
      live: "https://andrea-world.vercel.app",
      detail: "/work/andrea-world",
    },
  ];
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

function Card({ item, priority }: { item: WorkBentoItem; priority?: boolean }) {
  const detailHref = item.detail ?? "#";
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[rgb(var(--rule))] bg-[rgb(var(--panel)/0.55)] transition-[border-color,box-shadow] hover:border-[rgb(var(--accent)/0.45)] hover:shadow-[0_0_28px_-8px_rgb(var(--accent)/0.35)] ${
        item.featured ? "lg:col-span-7 lg:row-span-2" : "lg:col-span-5"
      }`}
    >
      <Link
        href={detailHref}
        className="absolute inset-0 z-0"
        aria-label={`${item.title} details`}
      />
      <div
        className={`relative overflow-hidden border-b border-[rgb(var(--rule))] ${
          item.featured ? "aspect-[16/10] lg:aspect-auto lg:min-h-[16rem] lg:flex-1" : "aspect-[16/10]"
        }`}
      >
        <Image
          src={item.cover}
          alt={item.coverAlt}
          fill
          sizes={item.featured ? "(min-width:1024px) 58vw, 100vw" : "(min-width:1024px) 40vw, 100vw"}
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
  footerHref = "/work",
  footerLabel = "All work & tools →",
}: {
  items?: WorkBentoItem[];
  footerHref?: string;
  footerLabel?: string;
}) {
  const [featured, ...rest] = items;
  // Layout: featured left (spans 2 rows) + first of rest stacked right; remaining full-width row of 3
  const side = rest.slice(0, 2);
  const bottom = rest.slice(2);

  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
        {featured && <Card item={{ ...featured, featured: true }} priority />}
        {side.map((item) => (
          <Card key={item.title} item={{ ...item, featured: false }} />
        ))}
      </div>
      {bottom.length > 0 && (
        <div
          className={`mt-4 grid gap-4 lg:gap-5 ${
            bottom.length === 1
              ? "lg:grid-cols-1"
              : bottom.length === 2
                ? "lg:grid-cols-2"
                : "lg:grid-cols-3"
          }`}
        >
          {bottom.map((item) => (
            <Card key={item.title} item={{ ...item, featured: false }} />
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
