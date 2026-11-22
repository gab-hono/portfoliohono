import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import LegalLayout, { LegalSection, legalTags } from "@/components/legal/LegalLayout";

type Props = {
  params: Promise<{ locale: string }>;
};

/** Secciones en el orden de la página. Cada id tiene title y body en PrivacyPage.sections. */
const sections = [
  "controller",
  "contactForm",
  "analytics",
  "hosting",
  "cookies",
  "transfers",
  "rights",
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "PrivacyPage.metadata" });
  return { title: t("title"), description: t("description") };
}

/*
 * Política de confidencialidad (RGPD). Describe lo que el código hace hoy:
 * - formulario → Resend → Gmail (actions/contact.ts), borrado al año;
 * - Vercel Web Analytics (sin cookies, layout.tsx);
 * - una sola cookie: NEXT_LOCALE (next-intl, sesión, recuerda el idioma);
 * - SoundCloud solo tras el clic (ListenPlayer).
 * Si se añade un servicio (otro tracker, un embed, BotID…), actualizar
 * esta página y la fecha "updated".
 */
export default function PrivacyPage() {
  const t = useTranslations("PrivacyPage");

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