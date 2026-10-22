import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";

export default function HomePage() {
  return (
    <div data-theme="home" className="bg-theme text-foreground min-h-dvh">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
}