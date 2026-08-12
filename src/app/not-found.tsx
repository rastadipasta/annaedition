import Link from "next/link";

export default function NotFound() {
  return <section className="section container legal"><p className="eyebrow" data-motion="load">404</p><h1 className="display" data-motion="load" data-motion-order="1">Dieser Raum ist noch leer.</h1><p className="lede" data-motion="load" data-motion-order="2">Die gesuchte Seite wurde nicht gefunden.</p><Link className="button-link" href="/" data-motion="load" data-motion-order="3">Zur Startseite <span>→</span></Link></section>;
}
