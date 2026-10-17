import { HashLink } from "@/components/ui/HashLink";
import { pillClasses } from "@/components/ui/PillLink";

const themes = ["home", "dev", "art", "sound"] as const;

export default function HomePage() {
  return (
    <main>
      {themes.map((theme) => (
        <section
          key={theme}
          data-theme={theme}
          className="bg-theme text-foreground p-8 min-h-[50vh] space-y-4"
        >
          <p className="text-small">{theme}</p>

          <HashLink hash="contact" className={pillClasses}>
            Contact
          </HashLink>

        </section>
      ))}
      <section
        id="contact"
        tabIndex={-1}
        data-theme="home"
        className="bg-theme text-foreground p-8 min-h-screen focus:outline-none"
      >
        <h2 className="font-hand text-title">LET&apos;S TALK!</h2>
      </section>
    </main>
  );
}