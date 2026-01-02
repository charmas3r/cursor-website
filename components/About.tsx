"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "100+", label: "Weddings Planned" },
  { value: "20+", label: "Years in Hospitality" },
  { value: "50+", label: "Vendor Partners" },
  { value: "100%", label: "Happy Couples" },
];

export default function About(): JSX.Element {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-32 bg-cream-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-24 items-center">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
              <Image
                src="https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767238917/KSP_EMEZIETEASER42_r7wmom.webp"
                alt="Wedding planning team at work"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-4 -right-4 sm:-bottom-8 sm:-right-8 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg sm:shadow-xl max-w-[180px] sm:max-w-[240px]"
            >
              <p className="text-4xl font-serif font-semibold text-charcoal-900">
                15+
              </p>
              <p className="text-sm text-charcoal-600 mt-1">
                Years creating magical moments in San Diego
              </p>
            </motion.div>

            {/* Decorative element */}
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-blush-200/50 blur-xl" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <span className="text-blush-500 text-xs sm:text-sm font-medium uppercase tracking-wider">
              About Us
            </span>
            <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal-900 leading-tight">
              About Our Wedding
              <br />
              Planning Services
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-charcoal-600 leading-relaxed">
              Welcome to Wedding Agency San Diego, where creativity, passion, and
              attention to detail come together to craft unforgettable weddings.
              Nestled in the heart of Southern California, we specialize in
              transforming your unique vision into a beautifully tailored celebration.
            </p>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-charcoal-600 leading-relaxed">
              Whether you dream of an intimate beachfront ceremony or a lavish
              desert affair, our dedicated team is here to guide you every step
              of the way, ensuring a seamless, stress-free experience. Let us
              bring your wedding dreams to life with unparalleled excellence and
              personalized care.
            </p>

            {/* Stats */}
            <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-3 sm:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm"
                >
                  <p className="text-2xl sm:text-3xl font-serif font-semibold text-charcoal-900">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm text-charcoal-500 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-8 sm:mt-10"
            >
              <Link href="/about#team">
                <Button size="lg" className="w-full sm:w-auto">
                  Meet Our Team
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
