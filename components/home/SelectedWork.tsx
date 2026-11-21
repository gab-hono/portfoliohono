import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ExternalLink from "@/components/ui/ExternalLink";
import SelectionFilter from "@/components/home/SelectionFilter";
import { selectionFilters, type SelectionFilterKey } from "@/data/selectionFilters";
import { selection, offListLinks, type SelectionEntry } from "@/data/selection";
import type { Discipline } from "@/data/disciplines";

/*
 * Selected work de la home (entre Listen y About): lista cronológica de
 * data/selection.ts con filtros All / Code / Theater / Sound.
 *
 * Servidor: encabezado, filas y nota "off this list". Cliente: solo los
 * botones de filtro (SelectionFilter), que ponen data-filter en un ancestro.
 * Cada fila se oculta con el variante in-[...] de Tailwind (ancestro con ese
 * data-filter). Clases escritas completas en hiddenWhen: Tailwind solo genera
 * las clases que encuentra literalmente en el código.
 *
 * Filas:
 * - Interna: Link (añade el locale, /fr/dev?project=…) que abre el pop-up del
 *   proyecto en su página (ver Dialog.tsx). Flecha →.
 * - Externa: <a> en pestaña nueva, flecha ↗ y aviso para lectores de pantalla.
 * - Móvil: año arriba, luego etiqueta + título, luego rol · contexto; flecha a
 *   la derecha. Desde sm: año en su columna (grid de 3 columnas).
 * - Hover y foco: título subrayado (como el resto del sitio).
 */

const hiddenWhen: Record<Discipline, string> = {
  dev: "in-[[data-filter=theater]]:hidden in-[[data-filter=sound]]:hidden",
  theater: "in-[[data-filter=dev]]:hidden in-[[data-filter=sound]]:hidden",
  sound: "in-[[data-filter=dev]]:hidden in-[[data-filter=theater]]:hidden",
};

const tagColors: Record<Discipline, string> = {
  dev: "bg-(--blue) text-(--cream)",
  theater: "bg-(--red-dark) text-(--cream)",
  sound: "bg-(--black) text-(--white)",
};

export default function SelectedWork() {
  const t = useTranslations("Home.selection");

  const labels = Object.fromEntries(selectionFilters.map((key) => [key, t(`disciplines.${key}`)])) as Record<
    SelectionFilterKey,
    string
  >;

  const results = Object.fromEntries(
    selectionFilters.map((key) => [
      key,
      t("results", { count: key === "all" ? selection.length : selection.filter((e) => e.discipline === key).length }),
    ]),
  ) as Record<SelectionFilterKey, string>;

  return (
    <section id="work" aria-labelledby="work-title" className="px-4 py-16 sm:px-8 lg:py-20">
      <SelectionFilter
        groupLabel={t("filtersLabel")}
        labels={labels}
        results={results}
        heading={
          <div className="flex flex-col gap-2">
            <p className="text-small font-bold tracking-[0.12em] uppercase">{t("eyebrow")}</p>
            <h2 id="work-title" className="text-display font-extrabold tracking-tight">
              {t("title")}
            </h2>
          </div>
        }
      >
        <ul>
          {selection.map((entry) => (
            <li key={entry.id} className={`border-b border-line ${hiddenWhen[entry.discipline]}`}>
              <Row entry={entry} />
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-prose text-small">
          {t.rich("offList", {
            film: (chunks) => (
              <ExternalLink href={offListLinks.film}>
                <cite>{chunks}</cite>
              </ExternalLink>
            ),
            fanzine: (chunks) => <ExternalLink href={offListLinks.fanzine}>{chunks}</ExternalLink>,
          })}
        </p>
      </SelectionFilter>
    </section>
  );
}

const rowClass =
  "group grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 py-5 sm:grid-cols-[7rem_1fr_auto] sm:gap-x-6";

function Row({ entry }: { entry: SelectionEntry }) {
  const t = useTranslations("Home.selection");
  const tLink = useTranslations("ExternalLink");
  const { id, discipline, year, href, external } = entry;

  const content = (
    <>
      <span className="col-start-1 row-start-1 font-mono text-small">{year}</span>

      <span className="col-start-1 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 sm:col-start-2 sm:row-start-1">
        <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span
            className={`rounded-full px-2.5 py-1 text-[0.6875rem] leading-none font-bold tracking-[0.08em] uppercase ${tagColors[discipline]}`}
          >
            {t(`disciplines.${discipline}`)}
          </span>
          <span className="text-lead font-extrabold decoration-2 underline-offset-4 group-hover:underline group-focus-visible:underline">
            {t(`rows.${id}.title`)}
          </span>
        </span>
        <span className="text-small sm:text-body">
          {t(`rows.${id}.role`)} · {t(`rows.${id}.context`)}
        </span>
      </span>

      <span
        aria-hidden="true"
        className="col-start-2 row-span-2 row-start-1 text-lead sm:col-start-3 sm:row-span-1"
      >
        {external ? "↗︎" : "→︎"}
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={rowClass}>
        {content}
        <span className="sr-only"> {tLink("newTab")}</span>
      </a>
    );
  }

  return (
    <Link href={href} className={rowClass}>
      {content}
    </Link>
  );
}