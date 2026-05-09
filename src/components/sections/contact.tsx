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
    <section id="contact" className="relative py-24 px-4 overflow-hidden bg-white">

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Left — copy */}
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-[#1a6aff] mb-3">
            Get in touch
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold mb-4 text-[#080c20]">
            Ready to make your brand{" "}
            <span className="gradient-text">everywhere?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#4b5568] mb-8 leading-relaxed">
            Tell us about your brand and goals. We&apos;ll put together a campaign proposal within 48 hours — no commitment required.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-sm text-[#4b5568]">
              <Mail className="w-4 h-4 text-[#1a6aff] shrink-0" />
              <a href="mailto:mohamedeldesouky.h@gmail.com" className="hover:text-[#080c20] transition-colors">
                mohamedeldesouky.h@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#4b5568]">
              <MapPin className="w-4 h-4 text-[#1a6aff] shrink-0" />
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
                className="flex flex-col items-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-10 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-lg font-bold text-[#080c20]">Message sent!</h3>
                <p className="text-sm text-[#4b5568]">We&apos;ll be in touch within 48 hours.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 rounded-2xl border border-black/[0.07] bg-[#f5f7ff] p-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-[#6b7280]">Name</label>
                    <Input
                      name="name"
                      placeholder="Your name"
                      required
                      className="bg-white border-black/[0.08] text-[#080c20] placeholder:text-[#9ca3af] focus-visible:ring-[#1a6aff]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-[#6b7280]">Email</label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="you@brand.com"
                      required
                      className="bg-white border-black/[0.08] text-[#080c20] placeholder:text-[#9ca3af] focus-visible:ring-[#1a6aff]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[#6b7280]">Brand / company</label>
                  <Input
                    name="brand"
                    placeholder="Your brand name"
                    required
                    className="bg-white border-black/[0.08] text-[#080c20] placeholder:text-[#9ca3af] focus-visible:ring-[#1a6aff]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[#6b7280]">Tell us about your campaign</label>
                  <Textarea
                    name="message"
                    placeholder="Goals, platforms, budget range, timeline..."
                    rows={4}
                    className="bg-white border-black/[0.08] text-[#080c20] placeholder:text-[#9ca3af] focus-visible:ring-[#1a6aff] resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#1a6aff] hover:bg-[#1252cc] disabled:opacity-60 text-white px-6 py-2.5 text-sm font-semibold shadow-[0_4px_16px_rgba(26,106,255,0.3)] transition-all"
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
