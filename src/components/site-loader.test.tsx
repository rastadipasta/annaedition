import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SiteLoader } from "@/components/site-loader";

type IntroWindow = Window & { __annaIntroEnabled?: boolean };

describe("SiteLoader", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    (window as IntroWindow).__annaIntroEnabled = true;
    document.documentElement.classList.add("site-intro-enabled");
    window.sessionStorage.clear();
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
    const { container } = render(<SiteLoader />);
    const loader = () => container.querySelector<HTMLElement>(".site-loader");

    expect(loader()).toHaveAttribute("data-phase", "loading");
    expect(document.body.style.overflow).toBe("hidden");

    act(() => vi.advanceTimersByTime(2199));
    expect(loader()).toHaveAttribute("data-phase", "loading");

    act(() => vi.advanceTimersByTime(1));
    expect(loader()).toHaveAttribute("data-phase", "exit");

    act(() => vi.advanceTimersByTime(1199));
    expect(loader()).toHaveAttribute("data-phase", "exit");

    act(() => vi.advanceTimersByTime(1));
    expect(loader()).toBeNull();
    expect(document.body.style.overflow).toBe("");
    expect(window.sessionStorage.getItem("anna-site-intro-seen")).toBe("true");
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
