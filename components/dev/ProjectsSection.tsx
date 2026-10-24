import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionTitle from "@/components/ui/SectionTitle";
import ExternalLink from "@/components/ui/ExternalLink";
import { devProjects } from "@/data/projects";

/*
 * My projects: una fila por proyecto.
 * Desde lg: imagen y texto en 2 columnas, alternando el lado de la imagen
 * (impar = imagen a la derecha). Móvil: imagen arriba, texto abajo.
 * Imagen de borde a borde, en su proporción real (sin recorte).
 * Cada proyecto es un <article> nombrado por su <h3> (aria-labelledby).
 * "Learn more" (pop-up) llega en el paso 6.
 */
export default function ProjectsSection() {
  const t = useTranslations("Projects");
  const tPage = useTranslations("DevPage.projects");

  return (
    <section id="projects" aria-labelledby="projects-title" className="py-12 lg:py-16">
      {/* Título solo para lectores de pantalla: el visible es el del menú lateral (paso 7). */}
      <h2 id="projects-title" className="sr-only">
        {tPage("title")}
      </h2>

      {devProjects.map((project, index) => {
        const { id, images, stack, links } = project;
        const cover = images[0];
        const titleId = `project-${id}`;

        // "in" es un type guard: con as const, MaPiscine no tiene la propiedad
        // status, y project.status sin comprobar daría error de tipos.
        const isPrototype = "status" in project && project.status === "prototype";

        // Conversión de tipo: TypeScript no relaciona el id de un proyecto con
        // los alts de ESE proyecto ("correlated unions") y combina todos con
        // todos (mapiscine.alt.selected-pin…). Costo: un alt mal escrito no
        // rompe el build; el comparador de claves sigue revisando en/fr.
        const coverAlt = t(`${id}.alt.${cover.alt}` as Parameters<typeof t>[0]);

        return (
          <article key={id} aria-labelledby={titleId} className="grid items-center lg:grid-cols-2">
            <Image
              src={cover.src}
              alt={coverAlt}
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
                {/* Paso 6: Learn more (pop-up) */}
              </ul>
            </div>
          </article>
        );
      })}
    </section>
  );
}