"use client";

import { motion } from "framer-motion";
import { BarChart3, MapPin, Users } from "lucide-react";
import { fadeUp, scaleUp, stagger, viewport } from "@/lib/motion";

const SERVICES = [
  {
    icon: Users,
    color: "bg-[#1a6aff]",
    glow: "rgba(26,106,255,0.18)",
    tag: "Service 01",
    title: "Influencer Marketing",
    body: "We match your brand with creators who genuinely move your target audience — across TikTok, Instagram, YouTube, and beyond. No vanity metrics, only campaigns that convert.",
    bullets: [
      "Vetted creator network (200+)",
      "Micro to mega influencers",
      "Full campaign management",
      "Performance reporting",
    ],
    accent: "#1a6aff",
  },
  {
    icon: MapPin,
    color: "bg-[#0ea5e9]",
    glow: "rgba(14,165,233,0.18)",
    tag: "Service 02",
    title: "Social Out-of-Home (SOOH)",
    body: "We take your best-performing social content and put it on digital screens in the real world — billboards, transit displays, shopping centres, and public spaces in 50+ cities.",
    bullets: [
      "Digital billboard placements",
      "Transit & street-level screens",
      "50+ city network",
      "Social-to-physical pipeline",
    ],
    accent: "#0ea5e9",
  },
  {
    icon: BarChart3,
    color: "bg-[#10b981]",
    glow: "rgba(16,185,129,0.18)",
    tag: "Service 03",
    title: "Strategy & Analytics",
    body: "Every campaign is backed by data. We track reach, engagement, earned media value, and real-world impressions — and give you a clear picture of exactly what your spend delivered.",
    bullets: [
      "Cross-channel dashboards",
      "Earned media value (EMV)",
      "Audience insights",
      "Post-campaign reports",
    ],
    accent: "#10b981",
  },
] as const;

export function Features() {
  return (
    <section id="services" className="relative py-24 px-4 overflow-hidden bg-white">

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-[#1a6aff] mb-3">
            What we do
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold leading-tight mb-4 text-[#080c20]">
            From the feed{" "}
            <span className="gradient-text">to the street</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#4b5568] text-base leading-relaxed">
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
          {SERVICES.map(({ icon: Icon, color, glow, tag, title, body, bullets, accent }) => (
            <motion.div
              key={title}
              variants={scaleUp}
              whileHover={{ y: -6, boxShadow: `0 20px 60px ${glow}` }}
              transition={{ duration: 0.25 }}
              className="group relative flex flex-col gap-5 rounded-2xl border border-black/[0.06] bg-[#f5f7ff] p-6 cursor-default"
            >
              {/* Tag */}
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6b7280]">{tag}</p>

              {/* Icon */}
              <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center`}
                style={{ boxShadow: `0 0 18px ${glow}` }}>
                <Icon className="w-5 h-5 text-white" />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-3 flex-1">
                <h3 className="font-bold text-[#080c20] text-lg leading-snug">{title}</h3>
                <p className="text-[#4b5568] text-sm leading-relaxed">{body}</p>
              </div>

              {/* Bullets */}
              <ul className="flex flex-col gap-1.5 pt-4 border-t border-black/[0.05]">
                {bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-xs text-[#6b7280]">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                    {b}
                  </li>
                ))}
              </ul>

              {/* Hover overlay */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(ellipse at top left, ${glow}, transparent 70%)` }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
