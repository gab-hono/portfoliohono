"use client";

import { useActionState, useEffect, useRef, useState } from "react";
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

/** Textos ya traducidos: los arma la página /contact en el servidor (mismo patrón que Dialog). */
export type ContactFormLabels = {
  requiredNote: string;
  fields: Record<ContactField, string>;
  placeholder: string;
  options: Record<CollabType, string>;
  submit: string;
  sending: string;
  successTitle: string;
  success: string;
  another: string;
  error: string;
  errors: Record<FieldError, string>;
  privacy: string;
};

type Props = { labels: ContactFormLabels };

const initialState: ContactState = { status: "idle" };

/** Campos de texto: sin borde completo, solo la línea de abajo (maqueta). */
const inputClasses = "w-full border-b border-foreground bg-transparent py-2 text-body";

/** Marco común del formulario y del mensaje de éxito (mismo lugar, mismo borde). */
const boxClasses = "rounded-2xl border-2 border-foreground p-6 sm:p-8";

/*
 * "Send another message" tiene que volver a un formulario vacío, pero
 * useActionState no tiene un reset. Solución: cada envío es una "ronda"
 * (ContactRound) con su propia key; cambiar la key desmonta la ronda y monta
 * una nueva, con el estado inicial.
 */
export default function ContactForm({ labels }: Props) {
  const [round, setRound] = useState(0);

  return (
    <ContactRound
      key={round}
      labels={labels}
      isFirstRound={round === 0}
      onReset={() => setRound((r) => r + 1)}
    />
  );
}

type RoundProps = Props & {
  isFirstRound: boolean;
  onReset: () => void;
};

/*
 * Formulario de contacto (cliente: useActionState necesita React en el navegador).
 * Sin JavaScript también funciona: el navegador envía el formulario y el
 * servidor devuelve la página con el resultado (Server Action).
 * Limitación aceptada sin JavaScript: el botón "Send another message" no hace
 * nada; recargar la página da un formulario vacío.
 *
 * - Validación del navegador (required, type="email", maxLength) + la del
 *   servidor (Zod), que es la que cuenta.
 * - Errores por campo: aria-invalid + aria-describedby → el lector de pantalla
 *   lee el error al llegar al campo. Tras un error del servidor, el foco va al
 *   primer campo inválido.
 * - React 19 vacía el formulario después de cada envío: si hay error, los
 *   valores vuelven desde el estado (defaultValue).
 * - Éxito: el formulario se reemplaza por el mensaje (maqueta). El foco va a
 *   su título; si no, se perdería con el formulario que desaparece. El lector
 *   de pantalla lee "Thanks!" y el resto con las flechas.
 * - Nueva ronda (tras "Send another message"): el foco va al primer campo.
 *   En la primera ronda no: la página no debe saltar al formulario al abrirse.
 * - Error de envío en role="alert".
 * - Campo trampa fuera de la pantalla, oculto para lectores de pantalla y sin
 *   parada de Tab: solo un bot lo rellena.
 */
function ContactRound({ labels, isFirstRound, onReset }: RoundProps) {
  const [state, formAction, isPending] = useActionState(sendContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const successTitleRef = useRef<HTMLHeadingElement>(null);

  const values = state.status === "invalid" || state.status === "error" ? state.values : undefined;
  const errors = state.status === "invalid" ? state.errors : {};

  useEffect(() => {
    if (state.status === "invalid") {
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    }
    if (state.status === "success") {
      successTitleRef.current?.focus();
    }
  }, [state]);

  useEffect(() => {
    if (!isFirstRound) formRef.current?.querySelector<HTMLElement>("input")?.focus();
  }, [isFirstRound]);

  if (state.status === "success") {
    return (
      <div className={`flex flex-col items-start gap-4 ${boxClasses}`}>
        {/* tabIndex={-1}: recibe el foco por código, sin ser parada de Tab. */}
        <h2 ref={successTitleRef} tabIndex={-1} className="font-hand text-display outline-none">
          {labels.successTitle}
        </h2>
        <p className="max-w-[36ch] text-lead">{labels.success}</p>
        <button type="button" onClick={onReset} className={pillClasses}>
          {labels.another}
        </button>
      </div>
    );
  }

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
    <form ref={formRef} action={formAction} className={`relative flex flex-col gap-6 ${boxClasses}`}>
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