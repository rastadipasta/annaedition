"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/lib/content";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const first = navigation.slice(0, 2);
  const second = navigation.slice(2);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const navLink = (item: (typeof navigation)[number]) => (
    <Link key={item.href} className="nav-link" href={item.href} aria-current={pathname.startsWith(item.href) ? "page" : undefined} onClick={() => setOpen(false)}>
      {item.label}
    </Link>
  );

  return (
    <header className="site-header">
      <nav className="nav-shell container" aria-label="Hauptnavigation" data-motion="load">
        <div className="nav-group">
          <button className="menu-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Menü schließen" : "Menü öffnen"}>
            <span className="toggle-icon" key={open ? "close" : "menu"} aria-hidden="true">
              {open ? <X size={19} /> : <Menu size={19} />}
            </span>
          </button>
          {first.map(navLink)}
        </div>
        <Link className="brand" href="/" aria-label="ANNA ÉDITION – Startseite">
          <span className="brand-title">ANNA ÉDITION</span>
          <span className="brand-script script">interior design</span>
        </Link>
        <div className="nav-group">
          {second.map(navLink)}
          <ThemeToggle />
        </div>
      </nav>
      <button className="mobile-menu-backdrop" type="button" data-open={open} aria-label="Menü schließen" aria-hidden={!open} tabIndex={-1} onClick={() => setOpen(false)} />
      <div id="mobile-menu" className="mobile-menu container" data-open={open} aria-hidden={!open} inert={!open}>{navigation.map(navLink)}</div>
    </header>
  );
}
