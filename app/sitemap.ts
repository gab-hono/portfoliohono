import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";

/*
 * /sitemap.xml: la lista de páginas para Google.
 * Cada página existe en EN (sin prefijo: "/dev") y en FR ("/fr/dev"), porque
 * routing.ts usa localePrefix "as-needed" con EN por defecto.
 * alternates.languages = hreflang: le dice a Google que las dos URLs son la
 * misma página en dos idiomas (y no contenido duplicado). x-default = la
 * versión para idiomas que no son ni EN ni FR.
 * Se declara aquí y no en el metadata de cada página: Google acepta los
 * hreflang en el sitemap, y así no hay que tocar las 7 páginas.
 * Si se agrega una página, sumarla a esta lista.
 */
const paths = ["", "/dev", "/theater", "/sound", "/contact", "/legal", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) => {
    const en = `${siteUrl}${path}`;
    const fr = `${siteUrl}/fr${path}`;
    const languages = { en, fr, "x-default": en };

    return [
      { url: en, alternates: { languages } },
      { url: fr, alternates: { languages } },
    ];
  });
}