import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { personSchema, professionalServiceSchema, websiteSchema } from "@/lib/seo";
import { getHomeContent, getPackages, getProjects } from "@/sanity/queries";

export default async function HomePage() {
  const [projects, packages, cms] = await Promise.all([getProjects(), getPackages(), getHomeContent()]);
  const featured = projects.find((project) => project.featured) || projects[0];
  const heroLines = [cms?.heroLine1 || "Thoughtful", cms?.heroLine2 || "Design.", cms?.heroLine3 || "Timeless", cms?.heroLine4 || "Interiors."];
  const structuredData = [websiteSchema(), professionalServiceSchema(), personSchema()];

  return (
    <div className="home-page">
      <JsonLd data={structuredData} />
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow" data-motion="load">{cms?.heroEyebrow || "Curated. Timeless. Unique."}</p>
            <h1 className="display hero-title typewriter-title" data-motion="load" data-motion-order="1" aria-label={heroLines.join(" ")}>
              <span className="typewriter-line typewriter-line-1" aria-hidden="true">{heroLines[0]}</span><br />
              <span className="typewriter-line typewriter-line-2" aria-hidden="true">{heroLines[1]}</span><br />
              <span className="typewriter-line typewriter-line-3 accent" aria-hidden="true">{heroLines[2]}</span><br />
              <span className="typewriter-line typewriter-line-4 accent" aria-hidden="true">{heroLines[3]}</span>
            </h1>
            <p className="lede" data-motion="load" data-motion-order="2">{cms?.heroIntro || "Wir gestalten durchdachte, funktionale Räume, die deine Persönlichkeit widerspiegeln und die Zeit überdauern."}</p>
            <div className="hero-actions" data-motion="load" data-motion-order="3">
              <Link className="button-link hero-cta-button hero-projects-button" href="/projekte">Projekte entdecken <ArrowRight size={16} /></Link>
              <Link className="button-link hero-cta-button hero-contact-button" href="/kontakt">Kontakt <ArrowRight size={16} /></Link>
            </div>
          </div>
          <div className="hero-media" data-motion="load" data-motion-variant="image" data-motion-order="2" data-scroll-parallax>
            <Image src={cms?.heroImage?.url || "/images/hero-interior-v3.png"} alt={cms?.heroImage?.alt || "Zeitloser Wohnbereich mit cremefarbenem Bouclé-Sofa, Bordeaux-Sessel und dunklem Holz"} fill priority sizes="(max-width: 800px) 100vw, 52vw" />
          </div>
        </div>
      </section>

      <section className="section wine-section">
        <div className="container philosophy-grid">
          <div className="philosophy-card" data-motion="reveal">
            <p className="eyebrow">{cms?.philosophyEyebrow || "Unsere Philosophie"}</p>
            <h2 className="display motion-title">{cms?.philosophyTitle || "Zeitlose Räume."} <span className="accent">{cms?.philosophyAccent || "Persönlich gestaltet."}</span></h2>
            <p>{cms?.philosophyText || "Ein Zuhause, das wirklich zu dir passt, entsteht nicht durch Zufall – es basiert auf einem klaren Plan. Jedes Detail wird sorgsam ausgewählt, damit Altes und Neues selbstverständlich zusammenfinden."}</p>
            <Link className="button-link" href="/leistungen">Wie wir zusammenarbeiten <ArrowRight size={16} /></Link>
          </div>
          <div className="philosophy-media" data-motion="reveal" data-motion-variant="image" data-motion-order="1" data-scroll-parallax>
            <Image src={cms?.philosophyImage?.url || "/images/projects/emerald-skyline/02.jpg"} alt={cms?.philosophyImage?.alt || "Emerald Skyline – offener Essbereich mit Naturstein, dunklem Holz und olivgrünen Sitzmöbeln"} fill sizes="(max-width: 800px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <header className="section-heading" data-motion="reveal">
            <p className="eyebrow">{cms?.featuredEyebrow || "Ausgewähltes Projekt"}</p>
            <h2 className="display motion-title">{cms?.featuredTitle || "Ideen, die"} <span className="accent">{cms?.featuredAccent || "Form annehmen."}</span></h2>
          </header>
          <article className="project-feature">
            <div className="image-frame" style={{ minHeight: 620 }} data-motion="reveal" data-motion-variant="image" data-scroll-parallax>
              <Image src={featured.cover.url} alt={featured.cover.alt} fill sizes="(max-width: 800px) 100vw, 52vw" />
            </div>
            <div data-motion="reveal" data-motion-order="1">
              <p className="eyebrow">{featured.location}, {featured.year}</p>
              <h3 className="display" style={{ fontSize: "clamp(3.4rem, 6vw, 6rem)", margin: "1rem 0" }}>{featured.title}</h3>
              <p className="lede">{featured.description}</p>
              <Link className="button-link" href={`/projekte/${featured.slug}`}>Projekt ansehen <ArrowRight size={16} /></Link>
            </div>
          </article>
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container">
          <header className="section-heading" data-motion="reveal">
            <p className="eyebrow">{cms?.packagesEyebrow || "Design-Pakete"}</p>
            <h2 className="display motion-title">{cms?.packagesTitle || "Planung, die"} <span className="accent">{cms?.packagesAccent || "zu dir passt."}</span></h2>
          </header>
          <div className="packages-grid">
            {packages.map((item, index) => (
              <article className="package" key={item.name} data-motion="reveal" data-motion-order={String(index)}>
                <p className="eyebrow">{item.eyebrow}</p><h3 className="display">{item.name}</h3><p>{item.description}</p>
                <ul>{item.features.map((feature) => <li key={feature}>{feature}</li>)}</ul><div className="package-price">{item.price}</div>
              </article>
            ))}
          </div>
          <div style={{ marginTop: "2rem" }} data-motion="reveal"><Link className="button-link" href="/leistungen">Alle Leistungen <ArrowRight size={16} /></Link></div>
        </div>
      </section>

      <section className="section callout motion-callout">
        <div className="container callout-grid">
          <div className="callout-copy" data-motion="reveal">
            <p className="eyebrow" style={{ color: "#ae895d" }}>{cms?.calloutEyebrow || "Schnelle Hilfe vom Profi"}</p>
            <h2 className="display motion-title">{cms?.calloutTitle || "Call a"}<br /><span style={{ color: "#ae895d" }}>{cms?.calloutAccent || "Designer."}</span></h2>
            <p className="lede" style={{ color: "#f1e7e3" }}>{cms?.calloutIntro || "Die unkomplizierte 1:1 Online-Beratung für schnelle Klarheit, eine professionelle Zweitmeinung und konkrete Ideen."}</p>
            <p className="display callout-price">{cms?.calloutPrice || "500 € Festpreis · 90 Minuten"}</p>
            <Link className="button-link" style={{ color: "#ae895d" }} href="/kontakt?anfrage=call">Beratung anfragen <ArrowRight size={16} /></Link>
          </div>
          <div className="callout-card" data-motion="reveal" data-motion-order="1">
            <ol>{(cms?.calloutSteps?.length ? cms.calloutSteps : ["Gemeinsame Analyse deines Raumes oder Grundrisses", "Konkrete Empfehlungen zu Stil, Farben und Materialien", "Dein persönlicher Fahrplan für die Umsetzung"]).map((step) => <li key={step}>{step}</li>)}</ol>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container project-feature">
          <div data-motion="reveal">
            <p className="eyebrow">{cms?.aboutEyebrow || "Das Gesicht hinter ANNA ÉDITION"}</p>
            <h2 className="display motion-title" style={{ fontSize: "clamp(3.4rem, 6vw, 6rem)", margin: "1rem 0 2rem" }}>{cms?.aboutTitle || "Ehrlich, authentisch und"} <span className="accent">{cms?.aboutAccent || "sicher geplant."}</span></h2>
            <p className="lede">{cms?.aboutIntro || "Mit feinem Gespür für Details und einem klaren räumlichen Blick begleite ich dich von der ersten Idee bis zu deinem persönlichen Wunsch-Zuhause."}</p>
            <Link className="button-link" href="/ueber-mich">Mehr über mich <ArrowRight size={16} /></Link>
          </div>
          <div className="image-frame" style={{ minHeight: 560 }} data-motion="reveal" data-motion-variant="image" data-motion-order="1" data-scroll-parallax><Image className="about-portrait-image" src="/images/anna-portrait.jpg" alt="Schwarz-Weiß-Porträt von Anna Matkovic" fill sizes="(max-width: 800px) 100vw, 45vw" /></div>
        </div>
      </section>
    </div>
  );
}
