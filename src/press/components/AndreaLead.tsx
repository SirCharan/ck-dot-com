"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";

export function AndreaLead({
  title,
  line,
  cover,
  alt,
}: {
  title: string;
  line: string;
  cover: string;
  alt: string;
}) {
  const [playing, setPlaying] = useState(false);
  return (
    <article className="press-lead">
      <div className="press-lead-stage" data-playing={playing}>
        {playing ? (
          <iframe src="/andrea-world" title="Andrea's World, interactive 3D island" allow="fullscreen" />
        ) : (
          <>
            <Image
              src={cover}
              alt={alt}
              fill
              sizes="(min-width:1152px) 72rem, 100vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <button type="button" className="press-play" onClick={() => setPlaying(true)}>
              <Play size={18} aria-hidden fill="currentColor" />
              Play
            </button>
          </>
        )}
      </div>
      <div className="press-lead-foot">
        <div>
          <h3>{title}</h3>
          <p>{line}</p>
        </div>
        <a className="press-lead-open" href="/andrea-world">
          Open full screen →
        </a>
      </div>
    </article>
  );
}
