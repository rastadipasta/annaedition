import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { baseUrl } from "@/lib/content";
import { getProject, getProjects } from "@/sanity/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() { return (await getProjects()).map((project) => ({ slug: project.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; const project = await getProject(slug); if (!project) return {};
  return { title: project.title, description: project.excerpt, alternates: { canonical: `/projekte/${slug}` }, openGraph: { images: [project.cover] } };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params; const project = await getProject(slug); if (!project) notFound();
  const all = await getProjects(); const index = all.findIndex((item) => item.slug === slug); const next = all[(index + 1) % all.length];
  const galleryStyle = { "--gallery-distance": `${Math.max(project.gallery.length - 1, 1) * 52}vw` } as CSSProperties;
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CreativeWork", name: project.title, description: project.description, image: project.gallery, creator: { "@type": "Organization", name: "ANNA ÉDITION" }, url: `${baseUrl}/projekte/${slug}` }} />
      <article className="container project-detail-hero">
        <Link className="button-link" href="/projekte" data-motion="load"><ArrowLeft size={16} /> Alle Projekte</Link>
        <header className="project-detail-head"><div><p className="eyebrow" data-motion="load" data-motion-order="1">{project.category}</p><h1 className="display" data-motion="load" data-motion-order="2">{project.title}</h1></div><p className="eyebrow" data-motion="load" data-motion-order="2">{project.location}, {project.year}</p></header>
        <div className="project-hero-image" data-motion="load" data-motion-variant="image" data-motion-order="3" data-scroll-parallax><Image src={project.cover} alt={`${project.title} – Hauptansicht`} fill priority sizes="100vw" /></div>
        <div className="project-story"><div data-motion="reveal"><p className="eyebrow">Materialwelt</p><ul className="material-list">{project.materials.map((material) => <li key={material}>{material}</li>)}</ul></div><div data-motion="reveal" data-motion-order="1"><h2 className="display motion-title" style={{ fontSize: "clamp(3rem, 6vw, 6rem)", marginTop: 0 }}>Ein Raum mit <span className="accent">eigener Geschichte.</span></h2><p className="lede">{project.description}</p></div></div>
        <div className="gallery-scroll" style={galleryStyle} data-gallery-count={project.gallery.length}>
          <div className="gallery-sticky">
            <div className="gallery gallery-track">{project.gallery.map((image, imageIndex) => <figure key={`${image}-${imageIndex}`} data-motion="reveal" data-motion-variant="image" data-motion-order={String(imageIndex % 3)} data-scroll-parallax><Image src={image} alt={`${project.title} – Ansicht ${imageIndex + 1}`} fill sizes="(max-width: 800px) 100vw, 76vw" /></figure>)}</div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", paddingBottom: "6rem" }} data-motion="reveal"><Link className="button-link" href={`/projekte/${next.slug}`}>Nächstes Projekt: {next.title} <ArrowRight size={16} /></Link></div>
      </article>
    </>
  );
}
