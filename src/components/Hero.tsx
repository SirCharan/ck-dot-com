import { HERO } from "@/data/site";

export function Hero() {
  return (
    <section className="pt-16 pb-12 md:pt-24 md:pb-16">
      <p className="kicker mb-6">{HERO.kicker} · {new Date().getFullYear()}</p>
      <h1 className="display text-4xl md:text-6xl leading-[1.05] text-ink max-w-[20ch]">
        {HERO.lede}
      </h1>
    </section>
  );
}
