"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe, GitBranch, Mail } from "lucide-react";
import { fadeUp, stagger, viewport } from "@/lib/motion";

const LINKS = {
  Services: [
    { label: "Influencer Marketing", href: "#services"    },
    { label: "Social Out-of-Home",   href: "#sooh"        },
    { label: "Strategy & Analytics", href: "#services"    },
    { label: "Packages",             href: "#pricing"     },
  ],
  Company: [
    { label: "About us",  href: "#" },
    { label: "Our work",  href: "#social-proof" },
    { label: "Blog",      href: "#" },
    { label: "Careers",   href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms",   href: "#" },
    { label: "Cookies", href: "#" },
  ],
} as const;

export function Footer() {
  return (
    <footer className="relative border-t border-black/[0.06] pt-16 pb-10 px-4 bg-white">

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* CTA banner */}
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="rounded-2xl border border-[#1a6aff]/15 bg-[#f5f7ff] p-8 sm:p-12 text-center mb-16 flex flex-col items-center gap-6"
        >
          {/* Logo dot + rule motif */}
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1a6aff]" />
            <span className="flex-1 h-px bg-black/10 w-24" />
          </div>

          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold text-[#080c20]">
            Ready to take your brand{" "}
            <span className="gradient-text">everywhere?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#4b5568] text-sm max-w-sm">
            Let&apos;s build a campaign that moves people — on every screen, in every city that matters to your audience.
          </motion.p>
          <motion.a
            variants={fadeUp}
            href="mailto:mohamedeldesouky.h@gmail.com"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full bg-[#1a6aff] hover:bg-[#1252cc] text-white px-6 py-2.5 text-sm font-semibold shadow-[0_4px_16px_rgba(26,106,255,0.3)] transition-all"
          >
            Start a campaign
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
              <span className="text-[15px] font-black tracking-tight text-[#080c20] uppercase">
                Think<span className="text-[#1a6aff]">W</span>ay
              </span>
            </a>
            <p className="text-xs text-[#6b7280] leading-relaxed max-w-[180px]">
              Influencer marketing and Social Out-of-Home campaigns that move people.
            </p>
            <div className="flex gap-3 mt-1">
              <a href="#" aria-label="Website" className="text-[#9ca3af] hover:text-[#1a6aff] transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="mailto:mohamedeldesouky.h@gmail.com" aria-label="Email" className="text-[#9ca3af] hover:text-[#1a6aff] transition-colors">
                <Mail className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Social" className="text-[#9ca3af] hover:text-[#1a6aff] transition-colors">
                <GitBranch className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Link cols */}
          {(Object.entries(LINKS) as [string, readonly { label: string; href: string }[]][]).map(([col, links]) => (
            <motion.div key={col} variants={fadeUp} className="flex flex-col gap-3">
              <p className="text-xs font-bold text-[#080c20] uppercase tracking-wide">{col}</p>
              {links.map(({ label, href }) => (
                <a key={label} href={href} className="text-xs text-[#6b7280] hover:text-[#080c20] transition-colors">
                  {label}
                </a>
              ))}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-black/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#9ca3af]">
          <p>© {new Date().getFullYear()} ThinkWay. All rights reserved.</p>
          <p>Influencer Marketing · Social Out-of-Home · Built for bold brands.</p>
        </div>
      </div>
    </footer>
  );
}
