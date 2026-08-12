import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

const pageTemplates = [
  { id: "page-projekte", title: "Projekte-Seite", slug: "projekte" },
  { id: "page-leistungen", title: "Leistungen", slug: "leistungen" },
  { id: "page-ueber-mich", title: "Über mich", slug: "ueber-mich" },
  { id: "page-kontakt", title: "Kontakt", slug: "kontakt" },
  { id: "page-impressum", title: "Impressum", slug: "impressum" },
  { id: "page-datenschutz", title: "Datenschutz", slug: "datenschutz" },
];

export default defineConfig({
  name: "anna-edition",
  title: "ANNA ÉDITION",
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "7ax7gaw6",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    templates: (templates) => [
      ...templates.filter((template) => !["homePage", "page"].includes(template.schemaType)),
      ...pageTemplates.map((page) => ({
        id: page.id,
        title: page.title,
        schemaType: "page",
        value: { title: page.title, slug: { _type: "slug", current: page.slug } },
      })),
    ],
  },
  document: {
    newDocumentOptions: (options) => options.filter((option) => !["homePage", "page"].includes(option.templateId)),
  },
});
