import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DisciplineIntro from "@/components/layout/DisciplineIntro";
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

export default function DevPage() {
  return (
    <div data-theme="dev" className="bg-theme text-foreground min-h-dvh">
      <Header discipline="dev" />
      <main className="font-mono">
        <DisciplineIntro discipline="dev" />
        <StackSection />
        <JourneySection />
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
}