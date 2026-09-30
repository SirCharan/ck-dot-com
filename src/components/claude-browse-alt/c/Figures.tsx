import type { ReactNode } from "react";
import Image from "next/image";
import { COMPARE, DOCTOR, LEDGER, MEASURED, NOISE, SUMMARY } from "@/components/claude-browse/data";

const fmt = (n: number) => n.toLocaleString("en-US");

/* Frame shared by every figure: label, body, caption. */
export function Fig({ n, title, caption, children, wide }: { n: string; title: string; caption: ReactNode; children: ReactNode; wide?: boolean }) {
  return (
    <figure className={`wp-fig wp-r${wide ? " wp-fig-wide" : ""}`} id={`fig-${n}`}>
      <div className="wp-fig-label">
        [ fig. {n} · {title} ]
      </div>
      <div className="wp-fig-body">{children}</div>
      <figcaption>
        <b>Fig. {n}.</b> {caption}
      </figcaption>
    </figure>
  );
}

/* Arrowhead markers, defined once for every SVG on the page. */
export function Defs() {
  return (
    <svg className="wp-defs" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <marker id="wp-ah" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" className="wp-ah" />
        </marker>
        <marker id="wp-ah-a" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" className="wp-ah-a" />
        </marker>
      </defs>
    </svg>
  );
}

function Node({ x, y, w, h, t, s, acc }: { x: number; y: number; w: number; h: number; t: string; s?: string; acc?: boolean }) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  return (
    <g>
      <rect className={acc ? "wp-n wp-n-acc" : "wp-n"} x={x} y={y} width={w} height={h} rx="4" />
      <text className="wp-nt" x={cx} y={s ? cy - 3 : cy + 5} textAnchor="middle">
        {t}
      </text>
      {s && (
        <text className="wp-ns" x={cx} y={cy + 15} textAnchor="middle">
          {s}
        </text>
      )}
    </g>
  );
}

const A = "url(#wp-ah)";
const AA = "url(#wp-ah-a)";

function Lb({ x, y, c, a = "middle", acc }: { x: number; y: number; c: string; a?: "start" | "middle" | "end"; acc?: boolean }) {
  return (
    <text className={acc ? "wp-lb wp-lb-a" : "wp-lb"} x={x} y={y} textAnchor={a}>
      {c}
    </text>
  );
}

/* fig. 1: architecture, one wide drawing and one tall drawing for phones. */
export function FigArchitecture() {
  return (
    <Fig
      n="1"
      title="the architecture"
      wide
      caption="Your chat talks to one helper. The helper drives a browser, writes each window to the ledger, and sends back a short reply."
    >
      <svg className="wp-svg wp-only-wide" viewBox="0 0 960 400" role="img" aria-label="You ask Claude. Claude sends a task to the helper. The helper uses a private browser or your Chrome, logs each window in the ledger, and returns a reply of at most 12 lines, about 90 tokens.">
        <rect className="wp-zone" x="10" y="24" width="340" height="250" rx="8" />
        <text className="wp-zl" x="24" y="48">YOUR CHAT · STAYS SMALL</text>
        <rect className="wp-zone" x="390" y="24" width="560" height="366" rx="8" />
        <text className="wp-zl" x="404" y="48">OUTSIDE YOUR CHAT · PAGES STAY HERE</text>
        <text className="wp-ns" x="470" y="78">reads the page map here:</text>
        <text className="wp-ns" x="470" y="94">about 3,350 tokens, not sent on</text>
        <path className="wp-ln" d="M150 152H186" markerEnd={A} />
        <Lb x={170} y={142} c="/browse" />
        <path className="wp-ln" d="M320 140H466" markerEnd={A} />
        <Lb x={395} y={132} c="task" />
        <path className="wp-ln wp-ln-a" d="M470 166H324" markerEnd={AA} />
        <Lb x={395} y={188} c="at most 12 lines" acc />
        <Lb x={395} y={203} c="about 90 tokens" acc />
        <path className="wp-ln" d="M630 140H680V96H726" markerStart={A} markerEnd={A} />
        <path className="wp-ln" d="M630 164H680V228H726" markerStart={A} markerEnd={A} />
        <path className="wp-ln wp-ln-d" d="M550 184V338H726" markerEnd={A} />
        <Lb x={560} y={328} c="a record for every window" a="start" />
        <Node x={30} y={120} w={120} h={64} t="You" s="ask a question" />
        <Node x={190} y={120} w={130} h={64} t="Claude" s="your chat" />
        <Node x={470} y={120} w={160} h={64} t="Helper" s="Sonnet, on the side" acc />
        <Node x={730} y={64} w={200} h={64} t="Private browser" s="hidden · starts clean" />
        <Node x={730} y={196} w={200} h={64} t="Your Chrome" s="already logged in" />
        <Node x={730} y={306} w={200} h={64} t="Ledger" s="every window, listed" />
      </svg>
      <svg className="wp-svg wp-only-tall" viewBox="0 0 360 600" role="img" aria-label="You ask Claude. Claude sends a task to the helper. The helper uses a private browser or your Chrome, logs each window in the ledger, and returns a reply of at most 12 lines, about 90 tokens.">
        <rect className="wp-zone" x="8" y="8" width="344" height="170" rx="8" />
        <text className="wp-zl" x="20" y="30">YOUR CHAT</text>
        <rect className="wp-zone" x="8" y="190" width="344" height="402" rx="8" />
        <text className="wp-zl" x="20" y="212">OUTSIDE YOUR CHAT</text>
        <path className="wp-ln" d="M180 84V102" markerEnd={A} />
        <Lb x={190} y={98} c="/browse" a="start" />
        <path className="wp-ln" d="M160 158V232" markerEnd={A} />
        <Lb x={150} y={200} c="task" a="end" />
        <path className="wp-ln wp-ln-a" d="M200 236V162" markerEnd={AA} />
        <Lb x={210} y={194} c="at most 12 lines" a="start" acc />
        <Lb x={210} y={209} c="about 90 tokens" a="start" acc />
        <path className="wp-ln" d="M150 292V316H94V340" markerStart={A} markerEnd={A} />
        <path className="wp-ln" d="M210 292V316H266V340" markerStart={A} markerEnd={A} />
        <text className="wp-ns" x="180" y="430" textAnchor="middle">page map, about 3,350 tokens,</text>
        <text className="wp-ns" x="180" y="445" textAnchor="middle">read here and never sent on</text>
        <path className="wp-ln wp-ln-d" d="M40 404V548H96" markerEnd={A} />
        <path className="wp-ln wp-ln-d" d="M320 404V548H264" markerEnd={A} />
        <Lb x={180} y={500} c="a record for every window" />
        <Node x={110} y={40} w={140} h={44} t="You" />
        <Node x={110} y={106} w={140} h={52} t="Claude" s="your chat" />
        <Node x={100} y={236} w={160} h={56} t="Helper" s="Sonnet, on the side" acc />
        <Node x={16} y={344} w={156} h={60} t="Private browser" s="hidden · clean" />
        <Node x={188} y={344} w={156} h={60} t="Your Chrome" s="logged in" />
        <Node x={100} y={520} w={160} h={56} t="Ledger" s="every window, listed" />
      </svg>
    </Fig>
  );
}

/* fig. 1a: illustrative running total over 10 messages, derived from the measured per-page figures. */
export function FigCost() {
  const n = Array.from({ length: 10 }, (_, i) => i + 1);
  const max = MEASURED.full * 10;
  const x = (i: number) => 64 + (i - 1) * 60;
  const y = (v: number) => 250 - (v / max) * 216;
  const line = (per: number) => n.map((i, k) => `${k ? "L" : "M"}${x(i)} ${y(per * i).toFixed(1)}`).join("");
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => f * max);
  return (
    <Fig
      n="1a"
      title="one page, carried for 10 messages (illustrative)"
      caption={`Illustrative. The ${fmt(MEASURED.full)} and ${MEASURED.summary} are measured on one page. Each total is that number times the message count.`}
    >
      <svg className="wp-svg wp-chart" viewBox="0 0 640 300" role="img" aria-label={`Illustrative running total. With the page in your chat, 10 messages carry ${fmt(max)} tokens. With only the reply, 10 messages carry ${fmt(MEASURED.summary * 10)}.`}>
        {ticks.map((t) => (
          <g key={t}>
            <line className="wp-grid" x1="64" x2="604" y1={y(t)} y2={y(t)} />
            <text className="wp-ax" x="56" y={y(t) + 4} textAnchor="end">{fmt(t)}</text>
          </g>
        ))}
        {n.map((i) => (
          <text key={i} className="wp-ax" x={x(i)} y="270" textAnchor="middle">{i}</text>
        ))}
        <text className="wp-ax" x="334" y="292" textAnchor="middle">message number</text>
        <path className="wp-ln wp-ln-ink" d={line(MEASURED.full)} />
        <path className="wp-ln wp-ln-a" d={line(MEASURED.summary)} />
        {n.map((i) => (
          <circle key={i} className="wp-dot" cx={x(i)} cy={y(MEASURED.full * i)} r="3" />
        ))}
        <Lb x={556} y={38} c={`page in chat: ${fmt(max)}`} a="end" />
        <Lb x={590} y={232} c={`reply only: ${fmt(MEASURED.summary * 10)}`} a="end" acc />
        <rect className="wp-stamp" x="76" y="16" width="118" height="22" rx="2" />
        <text className="wp-stamp-t" x="135" y="31" textAnchor="middle">ILLUSTRATIVE</text>
        <rect className="wp-cover" x="66" y="10" width="560" height="244" />
      </svg>
    </Fig>
  );
}

/* fig. 1b: the chat, to scale, before and after. */
export function FigShift() {
  const H = 256;
  const col = (title: string, mid: ReactNode) => (
    <div className="wp-chat">
      <div className="wp-chat-h">{title}</div>
      <div className="wp-chat-b">
        <div className="wp-blk">your question</div>
        {mid}
        <div className="wp-blk">Claude&rsquo;s answer</div>
      </div>
    </div>
  );
  return (
    <Fig n="1b" title="your chat, before and after" caption={`The two measured blocks are to scale: ${fmt(MEASURED.full)} tokens against ${MEASURED.summary}.`}>
      <div className="wp-shift">
        {col(
          "Page read in your chat",
          <div className="wp-blk wp-blk-page" style={{ height: H }}>
            <span>the whole page</span>
            <b>{fmt(MEASURED.full)} tokens</b>
          </div>,
        )}
        {col(
          "With claude-browse",
          <>
            <div className="wp-blk-thin" style={{ height: Math.max(3, (MEASURED.summary / MEASURED.full) * H) }} />
            <div className="wp-thin-lb">the reply · {MEASURED.summary} tokens</div>
            <div className="wp-room" style={{ height: H - 40 }}>room left for your work</div>
          </>,
        )}
      </div>
    </Fig>
  );
}

/* fig. 2: sequence diagram of the real run. */
const LANES: [string, number][] = [["You", 80], ["Claude", 240], ["Helper", 400], ["Browser", 560]];
const MSGS: [number, number, number, string, boolean?][] = [
  [0, 1, 90, "/browse question"],
  [1, 2, 150, "task and rules"],
  [2, 3, 210, "open the page"],
  [3, 2, 270, `page map · ${fmt(MEASURED.compact)} tokens`],
  [2, 3, 330, "close the window"],
  [2, 1, 400, `reply · ${MEASURED.summary} tokens`, true],
  [1, 0, 460, "your answer"],
];
export function FigSequence() {
  return (
    <Fig
      n="2"
      title={`one real run, ${MEASURED.seconds} seconds`}
      wide
      caption={`The real run from ${MEASURED.date}. The order of steps is real; only the start and the ${MEASURED.seconds} second finish were timed.`}
    >
      <p className="wp-hint">Scroll sideways to see all 4 lanes.</p>
      <div className="wp-scroll">
        <svg className="wp-svg wp-seq" viewBox="0 0 640 556" role="img" aria-label={`Sequence over ${MEASURED.seconds} seconds: you ask Claude, Claude tasks the helper, the helper opens the page, reads a ${fmt(MEASURED.compact)} token page map, closes the window, and returns a ${MEASURED.summary} token reply.`}>
          <rect className="wp-zone-fill" x="320" y="64" width="312" height="452" rx="6" />
          <text className="wp-zl" x="476" y="538" textAnchor="middle">PAGES STAY IN THIS AREA</text>
          <line className="wp-ln" x1="20" x2="20" y1="90" y2="460" />
          <line className="wp-ln" x1="16" x2="24" y1="90" y2="90" />
          <line className="wp-ln" x1="16" x2="24" y1="460" y2="460" />
          <text className="wp-ax" x="28" y="80">0 s</text>
          <text className="wp-ax" x="28" y="480">{MEASURED.seconds} s</text>
          {LANES.map(([name, lx]) => (
            <g key={name}>
              <line className="wp-life" x1={lx} x2={lx} y1="52" y2="516" />
              <rect className={name === "Helper" ? "wp-n wp-n-acc" : "wp-n"} x={lx - 60} y="16" width="120" height="36" rx="4" />
              <text className="wp-nt" x={lx} y="39" textAnchor="middle">{name}</text>
            </g>
          ))}
          <rect className="wp-act" x="234" y="90" width="12" height="370" />
          <rect className="wp-act wp-act-a" x="394" y="150" width="12" height="250" />
          <rect className="wp-act" x="554" y="210" width="12" height="120" />
          {MSGS.map(([f, t, my, label, acc], i) => {
            const x1 = LANES[f][1] + (t > f ? 6 : -6);
            const x2 = LANES[t][1] + (t > f ? -8 : 8);
            return (
              <g key={label} className="wp-msg" style={{ ["--i" as string]: i }}>
                <line className={acc ? "wp-ln wp-ln-a" : i === 3 ? "wp-ln wp-ln-heavy" : "wp-ln"} x1={x1} x2={x2} y1={my} y2={my} markerEnd={acc ? AA : A} />
                <Lb x={(x1 + x2) / 2} y={my - 8} c={label} acc={acc} />
              </g>
            );
          })}
          <g className="wp-playhead" aria-hidden="true">
            <line x1="12" x2="632" y1="90" y2="90" />
          </g>
        </svg>
      </div>
    </Fig>
  );
}

/* fig. 2a: the two browsers. */
function Win({ dashed }: { dashed?: boolean }) {
  return (
    <svg className="wp-win" viewBox="0 0 40 28" aria-hidden="true">
      <rect x="1" y="1" width="38" height="26" rx="2" className={dashed ? "wp-win-f wp-ln-d" : "wp-win-f"} />
      <line x1="1" x2="39" y1="8" y2="8" className="wp-win-f" />
      {!dashed && <circle cx="20" cy="18" r="4" className="wp-win-u" />}
    </svg>
  );
}
export function FigBrowsers() {
  return (
    <Fig n="2a" title="the two browsers" caption="The private browser runs on agent-browser. Your own Chrome runs on browser-harness.">
      <div className="wp-scroll">
        <table className="wp-table">
          <thead>
            <tr>
              <th scope="col"><span className="wp-sr">Question</span></th>
              <th scope="col"><Win dashed /> Private browser <i>default</i></th>
              <th scope="col"><Win /> Your own Chrome</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE.map(([k, a, b]) => (
              <tr key={k}>
                <th scope="row">{k}</th>
                <td>{a}</td>
                <td>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fig>
  );
}

/* fig. 2b: the reply, annotated. */
const KEYS: [string, string][] = [
  ["RESULT", "the answer, in one sentence"],
  ["KEY DATA", "the facts it found"],
  ["SOURCES", "where it looked"],
  ["ARTIFACTS", "files it saved, if any"],
  ["SESSION | BLOCKERS", "which window, and what stopped it"],
];
export function FigReply() {
  const pad = Array.from({ length: 12 - SUMMARY.length });
  return (
    <Fig n="2b" title="the reply, line by line" caption={`The whole reply from the real run, unedited. It used ${SUMMARY.length} of its 12 lines.`}>
      <div className="wp-reply">
        <ol className="wp-lines">
          {SUMMARY.map(([k, v], i) => (
            <li key={i}>
              {k && <b>{k}</b>}
              {v}
            </li>
          ))}
          {pad.map((_, i) => (
            <li key={`p${i}`} className="wp-unused">unused</li>
          ))}
        </ol>
        <dl className="wp-keys">
          {KEYS.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Fig>
  );
}

/* fig. 3: bar chart of the three measured sizes. */
export function FigBars() {
  const rows: [string, number, string, boolean?][] = [
    ["whole page", MEASURED.full, "read by the helper"],
    ["clickable parts", MEASURED.compact, "read by the helper"],
    ["reply to your chat", MEASURED.summary, "all your chat receives", true],
  ];
  return (
    <Fig
      n="3"
      title="tokens at each stage"
      caption={`The helper reads the first two. Your chat gets only the third, about ${Math.round(MEASURED.full / MEASURED.summary)} times smaller than the page.`}
    >
      <div className="wp-bars" role="img" aria-label={`Whole page ${fmt(MEASURED.full)} tokens, clickable parts ${fmt(MEASURED.compact)}, reply to your chat ${MEASURED.summary}.`}>
        {rows.map(([k, v, note, acc]) => (
          <div key={k} className={`wp-bar${acc ? " wp-bar-a" : ""}`}>
            <div className="wp-bar-k">
              {k}
              <small>{note}</small>
            </div>
            <div className="wp-bar-t" style={{ ["--w" as string]: `${Math.max(0.5, (v / MEASURED.full) * 100)}%` }}>
              <div className="wp-bar-f" />
              <span className="wp-bar-v">{fmt(v)}</span>
            </div>
          </div>
        ))}
        <div className="wp-bar-axis" aria-hidden="true">
          {[0, 2000, 4000, 6000].map((t) => (
            <span key={t} style={{ left: `${(t / MEASURED.full) * 100}%` }}>{fmt(t)}</span>
          ))}
        </div>
      </div>
    </Fig>
  );
}

export function FigShot() {
  return (
    <Fig n="3a" title="the page the helper opened" caption="Y Combinator's news page, captured on the day of the run.">
      <Image className="wp-shot" src="/images/claude-browse/hn.webp" width={1200} height={760} alt="Y Combinator's news page, the list of top stories the helper read" sizes="(max-width: 900px) 100vw, 860px" />
    </Fig>
  );
}

export function FigNoise() {
  return (
    <Fig n="3b" title="what the helper read, and what you got" caption={`Left: the first ${NOISE.length} lines of the page map. Right: the whole reply your chat received.`} wide>
      <div className="wp-vs">
        <div>
          <div className="wp-vs-h">Helper reads · {fmt(MEASURED.compact)} tokens</div>
          <pre className="wp-pre wp-pre-noise" tabIndex={0}>{NOISE.join("\n")}</pre>
        </div>
        <div>
          <div className="wp-vs-h wp-vs-a">Your chat gets · {MEASURED.summary} tokens</div>
          <pre className="wp-pre" tabIndex={0}>
            {SUMMARY.map(([k, v]) => `${k}${v}`).join("\n")}
          </pre>
        </div>
      </div>
    </Fig>
  );
}

/* fig. 4: one ledger record as a schema. Field names are from lib/ledger.py. */
const FIELDS: [string, string, string][] = [
  ["purpose", "text", "why it was opened, in your words"],
  ["owner", "record", "which Claude chat and folder opened it"],
  ["stack", "text", "the engine: agent-browser or browser-harness"],
  ["allowed_domains", "list", "the only sites it may visit"],
  ["created", "time", "when it opened"],
  ["last_used", "time", "when it last did anything; the reaper reads this"],
  ["pid", "number", "the running program, so it can be closed safely"],
  ["state", "text", "where it is now, for example version-mismatch"],
];
export function FigLedger() {
  return (
    <Fig n="4" title="one ledger record" caption="Field names are the real ones from the code. The log keeps a page fingerprint, never the words on the page.">
      <div className="wp-schema">
        <div className="wp-rec">
          <div className="wp-rec-h">session record <span>one per window</span></div>
          {FIELDS.map(([f, t, note]) => (
            <div key={f} className="wp-rec-r">
              <code>{f}</code>
              <em>{t}</em>
              <i className="wp-lead" aria-hidden="true" />
              <span>{note}</span>
            </div>
          ))}
        </div>
        <div className="wp-rec wp-rec-log">
          <div className="wp-rec-h">log entry <span>one per step</span></div>
          <div className="wp-rec-r">
            <code>snapshot_ref</code>
            <em>8 chars</em>
            <i className="wp-lead" aria-hidden="true" />
            <span>a short fingerprint of the page; its words are never kept</span>
          </div>
        </div>
      </div>
    </Fig>
  );
}

export function FigLs() {
  return (
    <Fig n="4a" title="browse ls and a dry run, real output" caption="4 old windows, all on an older browser version. The dry run lists them and closes nothing." wide>
      <pre className="wp-pre wp-term" tabIndex={0}>{LEDGER}</pre>
    </Fig>
  );
}

/* fig. 5: the reaper as a state machine, drawn in HTML so it reflows on phones. */
type St = [string, string, ("live" | "end" | "")?];
const ROWS: { cells: St[]; edges: string[] }[] = [
  { cells: [["live", "in use", "live"], ["idle", "no use for 4 h"], ["closed", "window shut", "end"]], edges: ["time passes", "browse reap"] },
  { cells: [["orphan", "program gone, files left"], ["removed", "only its own files", "end"]], edges: ["browse reap"] },
  { cells: [["stale binary", "old browser version"], ["flagged", "shown in the report"], ["closed", "fresh one next time", "end"]], edges: ["browse reap", "--restart-mismatch, 10 min idle"] },
];
export function FigReaper() {
  return (
    <Fig n="5" title="the reaper, as a state machine" caption={<>Windows that hold your logins are skipped unless you add <code>--force</code>. With <code>--dry-run</code>, nothing changes.</>}>
      <div className="wp-sm">
        {ROWS.map((r, i) => (
          <div key={i} className="wp-sm-row">
            <span className="wp-sm-start" aria-hidden="true" />
            {r.cells.map(([t, s, kind], j) => (
              <div key={t + j} className="wp-sm-seg">
                {j > 0 && <div className="wp-sm-edge"><span>{r.edges[j - 1]}</span></div>}
                <div className={`wp-st${kind ? ` wp-st-${kind}` : ""}`}>
                  <b>{t}</b>
                  <small>{s}</small>
                </div>
              </div>
            ))}
          </div>
        ))}
        <p className="wp-sm-out">Real dry run: <code>reap: closed 4, orphans removed 0, flagged 4, dry-run</code></p>
      </div>
    </Fig>
  );
}

/* fig. 6: exit codes, from the README table. */
const EXITS: [string, string, string][] = [
  ["0", "done", "It worked."],
  ["1", "error", "Something went wrong. Read the message it printed."],
  ["2", "usage", "The command was typed wrong, or the window name is not allowed."],
  ["3", "refused", "That site is not on your list, or the link looks unsafe."],
  ["4", "no browser", "The browser is not there, for example Chrome is not open on port 9222."],
  ["124", "timeout", "It took too long. The limit is 120 s; set CLAUDE_BROWSE_TIMEOUT to change it."],
];
export function FigExits() {
  return (
    <Fig n="6" title="exit codes in plain words" caption="Claude reads these too. On exit 3 it stops and tells you which site was refused.">
      <div className="wp-scroll">
        <table className="wp-table wp-exits">
          <thead>
            <tr>
              <th scope="col">Code</th>
              <th scope="col">Name</th>
              <th scope="col">What it means</th>
            </tr>
          </thead>
          <tbody>
            {EXITS.map(([c, n, m]) => (
              <tr key={c} className={c === "3" ? "is-hi" : undefined}>
                <th scope="row"><code>{c}</code></th>
                <td>{n}</td>
                <td>{m}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fig>
  );
}

/* fig. 6a: the site check as a flowchart. */
function Diamond({ cx, cy, l1, l2 }: { cx: number; cy: number; l1: string; l2: string }) {
  return (
    <g>
      <path className="wp-n" d={`M${cx} ${cy - 46}L${cx + 112} ${cy}L${cx} ${cy + 46}L${cx - 112} ${cy}Z`} />
      <text className="wp-ns wp-ns-ink" x={cx} y={cy - 3} textAnchor="middle">{l1}</text>
      <text className="wp-ns wp-ns-ink" x={cx} y={cy + 13} textAnchor="middle">{l2}</text>
    </g>
  );
}
export function FigCheck() {
  return (
    <Fig n="6a" title="the site check behind exit 3" caption={<>Your list of sites is set when a window opens, with <code>--allow-domains</code>. It covers open, goto and navigate.</>}>
      <svg className="wp-svg wp-flow" viewBox="0 0 420 420" role="img" aria-label="Claude asks to open a link. If it is not http or https, or has odd characters, it is refused with exit 3. If the site is not on your list, it is refused with exit 3. Otherwise the browser moves.">
        <Node x={40} y={10} w={220} h={44} t="Claude asks for a link" />
        <path className="wp-ln" d="M150 54V78" markerEnd={A} />
        <Diamond cx={150} cy={126} l1="http or https," l2="no odd characters?" />
        <path className="wp-ln" d="M150 172V210" markerEnd={A} />
        <Lb x={160} y={195} c="yes" a="start" />
        <Diamond cx={150} cy={258} l1="site on your list," l2="or part of one?" />
        <path className="wp-ln" d="M150 304V336" markerEnd={A} />
        <Lb x={160} y={324} c="yes" a="start" />
        <Node x={40} y={340} w={220} h={48} t="The browser moves" acc />
        <path className="wp-ln wp-ln-a" d="M262 126H300" markerEnd={AA} />
        <Lb x={281} y={118} c="no" acc />
        <path className="wp-ln wp-ln-a" d="M262 258H356V184" markerEnd={AA} />
        <Lb x={300} y={250} c="no" acc />
        <Node x={300} y={96} w={112} h={84} t="Refused" s="exit 3" />
        <text className="wp-ns" x="356" y="170" textAnchor="middle">nothing opens</text>
      </svg>
    </Fig>
  );
}

/* fig. 7: browse doctor output, real. */
export function FigDoctor() {
  return (
    <Fig n="7" title="what browse doctor prints, real output" wide caption="Each PASS line is fine, and each WARN line comes with its fix. CDP is how a program drives Chrome. A daemon is a browser left running in the background.">
      <pre className="wp-pre wp-term" tabIndex={0}>
        {DOCTOR.split("\n").map((l, i) => {
          const [tag, ...rest] = l.split(" ");
          return (
            <span key={i} className="wp-doc-l">
              <b className={tag === "PASS" ? "wp-pass" : "wp-warn"}>{tag}</b> {rest.join(" ")}
              {"\n"}
            </span>
          );
        })}
      </pre>
    </Fig>
  );
}
