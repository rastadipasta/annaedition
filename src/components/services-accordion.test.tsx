import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ServicesAccordion } from "@/components/services-accordion";

const testServices = [
  { title: "Raumkonzept", text: "Ausführliche Beschreibung des Raumkonzepts." },
  { title: "Farbkonzept", text: "Ausführliche Beschreibung des Farbkonzepts." },
];

describe("ServicesAccordion", () => {
  it("renders every service as permanently expanded content", () => {
    render(<ServicesAccordion services={testServices} />);

    expect(screen.queryAllByRole("button")).toHaveLength(0);
    expect(screen.getByRole("heading", { name: "Raumkonzept" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Farbkonzept" })).toBeVisible();
    expect(screen.getByText(testServices[0].text)).toBeVisible();
    expect(screen.getByText(testServices[1].text)).toBeVisible();
  });
});
