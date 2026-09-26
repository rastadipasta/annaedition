import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SiteLoader } from "@/components/site-loader";
import { storeConsent } from "@/lib/privacy-preferences";

type IntroWindow = Window & { __annaIntroEnabled?: boolean };

describe("SiteLoader", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    (window as IntroWindow).__annaIntroEnabled = true;
    document.documentElement.classList.add("site-intro-enabled");
    window.sessionStorage.clear();
    document.cookie = "anna_cookie_consent=; Max-Age=0; Path=/";
    document.body.style.overflow = "";
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    delete (window as IntroWindow).__annaIntroEnabled;
    document.documentElement.classList.remove("site-intro-enabled", "site-intro-skip");
    document.body.style.overflow = "";
  });

  it("runs the 2.2 second intro and 1.2 second exit before restoring the page", () => {
    const onIntroExit = vi.fn();
    window.addEventListener("anna:intro-exit", onIntroExit);
    const { container } = render(<SiteLoader />);
    const loader = () => container.querySelector<HTMLElement>(".site-loader");

    expect(loader()).toHaveAttribute("data-phase", "loading");
    expect(document.body.style.overflow).toBe("hidden");

    act(() => vi.advanceTimersByTime(2199));
    expect(loader()).toHaveAttribute("data-phase", "loading");

    act(() => vi.advanceTimersByTime(1));
    expect(loader()).toHaveAttribute("data-phase", "exit");
    expect(onIntroExit).toHaveBeenCalledOnce();

    act(() => vi.advanceTimersByTime(1199));
    expect(loader()).toHaveAttribute("data-phase", "exit");

    act(() => vi.advanceTimersByTime(1));
    expect(loader()).toBeNull();
    expect(document.body.style.overflow).toBe("");
    expect(window.sessionStorage.getItem("anna-site-intro-seen")).toBeNull();
    window.removeEventListener("anna:intro-exit", onIntroExit);
  });

  it("remembers the intro only with current optional consent", () => {
    storeConsent("all");
    render(<SiteLoader />);
    act(() => vi.advanceTimersByTime(3400));
    expect(window.sessionStorage.getItem("anna-site-intro-seen")).toBe("true");
  });

  it("does not restore optional storage if consent is withdrawn during the intro", () => {
    storeConsent("all");
    render(<SiteLoader />);
    storeConsent("necessary");
    act(() => vi.advanceTimersByTime(3400));
    expect(window.sessionStorage.getItem("anna-site-intro-seen")).toBeNull();
  });

  it("does not render when the entry script disables the intro", () => {
    (window as IntroWindow).__annaIntroEnabled = false;
    document.documentElement.classList.replace("site-intro-enabled", "site-intro-skip");
    const { container } = render(<SiteLoader />);

    act(() => vi.advanceTimersByTime(0));

    expect(container.querySelector(".site-loader")).toBeNull();
    expect(document.body.style.overflow).toBe("");
  });
});
