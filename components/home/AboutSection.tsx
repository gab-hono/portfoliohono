import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionTitle from "@/components/ui/SectionTitle";
import portrait from "@/assets/images/home/portrait-scanlines.jpg";

// Orden de los párrafos. `as const` hace que TypeScript los vea como
// los textos exactos "p1" | "p2" | "p3", no como cualquier string.
const paragraphs = ["p1", "p2", "p3"] as const;

/*
 * About me + retrato scanlines.
 * Desde lg: texto a la izquierda (alineado con el header) y retrato a la
 * derecha, de borde a borde y en su proporción real. Alterna con Featured,
 * que tiene su retrato a la izquierda. Texto centrado en vertical junto a la foto.
 * Móvil: texto y después el retrato a 2/3 del ancho, pegado al borde derecho:
 * así no se encadenan dos fotos a pantalla completa (la de Featured está justo antes).
 */
export default function AboutSection() {
  const t = useTranslations("Home.about");

  return (
    <section aria-labelledby="about-title" className="grid lg:grid-cols-2 lg:items-center">
      <div className="px-4 py-16 sm:px-8 lg:pr-16">
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
      </div>

      <Image
        src={portrait}
        alt={t("portraitAlt")}
        placeholder="blur"
        sizes="(min-width: 1024px) 50vw, 67vw"
        className="ml-auto h-auto w-2/3 lg:w-full"
      />
    </section>
  );
}