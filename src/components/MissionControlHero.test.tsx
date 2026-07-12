import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MissionControlHero } from "./MissionControlHero";
import cycle from "@/data/decision-cycle.json";

/**
 * The hero is a pure render of the committed decision-cycle contract — no value
 * is hardcoded in the markup. If the data changes, the panel changes. This
 * locks that contract so the later live feed (Phase 3) can swap the data safely.
 */
describe("MissionControlHero", () => {
  it("renders the decision from the data contract, not hardcoded", async () => {
    render(await MissionControlHero());
    // direction + asset badge
    expect(
      screen.getByText(new RegExp(`${cycle.direction}\\s+${cycle.asset.replace("USD", "")}`, "i"))
    ).toBeTruthy();
    // levels come from data
    expect(screen.getByText(cycle.entry.toLocaleString())).toBeTruthy();
    expect(screen.getByText(cycle.target.toLocaleString())).toBeTruthy();
    // R:R value
    expect(screen.getByText(cycle.rr.toFixed(2))).toBeTruthy();
    // the model's reasoning prose is present verbatim (word-split for the
    // reveal animation, but every word stays in the DOM)
    expect(screen.getByTestId("mc-reasoning").textContent).toContain(cycle.reasoning);
    // identity + name
    expect(screen.getByRole("heading", { name: /charandeep kapoor/i })).toBeTruthy();
  });

  it("shows the resolved outcome when the cycle is resolved", async () => {
    render(await MissionControlHero());
    if (cycle.resolved) {
      expect(screen.getByText(new RegExp(`resolved.*${cycle.result.r}R`))).toBeTruthy();
    }
  });
});
