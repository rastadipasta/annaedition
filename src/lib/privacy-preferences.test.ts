import { runInNewContext } from "node:vm";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { consentLifetime, privacyBootstrapScript, readConsent, rememberIntro, saveTheme, storeConsent } from "./privacy-preferences";

function bootstrap() {
  runInNewContext(privacyBootstrapScript, { document, window, location, localStorage, sessionStorage, Date, matchMedia: () => ({ matches: false }) });
}

describe("privacy preferences", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    document.cookie = "anna_cookie_consent=; Max-Age=0; Path=/";
    document.cookie = "anna-theme=; Max-Age=0; Path=/";
    localStorage.clear();
    sessionStorage.clear();
    document.documentElement.dataset.theme = "light";
  });
  afterEach(() => { vi.restoreAllMocks(); vi.useRealTimers(); });

  it("does not persist optional choices before consent or after rejection", () => {
    saveTheme("dark");
    rememberIntro();
    expect(document.cookie).not.toContain("anna-theme=");
    expect(sessionStorage.length).toBe(0);
    storeConsent("necessary");
    saveTheme("dark");
    rememberIntro();
    expect(document.cookie).not.toContain("anna-theme=");
    expect(sessionStorage.length).toBe(0);
  });

  it("restores a consented theme before hydration", () => {
    storeConsent("all");
    saveTheme("dark");
    rememberIntro();
    bootstrap();
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect((window as Window & { __annaIntroEnabled?: boolean }).__annaIntroEnabled).toBe(false);
  });

  it("expires consent and theme after 180 days even if the theme is changed later", () => {
    storeConsent("all");
    const expiresAt = readConsent()!.expiresAt;
    vi.advanceTimersByTime(179 * 24 * 60 * 60 * 1000);
    saveTheme("dark");
    expect(readConsent()!.expiresAt).toBe(expiresAt);
    expect(document.cookie).toContain("anna-theme=dark");
    vi.advanceTimersByTime(24 * 60 * 60 * 1000 + 1000);
    expect(readConsent()).toBeNull();
    expect(document.cookie).not.toContain("anna-theme=");
    bootstrap();
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it.each(["all", "necessary", "v2.all.invalid", `v2.all.${Date.now() - 1}`])("rejects legacy or invalid consent %s and clears legacy storage", (value) => {
    document.cookie = `anna_cookie_consent=${value}; Path=/`;
    document.cookie = "anna-theme=dark; Path=/";
    localStorage.setItem("anna-theme", "dark");
    sessionStorage.setItem("anna-site-intro-seen", "true");
    const read = vi.spyOn(Storage.prototype, "getItem");
    bootstrap();
    expect(read).not.toHaveBeenCalled();
    expect(readConsent()).toBeNull();
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(document.cookie).not.toContain("anna-theme=");
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
  });

  it("keeps withdrawal usable when Web Storage is blocked", () => {
    storeConsent("all");
    vi.spyOn(Storage.prototype, "removeItem").mockImplementation(() => { throw new Error("Blocked"); });
    expect(() => storeConsent("necessary")).not.toThrow();
    expect(readConsent()?.choice).toBe("necessary");
    expect(document.cookie).not.toContain("anna-theme=");
    expect(() => bootstrap()).not.toThrow();
  });

  it("records a bounded consent lifetime", () => {
    const now = Date.now();
    storeConsent("all");
    expect(readConsent()?.expiresAt).toBe(now + consentLifetime * 1000);
  });
});
