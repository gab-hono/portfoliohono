"use server";

import { Resend } from "resend";
import { z } from "zod";
import { getTranslations } from "next-intl/server";
import {
  COLLAB_TYPES,
  HONEYPOT_FIELD,
  LIMITS,
  type ContactField,
  type ContactState,
  type ContactValues,
  type FieldError,
} from "@/data/contact";

/*
 * Server Action del formulario de contacto (useActionState).
 * Se ejecuta solo en el servidor: la API key y el email de destino nunca
 * llegan al navegador.
 *
 * 1. Campo trampa con contenido → bot: se responde "success" sin enviar nada
 *    (si le dijéramos que falló, el bot reintentaría).
 * 2. Validación con Zod. Es la que cuenta: la del navegador se puede saltar.
 *    Cada mensaje de error es una clave de Home.contact.errors.
 * 3. Envío con Resend desde onboarding@resend.dev: sin dominio verificado,
 *    solo puede enviar al email de la cuenta, que es justo CONTACT_EMAIL.
 *    replyTo = email del visitante: "Responder" le contesta directamente.
 */

const schema = z.object({
  name: z.string().trim().min(1, "required").max(LIMITS.name, "tooLong"),
  pronouns: z.string().trim().max(LIMITS.pronouns, "tooLong"),
  // pipe: el formato del email solo se revisa si el campo no está vacío.
  email: z
    .string()
    .trim()
    .min(1, "required")
    .max(LIMITS.email, "tooLong")
    .pipe(z.email("invalidEmail")),
  // Opción vacía ("Choose an option") = valor fuera de la lista → "required".
  type: z.enum(COLLAB_TYPES, "required"),
  message: z.string().trim().min(1, "required").max(LIMITS.message, "tooLong"),
});

const FIELDS: readonly ContactField[] = ["name", "pronouns", "email", "type", "message"];

export async function sendContact(
  _previousState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Valores en bruto, campo por campo (formData también trae campos internos de Next).
  const values = Object.fromEntries(
    FIELDS.map((field) => [field, String(formData.get(field) ?? "")]),
  ) as ContactValues;

  if (String(formData.get(HONEYPOT_FIELD) ?? "") !== "") {
    return { status: "success" };
  }

  const result = schema.safeParse(values);

  if (!result.success) {
    const fieldErrors = z.flattenError(result.error).fieldErrors;
    const errors: Partial<Record<ContactField, FieldError>> = {};
    for (const field of FIELDS) {
      const first = fieldErrors[field]?.[0];
      // Los mensajes del schema son siempre claves de FieldError.
      if (first) errors[field] = first as FieldError;
    }
    return { status: "invalid", errors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_EMAIL is missing.");
    return { status: "error", values };
  }

  const data = result.data;
  // El email es para Gabriel: tipo de colaboración siempre en inglés.
  const t = await getTranslations({ locale: "en", namespace: "Home.contact.typeOptions" });
  // Sin saltos de línea en el asunto (un bot podría intentar meter cabeceras).
  const subjectName = data.name.replace(/\s+/g, " ");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [to],
      replyTo: data.email,
      subject: `[Portfolio] New message from ${subjectName}`,
      text: [
        `Name: ${data.name}`,
        `Pronouns: ${data.pronouns || "—"}`,
        `E-mail: ${data.email}`,
        `Type: ${t(data.type)}`,
        "",
        "Message:",
        data.message,
      ].join("\n"),
    });

    if (error) {
      console.error("Contact form: Resend error", error);
      return { status: "error", values };
    }
  } catch (error) {
    // Red caída, timeout…: el visitante ve el mensaje de error y puede reintentar.
    console.error("Contact form: unexpected error", error);
    return { status: "error", values };
  }

  return { status: "success" };
}