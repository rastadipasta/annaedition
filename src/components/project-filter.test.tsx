import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ProjectFilter } from "@/components/project-filter";
import { fallbackProjects } from "@/lib/content";
import { getProjectCategories, getProjectCover } from "@/lib/project-categories";

afterEach(cleanup);

describe("ProjectFilter", () => {
  it("shows each project once and switches category covers without changing destinations", () => {
    render(<ProjectFilter projects={fallbackProjects} />);
    expect(screen.getAllByRole("article")).toHaveLength(18);
    const covers = [
      ["Emerald Skyline", "emerald-skyline", "delivery/09.jpg"],
      ["Burgundy Residence", "burgundy-residence", "delivery/01.jpg"],
      ["Köln 2026", "koeln-2026", "MAIN.jpg"],
      ["Offenbach 2026", "offenbach-2026", "MAIN.jpg"],
    ];
    fireEvent.click(screen.getByRole("button", { name: "Küchen" }));
    expect(screen.getAllByRole("article")).toHaveLength(4);
    covers.forEach(([title, slug, file]) => {
      const link = screen.getByRole("link", { name: `${title} ansehen` });
      expect(link).toHaveAttribute("href", `/projekte/${slug}`);
      expect(decodeURIComponent(within(link).getByRole("img").getAttribute("src")!)).toContain(`/images/projects/${slug}/${file}`);
    });
    fireEvent.click(screen.getByRole("button", { name: "Wohn- & Essbereiche" }));
    expect(screen.getAllByRole("article")).toHaveLength(3);
    const cologne = screen.getByRole("link", { name: "Köln 2026 ansehen" });
    expect(cologne).toHaveAttribute("href", "/projekte/koeln-2026");
    expect(decodeURIComponent(within(cologne).getByRole("img").getAttribute("src")!)).toContain("/koeln-2026/01.jpg");

    fireEvent.click(screen.getByRole("button", { name: "Alle Projekte" }));
    expect(screen.getAllByRole("article")).toHaveLength(18);
    expect(screen.getAllByRole("link", { name: "Emerald Skyline ansehen" })).toHaveLength(1);
    expect(screen.getAllByRole("link", { name: "Burgundy Residence ansehen" })).toHaveLength(1);
    const lounge = screen.getByRole("link", { name: "Emerald Skyline ansehen" });
    expect(decodeURIComponent(within(lounge).getByRole("img").getAttribute("src")!)).toContain("/emerald-skyline/cover.jpg");
  });

  it("keeps older CMS projects with one category visible using their existing cover", () => {
    const legacyProject = fallbackProjects[1];
    expect(getProjectCategories(legacyProject)).toEqual(["Wohn- & Essbereiche"]);
    expect(getProjectCover(legacyProject, "Wohn- & Essbereiche")).toEqual(legacyProject.cover);
  });
});
