/**
 * ThinkWay Design System — single source of truth.
 *
 * Every colour, spacing step, radius, shadow, and typography
 * decision lives here. Import from this file instead of
 * hard-coding values in components.
 *
 * CSS custom properties (globals.css) mirror these values so
 * Tailwind arbitrary values and raw CSS stay in sync.
 */

/* ─── Colour palette ─────────────────────────────────────────── */
export const colors = {
  /* Backgrounds */
  bg:            "#0c0414",   // page background
  surface:       "#1c1528",   // cards, inputs, nav surface
  surfaceRaised: "#221a32",   // modals, dropdowns
  surfaceHover:  "#2a1f3d",   // card hover state

  /* Brand — violet/purple primary */
  brand:         "#8b5cf6",   // violet-500
  brandDim:      "#6d28d9",   // violet-700
  brandLight:    "#a78bfa",   // violet-400
  brandGlow:     "rgba(139, 92, 246, 0.35)",

  /* Brand — blue accent */
  accent:        "#60a5fa",   // blue-400
  accentDim:     "#3b82f6",   // blue-500

  /* Text */
  textPrimary:   "#f8fafc",   // near-white
  textSecondary: "#94a3b8",   // slate-400
  textMuted:     "#64748b",   // slate-500
  textDisabled:  "#475569",   // slate-600

  /* Borders */
  border:        "rgba(255, 255, 255, 0.07)",
  borderHover:   "rgba(139, 92, 246, 0.40)",

  /* Semantic */
  success:       "#34d399",   // emerald-400
  successDim:    "rgba(52, 211, 153, 0.15)",
  warning:       "#fbbf24",   // amber-400
  danger:        "#f87171",   // red-400
  dangerDim:     "rgba(248, 113, 113, 0.15)",

  /* Service card accents */
  violet:  { from: "#8b5cf6", to: "#7c3aed", glow: "rgba(139,92,246,0.35)" },
  blue:    { from: "#60a5fa", to: "#06b6d4", glow: "rgba(96,165,250,0.35)"  },
  emerald: { from: "#34d399", to: "#14b8a6", glow: "rgba(52,211,153,0.35)"  },
  indigo:  { from: "#818cf8", to: "#6366f1", glow: "rgba(129,140,248,0.35)" },
  pink:    { from: "#f472b6", to: "#e879f9", glow: "rgba(244,114,182,0.35)" },
} as const;

/* ─── Spacing scale (rem) ────────────────────────────────────── */
export const space = {
  px:   "1px",
  0.5:  "0.125rem",
  1:    "0.25rem",
  1.5:  "0.375rem",
  2:    "0.5rem",
  3:    "0.75rem",
  4:    "1rem",
  5:    "1.25rem",
  6:    "1.5rem",
  8:    "2rem",
  10:   "2.5rem",
  12:   "3rem",
  16:   "4rem",
  20:   "5rem",
  24:   "6rem",
  32:   "8rem",
} as const;

/* ─── Border radius ──────────────────────────────────────────── */
export const radius = {
  sm:   "0.5rem",    // rounded-lg  — small chips, badges
  md:   "0.75rem",   // rounded-xl  — buttons, inputs
  lg:   "1rem",      // rounded-2xl — cards
  xl:   "1.5rem",    // rounded-3xl — modals, hero containers
  full: "9999px",    // rounded-full — pills, avatars
} as const;

/* ─── Typography ─────────────────────────────────────────────── */
export const typography = {
  fontSans: "var(--font-geist-sans), system-ui, sans-serif",
  fontMono: "var(--font-geist-mono), monospace",

  /* Size scale */
  xs:   "0.75rem",    // 12px  — labels, captions, tags
  sm:   "0.875rem",   // 14px  — body small, nav links
  base: "1rem",       // 16px  — body
  lg:   "1.125rem",   // 18px  — body large
  xl:   "1.25rem",    // 20px  — card titles
  "2xl":"1.5rem",     // 24px  — section sub-headings
  "3xl":"1.875rem",   // 30px  — section headings (mobile)
  "4xl":"2.25rem",    // 36px  — section headings
  "5xl":"3rem",       // 48px  — hero headline (mobile)
  "6xl":"3.75rem",    // 60px  — hero headline (desktop)

  /* Weight */
  normal:    400,
  medium:    500,
  semibold:  600,
  bold:      700,
  black:     900,

  /* Leading */
  leadTight:   1.12,
  leadSnug:    1.375,
  leadNormal:  1.5,
  leadRelaxed: 1.625,
} as const;

/* ─── Shadows ────────────────────────────────────────────────── */
export const shadows = {
  card:          "0 4px 24px rgba(0,0,0,0.3)",
  cardHover:     "0 20px 60px rgba(0,0,0,0.4)",
  brandGlow:     "0 0 24px rgba(139,92,246,0.40)",
  brandGlowLg:   "0 0 40px rgba(139,92,246,0.55)",
  brandGlowCard: "0 20px 60px rgba(139,92,246,0.25)",
  floatingCard:  "0 8px 40px rgba(0,0,0,0.4)",
} as const;

/* ─── Breakpoints (px) ───────────────────────────────────────── */
export const breakpoints = {
  sm:  640,
  md:  768,
  lg:  1024,
  xl:  1280,
  "2xl": 1536,
} as const;

/* ─── Z-index scale ──────────────────────────────────────────── */
export const zIndex = {
  base:    0,
  raised:  10,
  overlay: 20,
  modal:   30,
  toast:   40,
  navbar:  50,
} as const;

/* ─── Section layout helpers ─────────────────────────────────── */
export const layout = {
  /** Max content width — use on all section inner wrappers */
  maxWidth:    "max-w-6xl",
  /** Horizontal padding — consistent across all sections */
  pagePadding: "px-4 sm:px-6",
  /** Vertical section padding */
  sectionPy:   "py-24",
} as const;
