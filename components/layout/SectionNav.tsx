type Section = {
  id: string;
  label: string;
};

type Props = {
  /** Nombre del <nav> para lectores de pantalla ("On this page"). */
  label: string;
  sections: readonly Section[];
};

/*
 * Menú lateral de las páginas de disciplina (solo desde lg; en móvil los
 * títulos de sección son visibles). Links normales a #id: scroll suave desde
 * el CSS (respeta reduced motion), scroll-padding-top evita que el header
 * tape la sección. Sin JavaScript.
 * La <ul> es sticky dentro del <nav>, que se estira al alto de su fila:
 * al llegar a los proyectos, el menú se va.
 * v1.1 posible: resaltar la sección visible (necesita IntersectionObserver).
 */
export default function SectionNav({ label, sections }: Props) {
  return (
    <nav aria-label={label} className="hidden border-r border-line lg:block">
      <ul className="sticky top-(--header-height) flex flex-col gap-4 px-8 py-16 text-lead">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="block decoration-1 underline-offset-4 first-letter:uppercase hover:underline"
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}