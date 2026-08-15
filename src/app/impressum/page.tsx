import type { Metadata } from "next";
import { getPageContent } from "@/sanity/queries";

export const metadata: Metadata = { title: "Impressum", robots: { index: false, follow: true } };
export default async function ImprintPage() {
  const page = await getPageContent("impressum");
  const sections = page?.sections?.length ? page.sections : [
    { heading: "Angaben gemäß § 5 DDG", text: "ANNA ÉDITION\nInhaberin: Anna Matkovic\nKreuzstraße 15\n46483 Wesel\nDeutschland" },
    { heading: "Kontakt", text: "Telefon: +49 157 5207 9305\nE-Mail: studio@annaedition.de" },
    { heading: "Umsatzsteuer-Identifikationsnummer", text: "Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:\n[USt-IdNr. ergänzen, falls vorhanden; andernfalls diesen Abschnitt entfernen]" },
    { heading: "Verantwortlich für redaktionelle Inhalte", text: "Verantwortlich gemäß § 18 Abs. 2 MStV:\nAnna Matkovic\nKreuzstraße 15\n46483 Wesel\nDeutschland" },
    { heading: "Verbraucherstreitbeilegung", text: "ANNA ÉDITION ist nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. Diese Angabe ist vor Veröffentlichung anhand der tatsächlichen Teilnahmebereitschaft und einer möglichen gesetzlichen Verpflichtung zu bestätigen." },
    { heading: "Haftung für Inhalte und Links", text: "Wir erstellen die Inhalte dieser Website mit größter Sorgfalt. Für die Richtigkeit, Vollständigkeit und Aktualität können wir jedoch keine Gewähr übernehmen. Unsere Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für diese fremden Inhalte ist stets der jeweilige Anbieter verantwortlich." },
    { heading: "Urheberrecht", text: "Die auf dieser Website veröffentlichten Inhalte, Fotografien, Visualisierungen und Gestaltungen unterliegen dem deutschen Urheberrecht. Jede Verwertung außerhalb der gesetzlichen Grenzen bedarf der vorherigen schriftlichen Zustimmung der jeweiligen Rechteinhaberin oder des jeweiligen Rechteinhabers." },
  ];
  return (
    <section className="section container legal">
      <p className="eyebrow" data-motion="load">{page?.eyebrow || "Rechtliches"}</p>
      <h1 className="display" data-motion="load" data-motion-order="1">{page?.title || "Impressum"}</h1>
      <p className="lede" data-motion="load" data-motion-order="2">{page?.intro || "Gesetzliche Anbieterinformationen und Kontaktangaben von ANNA ÉDITION."}</p>
      {sections.map((section) => <div data-motion="reveal" key={section.heading}><h2>{section.heading}</h2><p className="legal-text">{section.text}</p></div>)}
      <p className="legal-updated">Stand: August 2026</p>
    </section>
  );
}
