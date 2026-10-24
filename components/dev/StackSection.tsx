import { useTranslations } from "next-intl";
import { stack } from "@/data/stack";

/*
 * Stack de la página DEV: una lista por categoría.
 * Móvil: tecnologías en línea bajo cada título. Desde lg: 3 columnas.
 * (Se probó una constelación estática el 24 oct: en desktop la lectura era
 * difícil, así que se volvió a la lista.)
 */
export default function StackSection() {
  const t = useTranslations("DevPage.stack");

  return (
    <section id="stack" aria-labelledby="stack-title" className="px-4 py-12 sm:px-8 lg:py-16">
      {/* Título solo para lectores de pantalla: el visible es el del menú lateral (paso 7). */}
      <h2 id="stack-title" className="sr-only">
        {t("title")}
      </h2>

      <div className="grid max-w-5xl gap-8 lg:grid-cols-3 lg:gap-12">
        {stack.map(({ id, items }) => (
          <div key={id}>
            <h3 className="font-hand text-title">{t(`categories.${id}`)}</h3>

            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-small lg:mt-4 lg:flex-col lg:gap-y-2 lg:text-body">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}