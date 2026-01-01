"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, type FormEvent, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Clock, CheckCircle, Loader2, AlertCircle } from "lucide-react";

// Social media icons as SVG components
const SocialIcon = ({ name }: { name: string }): JSX.Element => {
  const icons: Record<string, JSX.Element> = {
    Instagram: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    Facebook: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z"/>
      </svg>
    ),
    LinkedIn: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
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

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  venue: string;
  message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

const contactInfo = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+1 (760) 216-7427",
    href: "tel:+17602167427",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "nicole@weddingagencysandiego.com",
    href: "mailto:nicole@weddingagencysandiego.com",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon-Sat: 9AM - 6PM",
  },
];

export default function Contact(): JSX.Element {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    date: "",
    venue: "",
    message: "",
  });

  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      // Reset form after success
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        venue: "",
        message: "",
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send message"
      );
    }
  };

  const resetForm = (): void => {
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-32 bg-gradient-to-b from-cream-50 to-blush-50"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-24">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <span className="text-blush-500 text-xs sm:text-sm font-medium uppercase tracking-wider">
              Get In Touch
            </span>
            <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal-900 leading-tight">
              Contact Our Wedding
              <br />
              Planning Team
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-charcoal-600 leading-relaxed">
              Ready to start planning? We&apos;d love to hear from you. Fill out the
              form or reach out directly — we typically respond within 24 hours.
            </p>

            {/* Contact Info */}
            <div className="mt-8 sm:mt-10 space-y-4 sm:space-y-6">
              {contactInfo.map((item, index) => {
                const content = (
                  <>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blush-500" />
                    </div>
                    <div>
                      <p className="text-sm text-charcoal-500">{item.label}</p>
                      <p className="text-charcoal-900 font-medium">{item.value}</p>
                    </div>
                  </>
                );

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        className="flex items-start gap-3 sm:gap-4 group hover:opacity-80 transition-opacity"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-start gap-3 sm:gap-4">
                        {content}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Let's Get Social */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-8"
            >
              <p className="text-sm text-charcoal-500 mb-4">Let&apos;s Get Social</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-11 h-11 rounded-full bg-white shadow-sm flex items-center justify-center text-charcoal-500 hover:text-white hover:bg-gradient-to-br hover:from-blush-500 hover:to-blush-600 hover:shadow-lg hover:shadow-blush-200 transition-all duration-300 hover:scale-110"
                    aria-label={`Follow us on ${social.label}`}
                  >
                    <SocialIcon name={social.label} />
                    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs text-charcoal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg sm:shadow-xl">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"
                    >
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </motion.div>
                    <h3 className="text-2xl font-serif font-semibold text-charcoal-900 mb-3">
                      Message Sent! 💕
                    </h3>
                    <p className="text-charcoal-600 mb-6">
                      Thank you for reaching out! Check your email for a confirmation. 
                      We&apos;ll be in touch within 24-48 hours.
                    </p>
                    <Button onClick={resetForm} variant="outline">
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                  >
                    <h3 className="text-xl sm:text-2xl font-serif font-semibold text-charcoal-900 mb-4 sm:mb-6">
                      Request a Consultation
                    </h3>

                    {/* Error Message */}
                    <AnimatePresence>
                      {status === "error" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
                        >
                          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-red-800 font-medium text-sm">
                              Something went wrong
                            </p>
                            <p className="text-red-600 text-sm">{errorMessage}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="space-y-4 sm:space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-charcoal-700 mb-2"
                          >
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={status === "loading"}
                            className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:border-blush-400 focus:ring-2 focus:ring-blush-100 outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="Jane & John"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-charcoal-700 mb-2"
                          >
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={status === "loading"}
                            className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:border-blush-400 focus:ring-2 focus:ring-blush-100 outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="you@email.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-charcoal-700 mb-2"
                          >
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={status === "loading"}
                            className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:border-blush-400 focus:ring-2 focus:ring-blush-100 outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="date"
                            className="block text-sm font-medium text-charcoal-700 mb-2"
                          >
                            Wedding Date
                          </label>
                          <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            disabled={status === "loading"}
                            className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:border-blush-400 focus:ring-2 focus:ring-blush-100 outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="venue"
                          className="block text-sm font-medium text-charcoal-700 mb-2"
                        >
                          Preferred Venue / Location
                        </label>
                        <input
                          type="text"
                          id="venue"
                          name="venue"
                          value={formData.venue}
                          onChange={handleChange}
                          disabled={status === "loading"}
                          className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:border-blush-400 focus:ring-2 focus:ring-blush-100 outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder="Beach, vineyard, garden..."
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-charcoal-700 mb-2"
                        >
                          Tell Us About Your Vision
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          disabled={status === "loading"}
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:border-blush-400 focus:ring-2 focus:ring-blush-100 outline-none transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder="Share your dreams for the big day..."
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={status === "loading"}
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
