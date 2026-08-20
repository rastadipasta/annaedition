import type { MetadataRoute } from "next";
import { absoluteUrl, isIndexableDeployment, siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexableDeployment) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/studio/"] },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
