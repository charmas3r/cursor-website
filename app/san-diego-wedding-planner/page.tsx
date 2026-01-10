"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
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
  Award,
  Phone,
  ChevronDown,
  ArrowRight,
  Users,
  Clock,
  Building2,
  ExternalLink,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";
import VenueMap from "@/components/VenueMap";

// Southern California service areas with coordinates
const serviceAreas = [
  {
    name: "San Diego",
    description: "Downtown, Gaslamp, Harbor views",
    venues: 45,
    featured: true,
    coordinates: { lat: 32.7157, lng: -117.1611 },
  },
  {
    name: "La Jolla",
    description: "Oceanfront elegance & coastal charm",
    venues: 18,
    featured: true,
    coordinates: { lat: 32.8328, lng: -117.2713 },
    link: "/la-jolla-wedding-planner",
  },
  {
    name: "Coronado",
    description: "Historic beach resort weddings",
    venues: 12,
    featured: true,
    coordinates: { lat: 32.6859, lng: -117.1831 },
  },
  {
    name: "Del Mar",
    description: "Blufftop ocean ceremonies",
    venues: 10,
    featured: false,
    coordinates: { lat: 32.9595, lng: -117.2653 },
  },
  {
    name: "Carlsbad",
    description: "Flower fields & coastal resorts",
    venues: 14,
    featured: false,
    coordinates: { lat: 33.1581, lng: -117.3506 },
  },
  {
    name: "Rancho Santa Fe",
    description: "Estate weddings & golf clubs",
    venues: 8,
    featured: true,
    coordinates: { lat: 33.0164, lng: -117.2028 },
  },
  {
    name: "Temecula",
    description: "Wine country romance",
    venues: 25,
    featured: true,
    coordinates: { lat: 33.4936, lng: -117.1484 },
  },
  {
    name: "Fallbrook",
    description: "Rustic vineyard charm",
    venues: 6,
    featured: false,
    coordinates: { lat: 33.3764, lng: -117.2511 },
  },
  {
    name: "Encinitas",
    description: "Bohemian beach vibes",
    venues: 8,
    featured: false,
    coordinates: { lat: 33.0369, lng: -117.2919 },
  },
  {
    name: "Orange County",
    description: "Laguna Beach to Newport",
    venues: 30,
    featured: false,
    coordinates: { lat: 33.7175, lng: -117.8311 },
  },
];

// Quick packages for the services page
const packages = [
  {
    id: "wedding-management",
    name: "Wedding Management",
    tagline: "Sweet Heart Package",
    price: "$3,500",
    description: "Complete wedding management and day-of coordination for couples who've planned but need expert execution.",
    popular: true,
    features: ["Detailed timeline creation", "Vendor coordination", "Up to 12 hours coverage", "Ceremony rehearsal"],
  },
  {
    id: "partial",
    name: "Partial Planning",
    tagline: "Premier Package",
    price: "$6,500",
    description: "The perfect balance—professional guidance on key decisions while you maintain creative control.",
    popular: true,
    badge: "Most Popular",
    features: ["Monthly planning meetings", "Vendor recommendations", "Budget tracking", "Design concept development"],
  },
  {
    id: "full-service",
    name: "Full Service",
    tagline: "Ever After Package",
    price: "$11,000+",
    description: "From engagement to honeymoon—we handle every detail with unparalleled attention and care.",
    popular: false,
    features: ["Complete vendor sourcing", "Full budget management", "Custom design & styling", "Rehearsal dinner planning"],
  },
];

// Stats for authority
const stats = [
  { value: "100+", label: "Weddings Planned", icon: Heart },
  { value: "20+", label: "Years Experience", icon: Clock },
  { value: "5.0", label: "Average Rating", icon: Star },
  { value: "3×", label: "Award Winner", icon: Award },
];

// Venue locations for the map (sample data - would come from Sanity in production)
const venueLocations = [
  { name: "Twin Oaks Golf Course", lat: 33.2147, lng: -117.1056 },
  { name: "Rancho Valencia Resort", lat: 33.0089, lng: -117.2019 },
  { name: "Hotel del Coronado", lat: 32.6810, lng: -117.1780 },
  { name: "The Lodge at Torrey Pines", lat: 32.9005, lng: -117.2467 },
  { name: "Bernardo Winery", lat: 33.0601, lng: -117.0661 },
  { name: "Estancia La Jolla", lat: 32.8598, lng: -117.2249 },
  { name: "Mount Palomar Winery", lat: 33.3547, lng: -117.0022 },
  { name: "Fairmont Grand Del Mar", lat: 32.9419, lng: -117.2089 },
  { name: "The Prado at Balboa Park", lat: 32.7316, lng: -117.1453 },
  { name: "US Grant Hotel", lat: 32.7198, lng: -117.1628 },
];

// Preferred venues data (would come from Sanity)
const preferredVenues = [
  {
    name: "Twin Oaks Golf Course",
    location: "San Marcos, CA",
    weddingCount: 8,
    image: "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767246459/2025.11.21_-_Jessica_Ian_-_Twin_Oaks_Golf_Course-847_websize_rqud58.jpg",
    url: "https://twinoaksgc.com",
  },
  {
    name: "Rancho Valencia Resort",
    location: "Rancho Santa Fe, CA",
    weddingCount: 5,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070",
    url: "https://www.ranchovalencia.com",
  },
  {
    name: "Hotel del Coronado",
    location: "Coronado, CA",
    weddingCount: 6,
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2070",
    url: "https://hoteldel.com",
  },
  {
    name: "The Lodge at Torrey Pines",
    location: "La Jolla, CA",
    weddingCount: 4,
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070",
    url: "https://lodgetorreypines.com",
  },
  {
    name: "Estancia La Jolla",
    location: "La Jolla, CA",
    weddingCount: 3,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098",
    url: "https://estancialajolla.com",
  },
  {
    name: "Fairmont Grand Del Mar",
    location: "San Diego, CA",
    weddingCount: 4,
    image: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?q=80&w=2090",
    url: "https://fairmont.com/san-diego",
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

export default function SanDiegoWeddingPlannerPage(): JSX.Element {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const servicesRef = useRef(null);
  const mapRef = useRef(null);
  const packagesRef = useRef(null);
  const venuesRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" });
  const mapInView = useInView(mapRef, { once: true, margin: "-100px" });
  const packagesInView = useInView(packagesRef, { once: true, margin: "-100px" });
  const venuesInView = useInView(venuesRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  const [activeArea, setActiveArea] = useState<string | null>(null);

  return (
    <main className="relative">
      <Navigation />

      {/* Hero Section - Authority Establishment */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Video/Image */}
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767246459/2025.11.21_-_Jessica_Ian_-_Twin_Oaks_Golf_Course-847_websize_rqud58.jpg"
            alt="San Diego wedding ceremony at sunset"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/60 via-charcoal-900/40 to-charcoal-900/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/50 via-transparent to-charcoal-900/50" />
        </div>

        {/* Floating badges */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={heroInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute left-6 lg:left-12 top-1/3 hidden lg:block"
        >
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blush-100 flex items-center justify-center">
                <Award className="w-6 h-6 text-blush-600" />
              </div>
              <div>
                <p className="text-xs text-charcoal-500 uppercase tracking-wider">2024 & 2025</p>
                <p className="font-serif font-semibold text-charcoal-900">The Knot Best of Weddings</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={heroInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="absolute right-6 lg:right-12 top-1/2 hidden lg:block"
        >
          <a
            href="https://share.google/Pltvlw9njBabd209x"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => umami.track("link_click_google_reviews_badge", { location: "sd_planner_hero" })}
            className="group block bg-white rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex flex-col gap-3">
              {/* Google Logo */}
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-xs font-medium text-charcoal-500 uppercase tracking-wide">Google Reviews</span>
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-charcoal-900">5.0</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
              
              {/* CTA */}
              <p className="text-sm text-blush-500 font-medium group-hover:text-blush-600 transition-colors">
                Read reviews →
              </p>
            </div>
          </a>
        </motion.div>

        {/* Main Content */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-full border border-white/30 mb-8"
            >
              <MapPin className="w-4 h-4 text-blush-300" />
              <span className="text-sm font-medium text-white">San Diego&apos;s Premier Wedding Planner</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-medium text-white leading-[1.05] tracking-tight">
              San Diego
              <br />
              <span className="text-blush-300">Wedding Planner</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
            >
              Award-winning wedding planning services across Southern California.
              <br className="hidden sm:block" />
              <span className="text-blush-200 font-medium">100+ weddings</span> planned with{" "}
              <span className="text-blush-200 font-medium">20+ years</span> of hospitality expertise.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/#contact"
                onClick={() => umami.track("cta_click_free_consultation", { location: "sd_planner_hero" })}
              >
                <Button size="lg" className="w-full sm:w-auto text-base px-8 py-6 bg-blush-500 hover:bg-blush-600">
                  Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link
                href="#packages"
                onClick={() => umami.track("cta_click_view_packages", { location: "sd_planner_hero" })}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-base px-8 py-6 bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20"
                >
                  View Packages
                </Button>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1.5 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm"
            >
              <a
                href="https://share.google/Pltvlw9njBabd209x"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => umami.track("link_click_google_business", { location: "sd_planner_hero" })}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>5.0 on Google</span>
              </a>
              <div className="w-1 h-1 rounded-full bg-white/40 hidden sm:block" />
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>Woman-Owned Business</span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        id="stats"
        className="relative py-16 lg:py-20 bg-charcoal-900 overflow-hidden"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blush-500/20 mb-4">
                  <stat.icon className="w-7 h-7 text-blush-400" />
                </div>
                <div className="text-4xl lg:text-5xl font-serif font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Testimonials CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Link
              href="/testimonials"
              onClick={() => umami.track("cta_click_read_reviews", { location: "sd_planner_stats" })}
              className="inline-flex items-center gap-2 text-blush-300 hover:text-blush-200 font-medium transition-colors"
            >
              <Star className="w-4 h-4 fill-current" />
              Read 100+ Five-Star Reviews from Happy Couples
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section
        ref={servicesRef}
        className="py-20 lg:py-28 bg-gradient-to-b from-cream-50 to-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-flex items-center gap-2 text-blush-500 text-sm font-medium uppercase tracking-wider mb-4">
              <MapPin className="w-4 h-4" />
              Service Areas
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal-900 leading-tight">
              Crafting Dream Weddings
              <br />
              <span className="text-blush-500">Across Southern California</span>
            </h2>
            <p className="mt-6 text-lg text-charcoal-600 leading-relaxed">
              From the beaches of Coronado to the wine country of Temecula, we bring your
              vision to life at the most stunning venues in the region.
            </p>
          </motion.div>

          {/* Service Areas Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 mb-16"
          >
            {serviceAreas.map((area) => {
              const CardContent = (
                <>
                  {area.featured && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blush-500 flex items-center justify-center">
                      <Star className="w-3 h-3 text-white fill-white" />
                    </div>
                  )}
                  <h3 className="font-serif font-semibold text-charcoal-900 mb-1">
                    {area.name}
                  </h3>
                  <p className="text-xs text-charcoal-500 mb-2 line-clamp-1">
                    {area.description}
                  </p>
                  <p className="text-xs text-blush-500 font-medium">
                    {area.venues}+ venues
                  </p>
                </>
              );

              return (
                <motion.div
                  key={area.name}
                  variants={itemVariants}
                  onMouseEnter={() => setActiveArea(area.name)}
                  onMouseLeave={() => setActiveArea(null)}
                  className={cn(
                    "relative p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer",
                    area.featured
                      ? "bg-white border-blush-200 hover:border-blush-400 shadow-md hover:shadow-xl"
                      : "bg-cream-50 border-cream-200 hover:border-blush-300 hover:bg-white",
                    activeArea === area.name && "scale-[1.02] shadow-xl border-blush-400"
                  )}
                >
                  {area.link ? (
                    <Link href={area.link} className="block">
                      {CardContent}
                    </Link>
                  ) : (
                    CardContent
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section
        ref={mapRef}
        className="py-20 lg:py-28 bg-charcoal-900 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-flex items-center gap-2 text-blush-400 text-sm font-medium uppercase tracking-wider mb-4">
              <Building2 className="w-4 h-4" />
              Venue Experience
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white leading-tight">
              Venues Where We&apos;ve
              <br />
              <span className="text-blush-300">Created Magic</span>
            </h2>
            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              Explore the stunning venues across Southern California where we&apos;ve planned
              unforgettable celebrations.
            </p>
          </motion.div>

          {/* Interactive Venue Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10"
          >
            <div className="aspect-[16/9] lg:aspect-[21/9]">
              <VenueMap className="w-full h-full min-h-[400px]" />
            </div>
            {/* Map overlay gradient for branding */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-charcoal-900/80 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <p className="text-white/80 text-sm">
                <span className="font-semibold text-blush-300">{venueLocations.length}+</span> venues across Southern California
              </p>
              <Link
                href="/portfolio"
                onClick={() => umami.track("link_click_explore_portfolio", { location: "sd_planner_map" })}
                className="text-sm text-blush-300 hover:text-blush-200 font-medium flex items-center gap-1"
              >
                Explore our work <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Preferred Venues Section - FIRST */}
      <section
        ref={venuesRef}
        id="venues"
        className="py-20 lg:py-28 bg-gradient-to-b from-white to-cream-50 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={venuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center justify-center gap-2 mb-4">
              <Award className="w-5 h-5 text-blush-500" />
              <span className="text-blush-500 text-sm font-medium uppercase tracking-wider">
                Trusted Partner
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal-900 leading-tight">
              Preferred Vendor at
              <br />
              <span className="text-blush-500">Premier Venues</span>
            </h2>
            <p className="mt-6 text-lg text-charcoal-600 leading-relaxed">
              We&apos;re honored to be a preferred vendor at these exceptional San Diego venues,
              a testament to our commitment to excellence and collaborative relationships.
            </p>
          </motion.div>

          {/* Venues Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={venuesInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {preferredVenues.map((venue) => (
              <motion.div
                key={venue.name}
                variants={itemVariants}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
              >
                {/* Venue Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={venue.image}
                    alt={`Wedding at ${venue.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent" />

                  {/* Preferred Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-md">
                      <Award className="w-3.5 h-3.5 text-blush-500" />
                      <span className="text-xs font-semibold text-charcoal-800">Preferred Vendor</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-serif font-semibold text-charcoal-900 group-hover:text-blush-600 transition-colors">
                        {venue.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1.5 text-charcoal-500">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-sm">{venue.location}</span>
                      </div>
                    </div>
                    {venue.url && (
                      <a
                        href={venue.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => umami.track("link_click_venue_external", { venue: venue.name })}
                        className="flex-shrink-0 w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center text-charcoal-400 hover:text-blush-500 hover:bg-blush-50 transition-colors"
                        aria-label={`Visit ${venue.name} website`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* Wedding count */}
                  <div className="mt-4 pt-4 border-t border-cream-200">
                    <p className="text-sm text-charcoal-600">
                      <span className="font-semibold text-blush-500">{venue.weddingCount}</span>
                      {" "}wedding{venue.weddingCount !== 1 ? "s" : ""} planned at this venue
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={venuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <p className="text-charcoal-600 mb-6">
              Planning your wedding at one of these venues? Let&apos;s create something beautiful together.
            </p>
            <Link
              href="/#contact"
              onClick={() => umami.track("cta_click_venue_inquiry", { location: "sd_planner_venues" })}
              className="inline-flex items-center gap-2 px-8 py-4 bg-charcoal-900 text-white rounded-xl font-medium hover:bg-charcoal-800 transition-colors"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Packages Section - SECOND */}
      <section
        ref={packagesRef}
        id="packages"
        className="py-20 lg:py-28 bg-gradient-to-b from-cream-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={packagesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-flex items-center gap-2 text-blush-500 text-sm font-medium uppercase tracking-wider mb-4">
              <Sparkles className="w-4 h-4" />
              Investment
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal-900 leading-tight">
              Wedding Planning
              <br />
              <span className="text-blush-500">Packages</span>
            </h2>
            <p className="mt-6 text-lg text-charcoal-600 leading-relaxed">
              Transparent pricing with exceptional value. Choose the level of support
              that&apos;s right for your celebration.
            </p>
          </motion.div>

          {/* Packages Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={packagesInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12"
          >
            {packages.map((pkg) => (
              <motion.div
                key={pkg.id}
                variants={itemVariants}
                className={cn(
                  "relative flex flex-col rounded-3xl overflow-hidden transition-all duration-500",
                  pkg.badge
                    ? "bg-charcoal-900 text-white shadow-2xl scale-[1.02] lg:scale-105"
                    : "bg-white shadow-lg hover:shadow-xl"
                )}
              >
                {pkg.badge && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-blush-500 text-white">
                    {pkg.badge}
                  </div>
                )}

                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <p
                    className={cn(
                      "text-sm mb-1",
                      pkg.badge ? "text-blush-300" : "text-blush-500"
                    )}
                  >
                    {pkg.tagline}
                  </p>
                  <h3
                    className={cn(
                      "text-2xl font-serif font-semibold mb-2",
                      pkg.badge ? "text-white" : "text-charcoal-900"
                    )}
                  >
                    {pkg.name}
                  </h3>

                  <div className="mb-4">
                    <span
                      className={cn(
                        "text-3xl font-serif font-bold",
                        pkg.badge ? "text-white" : "text-charcoal-900"
                      )}
                    >
                      {pkg.price}
                    </span>
                    <span
                      className={cn(
                        "text-sm ml-1",
                        pkg.badge ? "text-white/60" : "text-charcoal-500"
                      )}
                    >
                      starting
                    </span>
                  </div>

                  <p
                    className={cn(
                      "text-sm leading-relaxed mb-6",
                      pkg.badge ? "text-white/70" : "text-charcoal-600"
                    )}
                  >
                    {pkg.description}
                  </p>

                  <ul className="space-y-2 mb-6 flex-1">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check
                          className={cn(
                            "w-4 h-4 mt-0.5 flex-shrink-0",
                            pkg.badge ? "text-blush-400" : "text-sage-500"
                          )}
                        />
                        <span
                          className={cn(
                            "text-sm",
                            pkg.badge ? "text-white/80" : "text-charcoal-600"
                          )}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/packages"
                    className="mt-auto"
                    onClick={() => umami.track("cta_click_view_details", { package: pkg.id, location: "sd_planner_packages" })}
                  >
                    <Button
                      className={cn(
                        "w-full",
                        pkg.badge ? "bg-blush-500 hover:bg-blush-600 text-white" : ""
                      )}
                      variant={pkg.badge ? "primary" : "outline"}
                      size="lg"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Packages Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={packagesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <p className="text-charcoal-600 mb-4">
              Looking for something different? We also offer Wellness Packages, Destination Weddings, and fully Custom experiences.
            </p>
            <Link
              href="/packages"
              onClick={() => umami.track("cta_click_all_packages", { location: "sd_planner_packages" })}
              className="inline-flex items-center gap-2 text-blush-500 font-medium hover:text-blush-600 transition-colors"
            >
              View All Packages & Pricing <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section ref={ctaRef} className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767314958/Jessica_Kevin_s_Wedding_by_PKA_Photography-23_rxgczi.webp"
            alt="Beautiful San Diego wedding celebration"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-charcoal-900/80" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blush-500/20 mb-6">
              <Phone className="w-8 h-8 text-blush-400" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white leading-tight mb-6">
              Ready to Plan Your
              <br />
              <span className="text-blush-300">San Diego Wedding?</span>
            </h2>

            <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
              Schedule your complimentary consultation with San Diego&apos;s most trusted wedding planner.
              We&apos;ll discuss your vision, answer questions, and start bringing your dream to life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                onClick={() => umami.track("cta_click_schedule_consultation", { location: "sd_planner_final_cta" })}
              >
                <Button size="lg" className="w-full sm:w-auto text-base px-8 bg-blush-500 hover:bg-blush-600">
                  Schedule Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a
                href="tel:+17602167427"
                onClick={() => umami.track("link_click_phone", { location: "sd_planner_final_cta" })}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-base px-8 bg-transparent border-white text-white hover:bg-white hover:text-charcoal-900"
                >
                  Call (760) 216-7427
                </Button>
              </a>
            </div>

            <p className="mt-8 text-white/60 text-sm">
              No obligation • Response within 24 hours • Virtual or in-person available
            </p>

            {/* Award badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <Award className="w-4 h-4 text-blush-300" />
                <span className="text-sm text-white/80">The Knot Best of Weddings 2024 & 2025</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <Heart className="w-4 h-4 text-blush-300" />
                <span className="text-sm text-white/80">WeddingWire Couples&apos; Choice</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
