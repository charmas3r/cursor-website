"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, type FormEvent, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  venue: string;
  message: string;
}

const contactInfo = [
  {
    icon: MapPin,
    label: "Visit Us",
    value: "123 Wedding Lane, San Diego, CA 92101",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "(619) 555-0123",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@wding.com",
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <section
      id="contact"
      className="py-24 lg:py-32 bg-gradient-to-b from-cream-50 to-blush-50"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <span className="text-blush-500 text-sm font-medium uppercase tracking-wider">
              Get In Touch
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-serif font-medium text-charcoal-900 leading-tight">
              Let&apos;s Plan Your
              <br />
              Dream Wedding
            </h2>
            <p className="mt-6 text-lg text-charcoal-600 leading-relaxed">
              Ready to start planning? We&apos;d love to hear from you. Fill out the
              form or reach out directly — we typically respond within 24 hours.
            </p>

            {/* Contact Info */}
            <div className="mt-10 space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-blush-500" />
                  </div>
                  <div>
                    <p className="text-sm text-charcoal-500">{item.label}</p>
                    <p className="text-charcoal-900 font-medium">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stay Connected - Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-10 bg-white rounded-2xl p-6 shadow-sm"
            >
              <h4 className="text-lg font-serif font-semibold text-charcoal-900 mb-2">
                Stay Connected
              </h4>
              <p className="text-sm text-charcoal-600 mb-4">
                Subscribe for wedding tips and inspiration.
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-cream-300 focus:border-blush-400 focus:ring-2 focus:ring-blush-100 outline-none transition-all duration-300 text-sm"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-charcoal-900 text-white text-sm font-medium hover:bg-charcoal-800 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </motion.div>

            {/* Let's Get Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-6"
            >
              <p className="text-sm text-charcoal-500 mb-4">Let&apos;s Get Social</p>
              <div className="flex gap-3">
                {["Instagram", "Pinterest", "Facebook"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-blush-50 hover:shadow-md transition-all duration-300"
                    aria-label={social}
                  >
                    <span className="text-xs font-medium text-charcoal-700">
                      {social[0]}
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
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-xl"
            >
              <h3 className="text-2xl font-serif font-semibold text-charcoal-900 mb-6">
                Request a Consultation
              </h3>

              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
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
                      className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:border-blush-400 focus:ring-2 focus:ring-blush-100 outline-none transition-all duration-300"
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
                      className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:border-blush-400 focus:ring-2 focus:ring-blush-100 outline-none transition-all duration-300"
                      placeholder="you@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
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
                      className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:border-blush-400 focus:ring-2 focus:ring-blush-100 outline-none transition-all duration-300"
                      placeholder="(619) 555-0123"
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
                      className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:border-blush-400 focus:ring-2 focus:ring-blush-100 outline-none transition-all duration-300"
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
                    className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:border-blush-400 focus:ring-2 focus:ring-blush-100 outline-none transition-all duration-300"
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
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:border-blush-400 focus:ring-2 focus:ring-blush-100 outline-none transition-all duration-300 resize-none"
                    placeholder="Share your dreams for the big day..."
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Send Message
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

