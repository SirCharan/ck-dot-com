import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { COMPARE, DOCTOR, FAQ, INSTALL, LEDGER, MEASURED, STEPS } from "@/components/claude-browse/data";
import { Copy } from "./Copy";
import { ReplyLines } from "./Hero";

const fmt = (n: number) => n.toLocaleString("en-US");
const v = (i: number) => ({ "--i": i }) as CSSProperties;

function Pair({
  id,
  n,
  title,
  lede,
  left,
  right,
  leftCap,
  rightCap,
  children,
}: {
  id: string;
  n: string;
  title: ReactNode;
  lede: string;
  left: ReactNode;
  right: ReactNode;
  leftCap: string;
  rightCap: string;
  children?: ReactNode;
}) {
  return (
    <section id={id} className="ss-sec" aria-labelledby={`${id}-h`}>
      <div className="ss-wrap">
        <header className="ss-head ss-r">
          <span className="ss-num">{n}</span>
          <h2 id={`${id}-h`}>{title}</h2>
          <p>{lede}</p>
        </header>
        <div className="ss-split ss-r">
          <div className="ss-panel">
            <span className="ss-tag">Without</span>
            <div className="ss-fig">{left}</div>
            <p className="ss-cap">{leftCap}</p>
          </div>
          <div className="ss-panel ss-panel-with">
            <span className="ss-tag ss-tag-acc">With claude-browse</span>
            <div className="ss-fig">{right}</div>
            <p className="ss-cap">{rightCap}</p>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

/* 1. Chat weight. Same y scale on both charts so the gap is honest. */
const MAX = MEASURED.full * 10;
function Stack({ per, acc }: { per: number; acc?: boolean }) {
  const H = 150;
  const base = 172;
  const seg = (per / MAX) * H;
  return (
    <svg viewBox="0 0 320 200" className="ss-chart" role="img" aria-label={`Tokens re-sent per message, rising to ${fmt(per * 10)} by message 10`}>
      {[0, 0.5, 1].map((t) => (
        <g key={t}>
          <line x1="44" x2="316" y1={base - t * H} y2={base - t * H} className="ss-grid" />
          <text x="40" y={base - t * H + 4} className="ss-axis" textAnchor="end">
            {t === 0 ? "0" : `${fmt((MAX * t) / 1000)}k`}
          </text>
        </g>
      ))}
      {Array.from({ length: 10 }, (_, k) => {
        const m = k + 1;
        const x = 52 + k * 26;
        const tall = seg * m;
        return (
          <g key={m} className="ss-grow" style={v(k)}>
            {acc ? (
              <rect x={x} y={base - Math.max(tall, 1.5)} width="18" height={Math.max(tall, 1.5)} className="ss-bar-acc" />
            ) : (
              Array.from({ length: m }, (_, s) => (
                <rect key={s} x={x} y={base - seg * (s + 1)} width="18" height={seg - 1.5} className="ss-bar" />
              ))
            )}
            {m === 1 || m === 10 ? (
              <text x={x + 9} y={base - Math.max(tall, 1.5) - 6} className="ss-val" textAnchor="middle">
                {fmt(per * m)}
              </text>
            ) : null}
          </g>
        );
      })}
      {[1, 5, 10].map((m) => (
        <text key={m} x={52 + (m - 1) * 26 + 9} y="190" className="ss-axis" textAnchor="middle">
          {m}
        </text>
      ))}
      <text x="316" y="190" className="ss-axis" textAnchor="end">
        message
      </text>
    </svg>
  );
}

const sum10 = (per: number) => per * 55;

export function Weight() {
  return (
    <Pair
      id="weight"
      n="01"
      title="Every message carries every page again."
      lede="Claude re-sends the whole chat with each new message. A token is about one word, and tokens are what you pay for."
      left={
        <>
          <Stack per={MEASURED.full} />
          <p className="ss-big">{fmt(sum10(MEASURED.full))} <small>tokens sent over 10 messages</small></p>
        </>
      }
      right={
        <>
          <Stack per={MEASURED.summary} acc />
          <p className="ss-big ss-acc">{fmt(sum10(MEASURED.summary))} <small>tokens sent over 10 messages</small></p>
        </>
      }
      leftCap="One page read, then 9 more messages. Each one re-sends about 6,400 tokens of page."
      rightCap="Same scale as the left chart. The bars are real, just very short."
    >
      <p className="ss-foot-note ss-r">
        Illustrative. It assumes one page read per message, from the {MEASURED.date} figures: about {fmt(MEASURED.full)} tokens per page
        without, about {MEASURED.summary} with.
      </p>
    </Pair>
  );
}

/* 2. How it works. Two flowcharts, then the reply shape, the timeline and the two browsers. */
function Flow({ steps, acc }: { steps: [string, string?][]; acc?: boolean }) {
  return (
    <ol className={`ss-flow${acc ? " ss-flow-acc" : ""}`}>
      {steps.map(([t, badge], i) => (
        <li key={t} style={v(i)}>
          <span className="ss-flow-n" aria-hidden="true">{i + 1}</span>
          <span>{t}</span>
          {badge ? <b className="ss-badge">{badge}</b> : null}
        </li>
      ))}
    </ol>
  );
}

const KEYS: [string, string][] = [
  ["RESULT", "the answer"],
  ["KEY DATA", "the facts and numbers"],
  ["SOURCES", "where it looked"],
  ["ARTIFACTS", "files it saved"],
  ["SESSION | BLOCKERS", "which window, and what got in the way"],
];

export function How() {
  return (
    <Pair
      id="how"
      n="02"
      title="A helper reads the page. Your chat gets the answer."
      lede="You ask Claude the way you always do. A second, smaller Claude (a sub-agent) does the browsing and reports back."
      left={
        <Flow
          steps={[
            ["You ask a question that needs the web"],
            ["Claude opens the page itself"],
            ["The whole page lands in your chat", `${fmt(MEASURED.full)} tokens`],
            ["It is re-sent with every later message"],
          ]}
        />
      }
      right={
        <Flow
          acc
          steps={[
            ["You ask with /browse"],
            ["A helper (a Sonnet sub-agent) opens a browser"],
            ["It reads and clicks. The pages stay with it."],
            ["It sends back 12 lines at most"],
            ["Your chat keeps only the reply", `${MEASURED.summary} tokens`],
          ]}
        />
      }
      leftCap="The page becomes part of the chat for good."
      rightCap="The page never enters your chat. Only the short reply does."
    >
      <div className="ss-row ss-r">
        <div className="ss-card">
          <h3>Every reply has the same 5 parts</h3>
          <ul className="ss-keys">
            {KEYS.map(([k, d]) => (
              <li key={k}>
                <code>{k}</code>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="ss-card">
          <h3>One real run, start to finish</h3>
          <svg viewBox="0 0 320 120" className="ss-chart" role="img" aria-label={`Timeline: you ask at 0 seconds, the reply lands at ${MEASURED.seconds} seconds`}>
            <line x1="16" x2="304" y1="60" y2="60" className="ss-track" />
            <line x1="16" x2="304" y1="60" y2="60" className="ss-track-acc ss-draw" />
            {[
              [16, "You ask"],
              [88, "Browser opens"],
              [160, "Helper reads"],
              [232, "Reply written"],
              [304, "Chat gets it"],
            ].map(([x, t], i) => (
              <g key={t as string}>
                <circle cx={x as number} cy="60" r={i === 0 || i === 4 ? 6 : 4} className={i === 4 ? "ss-pin-acc" : "ss-pin"} />
                <text x={x as number} y={i % 2 ? 92 : 36} className="ss-lbl" textAnchor={i === 0 ? "start" : i === 4 ? "end" : "middle"}>
                  {t}
                </text>
              </g>
            ))}
            <text x="16" y="112" className="ss-axis">0 s</text>
            <text x="304" y="112" className="ss-axis" textAnchor="end">{MEASURED.seconds} s</text>
          </svg>
          <p className="ss-cap">Only the start and end times were measured. The steps show order, not length.</p>
        </div>
      </div>
      <div className="ss-card ss-r">
        <h3>Two ways to browse</h3>
        <div className="ss-scroll">
          <table className="ss-table">
            <thead>
              <tr>
                <th scope="col"><span className="ss-sr">Question</span></th>
                <th scope="col">Private hidden browser <small>(default)</small></th>
                <th scope="col">Your own Chrome <small>(already logged in)</small></th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map(([q, a, b]) => (
                <tr key={q}>
                  <th scope="row">{q}</th>
                  <td>{a}</td>
                  <td>{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Pair>
  );
}

/* 3. Proof. The real page vs the real reply, then the measured sizes. */
const BARS: [string, number][] = [
  ["Whole page", MEASURED.full],
  ["Clickable parts the helper read", MEASURED.compact],
  ["Reply your chat received", MEASURED.summary],
];

export function Proof() {
  return (
    <Pair
      id="proof"
      n="03"
      title="You read 9 lines, not the whole page."
      lede={`One real run on Y Combinator's news page, measured on ${MEASURED.date}.`}
      left={
        <div className="ss-browser">
          <div className="ss-browser-bar" aria-hidden="true">
            <i /><i /><i />
            <span>news.ycombinator.com</span>
          </div>
          <Image
            src="/images/claude-browse/hn.webp"
            alt="Screenshot of Y Combinator's news page with 30 story links, points and comment counts"
            width={1200}
            height={760}
            sizes="(max-width: 860px) 100vw, 560px"
          />
        </div>
      }
      right={
        <div className="ss-reply ss-reply-card">
          <ReplyLines />
        </div>
      }
      leftCap={`The whole page is about ${fmt(MEASURED.full)} tokens. All of it would sit in your chat.`}
      rightCap={`The real reply, unedited. About ${MEASURED.summary} tokens.`}
    >
      <div className="ss-row ss-r">
        <div className="ss-card ss-grow-2">
          <h3>Tokens on the same page</h3>
          <ul className="ss-hbars">
            {BARS.map(([t, n], i) => (
              <li key={t}>
                <span>{t}</span>
                <span className="ss-hbar">
                  <i className={i === 2 ? "ss-acc-bg" : ""} style={{ ...v(i), "--w": Math.max(n / MEASURED.full, 0.01) } as CSSProperties} />
                </span>
                <b className={i === 2 ? "ss-acc" : ""}>{fmt(n)}</b>
              </li>
            ))}
          </ul>
        </div>
        <div className="ss-stats">
          <p><b>{MEASURED.seconds} s</b> for the whole run</p>
          <p><b className="ss-acc">{Math.round(MEASURED.full / MEASURED.summary)}x</b> smaller reply than the whole page</p>
          <p><b>12</b> lines at most in any reply</p>
        </div>
      </div>
    </Pair>
  );
}

/* 4. Windows. A pile of unnamed windows vs the real ledger. */
const [LS, REAP] = LEDGER.split("\n\n");
const LS_LINES = LS.split("\n");
const HEAD = LS_LINES[1].split(/\s{2,}/);
const ROWS = LS_LINES.slice(2).map((l) => l.split(/\s{2,}/));

export function Windows() {
  return (
    <Pair
      id="windows"
      n="04"
      title="Every window has a name and an owner."
      lede="A ledger (a simple record) tracks each browser window. You see what is open and close what sits idle."
      left={
        <div className="ss-pile" aria-label="A pile of browser windows with no names">
          {["untitled", "about:blank", "untitled", "?", "about:blank", "untitled"].map((t, i) => (
            <div key={i} className="ss-win" style={v(i)}>
              <div className="ss-win-bar"><i /><i /><i /><span>{t}</span></div>
            </div>
          ))}
        </div>
      }
      right={
        <div className="ss-term">
          <p className="ss-term-cmd">{LS_LINES[0]}</p>
          <div className="ss-scroll">
            <table className="ss-table ss-table-mono">
              <thead>
                <tr>{HEAD.map((h) => <th key={h} scope="col">{h}</th>)}</tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r[0]}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
          <pre className="ss-pre">{REAP}</pre>
        </div>
      }
      leftCap="Windows pile up in the background. Nobody knows which ones still matter."
      rightCap="Real output from browse ls and a dry run of browse reap. Nothing closes until you say so."
    >
      <ol className="ss-chain ss-r">
        <li><code>browse ls</code><span>See every window</span></li>
        <li><code>browse reap --dry-run</code><span>See what would close</span></li>
        <li><code>browse reap</code><span>Close the idle ones</span></li>
      </ol>
    </Pair>
  );
}

/* 5. Safety. Anything goes vs a gate, a fingerprint log and owner-only cleanup. */
function Fan() {
  const sites = [24, 58, 92, 126, 160, 194];
  return (
    <svg viewBox="0 0 320 220" className="ss-chart" role="img" aria-label="The browser can reach any site">
      {sites.map((y) => (
        <line key={y} x1="92" y1="110" x2="220" y2={y} className="ss-wire" />
      ))}
      <rect x="12" y="92" width="80" height="36" rx="8" className="ss-node" />
      <text x="52" y="114" className="ss-lbl" textAnchor="middle">Browser</text>
      {sites.map((y, i) => (
        <g key={y}>
          <rect x="220" y={y - 13} width="88" height="26" rx="6" className="ss-node-dim" />
          <text x="264" y={y + 4} className="ss-axis" textAnchor="middle">{i === 2 ? "any site" : "?"}</text>
        </g>
      ))}
    </svg>
  );
}

function Gate() {
  return (
    <svg viewBox="0 0 320 220" className="ss-chart" role="img" aria-label="A gate lets only the allowed site through and refuses others with exit 3">
      <line x1="92" y1="110" x2="146" y2="110" className="ss-wire-acc" />
      <line x1="186" y1="100" x2="220" y2="56" className="ss-wire-acc" />
      <line x1="186" y1="120" x2="206" y2="160" className="ss-wire" strokeDasharray="4 4" />
      <rect x="12" y="92" width="80" height="36" rx="8" className="ss-node" />
      <text x="52" y="114" className="ss-lbl" textAnchor="middle">Helper</text>
      <rect x="146" y="72" width="40" height="76" rx="8" className="ss-gate" />
      <text x="166" y="166" className="ss-axis" textAnchor="middle">gate</text>
      <rect x="196" y="36" width="116" height="36" rx="8" className="ss-node-acc" />
      <text x="254" y="58" className="ss-lbl" textAnchor="middle">allowed site</text>
      <rect x="196" y="160" width="116" height="44" rx="8" className="ss-node-dim" />
      <text x="254" y="178" className="ss-axis" textAnchor="middle">any other site</text>
      <text x="254" y="195" className="ss-stop" textAnchor="middle">refused, exit 3</text>
    </svg>
  );
}

export function Safety() {
  return (
    <Pair
      id="safety"
      n="05"
      title="It only goes where you say."
      lede="You name the allowed sites when you start. Anything else is refused before the browser moves."
      left={<Fan />}
      right={<Gate />}
      leftCap="It has no limits on where it goes. One stray link can take it anywhere."
      rightCap="A list of allowed sites (an allowlist). Other sites stop at the gate with exit code 3."
    >
      <div className="ss-row ss-r">
        <div className="ss-card">
          <h3>The log keeps a fingerprint, not the words</h3>
          <svg viewBox="0 0 320 110" className="ss-chart" role="img" aria-label="A full page becomes a short fingerprint in the log">
            <rect x="16" y="12" width="76" height="86" rx="6" className="ss-node-dim" />
            {[28, 40, 52, 64, 76].map((y, i) => (
              <line key={y} x1="28" x2={i % 2 ? 70 : 80} y1={y} y2={y} className="ss-wire" />
            ))}
            <text x="54" y="108" className="ss-axis" textAnchor="middle">page</text>
            <line x1="104" x2="176" y1="55" y2="55" className="ss-wire-acc" markerEnd="url(#ss-arrow)" />
            <defs>
              <marker id="ss-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" orient="auto">
                <path d="M0 0L8 4L0 8Z" className="ss-arrowhead" />
              </marker>
            </defs>
            <rect x="188" y="38" width="116" height="34" rx="6" className="ss-node-acc" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (
              <rect key={k} x={200 + k * 12} y={48} width="8" height="14" rx="2" className={k % 3 ? "ss-bar" : "ss-bar-acc"} />
            ))}
            <text x="246" y="94" className="ss-axis" textAnchor="middle">log: fingerprint only</text>
          </svg>
        </div>
        <div className="ss-card">
          <h3>Cleanup closes only its own windows</h3>
          <ul className="ss-own">
            <li className="ss-own-mine"><span>your helper&apos;s window</span><b>closes</b></li>
            <li><span>another owner&apos;s window</span><b>left alone</b></li>
            <li><span>your own browsing</span><b>left alone</b></li>
          </ul>
        </div>
      </div>
    </Pair>
  );
}

/* 6. Setup. A long to-do list vs three commands. */
const DIY = [
  "Pick and install a browser tool",
  "Write glue code so Claude can drive it",
  "Paste pages into the chat by hand",
  "Keep track of open windows yourself",
  "Clean up after every session",
  "Hope nothing wandered off to the wrong site",
];

export function Setup() {
  return (
    <Pair
      id="start"
      n="06"
      title="Three commands and you are set."
      lede="It is MIT licensed, needs no API key, and runs on macOS and Linux."
      left={
        <ol className="ss-todo">
          {DIY.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ol>
      }
      right={
        <ol className="ss-steps">
          {STEPS.map(([n, t, cmd]) => (
            <li key={n}>
              <span className="ss-flow-n">{Number(n)}</span>
              <div>
                <p>{t}</p>
                <div className="ss-cmdrow">
                  <code>{cmd}</code>
                  <Copy text={cmd} label="Copy" done="Copied" className="ss-btn ss-btn-sm ss-btn-ghost" icon />
                </div>
              </div>
            </li>
          ))}
        </ol>
      }
      leftCap="A weekend of wiring, and the pages still land in your chat."
      rightCap="Add the plugin, check it, then ask. That is all the setup you need."
    >
      <div className="ss-term ss-r">
        <p className="ss-term-cmd">$ browse doctor</p>
        <pre className="ss-pre">
          {DOCTOR.split("\n").map((l, i) => {
            const [tag, ...rest] = l.split(" ");
            return (
              <span key={i}>
                <b className={tag === "PASS" ? "ss-pass" : "ss-warn"}>{tag}</b> {rest.join(" ")}
                {"\n"}
              </span>
            );
          })}
        </pre>
        <p className="ss-cap">Real output from {MEASURED.date}. Each warning names its own fix.</p>
      </div>
    </Pair>
  );
}

export function Faq() {
  return (
    <section id="faq" className="ss-sec" aria-labelledby="faq-h">
      <div className="ss-wrap ss-narrow">
        <header className="ss-head ss-r">
          <span className="ss-num">07</span>
          <h2 id="faq-h">Short answers</h2>
        </header>
        <div className="ss-faq ss-r">
          {FAQ.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Close() {
  return (
    <section className="ss-close" aria-labelledby="close-h">
      <div className="ss-wrap ss-narrow ss-r">
        <h2 id="close-h">
          Let the helper read the web.
          <br />
          <span className="ss-acc">You keep the answer.</span>
        </h2>
        <p>Paste this into your terminal and ask your first question.</p>
        <div className="ss-cmdrow ss-cmdrow-lg">
          <code>{INSTALL}</code>
          <Copy />
        </div>
      </div>
    </section>
  );
}
