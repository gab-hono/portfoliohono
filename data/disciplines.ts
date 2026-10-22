export type Discipline = "dev" | "theater" | "sound";

type DisciplineData = {
  slug: Discipline;
  href: `/${Discipline}`;
  projects: string[];
};

export const disciplines: DisciplineData[] = [
  { slug: "dev", href: "/dev", projects: ["MaPiscine", "CitySon"] },
  {
    slug: "theater",
    href: "/theater",
    projects: [
      "Animales binarios",
      "Caminamos mirando al cielo",
      "Festival de dramaturgia Interescuelas Juan Radrigán",
    ],
  },
  { slug: "sound", href: "/sound", projects: ["Contre-récits", "La Méthode"] },
];