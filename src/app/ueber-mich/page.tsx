import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPageContent } from "@/sanity/queries";

export const metadata: Metadata = { title: "Über mich", description: "Lerne Anna kennen – Interior Designerin am Niederrhein und das Gesicht hinter ANNA ÉDITION.", alternates: { canonical: "/ueber-mich" } };

export default async function AboutPage() {
  const page = await getPageContent("ueber-mich");
  const paragraphs = page?.paragraphs?.length ? page.paragraphs : [
    "Schon als Kind habe ich unser Zuhause leidenschaftlich gerne umgestaltet und Freunden dabei geholfen, ihre Zimmer einzurichten. Nach einem kurzen Ausflug in die Eventbranche war mir schnell klar: Mein Herz brennt bedingungslos für das Interior Design.",
    "Mit der Ausbildung an der renommierten MonaPort Academy habe ich meinen großen Traum wahr gemacht und begleite dich heute von meiner Heimat am Niederrhein – nahe Duisburg – auf dem Weg zu deinem Wunsch-Zuhause.",
    "Ein Zuhause ist der Ort, an dem wir die meiste Zeit verbringen. Es beeinflusst unsere Gefühle, schenkt uns Energie und sollte für jeden von uns ein sicherer Rückzugsort sein.",
    "Aus eigener Erfahrung weiß ich, wie schnell Fehlkäufe passieren, wenn das nötige Fachwissen fehlt. Genau da setze ich an: Ich plane von Anfang an alles durchdacht und stilsicher für dich. So sparst du wertvolle Zeit, vermeidest teure Fehlentscheidungen und investierst dein Geld an der richtigen Stelle.",
  ];
  return (
    <section className="section container about-grid">
      <div className="about-visual" data-motion="load" data-motion-variant="image"><p className="eyebrow">{page?.eyebrow || "Über mich"}</p><div className="about-portrait"><Image src={page?.image?.url || "/images/moodboard.jpg"} alt={page?.image?.alt || "ANNA ÉDITION Materialwelt in Bordeaux und Naturstein"} fill priority sizes="(max-width: 800px) 100vw, 42vw" /></div><p className="script" style={{ fontSize: "2rem", color: "var(--wine)", textAlign: "right" }}>Anna</p></div>
      <div className="about-copy"><h1 className="display" data-motion="load" data-motion-order="1">{page?.title || "Das Gesicht hinter"} <span className="accent">{page?.accentTitle || "ANNA ÉDITION."}</span></h1><p className="lede" data-motion="load" data-motion-order="2">{page?.intro || "Das feine Gespür für Details, ein starkes räumliches Vorstellungsvermögen und die Liebe zum Organisieren begleiten mich schon mein ganzes Leben."}</p>{paragraphs.slice(0, 2).map((paragraph) => <p data-motion="reveal" key={paragraph}>{paragraph}</p>)}<blockquote className="quote" data-motion="reveal">{page?.quote || "„Anna sieht einfach Dinge und Details, die anderen gar nicht auffallen.“"}</blockquote><h2 className="display" data-motion="reveal">{page?.secondaryTitle || "Ehrlich, authentisch und"} <span className="accent">{page?.secondaryAccentTitle || "sicher geplant."}</span></h2>{paragraphs.slice(2).map((paragraph) => <p data-motion="reveal" key={paragraph}>{paragraph}</p>)}<Link className="button-link" href="/kontakt" data-motion="reveal">Erzähl mir von deinem Projekt <ArrowRight size={16} /></Link></div>
    </section>
  );
}
