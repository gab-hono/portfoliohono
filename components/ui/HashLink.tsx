"use client";

import type { ComponentProps, MouseEvent } from "react";
import { Link, usePathname } from "@/i18n/navigation";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  hash: string;
  pathname?: string;
};

export function HashLink({ hash, pathname = "/", onClick, ...props }: Props) {
  const currentPathname = usePathname();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    // Cmd/Ctrl/Shift + clic o clic central: dejar que el navegador abra otra pestaña.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;

    // En otra página: navegación normal hacia pathname#hash.
    if (currentPathname !== pathname) return;

    const target = document.getElementById(hash);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView();
    target.focus({ preventScroll: true });
    window.history.pushState(null, "", `#${hash}`);
  }

  return <Link href={{ pathname, hash }} onClick={handleClick} {...props} />;
}