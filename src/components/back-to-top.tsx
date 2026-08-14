"use client";

import { ArrowUp, Phone } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > 560);

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  function scrollToTop() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <>
      <a className="call-button" href="tel:+4915752079305" aria-label="ANNA ÉDITION anrufen: +49 157 5207 9305" title="+49 157 5207 9305">
        <Phone size={20} strokeWidth={1.7} aria-hidden="true" />
      </a>
      <button
        className="back-to-top"
        type="button"
        onClick={scrollToTop}
        data-visible={isVisible}
        aria-label="Zurück nach oben"
        aria-hidden={!isVisible}
        tabIndex={isVisible ? 0 : -1}
      >
        <ArrowUp size={21} strokeWidth={1.7} aria-hidden="true" />
      </button>
    </>
  );
}
