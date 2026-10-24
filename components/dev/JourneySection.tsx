import Image from "next/image";
import { useTranslations } from "next-intl";
import portrait from "@/assets/images/dev/portrait-dev.jpg";

/*
 * My journey: texto + foto girada.
 * Desktop: texto a la izquierda (máx. 65 caracteres por línea: en monoespaciada,
 * 65ch es exacto), foto a la derecha girada 6°.
 * Móvil: foto debajo, centrada, girada solo 3° (más inclinación la haría
 * sobresalir de la pantalla y aparecería scroll horizontal).
 * placeholder="blur": Next.js genera la versión borrosa desde el import estático.
 */
export default function JourneySection() {
  const t = useTranslations("DevPage.journey");

  return (
    <section id="journey" aria-labelledby="journey-title" className="px-4 py-12 sm:px-8 lg:py-16">
      {/* Título solo para lectores de pantalla: el visible es el del menú lateral (paso 7). */}
      <h2 id="journey-title" className="sr-only">
        {t("title")}
      </h2>

      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,65ch)_1fr] lg:gap-16">
        <p className="text-body">{t("text")}</p>

        <Image
          src={portrait}
          alt={t("portraitAlt")}
          placeholder="blur"
          sizes="(min-width: 1024px) 20rem, 16rem"
          className="mx-auto h-auto w-64 rotate-3 lg:w-80 lg:rotate-6"
        />
      </div>
    </section>
  );
}