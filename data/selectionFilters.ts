/*
 * Filtros de Selected work: All + las tres disciplinas.
 * Archivo propio (no en SelectionFilter.tsx): un componente servidor
 * (SelectedWork) no puede importar valores de un archivo "use client";
 * solo recibe una referencia de componente, no el array.
 * Tampoco en selection.ts: ese archivo importa projects.ts (imágenes) y
 * SelectionFilter, que es cliente, lo arrastraría al navegador.
 */
export const selectionFilters = ["all", "dev", "theater", "sound"] as const;

export type SelectionFilterKey = (typeof selectionFilters)[number];