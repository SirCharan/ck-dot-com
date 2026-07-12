import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { McWork, McTrackRecord, McContact } from "./Sections";
import { SITE } from "@/data/site";

describe("Mission-Control landing sections", () => {
  it("shows the work pillars evenly (trading is one of several)", () => {
    render(<McWork />);
    for (const title of ["Drishti", "Timelock", "Delta MCP", "Stocky AI", "Perps at Delta"]) {
      expect(screen.getByRole("heading", { name: new RegExp(title, "i") })).toBeTruthy();
    }
  });

  it("frames the track record honestly (accumulating sample, verified anchor)", () => {
    render(<McTrackRecord />);
    expect(screen.getByText(/accumulating a smaller, honest sample/i)).toBeTruthy();
    expect(screen.getByText(/Verified PnL/i)).toBeTruthy();
    // never headlines the seed portfolio numbers (₹23.1L etc.)
    expect(screen.queryByText(/23\.1L/)).toBeNull();
  });

  it("routes the booking + socials to the real destinations", () => {
    render(<McContact />);
    const topmate = screen.getAllByRole("link", { name: /topmate|book a call/i });
    expect(topmate.some((a) => a.getAttribute("href") === SITE.socials.topmate)).toBe(true);
  });
});
