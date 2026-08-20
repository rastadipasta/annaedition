import { absoluteUrl, siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const content = `# ANNA ÉDITION

> ANNA ÉDITION ist ein Interior-Design-Studio von Anna Matkovic in Wesel am Niederrhein. Das Studio plant zeitlose, persönliche und funktionale Innenräume vor Ort und online.

## Leistungen
- Interior Design und ganzheitliche Raumkonzepte
- Online-Einrichtungsberatung
- 2D-Raumplanung und realistische 3D-Visualisierung
- Farb-, Material- und Möblierungskonzepte
- Möbel-Shoppinglisten und finales Styling
- Call a Designer: fokussierte 90-minütige Online-Beratung

## Arbeitsgebiet
Vor-Ort-Projekte in Wesel, am Niederrhein, in Duisburg und Düsseldorf. Online-Beratung ist deutschlandweit möglich.

## Kontakt
- Studio: ANNA ÉDITION
- Inhaberin: Anna Matkovic
- Adresse: Kreuzstraße 15, 46483 Wesel, Deutschland
- Telefon: +49 157 5207 9305
- E-Mail: studio@annaedition.de

## Canonical Seiten
- Website: ${siteUrl}
- Projekte: ${absoluteUrl("/projekte")}
- Leistungen: ${absoluteUrl("/leistungen")}
- Über Anna: ${absoluteUrl("/ueber-mich")}
- Kontakt: ${absoluteUrl("/kontakt")}

## Profile
- Instagram: https://www.instagram.com/anna_edition_/
- Pinterest: https://www.pinterest.com/anna_edition/
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
