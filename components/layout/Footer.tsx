import { useTranslations } from "next-intl";
import ExternalLink from "@/components/ui/ExternalLink";
import { socialLinks } from "@/data/social";

export default function Footer() {
  const t = useTranslations("Footer");
  // Página estática: el año se calcula en cada build (cada push redeploya).
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-col gap-4 border-t border-line px-4 py-8 text-small sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <ul className="flex gap-6">
        {socialLinks.map(({ name, href }) => (
          <li key={name}>
            <ExternalLink href={href}>{name}</ExternalLink>
          </li>
        ))}
      </ul>
      <p>{t("copyright", { year })}</p>
    </footer>
  );
}