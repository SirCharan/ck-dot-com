import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Token / style guard for the PHOSPHOR design system.
 * Reads src/index.css from disk (framework-agnostic) and asserts the
 * design-system contract: the phosphor law ("only live money glows") is
 * encoded in the .mc scope, and the anti-AI-slop tells stay out.
 */
const css = readFileSync(resolve(process.cwd(), "src/index.css"), "utf8");

// Isolate the first `.mc {` token block for scoped assertions.
const mcStart = css.indexOf(".mc {");
const mcBlock = css.slice(mcStart, css.indexOf("\n  }", mcStart));

describe("index.css PHOSPHOR contract", () => {
  it("defines the eight PHOSPHOR tokens in the .mc scope", () => {
    for (const token of [
      "--black",
      "--ivory",
      "--ash",
      "--phosphor",
      "--phosphor-dim",
      "--loss",
      "--surface",
      "--hairline",
    ]) {
      expect(mcBlock, `${token} defined in .mc`).toMatch(new RegExp(`${token}\\s*:`));
    }
  });

  it("has removed the dead .terminal scope", () => {
    // .terminal-grid etc. may still exist (Phase 2 cleanup); only the
    // token-remapping `.terminal {` scope must be gone.
    expect(css).not.toMatch(/(^|\s)\.terminal\s*\{/m);
  });

  it("uses no text-shadow glow anywhere (banned tell #1)", () => {
    expect(css).not.toMatch(/text-shadow/);
  });

  it("uses no backdrop-filter/blur outside the blog (banned tell #3)", () => {
    // .blog-root is exempt; it carries no blur, so a whole-file check holds.
    expect(css).not.toMatch(/backdrop-filter|backdrop-blur/);
  });
});
