import { act, cleanup, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MotionController } from "@/components/motion-controller";

vi.mock("next/navigation", () => ({ usePathname: () => "/test" }));

type ObserverCallback = IntersectionObserverCallback;

class MockIntersectionObserver {
  static latest: MockIntersectionObserver | null = null;
  callback: ObserverCallback;
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();

  constructor(callback: ObserverCallback) {
    this.callback = callback;
    MockIntersectionObserver.latest = this;
  }
}

function setReducedMotion(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn().mockReturnValue({ matches, addEventListener: vi.fn(), removeEventListener: vi.fn() }),
  });
}

describe("MotionController", () => {
  beforeEach(() => {
    setReducedMotion(false);
    MockIntersectionObserver.latest = null;
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  afterEach(() => {
    cleanup();
    document.documentElement.classList.remove("motion-enabled");
    vi.unstubAllGlobals();
  });

  it("reveals an observed element once and stops observing it", async () => {
    const { container } = render(<><MotionController /><div data-motion="reveal">Projekt</div></>);
    const target = container.querySelector<HTMLElement>('[data-motion="reveal"]')!;
    const observer = MockIntersectionObserver.latest!;

    expect(observer.observe).toHaveBeenCalledWith(target);

    act(() => {
      observer.callback([{ isIntersecting: true, target } as unknown as IntersectionObserverEntry], observer as unknown as IntersectionObserver);
    });

    expect(target).toHaveClass("is-revealed");
    expect(observer.unobserve).toHaveBeenCalledWith(target);
    await waitFor(() => expect(document.documentElement).toHaveClass("motion-enabled"));
  });

  it("keeps content visible when reduced motion is requested", () => {
    setReducedMotion(true);
    const { container } = render(<><MotionController /><div data-motion="reveal">Kontakt</div></>);
    const target = container.querySelector<HTMLElement>('[data-motion="reveal"]')!;

    expect(target).toHaveClass("is-revealed");
    expect(document.documentElement).not.toHaveClass("motion-enabled");
    expect(MockIntersectionObserver.latest!.disconnect).toHaveBeenCalled();
  });

  it("registers reveal elements inserted after the initial render", async () => {
    const { container } = render(<><MotionController /><main id="main" /></>);
    const target = document.createElement("article");
    target.dataset.motion = "reveal";
    container.querySelector("#main")!.appendChild(target);

    await waitFor(() => expect(MockIntersectionObserver.latest!.observe).toHaveBeenCalledWith(target));
  });

  it("uses a visible-element fallback when IntersectionObserver is unavailable", async () => {
    vi.unstubAllGlobals();
    Object.defineProperty(window, "IntersectionObserver", { configurable: true, value: undefined });
    Object.defineProperty(window, "requestAnimationFrame", { configurable: true, value: (callback: FrameRequestCallback) => { callback(0); return 1; } });
    Object.defineProperty(window, "cancelAnimationFrame", { configurable: true, value: vi.fn() });

    const { container } = render(<><MotionController /><div data-motion="reveal">Leistungen</div></>);
    const target = container.querySelector<HTMLElement>('[data-motion="reveal"]')!;
    target.getBoundingClientRect = () => ({ top: 10, bottom: 100 } as DOMRect);

    act(() => window.dispatchEvent(new Event("anna:motion-refresh")));

    await waitFor(() => expect(target).toHaveClass("is-revealed"));
    expect(document.documentElement).toHaveClass("motion-enabled");
  });

  it("waits for the loader exit before starting the hero typewriter", () => {
    const { container } = render(
      <>
        <MotionController />
        <div className="site-loader" data-phase="loading" style={{ display: "grid" }} />
        <h1 className="typewriter-title"><span className="typewriter-line">Thoughtful</span></h1>
      </>,
    );
    const title = container.querySelector<HTMLElement>(".typewriter-title")!;

    expect(title).not.toHaveClass("is-typewriting");
    act(() => window.dispatchEvent(new Event("anna:intro-exit")));
    expect(title).toHaveClass("is-typewriting");
  });

  it("starts the hero typewriter immediately when no loader is visible", () => {
    const { container } = render(
      <><MotionController /><h1 className="typewriter-title"><span className="typewriter-line">Thoughtful</span></h1></>,
    );

    expect(container.querySelector(".typewriter-title")).toHaveClass("is-typewriting");
  });
});
