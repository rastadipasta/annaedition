import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { ServicesAccordion } from "@/components/services-accordion";
import { baseUrl } from "@/lib/content";
import { getPackages, getPageContent, getServices } from "@/sanity/queries";

export const metadata: Metadata = { title: "Leistungen & Preise", description: "Interior-Design-Pakete, 3D-Visualisierungen und Call a Designer – vor Ort oder online.", alternates: { canonical: "/leistungen" } };

export default async function ServicesPage() {
  const [packages, services, page] = await Promise.all([getPackages(), getServices(), getPageContent("leistungen")]);
  return (
    <>
      <JsonLd data={services.map((service) => ({ "@context": "https://schema.org", "@type": "Service", name: service.title, description: service.text, provider: { "@type": "ProfessionalService", name: "ANNA ÉDITION", url: baseUrl } }))} />
      <section className="container">
        <header className="page-hero"><p className="eyebrow" data-motion="load">{page?.eyebrow || "Leistungen"}</p><h1 className="display" data-motion="load" data-motion-order="1">{page?.title || "Maßgeschneiderte Planung –"} <span className="accent">{page?.accentTitle || "vor Ort oder online."}</span></h1><p className="lede" data-motion="load" data-motion-order="2">{page?.intro || "Vom ersten Moodboard bis zur realistischen 3D-Visualisierung: Wähle den Umfang, der zu deinem Raum und deiner Entscheidung passt."}</p></header>
        <div className="packages-grid packages-stack">
          {packages.map((item, index) => <article className="package" key={item.name} data-motion="reveal" data-motion-order={String(index)}><p className="eyebrow">{item.eyebrow}</p><h2 className="display">{item.name}</h2><p>{item.description}</p><ul>{item.features.map((feature) => <li key={feature}>{feature}</li>)}</ul><div className="package-price">{item.price}</div></article>)}
        </div>
        <aside className="extras-card" data-motion="reveal"><p className="eyebrow">Extra-Bausteine (Optional dazubuchbar)</p><p><strong>Lichtideen & Beleuchtungskonzept</strong> · 15 € / m² &nbsp;&nbsp; <strong>Detaillierte Möbel-Shoppingliste (für Paket 1 & 2)</strong> ➔ 25 € / qm</p><small>Bei jedem Paket sind bis zu drei Anpassungsrunden enthalten. Weitere Änderungen oder zusätzliche 3D-Ansichten können flexibel hinzugebucht werden.</small></aside>
      </section>
      <section className="section callout motion-callout"><div className="container callout-grid"><div data-motion="reveal"><p className="eyebrow" style={{ color: "#ae895d" }}>Schnelle Hilfe vom Profi</p><h2 className="display motion-title">Call a<br /><span style={{ color: "#ae895d" }}>Designer.</span></h2><p className="lede" style={{ color: "#f2e8e3" }}>90 Minuten persönliche Online-Beratung, konkrete Empfehlungen und eine maßgeschneiderte Shoppingliste.</p><p className="display services-callout-price" style={{ fontSize: "2.2rem", color: "#ae895d" }}>500 € inkl. MwSt.</p><Link className="button-link" style={{ color: "#ae895d" }} href="/kontakt?anfrage=call">Jetzt Beratung anfragen <ArrowRight size={16} /></Link></div><div className="callout-card" data-motion="reveal" data-motion-order="1"><p>Du brauchst keine komplette Raumplanung, sondern schnelle Klarheit, eine professionelle Zweitmeinung oder kreative Ideen für ein einzelnes Zimmer? Dieses Format ist direkt, fokussiert und unabhängig von deinem Wohnort.</p></div></div></section>
      <section className="section container"><header className="section-heading" data-motion="reveal"><p className="eyebrow">Unsere Bausteine</p><h2 className="display motion-title">Im <span className="accent">Detail.</span></h2></header><div data-motion="reveal"><ServicesAccordion services={services} /></div></section>
    </>
  );
}
