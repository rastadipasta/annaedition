import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { getProjects } from "@/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/projekte", "/leistungen", "/ueber-mich", "/kontakt"];
  const projects = await getProjects();
  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route || "/"),
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : .7,
    })),
    ...projects.map((project) => ({
      url: absoluteUrl(`/projekte/${project.slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: .8,
    })),
  ];
}
