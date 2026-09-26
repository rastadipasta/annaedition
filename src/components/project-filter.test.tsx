import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ProjectFilter } from "@/components/project-filter";
import { fallbackProjects } from "@/lib/content";
import { getProjectCategories, getProjectCover } from "@/lib/project-categories";

afterEach(cleanup);

describe("ProjectFilter", () => {
  it("shows each project once and switches category covers without changing destinations", () => {
    render(<ProjectFilter projects={fallbackProjects} />);
    expect(screen.getAllByRole("article")).toHaveLength(14);
    ["Berlin 2026", "Essen 2026", "Krefeld 2026"].forEach((title) => {
      expect(screen.queryByRole("link", { name: `${title} ansehen` })).not.toBeInTheDocument();
    });
    expect(screen.getByRole("link", { name: "Concrete Calm ansehen" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Burgundy Residence ansehen" })).toBeInTheDocument();
    const covers = [
      ["Emerald Skyline", "emerald-skyline", "delivery/09.jpg"],
      ["Burgundy Residence", "burgundy-residence", "delivery/01.jpg"],
      ["Berlin 2026", "koeln-2026", "MAIN.jpg"],
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
    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(screen.queryByRole("link", { name: "Berlin 2026 ansehen" })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Eingangsbereiche" }));
    expect(screen.getAllByRole("article")).toHaveLength(3);
    const entryway = screen.getByRole("link", { name: "Berlin 2026 ansehen" });
    expect(entryway).toHaveAttribute("href", "/projekte/muelheim-an-der-ruhr-2026");
    expect(within(entryway).getByText("Berlin, 2026")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Bäder" }));
    expect(screen.getAllByRole("article")).toHaveLength(5);
    expect(screen.getByRole("link", { name: "Essen 2026 ansehen" })).toHaveAttribute("href", "/projekte/essen-2026");
    expect(screen.getByRole("link", { name: "Krefeld 2026 ansehen" })).toHaveAttribute("href", "/projekte/krefeld-2026");

    fireEvent.click(screen.getByRole("button", { name: "Alle Projekte" }));
    expect(screen.getAllByRole("article")).toHaveLength(14);
    ["Berlin 2026", "Essen 2026", "Krefeld 2026"].forEach((title) => {
      expect(screen.queryByRole("link", { name: `${title} ansehen` })).not.toBeInTheDocument();
    });
    expect(screen.getAllByRole("link", { name: "Emerald Skyline ansehen" })).toHaveLength(1);
    expect(screen.getAllByRole("link", { name: "Burgundy Residence ansehen" })).toHaveLength(1);
    const lounge = screen.getByRole("link", { name: "Emerald Skyline ansehen" });
    expect(decodeURIComponent(within(lounge).getByRole("img").getAttribute("src")!)).toContain("/emerald-skyline/cover.jpg");
  });

  it.each([undefined, true, false])("supports overview visibility %s without affecting categories", (showInAllProjects) => {
    const project = { ...fallbackProjects[1], showInAllProjects };
    render(<ProjectFilter projects={[project]} />);
    expect(screen.queryAllByRole("article")).toHaveLength(showInAllProjects === false ? 0 : 1);
    fireEvent.click(screen.getByRole("button", { name: "Wohn- & Essbereiche" }));
    expect(screen.getByRole("link", { name: "Concrete Calm ansehen" })).toHaveAttribute("href", "/projekte/concrete-calm");
  });

  it("keeps older CMS projects with one category visible using their existing cover", () => {
    const legacyProject = fallbackProjects[1];
    expect(getProjectCategories(legacyProject)).toEqual(["Wohn- & Essbereiche"]);
    expect(getProjectCover(legacyProject, "Wohn- & Essbereiche")).toEqual(legacyProject.cover);
  });
});
