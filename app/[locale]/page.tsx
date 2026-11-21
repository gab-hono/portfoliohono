import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import ListenStrip from "@/components/home/ListenStrip";
import SelectedWork from "@/components/home/SelectedWork";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <div data-theme="home" className="bg-theme text-foreground min-h-dvh">
      <Header followHero />
      <main>
        <Hero />
        <ListenStrip />
        <SelectedWork />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}