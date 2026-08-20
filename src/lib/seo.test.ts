import { describe, expect, it } from "vitest";
import {
  LOCAL_SITE_URL,
  PRODUCTION_SITE_URL,
  absoluteUrl,
  isIndexableEnvironment,
  packageOfferSchemas,
  resolveSiteUrl,
} from "@/lib/seo";

describe("SEO URL configuration", () => {
  it("rejects localhost in production builds", () => {
    expect(resolveSiteUrl({ siteUrl: "http://localhost:3000", nodeEnv: "production" })).toBe(PRODUCTION_SITE_URL);
  });

  it("rejects localhost in Vercel previews", () => {
    expect(resolveSiteUrl({ siteUrl: "http://127.0.0.1:3000", nodeEnv: "production", vercelEnv: "preview" })).toBe(PRODUCTION_SITE_URL);
  });

  it("normalizes a configured production URL", () => {
    expect(resolveSiteUrl({ siteUrl: "https://annaedition.vercel.app/", vercelEnv: "production" })).toBe(PRODUCTION_SITE_URL);
  });

  it("uses localhost only during local development", () => {
    expect(resolveSiteUrl({ nodeEnv: "development" })).toBe(LOCAL_SITE_URL);
  });

  it("marks only production as indexable", () => {
    expect(isIndexableEnvironment({ vercelEnv: "production" })).toBe(true);
    expect(isIndexableEnvironment({ vercelEnv: "preview", nodeEnv: "production" })).toBe(false);
    expect(isIndexableEnvironment({ vercelEnv: "development" })).toBe(false);
  });

  it("turns local paths into absolute URLs", () => {
    expect(new URL(absoluteUrl("/projekte")).pathname).toBe("/projekte");
    expect(absoluteUrl("https://cdn.sanity.io/example.jpg")).toBe("https://cdn.sanity.io/example.jpg");
    expect(absoluteUrl("https://cdn.sanity.io/example.jpg?w=1200")).toBe("https://cdn.sanity.io/example.jpg?w=1200");
  });
});

describe("package Offer schema", () => {
  it("uses numeric CMS pricing when available", () => {
    const [offer] = packageOfferSchemas([{
      name: "Édition Test",
      eyebrow: "Test",
      description: "Beschreibung",
      features: [],
      price: "auf Anfrage",
      priceValue: 99,
      priceCurrency: "EUR",
      priceUnit: "m²",
    }]);

    expect(offer.price).toBe(99);
    expect(offer.priceCurrency).toBe("EUR");
    expect(offer.unitText).toBe("m²");
  });
});
