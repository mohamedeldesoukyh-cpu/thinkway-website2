@AGENTS.md

# ThinkWay — Frontend Design Skill

You are building the ThinkWay website. ThinkWay is an **influencer marketing and Social Out-of-Home (SOOH) advertising agency**. Every piece of UI you write must feel premium, bold, and modern — dark theme, violet/purple brand, agency confidence.

---

## What ThinkWay does

- **Influencer Marketing** — connects brands with vetted creators on TikTok, Instagram, YouTube
- **Social Out-of-Home (SOOH)** — places social content on digital billboards, transit screens, and public displays in 50+ cities
- **Strategy & Analytics** — data-backed campaign reporting and earned media value tracking

**Tone:** confident, creative, results-focused. Never corporate or academic.

---

## Stack

| Tool | Version | Notes |
|------|---------|-------|
| Next.js | 16 (App Router) | Read `node_modules/next/dist/docs/` before using any Next.js API |
| TypeScript | 5 | Strict mode — no `any`, no `@ts-ignore` |
| Tailwind CSS | 4 | `@import "tailwindcss"` in globals.css, no tailwind.config.js |
| Framer Motion | 12 | Import from `"framer-motion"` |
| Lucide React | 1.x | Icons only — no other icon libraries |

---

## Design tokens — always use these

Import from `@/lib/design.ts`. Never hard-code colours or spacing.

```ts
import { colors, radius, shadows, layout } from "@/lib/design";
```

### Colour rules
| Use case | Token | Hex |
|----------|-------|-----|
| Page background | `colors.bg` | `#0c0414` |
| Card / surface | `colors.surface` | `#1c1528` |
| Card hover | `colors.surfaceHover` | `#2a1f3d` |
| Primary brand | `colors.brand` | `#8b5cf6` |
| Blue accent | `colors.accent` | `#60a5fa` |
| Body text | `colors.textPrimary` | `#f8fafc` |
| Secondary text | `colors.textSecondary` | `#94a3b8` |
| Muted / labels | `colors.textMuted` | `#64748b` |
| Card border | `colors.border` | `rgba(255,255,255,0.07)` |

### What NOT to do
- ❌ No light backgrounds (`#fff`, `bg-white` on page sections)
- ❌ No red/orange/yellow brand colours
- ❌ No `text-black` or `bg-gray-100` anywhere
- ❌ No hardcoded hex values in components — use tokens or Tailwind arbitrary values that match the tokens above

---

## Motion rules — always use these

Import from `@/lib/motion.ts`. Never write animation values inline.

```ts
import { fadeUp, stagger, scaleUp, hoverLift, viewport } from "@/lib/motion";
```

### Rules
1. **Scroll reveals** — always `whileInView` + `viewport` helper. Never `useEffect` for scroll triggers.
2. **Stagger lists** — parent gets `variants={stagger()}`, children get `variants={fadeUp}` or `variants={scaleUp}`.
3. **Hover states** — use `hoverLift` for buttons/CTAs, `hoverCard` for cards.
4. **Continuous loops** — use `float()` helper for decorative floating elements.
5. **Easing** — always import `ease` or `easeFast`. Never write `[x,x,x,x]` inline.
6. **Never animate** `width`, `height`, `color`, or `backgroundColor` — only `opacity`, `y`, `x`, `scale`.

### Pattern for every section header
```tsx
<motion.div
  variants={stagger(0.1)}
  initial="hidden"
  whileInView="show"
  viewport={viewport}
>
  <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
    Section label
  </motion.p>
  <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold mb-4">
    Headline with <span className="gradient-text">gradient word</span>
  </motion.h2>
  <motion.p variants={fadeUp} className="text-[#94a3b8] text-base">
    Supporting copy.
  </motion.p>
</motion.div>
```

---

## Component conventions

### Section structure
Every section follows this exact shell:
```tsx
<section id="section-id" className="relative py-24 px-4 overflow-hidden">
  {/* optional decorative background blob */}
  <div aria-hidden className="pointer-events-none absolute ... bg-violet-950/30 blur-[120px] rounded-full" />

  <div className="relative z-10 max-w-6xl mx-auto">
    {/* content */}
  </div>
</section>
```

### Card pattern
```tsx
<motion.div
  variants={scaleUp}
  whileHover={{ y: -6, boxShadow: colors.violet.glow }}
  className="rounded-2xl border border-white/[0.07] bg-[#1c1528] p-6"
>
```

### Button / CTA
```tsx
// Primary
<motion.a href="..." whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
  className="inline-flex items-center gap-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white px-6 py-2.5 text-sm font-semibold shadow-[0_0_24px_rgba(139,92,246,0.4)] transition-all">

// Secondary / ghost
<motion.a href="..." whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white px-6 py-2.5 text-sm font-semibold transition-all">
```

### Gradient text
```tsx
<span className="gradient-text">highlighted word</span>
```
Defined in `globals.css`. Use it on **one or two words** in each headline — not full sentences.

### Section label (above every headline)
```tsx
<p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
  Label
</p>
```

---

## File structure

```
src/
  app/
    globals.css          ← CSS tokens + utilities
    layout.tsx           ← fonts, metadata
    page.tsx             ← assembles all sections
    api/waitlist/route.ts
  components/
    sections/            ← one file per page section
      navbar.tsx
      hero.tsx
      features.tsx       ← Services section
      social-proof.tsx
      pricing.tsx
      faq.tsx
      footer.tsx
    ui/                  ← reusable primitives
      particle-field.tsx
      floating-screens.tsx
      count-up.tsx
      hero-1.tsx         ← legacy, do not use
  lib/
    design.ts            ← ALL design tokens
    motion.ts            ← ALL animation variants
    utils.ts             ← cn() helper
```

---

## Content & copy rules

- Headlines: sentence case, punchy, max 8 words
- Use **"brands"** not "clients", **"creators"** not "influencers" in body copy
- SOOH always spelled in full on first mention: "Social Out-of-Home (SOOH)"
- CTA copy: action-first ("Start a campaign", "Get a proposal", "See our work")
- Never use placeholder text like "Lorem ipsum" — write real agency copy

---

## Things to never do

- Never create a `tailwind.config.js` — Tailwind v4 config is CSS-only
- Never use `useEffect` for animations — use Framer Motion's `whileInView`
- Never add `console.log` to production code
- Never commit `.env` or `.env.local`
- Never use `<img>` — always `next/image` for raster images
- Never hardcode the contact email — it is `mohamedeldesouky.h@gmail.com` and lives in components, not config
