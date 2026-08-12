import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { BackToTop } from "@/components/back-to-top";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { MotionController } from "@/components/motion-controller";
import { baseUrl } from "@/lib/content";
import { display, manrope, navbarScript } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: { default: "ANNA ÉDITION | Interior Design", template: "%s | ANNA ÉDITION" },
  description: "Zeitlose Interior-Konzepte, 3D-Visualisierungen und persönliche Einrichtungsberatung am Niederrhein und online.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "de_DE", siteName: "ANNA ÉDITION", title: "ANNA ÉDITION | Interior Design", description: "Curated. Timeless. Unique. Interior Design für Räume mit Persönlichkeit.", images: ["/images/moodboard.jpg"] },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#ffffff" };

const themeScript = `(function(){document.documentElement.dataset.theme='light'})()`;
const motionScript = `(function(){try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion-enabled')}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${manrope.variable} ${display.variable} ${navbarScript.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <Script id="anna-theme" strategy="beforeInteractive">{themeScript}</Script>
        <Script id="anna-motion" strategy="beforeInteractive">{motionScript}</Script>
        <MotionController />
        <a className="skip-link" href="#main">Zum Inhalt springen</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <BackToTop />
      </body>
    </html>
  );
}
