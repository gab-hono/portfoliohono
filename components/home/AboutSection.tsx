import { useTranslations } from "next-intl";
import SectionTitle from "@/components/ui/SectionTitle";

// Orden de los párrafos. `as const` hace que TypeScript los vea como
// los textos exactos "p1" | "p2" | "p3", no como cualquier string.
const paragraphs = ["p1", "p2", "p3"] as const;

export default function AboutSection() {
  const t = useTranslations("Home.about");

  return (
    <section aria-labelledby="about-title" className="px-4 py-16 sm:px-8">
      <SectionTitle id="about-title" className="uppercase">
        {t("title")}
      </SectionTitle>
      <div className="mt-8 flex max-w-prose flex-col gap-6 text-body">
        {paragraphs.map((key) => (
          // t.rich convierte las etiquetas <strong> del JSON en elementos React.
          // Con t() normal, las etiquetas saldrían como texto.
          <p key={key}>
            {t.rich(key, {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
        ))}
      </div>
    </section>
  );
}