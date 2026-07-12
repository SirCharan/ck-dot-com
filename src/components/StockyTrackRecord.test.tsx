import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StockyTrackRecord } from "./StockyTrackRecord";

describe("StockyTrackRecord", () => {
  it("renders the chronology (Jun 2025 → year one) in order, with the reconciled headline + curve", () => {
    const { container } = render(<StockyTrackRecord />);
    // milestones present, chronological
    const jun = screen.getByText("Jun 2025");
    const year = screen.getByText("Year one");
    expect(jun).toBeTruthy();
    expect(year).toBeTruthy();
    expect(jun.compareDocumentPosition(year) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    // a mid milestone with its exact date
    expect(screen.getByText("29 Sep 2025")).toBeTruthy();
    // reconciled headline (gross + net verified) — never "+150%"
    expect(screen.getByText(/18\.8L gross/i)).toBeTruthy();
    expect(screen.getByRole("link", { name: /16\.57L net verified/i })).toBeTruthy();
    // the growth curve renders
    expect(container.querySelector("path")).toBeTruthy();
  });
});
