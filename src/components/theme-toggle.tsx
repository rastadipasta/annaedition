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
    document.documentElement.dataset.theme = next;
    updateBrowserThemeColor(next);
    setTheme(next);
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={theme === "light" ? "Dunkles Farbschema aktivieren" : "Helles Farbschema aktivieren"} aria-pressed={theme === "dark"}>
      {theme === "light" ? <Sun size={19} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  );
}
