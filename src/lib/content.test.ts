import { describe, expect, it } from "vitest";
import { categories, fallbackProjects, packages, services } from "@/lib/content";

describe("Leistungen content", () => {
  it("keeps the package deliverables clearly separated", () => {
    expect(packages.find((item) => item.name === "Édition Essentielle")?.features).toContain(
      "Farb- & Materialkarte (für Wände & Oberflächen)",
    );
    expect(packages.find((item) => item.name === "Édition Unique")?.features).toEqual(
      expect.arrayContaining([
        "Detaillierte Möbel-Shoppingliste (mit Direktlinks)",
        "Einkauf & Finales Styling (Persönlich vor Ort)",
      ]),
    );
  });

  it("uses the approved detailed service titles and descriptions", () => {
    expect(services).toEqual(expect.arrayContaining([
      {
        title: "Farb- & Materialkarte",
        text: "Zu jedem Basiskonzept erstellen wir für dich eine übersichtliche Farb- und Materialkarte für deine Wandgestaltung und Oberflächen. Du bekommst konkrete Farbnummern, Tapetenempfehlungen und nützliche Materialhinweise genannt, damit die Basis deines Raumes perfekt abgestimmt ist. (Möbel-Produktempfehlungen sind in dieser Karte nicht enthalten).",
      },
      {
        title: "Detaillierte Möbel-Shoppingliste",
        text: "Ideen werden zu realen Möbeln. Du erhältst eine vollständige, maßgeschneiderte Produktliste für alle Einrichtungsgegenstände deines Raumes (Sofa, Tische, Leuchten, Teppiche etc.). Wir nennen dir exakte Maße, Preise und packen die direkten Online-Links zu den Händlern dazu. So kannst du alles stressfrei, stilsicher und ohne langes Suchen nachkaufen.",
      },
      {
        title: "Einkauf & Finales Styling (Vor Ort)",
        text: "Der krönende Abschluss deines Projekts direkt bei dir vor Ort. Wenn deine Möbel geliefert und aufgebaut sind, komme ich persönlich in deine Wohnung. Wir gehen auf Wunsch gemeinsam Accessoires einkaufen und ich setze Kissen, Leuchten, Pflanzen und Dekoration mit dem passenden Blick für Details in deinen fertigen Räumen in Szene. Für dich entstehen so wunderschöne Wohnwelten mit echtem Wohlfühlcharakter.",
      },
    ]));
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
