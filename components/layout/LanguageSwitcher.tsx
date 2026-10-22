"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LANGUAGE_NAMES = { en: "English", fr: "Français" } as const;

export default function LanguageSwitcher() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t("language")}>
      <ul className="flex gap-2">
        {routing.locales.map((lang, i) => (
          <li key={lang} className="flex gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {lang === locale ? (
              <span aria-current="true" lang={lang} className="font-bold">
                <span aria-hidden="true">{lang.toUpperCase()}</span>
                <span className="sr-only">{LANGUAGE_NAMES[lang]}</span>
              </span>
            ) : (
              <Link
                href={pathname}
                locale={lang}
                lang={lang}
                hrefLang={lang}
                className="underline-offset-4 hover:underline"
              >
                <span aria-hidden="true">{lang.toUpperCase()}</span>
                <span className="sr-only">{LANGUAGE_NAMES[lang]}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}