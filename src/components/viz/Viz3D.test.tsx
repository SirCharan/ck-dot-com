import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Viz3D } from "./Viz3D";

/**
 * Viz3D gating contract:
 *  - prefers-reduced-motion  → fallback (never the scene)
 *  - mobile (<640) + mobile="fallback" → fallback
 *  - in-view + capable (wide, motion allowed) → scene
 * Achieved by mocking matchMedia, innerWidth and IntersectionObserver.
 */

const scene = <div data-testid="scene">SCENE</div>;
const fallback = <div data-testid="fallback">FALLBACK</div>;
const renderScene = () => scene;

// Configurable IntersectionObserver mock: fires the callback synchronously on
// observe() with the intersecting value we set for the current test.
let intersecting = true;
function installIO() {
  class MockIO {
    private cb: IntersectionObserverCallback;
    constructor(cb: IntersectionObserverCallback) {
      this.cb = cb;
    }
    observe = (el: Element) => {
      this.cb(
        [{ isIntersecting: intersecting, target: el } as IntersectionObserverEntry],
        this as unknown as IntersectionObserver,
      );
    };
    unobserve = () => {};
    disconnect = () => {};
    takeRecords = () => [];
    root = null;
    rootMargin = "";
    thresholds = [];
  }
  vi.stubGlobal("IntersectionObserver", MockIO);
}

function setEnv({ reduce, width }: { reduce: boolean; width: number }) {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    writable: true,
    value: width,
  });
  window.matchMedia = ((query: string) => ({
    matches: reduce && query.includes("reduce"),
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

describe("Viz3D gating", () => {
  beforeEach(() => {
    intersecting = true;
    installIO();
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows the scene when in-view, wide and motion-allowed", () => {
    setEnv({ reduce: false, width: 1280 });
    render(<Viz3D variant="orbits" renderScene={renderScene} fallback={fallback} />);
    expect(screen.getByTestId("scene")).toBeInTheDocument();
    expect(screen.queryByTestId("fallback")).not.toBeInTheDocument();
  });

  it("shows the fallback under prefers-reduced-motion (even when in-view & wide)", () => {
    setEnv({ reduce: true, width: 1280 });
    render(<Viz3D variant="orbits" renderScene={renderScene} fallback={fallback} />);
    expect(screen.getByTestId("fallback")).toBeInTheDocument();
    expect(screen.queryByTestId("scene")).not.toBeInTheDocument();
  });

  it("shows the fallback on mobile (<640) when mobile='fallback'", () => {
    setEnv({ reduce: false, width: 480 });
    render(<Viz3D variant="orbits" renderScene={renderScene} fallback={fallback} />);
    expect(screen.getByTestId("fallback")).toBeInTheDocument();
    expect(screen.queryByTestId("scene")).not.toBeInTheDocument();
  });

  it("shows the scene on mobile when mobile='scene' (opt-in)", () => {
    setEnv({ reduce: false, width: 480 });
    render(
      <Viz3D variant="orbits" mobile="scene" renderScene={renderScene} fallback={fallback} />,
    );
    expect(screen.getByTestId("scene")).toBeInTheDocument();
  });

  it("shows the fallback when off-screen (not in view) despite being capable", () => {
    intersecting = false;
    setEnv({ reduce: false, width: 1280 });
    render(<Viz3D variant="orbits" renderScene={renderScene} fallback={fallback} />);
    expect(screen.getByTestId("fallback")).toBeInTheDocument();
    expect(screen.queryByTestId("scene")).not.toBeInTheDocument();
  });
});
