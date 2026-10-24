import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Oval from "@/components/ui/Oval";
import { disciplines, type Discipline } from "@/data/disciplines";

type Props = {
  current: Discipline;
};

const MENU_ID = "discipline-menu";

/*
 * Óvalo fijo del header en las páginas de disciplina.
 * Al hacer clic abre un menú nativo (atributo popover): se cierra con Escape
 * o con un clic afuera, sin JavaScript. Como el Header está dentro de cada
 * página, al navegar se vuelve a montar y el menú aparece cerrado.
 *
 * El botón es flex: así mide exactamente lo que mide el óvalo (sin el espacio
 * bajo la línea de base de un elemento en línea). globals.css calcula
 * --discipline-row y --discipline-menu-top con ese alto.
 *
 * Posición del menú (0.5rem bajo el óvalo):
 * - Móvil y tablet: el óvalo es lo último del header → alto del header menos
 *   su padding inferior (1rem en móvil, 2rem desde sm) + 0.5rem.
 *   Cálculo directo en la clase: con una variable intermedia en :root,
 *   Chrome Android no lo resolvía (24 oct).
 * - Desde lg: --discipline-menu-top (ver globals.css).
 *
 * Ojo: la <ul> no lleva clases de display (flex, block): pisarían el
 * display: none del navegador y el menú quedaría siempre abierto.
 * divide-y es seguro: pone bordes en los <li>, no cambia el display de la <ul>.
 */
export default function DisciplineMenu({ current }: Props) {
  const t = useTranslations("Header");
  const tDiscipline = useTranslations("Home.disciplines");

  return (
    <nav aria-label={t("disciplinesMenu")}>
      <button type="button" popoverTarget={MENU_ID} className="flex cursor-pointer">
        <Oval discipline={current} animated={false} className="px-8 py-3 text-center sm:px-10">
          <span aria-hidden="true" className="font-hand text-title uppercase">
            {tDiscipline(`${current}.label`)}
          </span>
          <span className="sr-only">
            {t("switchDiscipline", { current: tDiscipline(`${current}.srLabel`) })}
          </span>
        </Oval>
      </button>

      <ul
        id={MENU_ID}
        popover="auto"
        className="top-[calc(var(--header-height)-0.5rem)] right-auto bottom-auto left-1/2 m-0 -translate-x-1/2 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-(--background) text-foreground sm:top-[calc(var(--header-height)-1.5rem)] lg:top-(--discipline-menu-top)"
      >
        {disciplines.map(({ slug, href }) => (
          <li key={slug}>
            <Link
              href={href}
              aria-current={slug === current ? "page" : undefined}
              className="block whitespace-nowrap px-6 py-3 text-center font-hand text-lead uppercase decoration-2 underline-offset-4 hover:underline aria-[current=page]:underline"
            >
              <span aria-hidden="true">{tDiscipline(`${slug}.label`)}</span>
              <span className="sr-only">{tDiscipline(`${slug}.srLabel`)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}