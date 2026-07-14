import { RESEARCH } from "@/data/site";

export function Research() {
  if (RESEARCH.length === 0) return null;
  return (
    <section id="research" className="py-10 md:py-14 rule">
      <p className="kicker mb-6">Research</p>
      <ul className="space-y-5">
        {RESEARCH.map((r) => (
          <li key={r.title}>
            <div className="flex items-baseline gap-3 flex-wrap">
              <a
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="display text-lg text-ink hover:text-ink transition-colors"
              >
                {r.title}
              </a>
              <span className="text-sm text-mute">{r.venue}</span>
            </div>
            <p className="mt-1 text-sm text-mute leading-relaxed max-w-[62ch]">
              {r.one}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
