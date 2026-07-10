import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Token / style sanity guard for the Ephemeris design system.
 * Reads src/index.css from disk (framework-agnostic) and asserts the
 * design-system contract holds, including the anti-AI "no blur" rule.
 */
const css = readFileSync(resolve(process.cwd(), "src/index.css"), "utf8");

describe("index.css design-system contract", () => {
  it("documents the phi-scale type ramp", () => {
    expect(css).toMatch(/phi-scale \(type ramp\): 15 · 20 · 30 · 48 · 78px/);
  });

  it("defines the core Ephemeris tokens", () => {
    for (const token of ["--ink-void", "--bone", "--amber"]) {
      expect(css, `${token} defined`).toMatch(new RegExp(`${token}\\s*:`));
    }
  });

  it("does NOT use backdrop-blur (anti-AI-slop guard)", () => {
    expect(css).not.toMatch(/backdrop-blur/);
  });
});
