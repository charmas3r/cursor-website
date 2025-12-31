"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, DollarSign, Sparkles, Heart, Users, ChevronDown } from "lucide-react";

// Cloudinary video URLs with different quality levels
const VIDEO_SOURCES = {
  // High quality for desktop (1080p)
  desktop: {
    webm: "https://res.cloudinary.com/dnwh2jmpm/video/upload/q_auto:good,f_webm,w_1920/v1767160073/Short_Highlights_1_aze1gy",
    mp4: "https://res.cloudinary.com/dnwh2jmpm/video/upload/q_auto:good,f_mp4,w_1920/v1767160073/Short_Highlights_1_aze1gy",
  },
  // Lower quality for mobile (720p, more compressed)
  mobile: {
    webm: "https://res.cloudinary.com/dnwh2jmpm/video/upload/q_auto:eco,f_webm,w_720/v1767160073/Short_Highlights_1_aze1gy",
    mp4: "https://res.cloudinary.com/dnwh2jmpm/video/upload/q_auto:eco,f_mp4,w_720/v1767160073/Short_Highlights_1_aze1gy",
  },
};

const POSTER_IMAGE = "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: delay,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      delay: delay,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

// Feature cards - exploratory content about the company
const featureCards = [
  {
    id: "our-approach",
    icon: (
      <svg
        className="w-8 h-8 sm:w-10 sm:h-10 text-blush-400"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    title: "Our Approach",
    shortDescription:
      "We believe every love story deserves a celebration that's as unique as the couple at its heart.",
    modalTitle: "A Personal Touch in Every Detail",
    modalDescription:
      "At Wedding Agency San Diego, we don't believe in cookie-cutter weddings. Our approach begins with truly understanding you—your story, your style, and your dreams. From there, we craft a celebration that feels authentically, beautifully yours.",
    highlights: [
      "In-depth discovery sessions to understand your vision",
      "Personalized planning tailored to your unique style",
      "Dedicated planner as your single point of contact",
      "Stress-free experience from start to finish",
    ],
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070",
    cta: { label: "Meet Our Team", href: "/about#team" },
  },
  {
    id: "what-we-do",
    icon: (
      <svg
        className="w-8 h-8 sm:w-10 sm:h-10 text-blush-400"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
    title: "What We Do",
    shortDescription:
      "Full-service planning, wedding management, and everything in between—we've got you covered.",
    modalTitle: "Comprehensive Wedding Services",
    modalDescription:
      "Whether you need someone to handle every detail or just want support on the big day, we offer flexible services designed to meet you where you are in your planning journey.",
    highlights: [
      "Full-service planning from engagement to honeymoon",
      "Wedding management for DIY couples",
      "Design & styling to bring your vision to life",
      "Destination weddings",
    ],
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069",
    cta: { label: "View Our Packages", href: "/packages" },
  },
  {
    id: "why-us",
    icon: (
      <svg
        className="w-8 h-8 sm:w-10 sm:h-10 text-blush-400"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
      </svg>
    ),
    title: "Why Choose Us",
    shortDescription:
      "100+ weddings, 20+ years in hospitality & events, and a 2× Best of Weddings winner. Your day is in expert hands.",
    modalTitle: "Experience You Can Trust",
    modalDescription:
      "With over 20 years in hospitality and events—from hotels and venues to hands-on service and planning—I've experienced weddings from every angle. This unique perspective means I understand what it takes to create a seamless celebration.",
    highlights: [
      "100+ weddings successfully planned",
      "20+ years in hospitality & events",
      "2× Best of Weddings winner (The Knot)",
      "Experience on every side of events",
    ],
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070",
    cta: { label: "See Our Work", href: "/portfolio" },
  },
];

// Quick packages overview for the packages modal
const packagesOverview = [
  {
    name: "Wedding Management",
    price: "$3,500",
    description: "Sweet Heart Package - Complete wedding management",
    popular: true,
  },
  {
    name: "Partial Planning",
    price: "$6,500",
    description: "Premier Package - Guided support with key planning milestones",
    popular: true,
  },
  {
    name: "Full Service",
    price: "$11,000+",
    description: "Ever After Package - Complete planning from start to finish",
    popular: false,
  },
  {
    name: "Destination Weddings",
    price: "$8,000+",
    description: "Complete destination wedding coordination",
    popular: false,
  },
  {
    name: "Design & Styling",
    price: "$2,500+",
    description: "Professional design consultation and styling",
    popular: false,
  },
  {
    name: "Wellness Package",
    price: "$3,000",
    description: "4-month holistic program with Azadi Healing",
    popular: false,
    featured: true,
  },
  {
    name: "Custom Package",
    price: null,
    description: "Bespoke experiences for unique visions",
    popular: false,
  },
];

export default function Hero(): JSX.Element {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [showPackagesModal, setShowPackagesModal] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Detect device and preferences
  useEffect(() => {
    // Check for mobile device
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    // Check for reduced motion preference
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotionChange);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  // Handle video load event
  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  // Get appropriate video sources based on device
  const videoSources = isMobile ? VIDEO_SOURCES.mobile : VIDEO_SOURCES.desktop;
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const videoOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const cardsOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  const activeCard = featureCards.find((c) => c.id === selectedCard);

  return (
    <>
      {/* Cinematic Video Hero */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Video Background */}
        <motion.div 
          className="absolute inset-0"
          style={{ opacity: videoOpacity }}
        >
          {/* Poster image shown while video loads */}
          <div 
            className={`absolute inset-0 transition-opacity duration-1000 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}
            aria-hidden="true"
          >
            <Image
              src={POSTER_IMAGE}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>

          {/* Video - only plays if user hasn't requested reduced motion */}
          {!prefersReducedMotion ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onLoadedData={handleVideoLoaded}
              onCanPlayThrough={handleVideoLoaded}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
              poster={POSTER_IMAGE}
            >
              {/* WebM for Chrome, Firefox, Edge (better compression) */}
              <source src={videoSources.webm} type="video/webm" />
              {/* MP4 for Safari and fallback */}
              <source src={videoSources.mp4} type="video/mp4" />
            </video>
          ) : (
            /* Static image for users who prefer reduced motion */
            <Image
              src={POSTER_IMAGE}
              alt="Romantic wedding couple"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          )}

          {/* Cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/40 via-charcoal-900/20 to-charcoal-900/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/30 via-transparent to-charcoal-900/30" />
        </motion.div>

        {/* Main Content - Centered */}
        <motion.div 
          className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8"
          style={{ opacity: contentOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-4xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-medium text-white leading-[1.05] tracking-tight drop-shadow-2xl"
            >
              Overwhelmed by
              <br />
              <span className="text-blush-300">Wedding Planning</span>?
            </motion.h1>

            {/* Brand Phrase */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.2 }}
              className="mt-6 sm:mt-8 text-xl sm:text-2xl md:text-3xl font-serif italic text-white/90"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="inline-block"
              >
                We&apos;ll be your something
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 1.8, ease: [0.25, 0.4, 0.25, 1] }}
                className="inline-block text-[#7CB9E8] not-italic font-medium"
              >
                blue
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 2.2 }}
                className="inline-block text-[#7CB9E8] not-italic font-medium"
              >
                .
              </motion.span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.5 }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/#contact">
                <Button size="lg" className="w-full sm:w-auto text-base px-8 py-6 bg-white text-charcoal-900 hover:bg-cream-100">
                  Start Planning
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-base px-8 py-6 bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20"
                onClick={() => setShowPackagesModal(true)}
              >
                View Packages
              </Button>
            </motion.div>

            {/* Stats - Desktop Only */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3 }}
              className="hidden md:flex items-center justify-center gap-8 mt-12"
            >
              <div className="text-center">
                <p className="text-3xl lg:text-4xl font-serif font-semibold text-white">100+</p>
                <p className="text-sm text-white/70 mt-1">Weddings</p>
              </div>
              <div className="w-px h-10 bg-white/30" />
              <div className="text-center">
                <p className="text-3xl lg:text-4xl font-serif font-semibold text-white">20+</p>
                <p className="text-sm text-white/70 mt-1">Years Experience</p>
              </div>
              <div className="w-px h-10 bg-white/30" />
              <a
                href="https://www.theknot.com/marketplace/wedding-agency-san-diego-san-diego-ca-2069439"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center group"
              >
                <p className="text-3xl lg:text-4xl font-serif font-semibold text-white group-hover:text-blush-300 transition-colors">2×</p>
                <p className="text-sm text-white/70 mt-1 group-hover:text-blush-300 transition-colors">Award Winner</p>
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-white/60"
            >
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Glass Feature Cards - Desktop Only, positioned at bottom */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 hidden lg:block"
          style={{ opacity: cardsOpacity }}
        >
          <div className="max-w-7xl mx-auto px-8 pb-8">
            <div className="grid grid-cols-3 gap-6">
              {featureCards.map((card, index) => (
                <motion.button
                  key={card.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 3 + index * 0.15 }}
                  onClick={() => setSelectedCard(card.id)}
                  className="text-left bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 group cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-white font-serif">
                      {card.title}
                    </h3>
                    <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-300 text-blush-300">
                      {card.icon}
                    </div>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed line-clamp-2">
                    {card.shortDescription}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-blush-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Mobile Feature Cards - Separate Section */}
      <section className="lg:hidden bg-cream-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-charcoal-900">
              Why Choose Us
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {featureCards.map((card, index) => (
              <motion.button
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedCard(card.id)}
                className="text-left bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-charcoal-900 font-serif">
                    {card.title}
                  </h3>
                  <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    {card.icon}
                  </div>
                </div>
                <p className="text-sm text-charcoal-600 leading-relaxed">
                  {card.shortDescription}
                </p>
                <div className="mt-3 flex items-center gap-2 text-blush-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </motion.button>
            ))}
          </div>
          
          {/* Mobile Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-6 mt-10 pt-8 border-t border-cream-200"
          >
            <div className="text-center">
              <p className="text-2xl font-serif font-semibold text-charcoal-900">100+</p>
              <p className="text-xs text-charcoal-600 mt-1">Weddings</p>
            </div>
            <div className="w-px h-8 bg-charcoal-300" />
            <div className="text-center">
              <p className="text-2xl font-serif font-semibold text-charcoal-900">20+</p>
              <p className="text-xs text-charcoal-600 mt-1">Years</p>
            </div>
            <div className="w-px h-8 bg-charcoal-300" />
            <div className="text-center">
              <p className="text-2xl font-serif font-semibold text-charcoal-900">2×</p>
              <p className="text-xs text-charcoal-600 mt-1">Awards</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Learn More Modal */}
      <AnimatePresence>
        {selectedCard && activeCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm"
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              >
                <X className="w-5 h-5 text-charcoal-700" />
              </button>

              <div className="overflow-y-auto max-h-[90vh]">
                {/* Header Image */}
                <div className="relative h-48 sm:h-64">
                  <Image
                    src={activeCard.image}
                    alt={activeCard.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-charcoal-900/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-2xl sm:text-3xl font-serif font-medium text-white">
                      {activeCard.modalTitle}
                    </h2>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <p className="text-charcoal-600 leading-relaxed text-lg">
                    {activeCard.modalDescription}
                  </p>

                  {/* Highlights */}
                  <div className="mt-8 grid sm:grid-cols-2 gap-4">
                    {activeCard.highlights.map((highlight, index) => (
                      <div
                        key={highlight}
                        className="flex items-start gap-3 p-4 bg-cream-50 rounded-xl"
                      >
                        <div className="w-8 h-8 rounded-full bg-blush-100 flex items-center justify-center flex-shrink-0">
                          {index === 0 && <Heart className="w-4 h-4 text-blush-500" />}
                          {index === 1 && <Sparkles className="w-4 h-4 text-blush-500" />}
                          {index === 2 && <Users className="w-4 h-4 text-blush-500" />}
                          {index === 3 && (
                            <svg className="w-4 h-4 text-blush-500" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                          )}
                        </div>
                        <p className="text-sm text-charcoal-700">{highlight}</p>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <Link href={activeCard.cta.href} className="flex-1">
                      <Button size="lg" className="w-full">
                        {activeCard.cta.label}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/#contact" className="flex-1">
                      <Button variant="outline" size="lg" className="w-full">
                        Get in Touch
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Packages Overview Modal */}
      <AnimatePresence>
        {showPackagesModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm"
            onClick={() => setShowPackagesModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setShowPackagesModal(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-cream-100 flex items-center justify-center hover:bg-cream-200 transition-colors"
              >
                <X className="w-5 h-5 text-charcoal-700" />
              </button>

              <div className="p-6 sm:p-8 overflow-y-auto">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blush-100 mb-4">
                    <DollarSign className="w-6 h-6 text-blush-500" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-medium text-charcoal-900">
                    Our Packages
                  </h2>
                  <p className="mt-2 text-charcoal-600">
                    Flexible options to fit your vision and budget
                  </p>
                </div>

                {/* Packages Grid */}
                <div className="space-y-3">
                  {packagesOverview.map((pkg) => (
                    <div
                      key={pkg.name}
                      className={`relative p-4 sm:p-5 rounded-2xl border-2 transition-all ${
                        pkg.popular
                          ? "border-blush-400 bg-blush-50"
                          : pkg.featured
                          ? "border-sage-400 bg-sage-50"
                          : "border-cream-200 bg-cream-50 hover:border-cream-300"
                      }`}
                    >
                      {pkg.popular && (
                        <span className="absolute -top-3 left-4 px-3 py-1 bg-blush-500 text-white text-xs font-medium rounded-full">
                          Most Popular
                        </span>
                      )}
                      {pkg.featured && !pkg.popular && (
                        <span className="absolute -top-3 left-4 px-3 py-1 bg-sage-500 text-white text-xs font-medium rounded-full">
                          Featured
                        </span>
                      )}
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-serif font-semibold text-charcoal-900">
                            {pkg.name}
                          </h3>
                          <p className="text-sm text-charcoal-600 mt-0.5">
                            {pkg.description}
                          </p>
                          <Link
                            href="/packages"
                            className="inline-flex items-center gap-1 text-xs text-blush-500 hover:text-blush-600 font-medium mt-2"
                          >
                            View Package Details
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xl sm:text-2xl font-serif font-bold text-charcoal-900">
                            {pkg.price || "Let's Talk"}
                          </p>
                          {pkg.price && <p className="text-xs text-charcoal-500">starting</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer CTA */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link href="/packages" className="flex-1">
                    <Button size="lg" className="w-full">
                      View All Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/#contact" className="flex-1">
                    <Button variant="outline" size="lg" className="w-full">
                      Request Custom Quote
                    </Button>
                  </Link>
                </div>

                <p className="mt-4 text-center text-xs text-charcoal-500">
                  All packages are customizable. Final pricing based on consultation.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
