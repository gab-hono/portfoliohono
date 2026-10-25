import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DisciplineIntro from "@/components/layout/DisciplineIntro";
import SectionNav from "@/components/layout/SectionNav";
import SoundJourney from "@/components/sound/SoundJourney";
import Gallery from "@/components/gallery/Gallery";
import { soundProjects } from "@/data/projects";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "SoundPage.metadata" });
  return { title: t("title"), description: t("description") };
}

/*
 * Misma estructura que THEATER: desde lg, menú lateral junto a la frase y el
 * journey (con el audio de Caminamos); la galería va debajo, a todo el ancho.
 * Única diferencia con THEATER: labels.watch, porque dos proyectos tienen link.
 */
export default function SoundPage() {
  const t = useTranslations("SoundPage");

  const sections = [
    { id: "journey", label: t("journey.title") },
    { id: "projects", label: t("projects.title") },
  ];

  return (
    <div data-theme="sound" className="bg-theme text-foreground min-h-dvh">
      <Header discipline="sound" />
      <main>
        <div className="lg:grid lg:grid-cols-[14rem_minmax(0,1fr)]">
          <SectionNav label={t("sectionsNav")} sections={sections} />
          <div>
            <DisciplineIntro discipline="sound" />
            <SoundJourney />
          </div>
        </div>
        <Gallery
          projects={soundProjects}
          labels={{
            title: t("projects.title"),
            learnMore: t("projects.learnMore"),
            credits: t("projects.credits"),
            close: t("projects.close"),
            watch: t("projects.watch"),
          }}
        />
      </main>
      <Footer />
    </div>
  );
}