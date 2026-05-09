"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  ChevronDown,
  Globe,
  Mail,
  MapPin,
  Menu,
  Phone,
  Share2,
  Star,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ease, duration, fadeUp, stagger, scaleUp, viewport } from "@/lib/motion";

/* ─── Data ───────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work",     href: "#social-proof" },
  { label: "SOOH",     href: "#sooh" },
  { label: "Pricing",  href: "#pricing" },
  { label: "FAQ",      href: "#faq" },
];

const SERVICES = [
  {
    icon: Users,
    title: "Influencer Marketing",
    description:
      "Connect your brand with vetted creators on TikTok, Instagram, and YouTube. We handle sourcing, negotiation, content review, and reporting.",
    gradient: "from-violet-600 to-purple-700",
    glow: "rgba(139,92,246,0.35)",
  },
  {
    icon: Globe,
    title: "Social Out-of-Home (SOOH)",
    description:
      "Take your social content off-screen and onto digital billboards, transit displays, and public screens in 50+ cities across the region.",
    gradient: "from-blue-600 to-cyan-600",
    glow: "rgba(96,165,250,0.35)",
  },
  {
    icon: BarChart3,
    title: "Strategy & Analytics",
    description:
      "Data-backed campaign planning, earned media value tracking, and clear ROI reporting so you always know what's working.",
    gradient: "from-emerald-500 to-teal-600",
    glow: "rgba(52,211,153,0.35)",
  },
];

const STATS = [
  { value: "50+",  label: "Brands worked with" },
  { value: "200+", label: "Creators in network" },
  { value: "10M+", label: "Campaign reach" },
  { value: "50+",  label: "SOOH cities" },
];

const TESTIMONIALS = [
  {
    name: "Layla Hassan",
    role: "Head of Marketing @ NovaBrand",
    initials: "LH",
    gradient: "from-violet-500 to-purple-600",
    stars: 5,
    quote:
      "ThinkWay ran our biggest influencer campaign to date and then put our content on billboards across Dubai and Cairo. The brand awareness lift was unlike anything we'd done before.",
  },
  {
    name: "James Okafor",
    role: "CMO @ Pulse Streetwear",
    initials: "JO",
    gradient: "from-blue-500 to-cyan-500",
    stars: 5,
    quote:
      "Seeing our Instagram content on a massive digital screen in a shopping mall — our customers went crazy sharing it. Incredible earned media.",
  },
  {
    name: "Sara Al-Mansoori",
    role: "Brand Director @ Lumière",
    initials: "SM",
    gradient: "from-emerald-500 to-teal-500",
    stars: 5,
    quote:
      "They found us creators we'd never have discovered ourselves — genuinely aligned with our audience. The campaign felt authentic, not like an ad.",
  },
];

const FAQS = [
  {
    q: "What exactly is Social Out-of-Home (SOOH)?",
    a: "SOOH bridges digital social content and physical outdoor advertising. We take your best-performing social posts and display them on digital billboards, transit screens, and public displays — giving your brand real-world presence at massive scale.",
  },
  {
    q: "How do you select creators for my campaign?",
    a: "We vet every creator on audience authenticity, engagement rate, niche alignment, and past brand performance. You approve the final list before any outreach happens.",
  },
  {
    q: "Which platforms do you work across?",
    a: "TikTok, Instagram, and YouTube are our core channels. We can also coordinate Twitter/X and Snapchat campaigns depending on your audience.",
  },
  {
    q: "How long does a campaign take to launch?",
    a: "A standard influencer campaign goes live within 2–3 weeks of kick-off. SOOH placements typically add another week for production and screen booking.",
  },
  {
    q: "Do you work with smaller brands?",
    a: "Yes. Our Starter package is designed for brands running their first creator campaign. We scale up as your confidence and budget grow.",
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "$1,500",
    retainerPrice: "$1,200",
    description: "First creator campaign, built with care.",
    features: [
      "Up to 5 creators",
      "1 platform",
      "Basic analytics report",
      "14-day campaign",
    ],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$4,500",
    retainerPrice: "$3,600",
    description: "Multi-platform impact with SOOH reach.",
    features: [
      "Up to 20 creators",
      "3 platforms",
      "SOOH placements in 5 cities",
      "Full analytics dashboard",
      "Dedicated campaign manager",
    ],
    cta: "Start a campaign",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    retainerPrice: "Custom",
    description: "End-to-end strategy for large brands.",
    features: [
      "Unlimited creators",
      "All platforms",
      "50+ SOOH cities",
      "Earned media value tracking",
      "Monthly strategy sessions",
    ],
    cta: "Get a proposal",
    highlight: false,
  },
];

/* ─── Navbar ─────────────────────────────────────────────────── */

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.06] bg-[#0c0414]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-lg font-bold gradient-text tracking-tight">
          ThinkWay
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm text-[#94a3b8] hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <motion.a
            href="mailto:mohamedeldesouky.h@gmail.com"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white px-5 py-2 text-sm font-semibold shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all"
          >
            Get a proposal
          </motion.a>
        </div>

        <button
          className="md:hidden text-[#94a3b8] hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/[0.06] bg-[#0c0414]/95 backdrop-blur-md"
          >
            <nav className="flex flex-col px-4 py-4 gap-3">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-[#94a3b8] hover:text-white transition-colors py-1"
                >
                  {label}
                </a>
              ))}
              <a
                href="mailto:mohamedeldesouky.h@gmail.com"
                className="mt-2 inline-flex items-center justify-center rounded-full bg-violet-600 text-white px-5 py-2 text-sm font-semibold"
              >
                Get a proposal
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─── Hero ───────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 px-4 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-900/25 blur-[160px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-6"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-widest text-violet-400"
          >
            Influencer Marketing · SOOH · Brand Strategy
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl font-black leading-[1.08] tracking-tight"
          >
            Make your brand{" "}
            <span className="gradient-text">everywhere</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg text-[#94a3b8] max-w-xl leading-relaxed"
          >
            ThinkWay connects brands with top creators and places their content
            on digital billboards across 50+ cities — online and in the real world.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
            <motion.a
              href="mailto:mohamedeldesouky.h@gmail.com"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white px-7 py-3 text-sm font-semibold shadow-[0_0_24px_rgba(139,92,246,0.4)] transition-all"
            >
              Start a campaign <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="#social-proof"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white px-7 py-3 text-sm font-semibold transition-all"
            >
              See our work
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl mt-4"
        >
          {STATS.map(({ value, label }) => (
            <motion.div
              key={label}
              variants={scaleUp}
              className="flex flex-col items-center gap-1 rounded-2xl border border-white/[0.07] bg-[#1c1528] py-5 px-3 text-center"
            >
              <span className="text-2xl font-bold gradient-text">{value}</span>
              <span className="text-[11px] text-[#94a3b8]">{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Services ───────────────────────────────────────────────── */

function Services() {
  return (
    <section id="services" className="relative py-24 px-4 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute top-0 right-1/4 w-[500px] h-[300px] bg-violet-950/30 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-16">
        <motion.div
          className="text-center"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
            What we do
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold mb-4">
            Two forces,{" "}
            <span className="gradient-text">one campaign</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#94a3b8] text-base max-w-xl mx-auto">
            Influencer reach online. Billboard presence offline. ThinkWay runs both so your brand lands everywhere your audience lives.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {SERVICES.map(({ icon: Icon, title, description, gradient, glow }) => (
            <motion.div
              key={title}
              variants={scaleUp}
              whileHover={{ y: -6, boxShadow: `0 20px 60px ${glow}` }}
              transition={{ duration: duration.fast, ease }}
              className="flex flex-col gap-5 rounded-2xl border border-white/[0.07] bg-[#1c1528] p-6"
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed">{description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Social Proof ───────────────────────────────────────────── */

function SocialProof() {
  return (
    <section id="social-proof" className="relative py-24 px-4 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/3 w-[600px] h-[300px] bg-blue-900/20 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-16">
        <motion.div
          className="text-center"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
            Client stories
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold">
            Brands that{" "}
            <span className="gradient-text">think differently</span>
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={stagger(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {TESTIMONIALS.map(({ name, role, initials, gradient, stars, quote }) => (
            <motion.div
              key={name}
              variants={scaleUp}
              whileHover={{ y: -4, borderColor: "rgba(139,92,246,0.3)" }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-[#1c1528] p-6"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: stars }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-[#94a3b8] leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-white leading-tight">{name}</p>
                  <p className="text-xs text-[#64748b] mt-0.5">{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Pricing ────────────────────────────────────────────────── */

function Pricing() {
  const [retainer, setRetainer] = useState(false);

  return (
    <section id="pricing" className="relative py-24 px-4 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-violet-950/20 blur-[140px] rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-14">
        <motion.div
          className="text-center"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
            Pricing
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold mb-6">
            Simple,{" "}
            <span className="gradient-text">transparent</span> packages
          </motion.h2>

          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#1c1528] p-1">
            <button
              onClick={() => setRetainer(false)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-semibold transition-all",
                !retainer ? "bg-violet-600 text-white" : "text-[#94a3b8] hover:text-white"
              )}
            >
              One-time
            </button>
            <button
              onClick={() => setRetainer(true)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-semibold transition-all",
                retainer ? "bg-violet-600 text-white" : "text-[#94a3b8] hover:text-white"
              )}
            >
              Retainer <span className="text-emerald-400 ml-1">-20%</span>
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {PRICING.map(({ name, price, retainerPrice, description, features, cta, highlight }) => (
            <motion.div
              key={name}
              variants={scaleUp}
              className={cn(
                "flex flex-col gap-6 rounded-2xl border p-6",
                highlight
                  ? "border-violet-500/40 bg-violet-950/40 shadow-[0_0_40px_rgba(139,92,246,0.2)]"
                  : "border-white/[0.07] bg-[#1c1528]"
              )}
            >
              {highlight && (
                <span className="self-start rounded-full bg-violet-600 px-3 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                  Most popular
                </span>
              )}
              <div>
                <h3 className="text-base font-semibold text-white mb-1">{name}</h3>
                <p className="text-xs text-[#64748b]">{description}</p>
              </div>
              <div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={retainer ? "retainer" : "onetime"}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="text-3xl font-black gradient-text"
                  >
                    {retainer ? retainerPrice : price}
                  </motion.p>
                </AnimatePresence>
                <p className="text-[11px] text-[#64748b] mt-0.5">per campaign</p>
              </div>
              <ul className="flex flex-col gap-2 flex-1">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[#94a3b8]">
                    <Zap className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <motion.a
                href="mailto:mohamedeldesouky.h@gmail.com"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
                  highlight
                    ? "bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                    : "border border-white/10 bg-white/5 hover:bg-white/10 text-white"
                )}
              >
                {cta} <ArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FAQ ────────────────────────────────────────────────────── */

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 px-4 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-950/20 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col gap-14">
        <motion.div
          className="text-center"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
            FAQ
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold">
            Questions we{" "}
            <span className="gradient-text">hear often</span>
          </motion.h2>
        </motion.div>

        <motion.div
          className="flex flex-col divide-y divide-white/[0.06]"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {FAQS.map(({ q, a }, i) => (
            <motion.div key={q} variants={fadeUp}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-sm font-medium text-white">{q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 text-[#64748b]"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-sm text-[#94a3b8] leading-relaxed pb-5 overflow-hidden"
                  >
                    {a}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Contact ────────────────────────────────────────────────── */

function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 800));
    setStatus("sent");
  }

  return (
    <section id="contact" className="relative py-24 px-4 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-950/25 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
            Get in touch
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to make your brand{" "}
            <span className="gradient-text">everywhere?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#94a3b8] mb-8 leading-relaxed">
            Tell us about your brand and goals. We&apos;ll put together a campaign proposal within 48 hours — no commitment required.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-sm text-[#94a3b8]">
              <Mail className="w-4 h-4 text-violet-400" />
              <a href="mailto:mohamedeldesouky.h@gmail.com" className="hover:text-white transition-colors">
                mohamedeldesouky.h@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#94a3b8]">
              <MapPin className="w-4 h-4 text-violet-400" />
              Dubai · Cairo · Riyadh · London
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {status === "sent" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.07] p-10 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Message sent!</h3>
              <p className="text-sm text-[#94a3b8]">We&apos;ll be in touch within 48 hours.</p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-[#1c1528] p-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-[#64748b]">Name</label>
                  <Input
                    placeholder="Your name"
                    required
                    className="bg-[#221a32] border-white/[0.07] text-white placeholder:text-[#475569] focus-visible:ring-violet-500"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-[#64748b]">Email</label>
                  <Input
                    type="email"
                    placeholder="you@brand.com"
                    required
                    className="bg-[#221a32] border-white/[0.07] text-white placeholder:text-[#475569] focus-visible:ring-violet-500"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-[#64748b]">Brand / company</label>
                <Input
                  placeholder="Your brand name"
                  required
                  className="bg-[#221a32] border-white/[0.07] text-white placeholder:text-[#475569] focus-visible:ring-violet-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-[#64748b]">Tell us about your campaign</label>
                <Textarea
                  placeholder="Goals, platforms, budget range, timeline..."
                  rows={4}
                  className="bg-[#221a32] border-white/[0.07] text-white placeholder:text-[#475569] focus-visible:ring-violet-500 resize-none"
                />
              </div>
              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white px-6 py-2.5 text-sm font-semibold shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all"
              >
                {status === "sending" ? "Sending…" : <>Get a proposal <ArrowRight className="w-4 h-4" /></>}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-4 py-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-lg font-bold gradient-text tracking-tight">ThinkWay</span>
        <p className="text-xs text-[#64748b]">
          © {new Date().getFullYear()} ThinkWay. All rights reserved.
        </p>
        <a
          href="mailto:mohamedeldesouky.h@gmail.com"
          className="text-xs text-[#64748b] hover:text-[#94a3b8] transition-colors flex items-center gap-1.5"
        >
          <Mail className="w-3.5 h-3.5" />
          mohamedeldesouky.h@gmail.com
        </a>
      </div>
    </footer>
  );
}

/* ─── Exported page ──────────────────────────────────────────── */

export function DesignAgency() {
  return (
    <div className="min-h-screen bg-[#0c0414] text-[#f8fafc]">
      <Navbar />
      <Hero />
      <Services />
      <SocialProof />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
