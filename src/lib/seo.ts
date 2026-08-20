import type { DesignPackage, FaqItem, Project } from "@/lib/types";

export const PRODUCTION_SITE_URL = "https://annaedition.vercel.app";
export const LOCAL_SITE_URL = "http://localhost:3000";

type DeploymentEnvironment = {
  siteUrl?: string;
  nodeEnv?: string;
  vercelEnv?: string;
};

const localHosts = new Set(["localhost", "127.0.0.1", "::1", "0.0.0.0"]);

function normalizeBaseUrl(value: string | undefined): string | null {
  if (!value) return null;

  try {
    const url = new URL(value.trim());
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    url.hash = "";
    url.search = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

export function isDeployedBuild({ nodeEnv, vercelEnv }: DeploymentEnvironment): boolean {
  return vercelEnv === "production" || vercelEnv === "preview" || nodeEnv === "production";
}

export function resolveSiteUrl(environment: DeploymentEnvironment): string {
  const configured = normalizeBaseUrl(environment.siteUrl);
  const deployed = isDeployedBuild(environment);

  if (configured) {
    const host = new URL(configured).hostname;
    if (!deployed || !localHosts.has(host)) return configured;
  }

  return deployed ? PRODUCTION_SITE_URL : LOCAL_SITE_URL;
}

export function isIndexableEnvironment({ nodeEnv, vercelEnv }: DeploymentEnvironment): boolean {
  if (vercelEnv === "preview" || vercelEnv === "development") return false;
  return vercelEnv === "production" || (!vercelEnv && nodeEnv === "production");
}

export const siteUrl = resolveSiteUrl({
  siteUrl: process.env.SITE_URL,
  nodeEnv: process.env.NODE_ENV,
  vercelEnv: process.env.VERCEL_ENV,
});

export const isIndexableDeployment = isIndexableEnvironment({
  nodeEnv: process.env.NODE_ENV,
  vercelEnv: process.env.VERCEL_ENV,
});

export function absoluteUrl(pathOrUrl: string): string {
  try {
    const url = new URL(pathOrUrl);
    if (url.protocol === "http:" || url.protocol === "https:") return url.toString();
  } catch {
    // Relative paths are resolved against the canonical site URL below.
  }
  return new URL(pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`, `${siteUrl}/`).toString();
}

export const seoIds = {
  website: `${siteUrl}/#website`,
  organization: `${siteUrl}/#professional-service`,
  person: `${siteUrl}/ueber-mich#anna-matkovic`,
};

export const socialProfiles = [
  "https://www.instagram.com/anna_edition_/",
  "https://www.pinterest.com/anna_edition/",
];

export function professionalServiceSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": seoIds.organization,
    name: "ANNA ÉDITION",
    url: siteUrl,
    image: absoluteUrl("/images/hero-interior-v3.png"),
    logo: absoluteUrl("/brand/monogram.svg"),
    email: "studio@annaedition.de",
    telephone: "+4915752079305",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kreuzstraße 15",
      postalCode: "46483",
      addressLocality: "Wesel",
      addressCountry: "DE",
    },
    areaServed: ["Wesel", "Niederrhein", "Duisburg", "Düsseldorf", "Deutschland (online)"].map((name) => ({
      "@type": "Place",
      name,
    })),
    serviceType: ["Interior Design", "Online Einrichtungsberatung", "3D-Visualisierung"],
    founder: { "@id": seoIds.person },
    sameAs: socialProfiles,
    priceRange: "€€",
  };
}

export function personSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": seoIds.person,
    name: "Anna Matkovic",
    url: absoluteUrl("/ueber-mich"),
    image: absoluteUrl("/images/anna-portrait.jpg"),
    jobTitle: "Interior Designerin",
    worksFor: { "@id": seoIds.organization },
    sameAs: socialProfiles,
  };
}

export function websiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": seoIds.website,
    name: "ANNA ÉDITION",
    url: siteUrl,
    inLanguage: "de-DE",
    publisher: { "@id": seoIds.organization },
  };
}

export function projectBreadcrumbSchema(project: Project): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(`/projekte/${project.slug}`)}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Projekte", item: absoluteUrl("/projekte") },
      { "@type": "ListItem", position: 3, name: project.title, item: absoluteUrl(`/projekte/${project.slug}`) },
    ],
  };
}

export function faqPageSchema(faqs: FaqItem[], path = "/leistungen"): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

function numericPrice(item: DesignPackage): number | undefined {
  if (typeof item.priceValue === "number") return item.priceValue;
  const match = item.price.match(/\d+(?:[.,]\d+)?/);
  return match ? Number(match[0].replace(",", ".")) : undefined;
}

export function packageOfferSchemas(packages: DesignPackage[]): Record<string, unknown>[] {
  return packages.flatMap((item, index) => {
    const price = numericPrice(item);
    if (price === undefined) return [];

    return [{
      "@context": "https://schema.org",
      "@type": "Offer",
      "@id": `${absoluteUrl("/leistungen")}#package-${index + 1}`,
      url: absoluteUrl("/leistungen"),
      name: item.name,
      description: item.description,
      price,
      priceCurrency: item.priceCurrency || "EUR",
      unitText: item.priceUnit || "m²",
      itemOffered: {
        "@type": "Service",
        name: item.name,
        provider: { "@id": seoIds.organization },
      },
    }];
  });
}
