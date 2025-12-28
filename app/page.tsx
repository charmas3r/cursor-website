import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function HomePage(): JSX.Element {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <Services />
      <Testimonials />
      <About />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}


