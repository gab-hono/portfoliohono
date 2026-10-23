import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import ContactSection from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <div data-theme="home" className="bg-theme text-foreground min-h-dvh">
      <Header />
      <main>
        <Hero />
        {/* Etapas 4 y 5: Featured projects y About van entre Hero y Contact. */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}