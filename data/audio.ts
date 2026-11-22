/*
 * Audio de Caminamos mirando al cielo (SoundCloud): página SOUND y franja
 * Listen de la home. En los dos lugares, el reproductor se carga solo
 * después de un clic (ListenPlayer).
 * url: la página pública del audio (link "Listen on SoundCloud").
 * embedSrc: el reproductor incrustado, construido desde url.
 *   auto_play=true   → el iframe aparece después del clic en play, así que la
 *                      reproducción arranca con ese mismo clic (algunos
 *                      navegadores móviles pueden pedir un segundo toque)
 *   visual=false     → reproductor clásico (una franja de 166 px, sin imagen grande)
 *   color            → botón de play en negro (tema sound)
 *   show_user=false  → no muestra el nombre del perfil
 *   sin comentarios, sin relacionados, sin reposts
 */
const url = "https://soundcloud.com/fran-hono-olmos/caminamos-mirando-al-cielo-2022";

const params = new URLSearchParams({
  url,
  color: "#000000",
  auto_play: "true",
  visual: "false",
  show_user: "false",
  show_comments: "false",
  show_reposts: "false",
  show_teaser: "false",
  hide_related: "true",
});

export const caminamosAudio = {
  url,
  embedSrc: `https://w.soundcloud.com/player/?${params.toString()}`,
} as const;