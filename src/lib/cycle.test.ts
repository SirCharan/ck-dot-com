import { afterEach, describe, expect, it, vi } from "vitest";
import { adaptCycle, getCycle } from "./cycle";
import committed from "@/data/decision-cycle.json";

describe("adaptCycle", () => {
  it("passes a well-formed cycle through", () => {
    const out = adaptCycle(committed);
    expect(out).not.toBeNull();
    expect(out?.direction).toBe(committed.direction);
    expect(out?.rr).toBe(committed.rr);
  });

  it("rejects a degraded (non-ok status) payload", () => {
    expect(adaptCycle({ ...committed, status: "llm_error" })).toBeNull();
  });

  it("rejects payloads missing required levels", () => {
    expect(adaptCycle({ ...committed, entry: "n/a" })).toBeNull();
    expect(adaptCycle(null)).toBeNull();
    expect(adaptCycle("nope")).toBeNull();
  });
});

describe("getCycle", () => {
  const orig = process.env.DRISHTI_CYCLE_URL;
  afterEach(() => {
    process.env.DRISHTI_CYCLE_URL = orig;
    vi.unstubAllGlobals();
  });

  it("falls back to the committed cycle when no feed URL is set", async () => {
    delete process.env.DRISHTI_CYCLE_URL;
    const r = await getCycle();
    expect(r.live).toBe(false);
    expect(r.cycle.entry).toBe(committed.entry);
  });

  it("falls back (stale) when the feed rejects — the hero never breaks", async () => {
    process.env.DRISHTI_CYCLE_URL = "https://example.invalid/cycle.json";
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));
    const r = await getCycle();
    expect(r.live).toBe(false);
    expect(r.cycle.direction).toBe(committed.direction);
  });

  it("goes live when the feed returns a valid cycle", async () => {
    process.env.DRISHTI_CYCLE_URL = "https://example.test/cycle.json";
    const fresh = { ...committed, cycle: 9999, entry: 60000 };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => fresh })
    );
    const r = await getCycle();
    expect(r.live).toBe(true);
    expect(r.cycle.entry).toBe(60000);
    expect(r.cycle.cycle).toBe(9999);
  });
});
