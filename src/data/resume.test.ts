import { describe, expect, it } from "vitest";
import { RESUME, skillCount } from "./resume";

/**
 * Résumé guard. Two jobs:
 *  1. schema — every field the page renders is present and non-empty
 *  2. budget — the tripwire. The résumé must fit ONE A4 page, so content cannot
 *     creep back in. If a limit here fails, either cut content or accept a
 *     2-page résumé deliberately (and change these numbers on purpose).
 */
describe("résumé content", () => {
  it("has identity and a profile", () => {
    expect(RESUME.name).toBe("Charandeep Kapoor");
    expect(RESUME.title.length).toBeGreaterThan(0);
    expect(RESUME.profile.length).toBeGreaterThan(0);
  });

  it("has every contact field except the optional phone", () => {
    for (const key of ["email", "location", "site", "linkedin", "github", "twitter"] as const) {
      expect(typeof RESUME.contact[key], `contact.${key} is a string`).toBe("string");
      expect(RESUME.contact[key].length, `contact.${key} non-empty`).toBeGreaterThan(0);
    }
    // phone must exist as a key so the page can test it, but may be empty.
    expect(typeof RESUME.contact.phone).toBe("string");
  });

  it("every role has company, position, duration, and either bullets or a one-liner", () => {
    for (const role of RESUME.experience) {
      const where = `${role.company} (${role.position})`;
      for (const key of ["company", "position", "duration"] as const) {
        expect(role[key].length, `${where}.${key} non-empty`).toBeGreaterThan(0);
      }
      for (const b of role.bullets ?? []) {
        // An unquoted "word: word" YAML list item parses as an object, not a
        // string, and crashes the render. Keep this assertion.
        expect(typeof b, `${where} bullet is a string, not a YAML mapping`).toBe("string");
      }
      const hasBullets = Array.isArray(role.bullets) && role.bullets.length > 0;
      const hasOne = typeof role.one === "string" && role.one.length > 0;
      expect(hasBullets || hasOne, `${where} has bullets or a one-liner`).toBe(true);
    }
  });

  it("every system has a name, a link and a line", () => {
    for (const s of RESUME.systems) {
      expect(s.name.length, `system name non-empty`).toBeGreaterThan(0);
      if (s.href) expect(s.href.startsWith("http"), `${s.name} href is absolute`).toBe(true);
      expect(s.line.length, `${s.name} line non-empty`).toBeGreaterThan(0);
      if (s.proof) {
        expect(s.proof.label.length, `${s.name} proof label non-empty`).toBeGreaterThan(0);
        expect(s.proof.href.startsWith("http"), `${s.name} proof href is absolute`).toBe(true);
      }
    }
  });

  it("every ledger row has a title", () => {
    for (const row of [...RESUME.academics, ...RESUME.certifications]) {
      expect(row.title.length, `ledger row title non-empty`).toBeGreaterThan(0);
      expect(typeof row.detail, `"${row.title}".detail is a string`).toBe("string");
    }
  });

  // ── One-page budget ───────────────────────────────────────────────────────
  it("stays inside the one-page budget", () => {
    expect(skillCount(), "skills across all groups").toBeLessThanOrEqual(13);
    expect(RESUME.systems.length, "systems").toBeLessThanOrEqual(5);
    expect(RESUME.experience.length, "roles").toBeLessThanOrEqual(7);
    expect(RESUME.academics.length, "academics rows").toBeLessThanOrEqual(5);
    expect(RESUME.certifications.length, "certification rows").toBeLessThanOrEqual(4);
    expect(RESUME.profile.length, "profile chars").toBeLessThanOrEqual(360);

    for (const s of RESUME.systems) {
      expect(s.line.length, `system "${s.name}" line chars`).toBeLessThanOrEqual(200);
    }
    // Detailed roles get at most 3 bullets; each bullet stays inside two lines.
    for (const role of RESUME.experience) {
      const where = `${role.company} (${role.position})`;
      expect(role.bullets?.length ?? 0, `${where} bullets`).toBeLessThanOrEqual(6);
      for (const b of role.bullets ?? []) {
        expect(b.length, `${where} bullet chars`).toBeLessThanOrEqual(170);
      }
      if (role.one) expect(role.one.length, `${where} one-liner chars`).toBeLessThanOrEqual(120);
    }
  });

  it("uses no em dashes in résumé prose", () => {
    // Em dash is an AI-writing tell (anti-slop law) and prints badly at 9.5pt.
    // En dashes in date ranges are correct and deliberately not checked here.
    const prose = [
      RESUME.profile,
      ...RESUME.systems.map((s) => s.line),
      ...RESUME.experience.flatMap((r) => [...(r.bullets ?? []), r.one ?? ""]),
    ].join(" ");
    expect(prose).not.toContain("—");
  });
});
