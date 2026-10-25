import { useTranslations } from "next-intl";
import SectionTitle from "@/components/ui/SectionTitle";
import ExternalLink from "@/components/ui/ExternalLink";
import { caminamosAudio } from "@/data/audio";

const PARAGRAPHS = ["p1", "p2"] as const;

/*
 * My journey de SOUND: 2 párrafos + el audio de Caminamos mirando al cielo
 * (el primer párrafo cuenta cómo el sonido llegó por la performance).
 *
 * Reproductor: <iframe> de SoundCloud.
 * - loading="lazy": no se carga hasta acercarse en el scroll.
 * - title: nombre del iframe para lectores de pantalla (obligatorio).
 * - Debajo, link a SoundCloud por si el reproductor no carga.
 * Etapa 7: botón "cargar el reproductor" (cookies de terceros, CNIL).
 *
 * Título visible en móvil; desde lg solo para lectores de pantalla
 * (lo reemplaza el menú lateral).
 */
export default function SoundJourney() {
  const t = useTranslations("SoundPage.journey");

  return (
    <section id="journey" aria-labelledby="journey-title" className="px-4 py-12 sm:px-8 lg:py-16">
      <SectionTitle id="journey-title" className="mb-8 uppercase lg:sr-only">
        {t("title")}
      </SectionTitle>

      <div className="flex max-w-prose flex-col gap-6 text-body">
        {PARAGRAPHS.map((paragraph) => (
          <p key={paragraph}>{t(paragraph)}</p>
        ))}

        <figure className="flex flex-col gap-3">
          <iframe
            src={caminamosAudio.embedSrc}
            title={t("listen.playerTitle")}
            loading="lazy"
            className="h-[166px] w-full border-0"
          />
          <figcaption className="flex flex-col gap-1 text-small">
            <span>{t.rich("listen.caption", { cite: (chunks) => <cite>{chunks}</cite> })}</span>
            <span>
              <ExternalLink href={caminamosAudio.url}>{t("listen.link")}</ExternalLink>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}