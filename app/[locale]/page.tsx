import { useTranslations } from "next-intl";

const themes = ["home", "dev", "art", "sound"] as const;

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <main>
      <h1 className="p-8">{t("title")}</h1>
      {themes.map((theme) => (
        <section
          key={theme}
          data-theme={theme}
          className="bg-theme text-foreground p-8"
        >
          <p>Theme: {theme}</p>
          <button className="mt-4 rounded-full border border-line px-4 py-1">
            Contact
          </button>
          {theme === "home" && (
            <p className="mt-2 text-error">Error: email is required</p>
          )}
        </section>
      ))}
    </main>
  );
}