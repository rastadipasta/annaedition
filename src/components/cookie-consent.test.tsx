import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { CookieConsent, CookieSettingsButton } from "@/components/cookie-consent";

describe("CookieConsent", () => {
  beforeEach(() => {
    cleanup();
    document.cookie = "anna_cookie_consent=; Max-Age=0; Path=/";
    localStorage.clear();
    document.documentElement.dataset.theme = "light";
    history.replaceState(null, "", "/");
  });

  it("stores the necessary-only choice and closes the banner", async () => {
    render(<CookieConsent />);
    const button = await screen.findByRole("button", { name: "Nur notwendige" });
    fireEvent.click(button);

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(document.cookie).toContain("anna_cookie_consent=necessary");
    expect(localStorage.getItem("anna-theme")).toBeNull();
  });

  it("opens requested settings and stores optional theme consent", async () => {
    document.cookie = "anna_cookie_consent=necessary; Path=/";
    history.replaceState(null, "", "/?cookie-settings=1");
    render(<><CookieConsent /><CookieSettingsButton /></>);
    fireEvent.click(await screen.findByRole("button", { name: "Alle akzeptieren" }));

    expect(document.cookie).toContain("anna_cookie_consent=all");
    expect(localStorage.getItem("anna-theme")).toBe("light");
    expect(location.search).toBe("");
    expect(screen.getByRole("link", { name: "Cookie-Einstellungen" })).toHaveAttribute("href", "?cookie-settings=1");
  });
});
