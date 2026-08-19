"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { createContext, type PointerEvent, type ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ProjectImage } from "@/lib/types";

type LightboxContextValue = {
  images: ProjectImage[];
  openAt: (index: number, trigger: HTMLButtonElement) => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function ProjectLightboxProvider({ title, images, children }: { title: string; images: ProjectImage[]; children: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "previous">("next");
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const pointerStart = useRef<number | null>(null);

  const openAt = useCallback((index: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setDirection("next");
    setActiveIndex(index);
  }, []);

  const close = useCallback(() => {
    setActiveIndex(null);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  const move = useCallback((step: number) => {
    setDirection(step > 0 ? "next" : "previous");
    setActiveIndex((current) => current === null ? null : (current + step + images.length) % images.length);
  }, [images.length]);

  const jump = useCallback((index: number) => {
    setDirection(index > (activeIndex ?? 0) ? "next" : "previous");
    setActiveIndex(index);
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "Home") jump(0);
      if (event.key === "End") jump(images.length - 1);
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled])"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, images.length, jump, move]);

  useEffect(() => {
    if (activeIndex === null || images.length < 2) return;
    const neighbours = [images[(activeIndex - 1 + images.length) % images.length], images[(activeIndex + 1) % images.length]];
    neighbours.forEach((image) => {
      const preload = new window.Image();
      preload.src = image.url;
    });
  }, [activeIndex, images]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStart.current = event.clientX;
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(distance) < 48) return;
    move(distance < 0 ? 1 : -1);
  };

  const displayedIndex = activeIndex ?? 0;
  const current = activeIndex === null ? null : images[displayedIndex];

  return (
    <LightboxContext.Provider value={{ images, openAt }}>
      {children}
      {current && createPortal(
        <div
          ref={dialogRef}
          className="project-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} – vergrößerte Projektgalerie`}
          onClick={(event) => { if (event.target === event.currentTarget) close(); }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <div className="project-lightbox-topbar">
            <p className="project-lightbox-title">{title}</p>
            <p className="project-lightbox-counter" aria-live="polite">{displayedIndex + 1} / {images.length}</p>
            <button ref={closeRef} className="project-lightbox-close" type="button" onClick={close} aria-label="Galerie schließen"><X size={24} /></button>
          </div>
          <button className="project-lightbox-arrow project-lightbox-previous" type="button" onClick={() => move(-1)} aria-label="Vorheriges Bild"><ChevronLeft size={32} /></button>
          <div className="project-lightbox-stage">
            <div key={`${current.url}-${direction}`} className="project-lightbox-image" data-direction={direction}>
              <Image src={current.url} alt={current.alt} fill priority sizes="100vw" />
            </div>
          </div>
          <button className="project-lightbox-arrow project-lightbox-next" type="button" onClick={() => move(1)} aria-label="Nächstes Bild"><ChevronRight size={32} /></button>
        </div>,
        document.body,
      )}
    </LightboxContext.Provider>
  );
}

export function ProjectLightboxImage({
  image,
  index,
  className,
  sizes,
  priority = false,
  motion = "reveal",
  motionOrder,
}: {
  image: ProjectImage;
  index: number;
  className: string;
  sizes: string;
  priority?: boolean;
  motion?: "load" | "reveal";
  motionOrder?: string;
}) {
  const context = useContext(LightboxContext);
  if (!context) throw new Error("ProjectLightboxImage must be used inside ProjectLightboxProvider");

  return (
    <button
      className={`${className} project-lightbox-trigger`}
      type="button"
      onClick={(event) => context.openAt(index, event.currentTarget)}
      aria-label={`${image.alt} vergrößern (${index + 1} von ${context.images.length})`}
      data-motion={motion}
      data-motion-variant="image"
      data-motion-order={motionOrder}
      data-scroll-parallax
    >
      <Image src={image.url} alt={image.alt} fill priority={priority} sizes={sizes} />
      <span className="project-zoom-label" aria-hidden="true">Vergrößern</span>
    </button>
  );
}
