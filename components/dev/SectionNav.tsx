import { useTranslations } from "next-intl";

/*
 * Menú lateral de la página DEV (solo desde lg; en móvil los títulos de
 * sección son visibles). Links normales a #stack / #journey / #projects:
 * scroll suave desde el CSS (respeta reduced motion), scroll-padding-top
 * evita que el header tape la sección. Sin JavaScript.
 * La <ul> es sticky dentro del <nav>, que se estira al alto de su fila
 * (intro + stack + journey): al llegar a los proyectos, el menú se va.
 * v1.1 posible: resaltar la sección visible (necesita IntersectionObserver).
 */
const SECTIONS = ["stack", "journey", "projects"] as const;

export default function SectionNav() {
  const t = useTranslations("DevPage");

  return (
    <nav aria-label={t("sectionsNav")} className="hidden border-r border-line lg:block">
      <ul className="sticky top-(--header-height) flex flex-col gap-4 px-8 py-16 text-lead">
        {SECTIONS.map((section) => (
          <li key={section}>
            <a
              href={`#${section}`}
              className="block decoration-1 underline-offset-4 first-letter:uppercase hover:underline"
            >
              {t(`${section}.title`)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}