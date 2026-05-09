"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { ease, fadeUp, stagger, viewport } from "@/lib/motion";

const FAQS = [
  {
    q: "What exactly is ThinkWay?",
    a: "ThinkWay is an AI-powered learning platform that builds personalised, structured curricula for any topic you want to master. Instead of searching YouTube or drowning in Udemy courses, you describe your goal and ThinkWay creates a step-by-step path tailored to your level, schedule, and learning style.",
  },
  {
    q: "How does the AI create my learning path?",
    a: "You tell us what you want to learn, your current level, your weekly time commitment, and your goal (e.g. 'get a job', 'build a side project', 'pass a certification'). Our model synthesises the optimal learning sequence, breaks it into weekly milestones, and sources the best free and paid resources for each step.",
  },
  {
    q: "Is ThinkWay different from YouTube or Udemy?",
    a: "Very different. YouTube and Udemy are content repositories — you still have to figure out what to watch and in what order. ThinkWay is a learning architect. It decides the sequence, tracks your progress, adapts when you fall behind, and tells you exactly what to do next.",
  },
  {
    q: "Can I switch topics or start over?",
    a: "Absolutely. You can pause any path, pivot to a new topic, or restart from a different entry point at any time. Your completed progress is always saved so you can resume exactly where you left off.",
  },
  {
    q: "Does it work on mobile?",
    a: "Yes — ThinkWay has a fully responsive web app and native iOS/Android apps. You can check your daily tasks, mark lessons complete, and review your progress all from your phone.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes, with no questions asked. Cancel from your account settings and you keep access until the end of your billing period. We don't do dark patterns or cancellation loops.",
  },
] as const;

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      layout
      className="rounded-xl border border-white/[0.07] bg-[#1c1528] overflow-hidden"
    >
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
        {/* Header */}
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
            Questions, <span className="gradient-text">answered</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#94a3b8] text-base">
            Everything you need to know before you start.
          </motion.p>
        </motion.div>

        {/* Items */}
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

        {/* Bottom CTA */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="text-center mt-10 text-sm text-[#64748b]"
        >
          Still have questions?{" "}
          <a href="mailto:mohamedeldesouky.h@gmail.com" className="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors">
            Drop us a line
          </a>
        </motion.p>
      </div>
    </section>
  );
}
