"use client";

import { motion } from "framer-motion";
import { BarChart3, BrainCircuit, CalendarClock } from "lucide-react";
import { fadeUp, scaleUp, stagger, viewport } from "@/lib/motion";

const FEATURES = [
  {
    icon: BrainCircuit,
    gradient: "from-violet-500 to-purple-600",
    glow: "rgba(139,92,246,0.35)",
    title: "Personalised AI paths",
    body: "Describe your goal and current level. ThinkWay generates a structured, week-by-week curriculum tailored to exactly where you are and where you want to go.",
    bullets: ["Custom pacing", "Skill-gap analysis", "Progressive difficulty"],
  },
  {
    icon: CalendarClock,
    gradient: "from-blue-500 to-cyan-500",
    glow: "rgba(96,165,250,0.35)",
    title: "Adaptive scheduling",
    body: "Tell ThinkWay how many hours per week you can commit. It fits your learning plan around your life, not the other way around.",
    bullets: ["Calendar sync", "Smart reminders", "Flexible rescheduling"],
  },
  {
    icon: BarChart3,
    gradient: "from-emerald-500 to-teal-500",
    glow: "rgba(52,211,153,0.35)",
    title: "Visual progress tracking",
    body: "Stay motivated with streaks, completion milestones, and skill-tree visualisations that show exactly how far you've come.",
    bullets: ["Streak system", "Skill map", "Weekly reports"],
  },
] as const;

export function Features() {
  return (
    <section id="features" className="relative py-24 px-4 overflow-hidden">
      {/* background accent */}
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
            What you get
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
            Everything you need to{" "}
            <span className="gradient-text">learn faster</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#94a3b8] text-base leading-relaxed">
            ThinkWay combines AI curriculum design, smart scheduling, and
            progress science into one seamless experience.
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
          {FEATURES.map(({ icon: Icon, gradient, glow, title, body, bullets }) => (
            <motion.div
              key={title}
              variants={scaleUp}
              whileHover={{
                y: -6,
                boxShadow: `0 20px 60px ${glow}`,
                borderColor: glow.replace("0.35", "0.5"),
              }}
              transition={{ duration: 0.25 }}
              className="group relative flex flex-col gap-5 rounded-2xl border border-white/[0.07] bg-[#1c1528] p-6 cursor-default"
            >
              {/* icon */}
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}
                style={{ boxShadow: `0 0 20px ${glow}` }}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>

              {/* text */}
              <div className="flex flex-col gap-3 flex-1">
                <h3 className="font-semibold text-white text-lg leading-snug">{title}</h3>
                <p className="text-[#94a3b8] text-sm leading-relaxed">{body}</p>
              </div>

              {/* bullets */}
              <ul className="flex flex-col gap-1.5 mt-auto pt-4 border-t border-white/[0.06]">
                {bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-xs text-[#64748b]">
                    <span
                      className={`w-1 h-1 rounded-full bg-gradient-to-r ${gradient} shrink-0`}
                    />
                    {b}
                  </li>
                ))}
              </ul>

              {/* hover glow overlay */}
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
