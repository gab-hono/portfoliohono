import type { StaticImageData } from "next/image";
import type { Discipline } from "./disciplines";
import { devProjects, theaterProjects, soundProjects } from "./projects";

/*
 * Featured projects de la home (Ficha 2): 3 proyectos, en este orden.
 * Aquí solo se elige qué proyectos y con qué categoría. La portada y la
 * disciplina salen de projects.ts; el título, de messages (Projects.<id>.title);
 * la categoría, de messages (Home.featured.categories.<category>).
 * Un id que no existe en projects.ts rompe el build.
 */

const allProjects = [...devProjects, ...theaterProjects, ...soundProjects];

type ProjectId = (typeof allProjects)[number]["id"];

/** Claves de Home.featured.categories en messages. */
type FeaturedCategory = "webApp" | "performance";

const entries = [
  { id: "mapiscine", category: "webApp" },
  { id: "cityson", category: "webApp" },
  { id: "caminamos", category: "performance" },
] as const satisfies readonly { id: ProjectId; category: FeaturedCategory }[];

export type FeaturedProject = {
  id: (typeof entries)[number]["id"];
  category: FeaturedCategory;
  discipline: Discipline;
  /** Portada del proyecto (primera imagen en projects.ts). */
  cover: StaticImageData;
};

export const featuredProjects: readonly FeaturedProject[] = entries.map(({ id, category }) => {
  const project = allProjects.find((p) => p.id === id);
  // No puede pasar (los ids están tipados), pero find() devuelve "| undefined".
  if (!project) throw new Error(`Featured project not found: ${id}`);
  return { id, category, discipline: project.discipline, cover: project.images[0].src };
});