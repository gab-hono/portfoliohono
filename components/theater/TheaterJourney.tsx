import { useTranslations } from "next-intl";
import SectionTitle from "@/components/ui/SectionTitle";

const PARAGRAPHS = ["p1", "p2", "p3"] as const;

/*
 * My journey de THEATER: texto en 3 párrafos (en un solo bloque eran más
 * de 1000 caracteres). Títulos de obras con <cite>, leídos con t.rich.
 * Título visible en móvil; desde lg solo para lectores de pantalla
 * (lo reemplaza el menú lateral).
 */
export default function TheaterJourney() {
  const t = useTranslations("TheaterPage.journey");

  return (
    <section id="journey" aria-labelledby="journey-title" className="px-4 py-12 sm:px-8 lg:py-16">
      <SectionTitle id="journey-title" className="mb-8 uppercase lg:sr-only">
        {t("title")}
      </SectionTitle>

      <div className="flex max-w-prose flex-col gap-6 text-body">
        {PARAGRAPHS.map((paragraph) => (
          <p key={paragraph}>
            {t.rich(paragraph, { cite: (chunks) => <cite>{chunks}</cite> })}
          </p>
        ))}
      </div>
    </section>
  );
}