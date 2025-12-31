import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Vision from "@/components/Vision";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getFeaturedReviews } from "@/lib/sanity";
import type { CoupleTestimonial } from "@/types/sanity";

export const revalidate = 60;

export default async function HomePage(): Promise<JSX.Element> {
  // Fetch featured reviews from couples in Sanity
  const testimonials: CoupleTestimonial[] = await getFeaturedReviews();

  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <Vision />
      <Services />
      <Testimonials initialTestimonials={testimonials} />
      <About />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}


