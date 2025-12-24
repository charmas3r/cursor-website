"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Calendar,
  Palette,
  MapPin,
  Users,
  Sparkles,
} from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Full Service Planning",
    description:
      "From engagement to 'I do,' we handle every detail. Our comprehensive planning service includes vendor sourcing, timeline creation, budget management, and complete coordination.",
    features: ["Vendor Management", "Budget Planning", "Timeline Creation"],
  },
  {
    icon: Calendar,
    title: "Day-of Coordination",
    description:
      "Already planned your dream wedding? Let us execute it flawlessly. We'll manage vendors, handle logistics, and ensure your day runs smoothly while you enjoy every moment.",
    features: ["Vendor Coordination", "Timeline Management", "Crisis Control"],
  },
  {
    icon: Palette,
    title: "Design & Styling",
    description:
      "Transform your vision into reality with our expert design team. From florals to tablescapes, we create cohesive aesthetics that tell your unique love story.",
    features: ["Floral Design", "Tablescapes", "Décor Styling"],
  },
  {
    icon: MapPin,
    title: "Destination Weddings",
    description:
      "Dreaming of saying 'I do' somewhere special? We specialize in destination weddings, handling all the logistics so you can focus on the romance.",
    features: ["Travel Coordination", "Local Vendors", "Guest Management"],
  },
  {
    icon: Users,
    title: "Elopement Packages",
    description:
      "Intimate celebrations deserve the same attention to detail. Our elopement packages create magical moments for just the two of you.",
    features: ["Ceremony Planning", "Photography", "Special Touches"],
  },
  {
    icon: Sparkles,
    title: "Custom Experiences",
    description:
      "Every love story is unique. We create bespoke wedding experiences tailored to your personality, culture, and dreams.",
    features: ["Personalized Planning", "Unique Venues", "Cultural Touches"],
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

  return (
    <section id="packages" className="py-24 lg:py-32 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-blush-500 text-sm font-medium uppercase tracking-wider">
            Our Packages
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-serif font-medium text-charcoal-900 leading-tight">
            Beautifully Tailored
            <br />
            Celebrations
          </h2>
          <p className="mt-6 text-lg text-charcoal-600 leading-relaxed">
            Blending elegance with personal touches, we offer tailored packages
            to transform your unique vision into an unforgettable celebration.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative bg-cream-50 rounded-3xl p-8 hover:bg-white hover:shadow-xl transition-all duration-500"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:bg-blush-50 transition-colors duration-300">
                <service.icon className="w-7 h-7 text-blush-500" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-serif font-semibold text-charcoal-900 mb-3">
                {service.title}
              </h3>
              <p className="text-charcoal-600 text-sm leading-relaxed mb-6">
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

              {/* Hover Arrow */}
              <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full bg-charcoal-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Button size="lg">View All Packages</Button>
        </motion.div>
      </div>
    </section>
  );
}

