import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MissionControlHero } from "./MissionControlHero";
import { HeroEquityView } from "./HeroEquityCurve";
import { SITE } from "@/data/site";
import type { Payload } from "@/lib/trackRecord";

afterEach(() => vi.unstubAllGlobals());

describe("MissionControlHero", () => {
  it("renders identity + chip credentials + book CTA; falls back when feed is down", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("net")));
    render(await MissionControlHero());

    expect(screen.getByRole("heading", { name: /charandeep kapoor/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /Timelock/i }).getAttribute("href")).toContain("timelock");
    expect(screen.getByRole("link", { name: /^Stocky$/i }).getAttribute("href")).toBe("/markets");
    expect(screen.getAllByText(/ex-quant/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Delta Exchange/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.queryByText(/Delta MCP/)).toBeNull();

    expect(screen.getByText(/accumulating from Dhan/i)).toBeTruthy();
    expect(screen.getByText(/Read the essays/i)).toBeTruthy();
    const book = screen.getAllByRole("link", { name: /book a call/i });
    expect(book.some((a) => a.getAttribute("href") === SITE.socials.topmate)).toBe(true);
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
    expect(screen.getByText(/\+12\.0% return/)).toBeTruthy();
    expect(screen.getByText(/gross/)).toBeTruthy();
  });

  it("shows the accumulating state when the payload is null", () => {
    render(<HeroEquityView data={null} />);
    expect(screen.getByText(/accumulating from Dhan/i)).toBeTruthy();
  });
});
