"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Award,
  Users,
  Sparkles,
  MapPin,
  Calendar,
  Star,
  ArrowRight,
  Quote,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

// Team members data
const teamMembers = [
  {
    name: "Nicole Shadoan",
    role: "Founder & Lead Planner",
    image: "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767240361/Nicole_-_Wedding_Agency_San_Diego-7_sjryxd.webp",
    bio: "With 20+ years in hospitality and events, I founded Wedding Agency San Diego to plan extraordinary weddings with intention, balance, and care. Your wedding should feel as good as it looks.",
    specialties: ["Full Service Planning", "Wedding Management", "Destination Weddings"],
  },
];

// Values data
const values = [
  {
    icon: Heart,
    title: "Intention",
    description:
      "Every decision is made with purpose—creating celebrations that truly reflect who you are.",
  },
  {
    icon: Sparkles,
    title: "Excellence",
    description:
      "Uncompromising quality from the smallest detail to the grandest moment. Nothing less than exceptional.",
  },
  {
    icon: Users,
    title: "Balance & Care",
    description:
      "Supporting your mental and physical well-being throughout the planning journey and beyond.",
  },
  {
    icon: Star,
    title: "Seamless Execution",
    description:
      "20+ years in hospitality means flawless coordination so you can be fully present on your day.",
  },
];

// Timeline/Milestones
const milestones = [
  {
    year: "Feb 2023",
    title: "The Beginning",
    description: "Wedding Agency San Diego was founded with a mission to plan weddings with intention and care.",
  },
  {
    year: "Jan 2024",
    title: "Best of Weddings",
    description: "Won The Knot's Best of Weddings award for the first time—more to come!",
  },
  {
    year: "Mar 2024",
    title: "First Destination Wedding",
    description: "Planned and executed our first destination wedding adventure.",
  },
  {
    year: "Jul 2025",
    title: "5th Preferred Vendor List",
    description: "Added to our 5th venue preferred vendor list—trusted by top San Diego venues.",
  },
  {
    year: "Nov 2025",
    title: "100th Wedding",
    description: "Celebrated a major milestone—our 100th wedding!",
  },
];

export default function AboutPage(): JSX.Element {
  const storyRef = useRef(null);
  const teamRef = useRef(null);
  const valuesRef = useRef(null);
  const timelineRef = useRef(null);

  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });
  const teamInView = useInView(teamRef, { once: true, margin: "-100px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const timelineInView = useInView(timelineRef, { once: true, margin: "-100px" });

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2070"
              alt="Elegant wedding venue with romantic lighting"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/80 via-charcoal-900/60 to-charcoal-900/40" />
          </div>

          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-blush-500/20 backdrop-blur-sm rounded-full text-blush-200 text-sm font-medium mb-6">
                <Heart className="w-4 h-4" />
                Our Story
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-white leading-tight">
                Where Dreams
                <br />
                <span className="text-blush-300">Become Reality</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-cream-100/90 leading-relaxed max-w-2xl">
                We exist to plan extraordinary weddings with intention, balance, and care—supporting 
                your mental and physical well-being while delivering seamless execution and 
                uncompromising excellence from start to finish.
              </p>

              {/* Quick Stats */}
              <div className="mt-10 flex flex-wrap gap-8">
                {[
                  { value: "100+", label: "Weddings" },
                  { value: "20+", label: "Years in Hospitality" },
                  { value: "3×", label: "Award Winner" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl sm:text-4xl font-serif font-semibold text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm text-cream-200/70 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </section>

        {/* Our Story Section */}
        <section ref={storyRef} className="py-20 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Images */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={storyInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767238922/processed-F6C355EA-4876-41AF-A491-FC3A51C2C1AF_raelqt.webp"
                    alt="Beautiful wedding celebration"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {/* Floating quote card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={storyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="absolute -bottom-6 -right-6 lg:-right-12 bg-charcoal-900 text-white rounded-2xl p-6 max-w-xs shadow-xl"
                >
                  <Quote className="w-8 h-8 text-blush-400 mb-3" />
                  <p className="text-sm italic leading-relaxed">
                    &quot;Your wedding should feel as good as it looks. We handle the stress so 
                    you can be fully present for your celebration.&quot;
                  </p>
                  <p className="mt-4 text-blush-300 text-sm font-medium">
                    — Nicole Shadoan, Founder
                  </p>
                </motion.div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={storyInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <span className="text-blush-500 text-sm font-medium uppercase tracking-wider">
                  Our Journey
                </span>
                <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal-900 leading-tight">
                  A Legacy of Love
                  <br />
                  & Celebration
                </h2>
                <div className="mt-6 space-y-4 text-charcoal-600 leading-relaxed">
                  <p>
                    Wedding Agency San Diego was founded in 2023 with a clear mission: to plan 
                    extraordinary weddings with intention, balance, and care. After 20+ years 
                    working in hospitality—from hotels and venues to hands-on service—I&apos;ve 
                    experienced weddings from every angle.
                  </p>
                  <p>
                    What sets us apart? We believe your wedding should feel as good as it looks. 
                    That means supporting your mental and physical well-being throughout the 
                    planning journey, not just delivering a beautiful event. We handle the stress 
                    so you can be fully present.
                  </p>
                  <p>
                    With seamless execution and uncompromising excellence from start to finish, 
                    we&apos;ve already planned 100+ weddings across Southern California. Each one 
                    intentional. Each one balanced. Each one crafted with genuine care.
                  </p>
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Link href="/portfolio">
                    <Button size="lg">
                      See Our Work
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/#contact">
                    <Button variant="outline" size="lg">
                      Get in Touch
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section ref={valuesRef} className="py-20 lg:py-32 bg-cream-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <span className="text-blush-500 text-sm font-medium uppercase tracking-wider">
                What Drives Us
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal-900">
                Our Core Values
              </h2>
              <p className="mt-6 text-lg text-charcoal-600">
                The principles that guide everything we do, from the first consultation 
                to the final farewell.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={valuesInView ? "visible" : "hidden"}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {values.map((value) => (
                <motion.div
                  key={value.title}
                  variants={fadeInUp}
                  className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-blush-50 flex items-center justify-center mb-6 group-hover:bg-blush-100 transition-colors">
                    <value.icon className="w-7 h-7 text-blush-500" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-charcoal-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-charcoal-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" ref={teamRef} className="py-20 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <span className="text-blush-500 text-sm font-medium uppercase tracking-wider">
                The Dreammakers
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal-900">
                Meet Our Team
              </h2>
              <p className="mt-6 text-lg text-charcoal-600">
                The passionate professionals who bring your wedding dreams to life.
              </p>
            </motion.div>

            {/* Nicole's Feature Section - Image Left, Bio Right */}
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Nicole's Image - Left Side */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={teamInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
                className="relative lg:sticky lg:top-8"
              >
                <div className="relative h-[450px] sm:h-[550px] lg:h-[650px] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767240361/Nicole_-_Wedding_Agency_San_Diego-7_sjryxd.webp"
                    alt="Nicole Shadoan - Founder & CEO of Wedding Agency San Diego"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/30 via-transparent to-transparent" />
                </div>

                {/* Floating Award Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={teamInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white rounded-2xl p-4 sm:p-5 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blush-100 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-blush-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-serif font-semibold text-charcoal-900">3</p>
                      <p className="text-sm text-charcoal-600">Industry Awards</p>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-blush-200/30 blur-2xl" />
              </motion.div>

              {/* Nicole's Bio - Right Side */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={teamInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1], delay: 0.2 }}
                className="space-y-6"
              >
                {/* Name & Title */}
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-charcoal-900">
                    Nicole
                  </h3>
                  <p className="text-blush-500 font-medium mt-1">Founder & CEO</p>
                </div>

                {/* Bio Content */}
                <div className="space-y-4 text-charcoal-600 leading-relaxed">
                  <p>
                    Nicole is a California native and the founder and CEO of Wedding Agency San Diego. 
                    She earned a bachelor&apos;s degree with an emphasis on tourism and event planning and 
                    has a proven, successful career in fine dining and special events. Prior to founding 
                    the Wedding Agency, Nicole honed her craft as the Director of Events at the Lakehouse 
                    Resort and as manager of the restaurant, &ldquo;Morada&rdquo; at the historic Inn at Rancho Santa Fe.
                  </p>
                  <p>
                    She provides an unmatched level of dedicated service to hundreds of couples that 
                    proves as the bedrock for their remarkable weddings.
                  </p>
                  <p>
                    Since founding Wedding Agency San Diego in 2023, Nicole has received three unique 
                    industry awards; 2× &ldquo;Best of Weddings&rdquo; on The Knot and 1× &ldquo;Couples Choice&rdquo; on Wedding Wire.
                  </p>
                  <p>
                    Nicole&apos;s own wedding at a private estate atop Paint Mountain in Elfin Forest was 
                    the event that sparked the original idea for Wedding Agency San Diego. The wedding 
                    was marked by an incredible sunset, a double rainbow, and a general atmosphere of 
                    love and celebration. Today, Nicole aims to provide others with the same level of 
                    joy and gratification she and her husband felt on their wedding day and the same 
                    level of guidance and support they received from their planner, Kristin, who retired in 2022.
                  </p>
                  <p>
                    Her own journey with spiritual, physical, mental, and emotional health is reflected 
                    in everything that she does; most notably in the level of care she provides to her couples.
                  </p>
                </div>

                {/* Hobbies */}
                <div className="bg-cream-50 rounded-2xl p-5 sm:p-6">
                  <p className="text-sm text-charcoal-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-blush-400" />
                    Personal Interests
                  </p>
                  <p className="text-charcoal-600 text-sm leading-relaxed">
                    CrossFit, hiking with her dog, camping, rock climbing, meditation, and 
                    watching her husband compete in Brazilian Jiu Jitsu tournaments.
                  </p>
                </div>

                {/* Awards */}
                <div className="flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2 bg-blush-50 text-blush-700 px-4 py-2 rounded-full text-sm font-medium">
                    <Award className="w-4 h-4" />
                    2× Best of Weddings - The Knot
                  </div>
                  <div className="inline-flex items-center gap-2 bg-blush-50 text-blush-700 px-4 py-2 rounded-full text-sm font-medium">
                    <Award className="w-4 h-4" />
                    1× Couples Choice - Wedding Wire
                  </div>
                </div>

                {/* Specialties */}
                <div className="pt-4 border-t border-cream-200">
                  <p className="text-sm text-charcoal-500 uppercase tracking-wider mb-3">Specialties</p>
                  <div className="flex flex-wrap gap-2">
                    {["Full Service Planning", "Wedding Management", "Destination Weddings"].map((specialty) => (
                      <span
                        key={specialty}
                        className="px-4 py-2 bg-charcoal-900 text-white rounded-full text-sm font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section ref={timelineRef} className="py-20 lg:py-32 bg-charcoal-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={timelineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <span className="text-blush-400 text-sm font-medium uppercase tracking-wider">
                Our Journey
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white">
                Milestones & Memories
              </h2>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-charcoal-700 hidden lg:block" />

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate={timelineInView ? "visible" : "hidden"}
                className="space-y-8 lg:space-y-0"
              >
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    variants={fadeInUp}
                    className={`relative lg:w-1/2 ${
                      index % 2 === 0 ? "lg:pr-16 lg:ml-0" : "lg:pl-16 lg:ml-auto"
                    }`}
                  >
                    {/* Timeline dot */}
                    <div
                      className={`hidden lg:block absolute top-6 w-4 h-4 rounded-full bg-blush-500 border-4 border-charcoal-900 ${
                        index % 2 === 0 ? "-right-2" : "-left-2"
                      }`}
                    />

                    <div className="bg-charcoal-800 rounded-2xl p-6 lg:p-8 hover:bg-charcoal-700 transition-colors">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="px-4 py-2 bg-blush-500/20 rounded-full text-blush-400 text-sm font-bold">
                          {milestone.year}
                        </span>
                        <div className="flex-1 h-px bg-charcoal-600" />
                        <Calendar className="w-5 h-5 text-charcoal-500" />
                      </div>
                      <h3 className="text-xl font-serif font-semibold text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-charcoal-400 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Awards Section */}
        <section className="py-20 lg:py-24 bg-blush-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-blush-500 text-sm font-medium uppercase tracking-wider">
                  Recognition
                </span>
                <h2 className="mt-4 text-3xl sm:text-4xl font-serif font-medium text-charcoal-900">
                  Award-Winning Excellence
                </h2>
                <p className="mt-6 text-lg text-charcoal-600 leading-relaxed">
                  We&apos;re honored to be recognized by both The Knot and WeddingWire for 
                  our excellence in wedding planning. These awards are a testament to the 
                  trust our couples place in us and the dedication of our entire team.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://www.theknot.com/marketplace/wedding-agency-san-diego-san-diego-ca-2069439"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blush-600 font-medium hover:text-blush-700 transition-colors"
                  >
                    <Award className="w-5 h-5" />
                    The Knot Profile
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.weddingwire.com/vendors/couples-choice-awards"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blush-600 font-medium hover:text-blush-700 transition-colors"
                  >
                    <Award className="w-5 h-5" />
                    WeddingWire Profile
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {[
                  { year: "2025", title: "Best of Weddings", source: "The Knot" },
                  { year: "2024", title: "Best of Weddings", source: "The Knot" },
                  { year: "2025", title: "Couples' Choice", source: "WeddingWire" },
                ].map((award, index) => (
                  <div
                    key={`${award.source}-${award.year}-${index}`}
                    className="bg-white rounded-3xl p-6 lg:p-8 text-center shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div className="w-14 h-14 lg:w-16 lg:h-16 mx-auto rounded-full bg-blush-100 flex items-center justify-center mb-4">
                      <Award className="w-7 h-7 lg:w-8 lg:h-8 text-blush-500" />
                    </div>
                    <p className="text-xl lg:text-2xl font-serif font-bold text-charcoal-900">
                      {award.year}
                    </p>
                    <p className="text-sm text-charcoal-600 mt-1">{award.title}</p>
                    <p className="text-xs text-blush-500 mt-2">{award.source}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <MapPin className="w-12 h-12 text-blush-400 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal-900">
                Ready to Start Your Journey?
              </h2>
              <p className="mt-6 text-lg text-charcoal-600 max-w-2xl mx-auto">
                Let&apos;s create something beautiful together. Schedule a consultation 
                with our team and take the first step toward your dream wedding.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/#contact">
                  <Button size="lg">
                    Book a Consultation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/packages">
                  <Button variant="outline" size="lg">
                    View Our Packages
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

