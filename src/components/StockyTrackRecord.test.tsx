import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StockyTrackRecord } from "./StockyTrackRecord";

describe("StockyTrackRecord", () => {
  it("renders the chronology (Jun 2025 → year one) in order, with the reconciled headline + curve", () => {
    const { container } = render(<StockyTrackRecord />);
    // milestones present, chronological
    const jun = screen.getByText("Jun 2025");
    const year = screen.getByText("Year one");
    expect(jun).toBeTruthy();
    expect(year).toBeTruthy();
    expect(jun.compareDocumentPosition(year) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    // a mid milestone with its exact date
    expect(screen.getByText("29 Sep 2025")).toBeTruthy();
    // reconciled headline (net %-ROI + net verified) — never "+150%"
    expect(screen.getByText(/\+110%/)).toBeTruthy();
    expect(screen.getByRole("link", { name: /16\.57L net verified/i })).toBeTruthy();
    expect(screen.queryByText(/\+150%/)).toBeNull();
    // the growth curve renders
    expect(container.querySelector("path")).toBeTruthy();
    // blog images inline in the timeline (lazy, with alt text)
    const imgs = container.querySelectorAll("img");
    expect(imgs.length).toBeGreaterThanOrEqual(2);
    expect([...imgs].every((im) => im.getAttribute("alt"))).toBe(true);
  });
});
