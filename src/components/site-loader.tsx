"use client";

import { useEffect, useState } from "react";

const loaderDuration = 1750;
const loaderExitDuration = 700;

export function SiteLoader() {
  const [phase, setPhase] = useState<"loading" | "exit" | "done">("loading");

  useEffect(() => {
    const root = document.documentElement;
    const introEnabled = (window as Window & { __annaIntroEnabled?: boolean }).__annaIntroEnabled === true;
    if (!introEnabled) {
      const hideTimer = window.setTimeout(() => setPhase("done"), 0);
      return () => window.clearTimeout(hideTimer);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const exitTimer = window.setTimeout(() => setPhase("exit"), loaderDuration);
    const doneTimer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem("anna-site-intro-seen", "true");
      } catch {
        // The intro still finishes when browser storage is unavailable.
      }
      root.classList.remove("site-intro-enabled", "site-intro-skip");
      document.body.style.overflow = previousOverflow;
      setPhase("done");
    }, loaderDuration + loaderExitDuration);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
      root.classList.remove("site-intro-enabled", "site-intro-skip");
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className="site-loader site-loader-active" data-phase={phase} aria-hidden="true">
      <div className="site-loader-inner">
        <span className="site-loader-kicker">Curated. Timeless. Unique.</span>
        <div className="site-loader-wordmark">ANNA ÉDITION</div>
        <div className="site-loader-rule"><span /></div>
        <span className="site-loader-script script">interior design</span>
      </div>
    </div>
  );
}
