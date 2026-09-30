import type { CSSProperties } from "react";
import { COMMAND, INSTALL, MEASURED, NOISE, REPO, SUMMARY } from "@/components/claude-browse/data";
import { Copy } from "./Copy";
import { GitHubIcon } from "./Chrome";

const fmt = (n: number) => n.toLocaleString("en-US");
const LEFT = Array.from({ length: 9 }, (_, i) => fmt((MEASURED.full / 8) * i));
const RIGHT = Array.from({ length: 10 }, (_, i) => fmt((MEASURED.summary / 9) * i));

/* A counter that rolls with CSS steps(). The last value is the resting state. */
function Odometer({ values, side }: { values: string[]; side: "l" | "r" }) {
  return (
    <span className="ss-odo" aria-hidden="true">
      <span className={`ss-odo-in ss-odo-${side}`} style={{ "--n": values.length - 1 } as CSSProperties}>
        {values.map((v) => (
          <span key={v}>{v}</span>
        ))}
      </span>
    </span>
  );
}

export function ReplyLines() {
  return (
    <>
      {SUMMARY.map(([k, v], i) => (
        <span key={i} className="ss-line">
          {k ? <b>{k}</b> : null}
          {v}
        </span>
      ))}
    </>
  );
}

export function Hero() {
  return (
    <section id="top" className="ss-hero">
      <div className="ss-wrap ss-hero-copy">
        <p className="ss-eyebrow">A Claude Code plugin. MIT licence. No API key.</p>
        <h1 className="ss-h1">
          Give Claude a browser.
          <br />
          <span className="ss-acc">Keep your chat light.</span>
        </h1>
        <p className="ss-sub">
          A helper reads the web for you and sends back a short answer. Your chat stays small, fast and cheap.
        </p>
        <div className="ss-cta">
          <Copy />
          <a className="ss-link" href={REPO}>
            <GitHubIcon />
            Read the source
          </a>
        </div>
        <code className="ss-hero-cmd">
          <span aria-hidden="true">$ </span>
          {INSTALL}
        </code>
      </div>

      <div className="ss-wrap ss-hero-mock">
        <div className="ss-split">
          <div className="ss-pane ss-pane-without">
            <div className="ss-pane-top">
              <span className="ss-tag">Without</span>
              <span className="ss-count">
                <Odometer values={LEFT} side="l" />
                <span className="ss-sr">{fmt(MEASURED.full)}</span> tokens in chat
              </span>
            </div>
            <div className="ss-pane-body">
              <p className="ss-bubble">What is the top story on Y Combinator&apos;s news page, with points?</p>
              <p className="ss-note">Claude opens the page and pastes all of it into your chat.</p>
              <div className="ss-paste" aria-label="The page text, pasted into the chat">
                <div className="ss-paste-in">
                  {NOISE.map((l, i) => (
                    <span key={i}>{l}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="ss-meter" aria-hidden="true">
              <i className="ss-meter-l" />
            </div>
          </div>

          <div className="ss-pane ss-pane-with">
            <div className="ss-pane-top">
              <span className="ss-tag ss-tag-acc">With claude-browse</span>
              <span className="ss-count ss-count-acc">
                <Odometer values={RIGHT} side="r" />
                <span className="ss-sr">{MEASURED.summary}</span> tokens in chat
              </span>
            </div>
            <div className="ss-pane-body">
              <p className="ss-bubble ss-mono">{COMMAND}</p>
              <p className="ss-note ss-status">
                <span className="ss-st-a">
                  <i className="ss-dot" aria-hidden="true" /> A helper is reading the page in a hidden browser.
                </span>
                <span className="ss-st-b">The helper read the page. Here is its whole reply, in {MEASURED.seconds} s.</span>
              </p>
              <div className="ss-reply">
                <ReplyLines />
                <span className="ss-cursor" aria-hidden="true" />
                <span className="ss-cover" aria-hidden="true" />
              </div>
            </div>
            <div className="ss-meter" aria-hidden="true">
              <i className="ss-meter-r" />
            </div>
          </div>
        </div>
        <p className="ss-mock-cap">
          Same question, same page, {MEASURED.date}. Left counts the whole page. Right is the real reply, unedited.
        </p>
      </div>
    </section>
  );
}
