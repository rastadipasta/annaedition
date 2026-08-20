import { cache } from "react";
import { fallbackProjects, packages, services } from "@/lib/content";
import type { DesignPackage, HomeContent, PageContent, Project, ServiceItem } from "@/lib/types";
import { sanityClient } from "@/sanity/client";

const projectsQuery = `*[_type == "project"] | order(coalesce(order, 999) asc, year desc) {
  "slug": slug.current, title, location, year, category, excerpt, description, materials, "order": coalesce(order, 999),
  "cover": {"url": cover.asset->url, "alt": coalesce(cover.alt, title + " – Hauptansicht")},
  "gallery": coalesce(gallery[]{"url": asset->url, "alt": coalesce(alt, ^.title + " – Projektansicht")}, []),
  "storySections": coalesce(storySections[]{heading, text}, []), featured
}`;

const homeQuery = `*[_type == "homePage"][0] {
  heroEyebrow, heroLine1, heroLine2, heroLine3, heroLine4, heroIntro,
  "heroImage": {"url": heroImage.asset->url, "alt": heroImage.alt},
  philosophyEyebrow, philosophyTitle, philosophyAccent, philosophyText,
  "philosophyImage": {"url": philosophyImage.asset->url, "alt": philosophyImage.alt},
  featuredEyebrow, featuredTitle, featuredAccent, packagesEyebrow, packagesTitle, packagesAccent,
  calloutEyebrow, calloutTitle, calloutAccent, calloutIntro, calloutPrice, calloutSteps,
  aboutEyebrow, aboutTitle, aboutAccent, aboutIntro,
  "aboutImage": {"url": aboutImage.asset->url, "alt": aboutImage.alt}
}`;

const pageQuery = `*[_type == "page" && slug.current == $slug][0] {
  eyebrow, title, accentTitle, intro, paragraphs, quote, secondaryTitle, secondaryAccentTitle, sections,
  "image": {"url": image.asset->url, "alt": image.alt},
  "seo": {
    "title": seo.title,
    "description": seo.description,
    "image": {"url": seo.image.asset->url, "alt": seo.image.alt}
  },
  "faqs": coalesce(faqs[]{question, answer}, [])
}`;

const packagesQuery = `*[_type == "designPackage"] | order(order asc) {
  name, eyebrow, description, features, price, priceValue, priceCurrency, priceUnit
}`;
const servicesQuery = `*[_type == "service"] | order(order asc) {title, "text": description}`;

export const getProjects = cache(async (): Promise<Project[]> => {
  if (!sanityClient) return fallbackProjects;
  try {
    const projects = await sanityClient.fetch<Project[]>(projectsQuery, {}, { next: { revalidate: 60 } });
    return projects.length ? projects : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
});

export const getProject = cache(async (slug: string): Promise<Project | undefined> => {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
});

export const getHomeContent = cache(async (): Promise<HomeContent | null> => {
  if (!sanityClient) return null;
  try { return await sanityClient.fetch<HomeContent | null>(homeQuery, {}, { next: { revalidate: 60 } }); } catch { return null; }
});

export const getPageContent = cache(async (slug: string): Promise<PageContent | null> => {
  if (!sanityClient) return null;
  try { return await sanityClient.fetch<PageContent | null>(pageQuery, { slug }, { next: { revalidate: 60 } }); } catch { return null; }
});

export const getPackages = cache(async (): Promise<DesignPackage[]> => {
  if (!sanityClient) return packages;
  try {
    const entries = await sanityClient.fetch<DesignPackage[]>(packagesQuery, {}, { next: { revalidate: 60 } });
    return entries.length ? entries : packages;
  } catch { return packages; }
});

export const getServices = cache(async (): Promise<ServiceItem[]> => {
  if (!sanityClient) return services;
  try {
    const entries = await sanityClient.fetch<ServiceItem[]>(servicesQuery, {}, { next: { revalidate: 60 } });
    return entries.length ? entries : services;
  } catch { return services; }
});
