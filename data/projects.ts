import type { StaticImageData } from "next/image";
import type { Discipline } from "./disciplines";

import mapiscine01 from "@/assets/images/dev/mapiscine-01.png";
import mapiscine02 from "@/assets/images/dev/mapiscine-02.png";
import mapiscine03 from "@/assets/images/dev/mapiscine-03.png";
import mapiscine04 from "@/assets/images/dev/mapiscine-04.png";
import cityson01 from "@/assets/images/dev/cityson-01.png";
import cityson02 from "@/assets/images/dev/cityson-02.png";

import caminamos01 from "@/assets/images/theater/caminamos-01.jpg";
import caminamos02 from "@/assets/images/theater/caminamos-02.jpg";
import caminamos03 from "@/assets/images/theater/caminamos-03.jpg";
import animales01 from "@/assets/images/theater/animales-binarios-01.jpg";
import animales02 from "@/assets/images/theater/animales-binarios-02.jpg";
import animales03 from "@/assets/images/theater/animales-binarios-03.jpg";
import todo01 from "@/assets/images/theater/todo-bajo-control-01.jpg";
import todo02 from "@/assets/images/theater/todo-bajo-control-02.jpg";
import todo03 from "@/assets/images/theater/todo-bajo-control-03.jpg";
import pero01 from "@/assets/images/theater/pero-y-mi-madre-01.jpg";
import festival01 from "@/assets/images/theater/festival-juan-radrigan-01.png";
import festival02 from "@/assets/images/theater/festival-juan-radrigan-02.jpg";
import festival03 from "@/assets/images/theater/festival-juan-radrigan-03.jpg";
import onStage01 from "@/assets/images/theater/on-stage-01.jpg";
import onStage02 from "@/assets/images/theater/on-stage-02.jpg";
import onStage03 from "@/assets/images/theater/on-stage-03.jpg";
import onStage04 from "@/assets/images/theater/on-stage-04.jpg";

/*
 * Proyectos del portafolio.
 * Regla: aquí va la estructura (imágenes, links, año, stack).
 * Todo texto visible va en messages/*.json, en Projects.<id>.
 * Proyectos de galería (THEATER, SOUND): todos tienen las mismas claves en
 * messages (title, translatedTitle, role, place, hover, popup, credits, alt);
 * "" cuando no aplica. Así TypeScript verifica cada clave para todos.
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

/** Orden de la galería THEATER (Ficha 2). */
export const theaterProjects = [
  {
    id: "caminamos",
    discipline: "theater",
    year: "2020–2022",
    images: [
      { src: caminamos01, alt: "poster" },
      { src: caminamos02, alt: "escalator" },
      { src: caminamos03, alt: "street" },
    ],
  },
  {
    id: "animales-binarios",
    discipline: "theater",
    year: "2017–2018",
    images: [
      { src: animales01, alt: "mask" },
      { src: animales02, alt: "bed" },
      { src: animales03, alt: "curtain" },
    ],
  },
  {
    id: "todo-bajo-control",
    discipline: "theater",
    year: "2017–2019",
    images: [
      { src: todo01, alt: "legs" },
      { src: todo02, alt: "cigarette" },
      { src: todo03, alt: "manager" },
    ],
  },
  {
    id: "pero-y-mi-madre",
    discipline: "theater",
    year: "2018",
    images: [{ src: pero01, alt: "deer" }],
  },
  {
    id: "festival-juan-radrigan",
    discipline: "theater",
    year: "2015–2018",
    images: [
      { src: festival01, alt: "logo" },
      { src: festival02, alt: "toast" },
      { src: festival03, alt: "team" },
    ],
  },
  {
    id: "on-stage",
    discipline: "theater",
    year: "2015–2017",
    images: [
      { src: onStage01, alt: "six-characters" },
      { src: onStage02, alt: "platonov" },
      { src: onStage03, alt: "locutorio" },
      { src: onStage04, alt: "signorina-giulia" },
    ],
  },
] as const satisfies readonly GalleryProject[];

export type TheaterProjectId = (typeof theaterProjects)[number]["id"];

/** Ids de todos los proyectos de galería (SOUND se suma en su paso). */
export type GalleryProjectId = TheaterProjectId;