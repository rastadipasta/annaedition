import type { StructureResolver } from "sanity/structure";

const fixedPages = [
  { id: "page.projekte", template: "page-projekte", title: "Projekte-Seite" },
  { id: "page.leistungen", template: "page-leistungen", title: "Leistungen-Seite" },
  { id: "page.ueber-mich", template: "page-ueber-mich", title: "Über mich" },
  { id: "page.kontakt", template: "page-kontakt", title: "Kontakt" },
  { id: "page.impressum", template: "page-impressum", title: "Impressum" },
  { id: "page.datenschutz", template: "page-datenschutz", title: "Datenschutz" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("ANNA ÉDITION Inhalte")
    .items([
      S.listItem().title("Startseite").child(S.document().schemaType("homePage").documentId("homePage")),
      ...fixedPages.map((page) =>
        S.listItem().title(page.title).child(S.document().schemaType("page").documentId(page.id).initialValueTemplate(page.template)),
      ),
      S.divider(),
      S.documentTypeListItem("project").title("Projekte & Bilder"),
      S.documentTypeListItem("designPackage").title("Design-Pakete"),
      S.documentTypeListItem("service").title("Usluge / Accordion"),
      S.documentTypeListItem("settings").title("Globale Einstellungen"),
    ]);
