"use client";

import { motion } from "framer-motion";
import { BarChart3, MapPin, Users } from "lucide-react";
import { fadeUp, scaleUp, stagger, viewport } from "@/lib/motion";

const SERVICES = [
  {
    icon: Users,
    gradient: "from-violet-500 to-purple-600",
    glow: "rgba(139,92,246,0.35)",
    tag: "Service 01",
    title: "Influencer Marketing",
    body: "We match your brand with creators who genuinely move your target audience — across TikTok, Instagram, YouTube, and beyond. No vanity metrics, only campaigns that convert.",
    bullets: [
      "Vetted creator network (200+)",
      "Micro to mega influencers",
      "Full campaign management",
      "Performance reporting",
    ],
  },
  {
    icon: MapPin,
    gradient: "from-blue-500 to-cyan-500",
    glow: "rgba(96,165,250,0.35)",
    tag: "Service 02",
    title: "Social Out-of-Home (SOOH)",
    body: "We take your best-performing social content and put it on digital screens in the real world — billboards, transit displays, shopping centres, and public spaces in 50+ cities.",
    bullets: [
      "Digital billboard placements",
      "Transit & street-level screens",
      "50+ city network",
      "Social-to-physical pipeline",
    ],
  },
  {
    icon: BarChart3,
    gradient: "from-emerald-500 to-teal-500",
    glow: "rgba(52,211,153,0.35)",
    tag: "Service 03",
    title: "Strategy & Analytics",
    body: "Every campaign is backed by data. We track reach, engagement, earned media value, and real-world impressions — and give you a clear picture of exactly what your spend delivered.",
    bullets: [
      "Cross-channel dashboards",
      "Earned media value (EMV)",
      "Audience insights",
      "Post-campaign reports",
    ],
  },
] as const;

export function Features() {
  return (
    <section id="services" className="relative py-24 px-4 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-violet-950/30 blur-[140px] rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
            What we do
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
            From the feed{" "}
            <span className="gradient-text">to the street</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#94a3b8] text-base leading-relaxed">
            ThinkWay runs end-to-end campaigns — creator partnerships online
            and high-impact placements in the physical world.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={stagger(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {SERVICES.map(({ icon: Icon, gradient, glow, tag, title, body, bullets }) => (
            <motion.div
              key={title}
              variants={scaleUp}
              whileHover={{
                y: -6,
                boxShadow: `0 20px 60px ${glow}`,
              }}
              transition={{ duration: 0.25 }}
              className="group relative flex flex-col gap-5 rounded-2xl border border-white/[0.07] bg-[#1c1528] p-6 cursor-default"
            >
              {/* Tag */}
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#64748b]">{tag}</p>

              {/* Icon */}
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}
                style={{ boxShadow: `0 0 20px ${glow}` }}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-3 flex-1">
                <h3 className="font-semibold text-white text-lg leading-snug">{title}</h3>
                <p className="text-[#94a3b8] text-sm leading-relaxed">{body}</p>
              </div>

              {/* Bullets */}
              <ul className="flex flex-col gap-1.5 pt-4 border-t border-white/[0.06]">
                {bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-xs text-[#64748b]">
                    <span className={`w-1 h-1 rounded-full bg-gradient-to-r ${gradient} shrink-0`} />
                    {b}
                  </li>
                ))}
              </ul>

              {/* Hover glow overlay */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(ellipse at top left, ${glow.replace("0.35", "0.08")}, transparent 70%)` }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
