"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { services as fallbackServices } from "@/lib/content";
import type { ServiceItem } from "@/lib/types";

export function ServicesAccordion({ services = fallbackServices }: { services?: ServiceItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="accordion">
      {services.map((service, index) => {
        const isOpen = open === index;
        const id = `service-panel-${index}`;
        return (
          <div className="accordion-item" key={service.title}>
            <h2>
              <button className="accordion-trigger" type="button" aria-expanded={isOpen} aria-controls={id} onClick={() => setOpen(isOpen ? null : index)}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span>{service.title}</span>
                {isOpen ? <Minus size={20} aria-hidden="true" /> : <Plus size={20} aria-hidden="true" />}
              </button>
            </h2>
            <div id={id} className="accordion-panel" data-open={isOpen}><div><p>{service.text}</p></div></div>
          </div>
        );
      })}
    </div>
  );
}
