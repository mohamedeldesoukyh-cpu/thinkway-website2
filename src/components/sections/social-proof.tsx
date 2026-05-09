"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { fadeUp, scaleUp, stagger, viewport } from "@/lib/motion";

const STATS = [
  { value: "10,000+", label: "Active learners" },
  { value: "500+",    label: "Topics covered"  },
  { value: "4.9 / 5", label: "Average rating"  },
  { value: "94%",     label: "Goal completion" },
] as const;

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Software engineer @ Stripe",
    initials: "SC",
    color: "from-violet-500 to-purple-600",
    stars: 5,
    quote:
      "I went from zero to shipping a full-stack app in 6 weeks. ThinkWay's path kept me from drowning in random tutorials — everything was sequenced perfectly.",
  },
  {
    name: "Marcus Webb",
    role: "Product manager → ML engineer",
    initials: "MW",
    color: "from-blue-500 to-cyan-500",
    stars: 5,
    quote:
      "Making a career switch felt overwhelming until I found ThinkWay. The AI curriculum mapped exactly what I needed to learn to land my first ML role.",
  },
  {
    name: "Priya Nair",
    role: "Indie hacker & founder",
    initials: "PN",
    color: "from-emerald-500 to-teal-500",
    stars: 5,
    quote:
      "I've tried Udemy, YouTube, bootcamps — nothing stuck. ThinkWay's adaptive scheduling means I actually finish what I start, even with a newborn at home.",
  },
] as const;

const LOGOS = [
  "Stripe", "Notion", "Linear", "Vercel", "Figma", "Supabase",
] as const;

export function SocialProof() {
  return (
    <section id="social-proof" className="relative py-24 px-4 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/3 w-[600px] h-[300px] bg-blue-900/20 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-20">

        {/* ── Stats ── */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-6"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {STATS.map(({ value, label }) => (
            <motion.div
              key={label}
              variants={scaleUp}
              className="flex flex-col items-center gap-1 rounded-2xl border border-white/[0.07] bg-[#1c1528] py-8 px-4 text-center"
            >
              <span className="text-3xl font-bold gradient-text">{value}</span>
              <span className="text-xs text-[#94a3b8]">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Logo strip ── */}
        <motion.div
          className="flex flex-col items-center gap-6"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.p variants={fadeUp} className="text-xs text-[#64748b] uppercase tracking-widest">
            Learners from teams at
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {LOGOS.map((name) => (
              <span key={name} className="text-[#475569] font-semibold text-sm hover:text-[#94a3b8] transition-colors cursor-default">
                {name}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Testimonials ── */}
        <div className="flex flex-col items-center gap-12">
          <motion.div
            className="text-center"
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
              What learners say
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold">
              Loved by <span className="gradient-text">real people</span>
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full"
            variants={stagger(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            {TESTIMONIALS.map(({ name, role, initials, color, stars, quote }) => (
              <motion.div
                key={name}
                variants={scaleUp}
                whileHover={{ y: -4, borderColor: "rgba(139,92,246,0.3)" }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-[#1c1528] p-6"
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-[#94a3b8] leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white leading-tight">{name}</p>
                    <p className="text-xs text-[#64748b] leading-tight mt-0.5">{role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
