"use client";

import { motion } from "framer-motion";
import { ArrowRight, Paperclip, Sparkles } from "lucide-react";
import { ease, fadeUp, stagger, viewport } from "@/lib/motion";

const SUGGESTIONS = [
  "Master system design",
  "Learn TypeScript in 30 days",
  "Understand machine learning",
  "Build a SaaS from scratch",
  "Deep-dive into databases",
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      {/* ── Gradient orbs ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* top-right cluster */}
        <div className="absolute -top-60 -right-40 w-[600px] h-[600px] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute -top-40 -right-20 w-[400px] h-[400px] rounded-full bg-blue-500/15 blur-[80px]" />
        {/* bottom-left accent */}
        <div className="absolute bottom-0 -left-40 w-[500px] h-[400px] rounded-full bg-violet-900/30 blur-[100px]" />
        {/* centre ambient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-violet-950/40 blur-[140px]" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center gap-6"
        variants={stagger(0.1)}
        initial="hidden"
        animate="show"
        viewport={viewport}
      >
        {/* Badge */}
        <motion.div variants={fadeUp}>
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-400" />
            </span>
            AI-powered learning, reimagined
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.12] tracking-tight"
        >
          The fastest way to{" "}
          <span className="gradient-text">master anything</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={fadeUp}
          className="max-w-xl text-base sm:text-lg text-[#94a3b8] leading-relaxed"
        >
          Describe what you want to learn and ThinkWay builds a structured,
          personalised curriculum in seconds — powered by AI, paced by you.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3">
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white px-6 py-2.5 text-sm font-semibold shadow-[0_0_24px_rgba(139,92,246,0.4)] hover:shadow-[0_0_32px_rgba(139,92,246,0.6)] transition-all"
          >
            Start learning free
            <ArrowRight className="w-4 h-4" />
          </motion.a>
          <motion.a
            href="#features"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white px-6 py-2.5 text-sm font-semibold transition-all"
          >
            See how it works
          </motion.a>
        </motion.div>

        {/* Prompt bar */}
        <motion.div
          variants={fadeUp}
          className="w-full max-w-2xl mt-2"
        >
          <motion.div
            whileHover={{ boxShadow: "0 0 0 1px rgba(139,92,246,0.5), 0 8px 32px rgba(139,92,246,0.15)" }}
            transition={{ duration: 0.2, ease }}
            className="flex items-center gap-1 rounded-2xl border border-white/[0.07] bg-[#1c1528] p-2 shadow-lg"
          >
            <button
              aria-label="Attach file"
              className="p-2 rounded-xl text-[#64748b] hover:text-[#94a3b8] hover:bg-white/5 transition-colors"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <button
              aria-label="AI assist"
              className="p-2 rounded-xl text-violet-400 hover:text-violet-300 hover:bg-white/5 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <input
              type="text"
              placeholder="What do you want to learn today?"
              className="flex-1 bg-transparent text-sm text-[#94a3b8] placeholder:text-[#475569] outline-none px-2"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-xl bg-violet-600 hover:bg-violet-500 text-white px-4 py-1.5 text-xs font-semibold transition-colors mr-1"
            >
              Generate path
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Suggestion pills */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-2"
        >
          {SUGGESTIONS.map((s) => (
            <motion.button
              key={s}
              whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.08)" }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full border border-white/[0.07] bg-[#1c1528] px-4 py-1.5 text-xs text-[#94a3b8] transition-colors"
            >
              {s}
            </motion.button>
          ))}
        </motion.div>

        {/* Trust line */}
        <motion.p variants={fadeUp} className="text-xs text-[#64748b]">
          No credit card required · Free forever plan · Cancel anytime
        </motion.p>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-transparent via-violet-400/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
