import { PillLink } from "@/components/ui/PillLink";

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
          <PillLink href={{ pathname: "/", hash: "contact" }}>Contact</PillLink>
        </section>
      ))}
      <section
        id="contact"
        data-theme="home"
        className="bg-theme text-foreground p-8 min-h-screen"
      >
        <h2 className="font-hand text-title">LET&apos;S TALK!</h2>
      </section>
    </main>
  );
}