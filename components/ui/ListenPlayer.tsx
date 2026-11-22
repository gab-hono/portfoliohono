"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type ListenPlayerProps = {
  embedSrc: string;
  playerTitle: string;
  playLabel: string;
  info: ReactNode;
  aside: ReactNode;
};

/*
 * Fachada "clic para cargar" del reproductor SoundCloud. Se usa en la franja
 * Listen de la home (ListenStrip) y en My journey de /sound (SoundJourney).
 * Antes del clic: solo un botón de play propio, sin ninguna conexión a
 * SoundCloud (ni cookies de terceros ni scripts: CNIL + rendimiento).
 *
 * Disposición: una fila con [botón + info] a la izquierda y aside (link de
 * respaldo + nota) a la derecha; en móvil, aside pasa debajo.
 * Al clic: el botón desaparece (no puede controlar el iframe sin la API de
 * SoundCloud) y el reproductor se abre debajo de la fila, a todo el ancho,
 * con autoplay. Recibe el foco para que con teclado se siga dentro.
 * El salto de altura lo provoca el clic: no cuenta como CLS.
 *
 * El botón usa los colores del tema donde está (foreground/background):
 * crema sobre negro en Listen, negro sobre blanco en /sound.
 * info y aside los renderiza el componente servidor que lo usa: así los
 * textos no necesitan los mensajes de next-intl en el cliente.
 */
export default function ListenPlayer({ embedSrc, playerTitle, playLabel, info, aside }: ListenPlayerProps) {
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (loaded) iframeRef.current?.focus();
  }, [loaded]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-12">
        <div className="flex items-center gap-5 sm:gap-6">
          {!loaded && (
            <button
              type="button"
              onClick={() => setLoaded(true)}
              aria-label={playLabel}
              className="flex size-16 shrink-0 cursor-pointer items-center justify-center rounded-full bg-foreground text-background hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground motion-safe:transition-transform"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 4.5v15l13-7.5z" fill="currentColor" />
              </svg>
            </button>
          )}
          {info}
        </div>

        {aside}
      </div>

      {loaded && (
        <iframe
          ref={iframeRef}
          src={embedSrc}
          title={playerTitle}
          allow="autoplay"
          className="h-[166px] w-full border-0"
        />
      )}
    </div>
  );
}