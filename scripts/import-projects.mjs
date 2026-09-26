import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { getCliClient } from "sanity/cli";
import { fallbackProjects } from "../src/lib/content.ts";

const apiVersion = "2026-08-19";
const apply = process.argv.includes("--apply");
const client = getCliClient({ apiVersion });
const incomingSlugs = fallbackProjects.map((project) => project.slug);

const existing = await client.fetch(
  `*[_type == "project" && !(_id in path("drafts.**")) && slug.current in $slugs]{_id, title, "slug": slug.current}`,
  { slugs: incomingSlugs },
);

if (new Set(existing.map((document) => document.slug)).size !== existing.length) {
  throw new Error("Duplicate project slugs in Sanity. Resolve them before importing.");
}

console.log(`${apply ? "IMPORT" : "DRY RUN"}: ${fallbackProjects.length} projects`);
console.table(fallbackProjects.map((project) => ({ order: project.order, slug: project.slug, title: project.title, images: project.gallery.length + 1 })));
console.log("Documents to update in place:", existing.length ? existing : "none");

if (!apply) {
  console.log("No changes made. Run `npm run cms:projects:import` to upload assets and upsert the project documents. Unrelated documents are preserved.");
  process.exit(0);
}

const localPath = (url) => {
  const filePath = path.resolve(process.cwd(), "public", url.replace(/^\/+/, ""));
  if (!existsSync(filePath)) throw new Error(`Missing project image: ${filePath}`);
  return filePath;
};

const uploadedImages = new Map();
const uploadImage = async (image, slug, label) => {
  const cached = uploadedImages.get(image.url);
  if (cached) return { ...cached, alt: image.alt };
  const filePath = localPath(image.url);
  const asset = await client.assets.upload("image", createReadStream(filePath), {
    filename: `${slug}-${label}.jpg`,
  });
  const uploaded = {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt: image.alt,
  };
  uploadedImages.set(image.url, uploaded);
  return uploaded;
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

  const categoryCovers = [];
  for (const [index, entry] of (project.categoryCovers || []).entries()) {
    categoryCovers.push({
      _key: `category-${index + 1}`,
      _type: "categoryCover",
      category: entry.category,
      image: await uploadImage(entry.image, project.slug, `category-${index + 1}`),
    });
  }

  documents.push({
    _id: existing.find((document) => document.slug === project.slug)?._id || `project-${project.slug}`,
    _type: "project",
    title: project.title,
    slug: { _type: "slug", current: project.slug },
    location: project.location,
    year: project.year,
    category: project.category,
    categories: project.categories || [project.category],
    showInAllProjects: project.showInAllProjects !== false,
    categoryCovers,
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
documents.forEach((document) => {
  const { _id, _type, ...fields } = document;
  transaction.createIfNotExists({ _id, _type });
  transaction.patch(_id, (patch) => patch.set(fields));
});
await transaction.commit({ visibility: "sync" });

console.log(`Imported ${documents.length} projects (${existing.length} updated in place). No documents deleted.`);
