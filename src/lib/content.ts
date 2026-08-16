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
    cover: "/images/calm-light-living-studio.png",
    gallery: [
      "/images/calm-light-living-studio.png",
      "/images/calm-light-kitchen-studio.png",
      "/images/calm-light-dining-studio.png",
      "/images/calm-light-night-studio.png",
      "/images/calm-light-wide-studio.png",
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
    cover: "/images/calm-light-kitchen-studio.png",
    gallery: [
      "/images/calm-light-kitchen-studio.png",
      "/images/calm-light-dining-studio.png",
      "/images/calm-light-wide-studio.png",
    ],
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
    cover: "/images/calm-light-night-studio.png",
    gallery: [
      "/images/calm-light-night-studio.png",
      "/images/calm-light-wide-studio.png",
      "/images/calm-light-living-studio.png",
    ],
  },
];

export const packages = [
  {
    name: "Édition Essentielle",
    eyebrow: "Atmosphäre & Stil",
    description: "Der perfekte Einstieg für eine klare gestalterische Richtung.",
    features: ["Moodboard & Farbkonzept", "Material- & Oberflächenberatung", "Farb- & Materialkarte (für Wände & Oberflächen)"],
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
    features: ["Möblierungskonzept", "Realistische 3D-Visualisierung", "Detaillierte Möbel-Shoppingliste (mit Direktlinks)", "Einkauf & Finales Styling (Persönlich vor Ort)"],
    price: "129 € / m²",
  },
];

export const services = [
  { title: "Raum- & Grundkonzepte", text: "Ein Raum funktioniert nur dann richtig, wenn die Aufteilung stimmt. Wir schauen uns deinen vorhandenen Grundriss genau an und entwickeln Lösungen, die perfekt zu deinem Alltag passen. Dabei verbessern wir die Proportionen und holen das Beste aus jedem Quadratmeter heraus. Denn für uns bedeutet Planung nicht, einfach nur Möbel in ein Zimmer zu stellen – sondern den Raum so zu gestalten, dass du dich darin rundum wohlfühlen kannst." },
  { title: "Farb- & Materialkarte", text: "Zu jedem Basiskonzept erstellen wir für dich eine übersichtliche Farb- und Materialkarte für deine Wandgestaltung und Oberflächen. Du bekommst konkrete Farbnummern, Tapetenempfehlungen und nützliche Materialhinweise genannt, damit die Basis deines Raumes perfekt abgestimmt ist. (Möbel-Produktempfehlungen sind in dieser Karte nicht enthalten)." },
  { title: "Material- & Oberflächenberatung", text: "Materialien machen einen Raum erst lebendig – das geht weit über das Aussehen hinaus. Aus Naturstein, Holz, gemütlichen Stoffen und den passenden Farben entsteht eine Wohnwelt, die Ruhe und Gemütlichkeit ausstrahlt. Bei jeder Auswahl achten wir darauf, dass das Material praktisch ist, sich gut anfühlt und lange hält." },
  { title: "Möblierungskonzepte", text: "Damit dein Zuhause perfekt zu deinem Alltag passt, planen wir die Aufteilung deiner Möbel von Grund auf durch. Wir achten darauf, dass Laufwege frei bleiben, genügend Stauraum vorhanden ist und alle Möbelstücke optisch harmonieren. Du erhältst von uns ein klares Konzept, das dir genau zeigt, wie du deine Räume am besten einrichten und nutzen kannst." },
  { title: "3D-Visualisierungen", text: "Durch realistische 3D-Bilder siehst du schon vor dem Umbau ganz genau, wie dein neuer Raum später aussehen wird. Das gibt dir absolute Sicherheit bei deinen Entscheidungen, weil du das fertige Ergebnis schon vorab virtuell erleben kannst." },
  { title: "Detaillierte Möbel-Shoppingliste", text: "Ideen werden zu realen Möbeln. Du erhältst eine vollständige, maßgeschneiderte Produktliste für alle Einrichtungsgegenstände deines Raumes (Sofa, Tische, Leuchten, Teppiche etc.). Wir nennen dir exakte Maße, Preise und packen die direkten Online-Links zu den Händlern dazu. So kannst du alles stressfrei, stilsicher und ohne langes Suchen nachkaufen." },
  { title: "Einkauf & Finales Styling (Vor Ort)", text: "Der krönende Abschluss deines Projekts direkt bei dir vor Ort. Wenn deine Möbel geliefert und aufgebaut sind, komme ich persönlich in deine Wohnung. Wir gehen auf Wunsch gemeinsam Accessoires einkaufen und ich setze Kissen, Leuchten, Pflanzen und Dekoration mit dem passenden Blick für Details in deinen fertigen Räumen in Szene. Für dich entstehen so wunderschöne Wohnwelten mit echtem Wohlfühlcharakter." },
  { title: "Maßanfertigungen & Sonderlösungen", text: "Wir finden für jede Raumsituation die passende Lösung. Wenn Standardmöbel an ihre Grenzen stoßen, entwerfen wir maßgeschneiderte Sonderlösungen – vom perfekt eingepassten Einbauschrank bis hin zu individuellen Raumteilern. Wir übernehmen die detailgetreue Planung und arbeiten eng mit erfahrenen Handwerkern zusammen, damit am Ende alles millimetergenau passt und höchsten Komfort in deinen Alltag bringt." },
];

export const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
