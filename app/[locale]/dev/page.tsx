import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DisciplineIntro from "@/components/layout/DisciplineIntro";
import SectionNav from "@/components/layout/SectionNav";
import StackSection from "@/components/dev/StackSection";
import JourneySection from "@/components/dev/JourneySection";
import ProjectsSection from "@/components/dev/ProjectsSection";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "DevPage.metadata" });
  return { title: t("title"), description: t("description") };
}

/*
 * Desde lg: menú lateral (SectionNav) a la izquierda de la frase, el stack
 * y el journey, como en la maqueta. Los proyectos van debajo, a todo el
 * ancho (imágenes de borde a borde).
 */
export default function DevPage() {
  const t = useTranslations("DevPage");

  const sections = [
    { id: "stack", label: t("stack.title") },
    { id: "journey", label: t("journey.title") },
    { id: "projects", label: t("projects.title") },
  ];

  return (
    <div data-theme="dev" className="bg-theme text-foreground min-h-dvh">
      <Header discipline="dev" />
      <main className="font-mono">
        <div className="lg:grid lg:grid-cols-[14rem_minmax(0,1fr)]">
          <SectionNav label={t("sectionsNav")} sections={sections} />
          <div>
            <DisciplineIntro discipline="dev" />
            <StackSection />
            <JourneySection />
          </div>
        </div>
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
}