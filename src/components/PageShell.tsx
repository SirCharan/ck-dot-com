import type { ReactNode } from "react";
import { McHeader, McContact } from "./mc/Sections";

/** Mission-control chrome shared by the homepage's siblings (section pages). */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="mc relative min-h-dvh overflow-x-clip">
      <McHeader />
      <main className="relative z-10 mx-auto max-w-3xl px-6">{children}</main>
      <McContact />
    </div>
  );
}

/** Compact page intro (kicker + serif title + lede) for section pages. */
export function PageIntro({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede: string;
}) {
  return (
    <section className="pt-12 pb-8 md:pt-16 md:pb-10">
      <p className="kicker mb-4">{kicker}</p>
      <h1 className="display text-4xl leading-[1.05] text-ink md:text-6xl">{title}</h1>
      <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink/85">{lede}</p>
    </section>
  );
}
