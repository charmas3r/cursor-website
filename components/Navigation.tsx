"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Navigation links configuration
// When dedicated pages are added, simply update the href to the page path
// e.g., change "/#about" to "/about" when the About page is created
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/san-diego-wedding-planner", label: "Planning" }, // Top-funnel planning/services page
  { href: "/about", label: "About Us" },        // Dedicated page
  { href: "/packages", label: "Packages" },     // Dedicated page
  { href: "/portfolio", label: "Portfolio" },   // Dedicated page
  { href: "/#contact", label: "Contact" },      // TODO: Update to "/contact" when page is created
];

export default function Navigation(): JSX.Element {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
      // Hide banner when scrolled
      if (window.scrollY > 200) {
        setShowBanner(false);
      } else {
        setShowBanner(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = (): void => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <>
      {/* Booking Availability Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-[60] bg-charcoal-900 text-white overflow-hidden"
          >
            <div className="py-2 text-center text-sm">
              <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2 sm:gap-3">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blush-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blush-500" />
                </span>
                <span className="font-medium text-xs sm:text-sm">Now Booking 2026 & 2027</span>
                <span className="hidden sm:inline text-white/40">—</span>
                <span className="hidden sm:inline text-white/70 text-xs">Limited dates</span>
                <Link 
                  href="/#contact"
                  onClick={() => umami.track("cta_click_booking_banner")}
                  className="ml-1 sm:ml-2 inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-blush-500 hover:bg-blush-600 rounded-full text-white text-xs font-medium transition-colors"
                >
                  <span className="hidden xs:inline">Reserve Date</span>
                  <span className="xs:hidden">Book</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-500 w-full",
          showBanner ? "top-[36px]" : "top-0",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm py-3 md:py-4"
            : "bg-transparent py-4 md:py-6"
        )}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => umami.track("nav_click_logo")}
            className="flex items-center gap-2 font-serif font-bold text-charcoal-900 tracking-tight"
          >
            <Image
              src="/favicon-96x96.png"
              alt="Wedding Agency San Diego"
              width={28}
              height={28}
              className="w-6 h-6 sm:w-7 sm:h-7"
            />
            <div>
              <span className="text-lg sm:text-xl">Wedding Agency</span>
              <span className="text-blush-500 text-base sm:text-lg ml-1">
                San Diego
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => umami.track(`nav_click_${link.label.toLowerCase().replace(/\s+/g, "_")}`)}
                className="text-sm font-medium text-charcoal-700 hover:text-charcoal-900 transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blush-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              umami.track(isMobileMenuOpen ? "nav_close_mobile_menu" : "nav_open_mobile_menu");
            }}
            className="md:hidden p-2 -mr-2 hover:bg-cream-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-charcoal-900" />
            ) : (
              <Menu className="w-6 h-6 text-charcoal-900" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-cream-200 shadow-lg"
          >
            <div className="px-4 sm:px-6 py-6 space-y-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      umami.track(`nav_click_mobile_${link.label.toLowerCase().replace(/\s+/g, "_")}`);
                    }}
                    className="block text-lg font-medium text-charcoal-700 hover:text-charcoal-900 hover:bg-cream-50 py-3 px-4 rounded-xl transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <Link href="/#contact" onClick={() => {
                  setIsMobileMenuOpen(false);
                  umami.track("cta_click_get_started", { location: "mobile_nav" });
                }}>
                  <Button className="w-full" size="lg">
                    Get Started
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
    </>
  );
}
