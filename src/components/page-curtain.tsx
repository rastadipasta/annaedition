"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MutableRefObject } from "react";

const coverDuration = 600;
const revealDuration = 900;
const safetyDuration = 5000;

const curtainRoutes = [
  { pathname: "/", title: "ANNA ÉDITION" },
  { pathname: "/projekte", title: "Projekte" },
  { pathname: "/leistungen", title: "Leistungen" },
  { pathname: "/ueber-mich", title: "Über mich" },
  { pathname: "/kontakt", title: "Kontakt" },
  { pathname: "/impressum", title: "Impressum" },
  { pathname: "/datenschutz", title: "Datenschutz" },
] as const;

type CurtainDirection = "forward" | "backward";
type CurtainPhase = "idle" | "covering" | "revealing";

type CurtainState = {
  direction: CurtainDirection;
  phase: CurtainPhase;
  title: string;
};

const idleState: CurtainState = { direction: "forward", phase: "idle", title: "" };

function normalizePathname(pathname: string) {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "");
}

function routeKey(url: URL) {
  return `${normalizePathname(url.pathname)}${url.search}`;
}

function clearTimer(timer: MutableRefObject<number | null>) {
  if (timer.current !== null) window.clearTimeout(timer.current);
  timer.current = null;
}

export function getCurtainDestination(anchor: HTMLAnchorElement, currentHref: string) {
  if (
    anchor.hasAttribute("download")
    || anchor.dataset.noCurtain !== undefined
    || (anchor.target && anchor.target !== "_self")
  ) return null;

  const rawHref = anchor.getAttribute("href");
  if (!rawHref || rawHref.startsWith("#")) return null;

  let current: URL;
  let destination: URL;
  try {
    current = new URL(currentHref);
    destination = new URL(anchor.href, current);
  } catch {
    return null;
  }

  if (destination.origin !== current.origin || destination.hash || destination.searchParams.has("cookie-settings")) return null;

  const pathname = normalizePathname(destination.pathname);
  const routeIndex = curtainRoutes.findIndex((route) => route.pathname === pathname);
  if (routeIndex < 0 || routeKey(destination) === routeKey(current)) return null;

  const currentIndex = curtainRoutes.findIndex((route) => route.pathname === normalizePathname(current.pathname));
  return {
    direction: currentIndex >= 0 && routeIndex < currentIndex ? "backward" as const : "forward" as const,
    href: `${pathname}${destination.search}`,
    routeKey: `${pathname}${destination.search}`,
    title: curtainRoutes[routeIndex].title,
  };
}

export function PageCurtainProvider() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [curtain, setCurtain] = useState<CurtainState>(idleState);
  const pendingRoute = useRef<string | null>(null);
  const navigationStarted = useRef(false);
  const revealStarted = useRef(false);
  const coverTimer = useRef<number | null>(null);
  const revealTimer = useRef<number | null>(null);
  const safetyTimer = useRef<number | null>(null);

  const query = searchParams.toString();
  const currentRoute = `${normalizePathname(pathname)}${query ? `?${query}` : ""}`;

  const finishTransition = useCallback(() => {
    clearTimer(coverTimer);
    clearTimer(revealTimer);
    clearTimer(safetyTimer);
    document.documentElement.classList.remove("page-curtain-active");
    pendingRoute.current = null;
    navigationStarted.current = false;
    revealStarted.current = false;
    setCurtain(idleState);

    const main = document.querySelector<HTMLElement>("#main");
    main?.focus({ preventScroll: true });
  }, []);

  const reveal = useCallback(() => {
    if (revealStarted.current) return;
    revealStarted.current = true;
    setCurtain((state) => ({ ...state, phase: "revealing" }));
    revealTimer.current = window.setTimeout(finishTransition, revealDuration);
  }, [finishTransition]);

  useEffect(() => {
    if (navigationStarted.current && pendingRoute.current === currentRoute) reveal();
  }, [currentRoute, reveal]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented
        || event.button !== 0
        || event.metaKey
        || event.ctrlKey
        || event.shiftKey
        || event.altKey
        || curtain.phase !== "idle"
        || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
      ) return;

      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const destination = getCurtainDestination(anchor, window.location.href);
      if (!destination) return;

      event.preventDefault();
      pendingRoute.current = destination.routeKey;
      document.documentElement.classList.add("page-curtain-active");
      setCurtain({ direction: destination.direction, phase: "covering", title: destination.title });

      coverTimer.current = window.setTimeout(() => {
        navigationStarted.current = true;
        router.push(destination.href);
      }, coverDuration);

      safetyTimer.current = window.setTimeout(finishTransition, safetyDuration);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [curtain.phase, finishTransition, router]);

  useEffect(() => () => {
    clearTimer(coverTimer);
    clearTimer(revealTimer);
    clearTimer(safetyTimer);
    document.documentElement.classList.remove("page-curtain-active");
  }, []);

  if (curtain.phase === "idle") return null;

  return (
    <div
      className="page-curtain"
      data-direction={curtain.direction}
      data-phase={curtain.phase}
      aria-hidden="true"
    >
      <span className="page-curtain-title">{curtain.title}</span>
    </div>
  );
}
