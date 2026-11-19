import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import ListenStrip from "@/components/home/ListenStrip";
import FeaturedSection from "@/components/home/FeaturedSection";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <div data-theme="home" className="bg-theme text-foreground min-h-dvh">
      <Header followHero />
      <main>
        <Hero />
        <ListenStrip />
        <FeaturedSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}