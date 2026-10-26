/*
 * Formulario de contacto: lo que comparten el formulario (cliente) y la
 * Server Action (servidor). Va aparte porque un archivo "use server" solo
 * puede exportar funciones async.
 */

/** Opciones de "type of collaboration": value de cada <option>, lista que valida Zod
 * y claves de Home.contact.typeOptions en messages. "job" va primero (Ficha 2). */
export const COLLAB_TYPES = ["job", "portfolio", "webProject", "artistic", "other"] as const;
export type CollabType = (typeof COLLAB_TYPES)[number];

/** Largos máximos: maxLength en el navegador y .max() en el servidor. */
export const LIMITS = {
  name: 100,
  pronouns: 50,
  email: 254,
  message: 5000,
} as const;

export type ContactField = "name" | "pronouns" | "email" | "type" | "message";

/** Claves de Home.contact.errors: el servidor devuelve la clave, el formulario la traduce. */
export type FieldError = "required" | "invalidEmail" | "tooLong";

/** Lo que el visitante escribió, para volver a llenar el formulario tras un error
 * (React 19 vacía el formulario después de cada envío). */
export type ContactValues = Record<ContactField, string>;

export type ContactState =
  | { status: "idle" }
  | { status: "invalid"; errors: Partial<Record<ContactField, FieldError>>; values: ContactValues }
  | { status: "error"; values: ContactValues }
  | { status: "success" };

/** Nombre del campo trampa (honeypot): oculto para personas, los bots lo rellenan. */
export const HONEYPOT_FIELD = "website";