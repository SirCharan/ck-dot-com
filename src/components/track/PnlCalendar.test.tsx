import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PnlCalendar } from "./PnlCalendar";

// The grid pads back to the Sunday before the first data month. 1 Aug 2026 is a
// Saturday, so that Sunday is 26 Jul — which printed a "Jul" label one column left
// of "Aug" and read as a single word, "JulAug".
const augOnly = [
  { date: "2026-08-03", net: -42796 },
  { date: "2026-08-21", net: 55385 },
  { date: "2026-08-26", net: 4771 },
];

describe("PnlCalendar month labels", () => {
  it("does not label the leading pad month", () => {
    render(<PnlCalendar series={augOnly} />);
    expect(screen.queryByText("Jul")).toBeNull();
    expect(screen.getAllByText("Aug")).toHaveLength(1);
  });

  it("still labels every month of a longer record", () => {
    render(
      <PnlCalendar
        series={[
          { date: "2026-06-17", net: -635 },
          { date: "2026-07-15", net: -33823 },
          { date: "2026-08-26", net: 4771 },
        ]}
      />
    );
    for (const m of ["Jun", "Jul", "Aug"]) expect(screen.getAllByText(m)).toHaveLength(1);
  });

  it("renders a cell for each day in the framed range", () => {
    const { container } = render(<PnlCalendar series={augOnly} />);
    expect(container.querySelectorAll("rect").length).toBeGreaterThan(augOnly.length);
  });
});
