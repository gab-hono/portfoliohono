"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";

type Props = {
  /** Contenido del botón que abre el pop-up (texto o imagen). */
  trigger: ReactNode;
  triggerClassName?: string;
  /** Texto para lectores de pantalla del botón de cierre (visible: ✕). */
  closeLabel: string;
  /** id del título dentro del contenido: da nombre al pop-up. */
  titleId: string;
  children: ReactNode;
};

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
 * Lo usan los proyectos DEV y, después, las galerías THEATER y SOUND.
 */
export default function Dialog({ trigger, triggerClassName = "", closeLabel, titleId, children }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function handleDialogClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) event.currentTarget.close();
  }

  return (
    <>
      <button
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