import { afterEach, describe, expect, it, vi } from "vitest";
import { formatWindowStart, getTrackRecord } from "./trackRecord";

afterEach(() => vi.unstubAllGlobals());

describe("getTrackRecord", () => {
  it("returns null when the feed throws (hero never breaks)", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("net")));
    expect(await getTrackRecord()).toBeNull();
  });

  it("returns null on a non-ok response or ok:false payload", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    expect(await getTrackRecord()).toBeNull();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: false }) }));
    expect(await getTrackRecord()).toBeNull();
  });

  it("returns the payload when ok", async () => {
    const p = { ok: true, series: [], asOf: null, provisional: false, metrics: {}, meta: { e0: 0, note: "" } };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => p }));
    const r = await getTrackRecord();
    expect(r?.ok).toBe(true);
  });
});

describe("formatWindowStart", () => {
  it("labels the window start the way the copy reads it", () => {
    expect(formatWindowStart("2026-08-01")).toBe("1 Aug 2026");
    expect(formatWindowStart("2026-12-25")).toBe("25 Dec 2026");
  });

  it("returns null when the API omits or malforms `from` (label is then hidden)", () => {
    expect(formatWindowStart(undefined)).toBeNull();
    expect(formatWindowStart(null)).toBeNull();
    expect(formatWindowStart("")).toBeNull();
    expect(formatWindowStart("01-08-2026")).toBeNull();
    expect(formatWindowStart("2026-13-01")).toBeNull();
  });

  it("passes meta.from through from the feed", async () => {
    const p = {
      ok: true,
      series: [],
      asOf: "2026-08-27",
      provisional: true,
      metrics: {},
      meta: { e0: 1_000_000, from: "2026-08-01", note: "" },
    };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => p }));
    const r = await getTrackRecord();
    expect(r?.meta.from).toBe("2026-08-01");
    expect(formatWindowStart(r?.meta.from)).toBe("1 Aug 2026");
  });
});
