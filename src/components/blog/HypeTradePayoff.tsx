"use client";

import { useState } from "react";

const LONG_STRIKE = 27;
const SHORT_STRIKE = 60;
const NET_PREMIUM = 6;
const MAX_PROFIT = SHORT_STRIKE - LONG_STRIKE - NET_PREMIUM; // 27
const MAX_LOSS = -NET_PREMIUM; // -6
const BREAKEVEN = LONG_STRIKE + NET_PREMIUM; // 33

// Chart dimensions
const W = 680;
const H = 340;
const PAD = { top: 20, right: 30, bottom: 45, left: 55 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

// Data range
const X_MIN = 0;
const X_MAX = 90;
const Y_MIN = -10;
const Y_MAX = 35;

function scaleX(val: number) {
  return PAD.left + ((val - X_MIN) / (X_MAX - X_MIN)) * PLOT_W;
}

function scaleY(val: number) {
  return PAD.top + ((Y_MAX - val) / (Y_MAX - Y_MIN)) * PLOT_H;
}

function payoff(spot: number): number {
  if (spot <= LONG_STRIKE) return MAX_LOSS;
  if (spot >= SHORT_STRIKE) return MAX_PROFIT;
  return spot - LONG_STRIKE - NET_PREMIUM;
}

// Generate payoff path points
function getPayoffPoints(): string {
  const points: string[] = [];
  for (let x = X_MIN; x <= X_MAX; x += 0.5) {
    points.push(`${scaleX(x)},${scaleY(payoff(x))}`);
  }
  return points.join(" ");
}

// Generate filled area path (area under curve to zero line)
function getAreaPath(): string {
  const zeroY = scaleY(0);
  let d = `M ${scaleX(X_MIN)},${zeroY}`;

  for (let x = X_MIN; x <= X_MAX; x += 0.5) {
    const y = payoff(x);
    d += ` L ${scaleX(x)},${scaleY(y)}`;
  }

  d += ` L ${scaleX(X_MAX)},${zeroY} Z`;
  return d;
}

// Grid lines
const Y_TICKS = [-10, -5, 0, 5, 10, 15, 20, 25, 30, 35];
const X_TICKS = [0, 10, 20, 27, 33, 40, 50, 60, 70, 80, 90];

export function HypeTradePayoff() {
  const [hover, setHover] = useState<{ x: number; y: number; spot: number; pnl: number } | null>(null);

  function handleMouseMove(e: React.MouseEvent<SVGSVGElement>) {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const svgX = (clientX / rect.width) * W;
    const spot = X_MIN + ((svgX - PAD.left) / PLOT_W) * (X_MAX - X_MIN);

    if (spot < X_MIN || spot > X_MAX) {
      setHover(null);
      return;
    }

    const pnl = payoff(spot);
    setHover({ x: scaleX(spot), y: scaleY(pnl), spot, pnl });
  }

  return (
    <div className="hype-payoff">
      {/* Stats row */}
      <div className="hype-payoff-stats">
        <div className="hype-payoff-stat">
          <span className="hype-payoff-stat-label">MAX PROFIT</span>
          <span className="hype-payoff-stat-value hype-payoff-profit">${MAX_PROFIT}.00</span>
        </div>
        <div className="hype-payoff-stat">
          <span className="hype-payoff-stat-label">MAX LOSS</span>
          <span className="hype-payoff-stat-value hype-payoff-loss">-${NET_PREMIUM}.00</span>
        </div>
        <div className="hype-payoff-stat">
          <span className="hype-payoff-stat-label">BREAKEVEN</span>
          <span className="hype-payoff-stat-value hype-payoff-breakeven">${BREAKEVEN}.00</span>
        </div>
      </div>

      {/* Chart */}
      <div className="hype-payoff-chart">
        <div className="hype-payoff-chart-header">
          <span className="hype-payoff-dot hype-payoff-dot-red" />
          <span className="hype-payoff-dot hype-payoff-dot-yellow" />
          <span className="hype-payoff-dot hype-payoff-dot-green" />
          <span className="hype-payoff-chart-title">PAYOFF_CHART</span>
        </div>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="hype-payoff-svg"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHover(null)}
        >
          {/* Grid lines */}
          {Y_TICKS.map((y) => (
            <line
              key={`gy-${y}`}
              x1={PAD.left}
              y1={scaleY(y)}
              x2={W - PAD.right}
              y2={scaleY(y)}
              stroke={y === 0 ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.06)"}
              strokeDasharray={y === 0 ? "4 3" : "2 4"}
            />
          ))}
          {X_TICKS.map((x) => (
            <line
              key={`gx-${x}`}
              x1={scaleX(x)}
              y1={PAD.top}
              x2={scaleX(x)}
              y2={H - PAD.bottom}
              stroke="rgba(0,0,0,0.06)"
              strokeDasharray="2 4"
            />
          ))}

          {/* Filled area — split into profit (above zero) and loss (below zero) */}
          <defs>
            <clipPath id="profit-clip">
              <rect x={PAD.left} y={PAD.top} width={PLOT_W} height={scaleY(0) - PAD.top} />
            </clipPath>
            <clipPath id="loss-clip">
              <rect x={PAD.left} y={scaleY(0)} width={PLOT_W} height={H - PAD.bottom - scaleY(0)} />
            </clipPath>
          </defs>

          <path d={getAreaPath()} fill="rgba(26, 82, 118, 0.12)" clipPath="url(#profit-clip)" />
          <path d={getAreaPath()} fill="rgba(220, 53, 69, 0.08)" clipPath="url(#loss-clip)" />

          {/* Payoff line */}
          <polyline
            points={getPayoffPoints()}
            fill="none"
            stroke="#1a5276"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Breakeven dot */}
          <circle cx={scaleX(BREAKEVEN)} cy={scaleY(0)} r="4" fill="#1a5276" />

          {/* Y-axis labels */}
          {Y_TICKS.filter((y) => y % 5 === 0).map((y) => (
            <text
              key={`yl-${y}`}
              x={PAD.left - 10}
              y={scaleY(y) + 4}
              textAnchor="end"
              fontSize="11"
              fill="#888"
              fontFamily="system-ui, sans-serif"
            >
              {y}
            </text>
          ))}

          {/* X-axis labels */}
          {X_TICKS.map((x) => (
            <text
              key={`xl-${x}`}
              x={scaleX(x)}
              y={H - PAD.bottom + 18}
              textAnchor="middle"
              fontSize="11"
              fill="#888"
              fontFamily="system-ui, sans-serif"
            >
              {x}
            </text>
          ))}

          {/* Axis labels */}
          <text
            x={W / 2}
            y={H - 4}
            textAnchor="middle"
            fontSize="12"
            fill="#666"
            fontFamily="system-ui, sans-serif"
          >
            Spot Price
          </text>
          <text
            x={14}
            y={H / 2}
            textAnchor="middle"
            fontSize="12"
            fill="#666"
            fontFamily="system-ui, sans-serif"
            transform={`rotate(-90, 14, ${H / 2})`}
          >
            P/L
          </text>

          {/* Hover crosshair */}
          {hover && (
            <>
              <line
                x1={hover.x}
                y1={PAD.top}
                x2={hover.x}
                y2={H - PAD.bottom}
                stroke="rgba(0,0,0,0.15)"
                strokeDasharray="3 3"
              />
              <circle cx={hover.x} cy={hover.y} r="5" fill="#1a5276" stroke="#fff" strokeWidth="2" />
              <rect
                x={hover.x + 10}
                y={hover.y - 30}
                width="110"
                height="36"
                rx="4"
                fill="#fff"
                stroke="rgba(0,0,0,0.1)"
              />
              <text x={hover.x + 16} y={hover.y - 14} fontSize="11" fill="#666" fontFamily="system-ui, sans-serif">
                HYPE: ${hover.spot.toFixed(1)}
              </text>
              <text
                x={hover.x + 16}
                y={hover.y - 1}
                fontSize="11"
                fontWeight="600"
                fill={hover.pnl >= 0 ? "#16a34a" : "#dc3545"}
                fontFamily="system-ui, sans-serif"
              >
                P/L: ${hover.pnl >= 0 ? "+" : ""}{hover.pnl.toFixed(2)}
              </text>
            </>
          )}
        </svg>
      </div>
    </div>
  );
}
