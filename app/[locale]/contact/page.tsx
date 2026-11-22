import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Fragment } from "react";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ExternalLink from "@/components/ui/ExternalLink";
import ContactForm, { type ContactFormLabels } from "@/components/contact/ContactForm";
import { COLLAB_TYPES, type ContactField, type FieldError } from "@/data/contact";
import { socialLinks } from "@/data/social";
import type { Discipline } from "@/data/disciplines";

type Props = {
  params: Promise<{ locale: string }>;
};

const FIELDS: readonly ContactField[] = ["name", "pronouns", "email", "type", "message"];
const ERRORS: readonly FieldError[] = ["required", "invalidEmail", "tooLong"];

/** Etiquetas del panel: mismos colores que las de Selected work. */
const disciplineTags: { id: Discipline; classes: string }[] = [
  { id: "dev", classes: "bg-(--blue) text-(--cream)" },
  { id: "theater", classes: "bg-(--red-dark) text-(--cream)" },
  { id: "sound", classes: "bg-(--black) text-(--white)" },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "ContactPage.metadata" });
  return { title: t("title"), description: t("description") };
}

/*
 * Página /contact (maqueta "Mezcla · Contact"): panel lima a la izquierda
 * (h1, frase, etiquetas, redes) y formulario a la derecha. Por debajo de lg,
 * una columna: panel arriba, formulario debajo.
 * El panel usa bg-background y no bg-theme: bg-theme añade el gradiente fijo
 * de THEATER y un clip-path, que aquí no sirven.
 * Los textos del formulario se traducen aquí (servidor) y entran como labels.
 */
export default function ContactPage() {
  const t = useTranslations("ContactPage");
  const tDisciplines = useTranslations("Home.selection.disciplines");

  const labels: ContactFormLabels = {
    requiredNote: t("form.requiredNote"),
    fields: Object.fromEntries(FIELDS.map((f) => [f, t(`form.fields.${f}`)])) as Record<ContactField, string>,
    placeholder: t("form.typeOptions.placeholder"),
    options: Object.fromEntries(
      COLLAB_TYPES.map((o) => [o, t(`form.typeOptions.${o}`)]),
    ) as ContactFormLabels["options"],
    submit: t("form.submit"),
    sending: t("form.sending"),
    successTitle: t("form.successTitle"),
    success: t("form.success"),
    another: t("form.another"),
    error: t("form.error"),
    errors: Object.fromEntries(ERRORS.map((e) => [e, t(`form.errors.${e}`)])) as Record<FieldError, string>,
    privacy: t.rich("form.privacy", {
      privacy: (chunks) => (
        <Link href="/privacy" className="underline decoration-1 underline-offset-4 hover:decoration-2">
          {chunks}
        </Link>
      ),
    }),
  };

  return (
    <div data-theme="home" className="bg-theme text-foreground min-h-dvh">
      <Header currentPage="contact" />
      <main className="grid items-start gap-8 px-4 pt-4 pb-16 sm:px-8 sm:pb-24 lg:grid-cols-2 lg:gap-16">
        <section
          data-theme="lime"
          aria-labelledby="contact-title"
          className="flex flex-col gap-6 rounded-2xl bg-background p-6 text-foreground sm:p-10"
        >
          <h1
            id="contact-title"
            className="text-[length:clamp(3rem,1.8rem+5vw,6.5rem)] leading-[0.95] font-extrabold tracking-tight"
          >
            {t("title")}
          </h1>
          <p className="max-w-[30ch] text-lead">{t("text")}</p>

          <ul aria-label={t("disciplinesLabel")} className="flex flex-wrap gap-2">
            {disciplineTags.map(({ id, classes }) => (
              <li
                key={id}
                className={`rounded-full px-3 py-1.5 text-small leading-none font-bold tracking-[0.08em] uppercase ${classes}`}
              >
                {tDisciplines(id)}
              </li>
            ))}
          </ul>

          <p className="mt-4 text-small">
            {t("alsoOn")}{" "}
            {socialLinks.map(({ name, href }, i) => (
              <Fragment key={name}>
                {i > 0 && <span aria-hidden="true"> · </span>}
                <ExternalLink href={href}>{name}</ExternalLink>
              </Fragment>
            ))}
          </p>
        </section>

        <ContactForm labels={labels} />
      </main>
      <Footer />
    </div>
  );
}