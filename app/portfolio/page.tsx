"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, MapPin, ArrowRight, Star } from "lucide-react";

import { couples, getFeaturedCouples, type CoupleData } from "@/data/couples";

const featuredCouples = getFeaturedCouples();
const allCouples = couples.filter((c) => !c.featured);

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

export default function PortfolioPage(): JSX.Element {
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const galleryRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const featuredInView = useInView(featuredRef, { once: true, margin: "-100px" });
  const galleryInView = useInView(galleryRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  return (
    <main className="relative">
      <Navigation />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-cream-50 via-blush-50 to-cream-100"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-64 h-64 bg-blush-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-cream-300/40 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blush-100/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <span className="inline-flex items-center gap-2 text-blush-500 text-sm font-medium uppercase tracking-wider mb-6">
              <Heart className="w-4 h-4" aria-hidden="true" />
              Our Amazing Couples
              <Heart className="w-4 h-4" aria-hidden="true" />
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-charcoal-900 leading-tight mb-6">
              Love Stories
              <br />
              <span className="text-blush-500">We&apos;ve Crafted</span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-charcoal-600 leading-relaxed mb-8">
              Every couple has a unique story. Here are the unforgettable celebrations
              we&apos;ve had the honor of bringing to life across San Diego and beyond.
            </p>

            <div className="flex flex-wrap justify-center gap-8 text-charcoal-600">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-blush-500 fill-blush-500" aria-hidden="true" />
                <span className="font-medium">500+ Weddings</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-blush-500 fill-blush-500" aria-hidden="true" />
                <span className="font-medium">100% Happy Couples</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blush-500" aria-hidden="true" />
                <span className="font-medium">15+ Years Experience</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-charcoal-300 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-blush-500"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Weddings */}
      <section ref={featuredRef} className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuredInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-blush-500 text-sm font-medium uppercase tracking-wider">
              Featured Celebrations
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal-900 leading-tight">
              Recent Highlights
            </h2>
            <p className="mt-6 text-lg text-charcoal-600 leading-relaxed">
              Discover some of our most breathtaking weddings from this past year.
            </p>
          </motion.div>

          {/* Featured Grid - Large Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={featuredInView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {featuredCouples.map((couple, index) => (
              <motion.article
                key={couple.id}
                variants={itemVariants}
                className={`group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 ${
                  index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                }`}
              >
                <Link href={`/portfolio/${couple.id}`} className="block">
                  <div
                    className={`relative ${
                      index === 0 ? "h-[400px] lg:h-[600px]" : "h-[350px]"
                    }`}
                  >
                    <Image
                      src={couple.heroImage}
                      alt={`${couple.names} wedding at ${couple.venue} - San Diego Wedding Photography`}
                      fill
                      sizes={index === 0 ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority={index === 0}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                      <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                        <div className="flex items-center gap-4 text-white/80 text-sm mb-3">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" aria-hidden="true" />
                            {couple.venue}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" aria-hidden="true" />
                            {couple.date}
                          </span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-white mb-2">
                          {couple.names}
                        </h3>
                        <p className="text-blush-300 font-medium mb-4">{couple.tagline}</p>

                        {couple.review && (
                          <blockquote className="text-white/90 text-sm italic leading-relaxed mb-4 max-w-md">
                            &ldquo;{couple.review.text.slice(0, 120)}...&rdquo;
                          </blockquote>
                        )}

                        <span className="inline-flex items-center gap-2 text-white font-medium text-sm group/link">
                          View Gallery
                          <ArrowRight
                            className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* All Couples Gallery */}
      <section ref={galleryRef} className="py-20 lg:py-32 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={galleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-blush-500 text-sm font-medium uppercase tracking-wider">
              Complete Portfolio
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal-900 leading-tight">
              More Love Stories
            </h2>
            <p className="mt-6 text-lg text-charcoal-600 leading-relaxed">
              Browse through our collection of beautiful weddings, each uniquely crafted
              to reflect the couple&apos;s personality and vision.
            </p>
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={galleryInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {allCouples.map((couple) => (
              <motion.article
                key={couple.id}
                variants={itemVariants}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
              >
                <Link href={`/portfolio/${couple.id}`} className="block">
                  <div className="relative h-[280px] overflow-hidden">
                    <Image
                      src={couple.heroImage}
                      alt={`${couple.names} wedding at ${couple.venue} - San Diego Wedding`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/40 transition-all duration-500 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300">
                        <ArrowRight className="w-5 h-5 text-charcoal-900" aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-charcoal-500 text-sm mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                        {couple.venue}
                      </span>
                    </div>

                    <h3 className="text-xl font-serif font-semibold text-charcoal-900 mb-1 group-hover:text-blush-600 transition-colors">
                      {couple.names}
                    </h3>
                    <p className="text-blush-500 text-sm font-medium">{couple.tagline}</p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className="relative py-24 lg:py-32 overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070"
            alt="Beautiful San Diego wedding sunset"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-charcoal-900/70" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Heart className="w-12 h-12 text-blush-400 mx-auto mb-6" aria-hidden="true" />

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white leading-tight mb-6">
              Ready to Create Your
              <br />
              <span className="text-blush-300">Own Love Story?</span>
            </h2>

            <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
              Let&apos;s bring your wedding vision to life. Schedule a complimentary
              consultation and discover how we can make your dream celebration a reality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contact">
                <Button size="lg" className="w-full sm:w-auto text-base px-8">
                  Schedule Consultation
                </Button>
              </Link>
              <Link href="/#packages">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-base px-8 bg-transparent border-white text-white hover:bg-white hover:text-charcoal-900"
                >
                  View Packages
                </Button>
              </Link>
            </div>

            <p className="mt-8 text-white/60 text-sm">
              Or call us directly: <span className="text-white font-medium">(619) 555-0123</span>
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

