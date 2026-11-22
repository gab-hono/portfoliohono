"use client";

import { useState, type ReactNode } from "react";
import { selectionFilters, type SelectionFilterKey } from "@/data/selectionFilters";

type SelectionFilterProps = {
  /** Antetítulo + h2 (servidor). */
  heading: ReactNode;
  groupLabel: string;
  labels: Record<SelectionFilterKey, string>;
  /** Texto para lectores de pantalla tras filtrar ("4 projects"), por filtro. */
  results: Record<SelectionFilterKey, string>;
  /** Lista de filas + nota "off this list" (servidor). */
  children: ReactNode;
};

/*
 * Filtros de Selected work: el único estado es el filtro activo, que se
 * escribe en data-filter. Las filas (servidor, ver SelectedWork.tsx) se
 * ocultan solas por CSS según ese atributo: el contenido de la lista no
 * viaja al cliente, y sin JavaScript se ven todas.
 * Botones con aria-pressed (botones de alternancia: uno activo a la vez).
 * Región aria-live: tras un clic, anuncia cuántos proyectos quedan.
 * Vacía al cargar, para no anunciar nada sin acción del visitante.
 * Filtros bajo el título hasta lg: en tablet, compartiendo la fila, el
 * título se partía en dos líneas.
 */
export default function SelectionFilter({ heading, groupLabel, labels, results, children }: SelectionFilterProps) {
  const [active, setActive] = useState<SelectionFilterKey>("all");
  const [announce, setAnnounce] = useState("");

  function pick(key: SelectionFilterKey) {
    setActive(key);
    setAnnounce(results[key]);
  }

  return (
    <div data-filter={active}>
      <div className="flex flex-col gap-6 border-b-3 border-foreground pb-5 lg:flex-row lg:items-end lg:justify-between">
        {heading}

        <div role="group" aria-label={groupLabel} className="flex gap-2 sm:gap-2.5">
          {selectionFilters.map((key) => {
            const on = active === key;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={on}
                onClick={() => pick(key)}
                className={`min-h-11 flex-1 cursor-pointer rounded-full border-[1.5px] border-foreground px-4 text-small font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground sm:flex-none sm:px-5 ${
                  on ? "bg-foreground text-background" : "hover:bg-foreground/10"
                }`}
              >
                {labels[key]}
              </button>
            );
          })}
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {announce}
      </p>

      {children}
    </div>
  );
}