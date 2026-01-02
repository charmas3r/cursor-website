"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Calendar,
  Palette,
  MapPin,
  Users,
  Sparkles,
  X,
  Check,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    id: "wellness",
    icon: Heart,
    title: "Feel Your Best, In Your Dress",
    description:
    "Wellness Package - This 16 week program helps you feel your best, mentally and physically, on your wedding day. Partnered with Azadi Healing.",
    features: ["Meal Plans", "Fitness Routines", "Mental Wellness"],
    fullDescription:
      "Your wedding day should be the best you've ever felt. In partnership with Azadi Healing, our 16 week wellness program helps you manage the mental stress of planning while supporting your physical health with personalized plans.",
    extendedFeatures: [
      "Personalized meal plans",
      "Exercise plans for every body type & capability",
      "Monthly check-ins for stress management",
      "Reiki sessions",
      "Sound healing journeys",
      "Guided meditations",
      "Mental health support through planning",
      "Breathwork sessions",
    ],
    image: "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767319708/wellness_mvytye.webp",
    priceRange: "$$",
    startingAt: "Starting at $3,000",
    idealFor: "Couples wanting to feel their best on their wedding day",
    partnerLink: "https://azadihealing.com/about-me-%26-azadi",
    partnerName: "Azadi Healing",
    featured: true,
  },
  {
    id: "full-service",
    icon: Heart,
    title: "Full Service Planning",
    description:
      "Our Ever After Package - From engagement to 'I do,' we handle every detail. Complete vendor sourcing, design, budget management, and full coordination.",
    features: ["Vendor Sourcing", "Budget Management", "Custom Design"],
    fullDescription:
      "Our signature Ever After Package is for couples who want a truly hands-off experience. From the moment you say 'yes' to the moment you say 'I do,' we're by your side, transforming your vision into reality with meticulous attention to every detail.",
    extendedFeatures: [
      "Everything in Partial Planning",
      "Rehearsal dinner management",
      "Complete vendor sourcing & negotiation",
      "Full budget management",
      "Custom design & styling",
      "Floral & décor coordination",
      "Stationery design guidance",
      "Room block assistance",
    ],
    image: "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767314958/Jessica_Kevin_s_Wedding_by_PKA_Photography-23_rxgczi.webp",
    priceRange: "$$$$",
    startingAt: "Starting at $11,000",
    idealFor: "Couples wanting a completely stress-free planning experience",
  },
  {
    id: "wedding-management",
    icon: Calendar,
    title: "Wedding Management",
    description:
      "Our Sweet Heart Package provides comprehensive wedding management. From vendor coordination to timeline creation, we ensure your day runs flawlessly while you enjoy every moment.",
    features: ["Vendor Management", "Timeline Creation", "Full Coordination"],
    fullDescription:
      "The Sweet Heart Package is our signature wedding management service. We handle every detail from vendor confirmations to ceremony coordination, ensuring your wedding day is seamless and stress-free.",
    extendedFeatures: [
      "Personalized wedding planning checklist",
      "Access to our preferred vendor list",
      "Attend menu tasting",
      "Unlimited email communication",
      "Vendor confirmation & management",
      "Detailed timeline creation",
      "Ceremony rehearsal coordination",
      "Up to 12 hours of coverage",
      "Setup & breakdown oversight",
    ],
    image: "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767314958/Jessica_Kevin_s_Wedding_by_PKA_Photography-20_nd2l4p.webp",
    priceRange: "$$$",
    startingAt: "Starting at $3,500",
    idealFor: "Couples wanting professional management and peace of mind",
  },
  {
    id: "design-styling",
    icon: Palette,
    title: "Design & Styling",
    description:
      "Transform your vision into reality with our expert design team. From florals to tablescapes, we create cohesive aesthetics that tell your unique love story.",
    features: ["Floral Design", "Tablescapes", "Décor Styling"],
    fullDescription:
      "Our design team creates cohesive, stunning aesthetics that reflect your personal style and love story. From color palettes to the smallest details, we craft an atmosphere that's uniquely yours.",
    extendedFeatures: [
      "Design consultation & mood boarding",
      "Color palette development",
      "Budget allocations",
      "Floral concept & vendor coordination",
      "Tablescape & centerpiece design",
      "Ceremony backdrop styling",
      "Stationery design direction",
      "Day-of styling setup",
      "Rentals coordination",
    ],
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070",
    priceRange: "$$",
    startingAt: "Starting at $2,500",
    idealFor: "Couples wanting a cohesive, professionally designed wedding aesthetic",
  },
  {
    id: "destination",
    icon: MapPin,
    title: "Destination Weddings",
    description:
      "Dreaming of saying 'I do' somewhere special? We specialize in destination weddings, handling all the logistics so you can focus on the romance.",
    features: ["Travel Coordination", "Local Vendors", "Guest Management"],
    fullDescription:
      "Say 'I do' with the backdrop of your dreams. We handle all the complexities of destination weddings—from local vendor relationships to guest travel coordination—so you can focus on the romance.",
    extendedFeatures: [
      "Destination scouting & selection",
      "Local vendor sourcing & management",
      "Guest travel coordination",
      "Welcome event planning",
      "Site visits & inspections",
      "Legal requirements guidance",
      "Multi-day itinerary creation",
      "On-site coordination",
    ],
    image: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=2070",
    priceRange: "$$$+",
    startingAt: "Starting at $14,000",
    idealFor: "Couples dreaming of a wedding away from home",
  },
  {
    id: "custom",
    icon: Sparkles,
    title: "Custom Experiences",
    description:
      "Every love story is unique. We create bespoke wedding experiences tailored to your personality, culture, and dreams.",
    features: ["Personalized Planning", "Unique Venues", "Cultural Touches"],
    fullDescription:
      "Your love story is one-of-a-kind, and your wedding should be too. Our custom experiences are built from scratch around your unique vision, cultural traditions, and personal style.",
    extendedFeatures: [
      "Fully customized planning approach",
      "Cultural ceremony incorporation",
      "Unique venue sourcing",
      "Themed event design",
      "Personalized guest experiences",
      "Custom timeline & pacing",
      "Specialty vendor coordination",
      "Bespoke detail creation",
    ],
    image: "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767238916/processed-F029BA29-96A0-4FEA-9EDE-0D0183AA50FB_vvaatc.webp",
    priceRange: "Custom",
    startingAt: "Pricing varies",
    idealFor: "Couples with a unique vision or cultural traditions",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
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

export default function Services(): JSX.Element {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const activeService = services.find((s) => s.id === selectedService);

  return (
    <section id="packages" className="py-16 sm:py-20 lg:py-32 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20"
        >
          <span className="text-blush-500 text-xs sm:text-sm font-medium uppercase tracking-wider">
            Our Packages
          </span>
          <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal-900 leading-tight">
            Wedding Planning
            <br />
            Packages & Services
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-charcoal-600 leading-relaxed px-4 sm:px-0">
            Blending elegance with personal touches, we offer tailored packages
            to transform your unique vision into an unforgettable celebration.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {services.map((service) => (
            <motion.button
              key={service.title}
              variants={itemVariants}
              onClick={() => setSelectedService(service.id)}
              className={`group relative text-left rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:bg-white hover:shadow-xl transition-all duration-500 cursor-pointer ${
                service.featured
                  ? "bg-sage-50 ring-2 ring-sage-300"
                  : "bg-cream-50"
              }`}
            >
              {/* Featured Badge */}
              {service.featured && (
                <span className="absolute -top-3 left-6 px-3 py-1 bg-sage-500 text-white text-xs font-medium rounded-full">
                  Featured
                </span>
              )}
              {/* Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-blush-50 transition-colors duration-300">
                <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-blush-500" />
              </div>

              {/* Content */}
              <h3 className="text-lg sm:text-xl font-serif font-semibold text-charcoal-900 mb-2 sm:mb-3">
                {service.title}
              </h3>
              <p className="text-charcoal-600 text-sm leading-relaxed mb-4 sm:mb-6">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-charcoal-500"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blush-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Price indicator */}
              <div className="mt-4 pt-4 border-t border-cream-200">
                <div className="flex items-center justify-start">
                  <span className="text-sm font-medium text-blush-500">{service.priceRange}</span>
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-charcoal-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 sm:mt-12 lg:mt-16 text-center"
        >
          <Link href="/packages">
            <Button size="lg" className="w-full sm:w-auto">
              View All Packages
            </Button>
          </Link>
        </motion.div>
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
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-charcoal-900/20 to-transparent" />
                  
                  {/* Icon overlay */}
                  <div className="absolute top-6 left-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <activeService.icon className="w-7 h-7 text-blush-500" />
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-blush-500 text-white text-xs font-medium rounded-full">
                        {activeService.priceRange}
                      </span>
                      <span className="text-white/90 text-sm font-medium">
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
                  {/* Ideal For Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-cream-100 rounded-full text-sm text-charcoal-700 mb-6">
                    <Sparkles className="w-4 h-4 text-blush-500" />
                    <span className="font-medium">Ideal for:</span> {activeService.idealFor}
                  </div>

                  <p className="text-charcoal-600 leading-relaxed text-lg">
                    {activeService.fullDescription}
                  </p>

                  {/* Features */}
                  <div className="mt-8">
                    <h3 className="text-lg font-serif font-semibold text-charcoal-900 mb-4">
                      What&apos;s Included
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {activeService.extendedFeatures.map((feature) => (
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
                        View Full Pricing
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/#contact" className="flex-1">
                      <Button variant="outline" size="lg" className="w-full">
                        Get a Free Quote
                      </Button>
                    </Link>
                  </div>

                  <p className="mt-4 text-center text-xs text-charcoal-500">
                    All packages are customizable to fit your unique vision and budget.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
