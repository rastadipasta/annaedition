import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { CookieConsent, CookieSettingsButton } from "@/components/cookie-consent";
import { readConsent, storeConsent } from "@/lib/privacy-preferences";

describe("CookieConsent", () => {
  beforeEach(() => {
    cleanup();
    document.cookie = "anna_cookie_consent=; Max-Age=0; Path=/";
    document.cookie = "anna-theme=; Max-Age=0; Path=/";
    localStorage.clear();
    sessionStorage.clear();
    document.documentElement.dataset.theme = "light";
    history.replaceState(null, "", "/");
  });

  it("stores the necessary-only choice and closes the banner", async () => {
    render(<CookieConsent />);
    const button = await screen.findByRole("button", { name: "Nur notwendige" });
    fireEvent.click(button);

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(readConsent()?.choice).toBe("necessary");
    expect(localStorage.getItem("anna-theme")).toBeNull();
  });

  it("opens requested settings and stores optional theme consent", async () => {
    storeConsent("necessary");
    history.replaceState(null, "", "/kontakt?anfrage=call&cookie-settings=1#form");
    render(<><CookieConsent /><CookieSettingsButton /></>);
    fireEvent.click(await screen.findByRole("button", { name: "Alle akzeptieren" }));

    expect(readConsent()?.choice).toBe("all");
    expect(document.cookie).toContain("anna-theme=light");
    expect(localStorage.getItem("anna-theme")).toBeNull();
    expect(location.search).toBe("?anfrage=call");
    expect(location.hash).toBe("#form");
    expect(screen.getByRole("button", { name: "Cookie-Einstellungen" })).not.toHaveAttribute("href");
  });

  it("reopens settings without changing the current URL", async () => {
    history.replaceState(null, "", "/kontakt?anfrage=call#form");
    render(<><CookieConsent /><CookieSettingsButton /></>);
    fireEvent.click(await screen.findByRole("button", { name: "Alle akzeptieren" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());

    fireEvent.click(screen.getByRole("button", { name: "Cookie-Einstellungen" }));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(location.pathname + location.search + location.hash).toBe("/kontakt?anfrage=call#form");
    fireEvent.click(screen.getByRole("button", { name: "Nur notwendige" }));
    expect(readConsent()?.choice).toBe("necessary");
  });

  it("withdraws both optional preferences through the reopened banner", async () => {
    storeConsent("all");
    sessionStorage.setItem("anna-site-intro-seen", "true");
    history.replaceState(null, "", "/?cookie-settings=1");
    render(<CookieConsent />);
    fireEvent.click(await screen.findByRole("button", { name: "Nur notwendige" }));
    expect(readConsent()?.choice).toBe("necessary");
    expect(document.cookie).not.toContain("anna-theme=");
    expect(sessionStorage.getItem("anna-site-intro-seen")).toBeNull();
  });

  it("asks again when the saved consent predates the optional intro purpose", async () => {
    document.cookie = "anna_cookie_consent=all; Path=/";
    render(<CookieConsent />);
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });
});
