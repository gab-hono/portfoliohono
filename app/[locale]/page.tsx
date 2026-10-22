import { HashLink } from "@/components/ui/HashLink";
import { pillClasses } from "@/components/ui/PillLink";
import { Logo } from "@/components/ui/Logo";
import ExternalLink from "@/components/ui/ExternalLink";
import SectionTitle from "@/components/ui/SectionTitle";
import Oval from "@/components/ui/Oval";
import { useTranslations } from "next-intl";
import { disciplines } from "@/data/disciplines";

const themes = ["home", "dev", "theater", "sound"] as const;

export default function HomePage() {
  const t = useTranslations();
  return (
    <main>
      <section data-theme="home" className="bg-theme text-foreground p-8 space-y-4">
        <p>{t("Home.intro")}</p>
        {disciplines.map((d) => (
          <p key={d.slug}>
            <span className="uppercase">{t(`Home.disciplines.${d.slug}.label`)}</span>
            {" — "}
            {t(`Home.disciplines.${d.slug}.hover`)} {t("Home.mainProjects")}{" "}
            {d.projects.join(", ")}
          </p>
        ))}
        <p>{t("Footer.copyright", { year: 2026 })}</p>
      </section>
      {themes.map((theme) => (
        <section
          key={theme}
          data-theme={theme}
          className="bg-theme text-foreground p-4 sm:p-8 min-h-[50vh]"
        >
          <div className="flex items-start justify-between gap-4">
            <Logo />
            <HashLink hash="contact" className={pillClasses}>
              Contact
            </HashLink>
          </div>
        </section>
      ))}
      <section
        id="contact"
        tabIndex={-1}
        data-theme="home"
        className="bg-theme text-foreground p-8 min-h-screen focus:outline-none"
      >
        <h2 className="font-hand text-title">LET&apos;S TALK!</h2>

              <SectionTitle className="uppercase">about me</SectionTitle>
      <SectionTitle as="h3">Ma Piscine</SectionTitle>
      </section>

      <div className="flex flex-wrap gap-8">
  <a href="#" className="group">
    <Oval discipline="dev" className="px-8 py-4">
      <span className="font-hand text-title uppercase">web development</span>
    </Oval>
  </a>
  <a href="#" className="group">
    <Oval discipline="theater" className="px-8 py-6">
      <span className="font-hand text-title uppercase">theater artist</span>
    </Oval>
  </a>
  <a href="#" className="group">
    <Oval discipline="sound" className="px-8 py-4">
      <span className="font-hand text-title uppercase">sound technician</span>
    </Oval>
  </a>
  <Oval discipline="dev" animated={false} className="px-8 py-4">
    <span className="font-hand text-title uppercase">web development</span>
  </Oval>
</div>


      <ExternalLink href="https://github.com/gab-hono">GitHub</ExternalLink>
    </main>
  );
}