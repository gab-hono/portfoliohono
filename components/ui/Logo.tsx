import { Link } from "@/i18n/navigation";
import LogoSvg from "./LogoSvg";
import { useTranslations } from "next-intl";


export function Logo() {
  const t = useTranslations("Header");

  return (
    <Link
      href="/"
      className="inline-flex flex-col font-logo text-logo uppercase"
    >
      <LogoSvg className="h-(--logo-height) w-auto" />
      <span className="sr-only">{t("logoLabel")}</span>
    </Link>
  );
}