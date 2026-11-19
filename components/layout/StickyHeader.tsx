"use client";

import { useEffect, useState, type ReactNode } from "react";

type Props = {
  /** Solo en la home: el header es transparente mientras el hero está debajo. */
  followHero?: boolean;
  hasDiscipline?: boolean;
  className: string;
  children: ReactNode;
};

/*
 * Parte cliente del header: solo el <header> y su estado. El contenido
 * (logo, menú, Contact, idioma) se sigue renderizando en el servidor y llega
 * como children.
 *
 * followHero: sobre el hero, el header es transparente y deja ver el fondo
 * del hero (lima, o el color de la disciplina activa). Al bajar, vuelve a
 * bg-(--background), el blanco de la página. La transición de color ya está
 * en las clases del header (motion-safe:transition-colors).
 *
 * Cómo sabe si está sobre el hero: Hero.tsx tiene un marcador de 1 px
 * ([data-hero-end]) a una altura de header por encima de su borde inferior.
 * Cuando el marcador sale por arriba de la pantalla, el borde inferior del
 * hero acaba de pasar bajo el borde inferior del header: es el momento del
 * cambio. Como esa altura usa --header-height en CSS, no hay que recalcular
 * nada al cambiar el tamaño de la ventana.
 *
 * Estado inicial true: la home se abre arriba, sobre el hero, y así el
 * primer pintado (HTML del servidor) ya es transparente, sin parpadeo. Si la
 * página se abre más abajo (#contact), el observer corrige al instante:
 * siempre entrega un primer resultado al empezar a observar.
 */
export default function StickyHeader({
  followHero = false,
  hasDiscipline = false,
  className,
  children,
}: Props) {
  const [overHero, setOverHero] = useState(followHero);

  useEffect(() => {
    if (!followHero) return;

    const marker = document.querySelector("[data-hero-end]");
    if (!marker) {
      // Sin marcador, el header se quedaría transparente sobre toda la página.
      console.warn("StickyHeader: falta [data-hero-end] en el Hero.");
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      // Visible, o todavía debajo de la pantalla = el hero sigue bajo el header.
      setOverHero(entry.isIntersecting || entry.boundingClientRect.top > 0);
    });
    observer.observe(marker);
    return () => observer.disconnect();
  }, [followHero]);

  return (
    <header
      data-has-discipline={hasDiscipline ? "" : undefined}
      data-over-hero={followHero && overHero ? "" : undefined}
      className={className}
    >
      {children}
    </header>
  );
}