import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EquityCurveSvg } from "./EquityCurveSvg";

const series = [
  { date: "2025-06-02", cumulative: 0 },
  { date: "2025-09-01", cumulative: 300000 },
  { date: "2026-01-30", cumulative: 1800000 },
];

// A zero-crossing return series: up, deep trough, recovery past zero.
const crossing = [
  { date: "2026-06-17", v: 0.5 },
  { date: "2026-06-18", v: 4 },
  { date: "2026-07-01", v: -2 },
  { date: "2026-07-02", v: -6 },
  { date: "2026-08-03", v: -0.5 },
  { date: "2026-08-04", v: 1.2 },
];

describe("EquityCurveSvg", () => {
  it("renders the line + capital(₹)/month axis labels when showAxes", () => {
    const { container } = render(
      <EquityCurveSvg series={series} valueOf={(p) => 1500000 + p.cumulative} showAxes formatY={(v) => `₹${Math.round(v / 1e5)}L`} />
    );
    expect(container.querySelector("path")).toBeTruthy();
    // a Y tick (max = 15L + 18L = 33L) and month-boundary X ticks (multi-year → year suffix)
    expect(screen.getByText(/₹33L/)).toBeTruthy();
    expect(screen.getByText("Jun ’25")).toBeTruthy(); // first boundary
    expect(screen.getByText("Jan ’26")).toBeTruthy(); // last boundary
  });

  it("guards a thin series (<2 points) with an accumulating state", () => {
    render(<EquityCurveSvg series={[series[0]]} valueOf={(p) => p.cumulative} />);
    expect(screen.getByText(/accumulating/i)).toBeTruthy();
  });

  it("splits tone at the waterline when the series crosses zero", () => {
    const { container } = render(
      <EquityCurveSvg series={crossing} valueOf={(p) => p.v} showAxes formatY={(v) => `${v >= 0 ? "+" : ""}${v.toFixed(0)}%`} />
    );
    // solid zero line + a "0" Y tick
    const zeroLine = [...container.querySelectorAll("line")].find(
      (l) => l.getAttribute("stroke")?.includes("--faint") && !l.getAttribute("stroke-dasharray") && l.getAttribute("x2") === "800"
    );
    expect(zeroLine).toBeTruthy();
    expect(screen.getByText("0")).toBeTruthy();
    // the line is drawn twice, clipped above and below the waterline
    const clipped = [...container.querySelectorAll("path[clip-path]")].filter((p) => p.getAttribute("fill") === "none");
    expect(clipped.length).toBe(2);
    // same-year series → bare month names
    expect(screen.getByText("Jun")).toBeTruthy();
    expect(screen.getByText("Jul")).toBeTruthy();
    expect(screen.getByText("Aug")).toBeTruthy();
  });

  it("keeps a non-crossing series single-tone (no clip paths)", () => {
    const { container } = render(<EquityCurveSvg series={series} valueOf={(p) => 1500000 + p.cumulative} />);
    expect(container.querySelectorAll("path[clip-path]").length).toBe(0);
  });

  it("renders annotations and the tip label when asked", () => {
    render(
      <EquityCurveSvg
        series={crossing}
        valueOf={(p) => p.v}
        annotate
        formatAnnot={(v) => `${v >= 0 ? "+" : ""}${v.toFixed(1)}%`}
        tipLabel="+1.2%"
      />
    );
    expect(screen.getByText("low -6.0%")).toBeTruthy(); // drawdown trough
    expect(screen.getByText(/best day \+/)).toBeTruthy(); // biggest single step
    expect(screen.getByText("+1.2%")).toBeTruthy(); // live tip
  });

  it("still labels the best day when it is the final point (the tip)", () => {
    // biggest up-step is the last step: -6 → +1.2
    const tipBest = [
      { date: "2026-06-17", v: 0.5 },
      { date: "2026-07-02", v: -6 },
      { date: "2026-08-21", v: 1.2 },
    ];
    render(
      <EquityCurveSvg
        series={tipBest}
        valueOf={(p) => p.v}
        annotate
        formatAnnot={(v) => `${v >= 0 ? "+" : ""}${v.toFixed(1)}%`}
        tipLabel="+1.2%"
      />
    );
    expect(screen.getByText("best day +7.2%")).toBeTruthy();
  });

  it("shows the trading-day count when asked", () => {
    render(
      <EquityCurveSvg series={crossing} valueOf={(p) => p.v} showAxes formatY={(v) => `${v}%`} showDayCount />
    );
    expect(screen.getByText("6 trading days")).toBeTruthy();
  });
});

describe("EquityCurveSvg zeroOrigin", () => {
  // Day one's own P&L is a step, not the starting level. The Dhan window opens on a
  // −4.3% day, so without an origin the line began mid-drawdown.
  const dhan = [
    { date: "2026-08-03", v: -4.3 },
    { date: "2026-08-04", v: -2.1 },
    { date: "2026-08-26", v: 8.8 },
  ];

  it("keeps the day count to real trading days (the origin is not a day)", () => {
    const { container } = render(
      <EquityCurveSvg series={dhan} valueOf={(p) => p.v} showAxes showDayCount zeroOrigin />
    );
    expect(container.querySelector(".ecs-days")!.textContent).toBe("3 trading days");
  });

  it("pulls the plotted minimum down to the series low, not the first day", () => {
    // With the origin the range is [−4.3, 8.8] and 0 is inside it → the chart must
    // split at the waterline, and the axis must show the 0 tick.
    const { container } = render(
      <EquityCurveSvg series={dhan} valueOf={(p) => p.v} showAxes formatY={(v) => `${v >= 0 ? "+" : ""}${v.toFixed(0)}%`} zeroOrigin />
    );
    expect(screen.getByText("0")).toBeTruthy();
    expect(container.querySelectorAll("path").length).toBeGreaterThan(1);
  });

  it("starts the line on the zero waterline", () => {
    const { container } = render(
      <EquityCurveSvg series={dhan} valueOf={(p) => p.v} height={100} zeroOrigin />
    );
    const d = container.querySelector("path")!.getAttribute("d")!;
    const [, firstX, firstY] = /^M([\d.]+),([\d.]+)/.exec(d)!;
    // min −4.3, max 8.8, plotH 84 → y(0) = 84 − (4.3/13.1)×84 ≈ 56.4
    expect(Number(firstX)).toBe(0);
    expect(Number(firstY)).toBeCloseTo(56.4, 0);
  });

  it("is off by default — the first point stays the first day", () => {
    const { container } = render(
      <EquityCurveSvg series={dhan} valueOf={(p) => p.v} height={100} />
    );
    const d = container.querySelector("path")!.getAttribute("d")!;
    const [, , firstY] = /^M([\d.]+),([\d.]+)/.exec(d)!;
    expect(Number(firstY)).toBeCloseTo(84, 0); // bottom of the plot = the −4.3% low
  });
});

describe("EquityCurveSvg day count", () => {
  const dhan = [
    { date: "2026-08-03", v: -4.3 },
    { date: "2026-08-04", v: -2.1 },
    { date: "2026-08-26", v: 8.8 },
  ];

  it("excludes the provisional tip so the count matches the settled-day stats", () => {
    // The page shows "18 active days" next to the chart; counting today's live point
    // as a trading day made the two contradict each other on one screen.
    const { container } = render(
      <EquityCurveSvg series={dhan} valueOf={(p) => p.v} showAxes showDayCount provisional />
    );
    expect(container.querySelector(".ecs-days")!.textContent).toBe("2 trading days");
  });
});
