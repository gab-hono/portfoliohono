import { useTranslations } from "next-intl";
import type { Discipline } from "@/data/disciplines";

type Props = {
  discipline: Discipline;
};

/*
 * Frase de la disciplina al inicio de su página: es el <h1>.
 * Mismo texto y tamaño que el hover de la home (Home.disciplines.<d>.hover):
 * en móvil no hay hover, así que aquí se lee por primera vez (decisión del 22 oct).
 * Lo usan DEV, THEATER y SOUND.
 */
export default function DisciplineIntro({ discipline }: Props) {
  const t = useTranslations("Home.disciplines");

  return (
    <div className="px-4 pt-12 sm:px-8 lg:pt-16">
      <h1 className="max-w-4xl text-title">{t(`${discipline}.hover`)}</h1>
    </div>
  );
}