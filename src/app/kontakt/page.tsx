import type { Metadata } from "next";
import { Suspense } from "react";
import { InquiryForm } from "@/components/inquiry-form";
import { getPageContent } from "@/sanity/queries";

export const metadata: Metadata = { title: "Kontakt & Projektanfrage", description: "Erzähle ANNA ÉDITION von deinem privaten oder gewerblichen Interior-Projekt oder frage eine 1:1 Online-Beratung an.", alternates: { canonical: "/kontakt" } };

export default async function ContactPage() {
  const page = await getPageContent("kontakt");
  return <section className="section container"><header className="contact-intro"><div><p className="eyebrow" data-motion="load">{page?.eyebrow || "Der erste Schritt zu deinem Traumraum"}</p><h1 className="display" data-motion="load" data-motion-order="1">{page?.title || "Jetzt"} <span className="accent">{page?.accentTitle || "anfragen."}</span></h1></div><p className="lede" data-motion="load" data-motion-order="2">{page?.intro || "Teile mir die wichtigsten Eckpunkte zu deinem Projekt mit. Nach Prüfung deiner Anfrage erhältst du eine persönliche Rückmeldung und passende nächste Schritte."}</p></header><div data-motion="reveal"><Suspense fallback={<div className="form-shell" style={{ marginTop: "4rem", minHeight: 560 }}>Formular wird geladen …</div>}><InquiryForm /></Suspense></div></section>;
}
