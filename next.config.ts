import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Solo en desarrollo: permite probar en el teléfono por la red local.
  // Sin esto, Next.js bloquea el JavaScript pedido desde otra IP y los
  // botones no funcionan (el HTML y el CSS sí llegan).
  // Si el router le asigna otra IP al Mac, actualizarla aquí.
  // No afecta a producción (Vercel).
  allowedDevOrigins: ["192.168.1.58"],
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);