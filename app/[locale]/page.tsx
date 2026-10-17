const labelSizes = ["text-[20px]", "text-[24px]", "text-[28px]"];

export default function HomePage() {
  return (
    <main data-theme="home" className="bg-theme text-foreground p-8 space-y-6">
      <p className="font-logo text-[48px] leading-tight">GABRIEL HONO</p>
      <p className="font-hand text-[40px]">ABOUT ME · LET&apos;S TALK!</p>
      {labelSizes.map((size) => (
        <p key={size} className={`font-hand ${size}`}>
          NAME*: E-MAIL*: PRONOUNS: ({size})
        </p>
      ))}
      <p className="text-[24px]">Hi! I&apos;m Gabriel, I live and work in Paris.</p>
    </main>
  );
}