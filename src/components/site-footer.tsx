import Link from "next/link";
import { navigation } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container" data-motion="reveal">
        <div className="footer-grid">
          <div>
            <div className="footer-title">ANNA ÉDITION</div>
            <p className="lede">Interior Design am Niederrhein und online – ehrlich, persönlich und sicher geplant.</p>
          </div>
          <nav className="footer-nav" aria-label="Footer Navigation">
            {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>
          <nav className="footer-nav" aria-label="Rechtliches und soziale Netzwerke">
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
            <a href="https://instagram.com" rel="noreferrer" target="_blank">Instagram</a>
            <a href="https://pinterest.com" rel="noreferrer" target="_blank">Pinterest</a>
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
