/*
 * URL base absoluta del sitio. La usan Open Graph (layout), el sitemap y robots.txt.
 * En Vercel, VERCEL_PROJECT_PRODUCTION_URL es el dominio de producción
 * (gabrielhono.com desde que el dominio propio está conectado), también en las
 * previews: así el sitemap de una preview apunta igual a producción.
 * En local: localhost.
 */
export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";