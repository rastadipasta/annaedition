"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const revealSelector = '[data-motion="reveal"]';

export function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const requestFrame = window.requestAnimationFrame?.bind(window) ?? ((callback: FrameRequestCallback) => window.setTimeout(() => callback(performance.now()), 16));
    const cancelFrame = window.cancelAnimationFrame?.bind(window) ?? window.clearTimeout.bind(window);
    const revealAll = () => {
      document.querySelectorAll<HTMLElement>(revealSelector).forEach((element) => element.classList.add("is-revealed"));
    };
    const observer = typeof window.IntersectionObserver === "function"
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add("is-revealed");
              observer?.unobserve(entry.target);
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -10%" },
        )
      : null;

    const revealVisible = () => {
      frame = 0;
      document.querySelectorAll<HTMLElement>(`${revealSelector}:not(.is-revealed)`).forEach((element) => {
        const bounds = element.getBoundingClientRect();
        if (bounds.top <= window.innerHeight * 0.9 && bounds.bottom >= 0) element.classList.add("is-revealed");
      });
    };

    const scheduleFallback = () => {
      if (!observer && !frame) frame = requestFrame(revealVisible);
    };

    const register = (root: ParentNode) => {
      const elements = root instanceof HTMLElement && root.matches(revealSelector)
        ? [root, ...root.querySelectorAll<HTMLElement>(revealSelector)]
        : [...root.querySelectorAll<HTMLElement>(revealSelector)];

      elements.forEach((element) => {
        if (!element.classList.contains("is-revealed")) observer?.observe(element);
      });
    };

    const refresh = () => {
      register(document);
      scheduleFallback();
    };

    const applyPreference = () => {
      if (reducedMotion.matches) {
        document.documentElement.classList.remove("motion-enabled");
        observer?.disconnect();
        revealAll();
        return;
      }

      document.documentElement.classList.add("motion-enabled");
      refresh();
    };

    applyPreference();

    const main = document.querySelector("#main");
    const mutations = main && "MutationObserver" in window
      ? new MutationObserver((records) => {
          records.forEach((record) => {
            record.addedNodes.forEach((node) => {
              if (node instanceof HTMLElement) {
                register(node);
                scheduleFallback();
              }
            });
          });
        })
      : null;

    if (main && mutations) mutations.observe(main, { childList: true, subtree: true });

    window.addEventListener("scroll", scheduleFallback, { passive: true });
    window.addEventListener("resize", scheduleFallback);
    window.addEventListener("anna:motion-refresh", refresh);
    reducedMotion.addEventListener("change", applyPreference);

    return () => {
      if (frame) cancelFrame(frame);
      observer?.disconnect();
      mutations?.disconnect();
      window.removeEventListener("scroll", scheduleFallback);
      window.removeEventListener("resize", scheduleFallback);
      window.removeEventListener("anna:motion-refresh", refresh);
      reducedMotion.removeEventListener("change", applyPreference);
    };
  }, [pathname]);

  return null;
}
