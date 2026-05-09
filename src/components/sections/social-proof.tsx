"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { fadeUp, scaleUp, stagger, viewport } from "@/lib/motion";
import { CountUp } from "@/components/ui/count-up";

const STATS = [
  { value: "50+",  label: "Brands worked with" },
  { value: "200+", label: "Creators in network" },
  { value: "10M+", label: "Campaign reach"      },
  { value: "50+",  label: "Cities for SOOH"     },
] as const;

const TESTIMONIALS = [
  {
    name: "Layla Hassan",
    role: "Head of Marketing @ NovaBrand",
    initials: "LH",
    color: "bg-[#1a6aff]",
    stars: 5,
    quote:
      "ThinkWay ran our biggest influencer campaign to date and then put our content on billboards across Dubai and Cairo. The brand awareness lift was unlike anything we'd done before.",
  },
  {
    name: "James Okafor",
    role: "CMO @ Pulse Streetwear",
    initials: "JO",
    color: "bg-[#0ea5e9]",
    stars: 5,
    quote:
      "The SOOH side is what really blew us away. Seeing our Instagram content on a massive digital screen in a shopping mall — our customers went crazy sharing it. Incredible earned media.",
  },
  {
    name: "Sara Al-Mansoori",
    role: "Brand Director @ Lumière",
    initials: "SM",
    color: "bg-[#10b981]",
    stars: 5,
    quote:
      "They found us creators we'd never have discovered ourselves — genuinely aligned with our audience. The campaign felt authentic, not like an ad. Our engagement rates tripled.",
  },
] as const;

const BRANDS = ["NovaBrand", "Pulse", "Lumière", "Orbit", "Helio", "Drift"] as const;

export function SocialProof() {
  return (
    <section id="social-proof" className="relative py-24 px-4 overflow-hidden bg-[#f5f7ff]">

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-20">

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-5"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {STATS.map(({ value, label }) => (
            <motion.div
              key={label}
              variants={scaleUp}
              className="flex flex-col items-center gap-1 rounded-2xl border border-black/[0.06] bg-white py-8 px-4 text-center shadow-sm"
            >
              <CountUp value={value} className="text-3xl font-bold gradient-text" />
              <span className="text-xs text-[#6b7280]">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Brand strip */}
        <motion.div
          className="flex flex-col items-center gap-6"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.p variants={fadeUp} className="text-xs text-[#9ca3af] uppercase tracking-widest">
            Trusted by brands like
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {BRANDS.map((name) => (
              <span key={name} className="text-[#9ca3af] font-bold text-sm hover:text-[#080c20] transition-colors cursor-default tracking-wide">
                {name}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Testimonials */}
        <div className="flex flex-col items-center gap-12">
          <motion.div
            className="text-center"
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-[#1a6aff] mb-3">
              Client stories
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-[#080c20]">
              Brands that{" "}
              <span className="gradient-text">think differently</span>
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
                whileHover={{ y: -4, borderColor: "rgba(26,106,255,0.3)" }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-4 rounded-2xl border border-black/[0.06] bg-white p-6 shadow-sm"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-[#4b5568] leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-black/[0.05]">
                  <div className={`w-9 h-9 rounded-full ${color} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#080c20] leading-tight">{name}</p>
                    <p className="text-xs text-[#6b7280] leading-tight mt-0.5">{role}</p>
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
