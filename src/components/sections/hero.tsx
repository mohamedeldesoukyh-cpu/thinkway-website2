"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { ease, fadeUp, stagger, viewport } from "@/lib/motion";
import { FloatingScreens } from "@/components/ui/floating-screens";

const Scene3D = dynamic(
  () => import("@/components/ui/scene-3d").then((m) => m.Scene3D),
  { ssr: false }
);

/* ── Typewriter ───────────────────────────────────────────────── */
const WORDS = [
  "Influencer Marketing",
  "Social Out-of-Home",
  "Creator Campaigns",
  "Brand Storytelling",
  "Cultural Moments",
];

function useTypewriter(words: string[], typingSpeed = 75, deleteSpeed = 40, pauseMs = 2200) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting]   = useState(false);

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

type Status = "idle" | "loading" | "success" | "error";

/* ── Component ────────────────────────────────────────────────── */
export function Hero() {
  const typed = useTypewriter(WORDS);
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
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
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
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden bg-white">

      {/* ── 3D mind-network scene ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Scene3D />
      </div>

      {/* ── Radial vignette — keeps centre clear for text ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 65% 60% at 50% 50%, white 35%, rgba(255,255,255,0.55) 65%, transparent 100%)",
        }}
      />

      {/* ── Grid floor ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[38%] overflow-hidden"
        style={{ maskImage: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 100%)" }}
      >
        <div className="hero-grid w-full h-full" />
      </div>

      {/* ── Floating billboard / phone cards ── */}
      <FloatingScreens />

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center gap-6"
        variants={stagger(0.1)}
        initial="hidden"
        animate="show"
        viewport={viewport}
      >
        {/* Badge */}
        <motion.div variants={fadeUp}>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#1a6aff]/25 bg-[#1a6aff]/06 px-4 py-1.5 text-xs font-semibold text-[#1a6aff]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1a6aff] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1a6aff]" />
            </span>
            Influencer Marketing · Social Out-of-Home
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.08] tracking-tight text-[#080c20]"
        >
          We deliver{" "}
          <br className="hidden sm:block" />
          <span className="gradient-text inline-flex items-center min-h-[1.2em]">
            {typed}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
              className="ml-0.5 inline-block w-[3px] h-[0.85em] bg-[#1a6aff] rounded-sm align-middle"
            />
          </span>
          <br className="hidden sm:block" />
          {" "}that moves people.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={fadeUp}
          className="max-w-xl text-base sm:text-lg text-[#4b5568] leading-relaxed"
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
            className="inline-flex items-center gap-2 rounded-full bg-[#1a6aff] hover:bg-[#1252cc] text-white px-6 py-2.5 text-sm font-semibold shadow-[0_4px_20px_rgba(26,106,255,0.35)] hover:shadow-[0_4px_28px_rgba(26,106,255,0.5)] transition-all"
          >
            Start a campaign
            <ArrowRight className="w-4 h-4" />
          </motion.a>
          <motion.a
            href="#services"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] hover:bg-black/[0.06] text-[#080c20] px-6 py-2.5 text-sm font-semibold transition-all"
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
                className="flex items-center justify-center gap-2.5 rounded-2xl border border-emerald-400/30 bg-emerald-50 px-6 py-4"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <p className="text-sm text-emerald-700 font-medium">{message}</p>
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
                  className="flex-1 rounded-xl border border-black/[0.08] bg-white px-4 py-3 text-sm text-[#080c20] placeholder:text-[#9ca3af] outline-none focus:border-[#1a6aff]/50 focus:ring-2 focus:ring-[#1a6aff]/15 transition-all shadow-sm"
                />
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={{ scale: status === "loading" ? 1 : 1.04 }}
                  whileTap={{ scale: status === "loading" ? 1 : 0.97 }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1a6aff] hover:bg-[#1252cc] disabled:opacity-60 text-white px-5 py-3 text-sm font-semibold shadow-[0_4px_16px_rgba(26,106,255,0.3)] transition-all whitespace-nowrap"
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
                className="mt-2 text-xs text-red-500 text-center"
              >
                {message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Trust badges */}
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-[#6b7280]">
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
          className="w-px h-8 bg-gradient-to-b from-transparent via-[#1a6aff]/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
