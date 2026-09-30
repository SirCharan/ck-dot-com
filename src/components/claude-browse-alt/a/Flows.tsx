import { MEASURED } from "@/components/claude-browse/data";
import { fmt } from "./util";

const NODES: [string, string, string][] = [
  ["You", "Type /browse and a question", "01"],
  ["Helper", "A second Claude (Sonnet) that does the reading", "02"],
  ["Browser", "Opens the page, reads, clicks", "03"],
  ["Your chat", `Gets 12 lines, about ${MEASURED.summary} tokens`, "04"],
];

function PageGlyph() {
  return (
    <svg viewBox="0 0 20 24" width="20" height="24" aria-hidden="true">
      <path d="M2 1.5h11l5 5v16H2z" className="ra-pg" />
      <path d="M5 9h9M5 12.5h9M5 16h6" className="ra-pg-l" />
    </svg>
  );
}

export function Pipeline() {
  return (
    <figure className="ra-pipe ra-rv" aria-label="Flow: you ask, the helper opens a browser, 12 lines come back to your chat. The pages stay behind.">
      <ol className="ra-pipe-row">
        {NODES.map(([t, d, n], i) => (
          <li key={t} className={`ra-node ${i === 3 ? "is-on" : ""}`}>
            <span className="ra-node-n">{n}</span>
            <b>{t}</b>
            <span>{d}</span>
            {i < 3 && (
              <span className={`ra-link ${i === 2 ? "is-drop" : ""}`} aria-hidden="true">
                <span className="ra-link-line" />
                {i === 2 && (
                  <span className="ra-fall">
                    <PageGlyph /><PageGlyph /><PageGlyph />
                  </span>
                )}
              </span>
            )}
          </li>
        ))}
      </ol>
      <figcaption className="ra-cap">At the last hop the page falls away. Only the 12-line reply goes on.</figcaption>
    </figure>
  );
}

const KEYS: [string, string][] = [
  ["RESULT", "The answer, in one line"],
  ["KEY DATA", "The facts it found"],
  ["SOURCES", "The pages it used"],
  ["ARTIFACTS", "Files it saved, like screenshots"],
  ["SESSION | BLOCKERS", "Which window it used, and what stopped it"],
];

export function ReplyShape() {
  return (
    <div className="ra-shape ra-rv">
      <p className="ra-shape-h">Every reply has the same 5 parts, 12 lines at most</p>
      <ul>
        {KEYS.map(([k, d]) => <li key={k}><code>{k}</code><span>{d}</span></li>)}
      </ul>
    </div>
  );
}

export function EngineFlow() {
  return (
    <figure className="ra-ef ra-rv" aria-label="Decision: if the site needs your login, use your own Chrome. If not, use the private browser.">
      <div className="ra-ef-start">A question needs the web</div>
      <div className="ra-ef-q">
        <svg viewBox="0 0 240 96" preserveAspectRatio="none" aria-hidden="true"><polygon points="120,2 238,48 120,94 2,48" /></svg>
        <span>Does the site need your login?</span>
      </div>
      <div className="ra-ef-br">
        <div className="ra-ef-b">
          <span className="ra-ef-lbl">No</span>
          <div className="ra-ef-card is-on">
            <b>Private browser</b>
            <small>default · agent-browser</small>
            <ul><li>Hidden, just for the helper</li><li>Starts clean, sees none of your logins</li><li>Only the sites you allow</li></ul>
          </div>
        </div>
        <div className="ra-ef-b">
          <span className="ra-ef-lbl">Yes</span>
          <div className="ra-ef-card">
            <b>Your own Chrome</b>
            <small>already logged in · browser-harness</small>
            <ul><li>The Chrome you already have open</li><li>Whatever you are signed in to</li><li>Any site, with a warning</li></ul>
          </div>
        </div>
      </div>
    </figure>
  );
}

const RUN: [string, string][] = [
  ["0 s", "You ask for the top story"],
  ["", "Helper opens a private window, ab-hn-top"],
  ["", `It reads the clickable parts, about ${fmt(MEASURED.compact)} tokens`],
  ["", "It writes the 12-line reply and closes the window"],
  [`${MEASURED.seconds} s`, "The reply lands in your chat"],
];

export function RunTimeline() {
  return (
    <figure className="ra-tl ra-rv">
      <figcaption className="ra-chart-h"><span>One real run, start to finish</span><span className="ra-pill">Measured {MEASURED.seconds} s</span></figcaption>
      <ol>
        {RUN.map(([t, d], i) => (
          <li key={d} className={i === RUN.length - 1 ? "is-on" : ""}>
            <span className="ra-tl-dot" aria-hidden="true" />
            <span className="ra-tl-t">{t || "·"}</span>
            <span>{d}</span>
          </li>
        ))}
      </ol>
      <p className="ra-cap">Only the start and the end are timed.</p>
    </figure>
  );
}

export function Guardrails() {
  return (
    <div className="ra-guard ra-rv">
      <div className="ra-g">
        <span className="ra-g-n">Gate 1</span>
        <b>Allowed sites only</b>
        <p>You name the sites when you start (an allowlist). Anything else is refused before the browser moves.</p>
        <div className="ra-g-demo">
          <span className="ra-g-row is-ok"><i>pass</i>news.ycombinator.com</span>
          <span className="ra-g-row is-no"><i>stop</i>any other site · exit 3</span>
        </div>
      </div>
      <span className="ra-g-arrow" aria-hidden="true" />
      <div className="ra-g">
        <span className="ra-g-n">Gate 2</span>
        <b>A fingerprint, never the words</b>
        <p>The log keeps a short fingerprint of each page it saw. The text itself is never saved.</p>
        <div className="ra-g-demo">
          <span className="ra-g-row is-ok"><i>kept</i>page fingerprint</span>
          <span className="ra-g-row is-no"><i>never</i>page words</span>
        </div>
      </div>
      <span className="ra-g-arrow" aria-hidden="true" />
      <div className="ra-g">
        <span className="ra-g-n">Gate 3</span>
        <b>It closes only what it started</b>
        <p>Every window has an owner in the ledger. Cleanup leaves other windows alone.</p>
        <div className="ra-g-demo">
          <span className="ra-g-row is-ok"><i>close</i>windows it opened</span>
          <span className="ra-g-row is-no"><i>skip</i>everyone else&apos;s</span>
        </div>
      </div>
    </div>
  );
}
