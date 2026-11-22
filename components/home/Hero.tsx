import { getImageProps } from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Oval from "@/components/ui/Oval";
import { disciplines } from "@/data/disciplines";
import collage from "@/assets/images/home/banner-collage.jpg";
import portrait from "@/assets/images/home/banner-portrait.jpg";

const fade = "motion-safe:transition-opacity motion-safe:duration-400";

/*
 * El hero sube bajo el header (margen negativo de una altura de header) y
 * compensa con el mismo padding arriba: así el header transparente de la home
 * deja ver el fondo del hero, sea cual sea (ver StickyHeader.tsx).
 * Altura: en móvil y tablet, la de su contenido (gap regular): una pantalla
 * completa con poco contenido dejaba huecos y un "falso final" (no se asomaba
 * nada de lo que sigue). Desde lg, min-h-dvh: con el header incluido, el hero
 * ocupa una pantalla y la fila central (1fr) reparte el espacio.
 * data-hero: globals.css le da el tema lima, y el de la disciplina en hover o
 * focus (el header sobre el hero lo copia). bg-theme y no bg-(--background):
 * trae el fundido de color y el gradiente rojo de THEATER, recortado al hero.
 *
 * Banner (art direction con <picture>, etapa 7.7):
 * - Móvil (< sm): retrato en duotono azul/blanco, franja de 150 px dentro de
 *   los márgenes, encuadre object-[40%_45%] (el mismo que el retrato B/N anterior).
 * - Desde sm: collage en duotono (retrato, escena y capturas de MaPiscine y
 *   CitySon), ancho completo (-mx-8 anula el padding lateral del hero), alto
 *   20rem pero nunca más del 30 % de la pantalla (laptops bajas). object-center:
 *   en tablet el collage se recorta por los lados y queda el centro.
 * getImageProps y no <Image>: <Image> no permite dos fuentes según el ancho.
 * Sin placeholder blur (getImageProps no lo admite): el fondo azul del
 * contenedor hace de placeholder y coincide con el tono oscuro del duotono.
 * loading="eager" + fetchPriority="high": es el LCP de la home.
 * El navegador solo descarga la fuente que corresponde a su ancho.
 * Se desvanece con el hover de una disciplina (globals.css, [data-hero-banner]).
 *
 * Disciplinas: en columna hasta lg. En tablet (768 px) las tres no caben en
 * una fila y "Web development" quedaba sola arriba (revisado el 22 nov).
 */
export default function Hero() {
  const t = useTranslations("Home");

  const common = { alt: t("bannerAlt"), sizes: "100vw", fill: true } as const;
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: collage });
  const {
    props: { srcSet: mobileSrcSet, ...img },
  } = getImageProps({ ...common, src: portrait, loading: "eager", fetchPriority: "high" });

  return (
    <section
      data-hero
      className="relative mt-[calc(var(--header-height)*-1)] grid gap-8 lg:min-h-dvh lg:grid-rows-[auto_1fr_auto] bg-theme px-4 pt-(--header-height) pb-8 text-foreground sm:gap-12 sm:px-8 sm:pb-16"
    >
      <div
        data-hero-banner
        className={`relative h-[150px] overflow-hidden rounded-sm bg-(--blue) sm:-mx-8 sm:h-[min(20rem,30svh)] sm:rounded-none ${fade}`}
      >
        <picture>
          <source media="(min-width: 40rem)" srcSet={desktopSrcSet} sizes="100vw" />
          <img
            {...img}
            alt={common.alt}
            srcSet={mobileSrcSet}
            className="object-cover object-[40%_45%] sm:object-center"
          />
        </picture>
      </div>

      {/* Frase y textos del hover en la misma celda: uno reemplaza al otro.
          En pantallas táctiles los textos del hover no existen en el layout (ver globals.css):
          un toque en una disciplina navega directo a su página.
          Sin link dentro del texto del hover: solo existe mientras el mouse está sobre
          el óvalo, así que sería inalcanzable. El óvalo ya es el link. */}
      <div className="grid items-center">
        <h1 data-hero-intro className={`col-start-1 row-start-1 max-w-6xl text-display ${fade}`}>
          {t("intro")}
        </h1>

        {disciplines.map(({ slug }) => (
          <p
            key={slug}
            id={`hover-${slug}`}
            data-hover-text={slug}
            className="col-start-1 row-start-1 max-w-4xl text-title"
          >
            {t(`disciplines.${slug}.hover`)}
          </p>
        ))}
      </div>

      <ul className="flex flex-col items-center gap-2 sm:gap-4 lg:flex-row lg:flex-wrap lg:justify-around lg:gap-10">
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