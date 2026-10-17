const scale = [
  { token: "text-logo", font: "font-logo", sample: "GABRIEL HONO" },
  { token: "text-display", font: "font-sans", sample: "Hi! I'm Gabriel, I live and work in Paris" },
  { token: "text-title", font: "font-hand", sample: "ABOUT ME · WEB DEVELOPMENT" },
  { token: "text-lead", font: "font-sans", sample: "A site where you can find all Parisian public pools." },
  { token: "text-label", font: "font-hand", sample: "NAME*: E-MAIL*: PRONOUNS:" },
  { token: "text-body", font: "font-sans", sample: "I grew up in Chile. Moved to France when I was 27." },
  { token: "text-small", font: "font-sans", sample: "Linkedin · Github" },
];

export default function HomePage() {
  return (
    <main data-theme="home" className="bg-theme text-foreground p-8 space-y-8">
      {scale.map(({ token, font, sample }) => (
        <div key={token}>
          <p className="text-small opacity-60">{token}</p>
          <p className={`${font} ${token}`}>{sample}</p>
        </div>
      ))}
    </main>
  );
}