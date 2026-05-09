"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { ease, fadeUp, stagger, viewport } from "@/lib/motion";

const SUGGESTIONS = [
  "Master system design",
  "Learn TypeScript in 30 days",
  "Understand machine learning",
  "Build a SaaS from scratch",
  "Deep-dive into databases",
];

type Status = "idle" | "loading" | "success" | "error";

export function Hero() {
  const [email, setEmail]   = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");

      setStatus("success");
      setMessage("You're on the list! We'll be in touch soon.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      {/* ── Gradient orbs ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-60 -right-40 w-[600px] h-[600px] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute -top-40 -right-20 w-[400px] h-[400px] rounded-full bg-blue-500/15 blur-[80px]" />
        <div className="absolute bottom-0 -left-40 w-[500px] h-[400px] rounded-full bg-violet-900/30 blur-[100px]" />
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

        {/* Waitlist form */}
        <motion.div variants={fadeUp} className="w-full max-w-md mt-2">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-4"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <p className="text-sm text-emerald-300 font-medium">{message}</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-2"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 rounded-xl border border-white/[0.07] bg-[#1c1528] px-4 py-3 text-sm text-white placeholder:text-[#475569] outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
                />
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={{ scale: status === "loading" ? 1 : 1.04 }}
                  whileTap={{ scale: status === "loading" ? 1 : 0.97 }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white px-5 py-3 text-sm font-semibold shadow-[0_0_24px_rgba(139,92,246,0.4)] transition-all whitespace-nowrap"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Join waitlist
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Error message */}
          <AnimatePresence>
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-2 text-xs text-red-400 text-center"
              >
                {message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Suggestion pills */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-2"
        >
          {SUGGESTIONS.map((s) => (
            <motion.button
              key={s}
              type="button"
              onClick={() => setEmail("")}
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
