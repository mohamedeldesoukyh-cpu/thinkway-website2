/**
 * ThinkWay Motion System — all Framer Motion primitives.
 *
 * Rules:
 * - Always use the shared `ease` curve — never write cubic-bezier inline.
 * - Scroll reveals use `whileInView` + `viewport` helper, never `useEffect`.
 * - Entrance animations: fadeUp (default), scaleUp (cards), fadeIn (overlays).
 * - Hover animations: defined inline with `whileHover` / `whileTap`.
 * - Never animate `width`, `height`, or `color` — use opacity + transform only.
 */

import type { Variants } from "framer-motion";

/* ─── Core easing ────────────────────────────────────────────── */

/** Custom ease-out expo — the only curve used site-wide. */
export const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

/** Faster ease for micro-interactions (hovers, toggles). */
export const easeFast = [0.4, 0, 0.2, 1] as [number, number, number, number];

/* ─── Duration scale (seconds) ───────────────────────────────── */
export const duration = {
  instant: 0.15,  // toggles, micro
  fast:    0.30,  // hovers, dropdowns
  base:    0.50,  // cards, overlays
  slow:    0.65,  // headlines, hero elements
  xslow:   0.90,  // page transitions
} as const;

/* ─── Entrance variants ──────────────────────────────────────── */

/** Default scroll reveal — slides up and fades in. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: duration.slow, ease } },
};

/** Pure fade — for overlays, tooltips, modals. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: duration.base, ease } },
};

/** Scale up from 92% — for cards and feature tiles. */
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show:   { opacity: 1, scale: 1, transition: { duration: duration.base, ease } },
};

/** Slide in from the left. */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  show:   { opacity: 1, x: 0, transition: { duration: duration.slow, ease } },
};

/** Slide in from the right. */
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  show:   { opacity: 1, x: 0, transition: { duration: duration.slow, ease } },
};

/** Slide down from above — for dropdowns and mobile menus. */
export const slideDown: Variants = {
  hidden: { opacity: 0, y: -12 },
  show:   { opacity: 1, y: 0, transition: { duration: duration.fast, ease } },
};

/** Pop — slight overshoot, for badges and notification bubbles. */
export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  show:   {
    opacity: 1,
    scale:   1,
    transition: { type: "spring", stiffness: 400, damping: 20 },
  },
};

/* ─── Container / stagger ────────────────────────────────────── */

/**
 * Wrap a list of motion children in this variant to stagger them.
 *
 * @example
 * <motion.div variants={stagger()} initial="hidden" whileInView="show">
 *   <motion.div variants={fadeUp}>…</motion.div>
 *   <motion.div variants={fadeUp}>…</motion.div>
 * </motion.div>
 */
export const stagger = (delayBetween = 0.1, delayStart = 0): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren:  delayBetween,
      delayChildren:    delayStart,
    },
  },
});

/* ─── Hover / tap presets ────────────────────────────────────── */

/** Standard button / CTA lift. */
export const hoverLift = {
  whileHover: { scale: 1.04 },
  whileTap:   { scale: 0.97 },
  transition: { duration: duration.instant, ease: easeFast },
} as const;

/** Subtle card hover — lifts 4px. */
export const hoverCard = {
  whileHover: { y: -4 },
  transition: { duration: duration.fast, ease },
} as const;

/* ─── Continuous loops ───────────────────────────────────────── */

/** Gentle up-down float — for decorative elements. */
export const float = (amp = 10, dur = 4) => ({
  animate: {
    y: [0, -amp, 0],
    transition: { repeat: Infinity, duration: dur, ease: "easeInOut" as const },
  },
});

/** Blinking cursor (typewriter). */
export const blink: Variants = {
  hidden: {},
  show: {
    opacity: [1, 0, 1],
    transition: { repeat: Infinity, duration: 0.9, ease: "linear" },
  },
};

/* ─── Page transitions ───────────────────────────────────────── */

/** Wrap page content for route-level fade transitions. */
export const pageFade: Variants = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: duration.xslow, ease } },
  exit:   { opacity: 0, y: -8, transition: { duration: duration.base, ease } },
};

/* ─── Viewport config ────────────────────────────────────────── */

/**
 * Shared `viewport` prop for all `whileInView` animations.
 * `once: true`  — animate only the first time the element enters view.
 * `margin`      — trigger 80px before the element fully enters.
 */
export const viewport = { once: true, margin: "-80px" } as const;
