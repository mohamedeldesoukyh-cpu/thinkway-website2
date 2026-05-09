"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { ease, fadeUp, scaleUp, stagger, viewport } from "@/lib/motion";

const PACKAGES = [
  {
    key: "starter",
    name: "Starter",
    monthly: 1500,
    annual: 1200,
    tagline: "Perfect for your first campaign",
    cta: "Get started",
    ctaHref: "mailto:mohamedeldesouky.h@gmail.com",
    highlight: false,
    features: [
      "1 influencer campaign / month",
      "Up to 5 creators",
      "TikTok or Instagram",
      "Campaign strategy brief",
      "Post-campaign report",
    ],
    missing: ["SOOH placements", "Dedicated account manager", "Multi-platform"],
  },
  {
    key: "growth",
    name: "Growth",
    monthly: 4500,
    annual: 3600,
    tagline: "For brands ready to scale",
    cta: "Start a campaign",
    ctaHref: "mailto:mohamedeldesouky.h@gmail.com",
    highlight: true,
    features: [
      "3 campaigns / month",
      "Up to 20 creators",
      "Multi-platform (TikTok, IG, YT)",
      "SOOH placements (5 cities)",
      "Dedicated account manager",
      "Real-time analytics dashboard",
      "Full campaign strategy",
    ],
    missing: ["Unlimited cities", "Custom creator exclusivity"],
  },
  {
    key: "enterprise",
    name: "Enterprise",
    monthly: 0,
    annual: 0,
    tagline: "Custom scope, maximum impact",
    cta: "Talk to us",
    ctaHref: "mailto:mohamedeldesouky.h@gmail.com",
    highlight: false,
    features: [
      "Unlimited campaigns",
      "Full creator network access",
      "SOOH in 50+ cities",
      "Creator exclusivity deals",
      "Custom contract & SLA",
      "Dedicated team",
      "White-label reporting",
    ],
    missing: [],
  },
] as const;

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="relative py-24 px-4 overflow-hidden bg-white">

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-[#1a6aff] mb-3">
            Packages
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold mb-4 text-[#080c20]">
            Investment that{" "}
            <span className="gradient-text">pays for itself</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#4b5568] text-base mb-8">
            Flexible packages built around your campaign goals. No lock-in — scale up or down anytime.
          </motion.p>

          {/* Toggle */}
          <motion.div variants={fadeUp} className="inline-flex items-center gap-1 rounded-full border border-black/[0.08] bg-[#f5f7ff] p-1">
            <button
              onClick={() => setAnnual(false)}
              className={["rounded-full px-5 py-1.5 text-sm font-medium transition-all", !annual ? "bg-[#1a6aff] text-white shadow-sm" : "text-[#4b5568] hover:text-[#080c20]"].join(" ")}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={["rounded-full px-5 py-1.5 text-sm font-medium transition-all flex items-center gap-2", annual ? "bg-[#1a6aff] text-white shadow-sm" : "text-[#4b5568] hover:text-[#080c20]"].join(" ")}
            >
              Retainer
              <span className="rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-semibold px-1.5 py-0.5">−20%</span>
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
          {PACKAGES.map(({ key, name, monthly, annual: annualPrice, tagline, cta, ctaHref, highlight, features, missing }) => {
            const price    = annual ? annualPrice : monthly;
            const isCustom = price === 0;
            return (
              <motion.div
                key={key}
                variants={scaleUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={[
                  "relative flex flex-col gap-6 rounded-2xl p-6 border",
                  highlight
                    ? "bg-[#1a6aff] border-[#1a6aff] shadow-[0_8px_40px_rgba(26,106,255,0.3)]"
                    : "bg-[#f5f7ff] border-black/[0.06]",
                ].join(" ")}
              >
                {highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[10px] font-bold text-[#1a6aff] shadow">
                      <Zap className="w-2.5 h-2.5" /> Most popular
                    </span>
                  </div>
                )}

                <div>
                  <span className={["text-sm font-bold uppercase tracking-wide", highlight ? "text-white/80" : "text-[#6b7280]"].join(" ")}>
                    {name}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-end gap-1">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`${key}-${annual}`}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2, ease }}
                        className={["text-4xl font-black", highlight ? "text-white" : "text-[#080c20]"].join(" ")}
                      >
                        {isCustom ? "Custom" : `$${price.toLocaleString()}`}
                      </motion.span>
                    </AnimatePresence>
                    {!isCustom && (
                      <span className={["text-sm mb-1", highlight ? "text-white/60" : "text-[#6b7280]"].join(" ")}>/ mo</span>
                    )}
                  </div>
                  {annual && !isCustom && (
                    <p className={["text-xs", highlight ? "text-white/70" : "text-emerald-600"].join(" ")}>
                      Retainer rate — save ${((monthly - annualPrice) * 12).toLocaleString()}/yr
                    </p>
                  )}
                  <p className={["text-xs mt-1", highlight ? "text-white/70" : "text-[#6b7280]"].join(" ")}>{tagline}</p>
                </div>

                <motion.a
                  href={ctaHref}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={[
                    "w-full rounded-xl py-2.5 text-sm font-semibold text-center transition-all",
                    highlight
                      ? "bg-white text-[#1a6aff] hover:bg-blue-50"
                      : "bg-[#1a6aff] text-white hover:bg-[#1252cc] shadow-[0_2px_12px_rgba(26,106,255,0.25)]",
                  ].join(" ")}
                >
                  {cta}
                </motion.a>

                <ul className="flex flex-col gap-2.5 flex-1">
                  {features.map((f) => (
                    <li key={f} className={["flex items-start gap-2.5 text-sm", highlight ? "text-white/90" : "text-[#374151]"].join(" ")}>
                      <Check className={["w-4 h-4 shrink-0 mt-0.5", highlight ? "text-white" : "text-[#1a6aff]"].join(" ")} />
                      {f}
                    </li>
                  ))}
                  {missing.map((f) => (
                    <li key={f} className={["flex items-start gap-2.5 text-sm line-through", highlight ? "text-white/30" : "text-[#9ca3af]"].join(" ")}>
                      <Check className={["w-4 h-4 shrink-0 mt-0.5", highlight ? "text-white/30" : "text-[#d1d5db]"].join(" ")} />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="text-center text-xs text-[#6b7280] mt-8"
        >
          All packages include a free strategy call. Enterprise pricing is scoped per campaign.
        </motion.p>
      </div>
    </section>
  );
}
