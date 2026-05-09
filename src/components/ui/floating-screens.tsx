"use client";

import { motion } from "framer-motion";
import { Eye, Heart, MapPin, MessageCircle, Share2, TrendingUp } from "lucide-react";

/* ── Float wrapper — handles the up-down loop ────────────────── */
function Float({ amp, dur, delay, children }: {
  amp: number; dur: number; delay?: number; children: React.ReactNode;
}) {
  return (
    <motion.div
      animate={{ y: [0, -amp, 0] }}
      transition={{ repeat: Infinity, duration: dur, delay: delay ?? 0, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ── Social post card ────────────────────────────────────────── */
function PostCard({
  rotateY, rotateX, className, delay,
  username, tag, reach, likes, color,
}: {
  rotateY: number; rotateX: number; className: string; delay: number;
  username: string; tag: string; reach: string; likes: string; color: string;
}) {
  return (
    <motion.div
      className={`absolute hidden xl:block ${className}`}
      style={{ perspective: 800 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Float amp={10} dur={4 + delay} delay={delay}>
        <div
          style={{ transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)` }}
          className="w-52 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md shadow-[0_8px_40px_rgba(0,0,0,0.4)] overflow-hidden"
        >
          {/* Header */}
          <div className={`h-24 bg-gradient-to-br ${color} relative flex items-center justify-center`}>
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="text-[10px] font-bold text-white/90">{tag}</span>
            </div>
            <span className="absolute top-2 right-2 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
          </div>
          {/* Body */}
          <div className="p-3 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${color}`} />
              <div>
                <p className="text-[10px] font-semibold text-white leading-none">{username}</p>
                <p className="text-[9px] text-[#64748b] mt-0.5">Sponsored</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-[#94a3b8]">
              <span className="flex items-center gap-1 text-[10px]"><Eye className="w-3 h-3" /> {reach}</span>
              <span className="flex items-center gap-1 text-[10px]"><Heart className="w-3 h-3 fill-rose-400 text-rose-400" /> {likes}</span>
              <span className="flex items-center gap-1 text-[10px]"><MessageCircle className="w-3 h-3" /></span>
              <span className="flex items-center gap-1 text-[10px]"><Share2 className="w-3 h-3" /></span>
            </div>
          </div>
        </div>
      </Float>
    </motion.div>
  );
}

/* ── Billboard card ──────────────────────────────────────────── */
function BillboardCard({
  rotateY, rotateX, className, delay, city, impressions, color,
}: {
  rotateY: number; rotateX: number; className: string; delay: number;
  city: string; impressions: string; color: string;
}) {
  return (
    <motion.div
      className={`absolute hidden xl:block ${className}`}
      style={{ perspective: 800 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Float amp={8} dur={5} delay={delay}>
        <div
          style={{ transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)` }}
          className="w-44 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md shadow-[0_8px_40px_rgba(0,0,0,0.4)] overflow-hidden"
        >
          <div className={`h-20 bg-gradient-to-br ${color} flex items-center justify-center relative`}>
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative text-center">
              <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">SOOH</p>
              <p className="text-lg font-black text-white leading-tight">ThinkWay</p>
            </div>
          </div>
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-1 text-[10px] text-[#94a3b8]">
              <MapPin className="w-3 h-3 text-violet-400" />{city}
            </div>
            <div className="text-[10px] font-semibold text-emerald-400">{impressions}</div>
          </div>
        </div>
      </Float>
    </motion.div>
  );
}

/* ── Metric pill ─────────────────────────────────────────────── */
function MetricPill({ value, label, className, delay }: {
  value: string; label: string; className: string; delay: number;
}) {
  return (
    <motion.div
      className={`absolute hidden xl:block ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Float amp={6} dur={3.5} delay={delay}>
        <div className="flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 backdrop-blur-md px-4 py-2 shadow-[0_4px_24px_rgba(139,92,246,0.2)]">
          <span className="text-sm font-bold gradient-text">{value}</span>
          <span className="text-[10px] text-[#94a3b8]">{label}</span>
        </div>
      </Float>
    </motion.div>
  );
}

/* ── Exported composition ────────────────────────────────────── */
export function FloatingScreens() {
  return (
    <>
      <PostCard
        rotateY={-22} rotateX={6} className="right-[-20px] top-[100px]" delay={0.6}
        username="@zara_official" tag="#Campaign" reach="2.4M" likes="148K"
        color="from-violet-600 to-purple-700"
      />
      <PostCard
        rotateY={-18} rotateX={-6} className="right-[30px] bottom-[120px]" delay={0.9}
        username="@hypebeast" tag="#SOOH" reach="5.1M" likes="310K"
        color="from-blue-600 to-cyan-600"
      />
      <BillboardCard
        rotateY={22} rotateX={5} className="left-[-20px] top-[140px]" delay={0.75}
        city="Dubai, UAE" impressions="1.2M impr." color="from-indigo-600 to-violet-700"
      />
      <BillboardCard
        rotateY={18} rotateX={-4} className="left-[20px] bottom-[160px]" delay={1.1}
        city="Cairo, EG" impressions="890K impr." color="from-violet-700 to-pink-700"
      />
      <MetricPill value="200+" label="Creators" className="right-[120px] top-[60px]"  delay={1.3} />
      <MetricPill value="10M+" label="Reach"    className="left-[100px] bottom-[80px]" delay={1.5} />
    </>
  );
}
