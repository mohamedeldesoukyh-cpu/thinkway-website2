"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ease } from "@/lib/motion";

const NAV_LINKS = [
  { label: "Services",  href: "#services"    },
  { label: "Work",      href: "#social-proof" },
  { label: "SOOH",      href: "#sooh"         },
  { label: "Pricing",   href: "#pricing"      },
  { label: "FAQ",       href: "#faq"          },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
          ? "bg-white/90 backdrop-blur-xl border-b border-black/[0.06] shadow-[0_1px_16px_rgba(0,0,0,0.06)]"
          : "bg-white/70 backdrop-blur-md",
      ].join(" ")}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo — matches the wordmark style */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="text-[15px] font-black tracking-tight text-[#080c20] uppercase">
            Think<span className="text-[#1a6aff]">W</span>ay
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[#4b5568] hover:text-[#080c20] transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <motion.a
            href="mailto:mohamedeldesouky.h@gmail.com"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-[#1a6aff] hover:bg-[#1252cc] text-white px-5 py-2 text-sm font-semibold transition-colors shadow-[0_2px_12px_rgba(26,106,255,0.3)]"
          >
            Get a proposal
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden text-[#4b5568] hover:text-[#080c20] transition-colors p-1"
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
            className="md:hidden overflow-hidden bg-white border-b border-black/[0.06]"
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-[#4b5568] hover:text-[#080c20] py-2 transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="mailto:mohamedeldesouky.h@gmail.com"
                onClick={() => setMenuOpen(false)}
                className="mt-3 bg-[#1a6aff] text-white rounded-full px-4 py-2 text-sm font-semibold text-center"
              >
                Get a proposal
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
