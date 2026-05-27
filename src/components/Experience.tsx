import { EXPERIENCE } from "@/data/site";

export function Experience() {
  return (
    <section id="experience" className="py-10 md:py-14 rule">
      <p className="kicker mb-6">Work</p>
      <ul className="space-y-7">
        {EXPERIENCE.map((exp) => (
          <li key={exp.company} className="grid grid-cols-[1fr] md:grid-cols-[12rem_1fr] gap-2 md:gap-8">
            <div>
              <div className="display text-lg text-ink leading-tight">
                {exp.company}
              </div>
              <div className="text-sm text-mute mt-0.5 num">{exp.duration}</div>
              <div className="text-sm text-mute italic mt-0.5">{exp.position}</div>
            </div>
            <div>
              <p className="text-base text-ink/90 leading-relaxed">{exp.one}</p>
              {exp.bullets && exp.bullets.length > 0 && (
                <ul className="mt-3 space-y-1.5 text-[0.95rem] text-ink/85">
                  {exp.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="flex gap-3 leading-relaxed [&_a]:link-ink"
                    >
                      <span className="text-mute mt-1.5 shrink-0">·</span>
                      <span dangerouslySetInnerHTML={{ __html: b.html }} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
