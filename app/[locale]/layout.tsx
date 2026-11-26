import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/data/site";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import { Fira_Code } from "next/font/google";
import localFont from "next/font/local";

// Código: solo en /dev (font-mono en su <main>).
const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

/*
 * Fuentes de la typothèque Bye Bye Binary (licencia CUTE: créditos en el footer).
 * Archivos en app/fonts/, rutas relativas a este archivo.
 * adjustFontFallback: ajusta la fuente de respaldo del sistema a las medidas
 * de la fuente real, para que el texto no salte cuando termina de cargar.
 *
 * Métricas verticales de Garabosse: los .woff2 de app/fonts/ están modificados.
 * Los originales reparten la altura de línea en 85 % arriba y 35 % abajo de la
 * línea base, con mayúsculas de 80 %: el texto quedaba alto en óvalos y botones.
 * Se reescribieron a 100 % / 20 % (misma altura total) con fontTools, así el
 * centro de las mayúsculas coincide con el centro de la caja en todos los
 * navegadores (no todos aplican ascent-override en CSS). Si se actualizan las
 * fuentes desde la typothèque, hay que repetir el ajuste.
 */

// Títulos. Parangonne: el estilo de la familia pensado para tamaños grandes.
const garabosse = localFont({
  src: "../fonts/Garabosse-Parangonne.woff2",
  variable: "--font-garabosse",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

// Cuerpo de texto. Mignonne: estilo de la familia pensado para tamaños pequeños.
// Garabosse tiene un solo peso por estilo: para font-bold usamos Perle, el estilo
// más grueso, así el navegador no inventa una negrita falsa.
const garabosseText = localFont({
  src: [
    { path: "../fonts/Garabosse-Mignonne.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Garabosse-Perle.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-garabosse-text",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// Título de pestaña y descripción para Google, en el idioma de la página.
// El locale se pasa explícito: generateMetadata se ejecuta aparte del render.
//
// Open Graph (vista previa al compartir el link en LinkedIn, email, WhatsApp):
// título y descripción del sitio en el idioma de la página. La imagen sale del
// archivo opengraph-image.jpg de esta carpeta (convención de Next) y su alt de
// opengraph-image.alt.txt. Sin og:url: las páginas hijas heredan este objeto,
// y una URL fija haría que compartir /dev mostrara la de la home.
export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  // Type guard: después de este if, TypeScript sabe que locale es "en" | "fr".
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    // URL base absoluta (data/site.ts): Open Graph exige URLs completas para la imagen.
    metadataBase: new URL(siteUrl),
    title: t("title"),
    description: t("description"),
    openGraph: {
      type: "website",
      siteName: "Gabriel Hono",
      title: t("title"),
      description: t("description"),
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? "en_US" : "fr_FR",
    },
    // X / Twitter: tarjeta con imagen grande (usa la misma imagen de Open Graph).
    twitter: { card: "summary_large_image" },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  // Un idioma que no existe (/xx) da 404 en vez de renderizar con lang="xx".
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html
      lang={locale}
      className={`${firaCode.variable} ${garabosse.variable} ${garabosseText.variable}`}
    >
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        {/* Vercel Web Analytics: sin cookies, estadísticas agregadas (ver /privacy).
            Solo envía datos en Vercel (producción y previews); en local no cuenta. */}
        <Analytics />
      </body>
    </html>
  );
}