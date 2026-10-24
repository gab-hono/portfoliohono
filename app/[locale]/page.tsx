import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <div data-theme="home" className="bg-theme text-foreground min-h-dvh">
      <Header />
      <main>
        <Hero />
        {/* Etapa 5: Featured projects va entre Hero y About. */}
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}