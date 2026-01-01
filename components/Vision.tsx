"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function Vision(): JSX.Element {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 lg:py-36 overflow-hidden bg-charcoal-900"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-blush-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-cream-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0">
              {/* Main Image */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767238915/554_aylmim.webp"
                  alt="Intimate wedding ceremony moment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/30 to-transparent" />
              </div>

              {/* Floating accent image */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -bottom-8 -right-8 lg:-right-16 w-40 sm:w-48 lg:w-56 h-32 sm:h-40 lg:h-44 rounded-2xl overflow-hidden shadow-xl border-4 border-charcoal-900"
              >
                <Image
                  src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070"
                  alt="Beautiful wedding floral arrangement"
                  fill
                  className="object-cover"
                  sizes="250px"
                />
              </motion.div>

              {/* Decorative frame */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-blush-400/50 rounded-tl-3xl" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-blush-400/50 rounded-br-3xl" />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-blush-400 text-sm font-medium uppercase tracking-[0.2em]">
              Our Vision
            </span>

            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-white leading-tight">
              Intention, Balance
              <br />
              <span className="text-blush-400">& Care</span>
            </h2>

            <div className="mt-8 space-y-6">
              <p className="text-lg text-charcoal-300 leading-relaxed">
                We exist to plan extraordinary weddings with intention, balance, and 
                care—supporting your mental and physical well-being while delivering 
                seamless execution and uncompromising excellence from start to finish.
              </p>

              <p className="text-charcoal-400 leading-relaxed">
                From the rolling hills of Temecula wine country to the sun-kissed 
                shores of La Jolla, we transform Southern California&apos;s most 
                breathtaking venues into deeply personal celebrations. Every detail 
                is curated with care, so you can be fully present for your big day.
              </p>
            </div>

            {/* Differentiators */}
            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              {[
                {
                  title: "Intentional Planning",
                  description: "Every decision made with purpose, creating celebrations that truly reflect you.",
                },
                {
                  title: "Wellness-Focused",
                  description: "Supporting your mental and physical well-being throughout the planning journey.",
                },
                {
                  title: "Seamless Execution",
                  description: "20+ years in hospitality means flawless coordination on your big day.",
                },
                {
                  title: "Uncompromising Excellence",
                  description: "From the smallest detail to the grandest moment—nothing less than exceptional.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="group"
                >
                  <h3 className="text-white font-serif font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-blush-400 rounded-full group-hover:scale-125 transition-transform" />
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-charcoal-400">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-10 pt-8 border-t border-charcoal-700"
            >
              <blockquote className="text-lg sm:text-xl font-serif italic text-charcoal-300">
                &ldquo;Your wedding should feel as good as it looks.&rdquo;
              </blockquote>
              <p className="mt-3 text-sm text-blush-400 font-medium">
                — Our Promise to You
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

