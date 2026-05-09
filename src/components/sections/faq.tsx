"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { ease, fadeUp, stagger, viewport } from "@/lib/motion";

const FAQS = [
  {
    q: "What is Social Out-of-Home (SOOH)?",
    a: "Social Out-of-Home bridges the gap between social media and physical advertising. We take your best-performing social content — a TikTok, an Instagram post, a creator's video — and display it on digital billboards, transit screens, and public displays in the real world. It amplifies your online campaign and drives massive earned media when audiences photograph and reshare what they see.",
  },
  {
    q: "How do you find the right influencers for my brand?",
    a: "We start with your brief: target audience, brand values, campaign goals. Our team then hand-picks creators from our vetted network of 200+ influencers — analysing audience demographics, engagement rates, and content authenticity, not just follower counts. You approve every creator before we proceed.",
  },
  {
    q: "Which platforms do you work with?",
    a: "We run campaigns across TikTok, Instagram (Feed, Stories, Reels), YouTube, and X. For SOOH we have placements in 50+ cities across the Middle East, North Africa, and Europe — including digital billboards, mall screens, transit displays, and street-level panels.",
  },
  {
    q: "How long does a campaign take from brief to live?",
    a: "Typically 2–3 weeks from signed brief to first content going live. This covers creator briefing and approval, content production, and platform scheduling. SOOH placements can be activated within 5–7 business days once creative is finalised.",
  },
  {
    q: "Do you work with smaller or newer brands?",
    a: "Yes. Our Starter package is designed for brands running their first influencer campaigns. We help you define your creator strategy, set realistic KPIs, and build the foundation for larger campaigns as you grow.",
  },
  {
    q: "What does success look like — how do you measure results?",
    a: "We track reach, impressions, engagement rate, earned media value (EMV), click-through rates, and (where applicable) conversions. Every campaign ends with a full performance report. For SOOH we also report physical impressions based on footfall data from screen locations.",
  },
] as const;

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div layout className="rounded-xl border border-white/[0.07] bg-[#1c1528] overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-white leading-snug">{q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease }}
          className="shrink-0 mt-0.5"
        >
          <Plus className="w-4 h-4 text-violet-400" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            <p className="px-5 pb-5 text-sm text-[#94a3b8] leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 px-4">
      <div className="relative z-10 max-w-3xl mx-auto">

        <motion.div
          className="text-center mb-12"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
            FAQ
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold mb-4">
            Questions,{" "}
            <span className="gradient-text">answered</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#94a3b8] text-base">
            Everything you need to know before we start building your campaign.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col gap-2"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {FAQS.map(({ q, a }, i) => (
            <motion.div key={q} variants={fadeUp}>
              <FAQItem
                q={q}
                a={a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="text-center mt-10 text-sm text-[#64748b]"
        >
          Still have questions?{" "}
          <a
            href="mailto:mohamedeldesouky.h@gmail.com"
            className="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors"
          >
            Drop us a line
          </a>
        </motion.p>
      </div>
    </section>
  );
}
