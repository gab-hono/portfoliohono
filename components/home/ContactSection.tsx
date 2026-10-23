import { useTranslations } from "next-intl";
import SectionTitle from "@/components/ui/SectionTitle";

export default function ContactSection() {
  const t = useTranslations("Home.contact");

  return (
    // tabIndex={-1}: HashLink le pasa el foco al llegar (punto de llegada, no parada de Tab).
    // outline-none: es una sección, no un control; el contorno se vería como un error.
    <section
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-title"
      className="px-4 py-16 outline-none sm:px-8 sm:py-24"
    >
      <SectionTitle id="contact-title" className="uppercase">
        {t("title")}
      </SectionTitle>
      <p className="mt-6 max-w-2xl text-lead">{t("text")}</p>
      {/* El formulario se agrega en la etapa 6. */}
    </section>
  );
}