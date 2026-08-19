import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { getCliClient } from "sanity/cli";
import { fallbackProjects } from "../src/lib/content.ts";

const apiVersion = "2026-08-19";
const apply = process.argv.includes("--apply");
const client = getCliClient({ apiVersion });
const legacySlugs = ["calm-light", "quiet-kitchen", "after-dark"];
const incomingSlugs = fallbackProjects.map((project) => project.slug);

const existing = await client.fetch(
  `*[_type == "project" && slug.current in $slugs]{_id, title, "slug": slug.current}`,
  { slugs: [...legacySlugs, ...incomingSlugs] },
);

console.log(`${apply ? "IMPORT" : "DRY RUN"}: ${fallbackProjects.length} projects`);
console.table(fallbackProjects.map((project) => ({ order: project.order, slug: project.slug, title: project.title, images: project.gallery.length + 1 })));
console.log("Documents to replace/remove:", existing.length ? existing : "none");

if (!apply) {
  console.log("No changes made. Run `npm run cms:projects:import` to upload assets and replace the project documents.");
  process.exit(0);
}

const localPath = (url) => {
  const filePath = path.resolve(process.cwd(), "public", url.replace(/^\/+/, ""));
  if (!existsSync(filePath)) throw new Error(`Missing project image: ${filePath}`);
  return filePath;
};

const uploadImage = async (image, slug, label) => {
  const filePath = localPath(image.url);
  const asset = await client.assets.upload("image", createReadStream(filePath), {
    filename: `${slug}-${label}.jpg`,
  });
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt: image.alt,
  };
};

const documents = [];
for (const project of fallbackProjects) {
  console.log(`Uploading ${project.title}...`);
  const cover = await uploadImage(project.cover, project.slug, "cover");
  const gallery = [];
  for (const [index, image] of project.gallery.entries()) {
    gallery.push({
      ...(await uploadImage(image, project.slug, String(index + 1).padStart(2, "0"))),
      _key: `image-${String(index + 1).padStart(2, "0")}`,
    });
  }

  documents.push({
    _id: `project-${project.slug}`,
    _type: "project",
    title: project.title,
    slug: { _type: "slug", current: project.slug },
    location: project.location,
    year: project.year,
    category: project.category,
    excerpt: project.excerpt,
    description: project.description,
    materials: project.materials,
    cover,
    gallery,
    storySections: project.storySections.map((section, index) => ({
      _key: `story-${index + 1}`,
      _type: "storySection",
      ...section,
    })),
    order: project.order,
    featured: Boolean(project.featured),
  });
}

const transaction = client.transaction();
existing.forEach((document) => transaction.delete(document._id));
documents.forEach((document) => transaction.createOrReplace(document));
await transaction.commit({ visibility: "sync" });

console.log(`Imported ${documents.length} projects and removed ${existing.length} replaced/legacy project documents.`);
