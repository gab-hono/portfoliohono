import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionTitle from "@/components/ui/SectionTitle";
import Dialog from "@/components/ui/Dialog";
import type { GalleryProject, GalleryProjectId } from "@/data/projects";

type GalleryItem = GalleryProject & { id: GalleryProjectId };

type Props = {
  projects: readonly GalleryItem[];
  /** Textos de la interfaz, desde el namespace de cada página (TheaterPage, SoundPage). */
  labels: {
    title: string;
    learnMore: string;
    credits: string;
    close: string;
  };
};

/*
 * Galería de THEATER y SOUND.
 * "Repartida" con una grilla de 12 columnas (anchos y desplazamientos
 * distintos), no con posiciones absolutas: nada se superpone y el orden de
 * lectura es claro (lección de la constelación). Móvil: una columna.
 *
 * Cada tarjeta es el botón que abre el pop-up (Dialog).
 * Preview: con hover (o foco de teclado), el texto aparece sobre la imagen.
 * En pantallas táctiles (hover: none) va siempre visible, debajo.
 * La imagen de la tarjeta lleva alt="": el nombre del botón lo da el texto.
 * Los alts se leen en el pop-up, donde están todas las fotos.
 *
 * translatedTitle y credits valen "" cuando no aplican: esa línea no se muestra.
 */

/** Ancho y desplazamiento de cada tarjeta desde lg (se repite si hay más de 6). */
const PLACEMENT = [
  "lg:col-span-5 lg:col-start-2",
  "lg:col-span-4 lg:col-start-8 lg:mt-24",
  "lg:col-span-4 lg:col-start-1 lg:mt-8",
  "lg:col-span-3 lg:col-start-6 lg:mt-32",
  "lg:col-span-4 lg:col-start-9",
  "lg:col-span-5 lg:col-start-3 lg:mt-12",
];

/** Texto sobre la imagen solo en dispositivos con hover; en táctil, debajo y siempre visible. */
const previewClasses = [
  "mt-3 flex flex-col gap-1",
  "[@media(hover:hover)]:absolute [@media(hover:hover)]:inset-0 [@media(hover:hover)]:mt-0",
  "[@media(hover:hover)]:justify-end [@media(hover:hover)]:bg-background/85 [@media(hover:hover)]:p-4",
  "[@media(hover:hover)]:opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
  "motion-safe:transition-opacity motion-safe:duration-300",
].join(" ");

export default function Gallery({ projects, labels }: Props) {
  const t = useTranslations("Projects");

  return (
    <section id="projects" aria-labelledby="projects-title" className="px-4 py-12 sm:px-8 lg:py-16">
      <SectionTitle id="projects-title" className="mb-8 uppercase lg:sr-only">
        {labels.title}
      </SectionTitle>

      <ul className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-x-8 lg:gap-y-16">
        {projects.map((project, index) => {
          const { id, year, images } = project;
          const cover = images[0];
          const dialogTitleId = `dialog-${id}`;

          // Conversión de tipo: ver ProjectsSection (correlated unions).
          const altOf = (alt: string) => t(`${id}.alt.${alt}` as Parameters<typeof t>[0]);

          const translatedTitle = t.raw(`${id}.translatedTitle`) as string;
          const hasCredits = (t.raw(`${id}.credits`) as string) !== "";

          return (
            <li key={id} className={PLACEMENT[index % PLACEMENT.length]}>
              <Dialog
                trigger={
                  <>
                    <Image
                      src={cover.src}
                      alt=""
                      placeholder="blur"
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="h-auto w-full"
                    />
                    <span className={previewClasses}>
                      <span className="font-hand text-title">{t(`${id}.title`)}</span>
                      <span className="text-small">
                        {t(`${id}.role`)} · {year}
                      </span>
                      <span className="text-small">{t(`${id}.hover`)}</span>
                      <span aria-hidden="true" className="text-small underline underline-offset-4">
                        {labels.learnMore}
                      </span>
                    </span>
                  </>
                }
                triggerClassName="group relative block w-full text-left"
                closeLabel={labels.close}
                titleId={dialogTitleId}
              >
                <div className="flex flex-col gap-1">
                  <SectionTitle id={dialogTitleId}>{t(`${id}.title`)}</SectionTitle>
                  {translatedTitle && <p className="italic">{translatedTitle}</p>}
                </div>

                {/* Fila de fotos con scroll horizontal. tabIndex: recorrible con las flechas del teclado. */}
                <ul tabIndex={0} className="flex snap-x gap-4 overflow-x-auto pb-2">
                  {images.map((image) => (
                    <li key={image.alt} className="shrink-0 snap-start">
                      <Image
                        src={image.src}
                        alt={altOf(image.alt)}
                        sizes="40rem"
                        className="h-64 w-auto sm:h-80"
                      />
                    </li>
                  ))}
                </ul>

                <p className="text-small">
                  {t(`${id}.role`)} · {year} · {t(`${id}.place`)}
                </p>

                <p className="max-w-prose text-body">
                  {t.rich(`${id}.popup`, {
                    strong: (chunks) => <strong>{chunks}</strong>,
                    cite: (chunks) => <cite>{chunks}</cite>,
                  })}
                </p>

                {hasCredits && (
                  <p className="max-w-prose text-small">
                    <strong>{labels.credits}</strong>{" "}
                    {t.rich(`${id}.credits`, { cite: (chunks) => <cite>{chunks}</cite> })}
                  </p>
                )}
              </Dialog>
            </li>
          );
        })}
      </ul>
    </section>
  );
}