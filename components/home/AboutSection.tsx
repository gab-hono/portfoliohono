import Image from "next/image";
import { useTranslations } from "next-intl";
import portrait from "@/assets/images/home/portrait-halftone.jpg";

// Orden de los párrafos. `as const` hace que TypeScript los vea como
// los textos exactos "p1" | "p2" | "p3", no como cualquier string.
const paragraphs = ["p1", "p2", "p3"] as const;

/*
 * About me + retrato halftone (maqueta "Mezcla · Home").
 * Desde lg: retrato a la izquierda (5/12) y texto a la derecha (7/12),
 * centrados en vertical. El retrato queda dentro de los márgenes, con
 * esquinas redondeadas (ya no va de borde a borde: sin las fotos de
 * Featured, no hay nada con qué alternar).
 * Móvil y tablet: retrato arriba, a 2/3 del ancho (1/2 desde sm), y el texto
 * debajo.
 * La foto mide 735 px de ancho: nunca se muestra más grande que eso
 * (max-w en móvil/tablet, la columna de 5/12 en escritorio). Una trama de
 * puntos agrandada se ve borrosa; reducida, puede dar moiré: revisar a
 * distintos anchos.
 * id="about": destino del link "About" de la nav de la home.
 * Título en sans extrabold, como Selected work y Contact (decidido 22 nov):
 * la manuscrita (SectionTitle) queda para las páginas de disciplina.
 */
export default function AboutSection() {
  const t = useTranslations("Home.about");

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="grid gap-8 px-4 py-16 sm:px-8 sm:py-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16"
    >
      <Image
        src={portrait}
        alt={t("portraitAlt")}
        placeholder="blur"
        sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 67vw"
        className="h-auto w-2/3 max-w-[735px] rounded-2xl sm:w-1/2 lg:w-full"
      />

      <div>
        <h2 id="about-title" className="font-display text-display">
          {t("title")}
        </h2>
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
    </section>
  );
}