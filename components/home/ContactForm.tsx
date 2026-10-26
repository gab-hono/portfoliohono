"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendContact } from "@/actions/contact";
import { pillClasses } from "@/components/ui/PillLink";
import {
  COLLAB_TYPES,
  HONEYPOT_FIELD,
  LIMITS,
  type CollabType,
  type ContactField,
  type ContactState,
  type FieldError,
} from "@/data/contact";

/** Textos ya traducidos: los arma ContactSection en el servidor (mismo patrón que Dialog). */
export type ContactFormLabels = {
  requiredNote: string;
  fields: Record<ContactField, string>;
  placeholder: string;
  options: Record<CollabType, string>;
  submit: string;
  sending: string;
  success: string;
  error: string;
  errors: Record<FieldError, string>;
  privacy: string;
};

type Props = { labels: ContactFormLabels };

const initialState: ContactState = { status: "idle" };

/** Campos de texto: sin borde completo, solo la línea de abajo (maqueta). */
const inputClasses = "w-full border-b border-foreground bg-transparent py-2 text-body";

/*
 * Formulario de contacto (cliente: useActionState necesita React en el navegador).
 * Sin JavaScript también funciona: el navegador envía el formulario y el
 * servidor devuelve la página con el resultado (Server Action).
 *
 * - Validación del navegador (required, type="email", maxLength) + la del
 *   servidor (Zod), que es la que cuenta.
 * - Errores por campo: aria-invalid + aria-describedby → el lector de pantalla
 *   lee el error al llegar al campo. Tras un error del servidor, el foco va al
 *   primer campo inválido.
 * - React 19 vacía el formulario después de cada envío: si hay error, los
 *   valores vuelven desde el estado (defaultValue).
 * - Éxito en una región role="status" (se anuncia sin mover el foco);
 *   error de envío en role="alert".
 * - Campo trampa fuera de la pantalla, oculto para lectores de pantalla y sin
 *   parada de Tab: solo un bot lo rellena.
 */
export default function ContactForm({ labels }: Props) {
  const [state, formAction, isPending] = useActionState(sendContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  const values = state.status === "invalid" || state.status === "error" ? state.values : undefined;
  const errors = state.status === "invalid" ? state.errors : {};

  useEffect(() => {
    if (state.status !== "invalid") return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [state]);

  /** id, name y atributos de accesibilidad comunes a cada campo. */
  const fieldProps = (field: ContactField) => ({
    id: `contact-${field}`,
    name: field,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
  });

  const label = (field: ContactField, required: boolean) => (
    <label htmlFor={`contact-${field}`} className="font-hand text-label uppercase">
      {labels.fields[field]}
      {required && <span aria-hidden="true">*</span>}
    </label>
  );

  const error = (field: ContactField) => {
    // Variable local: TypeScript no hace narrowing de errors[field] (clave dinámica).
    const key = errors[field];
    if (!key) return null;
    return (
      <p id={`contact-${field}-error`} className="text-small text-error">
        {labels.errors[key]}
      </p>
    );
  };

  return (
    <form
      ref={formRef}
      action={formAction}
      className="relative flex flex-col gap-6 rounded-2xl border-2 border-foreground p-6 sm:p-8"
    >
      <p className="text-small">{labels.requiredNote}</p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          {label("name", true)}
          <input
            {...fieldProps("name")}
            type="text"
            required
            maxLength={LIMITS.name}
            autoComplete="name"
            defaultValue={values?.name}
            className={inputClasses}
          />
          {error("name")}
        </div>

        <div className="flex flex-col gap-1">
          {label("pronouns", false)}
          <input
            {...fieldProps("pronouns")}
            type="text"
            maxLength={LIMITS.pronouns}
            autoComplete="off"
            defaultValue={values?.pronouns}
            className={inputClasses}
          />
          {error("pronouns")}
        </div>

        <div className="flex flex-col gap-1">
          {label("email", true)}
          <input
            {...fieldProps("email")}
            type="email"
            required
            maxLength={LIMITS.email}
            autoComplete="email"
            defaultValue={values?.email}
            className={inputClasses}
          />
          {error("email")}
        </div>

        <div className="flex flex-col gap-1">
          {label("type", true)}
          <select
            {...fieldProps("type")}
            required
            defaultValue={values?.type ?? ""}
            className={inputClasses}
          >
            <option value="" disabled>
              {labels.placeholder}
            </option>
            {COLLAB_TYPES.map((type) => (
              <option key={type} value={type}>
                {labels.options[type]}
              </option>
            ))}
          </select>
          {error("type")}
        </div>

        <div className="flex flex-col gap-1 sm:col-span-2">
          {label("message", true)}
          <textarea
            {...fieldProps("message")}
            required
            rows={6}
            maxLength={LIMITS.message}
            defaultValue={values?.message}
            className={`${inputClasses} resize-y`}
          />
          {error("message")}
        </div>
      </div>

      {/* Campo trampa (honeypot). */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0">
        <label>
          Website
          <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col items-start gap-3">
        <button
          type="submit"
          disabled={isPending}
          className={`${pillClasses} disabled:opacity-60`}
        >
          {isPending ? labels.sending : labels.submit}
        </button>

        <p role="status" className="text-body">
          {state.status === "success" ? labels.success : ""}
        </p>
        {state.status === "error" && (
          <p role="alert" className="text-body text-error">
            {labels.error}
          </p>
        )}

        <p className="text-small">{labels.privacy}</p>
      </div>
    </form>
  );
}