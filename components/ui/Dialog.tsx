"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";

type Props = {
  /** Contenido del botón que abre el pop-up (texto o imagen). */
  trigger: ReactNode;
  triggerClassName?: string;
  /** Texto para lectores de pantalla del botón de cierre (visible: ✕). */
  closeLabel: string;
  /** id del título dentro del contenido: da nombre al pop-up. */
  titleId: string;
  /** id del proyecto: con ?project=<deepLinkId> en la URL, el pop-up se abre al cargar. */
  deepLinkId: string;
  children: ReactNode;
};

/** Parámetro de la URL que abre un pop-up al cargar (links de la home). */
const DEEP_LINK_PARAM = "project";

/*
 * Pop-up con <dialog> nativo + showModal():
 * - Escape lo cierra (nativo).
 * - El foco entra al abrir y vuelve al botón al cerrar (nativo).
 * - El resto de la página queda inerte.
 * Clic afuera: el clic en el fondo (::backdrop) llega al propio <dialog>.
 * Por eso el <dialog> no tiene padding: el contenido va en un div interior,
 * y un clic dentro del contenido nunca tiene como destino el <dialog>.
 * Componente de cliente solo por showModal(); el contenido (children)
 * se arma en el servidor.
 * Lo usan los proyectos DEV y las galerías THEATER y SOUND.
 *
 * Deep link (?project=<id>):
 * - Se lee window.location en un efecto, no useSearchParams(): así las
 *   páginas siguen siendo estáticas (useSearchParams obligaría a un
 *   <Suspense> y a renderizar esa parte en el cliente).
 * - Antes de abrir se enfoca el botón: la página baja hasta el proyecto,
 *   y al cerrar el foco vuelve ahí (sin esto volvería a <body>, arriba).
 * - Al cerrar se quita el parámetro de la URL (replaceState: no crea una
 *   entrada en el historial). Recargar ya no reabre el pop-up.
 * - Un id que no existe no abre nada: la página se ve normal.
 */
export default function Dialog({ trigger, triggerClassName = "", closeLabel, titleId, deepLinkId, children }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const params = new URLSearchParams(window.location.search);
    if (params.get(DEEP_LINK_PARAM) !== deepLinkId) return;

    function removeParam() {
      const url = new URL(window.location.href);
      url.searchParams.delete(DEEP_LINK_PARAM);
      window.history.replaceState(window.history.state, "", url);
    }

    dialog.addEventListener("close", removeParam, { once: true });
    // open: en desarrollo, React ejecuta el efecto dos veces (Strict Mode).
    if (!dialog.open) {
      triggerRef.current?.focus();
      dialog.showModal();
    }

    return () => dialog.removeEventListener("close", removeParam);
  }, [deepLinkId]);

  function handleDialogClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) event.currentTarget.close();
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className={`cursor-pointer ${triggerClassName}`}
      >
        {trigger}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={handleDialogClick}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[min(56rem,calc(100%-2rem))] max-w-none overflow-y-auto rounded-2xl border border-line bg-(--background) p-0 text-foreground backdrop:bg-black/60"
      >
        <div className="flex flex-col gap-6 p-6 sm:p-10">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="cursor-pointer self-end text-title leading-none"
          >
            <span aria-hidden="true">✕</span>
            <span className="sr-only">{closeLabel}</span>
          </button>
          {children}
        </div>
      </dialog>
    </>
  );
}