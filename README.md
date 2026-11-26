# gabrielhono.com

Personal portfolio of Gabriel Hono — interdisciplinary artist and coder based in Paris.
Three practices in one site: **code**, **theater** and **sound**.

**Live:** [gabrielhono.com](https://gabrielhono.com) · English and French

## Stack

- [Next.js](https://nextjs.org) 16 (App Router, static generation) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) 4 — design tokens and per-section themes in `app/globals.css`
- [next-intl](https://next-intl.dev) — EN (default, no prefix) / FR (`/fr`)
- [Resend](https://resend.com) + [Zod](https://zod.dev) — contact form via a Server Action, validated on the server
- [Vercel](https://vercel.com) — hosting and cookieless Web Analytics

No database and no CMS: all content lives in `data/` (typed TypeScript) and `messages/` (translations).

## Highlights

- **Discipline switcher** on the home hero: hovering Code / Theater / Sound recolors the hero and the sticky header.
- **Selected work** list with client-side filters (`aria-pressed`, live region announcing the result count).
- **Deep links**: `/dev?project=<id>` opens the matching project dialog on load.
- **Click-to-load SoundCloud player**: no request to SoundCloud until the visitor presses play.
- **Accessibility**: checked with axe and keyboard navigation; WCAG AA contrast on every theme.
- **Inclusive French**: non-binary forms with the point médian, rendered with the ligatures of the Garabosse typeface.
- **SEO**: localized metadata, Open Graph image, sitemap with `hreflang` alternates.

## Project structure

```
app/[locale]/   pages (home, dev, theater, sound, contact, legal, privacy) and layout
actions/        contact form Server Action
components/     UI by area (home, layout, gallery, contact, legal, ui…)
data/           content: projects, selection, stack, links
messages/       en.json / fr.json
i18n/           next-intl routing
```

## Run locally

Requires Node 24 (see `.nvmrc`).

```bash
npm install
npm run dev
```

The contact form needs two environment variables in `.env.local`:

```
RESEND_API_KEY=...
CONTACT_EMAIL=...   # address that receives the messages
```

## Credits

- Typeface **Garabosse** from the [Bye Bye Binary typothèque](https://typotheque.genderfluid.space/fr/fontes/garabosse), under the CUTE license (full credits on the site's legal notice). The `.woff2` files have adjusted vertical metrics.
- Code typeface: Fira Code.
- All photos and texts © Gabriel Hono. The code is public for reading; content and images may not be reused without permission.