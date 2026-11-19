import { useTranslations } from "next-intl";
import ExternalLink from "@/components/ui/ExternalLink";
import ListenPlayer from "@/components/home/ListenPlayer";
import { caminamosAudio } from "@/data/audio";

/*
 * Franja Listen de la home (entre el Hero y Selected work), tema "listen":
 * negro + crema (globals.css).
 * Una fila: botón de play + antetítulo LISTEN (sans, mayúsculas por CSS) +
 * título de la obra (<cite>, el protagonista) + subtítulo; a la derecha, el
 * link de respaldo a SoundCloud (siempre visible: sirve si el reproductor no
 * carga y para quien no quiere cargarlo aquí) y la nota de que el clic carga
 * SoundCloud. El reproductor se abre debajo (ver ListenPlayer).
 * El nombre de la obra no se traduce: va directo en el componente.
 */
export default function ListenStrip() {
  const t = useTranslations("Home.listen");
  const tSound = useTranslations("SoundPage.journey.listen");

  return (
    <section
      id="listen"
      data-theme="listen"
      aria-labelledby="listen-title"
      className="bg-theme text-foreground"
    >
      <div className="px-4 py-10 sm:px-8 lg:py-12">
        <ListenPlayer
          embedSrc={caminamosAudio.embedAutoplaySrc}
          playerTitle={tSound("playerTitle")}
          playLabel={t("play")}
          info={
            <div className="flex min-w-0 flex-col gap-1">
              <h2 id="listen-title" className="text-small font-bold tracking-[0.12em] uppercase">
                {t("label")}
              </h2>
              <p className="text-title font-bold">
                <cite className="not-italic">Caminamos mirando al cielo</cite>
              </p>
              <p className="text-small">{t("subtitle")}</p>
            </div>
          }
          aside={
            <div className="flex shrink-0 flex-col gap-1 text-small md:items-end md:text-right">
              <ExternalLink href={caminamosAudio.url}>{t("link")}</ExternalLink>
              <span>{t("note")}</span>
            </div>
          }
        />
      </div>
    </section>
  );
}