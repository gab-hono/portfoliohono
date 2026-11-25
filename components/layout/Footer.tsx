import { useTranslations } from "next-intl";
import ExternalLink from "@/components/ui/ExternalLink";
import { Link } from "@/i18n/navigation";
import { socialLinks } from "@/data/social";

/** Página de la fuente en la typothèque Bye Bye Binary (crédito exigido por la licencia CUTE). */
const fontUrl = "https://typotheque.genderfluid.space/fr/fontes/garabosse";

/** Páginas legales, en el orden del footer. */
const legalPages = [
  { href: "/legal", key: "legal" },
  { href: "/privacy", key: "privacy" },
] as const;

/*
 * Izquierda: redes. Derecha: links legales + copyright.
 * Debajo, a todo el ancho: crédito tipográfico (licencia CUTE: nombre de la fuente
 * + link). Los nombres de quienes la dibujaron están en Mentions légales.
 * En móvil todo en columna; desde sm, dos bloques en una fila.
 */
export default function Footer() {
  const t = useTranslations("Footer");
  // Página estática: el año se calcula en cada build (cada push redeploya).
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-col gap-4 border-t border-line px-4 py-8 text-small sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-8">
      <ul className="flex gap-6">
        {socialLinks.map(({ name, href }) => (
          <li key={name}>
            <ExternalLink href={href}>{name}</ExternalLink>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <nav aria-label={t("legalLabel")}>
          <ul className="flex gap-6">
            {legalPages.map(({ href, key }) => (
              <li key={key}>
                <Link
                  href={href}
                  className="underline decoration-1 underline-offset-4 hover:decoration-2"
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p>{t("copyright", { year })}</p>
      </div>
      <p className="sm:w-full">
        {t.rich("fontCredit", {
          link: (chunks) => <ExternalLink href={fontUrl}>{chunks}</ExternalLink>,
        })}
      </p>
    </footer>
  );
}