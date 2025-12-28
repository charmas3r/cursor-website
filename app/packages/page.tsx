"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Calendar,
  MapPin,
  Sparkles,
  Check,
  Star,
  Crown,
  Gem,
  Phone,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Main pricing packages
const packages = [
  {
    id: "elopement",
    name: "Intimate Elopement",
    tagline: "For the romantics",
    description:
      "Perfect for couples seeking an intimate celebration. We handle the essential details so you can focus on each other.",
    price: "2,500",
    priceNote: "Starting at",
    icon: Heart,
    badge: null,
    popular: false,
    bestValue: false,
    features: [
      "Ceremony planning & coordination",
      "Venue scouting (up to 3 locations)",
      "Officiant recommendations",
      "Photography referrals",
      "Day-of timeline creation",
      "2-hour coordination on wedding day",
      "Emergency kit & support",
    ],
    notIncluded: [
      "Reception planning",
      "Full vendor management",
      "Rehearsal coordination",
    ],
    idealFor: "Couples wanting a simple, intimate ceremony with minimal planning stress.",
    image: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=2070",
  },
  {
    id: "day-of",
    name: "Day-of Coordination",
    tagline: "You plan, we execute",
    description:
      "Already planned your dream wedding? We'll step in to ensure flawless execution while you enjoy every moment.",
    price: "3,500",
    priceNote: "Starting at",
    icon: Calendar,
    badge: "Best Value",
    popular: false,
    bestValue: true,
    features: [
      "Unlimited email communication",
      "2 planning meetings (virtual or in-person)",
      "Vendor confirmation & management",
      "Detailed timeline creation",
      "Ceremony rehearsal coordination",
      "Up to 10 hours day-of coverage",
      "Setup & breakdown oversight",
      "Emergency kit & problem solving",
      "1 lead coordinator + 1 assistant",
    ],
    notIncluded: [
      "Vendor sourcing & negotiations",
      "Budget management",
      "Design services",
    ],
    idealFor: "DIY couples who want professional execution without full planning services.",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098",
  },
  {
    id: "partial",
    name: "Partial Planning",
    tagline: "Guided support",
    description:
      "The perfect balance of guidance and independence. We help with key decisions while you maintain creative control.",
    price: "6,500",
    priceNote: "Starting at",
    icon: Sparkles,
    badge: "Most Popular",
    popular: true,
    bestValue: false,
    features: [
      "Everything in Day-of Coordination",
      "Unlimited phone & email support",
      "Monthly planning meetings",
      "Vendor recommendations & introductions",
      "Contract review assistance",
      "Budget tracking tools",
      "Design concept development",
      "Guest management guidance",
      "Up to 12 hours day-of coverage",
      "1 lead coordinator + 2 assistants",
    ],
    notIncluded: [
      "Full vendor negotiations",
      "Complete design execution",
    ],
    idealFor: "Couples who want professional guidance but enjoy being involved in planning.",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069",
  },
  {
    id: "full-service",
    name: "Full Service Luxury",
    tagline: "Complete peace of mind",
    description:
      "Our signature experience. From engagement to honeymoon, we handle every detail with unparalleled attention and care.",
    price: "12,000",
    priceNote: "Starting at",
    icon: Crown,
    badge: null,
    popular: false,
    bestValue: false,
    features: [
      "Everything in Partial Planning",
      "Dedicated planning team",
      "Complete vendor sourcing & negotiation",
      "Full budget management",
      "Custom design & styling",
      "Floral & décor coordination",
      "Stationery design guidance",
      "Guest accommodation management",
      "Welcome party planning",
      "Rehearsal dinner coordination",
      "Up to 14 hours day-of coverage",
      "1 lead + 3 assistants on wedding day",
      "Post-wedding wrap-up services",
    ],
    notIncluded: [],
    idealFor: "Couples seeking a stress-free, luxury planning experience from start to finish.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070",
  },
];

// Add-on services
const addOns = [
  { name: "Destination Wedding Coordination", price: "2,500+", description: "Additional support for out-of-town celebrations" },
  { name: "Welcome Party Planning", price: "1,500+", description: "Rehearsal dinners, welcome drinks, farewell brunches" },
  { name: "Design & Styling Package", price: "2,000+", description: "Complete aesthetic vision and execution" },
  { name: "RSVP & Guest Management", price: "800+", description: "Full guest list coordination and communication" },
  { name: "Additional Coordinator (Day-of)", price: "350", description: "Per coordinator for larger events" },
  { name: "Extended Hours", price: "150/hr", description: "Additional coverage beyond package limits" },
];

// FAQ items
const faqs = [
  {
    question: "When should I book my wedding planner?",
    answer: "We recommend booking 12-18 months before your wedding for Full Service planning, 6-9 months for Partial Planning, and 2-3 months for Day-of Coordination. Popular dates book quickly, so earlier is always better!",
  },
  {
    question: "What's the difference between Day-of and Full Service?",
    answer: "Day-of Coordination focuses on executing your already-planned wedding, stepping in during the final weeks. Full Service Planning means we're with you from engagement to 'I do,' handling every detail including vendor selection, design, and complete coordination.",
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes! We offer flexible payment plans for all packages. Typically, a 25% retainer secures your date, with the remaining balance split into monthly payments leading up to your wedding.",
  },
  {
    question: "Can I customize a package?",
    answer: "Absolutely! Every wedding is unique, and we love creating custom packages. Schedule a consultation and we'll design a plan that perfectly fits your needs and budget.",
  },
  {
    question: "Do you travel for destination weddings?",
    answer: "Yes! We love destination weddings. Travel fees apply based on location, and we have partnerships with vendors across California, Mexico, Hawaii, and beyond.",
  },
];

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

export default function PackagesPage(): JSX.Element {
  const heroRef = useRef(null);
  const packagesRef = useRef(null);
  const addOnsRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const packagesInView = useInView(packagesRef, { once: true, margin: "-100px" });
  const addOnsInView = useInView(addOnsRef, { once: true, margin: "-100px" });
  const faqInView = useInView(faqRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="relative">
      <Navigation />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-cream-50 via-blush-50 to-cream-100"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-64 h-64 bg-blush-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-cream-300/40 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <span className="inline-flex items-center gap-2 text-blush-500 text-sm font-medium uppercase tracking-wider mb-6">
              <Gem className="w-4 h-4" aria-hidden="true" />
              Wedding Planning Packages
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-charcoal-900 leading-tight mb-6">
              Investment in Your
              <br />
              <span className="text-blush-500">Forever</span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-charcoal-600 leading-relaxed mb-8">
              Transparent pricing, exceptional value. Choose the level of support
              that&apos;s right for your celebration.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="#packages">
                <Button size="lg" className="text-base px-8">
                  View Packages
                </Button>
              </Link>
              <Link href="/#contact">
                <Button variant="outline" size="lg" className="text-base px-8">
                  Free Consultation
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16 text-charcoal-600">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-blush-500 fill-blush-500" aria-hidden="true" />
              <span className="font-medium">500+ Weddings</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-blush-500 fill-blush-500" aria-hidden="true" />
              <span className="font-medium">5-Star Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blush-500" aria-hidden="true" />
              <span className="font-medium">15+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blush-500" aria-hidden="true" />
              <span className="font-medium">San Diego & Beyond</span>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section ref={packagesRef} id="packages" className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={packagesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-blush-500 text-sm font-medium uppercase tracking-wider">
              Choose Your Experience
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal-900 leading-tight">
              Wedding Planning Packages
            </h2>
            <p className="mt-6 text-lg text-charcoal-600 leading-relaxed">
              From intimate elopements to grand celebrations, we have the perfect
              package for your love story.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={packagesInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8"
          >
            {packages.map((pkg) => (
              <motion.article
                key={pkg.id}
                variants={itemVariants}
                className={cn(
                  "relative flex flex-col rounded-3xl overflow-hidden transition-all duration-500",
                  pkg.popular
                    ? "bg-charcoal-900 text-white shadow-2xl scale-[1.02] xl:scale-105"
                    : "bg-cream-50 hover:shadow-xl"
                )}
              >
                {/* Badge */}
                {pkg.badge && (
                  <div
                    className={cn(
                      "absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide",
                      pkg.popular
                        ? "bg-blush-500 text-white"
                        : "bg-sage-500 text-white"
                    )}
                  >
                    {pkg.badge}
                  </div>
                )}

                {/* Card Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  {/* Icon & Title */}
                  <div
                    className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center mb-4",
                      pkg.popular ? "bg-blush-500" : "bg-white shadow-sm"
                    )}
                  >
                    <pkg.icon
                      className={cn(
                        "w-6 h-6",
                        pkg.popular ? "text-white" : "text-blush-500"
                      )}
                      aria-hidden="true"
                    />
                  </div>

                  <h3
                    className={cn(
                      "text-xl font-serif font-semibold mb-1",
                      pkg.popular ? "text-white" : "text-charcoal-900"
                    )}
                  >
                    {pkg.name}
                  </h3>
                  <p
                    className={cn(
                      "text-sm mb-4",
                      pkg.popular ? "text-blush-300" : "text-blush-500"
                    )}
                  >
                    {pkg.tagline}
                  </p>

                  {/* Price */}
                  <div className="mb-4">
                    <span
                      className={cn(
                        "text-xs uppercase tracking-wide",
                        pkg.popular ? "text-charcoal-400" : "text-charcoal-500"
                      )}
                    >
                      {pkg.priceNote}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span
                        className={cn(
                          "text-4xl font-serif font-bold",
                          pkg.popular ? "text-white" : "text-charcoal-900"
                        )}
                      >
                        ${pkg.price}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className={cn(
                      "text-sm leading-relaxed mb-6",
                      pkg.popular ? "text-charcoal-300" : "text-charcoal-600"
                    )}
                  >
                    {pkg.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {pkg.features.slice(0, 7).map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check
                          className={cn(
                            "w-4 h-4 mt-0.5 flex-shrink-0",
                            pkg.popular ? "text-blush-400" : "text-sage-500"
                          )}
                          aria-hidden="true"
                        />
                        <span
                          className={cn(
                            "text-sm",
                            pkg.popular ? "text-charcoal-300" : "text-charcoal-600"
                          )}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                    {pkg.features.length > 7 && (
                      <li
                        className={cn(
                          "text-sm font-medium",
                          pkg.popular ? "text-blush-300" : "text-blush-500"
                        )}
                      >
                        + {pkg.features.length - 7} more included
                      </li>
                    )}
                  </ul>

                  {/* CTA Button */}
                  <Link href="/#contact" className="mt-auto">
                    <Button
                      className={cn(
                        "w-full",
                        pkg.popular
                          ? "bg-blush-500 hover:bg-blush-600 text-white"
                          : ""
                      )}
                      variant={pkg.popular ? "primary" : "outline"}
                      size="lg"
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>

                {/* Ideal For Footer */}
                <div
                  className={cn(
                    "px-6 sm:px-8 py-4 text-xs border-t",
                    pkg.popular
                      ? "bg-charcoal-800 border-charcoal-700 text-charcoal-400"
                      : "bg-cream-100 border-cream-200 text-charcoal-500"
                  )}
                >
                  <span className="font-semibold">Ideal for:</span> {pkg.idealFor}
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Custom Package Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={packagesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-charcoal-600">
              Need something different?{" "}
              <Link
                href="/#contact"
                className="text-blush-500 font-medium hover:text-blush-600 underline underline-offset-2"
              >
                Let&apos;s create a custom package
              </Link>{" "}
              tailored to your unique celebration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Add-Ons Section */}
      <section ref={addOnsRef} className="py-20 lg:py-32 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={addOnsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-blush-500 text-sm font-medium uppercase tracking-wider">
              Enhance Your Experience
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal-900 leading-tight">
              À La Carte Services
            </h2>
            <p className="mt-6 text-lg text-charcoal-600 leading-relaxed">
              Customize your package with additional services tailored to your needs.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={addOnsInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
          >
            {addOns.map((addon) => (
              <motion.div
                key={addon.name}
                variants={itemVariants}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex items-start justify-between gap-4"
              >
                <div>
                  <h3 className="font-serif font-semibold text-charcoal-900 mb-1">
                    {addon.name}
                  </h3>
                  <p className="text-sm text-charcoal-500">{addon.description}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-lg font-serif font-bold text-blush-600">
                    ${addon.price}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-20 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-blush-500 text-sm font-medium uppercase tracking-wider">
              Questions & Answers
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal-900 leading-tight">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={faqInView ? "visible" : "hidden"}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-cream-50 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-cream-100 transition-colors"
                  aria-expanded={openFaq === index}
                >
                  <span className="font-serif font-semibold text-charcoal-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-blush-500 transition-transform duration-300 flex-shrink-0",
                      openFaq === index ? "rotate-180" : ""
                    )}
                    aria-hidden="true"
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === index ? "auto" : 0,
                    opacity: openFaq === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-charcoal-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2070"
            alt="Beautiful San Diego beach wedding"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-charcoal-900/75" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Phone className="w-12 h-12 text-blush-400 mx-auto mb-6" aria-hidden="true" />

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white leading-tight mb-6">
              Ready to Start
              <br />
              <span className="text-blush-300">Planning?</span>
            </h2>

            <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
              Schedule your complimentary consultation. We&apos;ll discuss your vision,
              answer questions, and help you choose the perfect package.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contact">
                <Button size="lg" className="w-full sm:w-auto text-base px-8">
                  Schedule Free Consultation
                </Button>
              </Link>
              <a href="tel:+16195550123">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-base px-8 bg-transparent border-white text-white hover:bg-white hover:text-charcoal-900"
                >
                  Call (619) 555-0123
                </Button>
              </a>
            </div>

            <p className="mt-8 text-white/60 text-sm">
              No obligation • Response within 24 hours • Virtual or in-person available
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

