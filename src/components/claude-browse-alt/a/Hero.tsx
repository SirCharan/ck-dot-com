import type { CSSProperties } from "react";
import { INSTALL, REPO } from "@/components/claude-browse/data";
import { CopyButton } from "./CopyButton";
import { MSGS, PER_OFF, PER_ON, fmt, pad } from "./util";

const LINKS: [string, string][] = [["#problem", "Problem"], ["#how", "How it works"], ["#proof", "Proof"], ["#safety", "Safety"], ["#start", "Install"]];

export function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className="ra-ico">
      <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

export function Nav() {
  return (
    <header className="ra-nav">
      <div className="ra-wrap ra-nav-in">
        <a href="#top" className="ra-mark"><span className="ra-mark-dot" aria-hidden="true" />claude-browse</a>
        <nav aria-label="Sections" className="ra-nav-links">
          {LINKS.map(([h, t]) => <a key={h} href={h}>{t}</a>)}
        </nav>
        <div className="ra-nav-end">
          <a href={REPO} className="ra-nav-gh" aria-label="claude-browse on GitHub"><GitHubIcon /><span>GitHub</span></a>
          <CopyButton text={INSTALL} label="Copy install" variant="small" />
        </div>
      </div>
    </header>
  );
}

function Receipt({ on }: { on: boolean }) {
  const per = on ? PER_ON : PER_OFF;
  const scale = { "--s": per / PER_OFF } as CSSProperties;
  return (
    <figure className={`ra-rc ${on ? "is-on" : "is-off"}`}>
      <figcaption className="ra-rc-h">
        <span>{on ? "With claude-browse" : "Without claude-browse"}</span>
        <span className="ra-rc-tag">{on ? "12 lines per page" : "whole page"}</span>
      </figcaption>
      <div className="ra-rc-cols" aria-hidden="true"><span>msg</span><span>added</span><span>chat size</span></div>
      <div className="ra-rc-body">
        <ol className="ra-rc-rows">
          {MSGS.map((n) => (
            <li key={n}><span>{pad(n)}</span><span>+{fmt(per)}</span><span>{fmt(per * n)}</span></li>
          ))}
        </ol>
        <span className="ra-rc-cover" aria-hidden="true" />
      </div>
      <div className="ra-rc-total">
        <span>Chat size</span>
        <span className="ra-odo" aria-hidden="true">
          <span className="ra-odo-col">{MSGS.map((n) => <span key={n}>{fmt(per * n)}</span>)}</span>
        </span>
        <span className="ra-sr">{fmt(per * 10)} tokens after 10 messages</span>
      </div>
      <div className="ra-rc-bar" aria-hidden="true"><i style={scale} /></div>
    </figure>
  );
}

export function Hero() {
  return (
    <section className="ra-hero" id="top">
      <div className="ra-wrap ra-hero-grid">
        <div className="ra-hero-copy">
          <p className="ra-eyebrow">Claude Code plugin · MIT · no API key</p>
          <h1 className="ra-h1">Give Claude a browser.<br /><span className="ra-acc">Keep your chat light.</span></h1>
          <p className="ra-lede">A helper reads the web for you and sends back 12 short lines. The pages never enter your chat.</p>
          <div className="ra-cta">
            <CopyButton text={INSTALL} label="Copy install command" />
            <a href={REPO} className="ra-btn ra-btn-ghost"><GitHubIcon /><span>View the source</span></a>
          </div>
          <p className="ra-fine">Runs on macOS and Linux, inside the Claude Code you already use.</p>
        </div>
        <div className="ra-meter">
          <div className="ra-meter-pair">
            <Receipt on={false} />
            <Receipt on />
          </div>
          <p className="ra-cap">
            <span className="ra-pill ra-pill-dim">Illustrative</span> 10 messages, each reading one page like the one we measured: {fmt(PER_OFF)} tokens whole, {fmt(PER_ON)} back. A token is roughly a word, and tokens are what you pay for.
          </p>
        </div>
      </div>
    </section>
  );
}
