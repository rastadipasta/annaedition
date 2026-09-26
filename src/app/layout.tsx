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
import { display, manrope, navbarScript } from "@/lib/fonts";
import { absoluteUrl, isIndexableDeployment, siteUrl } from "@/lib/seo";
import { privacyBootstrapScript } from "@/lib/privacy-preferences";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Interior Design am Niederrhein & online | ANNA ÉDITION", template: "%s | ANNA ÉDITION" },
  description: "Zeitlose Interior-Konzepte, 3D-Visualisierungen und persönliche Einrichtungsberatung am Niederrhein und online.",
  icons: { icon: [{ url: "/brand/monogram.svg", type: "image/svg+xml" }], shortcut: "/brand/monogram.svg" },
  alternates: { canonical: "/" },
  robots: isIndexableDeployment
    ? { index: true, follow: true }
    : { index: false, follow: false, noarchive: true, nosnippet: true },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "ANNA ÉDITION",
    url: siteUrl,
    title: "Interior Design am Niederrhein & online | ANNA ÉDITION",
    description: "Curated. Timeless. Unique. Interior Design für Räume mit Persönlichkeit.",
    images: [{ url: absoluteUrl("/brand/share-logo.png"), width: 1200, height: 630, type: "image/png", alt: "ANNA ÉDITION – Logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior Design am Niederrhein & online | ANNA ÉDITION",
    description: "Curated. Timeless. Unique. Interior Design für Räume mit Persönlichkeit.",
    images: [absoluteUrl("/brand/share-logo.png")],
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#ffffff" };

const motionScript = `(function(){try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion-enabled')}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${manrope.variable} ${display.variable} ${navbarScript.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <Script id="anna-privacy" strategy="beforeInteractive">{privacyBootstrapScript}</Script>
        <Script id="anna-motion" strategy="beforeInteractive">{motionScript}</Script>
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
