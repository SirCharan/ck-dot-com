import { describe, expect, it } from "vitest";
import { parseNumeric } from "./TickNumber";

describe("parseNumeric", () => {
  it("splits a plain percentage with suffix", () => {
    const r = parseNumeric("150%+");
    expect(r.target).toBe(150);
    expect(r.prefix).toBe("");
    expect(r.suffix).toBe("%+");
    expect(r.decimals).toBe(0);
  });

  it("keeps a currency prefix and one decimal", () => {
    const r = parseNumeric("$7.3M");
    expect(r.prefix).toBe("$");
    expect(r.target).toBeCloseTo(7.3);
    expect(r.decimals).toBe(1);
    expect(r.suffix).toBe("M");
  });

  it("strips grouping commas but records grouped", () => {
    const r = parseNumeric("1,000+");
    expect(r.target).toBe(1000);
    expect(r.grouped).toBe(true);
    expect(r.suffix).toBe("+");
  });

  it("passes a non-numeric string through as suffix with NaN target", () => {
    const r = parseNumeric("—");
    expect(Number.isNaN(r.target)).toBe(true);
    expect(r.suffix).toBe("—");
  });

  it("handles a ratio like 2.29", () => {
    const r = parseNumeric("2.29");
    expect(r.target).toBeCloseTo(2.29);
    expect(r.decimals).toBe(2);
  });
});
