import { defineArrayMember, defineField, defineType } from "sanity";

const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.max(60) }),
    defineField({ name: "description", type: "text", rows: 3, validation: (rule) => rule.max(160) }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
  ],
});

const homePage = defineType({
  name: "homePage",
  title: "Startseite",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "philosophy", title: "Philosophie" },
    { name: "featured", title: "Projekt & Pakete" },
    { name: "callout", title: "Call a Designer" },
    { name: "about", title: "Über Anna" },
  ],
  fields: [
    defineField({ name: "heroEyebrow", title: "Tagline", type: "string", group: "hero", initialValue: "Curated. Timeless. Unique." }),
    defineField({ name: "heroLine1", title: "Naslov – red 1", type: "string", group: "hero", initialValue: "Thoughtful" }),
    defineField({ name: "heroLine2", title: "Naslov – red 2", type: "string", group: "hero", initialValue: "Design." }),
    defineField({ name: "heroLine3", title: "Naslov – red 3", type: "string", group: "hero", initialValue: "Timeless" }),
    defineField({ name: "heroLine4", title: "Naslov – red 4", type: "string", group: "hero", initialValue: "Interiors." }),
    defineField({ name: "heroIntro", title: "Uvodni tekst", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroImage", title: "Hero slika", type: "image", options: { hotspot: true }, group: "hero", fields: [defineField({ name: "alt", title: "Opis slike (alt)", type: "string" })] }),
    defineField({ name: "philosophyEyebrow", title: "Oznaka", type: "string", group: "philosophy" }),
    defineField({ name: "philosophyTitle", title: "Naslov", type: "string", group: "philosophy" }),
    defineField({ name: "philosophyAccent", title: "Istaknuti dio naslova", type: "string", group: "philosophy" }),
    defineField({ name: "philosophyText", title: "Tekst", type: "text", rows: 4, group: "philosophy" }),
    defineField({ name: "philosophyImage", title: "Slika", type: "image", options: { hotspot: true }, group: "philosophy", fields: [defineField({ name: "alt", title: "Opis slike (alt)", type: "string" })] }),
    defineField({ name: "featuredEyebrow", title: "Oznaka projekta", type: "string", group: "featured" }),
    defineField({ name: "featuredTitle", title: "Naslov projekta", type: "string", group: "featured" }),
    defineField({ name: "featuredAccent", title: "Istaknuti dio", type: "string", group: "featured" }),
    defineField({ name: "packagesEyebrow", title: "Oznaka paketa", type: "string", group: "featured" }),
    defineField({ name: "packagesTitle", title: "Naslov paketa", type: "string", group: "featured" }),
    defineField({ name: "packagesAccent", title: "Istaknuti dio", type: "string", group: "featured" }),
    defineField({ name: "calloutEyebrow", title: "Oznaka", type: "string", group: "callout" }),
    defineField({ name: "calloutTitle", title: "Naslov", type: "string", group: "callout" }),
    defineField({ name: "calloutAccent", title: "Istaknuti naslov", type: "string", group: "callout" }),
    defineField({ name: "calloutIntro", title: "Opis", type: "text", rows: 3, group: "callout" }),
    defineField({ name: "calloutPrice", title: "Cijena i trajanje", type: "string", group: "callout" }),
    defineField({ name: "calloutSteps", title: "Što je uključeno", type: "array", of: [defineArrayMember({ type: "string" })], group: "callout" }),
    defineField({ name: "aboutEyebrow", title: "Oznaka", type: "string", group: "about" }),
    defineField({ name: "aboutTitle", title: "Naslov", type: "string", group: "about" }),
    defineField({ name: "aboutAccent", title: "Istaknuti dio", type: "string", group: "about" }),
    defineField({ name: "aboutIntro", title: "Opis", type: "text", rows: 3, group: "about" }),
    defineField({ name: "aboutImage", title: "Slika", type: "image", options: { hotspot: true }, group: "about", fields: [defineField({ name: "alt", title: "Opis slike (alt)", type: "string" })] }),
  ],
  preview: { prepare: () => ({ title: "Startseite" }) },
});

const project = defineType({
  name: "project",
  title: "Projekte",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({ name: "location", title: "Ort", type: "string" }),
    defineField({ name: "year", title: "Jahr", type: "number" }),
    defineField({ name: "category", title: "Kategorie", type: "string", options: { list: ["Wohn- & Essbereiche", "Küchen", "Schlafzimmer", "Home Office", "Eingangsbereiche", "Bäder"] } }),
    defineField({ name: "excerpt", title: "Kurztext", type: "text", rows: 3 }),
    defineField({ name: "description", title: "Beschreibung", type: "text", rows: 6 }),
    defineField({ name: "materials", title: "Materialien", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "cover", title: "Titelbild", type: "image", options: { hotspot: true }, validation: (rule) => rule.required() }),
    defineField({ name: "gallery", title: "Galerie", type: "array", of: [defineArrayMember({ type: "image", options: { hotspot: true } })] }),
    defineField({ name: "featured", title: "Auf Startseite zeigen", type: "boolean", initialValue: false }),
    defineField({ name: "seo", type: "seo" }),
  ],
});

const editablePage = defineType({
  name: "page",
  title: "Seiten",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({ name: "eyebrow", title: "Oznaka iznad naslova", type: "string" }),
    defineField({ name: "accentTitle", title: "Istaknuti dio naslova", type: "string" }),
    defineField({ name: "intro", title: "Uvodni tekst", type: "text", rows: 4 }),
    defineField({ name: "image", title: "Glavna slika", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Opis slike (alt)", type: "string" })] }),
    defineField({ name: "paragraphs", title: "Odlomci", type: "array", of: [defineArrayMember({ type: "text", rows: 4 })] }),
    defineField({ name: "quote", title: "Citat", type: "text", rows: 3 }),
    defineField({ name: "secondaryTitle", title: "Drugi naslov", type: "string" }),
    defineField({ name: "secondaryAccentTitle", title: "Istaknuti dio drugog naslova", type: "string" }),
    defineField({ name: "sections", title: "Tekstualne sekcije", type: "array", of: [defineArrayMember({ name: "textSection", title: "Sekcija", type: "object", fields: [defineField({ name: "heading", title: "Naslov", type: "string", validation: (rule) => rule.required() }), defineField({ name: "text", title: "Tekst", type: "text", rows: 6, validation: (rule) => rule.required() })] })] }),
    defineField({ name: "body", type: "array", of: [defineArrayMember({ type: "block" }), defineArrayMember({ type: "image", options: { hotspot: true } })] }),
    defineField({ name: "seo", type: "seo" }),
  ],
});

const service = defineType({
  name: "service",
  title: "Leistungen",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", type: "text", rows: 5 }),
    defineField({ name: "order", type: "number" }),
  ],
  orderings: [{ title: "Reihenfolge", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});

const designPackage = defineType({
  name: "designPackage",
  title: "Design-Pakete",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "features", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "price", type: "string" }),
    defineField({ name: "order", type: "number" }),
  ],
});

const settings = defineType({
  name: "settings",
  title: "Globale Einstellungen",
  type: "document",
  fields: [
    defineField({ name: "siteTitle", type: "string", initialValue: "ANNA ÉDITION" }),
    defineField({ name: "email", type: "string", initialValue: "studio@annaedition.de" }),
    defineField({ name: "instagram", type: "url" }),
    defineField({ name: "pinterest", type: "url" }),
    defineField({ name: "seo", type: "seo" }),
  ],
});

export const schemaTypes = [seo, homePage, project, editablePage, service, designPackage, settings];
