"use client";

import { Asterisk, Minus, Plus } from "lucide-react";
import { useState, type CSSProperties } from "react";
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
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="service-cards">
      {services.map((service, index) => {
        const isOpen = open === index;
        const id = `service-panel-${index}`;
        const triggerId = `service-trigger-${index}`;
        const cardStyle = { "--service-top": `${112 + index * 10}px` } as CSSProperties;
        return (
          <article className="service-card" data-open={isOpen} style={cardStyle} key={service.title}>
            <h3>
              <button id={triggerId} className="service-card-trigger" type="button" aria-expanded={isOpen} aria-controls={id} onClick={() => setOpen(isOpen ? null : index)}>
                <span className="service-card-topline">
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <span className="service-card-toggle" aria-hidden="true">{isOpen ? <Minus size={22} /> : <Plus size={22} />}</span>
                </span>
                <span className="service-card-title">{service.title}</span>
              </button>
            </h3>
            <div className="service-card-tags" aria-label="Leistungsbereiche">
              {serviceTags[index % serviceTags.length].map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <div id={id} className="service-card-panel" data-open={isOpen} role="region" aria-labelledby={triggerId} aria-hidden={!isOpen}>
              <div className="service-card-copy"><Asterisk size={28} strokeWidth={1.25} aria-hidden="true" /><p>{service.text}</p></div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
