import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeroReveal } from "./HeroReveal";

describe("HeroReveal", () => {
  it("renders every child (stagger wrapper must not drop any)", () => {
    render(
      <HeroReveal className="test-container">
        <p>alpha</p>
        <p>beta</p>
        <p>gamma</p>
      </HeroReveal>,
    );
    expect(screen.getByText("alpha")).toBeTruthy();
    expect(screen.getByText("beta")).toBeTruthy();
    expect(screen.getByText("gamma")).toBeTruthy();
  });

  it("passes className onto the container", () => {
    const { container } = render(
      <HeroReveal className="lg:col-span-7">
        <span>child</span>
      </HeroReveal>,
    );
    expect(container.querySelector(".lg\\:col-span-7")).toBeTruthy();
  });
});
