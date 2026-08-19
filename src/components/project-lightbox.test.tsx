import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ProjectLightboxImage, ProjectLightboxProvider } from "@/components/project-lightbox";

const images = [
  { url: "/images/projects/emerald-skyline/cover.jpg", alt: "Emerald Skyline Hauptansicht" },
  { url: "/images/projects/emerald-skyline/01.jpg", alt: "Emerald Skyline zweite Ansicht" },
];

afterEach(() => cleanup());

function TestGallery() {
  return (
    <ProjectLightboxProvider title="Emerald Skyline" images={images}>
      <ProjectLightboxImage image={images[0]} index={0} className="project-hero-image" sizes="100vw" />
      <ProjectLightboxImage image={images[1]} index={1} className="project-gallery-image" sizes="100vw" />
    </ProjectLightboxProvider>
  );
}

describe("ProjectLightbox", () => {
  it("opens at the selected image, navigates with controls and closes with Escape", async () => {
    render(<TestGallery />);
    const trigger = screen.getByRole("button", { name: /Emerald Skyline Hauptansicht vergrößern/ });

    fireEvent.click(trigger);
    const dialog = screen.getByRole("dialog", { name: /Emerald Skyline/ });
    expect(dialog).toBeVisible();
    expect(screen.getByText("1 / 2")).toBeVisible();
    expect(document.body).toHaveStyle({ overflow: "hidden" });

    fireEvent.click(screen.getByRole("button", { name: "Nächstes Bild" }));
    expect(screen.getByText("2 / 2")).toBeVisible();
    expect(within(dialog).getByAltText("Emerald Skyline zweite Ansicht")).toBeVisible();

    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(screen.getByText("1 / 2")).toBeVisible();

    fireEvent.keyDown(window, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(document.body).not.toHaveStyle({ overflow: "hidden" });
  });

  it("wraps from the first image to the last image", () => {
    render(<TestGallery />);
    fireEvent.click(screen.getByRole("button", { name: /Emerald Skyline Hauptansicht vergrößern/ }));
    fireEvent.click(screen.getByRole("button", { name: "Vorheriges Bild" }));
    expect(screen.getByText("2 / 2")).toBeVisible();
  });
});
