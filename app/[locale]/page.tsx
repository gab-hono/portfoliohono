import { HashLink } from "@/components/ui/HashLink";
import { pillClasses } from "@/components/ui/PillLink";
import { Logo } from "@/components/ui/Logo";

const themes = ["home", "dev", "art", "sound"] as const;

export default function HomePage() {
  return (
    <main>
      {themes.map((theme) => (
        <section
          key={theme}
          data-theme={theme}
          className="bg-theme text-foreground p-4 sm:p-8 min-h-[50vh]"
        >
          <div className="flex items-start justify-between gap-4">
            <Logo />
            <HashLink hash="contact" className={pillClasses}>
              Contact
            </HashLink>
          </div>
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