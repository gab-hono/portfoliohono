import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import ListenStrip from "@/components/home/ListenStrip";
import SelectedWork from "@/components/home/SelectedWork";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";

/*
 * Orden de la home (decidido 22 nov): el trabajo primero. Listen va después
 * de Selected work, como muestra de un proyecto, para que el sitio no se lea
 * como el de un artista musical.
 */
export default function HomePage() {
  return (
    <div data-theme="home" className="bg-theme text-foreground min-h-dvh">
      <Header followHero />
      <main>
        <Hero />
        <SelectedWork />
        <ListenStrip />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}