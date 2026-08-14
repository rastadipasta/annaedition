import Link from "next/link";
import { navigation } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container" data-motion="reveal">
        <div className="footer-grid">
          <div>
            <div className="footer-logo" role="img" aria-label="ANNA ÉDITION Interior Design" />
            <p className="lede">Interior Design am Niederrhein und online – ehrlich, persönlich und sicher geplant.</p>
          </div>
          <nav className="footer-nav" aria-label="Footer Navigation">
            {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>
          <nav className="footer-nav" aria-label="Rechtliches und soziale Netzwerke">
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
            <a href="https://www.instagram.com/anna_edition_/" rel="noreferrer" target="_blank">Instagram</a>
            <a href="https://www.pinterest.com/anna_edition/" rel="noreferrer" target="_blank">Pinterest</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ANNA ÉDITION. Alle Rechte vorbehalten.</span>
          <a href="mailto:studio@annaedition.de">studio@annaedition.de</a>
        </div>
      </div>
    </footer>
  );
}
