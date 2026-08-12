"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function updateBrowserThemeColor(theme: Theme) {
  document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#40191e" : "#ffffff");
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const initialTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
      setTheme(initialTheme);
      updateBrowserThemeColor(initialTheme);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    const applyTheme = () => {
      document.documentElement.dataset.theme = next;
      updateBrowserThemeColor(next);
      setTheme(next);
    };
    const transitionDocument = document as Document & { startViewTransition?: (callback: () => void) => unknown };
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && transitionDocument.startViewTransition) {
      transitionDocument.startViewTransition(applyTheme);
    } else {
      applyTheme();
    }
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={theme === "light" ? "Dunkles Farbschema aktivieren" : "Helles Farbschema aktivieren"} aria-pressed={theme === "dark"}>
      <span className="toggle-icon theme-toggle-icon" key={theme} aria-hidden="true">
        {theme === "light" ? <Sun size={19} /> : <Moon size={18} />}
      </span>
    </button>
  );
}
