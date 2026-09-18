"use client";

import { Asterisk, Minus, Plus } from "lucide-react";
import type { CSSProperties } from "react";
import { useState } from "react";
import { services as fallbackServices } from "@/lib/content";
import type { ServiceItem } from "@/lib/types";

export function ServicesAccordion({ services = fallbackServices }: { services?: ServiceItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="service-cards">
      {services.map((service, index) => {
        const cardStyle = { "--service-top": `${112 + index * 10}px` } as CSSProperties;
        const isOpen = openIndex === index;
        const panelId = `service-card-panel-${index}`;
        return (
          <article className="service-card" data-featured={index === 0} data-open={isOpen} style={cardStyle} key={service.title}>
            <div className="service-card-topline">
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <button
                className="service-card-toggle"
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                aria-label={`${service.title} ${isOpen ? "schließen" : "öffnen"}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                {isOpen ? <Minus aria-hidden="true" /> : <Plus aria-hidden="true" />}
              </button>
            </div>
            <h3 className="service-card-title">{service.title}</h3>
            <div className="service-card-panel" id={panelId} data-open={isOpen}>
              <div className="service-card-panel-inner">
                <div className="service-card-copy"><Asterisk size={28} strokeWidth={1.25} aria-hidden="true" /><div><p>{service.text}</p>{service.price && <p className="service-card-price">Preis: {service.price}</p>}</div></div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
