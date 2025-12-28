"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X, Check, ArrowRight, DollarSign } from "lucide-react";

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

// Detailed service data
const services = [
  {
    id: "wedding-planners",
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
    title: "Wedding Planners",
    shortDescription:
      "Our dedicated team guides you every step of the way, from venue selection to your dream ceremony.",
    fullDescription:
      "Our full-service wedding planning transforms your vision into reality. From the first consultation to the final farewell, we handle every detail with care and precision.",
    features: [
      "Unlimited planning consultations",
      "Venue scouting & selection",
      "Vendor recommendations & management",
      "Budget creation & tracking",
      "Design & aesthetic development",
      "Timeline creation & management",
      "Guest list management",
      "Day-of coordination included",
    ],
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070",
    priceRange: "$$$",
    startingAt: "Starting at $5,500",
  },
  {
    id: "day-of-coordination",
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
    title: "Day-of Coordination",
    shortDescription:
      "Stress-free experience so you can enjoy every moment of your special day with loved ones.",
    fullDescription:
      "Perfect for couples who've planned their wedding but want a professional to execute on the big day. We step in to ensure everything runs seamlessly.",
    features: [
      "Detailed timeline creation",
      "Vendor confirmation & coordination",
      "Ceremony rehearsal direction",
      "Up to 10 hours of coverage",
      "Setup & breakdown supervision",
      "Emergency kit on standby",
      "Point of contact for all vendors",
      "Guest & family coordination",
    ],
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069",
    priceRange: "$$",
    startingAt: "Starting at $1,800",
  },
  {
    id: "more-services",
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
    title: "More Than You Think ...",
    shortDescription:
      "Vendor coordination, design styling, budget management, and personalized care throughout.",
    fullDescription:
      "Beyond traditional planning, we offer specialized services to make your celebration truly unique—from destination weddings to elopements and everything in between.",
    features: [
      "Destination wedding coordination",
      "Elopement packages",
      "Design & styling consultation",
      "Proposal planning",
      "Rehearsal dinner planning",
      "Post-wedding brunch coordination",
      "Vendor-only management",
      "À la carte services available",
    ],
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070",
    priceRange: "$-$$$",
    startingAt: "Customized pricing",
  },
];

// Quick packages overview for the packages modal
const packagesOverview = [
  {
    name: "Elopement",
    price: "$1,200",
    description: "Intimate ceremonies for 2-20 guests",
    popular: false,
  },
  {
    name: "Day-Of Coordination",
    price: "$1,800",
    description: "Professional execution on your big day",
    popular: false,
  },
  {
    name: "Partial Planning",
    price: "$3,500",
    description: "Guidance with key planning milestones",
    popular: true,
  },
  {
    name: "Full Service",
    price: "$5,500+",
    description: "Complete planning from start to finish",
    popular: false,
  },
];

export default function Hero(): JSX.Element {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showPackagesModal, setShowPackagesModal] = useState(false);

  const activeService = services.find((s) => s.id === selectedService);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070"
          alt="Romantic wedding couple walking through golden sunset fields in Southern California"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Overlay gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream-50/95 via-cream-50/80 to-cream-50/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/30 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex flex-col">
        {/* Main Content Area */}
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left Content */}
            <div>
              <motion.h1
                custom={0.2}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-charcoal-900 leading-[1.05] tracking-tight"
              >
                Overwhelmed by
                <br />
                <span className="text-blush-500">Wedding Planning</span>?
              </motion.h1>

              {/* Brand Phrase */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
                className="mt-6 text-xl sm:text-2xl font-serif italic text-charcoal-500"
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
                  className="inline-block text-[#5B9BD5] not-italic font-medium"
                >
                  blue
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 2.2 }}
                  className="inline-block text-[#5B9BD5] not-italic font-medium"
                >
                  .
                </motion.span>
              </motion.p>

              <motion.div
                custom={0.5}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <Link href="/#contact">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Planning
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-white/80 backdrop-blur-sm"
                  onClick={() => setShowPackagesModal(true)}
                >
                  View Packages
                </Button>
              </motion.div>
            </div>

            {/* Right Content */}
            <motion.div
              custom={0.4}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="lg:pt-8"
            >
              <p className="text-lg sm:text-xl text-charcoal-700 leading-relaxed max-w-md">
                Our expert planners simplify the process, so you can focus on 
                enjoying your big day. From venue selection to day-of coordination, 
                we handle every detail.
              </p>

              {/* Stats */}
              <div className="mt-8 flex items-center gap-6 sm:gap-8">
                <div>
                  <p className="text-3xl sm:text-4xl font-serif font-semibold text-charcoal-900">
                    500+
                  </p>
                  <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
                    Weddings Planned
                  </p>
                </div>
                <div className="w-px h-10 sm:h-12 bg-charcoal-300" />
                <div>
                  <p className="text-3xl sm:text-4xl font-serif font-semibold text-charcoal-900">
                    15+
                  </p>
                  <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
                    Years Experience
                  </p>
                </div>
                <div className="w-px h-10 sm:h-12 bg-charcoal-300" />
                <a
                  href="https://www.theknot.com/marketplace/wedding-agency-san-diego-san-diego-ca-2069439"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <p className="text-3xl sm:text-4xl font-serif font-semibold text-charcoal-900 group-hover:text-blush-500 transition-colors">
                    2×
                  </p>
                  <p className="text-xs sm:text-sm text-charcoal-600 mt-1 group-hover:text-blush-500 transition-colors">
                    Award Winner
                  </p>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Feature Cards - Bottom */}
        <div className="relative mt-auto pb-8 sm:pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
            >
              {services.map((service, index) => (
                <motion.button
                  key={service.id}
                  custom={0.6 + index * 0.15}
                  variants={scaleIn}
                  onClick={() => setSelectedService(service.id)}
                  className="text-left bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border border-white/50 cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-charcoal-900 font-serif">
                      {service.title}
                    </h3>
                    <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      {service.icon}
                    </div>
                  </div>
                  <p className="text-sm text-charcoal-600 leading-relaxed">
                    {service.shortDescription}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-blush-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && activeService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
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
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              >
                <X className="w-5 h-5 text-charcoal-700" />
              </button>

              <div className="overflow-y-auto max-h-[90vh]">
                {/* Header Image */}
                <div className="relative h-48 sm:h-64">
                  <Image
                    src={activeService.image}
                    alt={activeService.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-blush-500 text-white text-xs font-medium rounded-full">
                        {activeService.priceRange}
                      </span>
                      <span className="text-white/80 text-sm">
                        {activeService.startingAt}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-medium text-white">
                      {activeService.title}
                    </h2>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <p className="text-charcoal-600 leading-relaxed">
                    {activeService.fullDescription}
                  </p>

                  {/* Features */}
                  <div className="mt-8">
                    <h3 className="text-lg font-serif font-semibold text-charcoal-900 mb-4">
                      What&apos;s Included
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {activeService.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-start gap-3 text-sm text-charcoal-600"
                        >
                          <Check className="w-5 h-5 text-blush-500 flex-shrink-0 mt-0.5" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <Link href="/packages" className="flex-1">
                      <Button size="lg" className="w-full">
                        View Full Details
                      </Button>
                    </Link>
                    <Link href="/#contact" className="flex-1">
                      <Button variant="outline" size="lg" className="w-full">
                        Get a Quote
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
              className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setShowPackagesModal(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-cream-100 flex items-center justify-center hover:bg-cream-200 transition-colors"
              >
                <X className="w-5 h-5 text-charcoal-700" />
              </button>

              <div className="p-6 sm:p-8">
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
                          : "border-cream-200 bg-cream-50 hover:border-cream-300"
                      }`}
                    >
                      {pkg.popular && (
                        <span className="absolute -top-3 left-4 px-3 py-1 bg-blush-500 text-white text-xs font-medium rounded-full">
                          Most Popular
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
                        </div>
                        <div className="text-right">
                          <p className="text-xl sm:text-2xl font-serif font-bold text-charcoal-900">
                            {pkg.price}
                          </p>
                          <p className="text-xs text-charcoal-500">starting</p>
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
    </section>
  );
}
