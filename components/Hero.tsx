"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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

export default function Hero(): JSX.Element {
  return (
    <section className="relative min-h-screen overflow-hidden bg-hero-gradient">
      {/* Decorative elements - hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        <div className="absolute top-20 right-10 w-32 sm:w-64 h-32 sm:h-64 bg-blush-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-10 w-48 sm:w-96 h-48 sm:h-96 bg-cream-300/40 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-8 items-start">
          {/* Left Content */}
          <div className="pt-4 sm:pt-8 lg:pt-16">
            <motion.h1
              custom={0.2}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-charcoal-900 leading-[1.1] tracking-tight"
            >
              San Diego&apos;s Premier
              <br />
              <span className="text-blush-500">Wedding Planning</span>
              <br />
              Agency
            </motion.h1>

            <motion.p
              custom={0.4}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-charcoal-600 max-w-md leading-relaxed"
            >
              Where creativity, passion, and attention to detail come together
              to craft unforgettable weddings in Southern California.
            </motion.p>

            <motion.div
              custom={0.65}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Button size="lg" className="w-full sm:w-auto">
                Start Planning
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Packages
              </Button>
            </motion.div>

            {/* Stats - visible on mobile */}
            <motion.div
              custom={0.8}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="mt-8 flex items-center gap-6 sm:gap-8 lg:hidden"
            >
              <div>
                <p className="text-3xl sm:text-4xl font-serif font-semibold text-charcoal-900">
                  500+
                </p>
                <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
                  Weddings Planned
                </p>
              </div>
              <div className="w-px h-10 sm:h-12 bg-charcoal-200" />
              <div>
                <p className="text-3xl sm:text-4xl font-serif font-semibold text-charcoal-900">
                  15+
                </p>
                <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
                  Years Experience
                </p>
              </div>
              <div className="w-px h-10 sm:h-12 bg-charcoal-200" />
              <a
                href="https://www.theknot.com/marketplace/wedding-agency-san-diego-san-diego-ca-2069439"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <p className="text-3xl sm:text-4xl font-serif font-semibold text-charcoal-900 group-hover:text-blush-500 transition-colors">
                  2×
                </p>
                <p className="text-xs sm:text-sm text-charcoal-500 mt-1 group-hover:text-blush-500 transition-colors">
                  Award Winner
                </p>
              </a>
            </motion.div>

            {/* Brand Phrase - Mobile */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
              className="mt-10 lg:hidden text-2xl sm:text-3xl font-serif italic text-charcoal-400"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="inline-block"
              >
                We&apos;ll be your something
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 2.2, ease: [0.25, 0.4, 0.25, 1] }}
                className="inline-block text-[#5B9BD5] not-italic font-medium"
              >
                blue
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 2.6 }}
                className="inline-block text-[#5B9BD5] not-italic font-medium"
              >
                .
              </motion.span>
            </motion.p>
          </div>

          {/* Right Content - Stats/Info (Desktop only) */}
          <motion.div
            custom={0.5}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="hidden lg:flex justify-end pt-8"
          >
            <div className="max-w-sm">
              <p className="text-lg text-charcoal-600 leading-relaxed">
                We specialize in transforming your unique vision into a
                beautifully tailored celebration, blending elegance with
                personal touches.
              </p>

              <div className="mt-8 flex items-center gap-8">
                <div>
                  <p className="text-4xl font-serif font-semibold text-charcoal-900">
                    500+
                  </p>
                  <p className="text-sm text-charcoal-500 mt-1">
                    Weddings Planned
                  </p>
                </div>
                <div className="w-px h-12 bg-charcoal-200" />
                <div>
                  <p className="text-4xl font-serif font-semibold text-charcoal-900">
                    15+
                  </p>
                  <p className="text-sm text-charcoal-500 mt-1">
                    Years Experience
                  </p>
                </div>
                <div className="w-px h-12 bg-charcoal-200" />
                <a
                  href="https://www.theknot.com/marketplace/wedding-agency-san-diego-san-diego-ca-2069439"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <p className="text-4xl font-serif font-semibold text-charcoal-900 group-hover:text-blush-500 transition-colors">
                    2×
                  </p>
                  <p className="text-sm text-charcoal-500 mt-1 group-hover:text-blush-500 transition-colors">
                    Award Winner
                  </p>
                </a>
              </div>

              {/* Brand Phrase - Desktop */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
                className="mt-12 text-2xl font-serif italic text-charcoal-400"
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                  className="inline-block"
                >
                  We&apos;ll be your something
                </motion.span>{" "}
                <motion.span
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1, delay: 2.2, ease: [0.25, 0.4, 0.25, 1] }}
                  className="inline-block text-[#5B9BD5] not-italic font-medium"
                >
                  blue
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 2.6 }}
                  className="inline-block text-[#5B9BD5] not-italic font-medium"
                >
                  .
                </motion.span>
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
        >
          {[
            {
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
              title: "Full-Service Planning",
              description:
                "From intimate beachfront ceremonies to lavish desert affairs, our dedicated team guides you every step of the way.",
            },
            {
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
              title: "Stress-Free Experience",
              description:
                "We ensure a seamless, stress-free experience so you can enjoy every moment of your special day.",
            },
            {
              icon: (
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-cream-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
                </svg>
              ),
              title: "Personalized Care",
              description:
                "Let us bring your wedding dreams to life with unparalleled excellence and personalized care.",
            },
          ].map((card, index) => (
            <motion.div
              key={card.title}
              custom={0.7 + index * 0.15}
              variants={scaleIn}
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group"
            >
              <div className="flex justify-between items-start sm:flex-col sm:items-end mb-4 sm:mb-12">
                <h3 className="text-lg sm:text-xl font-semibold text-charcoal-900 font-serif sm:hidden">
                  {card.title}
                </h3>
                <div className="opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  {card.icon}
                </div>
              </div>
              <h3 className="hidden sm:block text-xl font-semibold text-charcoal-900 font-serif">
                {card.title}
              </h3>
              <p className="mt-2 sm:mt-3 text-sm text-charcoal-600 leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Hero Images Section */}
        <div className="relative mt-12 sm:mt-16">
          {/* Dashed line connector - desktop only */}
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="absolute top-0 right-64 hidden lg:block"
          >
            <svg
              width="200"
              height="150"
              viewBox="0 0 200 150"
              fill="none"
              className="text-charcoal-300"
            >
              <path
                d="M0 0 C50 0, 100 50, 100 100 C100 150, 150 150, 200 150"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="8 8"
              />
            </svg>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 items-end">
            {/* Main Hero Image */}
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              className="relative h-[280px] sm:h-[350px] md:h-[400px] lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070"
                alt="Beautiful wedding couple walking in golden fields"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/20 to-transparent" />
            </motion.div>

            {/* Secondary Image */}
            <motion.div
              custom={1.2}
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl lg:-mb-20 lg:ml-auto lg:w-4/5 border-2 sm:border-4 border-white"
            >
              <Image
                src="https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=2070"
                alt="Elegant wedding table setting"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
