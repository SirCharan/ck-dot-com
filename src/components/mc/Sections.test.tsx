import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { McWork, McTrackRecord, McContact } from "./Sections";
import { SITE } from "@/data/site";

describe("Mission-Control landing (teaser) sections", () => {
  it("lists the work pillars as bullets with links (incl. Andrea's World)", () => {
    render(<McWork />);
    for (const title of ["Drishti", "Timelock", "Delta MCP", "Stocky AI", "Andrea's World"]) {
      expect(screen.getByRole("heading", { name: new RegExp(title, "i") })).toBeTruthy();
    }
    // teaser links out to the full work page
    expect(screen.getByRole("link", { name: /all work/i }).getAttribute("href")).toBe("/work");
    // at least one project links to a live URL and one to a detail page
    const links = screen.getAllByRole("link");
    expect(links.some((a) => a.getAttribute("href")?.startsWith("http"))).toBe(true);
    expect(links.some((a) => a.getAttribute("href") === "/work/andrea-world")).toBe(true);
  });

  it("frames the track record honestly + links to the real pages", () => {
    render(<McTrackRecord />);
    expect(screen.getByText(/accumulating a real, honest sample/i)).toBeTruthy();
    expect(screen.getByText(/Verified PnL/i)).toBeTruthy();
    expect(screen.queryByText(/23\.1L/)).toBeNull(); // never the seed portfolio numbers
    expect(screen.getByRole("link", { name: /live track record/i }).getAttribute("href")).toBe("/track-record");
  });

  it("routes booking to the real destination", () => {
    render(<McContact />);
    const topmate = screen.getAllByRole("link", { name: /topmate|book a call/i });
    expect(topmate.some((a) => a.getAttribute("href") === SITE.socials.topmate)).toBe(true);
  });
});
