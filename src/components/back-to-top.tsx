"use client";

import { ArrowUp } from "lucide-react";
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
  );
}
