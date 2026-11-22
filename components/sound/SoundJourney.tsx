import { useTranslations } from "next-intl";
import SectionTitle from "@/components/ui/SectionTitle";
import ExternalLink from "@/components/ui/ExternalLink";
import ListenPlayer from "@/components/ui/ListenPlayer";
import { caminamosAudio } from "@/data/audio";

const PARAGRAPHS = ["p1", "p2"] as const;

/*
 * My journey de SOUND: 2 párrafos + el audio de Caminamos mirando al cielo
 * (el primer párrafo cuenta cómo el sonido llegó por la performance).
 *
 * Reproductor: fachada clic-para-cargar (ListenPlayer), como en la franja
 * Listen de la home. Antes del clic, ninguna conexión a SoundCloud.
 * - info: la leyenda del audio (antes era el figcaption).
 * - aside: link de respaldo a SoundCloud + nota "Loads the SoundCloud player".
 * Etiqueta del botón y nota: se reutilizan las de Home.listen (mismo
 * reproductor, mismo audio).
 *
 * Título visible en móvil; desde lg solo para lectores de pantalla
 * (lo reemplaza el menú lateral).
 */
export default function SoundJourney() {
  const t = useTranslations("SoundPage.journey");
  const tListen = useTranslations("Home.listen");

  return (
    <section id="journey" aria-labelledby="journey-title" className="px-4 py-12 sm:px-8 lg:py-16">
      <SectionTitle id="journey-title" className="mb-8 uppercase lg:sr-only">
        {t("title")}
      </SectionTitle>

      <div className="flex max-w-prose flex-col gap-6 text-body">
        {PARAGRAPHS.map((paragraph) => (
          <p key={paragraph}>{t(paragraph)}</p>
        ))}

        <ListenPlayer
          embedSrc={caminamosAudio.embedSrc}
          playerTitle={t("listen.playerTitle")}
          playLabel={tListen("play")}
          info={
            <p className="min-w-0 text-small">
              {t.rich("listen.caption", { cite: (chunks) => <cite>{chunks}</cite> })}
            </p>
          }
          aside={
            <div className="flex shrink-0 flex-col gap-1 text-small md:items-end md:text-right">
              <ExternalLink href={caminamosAudio.url}>{t("listen.link")}</ExternalLink>
              <span>{tListen("note")}</span>
            </div>
          }
        />
      </div>
    </section>
  );
}