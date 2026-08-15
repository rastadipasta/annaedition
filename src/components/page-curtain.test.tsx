import { act, cleanup, fireEvent, render } from "@testing-library/react";
import Link from "next/link";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getCurtainDestination, PageCurtainProvider } from "@/components/page-curtain";

const navigation = vi.hoisted(() => ({ pathname: "/", search: "", push: vi.fn() }));

vi.mock("next/navigation", () => ({
  usePathname: () => navigation.pathname,
  useRouter: () => ({ push: navigation.push }),
  useSearchParams: () => new URLSearchParams(navigation.search),
}));

function setReducedMotion(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn().mockReturnValue({ matches, addEventListener: vi.fn(), removeEventListener: vi.fn() }),
  });
}

describe("PageCurtainProvider", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    navigation.pathname = "/";
    navigation.search = "";
    navigation.push.mockReset();
    window.history.replaceState({}, "", "/");
    setReducedMotion(false);
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    document.documentElement.classList.remove("page-curtain-active");
  });

  it("covers, navigates, and reveals an eligible main route", () => {
    const view = render(
      <>
        <PageCurtainProvider />
        <main id="main" tabIndex={-1} />
        <Link href="/leistungen"><span>Leistungen</span></Link>
      </>,
    );

    fireEvent.click(view.getByText("Leistungen"));

    expect(view.container.querySelector(".page-curtain")).toHaveAttribute("data-phase", "covering");
    expect(view.container.querySelector(".page-curtain")).toHaveAttribute("data-direction", "forward");
    expect(document.documentElement).toHaveClass("page-curtain-active");

    act(() => vi.advanceTimersByTime(600));
    expect(navigation.push).toHaveBeenCalledOnce();
    expect(navigation.push).toHaveBeenCalledWith("/leistungen");

    navigation.pathname = "/leistungen";
    view.rerender(
      <>
        <PageCurtainProvider />
        <main id="main" tabIndex={-1} />
        <Link href="/leistungen">Leistungen</Link>
      </>,
    );

    expect(view.container.querySelector(".page-curtain")).toHaveAttribute("data-phase", "revealing");
    act(() => vi.advanceTimersByTime(900));

    expect(view.container.querySelector(".page-curtain")).toBeNull();
    expect(document.documentElement).not.toHaveClass("page-curtain-active");
    expect(document.activeElement).toBe(view.container.querySelector("#main"));
  });

  it("uses the reverse direction when navigating backward through the route order", () => {
    navigation.pathname = "/kontakt";
    window.history.replaceState({}, "", "/kontakt");
    const view = render(<><PageCurtainProvider /><Link href="/projekte">Projekte</Link></>);

    fireEvent.click(view.getByText("Projekte"));

    expect(view.container.querySelector(".page-curtain")).toHaveAttribute("data-direction", "backward");
  });

  it("bypasses the curtain when reduced motion is requested", () => {
    setReducedMotion(true);
    const view = render(
      <>
        <PageCurtainProvider />
        <Link href="/kontakt" onClick={(event) => event.preventDefault()}>Kontakt</Link>
      </>,
    );

    fireEvent.click(view.getByText("Kontakt"));
    act(() => vi.advanceTimersByTime(600));

    expect(view.container.querySelector(".page-curtain")).toBeNull();
    expect(navigation.push).not.toHaveBeenCalled();
  });
});

describe("getCurtainDestination", () => {
  function anchor(href: string, attributes: Record<string, string> = {}) {
    const element = document.createElement("a");
    element.href = href;
    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
    return element;
  }

  it("maps contact query links to the Kontakt curtain", () => {
    expect(getCurtainDestination(anchor("http://localhost/kontakt?anfrage=call"), "http://localhost/leistungen")).toEqual({
      direction: "forward",
      href: "/kontakt?anfrage=call",
      routeKey: "/kontakt?anfrage=call",
      title: "Kontakt",
    });
  });

  it.each([
    ["external links", anchor("https://example.com")],
    ["telephone links", anchor("tel:+4915752079305")],
    ["email links", anchor("mailto:studio@annaedition.de")],
    ["hash links", anchor("http://localhost/#main")],
    ["project details", anchor("http://localhost/projekte/after-dark")],
    ["studio", anchor("http://localhost/studio")],
    ["cookie settings", anchor("http://localhost/?cookie-settings=1")],
    ["downloads", anchor("http://localhost/datenschutz", { download: "" })],
    ["new tabs", anchor("http://localhost/kontakt", { target: "_blank" })],
  ])("ignores %s", (_label, element) => {
    expect(getCurtainDestination(element, "http://localhost/")).toBeNull();
  });
});
