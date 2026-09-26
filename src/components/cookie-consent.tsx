"use client";

import { Cookie, Settings2, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { readConsent, storeConsent, type ConsentChoice } from "@/lib/privacy-preferences";

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    const settingsRequested = new URLSearchParams(location.search).has("cookie-settings");
    const frame = requestAnimationFrame(() => setOpen(settingsRequested || !readConsent()));
    return () => cancelAnimationFrame(frame);
  }, []);

  function choose(choice: ConsentChoice) {
    storeConsent(choice);
    setOpen(false);
    setDetailsOpen(false);
    const url = new URL(location.href);
    if (url.searchParams.has("cookie-settings")) {
      url.searchParams.delete("cookie-settings");
      history.replaceState(null, "", url.pathname + url.search + url.hash);
    }
  }

  if (!open) return null;

  return (
    <aside className="cookie-consent" role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-description">
      <div className="cookie-consent-head">
        <span className="cookie-consent-icon" aria-hidden="true"><Cookie size={19} /></span>
        <div>
          <p className="eyebrow">Cookies & Datenschutz</p>
          <h2 id="cookie-title">Deine Privatsphäre, deine Wahl.</h2>
        </div>
        <button className="cookie-consent-close" type="button" onClick={() => choose("necessary")} aria-label="Nur notwendige Cookies verwenden und schließen"><X size={18} /></button>
      </div>
      <p id="cookie-description">Wir speichern deine Datenschutz-Auswahl. Mit deiner Einwilligung merken wir uns zusätzlich dein Farbschema und zeigen die Startanimation nur einmal pro Sitzung. Analyse- oder Marketing-Cookies setzen wir nicht ein.</p>
      {detailsOpen ? <div className="cookie-consent-details">
        <p><strong>Notwendig</strong><span>„anna_cookie_consent“ speichert deine Datenschutz-Auswahl als Cookie für 180 Tage.</span></p>
        <p><strong>Komfort</strong><span>„anna-theme“ speichert dein Farbschema als Cookie bis zum Ablauf deiner Einwilligung, maximal 180 Tage. „anna-site-intro-seen“ merkt sich die Startanimation im Sitzungsspeicher bis zum Ende der Sitzung. Du kannst beides jederzeit über „Cookie-Einstellungen“ widerrufen.</span></p>
      </div> : null}
      <div className="cookie-consent-actions">
        <button className="cookie-accept" type="button" onClick={() => choose("all")}>Alle akzeptieren</button>
        <button className="cookie-necessary" type="button" onClick={() => choose("necessary")}>Nur notwendige</button>
      </div>
      <div className="cookie-consent-links">
        <button type="button" onClick={() => setDetailsOpen((value) => !value)} aria-expanded={detailsOpen}><Settings2 size={15} /> Einstellungen</button>
        <Link href="/datenschutz">Datenschutz</Link>
      </div>
    </aside>
  );
}

export function CookieSettingsButton() {
  return <a className="footer-cookie-link" href="?cookie-settings=1">Cookie-Einstellungen</a>;
}
