import { useTranslations } from "next-intl";
import SectionTitle from "@/components/ui/SectionTitle";
import ContactForm, { type ContactFormLabels } from "@/components/home/ContactForm";
import { COLLAB_TYPES, type ContactField, type FieldError } from "@/data/contact";

const FIELDS: readonly ContactField[] = ["name", "pronouns", "email", "type", "message"];
const ERRORS: readonly FieldError[] = ["required", "invalidEmail", "tooLong"];

/*
 * Let's talk + formulario. Sin imagen al costado (decisión del 25 oct).
 * El formulario ocupa todo el ancho (decisión de Gabriel tras verlo en desktop:
 * con max-w-3xl la mitad derecha quedaba vacía). Los campos cortos van de a 2,
 * así que ningún input pasa de ~media pantalla. La frase de introducción
 * conserva un ancho máximo: una línea de texto de 1300 px se lee mal.
 * Los textos se traducen aquí (servidor) y entran al formulario como labels.
 */
export default function ContactSection() {
  const t = useTranslations("Home.contact");

  const labels: ContactFormLabels = {
    requiredNote: t("requiredNote"),
    fields: Object.fromEntries(FIELDS.map((f) => [f, t(`fields.${f}`)])) as Record<ContactField, string>,
    placeholder: t("typeOptions.placeholder"),
    options: Object.fromEntries(COLLAB_TYPES.map((o) => [o, t(`typeOptions.${o}`)])) as ContactFormLabels["options"],
    submit: t("submit"),
    sending: t("sending"),
    success: t("success"),
    error: t("error"),
    errors: Object.fromEntries(ERRORS.map((e) => [e, t(`errors.${e}`)])) as Record<FieldError, string>,
    privacy: t("privacy"),
  };

  return (
    // tabIndex={-1}: HashLink le pasa el foco al llegar (punto de llegada, no parada de Tab).
    // outline-none: es una sección, no un control; el contorno se vería como un error.
    <section
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-title"
      className="px-4 py-16 outline-none sm:px-8 sm:py-24"
    >
      <div className="flex flex-col gap-6">
        <SectionTitle id="contact-title" className="uppercase">
          {t("title")}
        </SectionTitle>
        <p className="max-w-3xl text-lead">{t("text")}</p>
        <ContactForm labels={labels} />
      </div>
    </section>
  );
}