import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Oval from "@/components/ui/Oval";
import { disciplines } from "@/data/disciplines";

const fade = "motion-safe:transition-opacity motion-safe:duration-400";

export default function Hero() {
  const t = useTranslations("Home");

  return (
    <section className="grid min-h-[calc(100dvh_-_var(--header-height))] grid-rows-[1fr_auto] gap-12 px-4 pb-12 sm:px-8 sm:pb-16">
      {/* Frase y textos del hover en la misma celda: uno reemplaza al otro. */}
      <div className="grid items-center">
        <h1 data-hero-intro className={`col-start-1 row-start-1 max-w-4xl text-display ${fade}`}>
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

      <ul className="flex flex-col items-center gap-10 sm:flex-row sm:flex-wrap sm:justify-around">
        {disciplines.map(({ slug, href }) => (
          <li key={slug}>
            <Link
              href={href}
              data-discipline={slug}
              aria-describedby={`hover-${slug}`}
              className={`group inline-block ${fade}`}
            >
              <Oval discipline={slug} className="px-10 py-6 text-center">
                <span aria-hidden="true" className="font-hand text-title uppercase">
                  {t(`disciplines.${slug}.label`)}
                </span>
                <span className="sr-only">{t(`disciplines.${slug}.srLabel`)}</span>
              </Oval>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}