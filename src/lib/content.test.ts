import { describe, expect, it } from "vitest";
import { categories, fallbackProjects, packages, services } from "@/lib/content";
import { existsSync } from "node:fs";
import path from "node:path";

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
  it("preserves the six existing projects and adds exactly twelve unique projects", () => {
    expect(fallbackProjects.slice(0, 6).map((project) => project.slug)).toEqual([
      "emerald-skyline",
      "concrete-calm",
      "midnight-cocoon",
      "stone-silence",
      "burgundy-residence",
      "parisian-dream",
    ]);
    expect(fallbackProjects).toHaveLength(18);
    expect(new Set(fallbackProjects.map((project) => project.slug)).size).toBe(18);
    expect(fallbackProjects.map((project) => project.order)).toEqual(Array.from({ length: 18 }, (_, i) => i + 1));
  });

  it("uses a distinct cover, ordered gallery and complete project story", () => {
    fallbackProjects.forEach((project) => {
      expect(project.gallery.length).toBeGreaterThan(0);
      expect(project.gallery[0].url).toContain(`/images/projects/${project.slug}/01.jpg`);
      expect(project.storySections.length).toBeGreaterThan(0);
      const images = [project.cover, ...project.gallery];
      expect(new Set(images.map((image) => image.url)).size).toBe(images.length);
      [...images, ...(project.categoryCovers || []).map((entry) => entry.image)].forEach((image) => {
        expect(existsSync(path.join(process.cwd(), "public", image.url)), image.url).toBe(true);
      });
    });
    fallbackProjects.slice(6).forEach((project) => {
      expect(project.storySections.map((section) => section.heading)).toEqual(["Die Vision", "Das Highlight", "Der Kontrast", "Die Raumstruktur", "Vibe"]);
    });
  });

  it("features Concrete Calm and exposes the new complete-concept filter", () => {
    expect(fallbackProjects.filter((project) => project.featured).map((project) => project.slug)).toEqual(["concrete-calm"]);
    expect(categories).toContain("Gesamtkonzepte");
  });
});
