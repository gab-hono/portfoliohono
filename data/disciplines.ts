export type Discipline = "dev" | "theater" | "sound";

type DisciplineData = {
  slug: Discipline;
  href: `/${Discipline}`;
};

export const disciplines: DisciplineData[] = [
  { slug: "dev", href: "/dev" },
  { slug: "theater", href: "/theater" },
  { slug: "sound", href: "/sound" },
];