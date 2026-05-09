"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Zap } from "lucide-react";
import { ease, fadeUp, scaleUp, stagger, viewport } from "@/lib/motion";

const PLANS = [
  {
    key: "free",
    name: "Free",
    monthly: 0,
    annual: 0,
    tagline: "Start your first learning journey",
    cta: "Get started free",
    ctaHref: "#",
    highlight: false,
    icon: null,
    features: [
      "3 AI learning paths",
      "Basic curriculum generation",
      "Progress tracking",
      "Community forum access",
      "Mobile app",
    ],
    missing: ["Advanced AI pacing", "Calendar sync", "Analytics dashboard", "Priority support"],
  },
  {
    key: "pro",
    name: "Pro",
    monthly: 12,
    annual: 9,
    tagline: "For serious, self-directed learners",
    cta: "Start 14-day trial",
    ctaHref: "#",
    highlight: true,
    icon: Sparkles,
    features: [
      "Unlimited AI learning paths",
      "Advanced AI pacing & adaptation",
      "Calendar sync & smart reminders",
      "Full analytics dashboard",
      "Priority support",
      "Mobile app",
    ],
    missing: ["Team dashboards", "Admin controls"],
  },
  {
    key: "team",
    name: "Team",
    monthly: 49,
    annual: 39,
    tagline: "Upskill your whole team together",
    cta: "Talk to sales",
    ctaHref: "#",
    highlight: false,
    icon: Zap,
    features: [
      "Everything in Pro",
      "Up to 20 seats",
      "Team dashboards & leaderboards",
      "Shared learning paths",
      "Admin controls & SSO",
      "Dedicated account manager",
      "Custom onboarding",
    ],
    missing: [],
  },
] as const;

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="relative py-24 px-4 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -bottom-40 right-0 w-[600px] h-[400px] bg-violet-950/30 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
            Pricing
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold mb-4">
            Simple, <span className="gradient-text">honest pricing</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#94a3b8] text-base mb-8">
            Start free. Upgrade when you need more. Cancel anytime.
          </motion.p>

          {/* Toggle */}
          <motion.div variants={fadeUp} className="inline-flex items-center gap-3 rounded-full border border-white/[0.07] bg-[#1c1528] p-1">
            <button
              onClick={() => setAnnual(false)}
              className={[
                "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                !annual ? "bg-violet-600 text-white shadow" : "text-[#94a3b8] hover:text-white",
              ].join(" ")}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={[
                "rounded-full px-4 py-1.5 text-sm font-medium transition-all flex items-center gap-2",
                annual ? "bg-violet-600 text-white shadow" : "text-[#94a3b8] hover:text-white",
              ].join(" ")}
            >
              Annual
              <span className="rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold px-1.5 py-0.5">
                −25%
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {PLANS.map(({ key, name, monthly, annual: annualPrice, tagline, cta, ctaHref, highlight, icon: Icon, features, missing }) => {
            const price = annual ? annualPrice : monthly;
            return (
              <motion.div
                key={key}
                variants={scaleUp}
                whileHover={{ y: highlight ? -4 : -4 }}
                transition={{ duration: 0.2 }}
                className={[
                  "relative flex flex-col gap-6 rounded-2xl p-6 border",
                  highlight
                    ? "bg-gradient-to-b from-violet-600/20 to-[#1c1528] border-violet-500/40 shadow-[0_0_40px_rgba(139,92,246,0.2)]"
                    : "bg-[#1c1528] border-white/[0.07]",
                ].join(" ")}
              >
                {/* Popular badge */}
                {highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-violet-600 px-3 py-1 text-[10px] font-semibold text-white shadow-lg">
                      <Sparkles className="w-2.5 h-2.5" /> Most popular
                    </span>
                  </div>
                )}

                {/* Plan name */}
                <div className="flex items-center gap-2">
                  {Icon && <Icon className="w-4 h-4 text-violet-400" />}
                  <span className="text-sm font-semibold text-[#94a3b8] uppercase tracking-wide">{name}</span>
                </div>

                {/* Price */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-end gap-1">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`${key}-${annual}`}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2, ease }}
                        className="text-4xl font-bold text-white"
                      >
                        {price === 0 ? "Free" : `$${price}`}
                      </motion.span>
                    </AnimatePresence>
                    {price > 0 && (
                      <span className="text-[#64748b] text-sm mb-1">/ mo</span>
                    )}
                  </div>
                  {annual && price > 0 && (
                    <p className="text-xs text-emerald-400">Billed annually — save ${(monthly - annualPrice) * 12}/yr</p>
                  )}
                  <p className="text-xs text-[#64748b] mt-1">{tagline}</p>
                </div>

                {/* CTA */}
                <motion.a
                  href={ctaHref}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={[
                    "w-full rounded-xl py-2.5 text-sm font-semibold text-center transition-all",
                    highlight
                      ? "bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                      : "border border-white/10 bg-white/5 hover:bg-white/10 text-white",
                  ].join(" ")}
                >
                  {cta}
                </motion.a>

                {/* Features */}
                <ul className="flex flex-col gap-2.5 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#cbd5e1]">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                  {missing.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#475569] line-through">
                      <Check className="w-4 h-4 text-[#334155] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer note */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="text-center text-xs text-[#64748b] mt-8"
        >
          All plans include a 14-day free trial. No credit card required to start.
        </motion.p>
      </div>
    </section>
  );
}
