"use client";

import { Cookie, Settings2, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type ConsentChoice = "all" | "necessary";

const consentCookie = "anna_cookie_consent";
const consentLifetime = 60 * 60 * 24 * 180;

function readConsent(): ConsentChoice | null {
  const value = document.cookie.split("; ").find((entry) => entry.startsWith(`${consentCookie}=`))?.split("=")[1];
  return value === "all" || value === "necessary" ? value : null;
}

function storeConsent(choice: ConsentChoice) {
  document.cookie = `${consentCookie}=${choice}; Max-Age=${consentLifetime}; Path=/; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  if (choice === "all") localStorage.setItem("anna-theme", document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  else localStorage.removeItem("anna-theme");
  window.dispatchEvent(new CustomEvent("anna:consent-change", { detail: choice }));
}

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
    if (new URLSearchParams(location.search).has("cookie-settings")) history.replaceState(null, "", location.pathname + location.hash);
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
      <p id="cookie-description">Wir verwenden notwendige Speicherungen für den sicheren Betrieb der Website. Mit deiner Einwilligung merken wir uns zusätzlich dein gewähltes Farbschema. Analyse- oder Marketing-Cookies setzen wir nicht ein.</p>
      {detailsOpen ? <div className="cookie-consent-details">
        <p><strong>Notwendig</strong><span>Speichert deine Datenschutz-Auswahl für 180 Tage und ermöglicht grundlegende Sicherheitsfunktionen.</span></p>
        <p><strong>Komfort</strong><span>Speichert deine Auswahl zwischen hellem und dunklem Farbschema für 180 Tage.</span></p>
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
