"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Sparkles, X } from "lucide-react";
import { ease } from "@/lib/motion";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Social Proof", href: "#social-proof" },
  { label: "Pricing",  href: "#pricing"  },
  { label: "FAQ",      href: "#faq"      },
] as const;

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0c0414]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_24px_rgba(0,0,0,0.4)]"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-blue-400 flex items-center justify-center shadow-[0_0_16px_rgba(139,92,246,0.5)] group-hover:shadow-[0_0_24px_rgba(139,92,246,0.7)] transition-shadow">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white tracking-tight text-sm">ThinkWay</span>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[#94a3b8] hover:text-white transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#pricing" className="text-sm text-[#94a3b8] hover:text-white transition-colors">
            Log in
          </a>
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white text-black rounded-full px-4 py-1.5 text-sm font-semibold hover:bg-gray-100 transition-colors"
          >
            Get started free
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden text-[#94a3b8] hover:text-white transition-colors p-1"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease }}
            className="md:hidden overflow-hidden bg-[#0c0414]/95 backdrop-blur-xl border-b border-white/[0.06]"
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-[#94a3b8] hover:text-white py-2 transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#pricing"
                onClick={() => setMenuOpen(false)}
                className="mt-3 bg-white text-black rounded-full px-4 py-2 text-sm font-semibold text-center"
              >
                Get started free
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
