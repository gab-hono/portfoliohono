import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ExternalLink from "@/components/ui/ExternalLink";
import { Link } from "@/i18n/navigation";

/*
 * Páginas legales (/legal y /privacy): misma estructura, una columna de
 * lectura (65ch), h1 + fecha de actualización + secciones.
 * Los textos viven en messages como HTML ligero y se leen con t.rich +
 * legalTags: así cada sección es un solo mensaje ("body") con sus párrafos,
 * listas y links, y las claves siguen tipadas (sections.<id>.title/body).
 * En el JSON: apóstrofo tipográfico ’ siempre (el ' recto es un carácter de
 * escape en ICU).
 */

const linkClasses = "underline decoration-1 underline-offset-4 hover:decoration-2";

export const legalTags = {
  p: (chunks: ReactNode) => <p>{chunks}</p>,
  ul: (chunks: ReactNode) => <ul className="flex list-disc flex-col gap-1 pl-6">{chunks}</ul>,
  li: (chunks: ReactNode) => <li>{chunks}</li>,
  strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
  contact: (chunks: ReactNode) => (
    <Link href="/contact" className={linkClasses}>
      {chunks}
    </Link>
  ),
  legal: (chunks: ReactNode) => (
    <Link href="/legal" className={linkClasses}>
      {chunks}
    </Link>
  ),
  privacy: (chunks: ReactNode) => (
    <Link href="/privacy" className={linkClasses}>
      {chunks}
    </Link>
  ),
  vercel: (chunks: ReactNode) => <ExternalLink href="https://vercel.com">{chunks}</ExternalLink>,
  cnil: (chunks: ReactNode) => (
    <ExternalLink href="https://www.cnil.fr/fr/plaintes">{chunks}</ExternalLink>
  ),
};

type LayoutProps = {
  title: string;
  updated: string;
  children: ReactNode;
};

export default function LegalLayout({ title, updated, children }: LayoutProps) {
  return (
    <div data-theme="home" className="bg-theme text-foreground min-h-dvh">
      <Header />
      <main className="px-4 pt-8 pb-16 sm:px-8 sm:pt-12 sm:pb-24">
        <article className="mx-auto flex max-w-[65ch] flex-col gap-10">
          <header className="flex flex-col gap-3">
            <h1 className="text-display font-extrabold tracking-tight">{title}</h1>
            <p className="text-small">{updated}</p>
          </header>
          {children}
        </article>
      </main>
      <Footer />
    </div>
  );
}

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export function LegalSection({ id, title, children }: SectionProps) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-4">
      <h2 id={id} className="text-title font-bold">
        {title}
      </h2>
      <div className="flex flex-col gap-4 text-body">{children}</div>
    </section>
  );
}