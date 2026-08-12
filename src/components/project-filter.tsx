"use client";

import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/content";
import type { Project, ProjectCategory } from "@/lib/types";

export function ProjectFilter({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<ProjectCategory>("Alle Projekte");
  const deferredSelected = useDeferredValue(selected);
  const visible = deferredSelected === "Alle Projekte" ? projects : projects.filter((project) => project.category === deferredSelected);

  useEffect(() => {
    window.dispatchEvent(new Event("anna:motion-refresh"));
  }, [deferredSelected]);

  return (
    <>
      <div className="filters" aria-label="Projekte filtern" data-motion="reveal">
        {categories.map((category) => (
          <button key={category} className="filter-button" type="button" aria-pressed={selected === category} onClick={() => setSelected(category)}>
            {category}
          </button>
        ))}
      </div>
      <div className="project-grid" aria-live="polite">
        {visible.map((project, index) => (
          <article className="project-card" key={project.slug} data-motion="reveal" data-motion-order={String(index % 3)}>
            <Link href={`/projekte/${project.slug}`} aria-label={`${project.title} ansehen`}>
              <div className="image-frame">
                <Image src={project.cover} alt={`${project.title} – ${project.category}`} fill loading={index < 2 ? "eager" : "lazy"} sizes="(max-width: 800px) 100vw, 55vw" />
              </div>
              <div className="project-meta"><span>{project.location}, {project.year}</span><span>{project.category}</span></div>
              <h2 className="display">{project.title} <ArrowUpRight size={24} aria-hidden="true" /></h2>
              <p className="lede">{project.excerpt}</p>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
