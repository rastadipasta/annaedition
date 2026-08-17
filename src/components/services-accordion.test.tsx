import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ServicesAccordion } from "@/components/services-accordion";

const testServices = [
  { title: "Raumkonzept", text: "Ausführliche Beschreibung des Raumkonzepts." },
  { title: "Farbkonzept", text: "Ausführliche Beschreibung des Farbkonzepts." },
];

describe("ServicesAccordion", () => {
  it("opens one service at a time and closes it on a second click", () => {
    render(<ServicesAccordion services={testServices} />);

    expect(screen.getByRole("heading", { name: "Raumkonzept" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Farbkonzept" })).toBeVisible();

    const roomButton = screen.getByRole("button", { name: "Raumkonzept öffnen" });
    const colorButton = screen.getByRole("button", { name: "Farbkonzept öffnen" });
    expect(roomButton).toHaveAttribute("aria-expanded", "false");
    expect(colorButton).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(roomButton);
    expect(screen.getByRole("button", { name: "Raumkonzept schließen" })).toHaveAttribute("aria-expanded", "true");
    expect(colorButton).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(colorButton);
    expect(screen.getByRole("button", { name: "Raumkonzept öffnen" })).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("button", { name: "Farbkonzept schließen" })).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(screen.getByRole("button", { name: "Farbkonzept schließen" }));
    expect(screen.getByRole("button", { name: "Farbkonzept öffnen" })).toHaveAttribute("aria-expanded", "false");
  });
});
