import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Oval from "@/components/ui/Oval";
import { disciplines } from "@/data/disciplines";

export default function Hero() {
  const t = useTranslations("Home");

  return (
    <section className="px-4 py-8 sm:px-8 sm:py-16">
      <h1 className="text-display max-w-4xl">{t("intro")}</h1>

      <ul className="mt-12 flex flex-col items-center gap-10 sm:flex-row sm:flex-wrap sm:justify-around">
        {disciplines.map(({ slug, href }) => (
          <li key={slug}>
            <Link href={href} className="group inline-block">
              <Oval discipline={slug} className="px-10 py-6 text-center">
                <span aria-hidden="true" className="font-hand text-title uppercase">
                  {t(`disciplines.${slug}.label`)}
                </span>
                <span className="sr-only">{t(`disciplines.${slug}.srLabel`)}</span>
              </Oval>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}