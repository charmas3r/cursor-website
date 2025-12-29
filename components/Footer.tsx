"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

// Footer links - update hrefs when dedicated pages are created
const footerLinks = {
  services: [
    { label: "Full Service Planning", href: "/packages#full-service" },
    { label: "Day-of Coordination", href: "/packages#day-of" },
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
    { label: "Blog", href: "/wedding-tips" },
    { label: "Wedding Tips", href: "/wedding-tips" },
    { label: "Vendor Directory", href: "/#packages" },
    { label: "FAQs", href: "/packages#faq" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },  // Future page
    { label: "Terms of Service", href: "/terms" },  // Future page
  ],
};

const socialLinks = [
  { label: "Instagram", href: "#", icon: "IG" },
  { label: "Pinterest", href: "#", icon: "PI" },
  { label: "Facebook", href: "#", icon: "FB" },
  { label: "TikTok", href: "#", icon: "TK" },
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
                  className="w-10 h-10 rounded-full bg-charcoal-800 flex items-center justify-center hover:bg-blush-500 transition-colors duration-300"
                  aria-label={social.label}
                >
                  <span className="text-xs font-medium">{social.icon}</span>
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

          {/* Newsletter */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Newsletter
            </h4>
            <p className="text-charcoal-400 text-sm mb-4">
              Wedding tips & inspiration delivered to your inbox.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="px-4 py-3 rounded-xl bg-charcoal-800 border border-charcoal-700 focus:border-blush-500 outline-none text-sm transition-colors duration-300"
              />
              <button
                type="submit"
                className="px-4 py-3 rounded-xl bg-blush-500 hover:bg-blush-600 text-white text-sm font-medium transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
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

