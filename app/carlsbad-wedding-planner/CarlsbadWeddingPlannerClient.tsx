"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { urlFor } from "@/lib/sanity";
import type { VenueDocument } from "@/types/sanity";
import {
  MapPin,
  Star,
  Heart,
  Award,
  Check,
  ArrowRight,
  Calendar,
  Phone,
  Waves,
  Building2,
  Sun,
  Flower2,
  ExternalLink,
} from "lucide-react";

interface CarlsbadWeddingPlannerClientProps {
  carlsbadVenues: VenueDocument[];
}

// Why Carlsbad content
const whyCarlsbad = [
  {
    title: "World-Famous Flower Fields",
    description: "The iconic Carlsbad Flower Fields offer stunning seasonal backdrops with 50 acres of colorful ranunculus blooms.",
    icon: Flower2,
  },
  {
    title: "Luxury Resort Venues",
    description: "Home to Park Hyatt Aviara and Omni La Costa, two of Southern California's most prestigious resort destinations.",
    icon: Building2,
  },
  {
    title: "Perfect Beach Weather",
    description: "Carlsbad's 7 miles of pristine coastline enjoy year-round ideal weather for outdoor ceremonies.",
    icon: Sun,
  },
  {
    title: "Charming Village Atmosphere",
    description: "The quaint Carlsbad Village offers boutique shopping, fine dining, and coastal charm for your guests.",
    icon: Waves,
  },
];

// Helper to format venue type for display
function formatVenueType(type: string | undefined): string {
  if (!type) return "Venue";
  const typeMap: Record<string, string> = {
    "golf-course": "Golf Course",
    "resort": "Resort",
    "winery": "Winery",
    "estate": "Estate",
    "beach": "Beach",
    "garden": "Garden",
    "hotel": "Hotel",
    "historic": "Historic Venue",
    "private-club": "Private Club",
    "other": "Venue",
  };
  return typeMap[type] || "Venue";
}

export default function CarlsbadWeddingPlannerClient({ carlsbadVenues }: CarlsbadWeddingPlannerClientProps): JSX.Element {
  const heroRef = useRef(null);
  const venuesRef = useRef(null);
  const whyRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const venuesInView = useInView(venuesRef, { once: true, margin: "-100px" });
  const whyInView = useInView(whyRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative min-h-[80vh] flex items-center overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=2070"
              alt="Carlsbad Flower Fields wedding venue"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/80 via-charcoal-900/50 to-charcoal-900/30" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <Link href="/san-diego-wedding-planner" className="hover:text-white transition-colors">San Diego</Link>
                <span>/</span>
                <span className="text-blush-300">Carlsbad</span>
              </nav>

              <span className="inline-flex items-center gap-2 px-4 py-2 bg-blush-500/20 backdrop-blur-sm rounded-full text-blush-200 text-sm font-medium mb-6">
                <MapPin className="w-4 h-4" />
                Carlsbad, California
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-white leading-tight">
                Carlsbad
                <br />
                <span className="text-blush-300">Wedding Planner</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-cream-100/90 leading-relaxed max-w-2xl">
                Your expert guide to planning the perfect Carlsbad wedding. From breathtaking ceremonies at The Flower Fields to elegant resort celebrations at Park Hyatt Aviara, we create unforgettable coastal experiences.
              </p>

              {/* Stats */}
              <div className="mt-10 flex flex-wrap gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <Heart className="w-6 h-6 text-blush-300" />
                  </div>
                  <div>
                    <p className="text-2xl font-serif font-semibold text-white">25+</p>
                    <p className="text-sm text-white/70">Carlsbad Weddings</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-serif font-semibold text-white">5.0</p>
                    <p className="text-sm text-white/70">Google Rating</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <Award className="w-6 h-6 text-blush-300" />
                  </div>
                  <div>
                    <p className="text-2xl font-serif font-semibold text-white">5×</p>
                    <p className="text-sm text-white/70">Award Winner</p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/#contact" onClick={() => umami.track("cta_click_consultation", { location: "carlsbad_hero" })}>
                  <Button size="lg" className="w-full sm:w-auto px-8">
                    Free Consultation
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/portfolio" onClick={() => umami.track("cta_click_portfolio", { location: "carlsbad_hero" })}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto px-8 bg-white/10 border-white/30 text-white hover:bg-white/20"
                  >
                    View Carlsbad Weddings
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Carlsbad Section */}
        <section ref={whyRef} className="py-20 lg:py-28 bg-cream-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={whyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <span className="text-blush-500 text-sm font-medium uppercase tracking-wider">
                The Perfect Setting
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal-900">
                Why Get Married in Carlsbad?
              </h2>
              <p className="mt-6 text-lg text-charcoal-600">
                Known for its world-famous Flower Fields, pristine beaches, and luxury resorts, Carlsbad offers a perfect blend of natural beauty and refined elegance for your celebration.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyCarlsbad.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={whyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-blush-100 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-blush-500" />
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-charcoal-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-charcoal-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Carlsbad Venues Section - Dynamic from Sanity */}
        <section ref={venuesRef} className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={venuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <span className="text-blush-500 text-sm font-medium uppercase tracking-wider">
                Premier Locations
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal-900">
                Carlsbad Wedding Venues
              </h2>
              <p className="mt-6 text-lg text-charcoal-600">
                We&apos;ve planned weddings at Carlsbad&apos;s most stunning venues and know exactly how to bring your vision to life at each one.
              </p>
            </motion.div>

            {carlsbadVenues.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {carlsbadVenues.map((venue, index) => (
                  <motion.div
                    key={venue._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={venuesInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
                  >
                    <div className="relative h-64">
                      {venue.image?.asset ? (
                        <Image
                          src={urlFor(venue.image).width(600).height(400).url()}
                          alt={venue.image.alt || `${venue.name} wedding venue in Carlsbad`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-cream-200 flex items-center justify-center">
                          <Building2 className="w-16 h-16 text-cream-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent" />
                      {venue.preferredVendor && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-blush-500 text-white text-xs font-medium rounded-full flex items-center gap-1.5">
                          <Award className="w-3 h-3" />
                          Preferred Vendor
                        </div>
                      )}
                      {venue.website && (
                        <a
                          href={venue.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => umami.track("link_click_venue_external", { venue: venue.name, location: "carlsbad_venues" })}
                          className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-charcoal-600 hover:bg-white hover:text-blush-500 transition-colors"
                          aria-label={`Visit ${venue.name} website`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="text-blush-300 text-sm font-medium">
                        {formatVenueType(venue.type)}
                      </span>
                      <h3 className="text-xl font-serif font-semibold text-white mt-1">
                        {venue.name}
                      </h3>
                      {venue.description && (
                        <p className="text-white/70 text-sm mt-2 line-clamp-2">
                          {venue.description}
                        </p>
                      )}
                      {venue.weddingCount && venue.weddingCount > 0 && (
                        <p className="text-blush-200 text-xs mt-2">
                          {venue.weddingCount} wedding{venue.weddingCount !== 1 ? "s" : ""} planned here
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Building2 className="w-16 h-16 text-charcoal-300 mx-auto mb-4" />
                <p className="text-charcoal-500 mb-4">
                  Carlsbad venues coming soon. Check back later!
                </p>
                <Link href="/san-diego-wedding-planner">
                  <Button variant="outline">
                    View All San Diego Venues
                  </Button>
                </Link>
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={venuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 text-center"
            >
              <p className="text-charcoal-600 mb-6">
                Not sure which venue is right for you? We&apos;ll help you find the perfect match.
              </p>
              <Link href="/#contact" onClick={() => umami.track("cta_click_venue_guidance", { location: "carlsbad_venues" })}>
                <Button variant="outline" size="lg">
                  Get Venue Recommendations
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 lg:py-28 bg-charcoal-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <span className="text-blush-400 text-sm font-medium uppercase tracking-wider">
                  Our Services
                </span>
                <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-serif font-medium leading-tight">
                  Carlsbad Wedding
                  <br />
                  <span className="text-blush-300">Planning Services</span>
                </h2>
                <p className="mt-6 text-lg text-charcoal-300 leading-relaxed">
                  Whether you&apos;re planning a romantic ceremony at The Flower Fields or a grand celebration at Park Hyatt Aviara, we offer comprehensive planning services tailored to Carlsbad&apos;s unique coastal charm.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    "Full-service wedding planning & design",
                    "Day-of coordination & management",
                    "Resort venue selection & coordination",
                    "Flower Fields seasonal planning",
                    "Luxury vendor recommendations",
                    "Destination guest coordination",
                  ].map((service) => (
                    <div key={service} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-blush-500/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-blush-400" />
                      </div>
                      <span className="text-charcoal-200">{service}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Link href="/packages" onClick={() => umami.track("cta_click_view_packages", { location: "carlsbad_services" })}>
                    <Button size="lg" className="w-full sm:w-auto">
                      View Packages
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/san-diego-wedding-planner" onClick={() => umami.track("cta_click_all_services", { location: "carlsbad_services" })}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto bg-transparent border-white/30 text-white hover:bg-white/10"
                    >
                      All Services
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767238916/193A3369-2_whxoym.webp"
                    alt="Carlsbad wedding ceremony planning"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Stats overlay */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-blush-100 flex items-center justify-center">
                      <Calendar className="w-7 h-7 text-blush-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-serif font-bold text-charcoal-900">20+</p>
                      <p className="text-sm text-charcoal-600">Years Experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section ref={ctaRef} className="py-20 lg:py-28 bg-gradient-to-br from-cream-50 to-blush-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blush-100 mb-6">
                <Phone className="w-8 h-8 text-blush-500" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal-900">
                Ready to Plan Your
                <br />
                <span className="text-blush-500">Carlsbad Wedding?</span>
              </h2>
              <p className="mt-6 text-lg text-charcoal-600 max-w-2xl mx-auto">
                Let&apos;s discuss your vision for a beautiful Carlsbad celebration. Schedule a complimentary consultation and discover how we can bring your coastal wedding dreams to life.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/#contact" onClick={() => umami.track("cta_click_consultation_final", { location: "carlsbad_cta" })}>
                  <Button size="lg" className="w-full sm:w-auto px-10">
                    Schedule Free Consultation
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <a href="tel:+17602167427" onClick={() => umami.track("link_click_phone", { location: "carlsbad_cta" })}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto px-10"
                  >
                    Call (760) 216-7427
                  </Button>
                </a>
              </div>

              <p className="mt-6 text-sm text-charcoal-500">
                Serving Carlsbad, San Diego, and all of Southern California
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
