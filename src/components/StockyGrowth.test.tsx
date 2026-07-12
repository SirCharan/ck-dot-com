import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StockyGrowth } from "./StockyGrowth";
import { CASE_STUDIES } from "@/data/site";
import stocky from "@/data/stocky-curve.json";

describe("StockyGrowth", () => {
  it("renders the verified-story headline + a curve, scoped to the real window", () => {
    const { container } = render(<StockyGrowth />);
    // gross curve figure + net verified figure BOTH shown (reconciled, not conflated)
    expect(screen.getByText(/18\.8L gross/i)).toBeTruthy();
    expect(screen.getByRole("link", { name: /16\.57L net verified/i }).getAttribute("href")).toContain("sensibull");
    expect(screen.getByText(/73% win/i)).toBeTruthy();
    expect(container.querySelector("path")).toBeTruthy(); // the curve renders
  });

  it("uses the committed Zerodha curve (Jun 2025 window, ≥2 points)", () => {
    expect(stocky.series.length).toBeGreaterThan(2);
    expect(stocky.window.start.startsWith("2025-06")).toBe(true);
  });
});

describe("Andrea's World", () => {
  it("exists as a case study so /work/andrea-world routes + shows in the index", () => {
    expect(CASE_STUDIES.some((c) => c.slug === "andrea-world")).toBe(true);
  });
});
