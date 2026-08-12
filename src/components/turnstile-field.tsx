"use client";

import Script from "next/script";
import { useId, useRef } from "react";

declare global {
  interface Window {
    turnstile?: { render: (element: HTMLElement, options: Record<string, unknown>) => string };
  }
}

export function TurnstileField({ onToken }: { onToken: (token: string) => void }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const rawId = useId();
  const id = `turnstile-${rawId.replace(/:/g, "")}`;
  const rendered = useRef(false);
  if (!siteKey) return null;

  function renderWidget() {
    if (rendered.current || !window.turnstile) return;
    const target = document.getElementById(id);
    if (!target) return;
    window.turnstile.render(target, { sitekey: siteKey, theme: "auto", callback: onToken, "error-callback": () => onToken("") });
    rendered.current = true;
  }

  return <><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onLoad={renderWidget} /><div id={id} /></>;
}
