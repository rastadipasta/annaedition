import type { Metadata } from "next";
import { ProjectFilter } from "@/components/project-filter";
import { getPageContent, getProjects } from "@/sanity/queries";

export const metadata: Metadata = { title: "Projekte", description: "Ausgewählte Interior-Design-Projekte und realistische 3D-Visualisierungen von ANNA ÉDITION.", alternates: { canonical: "/projekte" } };

export default async function ProjectsPage() {
  const [projects, page] = await Promise.all([getProjects(), getPageContent("projekte")]);
  return (
    <section className="container">
      <header className="page-hero">
        <p className="eyebrow" data-motion="load">{page?.eyebrow || "Projekte"}</p>
        <h1 className="display" data-motion="load" data-motion-order="1">{page?.title || "Ideen, die"} <span className="accent">{page?.accentTitle || "Form annehmen."}</span></h1>
        <p className="lede" data-motion="load" data-motion-order="2">{page?.intro || "Jedes Zuhause erzählt eine eigene Geschichte. Entdecke ausgewählte Kundenprojekte und realistische 3D-Visualisierungen – vom ersten Gedanken bis zum zeitlosen Raum."}</p>
      </header>
      <ProjectFilter projects={projects} />
    </section>
  );
}
