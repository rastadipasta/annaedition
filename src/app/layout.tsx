import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Suspense } from "react";
import { BackToTop } from "@/components/back-to-top";
import { CookieConsent } from "@/components/cookie-consent";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { MotionController } from "@/components/motion-controller";
import { SiteLoader } from "@/components/site-loader";
import { PageCurtainProvider } from "@/components/page-curtain";
import { baseUrl } from "@/lib/content";
import { display, manrope, navbarScript } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: { default: "ANNA ÉDITION | Interior Design", template: "%s | ANNA ÉDITION" },
  description: "Zeitlose Interior-Konzepte, 3D-Visualisierungen und persönliche Einrichtungsberatung am Niederrhein und online.",
  icons: { icon: [{ url: "/brand/monogram.svg", type: "image/svg+xml" }], shortcut: "/brand/monogram.svg" },
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "de_DE", siteName: "ANNA ÉDITION", title: "ANNA ÉDITION | Interior Design", description: "Curated. Timeless. Unique. Interior Design für Räume mit Persönlichkeit.", images: ["/images/moodboard.jpg"] },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#ffffff" };

const themeScript = `(function(){try{var consent=document.cookie.split('; ').find(function(v){return v.indexOf('anna_cookie_consent=')===0});var allowed=consent&&consent.split('=')[1]==='all';var saved=allowed?localStorage.getItem('anna-theme'):null;document.documentElement.dataset.theme=saved==='dark'?'dark':'light'}catch(e){document.documentElement.dataset.theme='light'}})()`;
const motionScript = `(function(){try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion-enabled')}catch(e){}})()`;
const loaderScript = `(function(){try{var enabled=!matchMedia('(prefers-reduced-motion: reduce)').matches&&!sessionStorage.getItem('anna-site-intro-seen');window.__annaIntroEnabled=enabled;document.documentElement.classList.add(enabled?'site-intro-enabled':'site-intro-skip')}catch(e){window.__annaIntroEnabled=false;document.documentElement.classList.add('site-intro-skip')}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${manrope.variable} ${display.variable} ${navbarScript.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <Script id="anna-theme" strategy="beforeInteractive">{themeScript}</Script>
        <Script id="anna-motion" strategy="beforeInteractive">{motionScript}</Script>
        <Script id="anna-loader" strategy="beforeInteractive">{loaderScript}</Script>
        <SiteLoader />
        <Suspense fallback={null}>
          <PageCurtainProvider />
        </Suspense>
        <MotionController />
        <a className="skip-link" href="#main">Zum Inhalt springen</a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>{children}</main>
        <SiteFooter />
        <BackToTop />
        <CookieConsent />
      </body>
    </html>
  );
}
