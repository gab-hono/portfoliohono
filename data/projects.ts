import type { StaticImageData } from "next/image";
import type { Discipline } from "./disciplines";

import mapiscine01 from "@/assets/images/dev/mapiscine-01.png";
import mapiscine02 from "@/assets/images/dev/mapiscine-02.png";
import mapiscine03 from "@/assets/images/dev/mapiscine-03.png";
import mapiscine04 from "@/assets/images/dev/mapiscine-04.png";
import cityson01 from "@/assets/images/dev/cityson-01.png";
import cityson02 from "@/assets/images/dev/cityson-02.png";

/*
 * Proyectos del portafolio.
 * Regla: aquí va la estructura (imágenes, links, año, stack).
 * Todo texto visible va en messages/*.json, en Projects.<id>.
 */

export type ProjectImage = {
  src: StaticImageData;
  /** Clave del alt en messages: Projects.<id>.alt.<alt> */
  alt: string;
};

/** Al menos una imagen: la primera es la portada. */
type ProjectImages = readonly [ProjectImage, ...ProjectImage[]];

type BaseProject = {
  id: string;
  /** "2026" o un rango: "2017–2019" */
  year: string;
  images: ProjectImages;
};

export type DevProject = BaseProject & {
  discipline: "dev";
  /** Solo si el proyecto no está terminado */
  status?: "prototype";
  stack: readonly string[];
  links: { site: string; repo: string };
};

export type GalleryProject = BaseProject & {
  discipline: Exclude<Discipline, "dev">;
  /** Obra publicada (YouTube, etc.) */
  link?: string;
};

export type Project = DevProject | GalleryProject;

export const devProjects = [
  {
    id: "mapiscine",
    discipline: "dev",
    year: "2026",
    images: [
      { src: mapiscine01, alt: "logo" },
      { src: mapiscine02, alt: "pool-detail" },
      { src: mapiscine03, alt: "map" },
      { src: mapiscine04, alt: "style-guide" },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL (Neon)",
      "Prisma",
      "Better Auth",
      "Zod",
      "Leaflet",
      "Tailwind CSS",
      "Vitest",
      "GitHub Actions",
      "Vercel",
    ],
    links: {
      site: "https://ma-piscine.vercel.app",
      repo: "https://github.com/gab-hono/MaPiscine",
    },
  },
  {
    id: "cityson",
    discipline: "dev",
    status: "prototype",
    year: "2026",
    images: [
      { src: cityson02, alt: "selected-pin" },
      { src: cityson01, alt: "logo" },
    ],
    stack: [
      "React",
      "React Router",
      "Leaflet",
      "Node.js",
      "Express",
      "PostgreSQL (Neon)",
      "Vercel",
    ],
    links: {
      site: "https://city-son-r7g5.vercel.app",
      repo: "https://github.com/gab-hono/citySon",
    },
  },
] as const satisfies readonly DevProject[];

export type DevProjectId = (typeof devProjects)[number]["id"];