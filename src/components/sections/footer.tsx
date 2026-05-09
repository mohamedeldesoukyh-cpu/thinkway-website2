"use client";

import { motion } from "framer-motion";
import { ArrowRight, GitBranch, Globe, Sparkles } from "lucide-react";
import { fadeUp, stagger, viewport } from "@/lib/motion";

const LINKS = {
  Product: [
    { label: "Features",   href: "#features"      },
    { label: "Pricing",    href: "#pricing"        },
    { label: "Changelog",  href: "#"               },
    { label: "Roadmap",    href: "#"               },
  ],
  Company: [
    { label: "About",      href: "#"               },
    { label: "Blog",       href: "#"               },
    { label: "Careers",    href: "#"               },
    { label: "Press kit",  href: "#"               },
  ],
  Legal: [
    { label: "Privacy",    href: "#"               },
    { label: "Terms",      href: "#"               },
    { label: "Cookies",    href: "#"               },
    { label: "Security",   href: "#"               },
  ],
} as const;

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] pt-16 pb-10 px-4 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-violet-950/20 blur-[100px] rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* CTA Banner */}
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-600/10 to-[#1c1528] p-8 sm:p-12 text-center mb-16 flex flex-col items-center gap-6"
        >
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold">
            Ready to learn{" "}
            <span className="gradient-text">smarter?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#94a3b8] text-sm max-w-sm">
            Join 10,000+ learners who use ThinkWay to master new skills faster than they thought possible.
          </motion.p>
          <motion.a
            variants={fadeUp}
            href="#pricing"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white px-6 py-2.5 text-sm font-semibold shadow-[0_0_24px_rgba(139,92,246,0.4)] transition-all"
          >
            Start for free
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>

        {/* Links grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-12"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {/* Brand col */}
          <motion.div variants={fadeUp} className="col-span-2 sm:col-span-1 flex flex-col gap-4">
            <a href="#" className="flex items-center gap-2 w-fit">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-blue-400 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-white text-sm tracking-tight">ThinkWay</span>
            </a>
            <p className="text-xs text-[#64748b] leading-relaxed max-w-[180px]">
              The AI learning platform that builds your personal curriculum.
            </p>
            <div className="flex gap-3 mt-1">
              <a href="#" aria-label="X / Twitter" className="text-[#64748b] hover:text-white transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" aria-label="GitHub" className="text-[#64748b] hover:text-white transition-colors">
                <GitBranch className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Link cols */}
          {(Object.entries(LINKS) as [string, readonly { label: string; href: string }[]][]).map(([col, links]) => (
            <motion.div key={col} variants={fadeUp} className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-white uppercase tracking-wide">{col}</p>
              {links.map(({ label, href }) => (
                <a key={label} href={href} className="text-xs text-[#64748b] hover:text-[#94a3b8] transition-colors">
                  {label}
                </a>
              ))}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#475569]">
          <p>© {new Date().getFullYear()} ThinkWay, Inc. All rights reserved.</p>
          <p>Made with ♥ for curious minds everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
