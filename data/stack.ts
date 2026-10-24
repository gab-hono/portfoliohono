/*
 * Stack de la página DEV. Los nombres de tecnologías no se traducen.
 * Los títulos de categoría están en messages: DevPage.stack.categories.<id>.
 */
export const stack = [
  {
    id: "development",
    items: [
      "TypeScript / JavaScript",
      "React.js / Next.js",
      "Node.js / Express.js",
      "API REST",
      "PostgreSQL",
      "Neon",
      "Prisma / Drizzle",
      "Zod",
      "Tailwind / CSS",
    ],
  },
  {
    id: "tools",
    items: ["Git & GitHub", "Notion", "Agile / Scrum", "Jest / Vitest"],
  },
  {
    id: "deployment",
    items: ["Vercel", "Netlify"],
  },
] as const;

export type StackCategory = (typeof stack)[number]["id"];