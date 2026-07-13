import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MissionControlHero } from "./MissionControlHero";
import { HeroEquityView } from "./HeroEquityCurve";
import type { Payload } from "@/lib/trackRecord";

afterEach(() => vi.unstubAllGlobals());

describe("MissionControlHero", () => {
  it("renders identity, decluttered tickers, links; falls back honestly when the feed is down", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("net")));
    render(await MissionControlHero());

    expect(screen.getByRole("heading", { name: /charandeep kapoor/i })).toBeTruthy();
    expect(screen.getByText(/64%/)).toBeTruthy();
    expect(screen.getByText(/markets · Drishti live/)).toBeTruthy();
    // Delta MCP was pulled from the hero tickers too
    expect(screen.queryByText(/Delta MCP/)).toBeNull();

    // Stocky ticker links straight to the verified page — no dangling ¹ marker.
    const verified = screen.getByRole("link", { name: /Stocky · verified/i });
    expect(verified.getAttribute("href")).toContain("sensibull");
    expect(screen.queryByText("1", { selector: "sup" })).toBeNull();

    // feed down → honest accumulating state, never a broken panel
    expect(screen.getByText(/accumulating from Dhan/i)).toBeTruthy();
    expect(screen.getByText(/See the work/i)).toBeTruthy();
  });
});

describe("HeroEquityView", () => {
  it("renders the real curve + return when there are ≥2 points", () => {
    const data = {
      ok: true,
      asOf: "2026-07-12",
      provisional: false,
      series: [
        { date: "a", net: 0, gross: 0, cumulative: 0, grossCumulative: 0 },
        { date: "b", net: 100, gross: 120, cumulative: 100, grossCumulative: 120 },
      ],
      metrics: { grossCumulative: 120, annualizedReturnPct: 12.3 },
      meta: { e0: 1000, note: "" },
    } as unknown as Payload;
    render(<HeroEquityView data={data} />);
    // caption now leads with % return (120/1000 = +12.0%), ₹ gross in fine print
    expect(screen.getByText(/\+12\.0% return/)).toBeTruthy();
    expect(screen.getByText(/gross/)).toBeTruthy();
  });

  it("shows the accumulating state when the payload is null", () => {
    render(<HeroEquityView data={null} />);
    expect(screen.getByText(/accumulating from Dhan/i)).toBeTruthy();
  });
});
