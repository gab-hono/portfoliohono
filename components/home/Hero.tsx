import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Oval from "@/components/ui/Oval";
import { disciplines } from "@/data/disciplines";

const fade = "motion-safe:transition-opacity motion-safe:duration-400";

/*
 * El hero sube bajo el header (margen negativo de una altura de header) y
 * compensa con el mismo padding arriba: así el header transparente de la home
 * deja ver el fondo del hero, sea cual sea (ver StickyHeader.tsx).
 * min-h-dvh: con el header incluido, el hero sigue ocupando una pantalla.
 * data-hero: globals.css le da el tema lima, y el de la disciplina en hover o
 * focus (el header sobre el hero lo copia). bg-theme y no bg-(--background):
 * trae el fundido de color y el gradiente rojo de THEATER, recortado al hero.
 */
export default function Hero() {
  const t = useTranslations("Home");

  return (
    <section
      data-hero
      className="relative mt-[calc(var(--header-height)*-1)] grid min-h-dvh grid-rows-[1fr_auto] gap-8 bg-theme px-4 pt-(--header-height) pb-8 text-foreground sm:gap-12 sm:px-8 sm:pb-16"
    >
      {/* Frase y textos del hover en la misma celda: uno reemplaza al otro.
          En pantallas táctiles los textos del hover no existen en el layout (ver globals.css).
          La frase es más ancha que los textos del hover: 2 líneas en desktop, como la maqueta;
          los textos del hover, más chicos, se leen mejor en líneas más cortas. */}
      <div className="grid items-center">
        <h1 data-hero-intro className={`col-start-1 row-start-1 max-w-6xl text-display ${fade}`}>
          {t("intro")}
        </h1>

        {disciplines.map(({ slug, projects }) => (
          <p
            key={slug}
            id={`hover-${slug}`}
            data-hover-text={slug}
            className="col-start-1 row-start-1 max-w-4xl text-title"
          >
            {t(`disciplines.${slug}.hover`)}
            <span className="mt-4 block">
              {t("mainProjects")} {projects.join(", ")}
            </span>
          </p>
        ))}
      </div>

      <ul className="flex flex-col items-center gap-6 sm:flex-row sm:flex-wrap sm:justify-around sm:gap-10">
        {disciplines.map(({ slug, href }) => (
          <li key={slug}>
            <Link
              href={href}
              data-discipline={slug}
              aria-describedby={`hover-${slug}`}
              className={`group inline-block ${fade}`}
            >
              <Oval discipline={slug} className="px-10 py-4 text-center sm:py-6">
                <span aria-hidden="true" className="font-hand text-title uppercase">
                  {t(`disciplines.${slug}.label`)}
                </span>
                <span className="sr-only">{t(`disciplines.${slug}.srLabel`)}</span>
              </Oval>
            </Link>
          </li>
        ))}
      </ul>

      {/* Marcador para StickyHeader: cuando sale por arriba de la pantalla, el
          borde inferior del hero pasa bajo el header. Absoluto: no ocupa celda
          del grid. */}
      <div
        data-hero-end
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-(--header-height) h-px"
      />
    </section>
  );
}