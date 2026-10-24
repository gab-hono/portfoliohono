import { useTranslations } from "next-intl";
import { Logo } from "@/components/ui/Logo";
import { HashLink } from "@/components/ui/HashLink";
import { pillClasses } from "@/components/ui/PillLink";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import DisciplineMenu from "@/components/layout/DisciplineMenu";
import type { Discipline } from "@/data/disciplines";

type Props = {
  /** Solo en las páginas de disciplina: muestra el óvalo con el menú en el centro. */
  discipline?: Discipline;
};

/*
 * Grid y no flex con justify-between: con 3 elementos, justify-between deja el
 * óvalo a medio camino entre el logo y Contact; 1fr / auto / 1fr lo centra en
 * la pantalla.
 * Una sola fila desde lg (1024 px): por debajo, logo + óvalo + Contact + idioma
 * no caben, y el óvalo baja a una segunda fila. Si cambias ese breakpoint,
 * cambia también --discipline-row en globals.css.
 * Contact y el selector tienen columna explícita: sin óvalo (home), si no,
 * caerían en la columna central.
 * data-has-discipline: globals.css lo usa para corregir --header-height
 * cuando hay segunda fila.
 * Pantallas de menos de 30rem (480 px) de alto (teléfono en horizontal):
 * el header deja de ser fijo; si no, ocupaba ~70 % de la pantalla.
 */
export default function Header({ discipline }: Props) {
  const t = useTranslations("Header");

  return (
    <header
      data-has-discipline={discipline ? "" : undefined}
      className="sticky top-0 z-10 grid grid-cols-[1fr_auto] items-start gap-4 bg-(--background) p-4 motion-safe:transition-colors motion-safe:duration-400 sm:p-8 lg:grid-cols-[1fr_auto_1fr] [@media(height<30rem)]:static"
    >
      {/* justify-self-start: sin esto, la celda estira el logo y queda centrado en su columna. */}
      <div className="justify-self-start">
        <Logo />
      </div>

      {discipline && (
        <div className="col-span-2 row-start-2 justify-self-center lg:col-span-1 lg:col-start-2 lg:row-start-1">
          <DisciplineMenu current={discipline} />
        </div>
      )}

      <div className="col-start-2 row-start-1 flex items-center gap-4 justify-self-end sm:gap-6 lg:col-start-3">
        <HashLink hash="contact" className={pillClasses}>
          {t("contact")}
        </HashLink>
        <LanguageSwitcher />
      </div>
    </header>
  );
}