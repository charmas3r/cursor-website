"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

// Footer links - update hrefs when dedicated pages are created
const footerLinks = {
  services: [
    { label: "Full Service Planning", href: "/packages#full-service" },
    { label: "Wedding Management", href: "/packages#wedding-management" },
    { label: "Design & Styling", href: "/packages" },
    { label: "Destination Weddings", href: "/packages" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about#team" },   // Links to "The Dreammakers" section
    { label: "Portfolio", href: "/portfolio" },
    { label: "Testimonials", href: "/portfolio" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Wedding Tips", href: "/wedding-tips" },
    { label: "Vendor Directory", href: "/#packages" },
    { label: "FAQs", href: "/packages#faq" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },  // Future page
    { label: "Terms of Service", href: "/terms" },  // Future page
  ],
};

// Social media icons as SVG components
const SocialIcon = ({ name }: { name: string }): JSX.Element => {
  const icons: Record<string, JSX.Element> = {
    Instagram: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    Facebook: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z"/>
      </svg>
    ),
    LinkedIn: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554v-11.452h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zm-15.11-13.019c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019h-3.564v-11.452h3.564v11.452zm15.106-20.452h-20.454c-.979 0-1.771.774-1.771 1.729v20.542c0 .956.792 1.729 1.771 1.729h20.451c.978 0 1.778-.773 1.778-1.729v-20.542c0-.955-.8-1.729-1.778-1.729z"/>
      </svg>
    ),
  };
  return icons[name] || <span>{name}</span>;
};

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/weddingagencysandiego/" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61558606522671" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/wedding-agency-san-diego" },
];

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-charcoal-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-1 sm:col-span-2">
            <Link
              href="/"
              className="text-xl sm:text-2xl font-serif font-bold tracking-tight"
            >
              Wedding Agency
              <span className="block text-blush-400">San Diego</span>
            </Link>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-charcoal-400 leading-relaxed max-w-sm">
              Where creativity, passion, and attention to detail come together
              to craft unforgettable weddings in Southern California.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-11 h-11 rounded-full bg-charcoal-800/80 flex items-center justify-center text-charcoal-300 hover:text-white hover:bg-gradient-to-br hover:from-blush-500 hover:to-blush-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blush-500/25"
                  aria-label={`Follow us on ${social.label}`}
                >
                  <SocialIcon name={social.label} />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-charcoal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-charcoal-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-charcoal-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-charcoal-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-charcoal-500 text-sm flex flex-wrap items-center justify-center md:justify-start gap-x-1">
              <span>© {new Date().getFullYear()} Wedding Agency San Diego.</span>
              <span className="inline-flex items-center gap-1">
                Made with
                <Heart className="w-4 h-4 text-blush-500 fill-blush-500" />
                by <Link href="https://www.linkedin.com/in/evan-smith-93bb43154/" className="text-blush-500 hover:text-blush-600 transition-colors duration-300">E.S.</Link>
              </span>
            </p>

            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-charcoal-500 hover:text-white transition-colors duration-300 text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

