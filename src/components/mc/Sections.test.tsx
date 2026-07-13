import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { McWork, McTrackRecord, McContact } from "./Sections";
import { SITE } from "@/data/site";

describe("Mission-Control landing (teaser) sections", () => {
  it("lists the work pillars as bento cards with links (incl. Andrea's World)", () => {
    render(<McWork />);
    for (const title of ["Drishti", "Timelock", "Stocky AI", "Delta Support Audit", "Andrea's World"]) {
      expect(screen.getByRole("heading", { name: new RegExp(title, "i") })).toBeTruthy();
    }
    expect(screen.queryByRole("heading", { name: /Delta MCP/i })).toBeNull();
    expect(screen.getByRole("link", { name: /all work/i }).getAttribute("href")).toBe("/work");
    const links = screen.getAllByRole("link");
    expect(links.some((a) => a.getAttribute("href")?.startsWith("http"))).toBe(true);
    expect(links.some((a) => a.getAttribute("href") === "/work/delta-support-audit")).toBe(true);
    expect(links.some((a) => a.getAttribute("href") === "/work/andrea-world")).toBe(true);
  });

  it("frames the two accounts (AI vs algo) honestly + links to the real pages", async () => {
    render(await McTrackRecord());
    expect(screen.getByText(/Zerodha · Stocky/i)).toBeTruthy();
    expect(screen.getByText(/Dhan · live/i)).toBeTruthy();
    expect(screen.getByText(/Claude Haiku/i)).toBeTruthy();
    expect(screen.getAllByText(/rule-based/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/no LLM in the loop/i)).toBeTruthy();
    expect(screen.queryByText(/23\.1L/)).toBeNull();
    expect(screen.getByText(/Verified PnL/i)).toBeTruthy();
    expect(screen.getByRole("link", { name: /live track record/i }).getAttribute("href")).toBe(
      "/track-record",
    );
  });

  it("routes booking to the real destination", () => {
    render(<McContact />);
    const topmate = screen.getAllByRole("link", { name: /topmate|book a call/i });
    expect(topmate.some((a) => a.getAttribute("href") === SITE.socials.topmate)).toBe(true);
  });
});
