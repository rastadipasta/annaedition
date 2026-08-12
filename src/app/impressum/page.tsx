import type { Metadata } from "next";
import { getPageContent } from "@/sanity/queries";

export const metadata: Metadata = { title: "Impressum", robots: { index: false, follow: true } };
export default async function ImprintPage() {
  const page = await getPageContent("impressum");
  const sections = page?.sections?.length ? page.sections : [
    { heading: "Angaben gemäß § 5 DDG", text: "ANNA ÉDITION\nInhaberin: Anna [Nachname ergänzen]\n[Straße und Hausnummer]\n[PLZ] [Ort], Deutschland" },
    { heading: "Kontakt", text: "E-Mail: studio@annaedition.de\nTelefon: [Telefonnummer ergänzen]" },
    { heading: "Umsatzsteuer-ID", text: "[Falls vorhanden ergänzen]" },
    { heading: "Verbraucherstreitbeilegung", text: "Finalen, rechtlich geprüften Hinweis zur Teilnahmebereitschaft an Streitbeilegungsverfahren ergänzen." },
  ];
  return (
    <section className="section container legal">
      <p className="eyebrow" data-motion="load">{page?.eyebrow || "Rechtliches"}</p>
      <h1 className="display" data-motion="load" data-motion-order="1">{page?.title || "Impressum"}</h1>
      <p className="lede" data-motion="load" data-motion-order="2">{page?.intro || "Die folgenden Angaben sind vor der Veröffentlichung durch die finalen Unternehmensdaten zu ergänzen."}</p>
      {sections.map((section) => <div data-motion="reveal" key={section.heading}><h2>{section.heading}</h2><p className="legal-text">{section.text}</p></div>)}
    </section>
  );
}
