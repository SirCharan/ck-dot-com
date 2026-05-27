import { BIO } from "@/data/site";

export function Bio() {
  return (
    <section id="about" className="py-10 md:py-14 rule">
      <p className="kicker mb-4">About</p>
      <div className="space-y-4 max-w-[62ch]">
        {BIO.paragraphs.map((p, i) => (
          <p key={i} className="text-base md:text-lg text-ink/90 leading-relaxed">
            {p}
          </p>
        ))}
      </div>
      <ul className="mt-6 space-y-2 max-w-[62ch] text-base text-ink/85">
        {BIO.highlights.map((h, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-mute mt-2 shrink-0">—</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
