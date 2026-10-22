import { useTranslations } from "next-intl";
import { Logo } from "@/components/ui/Logo";
import { HashLink } from "@/components/ui/HashLink";
import { pillClasses } from "@/components/ui/PillLink";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

export default function Header() {
  const t = useTranslations("Header");

  return (
    <header className="sticky top-0 z-10 flex items-start justify-between gap-4 bg-(--background) p-4 motion-safe:transition-colors motion-safe:duration-400 sm:p-8">
      <Logo />
      <div className="flex items-center gap-4 sm:gap-6">
        <HashLink hash="contact" className={pillClasses}>
          {t("contact")}
        </HashLink>
        <LanguageSwitcher />
      </div>
    </header>
  );
}