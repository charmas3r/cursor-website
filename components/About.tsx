"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "500+", label: "Weddings Planned" },
  { value: "15+", label: "Years Experience" },
  { value: "50+", label: "Vendor Partners" },
  { value: "100%", label: "Happy Couples" },
];

export default function About(): JSX.Element {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 lg:py-32 bg-cream-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069"
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
              className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-6 shadow-xl max-w-[240px]"
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
            <span className="text-blush-500 text-sm font-medium uppercase tracking-wider">
              About Us
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-serif font-medium text-charcoal-900 leading-tight">
              Creativity, Passion
              <br />
              & Attention to Detail
            </h2>
            <p className="mt-6 text-lg text-charcoal-600 leading-relaxed">
              Welcome to Wedding Agency San Diego, where creativity, passion, and
              attention to detail come together to craft unforgettable weddings.
              Nestled in the heart of Southern California, we specialize in
              transforming your unique vision into a beautifully tailored celebration.
            </p>
            <p className="mt-4 text-lg text-charcoal-600 leading-relaxed">
              Whether you dream of an intimate beachfront ceremony or a lavish
              desert affair, our dedicated team is here to guide you every step
              of the way, ensuring a seamless, stress-free experience. Let us
              bring your wedding dreams to life with unparalleled excellence and
              personalized care.
            </p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-2xl p-5 shadow-sm"
                >
                  <p className="text-3xl font-serif font-semibold text-charcoal-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-charcoal-500 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-10"
            >
              <Button size="lg">Meet Our Team</Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

