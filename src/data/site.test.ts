import { describe, expect, it } from "vitest";
import { CASE_STUDIES } from "./site";

/** CASE_STUDIES schema guard — powers the /work/<slug> pages. */
describe("CASE_STUDIES schema", () => {
  it("has at least one case study", () => {
    expect(CASE_STUDIES.length).toBeGreaterThan(0);
  });

  it("every entry has all required fields, correctly typed & non-empty", () => {
    for (const cs of CASE_STUDIES) {
      const where = `case study "${cs.slug}"`;

      // Required string fields.
      for (const key of ["slug", "title", "kicker", "tagline", "role", "period"] as const) {
        expect(typeof cs[key], `${where}.${key} is a string`).toBe("string");
        expect(cs[key].length, `${where}.${key} non-empty`).toBeGreaterThan(0);
      }

      // stack: non-empty string[].
      expect(Array.isArray(cs.stack), `${where}.stack is an array`).toBe(true);
      expect(cs.stack.length, `${where}.stack non-empty`).toBeGreaterThan(0);
      cs.stack.forEach((s) => expect(typeof s).toBe("string"));

      // metrics: array of {value,label}.
      expect(Array.isArray(cs.metrics), `${where}.metrics is an array`).toBe(true);
      expect(cs.metrics.length, `${where}.metrics non-empty`).toBeGreaterThan(0);
      cs.metrics.forEach((m) => {
        expect(typeof m.value).toBe("string");
        expect(typeof m.label).toBe("string");
      });

      // sections: array of {heading, body:string[]}.
      expect(Array.isArray(cs.sections), `${where}.sections is an array`).toBe(true);
      expect(cs.sections.length, `${where}.sections non-empty`).toBeGreaterThan(0);
      cs.sections.forEach((sec) => {
        expect(typeof sec.heading).toBe("string");
        expect(sec.heading.length).toBeGreaterThan(0);
        expect(Array.isArray(sec.body)).toBe(true);
        expect(sec.body.length).toBeGreaterThan(0);
        sec.body.forEach((p) => expect(typeof p).toBe("string"));
      });

      // links: array (may be empty) of {label, href}.
      expect(Array.isArray(cs.links), `${where}.links is an array`).toBe(true);
      cs.links.forEach((l) => {
        expect(typeof l.label).toBe("string");
        expect(l.href).toMatch(/^https?:\/\//);
      });
    }
  });

  it("slugs are unique", () => {
    const slugs = CASE_STUDIES.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
