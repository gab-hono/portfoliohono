import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { Archivo, Fira_Code, Covered_By_Your_Grace } from "next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

const coveredByYourGrace = Covered_By_Your_Grace({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-covered",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

/*
 * URL base absoluta: Open Graph exige URLs completas para la imagen.
 * En Vercel, VERCEL_PROJECT_PRODUCTION_URL es el dominio de producción
 * (hoy portfoliohono.vercel.app; con el dominio propio pasará a ser ese,
 * sin tocar código). En local: localhost.
 */
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

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
      className={`${archivo.variable} ${firaCode.variable} ${coveredByYourGrace.variable}`}
    >
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}