import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ServicesAccordion } from "@/components/services-accordion";

const testServices = [
  { title: "Raumkonzept", text: "Ausführliche Beschreibung des Raumkonzepts." },
  { title: "Farbkonzept", text: "Ausführliche Beschreibung des Farbkonzepts." },
];

describe("ServicesAccordion", () => {
  it("keeps one card active and exposes the matching accessible panel", () => {
    render(<ServicesAccordion services={testServices} />);

    const firstTrigger = screen.getByRole("button", { name: /Raumkonzept/ });
    const secondTrigger = screen.getByRole("button", { name: /Farbkonzept/ });

    expect(firstTrigger).toHaveAttribute("aria-expanded", "true");
    expect(secondTrigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(secondTrigger);

    expect(firstTrigger).toHaveAttribute("aria-expanded", "false");
    expect(secondTrigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("region", { name: /Farbkonzept/ })).toHaveAttribute("aria-hidden", "false");
  });
});
