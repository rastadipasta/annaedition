import { Asterisk } from "lucide-react";
import type { CSSProperties } from "react";
import { services as fallbackServices } from "@/lib/content";
import type { ServiceItem } from "@/lib/types";

const serviceTags = [
  ["Grundrissanalyse", "Raumfluss", "Proportionen"],
  ["Farben", "Stoffe", "Materialwelt"],
  ["Naturstein", "Holz", "Oberflächen", "Haptik"],
  ["Möblierung", "Laufwege", "Stauraum"],
  ["Fotorealistisch", "Entscheidungssicherheit", "Vorher erleben"],
  ["Produktauswahl", "Händler", "Budget"],
  ["Styling", "Feintuning", "Präsentationsmappe"],
  ["Einbauten", "Raumteiler", "Handwerk"],
];

export function ServicesAccordion({ services = fallbackServices }: { services?: ServiceItem[] }) {
  return (
    <div className="service-cards">
      {services.map((service, index) => {
        const cardStyle = { "--service-top": `${112 + index * 10}px` } as CSSProperties;
        return (
          <article className="service-card" data-featured={index === 0} style={cardStyle} key={service.title}>
            <div className="service-card-topline">
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="service-card-title">{service.title}</h3>
            <div className="service-card-tags" aria-label="Leistungsbereiche">
              {serviceTags[index % serviceTags.length].map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <div className="service-card-panel">
              <div className="service-card-copy"><Asterisk size={28} strokeWidth={1.25} aria-hidden="true" /><p>{service.text}</p></div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
