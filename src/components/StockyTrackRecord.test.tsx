import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StockyTrackRecord } from "./StockyTrackRecord";

describe("StockyTrackRecord", () => {
  it("renders the chronology (Jun 2025 → year one) in order, with the reconciled headline + curve", () => {
    const { container } = render(<StockyTrackRecord />);
    const jun = screen.getByText("Jun 2025");
    const year = screen.getByText("Year one");
    expect(jun).toBeTruthy();
    expect(year).toBeTruthy();
    expect(jun.compareDocumentPosition(year) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByText("29 Sep 2025")).toBeTruthy();
    expect(screen.getByText(/\+110%/)).toBeTruthy();
    expect(screen.getByRole("link", { name: /16\.57L net verified/i })).toBeTruthy();
    expect(screen.queryByText(/\+150%/)).toBeNull();
    expect(container.querySelector("path")).toBeTruthy();
  });

  it("embeds all 6 blog screenshots in blog order (heatmap → P&L; F&O overall → commodity)", () => {
    const { container } = render(<StockyTrackRecord />);
    const imgs = [...container.querySelectorAll("img")];
    expect(imgs).toHaveLength(6);
    expect([...imgs].every((im) => im.getAttribute("alt"))).toBe(true);

    const srcs = imgs.map((im) => im.getAttribute("src") ?? "");
    expect(srcs).toEqual([
      "/images/stocky/stocky-heatmap-jun-sep.png",
      "/images/stocky/stocky-pnl-jun-sep.png",
      "/images/stocky/stocky-heatmap-jun-dec.png",
      "/images/stocky/stocky-pnl-jun-dec.png",
      "/images/stocky/stocky-fno-overall.png",
      "/images/stocky/stocky-commodity-overall.png",
    ]);

    expect(screen.getByRole("link", { name: /full story/i }).getAttribute("href")).toBe("/blog/stocky-ai");
  });
});
