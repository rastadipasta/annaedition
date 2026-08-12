import type { Metadata } from "next";
import { getPageContent } from "@/sanity/queries";

export const metadata: Metadata = { title: "Datenschutz", robots: { index: false, follow: true } };
export default async function PrivacyPage() {
  const page = await getPageContent("datenschutz");
  const sections = page?.sections?.length ? page.sections : [
    { heading: "Verantwortliche Stelle", text: "ANNA ÉDITION, Anna [Nachname und vollständige Anschrift ergänzen], E-Mail: studio@annaedition.de." },
    { heading: "Kontaktanfragen", text: "Wenn du uns über das Kontaktformular kontaktierst, verarbeiten wir deine Angaben ausschließlich zur Bearbeitung deiner Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO beziehungsweise deine Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO." },
    { heading: "Dateiuploads", text: "Hochgeladene Grundrisse, Moodboards und Inspirationsbilder werden für die Bearbeitung der Anfrage temporär gespeichert und nach spätestens 30 Tagen gelöscht." },
    { heading: "Auftragsverarbeiter", text: "Für Hosting, Dateispeicherung, E-Mail-Versand, Spamschutz und Content Management können Vercel, Resend, Cloudflare und Sanity eingesetzt werden. Die finalen Vertrags- und Drittlandangaben sind vor Launch zu ergänzen." },
    { heading: "Deine Rechte", text: "Du hast insbesondere das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerruf einer erteilten Einwilligung. Wende dich dazu an studio@annaedition.de." },
  ];
  return (
    <section className="section container legal">
      <p className="eyebrow" data-motion="load">{page?.eyebrow || "Rechtliches"}</p>
      <h1 className="display" data-motion="load" data-motion-order="1">{page?.title || "Datenschutz"}</h1>
      <p className="lede" data-motion="load" data-motion-order="2">{page?.intro || "Diese Arbeitsfassung beschreibt die im Projekt vorgesehenen Datenflüsse. Vor Veröffentlichung ist eine rechtliche Prüfung erforderlich."}</p>
      {sections.map((section) => <div data-motion="reveal" key={section.heading}><h2>{section.heading}</h2><p className="legal-text">{section.text}</p></div>)}
    </section>
  );
}
