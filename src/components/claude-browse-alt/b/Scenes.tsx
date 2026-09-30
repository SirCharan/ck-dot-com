import { LEDGER } from "@/components/claude-browse/data";

/* Rows of the real `browse ls` output: NAME STACK PURPOSE OWNER AGE IDLE PID STATE */
export const WINDOWS = LEDGER.split("\n").slice(2, 6).map((l) => l.trim().split(/\s{2,}/));

type Box = { x: number; y: number; w: number; h: number };

function Chat({ x, y, w, h, title = "your chat" }: Box & { title?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="14" className="sb-fr" />
      <path d={`M${x} ${y + 26}h${w}`} className="sb-rule" />
      {[0, 1, 2].map((i) => <circle key={i} cx={x + 15 + i * 11} cy={y + 13} r="3.5" className="sb-dot" />)}
      <text x={x + w - 12} y={y + 17} textAnchor="end" className="sb-tx">{title}</text>
    </g>
  );
}

function Block({ x, y, w, label = "page" }: { x: number; y: number; w: number; label?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="34" rx="6" className="sb-blk" />
      <rect x={x + 10} y={y + 9} width={w * 0.45} height="5" rx="2.5" className="sb-ln" />
      <rect x={x + 10} y={y + 20} width={w * 0.7} height="5" rx="2.5" className="sb-ln" />
      <text x={x + w - 10} y={y + 15} textAnchor="end" className="sb-tx">{label}</text>
    </g>
  );
}

function Bubble({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <g>
      <rect x={x} y={y} width="116" height="24" rx="12" className="sb-bub" />
      <text x={x + 58} y={y + 16} textAnchor="middle" className="sb-tx sb-tx-ink">{text}</text>
    </g>
  );
}

function Helper({ carrying }: { carrying?: boolean }) {
  return (
    <g>
      <text y="-80" textAnchor="middle" className="sb-tx sb-tx-ac">helper</text>
      <circle cy="-62" r="9" className="sb-ink" />
      <rect x="-8" y="-50" width="16" height="28" rx="7" className="sb-ink" />
      <line x1="0" y1="-24" x2="-6" y2="0" className="sb-limb sb-leg" />
      <line x1="0" y1="-24" x2="6" y2="0" className="sb-limb sb-leg sb-leg2" />
      {carrying ? (
        <g>
          <line x1="4" y1="-44" x2="12" y2="-38" className="sb-limb" />
          <rect x="8" y="-56" width="36" height="27" rx="3" className="sb-fr sb-fr-ac" />
          <rect x="8" y="-56" width="36" height="6" rx="2" className="sb-ac" />
        </g>
      ) : (
        <line x1="-4" y1="-44" x2="-22" y2="-40" className="sb-limb" />
      )}
    </g>
  );
}

function NoteCard({ x, y, w, rows = 9 }: { x: number; y: number; w: number; rows?: number }) {
  const keyed = [0, 1, 6, 7, 8];
  return (
    <g>
      <rect x={x} y={y} width={w} height={rows * 11 + 30} rx="8" className="sb-note" />
      <text x={x + 10} y={y + 16} className="sb-tx sb-tx-ac">note, {rows} lines</text>
      {Array.from({ length: rows }, (_, i) => (
        <g key={i}>
          {keyed.includes(i) ? <rect x={x + 10} y={y + 26 + i * 11} width="22" height="4" rx="2" className="sb-ac" /> : null}
          <rect x={x + (keyed.includes(i) ? 36 : 18)} y={y + 26 + i * 11} width={w * (0.35 + ((i * 37) % 30) / 100)} height="4" rx="2" className="sb-ln" />
        </g>
      ))}
    </g>
  );
}

export function HeroScene() {
  return (
    <svg viewBox="0 0 520 340" className="sb-svg sb-scene" role="img" aria-label="Your chat on the left receives a small note. The full news page stays in a browser on the right.">
      <Chat x={16} y={36} w={220} h={270} />
      <Bubble x={104} y={74} text="top story?" />
      <NoteCard x={30} y={116} w={192} rows={9} />
      <text x={30} y={272} className="sb-tx sb-tx-ink">about 90 tokens arrive</text>
      <rect x={30} y={282} width="8" height="14" className="sb-ac sb-cursor" />
      <Chat x={284} y={36} w={220} h={270} title="news page" />
      <rect x={284} y={62} width="220" height="14" className="sb-ac" />
      {Array.from({ length: 9 }, (_, i) => (
        <g key={i}>
          <text x={296} y={98 + i * 20} className="sb-tx">{i + 1}.</text>
          <rect x={316} y={91 + i * 20} width={90 + ((i * 53) % 80)} height="5" rx="2.5" className="sb-ln" />
          <rect x={316} y={100 + i * 20} width={60} height="3" rx="1.5" className="sb-ln sb-ln-soft" />
        </g>
      ))}
      <text x={394} y={296} textAnchor="middle" className="sb-tx sb-tx-ink">about 6,400 tokens stay here</text>
      <path d="M280 214H240" className="sb-dash" />
      <g className="sb-fly">
        <rect x={246} y={186} width="30" height="40" rx="4" className="sb-note" />
        {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={251} y={194 + i * 6} width={i % 2 ? 14 : 20} height="2.5" className="sb-ac" />)}
      </g>
    </svg>
  );
}

export function SceneFill() {
  const ys = [270, 228, 186, 144, 100, 56, 12];
  const tilt = [0, 0, 0, 0, -2, 3, -4];
  return (
    <svg viewBox="0 0 480 340" className="sb-svg sb-scene" role="img" aria-label="A chat window fills with page blocks until they spill over the top.">
      <Chat x={30} y={110} w={260} h={200} />
      {ys.map((y, i) => (
        <g key={y} className={i ? `sb-a${i}` : undefined}>
          <g transform={`rotate(${tilt[i]} 160 ${y + 17})`}><Block x={46} y={y} w={228} label={`page ${i + 1}`} /></g>
        </g>
      ))}
      <rect x={322} y={110} width="20" height="200" rx="4" className="sb-dim" />
      <rect x={322} y={12} width="20" height="298" rx="4" className="sb-ac sb-meter" />
      <path d="M312 110h40" className="sb-dash" />
      <text x={358} y={114} className="sb-tx sb-tx-ink">full</text>
      <text x={358} y={22} className="sb-tx sb-tx-ac sb-a6">over the top</text>
      <text x={358} y={306} className="sb-tx">chat size</text>
    </svg>
  );
}

export function SceneLeave() {
  return (
    <svg viewBox="0 0 480 340" className="sb-svg sb-scene" role="img" aria-label="A small helper figure walks out of the chat carrying a tiny browser window toward the web.">
      <Chat x={20} y={60} w={190} h={230} />
      {[96, 124, 152].map((y, i) => <rect key={y} x={i % 2 ? 90 : 36} y={y} width={i % 2 ? 104 : 120} height="18" rx="9" className={i % 2 ? "sb-bub" : "sb-dim"} />)}
      <text x={36} y={200} className="sb-tx sb-tx-ink">you keep talking</text>
      <rect x={36} y={210} width="8" height="14" className="sb-ac sb-cursor" />
      <rect x={200} y={200} width="16" height="70" rx="3" className="sb-door" />
      <path d="M216 270H470" className="sb-dash" />
      <rect x={340} y={62} width="124" height="92" rx="8" className="sb-fr" transform="rotate(4 400 108)" />
      <Chat x={326} y={74} w={124} h={100} title="the web" />
      {[112, 128, 144, 160].map((y) => <rect key={y} x={338} y={y} width={88 - (y % 3) * 12} height="5" rx="2.5" className="sb-ln" />)}
      <text x={390} y={200} textAnchor="middle" className="sb-tx">reads and clicks out here</text>
      <g transform="translate(272 268)">
        <g className="sb-walk"><Helper carrying /></g>
      </g>
    </svg>
  );
}

export function SceneReturn() {
  return (
    <svg viewBox="0 0 480 340" className="sb-svg sb-scene" role="img" aria-label="The helper hands a nine-line note into the chat while the full pages fall away.">
      <Chat x={16} y={40} w={240} h={270} />
      <Bubble x={128} y={74} text="top story?" />
      <g className="sb-hand"><NoteCard x={32} y={112} w={206} /></g>
      <text x={32} y={292} className="sb-tx sb-tx-ink">about 90 tokens</text>
      <g transform="translate(290 290)"><Helper /></g>
      {[70, 120, 170].map((y, i) => (
        <g key={y} className="sb-fall" style={{ animationDelay: `${i * 0.35}s` }}>
          <Block x={330} y={y} w={134} />
        </g>
      ))}
      <path d="M318 290H474" className="sb-dash" />
      <text x={398} y={318} textAnchor="middle" className="sb-tx sb-tx-ink">about 6,400 tokens stay out</text>
    </svg>
  );
}

export function SceneWall() {
  return (
    <svg viewBox="0 0 480 340" className="sb-svg sb-scene" role="img" aria-label="Four named browser windows, each labelled with its purpose, owner, browser and age.">
      <text x={24} y={34} className="sb-tx sb-tx-ink">$ browse ls</text>
      <rect x={112} y={23} width="7" height="14" className="sb-ac sb-cursor" />
      {WINDOWS.map((r, i) => {
        const x = 24 + (i % 2) * 226;
        const y = 54 + Math.floor(i / 2) * 142;
        return (
          <g key={r[0]}>
            <Chat x={x} y={y} w={206} h={124} title={r[0]} />
            {[["purpose", r[2]], ["owner", r[3]], ["browser", r[1]], ["age", r[4]]].map(([k, v], j) => (
              <g key={k}>
                <text x={x + 14} y={y + 50 + j * 19} className="sb-tx">{k}</text>
                <text x={x + 76} y={y + 50 + j * 19} className="sb-tx sb-tx-ink">{v}</text>
              </g>
            ))}
            <rect x={x - 4} y={y - 4} width="214" height="132" rx="17" className="sb-ring" style={{ animationDelay: `${i * 2}s` }} />
          </g>
        );
      })}
    </svg>
  );
}

export function SceneReap() {
  const order = [WINDOWS[0][0], WINDOWS[1][0], "", WINDOWS[2][0], WINDOWS[3][0]];
  const shut = ["sb-a1", "sb-a2", "", "sb-a4", "sb-a5"];
  return (
    <svg viewBox="0 0 480 340" className="sb-svg sb-scene" role="img" aria-label="A broom passes along a row of windows and closes the idle ones. The window still in use stays lit.">
      <text x={14} y={40} className="sb-tx sb-tx-ink">$ browse reap</text>
      {order.map((name, i) => {
        const x = 14 + i * 92;
        const live = !name;
        return (
          <g key={i}>
            <rect x={x} y={70} width="84" height="104" rx="10" className={live ? "sb-fr sb-fr-ac" : "sb-fr"} />
            <rect x={x} y={70} width="84" height="18" rx="9" className={live ? "sb-ac" : "sb-dim"} />
            <text x={x + 8} y={83} className={live ? "sb-tx sb-tx-dark" : "sb-tx"}>{live ? "in use" : name}</text>
            {[100, 114, 128, 142].map((y) => <rect key={y} x={x + 10} y={y} width={40 + ((y + i * 7) % 24)} height="4" rx="2" className={live ? "sb-ac" : "sb-ln"} />)}
            <text x={x + 42} y={196} textAnchor="middle" className={live ? "sb-tx sb-tx-ac" : "sb-tx"}>{live ? "stays open" : "idle"}</text>
            {live ? null : (
              <g className={shut[i]}>
                <rect x={x} y={70} width="84" height="104" rx="10" className="sb-shut" />
                <path d={`M${x + 30} ${108}l24 24M${x + 54} ${108}l-24 24`} className="sb-x" />
                <text x={x + 42} y={160} textAnchor="middle" className="sb-tx">closed</text>
              </g>
            )}
          </g>
        );
      })}
      <path d="M8 300H472" className="sb-dash" />
      <g transform="translate(40 300)">
        <g className="sb-broom">
          <line x1="14" y1="-84" x2="0" y2="-26" className="sb-limb" />
          <path d="M-18 -26h36l8 26h-52z" className="sb-ac" />
          {[-12, -4, 4, 12].map((x) => <path key={x} d={`M${x} -18l${x / 3} 16`} className="sb-bristle" />)}
        </g>
      </g>
    </svg>
  );
}
