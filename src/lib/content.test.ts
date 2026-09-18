import { describe, expect, it } from "vitest";
import { categories, fallbackProjects, packages, services } from "@/lib/content";

describe("Leistungen content", () => {
  it("publishes only the current package and its deliverables", () => {
    expect(packages).toHaveLength(1);
    expect(packages[0]).toMatchObject({
      name: "Édition Unique",
      priceValue: 129,
      features: ["2D-Planung", "Produktempfehlungen", "3D-Visualisierung", "Das Édition Reveal"],
    });
  });

  it("includes prices for all six additional services", () => {
    expect(services).toHaveLength(6);
    expect(services.every((service) => service.title && service.text && service.price)).toBe(true);
  });
});

describe("project content", () => {
  it("publishes the six supplied projects in their editorial order", () => {
    expect(fallbackProjects.map((project) => project.slug)).toEqual([
      "emerald-skyline",
      "concrete-calm",
      "midnight-cocoon",
      "stone-silence",
      "burgundy-residence",
      "parisian-dream",
    ]);
    expect(fallbackProjects.map((project) => project.order)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("uses a distinct cover, ordered gallery and complete project story", () => {
    fallbackProjects.forEach((project) => {
      expect(project.cover.url).toContain(`/images/projects/${project.slug}/cover.jpg`);
      expect(project.gallery.length).toBeGreaterThan(0);
      expect(project.gallery[0].url).toContain(`/images/projects/${project.slug}/01.jpg`);
      expect(project.storySections.length).toBeGreaterThan(0);
    });
  });

  it("features Concrete Calm and exposes the new complete-concept filter", () => {
    expect(fallbackProjects.filter((project) => project.featured).map((project) => project.slug)).toEqual(["concrete-calm"]);
    expect(categories).toContain("Gesamtkonzepte");
  });
});
