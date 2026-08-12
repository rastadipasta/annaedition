import type { Project, ProjectCategory } from "@/lib/types";

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
];

export const fallbackProjects: Project[] = [
  {
    slug: "calm-light",
    title: "Calm Light",
    location: "München",
    year: 2026,
    category: "Wohn- & Essbereiche",
    excerpt: "Klare Linien, ruhige Materialien und ein tiefer Bordeaux-Akzent für ein Zuhause mit Charakter.",
    description: "Ein großzügiger Wohn- und Essbereich, dessen warme Holzflächen, markanter Naturstein und weiche Textilien eine selbstverständliche Ruhe ausstrahlen. Die Planung verbindet Alltagstauglichkeit mit einer präzisen, zeitlosen Atmosphäre.",
    materials: ["Dunkle Eiche", "Naturstein", "Messing", "Bouclé", "Bordeaux"],
    cover: "/images/calm-light-living.jpeg",
    gallery: [
      "/images/calm-light-living.jpeg",
      "/images/calm-light-kitchen.jpg",
      "/images/calm-light-dining.jpg",
      "/images/calm-light-night.jpg",
      "/images/calm-light-wide.png",
    ],
    featured: true,
  },
  {
    slug: "quiet-kitchen",
    title: "Quiet Kitchen",
    location: "München",
    year: 2026,
    category: "Küchen",
    excerpt: "Eine monolithische Küche zwischen dunkler Eiche, lebendigem Stein und sanftem Licht.",
    description: "Die Küche wird zum ruhigen Mittelpunkt des offenen Grundrisses. Präzise Lichtlinien und großzügige Arbeitsflächen schaffen Klarheit, während natürliche Materialien dem Raum Wärme geben.",
    materials: ["Eiche geräuchert", "Calacatta", "Bronze", "Leinen"],
    cover: "/images/calm-light-kitchen.jpg",
    gallery: ["/images/calm-light-kitchen.jpg", "/images/calm-light-dining.jpg", "/images/calm-light-wide.png"],
  },
  {
    slug: "after-dark",
    title: "After Dark",
    location: "Düsseldorf",
    year: 2026,
    category: "Wohn- & Essbereiche",
    excerpt: "Atmosphärische Abendstimmung mit skulpturalem Licht und klarer Raumführung.",
    description: "Eine Abendperspektive, in der Licht zur Architektur wird. Die dunkle Materialwelt fasst den offenen Raum zusammen und lenkt den Blick auf wenige, sorgfältig kuratierte Elemente.",
    materials: ["Nussbaum", "Messing", "Wolle", "Naturstein"],
    cover: "/images/calm-light-night.jpg",
    gallery: ["/images/calm-light-night.jpg", "/images/calm-light-wide.png", "/images/calm-light-living.jpeg"],
  },
];

export const packages = [
  {
    name: "Édition Essentielle",
    eyebrow: "Atmosphäre & Stil",
    description: "Der perfekte Einstieg für eine klare gestalterische Richtung.",
    features: ["Moodboard & Farbkonzept", "Material- & Oberflächenberatung", "Praktische Shoppingliste"],
    price: "49 € / m²",
  },
  {
    name: "Édition Élégance",
    eyebrow: "Struktur & Aufteilung",
    description: "Für Räume, die im Alltag intuitiv und selbstverständlich funktionieren.",
    features: ["Strukturierte 2D-Raumplanung", "Konkrete Produktempfehlungen", "Abgestimmtes Einrichtungskonzept"],
    price: "69 € / m²",
  },
  {
    name: "Édition Unique",
    eyebrow: "Das Gesamtkonzept",
    description: "Das Rundum-sorglos-Paket für dein neues Zuhause.",
    features: ["Möblierungskonzept", "Realistische 3D-Visualisierung", "Shoppingliste", "Finales Styling & Dokumentation"],
    price: "129 € / m²",
  },
];

export const services = [
  { title: "Raum- & Grundkonzepte", text: "Ein Raum funktioniert nur dann richtig, wenn die Aufteilung stimmt. Wir analysieren deinen Grundriss, verbessern Proportionen und entwickeln Lösungen, die exakt zu deinem Alltag passen." },
  { title: "Moodboards & Farbkonzepte", text: "Wir finden den roten Faden aus Farben, Stoffen und Oberflächen und übersetzen deinen Geschmack in ein harmonisches, sicheres Gesamtkonzept." },
  { title: "Material- & Oberflächenberatung", text: "Naturstein, Holz, Stoffe und Farben werden nach Wirkung, Haptik, Alltagstauglichkeit und Langlebigkeit sorgfältig kuratiert." },
  { title: "Möblierungskonzepte", text: "Freie Laufwege, sinnvoller Stauraum und stimmige Proportionen verbinden sich zu einer Einrichtung, die schön aussieht und intuitiv funktioniert." },
  { title: "3D-Visualisierungen", text: "Realistische 3D-Bilder machen Entscheidungen sicher: Du erlebst den fertigen Raum, bevor Umbau oder Bestellung beginnen." },
  { title: "Shoppingliste", text: "Eine klare Einkaufsliste bündelt Möbel, Materialien, Produkthinweise und passende Händler – abgestimmt auf Stil und Budget." },
  { title: "Finales Styling & visuelle Dokumentation", text: "Wir übernehmen das Feintuning und fassen Moodboards, Farben, Pläne und Empfehlungen in einer hochwertigen Präsentationsmappe zusammen." },
  { title: "Maßanfertigungen & Sonderlösungen", text: "Wo Standardmöbel enden, entstehen millimetergenau geplante Einbauten, Raumteiler und individuelle Lösungen in Zusammenarbeit mit erfahrenen Handwerkern." },
];

export const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
