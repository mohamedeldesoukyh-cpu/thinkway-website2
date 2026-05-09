"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, MapPin, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fadeUp, stagger, viewport } from "@/lib/motion";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name:    (form.elements.namedItem("name")    as HTMLInputElement).value,
      email:   (form.elements.namedItem("email")   as HTMLInputElement).value,
      brand:   (form.elements.namedItem("brand")   as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      // best-effort — still show success to user
    }

    setStatus("sent");
  }

  return (
    <section id="contact" className="relative py-24 px-4 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-950/25 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Left — copy */}
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
            Get in touch
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to make your brand{" "}
            <span className="gradient-text">everywhere?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#94a3b8] mb-8 leading-relaxed">
            Tell us about your brand and goals. We&apos;ll put together a campaign proposal within 48 hours — no commitment required.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-sm text-[#94a3b8]">
              <Mail className="w-4 h-4 text-violet-400 shrink-0" />
              <a href="mailto:mohamedeldesouky.h@gmail.com" className="hover:text-white transition-colors">
                mohamedeldesouky.h@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#94a3b8]">
              <MapPin className="w-4 h-4 text-violet-400 shrink-0" />
              Dubai · Cairo · Riyadh · London
            </div>
          </motion.div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.07] p-10 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Message sent!</h3>
                <p className="text-sm text-[#94a3b8]">We&apos;ll be in touch within 48 hours.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-[#1c1528] p-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-[#64748b]">Name</label>
                    <Input
                      name="name"
                      placeholder="Your name"
                      required
                      className="bg-[#221a32] border-white/[0.07] text-white placeholder:text-[#475569] focus-visible:ring-violet-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-[#64748b]">Email</label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="you@brand.com"
                      required
                      className="bg-[#221a32] border-white/[0.07] text-white placeholder:text-[#475569] focus-visible:ring-violet-500"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-[#64748b]">Brand / company</label>
                  <Input
                    name="brand"
                    placeholder="Your brand name"
                    required
                    className="bg-[#221a32] border-white/[0.07] text-white placeholder:text-[#475569] focus-visible:ring-violet-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-[#64748b]">Tell us about your campaign</label>
                  <Textarea
                    name="message"
                    placeholder="Goals, platforms, budget range, timeline..."
                    rows={4}
                    className="bg-[#221a32] border-white/[0.07] text-white placeholder:text-[#475569] focus-visible:ring-violet-500 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white px-6 py-2.5 text-sm font-semibold shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all"
                >
                  {status === "sending" ? "Sending…" : (
                    <>Get a proposal <ArrowRight className="w-4 h-4" /></>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
