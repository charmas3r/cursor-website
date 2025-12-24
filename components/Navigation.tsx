"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#packages", label: "Packages" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contact", label: "Contact" },
];

const categories = [
  { href: "#planning", label: "Wedding Planning" },
  { href: "#coordination", label: "Day-of Coordination" },
  { href: "#design", label: "Design & Styling" },
  { href: "#destination", label: "Destination Weddings" },
];

export default function Navigation(): JSX.Element {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo & Categories */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="font-serif font-bold text-charcoal-900 tracking-tight"
            >
              <span className="text-xl">Wedding Agency</span>
              <span className="text-blush-500 text-lg ml-1">San Diego</span>
            </Link>

            {/* Categories Dropdown */}
            <div className="hidden md:block relative">
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                onBlur={() => setTimeout(() => setIsCategoriesOpen(false), 150)}
                className="flex items-center gap-1 text-sm font-medium text-charcoal-700 hover:text-charcoal-900 transition-colors"
              >
                CATEGORIES
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-300",
                    isCategoriesOpen && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {isCategoriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl py-3 border border-cream-200"
                  >
                    {categories.map((category) => (
                      <Link
                        key={category.href}
                        href={category.href}
                        className="block px-5 py-2.5 text-sm text-charcoal-700 hover:bg-cream-100 hover:text-charcoal-900 transition-colors"
                      >
                        {category.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-charcoal-700 hover:text-charcoal-900 transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blush-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            {/* Menu Icon */}
            <button
              className="flex flex-col gap-1.5 p-2 hover:bg-cream-100 rounded-lg transition-colors"
              aria-label="Menu"
            >
              <span className="w-6 h-0.5 bg-charcoal-900" />
              <span className="w-4 h-0.5 bg-charcoal-900 ml-auto" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-cream-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
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
            className="md:hidden bg-white border-t border-cream-200"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-lg font-medium text-charcoal-700 hover:text-charcoal-900 py-2"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <div className="pt-4 border-t border-cream-200">
                <p className="text-xs font-medium text-charcoal-500 uppercase tracking-wider mb-3">
                  Categories
                </p>
                {categories.map((category, index) => (
                  <motion.div
                    key={category.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navLinks.length + index) * 0.1 }}
                  >
                    <Link
                      href={category.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-base text-charcoal-600 hover:text-charcoal-900 py-2"
                    >
                      {category.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-4"
              >
                <Button className="w-full">Get Started</Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

