"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
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
  Users,
  Star,
  ArrowLeft,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Quote,
} from "lucide-react";
import { urlFor } from "@/lib/sanity";
import type { Couple, SanityImage } from "@/types/sanity";

interface Props {
  couple: Couple;
}

export default function CoupleGallery({ couple }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroRef = useRef(null);
  const reviewRef = useRef(null);
  const detailsRef = useRef(null);
  const galleryRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const reviewInView = useInView(reviewRef, { once: true, margin: "-100px" });
  const detailsInView = useInView(detailsRef, { once: true, margin: "-100px" });
  const galleryInView = useInView(galleryRef, { once: true, margin: "-100px" });

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
      prev === couple.galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? couple.galleryImages.length - 1 : prev - 1
    );
  };

  // Helper function to get image URL from Sanity image
  const getImageUrl = (image: SanityImage, width?: number, height?: number) => {
    let builder = urlFor(image);
    if (width) builder = builder.width(width);
    if (height) builder = builder.height(height);
    return builder.url();
  };

  // Format the wedding date for display
  const formatWeddingDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className="relative">
      <Navigation />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[85vh] flex items-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          {couple.heroImage && (
            <Image
              src={getImageUrl(couple.heroImage, 1920, 1080)}
              alt={couple.heroImage.alt || `${couple.names} wedding at ${couple.venue}`}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/50 to-transparent" />
        </div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute top-24 left-4 sm:left-8 z-10"
        >
          <Link href="/portfolio">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
        </motion.div>

        {/* Hero Content */}
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Date Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-6">
              <Calendar className="w-4 h-4" />
              {formatWeddingDate(couple.weddingDate)}
            </div>

            {/* Names */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-white leading-tight mb-4">
              {couple.names}
            </h1>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl text-blush-300 font-medium mb-6">
              {couple.tagline}
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blush-400" />
                <span>{couple.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blush-400" />
                <span>{couple.location}</span>
              </div>
              {couple.guestCount && (
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blush-400" />
                  <span>{couple.guestCount} Guests</span>
                </div>
              )}
              {couple.style && (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blush-400" />
                  <span>{couple.style}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-blush-400"
            />
          </div>
        </motion.div>
      </section>

      {/* Couple's Review Section */}
      {couple.review && couple.review.text && (
        <section ref={reviewRef} className="py-20 lg:py-28 bg-cream-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={reviewInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Quote Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blush-100 mb-8">
                <Quote className="w-8 h-8 text-blush-500" />
              </div>

              {/* Star Rating */}
              <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: couple.review.rating || 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-blush-500 fill-blush-500"
                  />
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif text-charcoal-800 leading-relaxed italic mb-8">
                &ldquo;{couple.review.text}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-blush-300" />
                <span className="text-blush-600 font-medium">{couple.names}</span>
                <div className="h-px w-12 bg-blush-300" />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Wedding Details Section */}
      <section ref={detailsRef} className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={detailsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-blush-500 text-sm font-medium uppercase tracking-wider">
              Wedding Details
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-serif font-medium text-charcoal-900">
              The Dream Team
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Venue Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={detailsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-cream-50 rounded-3xl p-8 border border-cream-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blush-100 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-blush-600" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-charcoal-900">
                  Venue
                </h3>
              </div>

              <div className="space-y-3">
                <p className="text-lg font-medium text-charcoal-800">
                  {couple.venue}
                </p>
                <p className="text-charcoal-600">{couple.location}</p>
                {couple.venueUrl && (
                  <a
                    href={couple.venueUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blush-600 hover:text-blush-700 font-medium text-sm transition-colors"
                  >
                    Visit Venue
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Colors */}
              {couple.colors && couple.colors.length > 0 && (
                <div className="mt-6 pt-6 border-t border-cream-300">
                  <p className="text-sm font-medium text-charcoal-700 mb-3">
                    Color Palette
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {couple.colors.map((color, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-white text-charcoal-600 text-sm border border-cream-300"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Vendors Card */}
            {couple.vendors && couple.vendors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={detailsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-cream-50 rounded-3xl p-8 border border-cream-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blush-100 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-blush-600" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-charcoal-900">
                    Vendor Team
                  </h3>
                </div>

                <ul className="space-y-4">
                  {couple.vendors.map((vendor, i) => (
                    <li key={i} className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-charcoal-500">{vendor.role}</p>
                        <p className="font-medium text-charcoal-800">
                          {vendor.name}
                        </p>
                      </div>
                      {vendor.url && (
                        <a
                          href={vendor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blush-500 hover:text-blush-600 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Highlights Card */}
            {couple.highlights && couple.highlights.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={detailsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-cream-50 rounded-3xl p-8 border border-cream-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blush-100 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-blush-600" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-charcoal-900">
                    Highlights
                  </h3>
                </div>

                <ul className="space-y-3">
                  {couple.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Star className="w-4 h-4 text-blush-500 fill-blush-500 mt-1 flex-shrink-0" />
                      <span className="text-charcoal-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section ref={galleryRef} className="py-20 lg:py-28 bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={galleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-blush-400 text-sm font-medium uppercase tracking-wider">
              Captured Moments
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-serif font-medium text-white">
              Wedding Gallery
            </h2>
            <p className="mt-4 text-charcoal-400 max-w-2xl mx-auto">
              Click any image to view in full screen
            </p>
          </motion.div>

          {/* Masonry-style Gallery Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={galleryInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {couple.galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={galleryInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`relative cursor-pointer group overflow-hidden rounded-2xl ${
                  index % 5 === 0 ? "row-span-2" : ""
                }`}
                onClick={() => openLightbox(index)}
              >
                <div
                  className={`relative ${
                    index % 5 === 0 ? "h-[400px] sm:h-[500px]" : "h-[200px] sm:h-[250px]"
                  }`}
                >
                  <Image
                    src={getImageUrl(image, 800, index % 5 === 0 ? 1000 : 500)}
                    alt={image.alt || `${couple.names} wedding photo ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/30 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-charcoal-900" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24 bg-cream-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Heart className="w-12 h-12 text-blush-400 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal-900 mb-6">
              Ready to Create Your
              <br />
              <span className="text-blush-500">Own Love Story?</span>
            </h2>
            <p className="text-lg text-charcoal-600 mb-10 max-w-2xl mx-auto">
              Let us bring your wedding vision to life with the same care, creativity,
              and attention to detail you see here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contact">
                <Button size="lg">Schedule Consultation</Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" size="lg">
                  View More Weddings
                </Button>
              </Link>
            </div>
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
                src={getImageUrl(couple.galleryImages[currentImageIndex], 1920, 1080)}
                alt={couple.galleryImages[currentImageIndex].alt || `${couple.names} wedding photo ${currentImageIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Image Counter */}
            <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 text-white text-sm">
              {currentImageIndex + 1} / {couple.galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
