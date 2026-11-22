import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/*
 * Bloque final de la home (maqueta "Mezcla · Home"): fondo azul (tema dev),
 * título, frase y botón hacia /contact. El formulario vive en /contact.
 * id="contact": los links viejos a gabrielhono.com/#contact (compartidos
 * antes de la refonte) siguen llegando a este bloque.
 * Botón relleno (crema sobre azul), al revés que las píldoras normales:
 * es la única acción del bloque. En hover se invierte.
 * La flecha va en aria-hidden: el lector de pantalla lee solo "Get in touch".
 */
export default function ContactSection() {
  const t = useTranslations("Home.contact");

  return (
    <section
      id="contact"
      data-theme="dev"
      aria-labelledby="contact-title"
      className="bg-background px-4 py-16 text-foreground sm:px-8 sm:py-24"
    >
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-4">
          <h2 id="contact-title" className="text-display font-extrabold">
            {t("title")}
          </h2>
          <p className="max-w-[40ch] text-lead">{t("text")}</p>
        </div>
        <Link
          href="/contact"
          className="inline-block self-start rounded-full border-2 border-foreground bg-foreground px-7 py-3 text-body font-bold text-background transition-colors duration-200 hover:bg-transparent hover:text-foreground motion-reduce:transition-none sm:self-auto"
        >
          {t("cta")} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}