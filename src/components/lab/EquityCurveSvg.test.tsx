import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EquityCurveSvg } from "./EquityCurveSvg";

const series = [
  { date: "2025-06-02", cumulative: 0 },
  { date: "2025-09-01", cumulative: 300000 },
  { date: "2026-01-30", cumulative: 1800000 },
];

describe("EquityCurveSvg", () => {
  it("renders the line + capital(₹)/date axis labels when showAxes", () => {
    const { container } = render(
      <EquityCurveSvg series={series} valueOf={(p) => 1500000 + p.cumulative} showAxes formatY={(v) => `₹${Math.round(v / 1e5)}L`} />
    );
    expect(container.querySelector("path")).toBeTruthy();
    // a Y tick (max = 15L + 18L = 33L) and an X tick (date) are present
    expect(screen.getByText(/₹33L/)).toBeTruthy();
    expect(screen.getByText("25-06")).toBeTruthy(); // first date tick
    expect(screen.getByText("26-01")).toBeTruthy(); // last date tick
  });

  it("guards a thin series (<2 points) with an accumulating state", () => {
    render(<EquityCurveSvg series={[series[0]]} valueOf={(p) => p.cumulative} />);
    expect(screen.getByText(/accumulating/i)).toBeTruthy();
  });
});
