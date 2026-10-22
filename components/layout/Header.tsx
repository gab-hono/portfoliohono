import { useTranslations } from "next-intl";
import { Logo } from "@/components/ui/Logo";
import { HashLink } from "@/components/ui/HashLink";
import { pillClasses } from "@/components/ui/PillLink";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

export default function Header() {
  const t = useTranslations("Header");

  return (
    <header className="flex items-center justify-between gap-4 p-4 sm:p-8">
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