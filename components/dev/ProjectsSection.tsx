import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionTitle from "@/components/ui/SectionTitle";
import ExternalLink from "@/components/ui/ExternalLink";
import Dialog from "@/components/ui/Dialog";
import { devProjects } from "@/data/projects";

/*
 * My projects: una fila por proyecto.
 * Desde lg: imagen y texto en 2 columnas, alternando el lado de la imagen
 * (impar = imagen a la derecha). Móvil: imagen arriba, texto abajo.
 * Imagen de borde a borde, en su proporción real (sin recorte).
 * Cada proyecto es un <article> nombrado por su <h3> (aria-labelledby).
 * "Learn more" abre un pop-up (Dialog) con las imágenes y las 4 secciones.
 * Título visible en móvil; desde lg solo para lectores de pantalla.
 */

const SECTIONS = ["s1", "s2", "s3", "s4"] as const;

/** Mismo estilo que ExternalLink: "Learn more" es un botón, pero se ve como los links de su fila. */
const linkLikeClasses = "underline decoration-1 underline-offset-4 hover:decoration-2";

export default function ProjectsSection() {
  const t = useTranslations("Projects");
  const tPage = useTranslations("DevPage.projects");

  return (
    <section id="projects" aria-labelledby="projects-title" className="py-12 lg:py-16">
      {/* La sección no tiene padding lateral (imágenes de borde a borde): el título lo lleva aparte. */}
      <div className="mb-8 px-4 sm:px-8 lg:sr-only">
        <SectionTitle id="projects-title" className="uppercase">
          {tPage("title")}
        </SectionTitle>
      </div>

      {devProjects.map((project, index) => {
        const { id, images, stack, links } = project;
        const cover = images[0];
        const titleId = `project-${id}`;
        const dialogTitleId = `dialog-${id}`;

        // "in" es un type guard: con as const, MaPiscine no tiene la propiedad
        // status, y project.status sin comprobar daría error de tipos.
        const isPrototype = "status" in project && project.status === "prototype";

        // Conversión de tipo: TypeScript no relaciona el id de un proyecto con
        // los alts de ESE proyecto ("correlated unions") y combina todos con
        // todos (mapiscine.alt.selected-pin…). Costo: un alt mal escrito no
        // rompe el build; el comparador de claves sigue revisando en/fr.
        const altOf = (alt: string) => t(`${id}.alt.${alt}` as Parameters<typeof t>[0]);

        return (
          <article key={id} aria-labelledby={titleId} className="grid items-center lg:grid-cols-2">
            <Image
              src={cover.src}
              alt={altOf(cover.alt)}
              placeholder="blur"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={`h-auto w-full ${index % 2 === 1 ? "lg:order-last" : ""}`}
            />

            <div className="flex flex-col gap-6 px-4 py-12 sm:px-8 lg:px-16">
              <div className="flex flex-wrap items-center gap-4">
                <SectionTitle as="h3" id={titleId}>
                  {t(`${id}.title`)}
                </SectionTitle>
                {isPrototype && (
                  <span className="rounded-full border border-line px-3 py-1 text-small">
                    {t("labels.prototype")}
                  </span>
                )}
              </div>

              <p className="max-w-prose text-body">{t(`${id}.description`)}</p>

              {/* <dl>: pares "nombre → valor" (Rol → …, Stack → …). */}
              <dl className="grid max-w-prose grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-small">
                <dt>{tPage("role")}</dt>
                <dd>{t(`${id}.role`)}</dd>
                <dt>{tPage("stack")}</dt>
                <dd>{stack.join(", ")}</dd>
              </dl>

              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-body">
                <li>
                  <ExternalLink href={links.site}>{tPage("site")}</ExternalLink>
                </li>
                <li>
                  <ExternalLink href={links.repo}>{tPage("repo")}</ExternalLink>
                </li>
                <li>
                  <Dialog
                    trigger={tPage("learnMore")}
                    triggerClassName={linkLikeClasses}
                    closeLabel={tPage("close")}
                    titleId={dialogTitleId}
                  >
                    <SectionTitle id={dialogTitleId}>{t(`${id}.title`)}</SectionTitle>

                    {/* Fila de imágenes con scroll horizontal. tabIndex: recorrible con las flechas del teclado. */}
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

                    <div className="flex max-w-prose flex-col gap-4 text-body">
                      {SECTIONS.map((section) => (
                        <p key={section}>
                          <strong>{t(`${id}.learnMore.${section}.title`)}</strong>{" "}
                          {t.rich(`${id}.learnMore.${section}.body`, {
                            cite: (chunks) => <cite>{chunks}</cite>,
                          })}
                        </p>
                      ))}
                    </div>
                  </Dialog>
                </li>
              </ul>
            </div>
          </article>
        );
      })}
    </section>
  );
}