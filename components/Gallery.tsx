"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  {
    src: "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767238915/processed-0BD72AEF-0A56-4593-ABEA-77E23268FE0F_li8lqo.webp",
    alt: "Beautiful wedding ceremony moment captured in San Diego",
    span: "col-span-2 row-span-2",
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 50vw",
  },
  {
    src: "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767238923/KSP_EMEZIETEASER25_zc7ftq.webp",
    alt: "Romantic wedding portrait",
    span: "col-span-1 row-span-1",
    sizes: "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",
  },
  {
    src: "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767238922/processed-F6C355EA-4876-41AF-A491-FC3A51C2C1AF_raelqt.webp",
    alt: "Elegant wedding celebration",
    span: "col-span-1 row-span-1",
    sizes: "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",
  },
  {
    src: "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767238917/2325_Lauren_Blake_ovdwtq.webp",
    alt: "Intimate wedding moment",
    span: "col-span-1 row-span-2",
    sizes: "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",
  },
  {
    src: "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767238917/0778_Lauren_Blake_bw2fms.webp",
    alt: "Wedding couple portrait",
    span: "col-span-1 row-span-1",
    sizes: "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",
  },
  {
    src: "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767238916/processed-3D35C4F5-6C07-4E79-A687-AA8E951B3BCC_xc8zra.webp",
    alt: "Beautiful wedding details",
    span: "col-span-1 row-span-1",
    sizes: "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",
  },
  {
    src: "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767238916/94_wlcu6e.webp",
    alt: "Wedding ceremony highlight",
    span: "col-span-1 row-span-1",
    sizes: "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",
  },
  {
    src: "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767238916/193A3369-2_whxoym.webp",
    alt: "Stunning wedding photography",
    span: "col-span-1 row-span-1",
    sizes: "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",
  },
  {
    src: "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767238916/processed-F029BA29-96A0-4FEA-9EDE-0D0183AA50FB_vvaatc.webp",
    alt: "Wedding reception moment",
    span: "col-span-1 row-span-2",
    sizes: "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",
  },
  {
    src: "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767238916/4W9A4932_w7mghz.webp",
    alt: "Couple celebration",
    span: "col-span-1 row-span-1",
    sizes: "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",
  },
  {
    src: "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767238915/KSP_EMEZIETEASER15_cqs7ub.webp",
    alt: "San Diego wedding memories",
    span: "col-span-1 row-span-1",
    sizes: "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",
  },
  {
    src: "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767238916/0026_MICHAEL_and_ANNA_COSTA_PHOTOGRAPHY_ozsksn.webp",
    alt: "Michael and Anna wedding photography",
    span: "col-span-1 row-span-1",
    sizes: "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",
  },
  {
    src: "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767238916/804_uhe3c1.webp",
    alt: "Wedding celebration moment",
    span: "col-span-1 row-span-1",
    sizes: "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",
  },
];

export default function Gallery(): JSX.Element {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  return (
    <>
      <section id="portfolio" className="py-16 sm:py-20 lg:py-32 bg-white" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16"
          >
            <span className="text-blush-500 text-xs sm:text-sm font-medium uppercase tracking-wider">
              Portfolio
            </span>
            <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal-900 leading-tight">
              Wedding Portfolio Gallery
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-charcoal-600 leading-relaxed px-4 sm:px-0">
              Every wedding tells a unique love story. Here are some of the
              beautiful moments we&apos;ve had the honor of creating.
            </p>
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 auto-rows-[140px] sm:auto-rows-[180px] md:auto-rows-[200px]"
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * Math.min(index, 6) }}
                className={`relative rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer ${image.span}`}
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={image.sizes}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/30 transition-all duration-500" />

                {/* Hover Content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <svg
                      className="w-5 h-5 text-charcoal-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View More */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <a 
              href="/portfolio"
              className="inline-flex items-center gap-2 text-charcoal-900 font-medium hover:text-blush-500 transition-colors group"
            >
              View Full Portfolio
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
            </a>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal-900/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 sm:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 sm:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Image */}
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full max-w-6xl max-h-[85vh] mx-4 sm:mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[currentImageIndex].src}
                alt={galleryImages[currentImageIndex].alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Image Counter */}
            <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 text-white text-sm">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
