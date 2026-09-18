import type { FaqItem, Project, ProjectCategory } from "@/lib/types";

export const navigation = [
  { href: "/projekte", label: "Projekte" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/kontakt", label: "Kontakt" },
];

export const categories: ProjectCategory[] = [
  "Alle Projekte",
  "Wohn- & Essbereiche",
  "Küchen",
  "Schlafzimmer",
  "Home Office",
  "Eingangsbereiche",
  "Bäder",
  "Gesamtkonzepte",
];

const projectImage = (slug: string, file: string, alt: string) => ({
  url: `/images/projects/${slug}/${file}`,
  alt,
});

const projectGallery = (slug: string, title: string, count: number, subject: string) =>
  Array.from({ length: count }, (_, index) =>
    projectImage(slug, `${String(index + 1).padStart(2, "0")}.jpg`, `${title} – ${subject}, Ansicht ${index + 1}`),
  );

export const fallbackProjects: Project[] = [
  {
    slug: "emerald-skyline",
    title: "Emerald Skyline",
    location: "Frankfurt",
    year: 2026,
    category: "Wohn- & Essbereiche",
    excerpt: "Olivgrüne Sofalandschaften, Burgundy-Akzente und eine raumhohe Marmormedienwand über den Dächern Frankfurts.",
    description: "Ein offenes Wohnkonzept mit internationalem Charakter, in dem markanter Marmor, dunkles Holz und satte Farbakzente eine luxuriöse, zugleich wohnliche Atmosphäre schaffen.",
    materials: ["Kontrastreicher Marmor", "Dunkles Holz", "Olivgrüner Samt", "Burgundy", "Messing"],
    cover: projectImage("emerald-skyline", "cover.jpg", "Emerald Skyline – offener Wohnbereich mit Marmormedienwand und olivgrüner Sofalandschaft"),
    gallery: projectGallery("emerald-skyline", "Emerald Skyline", 3, "offenes Wohn- und Küchenkonzept"),
    storySections: [
      { heading: "Die Vision", text: "Ein offenes und großzügiges Wohnkonzept, das kraftvolle Kontraste mit absolutem Wohlbefinden verbindet." },
      { heading: "Das Highlight", text: "Eine raumhohe Medienwand aus edlem, kontrastreichem Marmor und dunklen Holzpaneelen, die durch integrierte Lichtbänder perfekt inszeniert wird." },
      { heading: "Der Kontrast", text: "Eine organisch geformte Sofalandschaft in sattem Olivgrün und tiefe Burgundy-Akzente bringen sofortige Wärme gegen die klaren architektonischen Linien." },
      { heading: "Die Raumstruktur", text: "Eine zarte, dunkle Lamellenwand trennt den gemütlichen Lounge-Bereich ganz leicht auf, ohne den Blick in die offene, luxuriöse Wohnküche im Hintergrund zu versperren." },
      { heading: "Vibe", text: "Ausdrucksstark, hotelartig und voller internationalem Charakter." },
    ],
    order: 1,
  },
  {
    slug: "concrete-calm",
    title: "Concrete Calm",
    location: "Berlin",
    year: 2026,
    category: "Wohn- & Essbereiche",
    excerpt: "Sichtbeton, dunkle Holzpaneele und eine helle Sofalandschaft verbinden urbane Klarheit mit weichem Komfort.",
    description: "Ein großzügiger Berliner Wohnraum, dessen präzise Zonen, kühle Architektur und warme Erdtöne selbstverständlich zusammenfinden.",
    materials: ["Sichtbeton", "Dunkles Holz", "Naturstein", "Helle Textilien", "Warme Erdtöne"],
    cover: projectImage("concrete-calm", "cover.jpg", "Concrete Calm – heller Wohnbereich mit Sichtbetondecke, Holzpaneelwand und Stadtblick"),
    gallery: projectGallery("concrete-calm", "Concrete Calm", 9, "moderner Berliner Wohnraum"),
    storySections: [
      { heading: "Die Vision", text: "Moderner, schlichter Stil trifft auf absoluten Komfort." },
      { heading: "Das Highlight", text: "Eine kunstvoll gestaltete, dunkle Holzpaneelwand, die den offenen Raum mit präziser Logik aufteilt." },
      { heading: "Der Kontrast", text: "Die kühle Wirkung einer Sichtbetondecke, perfekt ausgeglichen durch eine helle, gemütliche Sofalandschaft in warmen Erdtönen." },
      { heading: "Vibe", text: "Clean und großzügig." },
    ],
    order: 2,
    featured: true,
  },
  {
    slug: "midnight-cocoon",
    title: "Midnight Cocoon",
    location: "Berlin",
    year: 2026,
    category: "Bäder",
    excerpt: "Dunkler Naturstein, vertikale Holzlamellen und warmes, verborgenes Licht formen ein luxuriöses Gäste-WC.",
    description: "Ein kompakter Raum wird zum privaten Rückzugsort: monolithische Formen, tiefe Grautöne und skulpturales Licht erzeugen eine exklusive Kokonwirkung.",
    materials: ["Dunkelgrauer Naturstein", "Holzlamellen", "Mattschwarz", "Glas", "Warmes LED-Licht"],
    cover: projectImage("midnight-cocoon", "cover.jpg", "Midnight Cocoon – minimalistisches Gäste-WC aus dunklem Naturstein und schwarzen Elementen"),
    gallery: projectGallery("midnight-cocoon", "Midnight Cocoon", 3, "dunkles Berliner Gäste-WC"),
    storySections: [
      { heading: "Die Vision", text: "Ein minimalistisches Gäste-WC, das pure Eleganz und maximale Privatsphäre auf kompakter Fläche zeigt." },
      { heading: "Das Highlight", text: "Großformatige, dunkelgraue Natursteinwände mit feiner Maserung, die den Raum in ein exklusives Kokon-Gefühl hüllen." },
      { heading: "Der Kontrast", text: "Eine dunkle, vertikale Holzlamellenwand und ein monolithischer, mattschwarzer Waschtisch setzen klare architektonische Linien." },
      { heading: "Das Licht", text: "Versteckte, warme LED-Lichtbänder an den Wänden und skulpturale Spiegel-Leuchten brechen die dunklen Töne sanft auf." },
      { heading: "Vibe", text: "Luxuriös und absolut zeitlos." },
    ],
    order: 3,
  },
  {
    slug: "stone-silence",
    title: "Stone Silence",
    location: "Duisburg",
    year: 2026,
    category: "Bäder",
    excerpt: "Ein monolithisches Natursteinbecken und seidige Grautöne übersetzen städtischen Luxus in absolute Ruhe.",
    description: "Ein klares Badkonzept, das mit wenigen präzisen Gesten arbeitet: großformatiger Stein, rahmenloses Glas und warme Lichtleisten.",
    materials: ["Massiver Naturstein", "Dunkelgraue Großformatfliesen", "Glas", "Mattschwarz", "Warmes Licht"],
    cover: projectImage("stone-silence", "cover.jpg", "Stone Silence – großzügiges graues Badezimmer mit rahmenloser Glasdusche"),
    gallery: projectGallery("stone-silence", "Stone Silence", 3, "Duisburger Natursteinbad"),
    storySections: [
      { heading: "Die Vision", text: "Die kühle, reine Wirkung von modernem, städtischem Luxus." },
      { heading: "Das Highlight", text: "Ein aus einem Stück gefertigtes Waschbecken aus massivem Naturstein vor einer schlichten Glasduschkabine." },
      { heading: "Der Kontrast", text: "Großformatige Fliesen in seidigem Dunkelgrau, sanft beleuchtet durch warme Lichtleisten in den offenen Regalen." },
      { heading: "Vibe", text: "Clean, klar strukturiert und absolut zeitlos." },
    ],
    order: 4,
  },
  {
    slug: "burgundy-residence",
    title: "Burgundy Residence",
    location: "Düsseldorf",
    year: 2026,
    category: "Gesamtkonzepte",
    excerpt: "Burgundy-Marmor, Olivgrün und warme Holzachsen verbinden ein großzügiges Apartment zu einer ausdrucksstarken Wohnwelt.",
    description: "Ein ganzheitliches Apartment-Konzept, in dem jede Zone ihre eigene Identität besitzt und dennoch Teil einer konsequenten, warmen Materialwelt bleibt.",
    materials: ["Burgundy-Marmor", "Olivgrün", "Holzlamellen", "Maßgefertigte Fronten", "Warme Lichtachsen"],
    cover: projectImage("burgundy-residence", "cover.jpg", "Burgundy Residence – Visualisierung eines Badezimmers mit weinrotem Marmor und dunklem Holz"),
    gallery: projectGallery("burgundy-residence", "Burgundy Residence", 19, "ganzheitliches Düsseldorfer Apartment"),
    storySections: [
      { heading: "Die Vision", text: "Ein ganzheitliches, großzügiges Apartment-Konzept voller Wärme, Struktur und wohnlichem Luxus." },
      { heading: "Das Highlight", text: "Die konsequente und mutige Kombination aus tiefem, mattem Weinrot (Burgundy) und edlem Olivgrün, die sich wie ein harmonischer roter Faden durch alle Räume zieht." },
      { heading: "Der Kontrast", text: "Ausdrucksstarke, weinrote Marmorwände in der Küche und im Hauptbad treffen auf zarte Holzlamellen, warme Lichtachsen und schlichte, maßgefertigte Möbelfronten." },
      { heading: "Die Raumstruktur", text: "Jedes Zimmer – von der geselligen Wohnküche über das eindrucksvolle Wohnzimmer bis hin zur geborgenen Master-Suite mit eigener Sofa-Lounge – besitzt seine eigene, klare Zone und strahlt absolute Ruhe aus." },
      { heading: "Vibe", text: "Ausdrucksstark, geborgen und bis ins kleinste Detail durchdacht." },
    ],
    order: 5,
  },
  {
    slug: "parisian-dream",
    title: "Parisian Dream",
    location: "Paris",
    year: 2026,
    category: "Schlafzimmer",
    excerpt: "Eine verträumte Bettnische, florale Tapeten und ein maßgeschneiderter Arbeitsplatz schaffen ein magisches Kinderzimmer.",
    description: "Spielerische Eleganz trifft auf clevere Raumnutzung: ein romantisches Kinderzimmer, das Fantasie, Geborgenheit und Alltagstauglichkeit miteinander verbindet.",
    materials: ["Florale Tapete", "Helle Wandpaneele", "Weiche Textilien", "Messingakzente", "Skulpturales Licht"],
    cover: projectImage("parisian-dream", "cover.jpg", "Parisian Dream – helles Kinderzimmer mit floraler Bettnische und wolkenartiger Pendelleuchte"),
    gallery: projectGallery("parisian-dream", "Parisian Dream", 3, "romantisches Pariser Kinderzimmer"),
    storySections: [
      { heading: "Die Vision", text: "Ein verträumtes und hochfunktionales Kinderzimmer, das spielerische Eleganz mit cleverer Raumnutzung verbindet." },
      { heading: "Das Highlight", text: "Eine gemütliche, wie eine kleine Bühne eingerahmte Bettnische mit verspielter Blumentapete, Lichterketten und weich fließenden Baldachin-Vorhängen." },
      { heading: "Der Kontrast", text: "Cleane, helle Wandpaneele und ein moderner, maßgeschneiderter Arbeitsplatz in der Raumecke halten das Design trotz der verspielten Details strukturiert und ruhig." },
      { heading: "Das Licht", text: "Eine wolkenartige, skulpturale Hängeleuchte im Zentrum sorgt für ein sanftes, magisches Lichtgefühl im gesamten Raum." },
      { heading: "Vibe", text: "Romantisch, fantasievoll und mit ganz viel Pariser Charme." },
    ],
    order: 6,
  },
];

export const packageTerms = "Bis zu zwei Korrekturschleifen inklusive. Alle Preise sind Endpreise inkl. MwSt.";

export const packages = [
  {
    name: "Édition Unique",
    eyebrow: "Das Gesamtkonzept",
    description: "Das Rundum-sorglos-Paket für dein neues Zuhause.",
    features: ["2D-Planung", "Produktempfehlungen", "3D-Visualisierung", "Das Édition Reveal"],
    price: "129 € / m²",
    priceValue: 129,
    priceCurrency: "EUR",
    priceUnit: "m²",
  },
];

export const services = [
  {
    title: "Accessoire-Einkauf (Full-Service)",
    text: "Wir übernehmen die gesamte Auswahl und Bestellung dekorativer Details wie Vasen, Bücher oder Kissen.",
    price: "Artikelpreis + 20% Servicepauschale",
  },
  {
    title: "Express-Service (72h-Konzept-Entwurf)",
    text: "Für eilige Projekte: Priorisierte Bearbeitung mit schneller Konzeptlieferung – je nach Verfügbarkeit.",
    price: "+20%",
  },
  {
    title: "Zusätzliche Visualisierung / Überarbeitung",
    text: "Enthält eine weitere 3D-Visualisierung oder konzeptionelle Anpassung nach der zweiten Korrekturschleife. Ideal bei Änderungswünschen, die über das vereinbarte Maß hinausgehen.",
    price: "49€/QM",
  },
  {
    title: "Shopping-Service & Produktbestellung",
    text: "Wir übernehmen die komplette Abwicklung deiner Bestellungen – von der Recherche bis zur Bestellung inklusive Rücksprachen mit Lieferanten.",
    price: "Artikelpreis + 20% Servicepauschale",
  },
  {
    title: "Projektkoordination & Handwerkersteuerung",
    text: "Organisation und Kommunikation mit allen Gewerken. Bauleitung light für einen reibungslosen Ablauf vor Ort.",
    price: "245 €/Stunde",
  },
  {
    title: "Nachhaltiges Design (Eco friendly Konzept)",
    text: "Materialien und Produkte aus nachhaltiger Produktion, ganzheitlich gedacht für ein bewusstes Zuhause.",
    price: "258 €/QM",
  },
];

export const serviceFaqs: FaqItem[] = [
  {
    question: "Bietet ihr auch technische Zeichnungen an?",
    answer: "Aktuell nicht. Ich arbeite noch ohne festen Architekten und möchte diese Verantwortung nicht ohne Fachpartner übernehmen. Sobald ich mit einem Architekten zusammenarbeite, wird das Teil des Angebots.",
  },
  {
    question: "Wo bietet ANNA ÉDITION Interior Design an?",
    answer: "ANNA ÉDITION hat seinen Sitz in Wesel und begleitet Interior-Design-Projekte am Niederrhein, unter anderem in Duisburg und Düsseldorf, sowie im Großraum Frankfurt am Main (im Umkreis von 50 km). Online-Einrichtungsberatungen sind deutschlandweit möglich.",
  },
  {
    question: "Wie funktioniert eine Online-Einrichtungsberatung?",
    answer: "Nach deiner Anfrage besprechen wir Raum, Wünsche und Budget. Auf Basis deiner Unterlagen erhältst du eine klare gestalterische Richtung, konkrete Empfehlungen und mit Édition Unique eine 2D-Planung, Produktempfehlungen, eine 3D-Visualisierung und das Édition Reveal.",
  },
  {
    question: "Was ist in einer 3D-Visualisierung enthalten?",
    answer: "Die realistische 3D-Visualisierung zeigt die geplante Raumwirkung, Möblierung, Materialien, Farben und Beleuchtung vor der Umsetzung. Der genaue Umfang richtet sich nach deinem Projekt.",
  },
  {
    question: "Wie setzen sich die Preise zusammen?",
    answer: "Édition Unique kostet 129 €/m² und beinhaltet bis zu zwei Korrekturschleifen. Zusatzleistungen können optional ergänzt werden. Alle Preise sind Endpreise inklusive Mehrwertsteuer. Vor Projektstart erhältst du eine transparente Zusammenfassung der Leistungen und Kosten.",
  },
  {
    question: "Was ist Call a Designer?",
    answer: "Call a Designer ist eine fokussierte 90-minütige Online-Beratung für konkrete Einrichtungsfragen, eine professionelle Zweitmeinung oder schnelle gestalterische Klarheit. Ein Einkaufsguide ist enthalten. Der Festpreis beträgt 500 Euro inklusive Mehrwertsteuer.",
  },
  {
    question: "Berechnest du Fahrtkosten für die Vor-Ort-Termine?",
    answer: "Nein, alle Preise sind All-Inclusive-Preise. Da mir eine transparente Partnerschaft auf Augenhöhe wichtig ist, sind sämtliche Reise- und Anfahrtskosten in den Paketpreisen bereits komplett enthalten. Es gibt bei Anna Édition keine versteckten Kosten oder nachträgliche Kilometer-Abrechnungen für dich.",
  },
  {
    question: "Ich wohne im Großraum Frankfurt / Hanau – kann ich dich für ein Vor-Ort-Styling buchen?",
    answer: "Ja, sehr gerne! Ich habe alle zwei Wochen feste Termine in Hessen. Mein Einzugsgebiet umfasst dabei Frankfurt am Main sowie alle Orte im Umkreis von 50 km (wie z. B. Hanau, Offenbach oder Bad Vilbel). Liegt dein Projekt in diesem Radius, profitierst du ohne Aufpreis von meinem All-Inclusive-Modell.",
  },
];
