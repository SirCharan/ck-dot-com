import { afterEach, describe, expect, it, vi } from "vitest";
import { getTrackRecord } from "./trackRecord";

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
