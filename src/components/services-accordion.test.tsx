import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ServicesAccordion } from "@/components/services-accordion";

describe("ServicesAccordion", () => {
  it("exposes expanded state and toggles panels", () => {
    render(<ServicesAccordion />);
    const first = screen.getByRole("button", { name: /Raum- & Grundkonzepte/i });
    const second = screen.getByRole("button", { name: /Moodboards & Farbkonzepte/i });
    expect(first).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(second);
    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(second).toHaveAttribute("aria-expanded", "true");
  });
});
