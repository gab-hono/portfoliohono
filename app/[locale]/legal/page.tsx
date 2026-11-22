import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import LegalLayout, { LegalSection, legalTags } from "@/components/legal/LegalLayout";

type Props = {
  params: Promise<{ locale: string }>;
};

/** Secciones en el orden de la página. Cada id tiene title y body en LegalPage.sections. */
const sections = ["publisher", "host", "intellectualProperty", "personalData"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "LegalPage.metadata" });
  return { title: t("title"), description: t("description") };
}

/*
 * Mentions légales (LCEN, art. 1-1). Sitio personal no profesional: basta con
 * los datos del hébergeur; la identidad completa del editor la tiene Vercel
 * (cuenta del proyecto). Si el sitio pasa a ser profesional (venta de
 * servicios), esta página necesita identidad legal, dirección, email,
 * teléfono y SIRET.
 */
export default function LegalNoticePage() {
  const t = useTranslations("LegalPage");

  return (
    <LegalLayout title={t("title")} updated={t("updated")}>
      {sections.map((id) => (
        <LegalSection key={id} id={id} title={t(`sections.${id}.title`)}>
          {t.rich(`sections.${id}.body`, legalTags)}
        </LegalSection>
      ))}
    </LegalLayout>
  );
}