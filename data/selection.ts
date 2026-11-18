import type { Discipline } from "./disciplines";
import { devProjects, theaterProjects, soundProjects } from "./projects";

/*
 * Selected work de la home: lista cronológica (más reciente primero).
 * El orden del array ES el orden en pantalla.
 *
 * Dos tipos de fila:
 * - project: un proyecto que existe en projects.ts. Año y disciplina salen de ahí;
 *   un id que no existe rompe el build.
 * - external: un trabajo sin página en el sitio (enlaza afuera). Año, disciplina
 *   y URL van aquí.
 *
 * Los textos visibles (título, rol, contexto) van en messages:
 * Home.selection.rows.<id>. Cada id de este archivo necesita su entrada allí.
 *
 * Filtros Code / Theater / Sound = las disciplinas dev / theater / sound.
 */

const allProjects = [...devProjects, ...theaterProjects, ...soundProjects];

type ProjectId = (typeof allProjects)[number]["id"];

const entries = [
  {
    kind: "external",
    id: "nicola",
    discipline: "dev",
    year: "2026",
    // Pendiente: dominio oficial de Nícola cuando exista (ver plan, tarea paralela).
    href: "https://nicola-vilander-portfolio.vercel.app",
  },
  {
    kind: "external",
    id: "unvrs",
    discipline: "dev",
    year: "2026",
    href: "https://unvrsagency.com",
  },
  { kind: "project", id: "mapiscine" },
  { kind: "project", id: "cityson" },
  { kind: "project", id: "contre-recits" },
  { kind: "project", id: "la-methode" },
  { kind: "project", id: "andi" },
  { kind: "project", id: "les-arenes-lyriques" },
  { kind: "project", id: "caminamos" },
  { kind: "project", id: "todo-bajo-control" },
  { kind: "project", id: "animales-binarios" },
  { kind: "project", id: "festival-juan-radrigan" },
] as const satisfies readonly (
  | { kind: "project"; id: ProjectId }
  | { kind: "external"; id: string; discipline: Discipline; year: string; href: `https://${string}` }
)[];

/** Ids de las filas: claves de Home.selection.rows en messages. */
export type SelectionId = (typeof entries)[number]["id"];

export type SelectionEntry = {
  id: SelectionId;
  discipline: Discipline;
  /** "2026" o un rango: "2017–2019" */
  year: string;
  /** Página de la disciplina (interno) o URL completa (externo). */
  href: string;
  external: boolean;
};

export const selection: readonly SelectionEntry[] = entries.map((entry) => {
  if (entry.kind === "external") {
    return { id: entry.id, discipline: entry.discipline, year: entry.year, href: entry.href, external: true };
  }
  const project = allProjects.find((p) => p.id === entry.id);
  // No puede pasar (los ids están tipados), pero find() devuelve "| undefined".
  if (!project) throw new Error(`Selection project not found: ${entry.id}`);
  // Etapa 2 (deep links): aquí se añade ?project=<id> para abrir el diálogo.
  return {
    id: entry.id,
    discipline: project.discipline,
    year: project.year,
    href: `/${project.discipline}`,
    external: false,
  };
});