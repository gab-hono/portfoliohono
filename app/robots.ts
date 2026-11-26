import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";

/*
 * /robots.txt: todos los buscadores pueden indexar todo el sitio,
 * y se les indica dónde está el sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}