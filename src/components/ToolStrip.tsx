import { TOOLS } from "@/data/site";

export function ToolStrip() {
  return (
    <section id="tools" className="py-10 md:py-14 rule">
      <p className="kicker mb-6">Tools</p>
      <ul className="divide-y divide-rule">
        {TOOLS.map((tool) => (
          <li key={tool.title} className="py-5 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 md:gap-6 items-baseline">
            <div>
              <div className="display text-lg text-ink leading-snug">
                {tool.title}
              </div>
              <p className="mt-1 text-sm text-mute leading-relaxed max-w-[58ch]">
                {tool.one}
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm shrink-0">
              {tool.live && (
                <a
                  href={tool.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-ink"
                >
                  {tool.liveLabel ?? "Live"} →
                </a>
              )}
              {tool.github && (
                <a
                  href={tool.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-ink"
                >
                  Code →
                </a>
              )}
              {tool.verified && !tool.live && (
                <a
                  href={tool.verified}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-ink"
                >
                  Verified →
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
