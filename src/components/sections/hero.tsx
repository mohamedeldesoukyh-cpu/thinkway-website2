"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { ease, fadeUp, stagger, viewport } from "@/lib/motion";

/* ── Typewriter hook ─────────────────────────────────────────── */
const WORDS = [
  "Influencer Marketing",
  "Social Out-of-Home",
  "Creator Campaigns",
  "Brand Storytelling",
  "Cultural Moments",
];

function useTypewriter(words: string[], typingSpeed = 75, deleteSpeed = 40, pauseMs = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex]   = useState(0);
  const [charIndex, setCharIndex]   = useState(0);
  const [deleting,  setDeleting]    = useState(false);

  useEffect(() => {
    const current = words[wordIndex];

    if (!deleting && charIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }

    if (deleting && charIndex === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(() => {
      const next = deleting ? charIndex - 1 : charIndex + 1;
      setCharIndex(next);
      setDisplayed(current.slice(0, next));
    }, deleting ? deleteSpeed : typingSpeed);

    return () => clearTimeout(t);
  }, [charIndex, deleting, wordIndex, words, typingSpeed, deleteSpeed, pauseMs]);

  return displayed;
}

/* ── Types ───────────────────────────────────────────────────── */
type Status = "idle" | "loading" | "success" | "error";

/* ── Component ───────────────────────────────────────────────── */
export function Hero() {
  const typed   = useTypewriter(WORDS);
  const [email,   setEmail]   = useState("");
  const [status,  setStatus]  = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setMessage("");
    try {
      const res  = await fetch("/api/waitlist", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setStatus("success");
      setMessage("Got it! We'll be in touch with a proposal shortly.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden">

      {/* ── Background orbs ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-60 -right-40  w-[600px] h-[600px] rounded-full bg-violet-600/20  blur-[120px]" />
        <div className="absolute -top-40 -right-20  w-[400px] h-[400px] rounded-full bg-blue-500/15    blur-[80px]"  />
        <div className="absolute bottom-0  -left-40 w-[500px] h-[400px] rounded-full bg-violet-900/30  blur-[100px]" />
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
            Influencer Marketing · Social Out-of-Home
          </span>
        </motion.div>

        {/* Headline with typewriter */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.12] tracking-tight"
        >
          We deliver{" "}
          <br className="hidden sm:block" />
          <span className="gradient-text inline-flex items-center min-h-[1.2em]">
            {typed}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
              className="ml-0.5 inline-block w-[3px] h-[0.85em] bg-violet-400 rounded-sm align-middle"
            />
          </span>
          <br className="hidden sm:block" />
          {" "}that moves people.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={fadeUp}
          className="max-w-xl text-base sm:text-lg text-[#94a3b8] leading-relaxed"
        >
          ThinkWay connects brands with the right creators and takes campaigns
          from the social feed to physical screens — in the streets, on
          billboards, everywhere your audience lives.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3">
          <motion.a
            href="mailto:mohamedeldesouky.h@gmail.com"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white px-6 py-2.5 text-sm font-semibold shadow-[0_0_24px_rgba(139,92,246,0.4)] hover:shadow-[0_0_32px_rgba(139,92,246,0.6)] transition-all"
          >
            Start a campaign
            <ArrowRight className="w-4 h-4" />
          </motion.a>
          <motion.a
            href="#services"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white px-6 py-2.5 text-sm font-semibold transition-all"
          >
            See our work
          </motion.a>
        </motion.div>

        {/* Lead capture */}
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
                  placeholder="your@brand.com"
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
                    <>Get a proposal <ArrowRight className="w-4 h-4" /></>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

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

        {/* Trust badges */}
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-[#64748b]">
          <span>✦ 50+ brands served</span>
          <span>✦ 10M+ campaign reach</span>
          <span>✦ 200+ creator network</span>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6, ease }}
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
