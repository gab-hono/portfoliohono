import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SectionTitle from "@/components/ui/SectionTitle";
import { featuredProjects } from "@/data/featured";
import portrait from "@/assets/images/home/portrait-halftone.jpg";

/*
 * Featured projects de la home (entre el Hero y el About).
 * Desde lg: retrato halftone a la izquierda (borde a borde, proporción real)
 * y título + lista a la derecha. Móvil: título y lista primero, retrato
 * después (a pantalla completa, taparía los proyectos justo tras el hero).
 * Por eso el texto va primero en el DOM y pasa a la derecha con lg:order-last.
 *
 * Cada fila es un link a la sección de proyectos de su disciplina
 * (/dev#projects, /theater#projects). Nombre accesible = título + categoría.
 * Miniatura con alt="" (el texto ya nombra el proyecto) y en un formato fijo
 * 4:3 con object-cover: las portadas tienen proporciones distintas y las
 * filas quedan alineadas. Flecha decorativa (aria-hidden; \uFE0E evita el
 * emoji de color en iOS).
 * Hover y foco: título subrayado, sin animaciones nuevas.
 */
export default function FeaturedSection() {
  const t = useTranslations("Home.featured");
  const tProjects = useTranslations("Projects");

  return (
    <section aria-labelledby="featured-title" className="grid lg:grid-cols-2">
      <div className="flex flex-col gap-8 px-4 py-12 sm:px-8 lg:order-last lg:px-16 lg:py-16">
        <SectionTitle id="featured-title" className="uppercase">
          {t("title")}
        </SectionTitle>

        <ul className="divide-y divide-line border-y border-line">
          {featuredProjects.map(({ id, category, discipline, cover }) => (
            <li key={id}>
              <Link href={`/${discipline}#projects`} className="group flex items-center gap-4 py-4 sm:gap-6">
                <Image
                  src={cover}
                  alt=""
                  placeholder="blur"
                  sizes="(min-width: 640px) 8rem, 6rem"
                  className="aspect-[4/3] h-auto w-24 shrink-0 object-cover sm:w-32"
                />
                <span className="flex flex-1 flex-col gap-1">
                  <span className="font-hand text-title decoration-1 underline-offset-4 group-hover:underline group-focus-visible:underline">
                    {tProjects(`${id}.title`)}
                  </span>
                  <span className="text-small">{t(`categories.${category}`)}</span>
                </span>
                <span aria-hidden="true" className="text-title">
                  {"\u2192\uFE0E"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Image
        src={portrait}
        alt={t("portraitAlt")}
        placeholder="blur"
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="h-auto w-full"
      />
    </section>
  );
}