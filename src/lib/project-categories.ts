import type { Project, ProjectCategory } from "@/lib/types";

// Older CMS documents still have a single primary category.
export const getProjectCategories = (project: Project) =>
  project.categories?.length ? project.categories : [project.category];

export const getProjectCover = (project: Project, category: ProjectCategory) =>
  project.categoryCovers?.find((entry) => entry.category === category)?.image || project.cover;
