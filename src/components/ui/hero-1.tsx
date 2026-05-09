"use client";

import * as React from "react";
import { Paperclip, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

type FadeUpProps = {
  delay?: number;
  children: React.ReactNode;
  className?: string;
};

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

function FadeUp({ delay = 0, children, className }: FadeUpProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

const Hero1 = () => {
  return (
    <div className="min-h-screen bg-[#0c0414] text-white flex flex-col relative overflow-x-hidden">
      {/* Gradient orbs */}
      <div className="flex gap-[10rem] rotate-[-20deg] absolute top-[-40rem] right-[-30rem] z-[0] blur-[4rem] skew-[-40deg] opacity-50 pointer-events-none">
        <div className="w-[10rem] h-[20rem] bg-gradient-to-b from-white to-blue-300" />
        <div className="w-[10rem] h-[20rem] bg-gradient-to-b from-white to-blue-300" />
        <div className="w-[10rem] h-[20rem] bg-gradient-to-b from-white to-blue-300" />
      </div>
      <div className="flex gap-[10rem] rotate-[-20deg] absolute top-[-50rem] right-[-50rem] z-[0] blur-[4rem] skew-[-40deg] opacity-50 pointer-events-none">
        <div className="w-[10rem] h-[20rem] bg-gradient-to-b from-white to-blue-300" />
        <div className="w-[10rem] h-[20rem] bg-gradient-to-b from-white to-blue-300" />
        <div className="w-[10rem] h-[20rem] bg-gradient-to-b from-white to-blue-300" />
      </div>
      <div className="flex gap-[10rem] rotate-[-20deg] absolute top-[-60rem] right-[-60rem] z-[0] blur-[4rem] skew-[-40deg] opacity-50 pointer-events-none">
        <div className="w-[10rem] h-[30rem] bg-gradient-to-b from-white to-blue-300" />
        <div className="w-[10rem] h-[30rem] bg-gradient-to-b from-white to-blue-300" />
        <div className="w-[10rem] h-[30rem] bg-gradient-to-b from-white to-blue-300" />
      </div>

      {/* Header */}
      <FadeUp delay={0} className="flex justify-between items-center p-6 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="font-bold text-md tracking-tight">ThinkWay</div>
        </div>
        <button className="bg-white text-black hover:bg-gray-200 rounded-full px-4 py-2 text-sm cursor-pointer font-semibold transition-colors">
          Get Started
        </button>
      </FadeUp>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* Badge */}
          <FadeUp delay={0.1} className="flex justify-center">
            <div className="bg-[#1c1528] rounded-full px-4 py-2 flex items-center gap-2 w-fit">
              <span className="text-xs flex items-center gap-2">
                <span className="bg-black p-1 rounded-full">🚀</span>
                AI-powered learning, reimagined
              </span>
            </div>
          </FadeUp>

          {/* Headline */}
          <FadeUp delay={0.2}>
            <h1 className="text-5xl font-bold leading-tight">
              Learn smarter, not harder — with ThinkWay
            </h1>
          </FadeUp>

          {/* Subtitle */}
          <FadeUp delay={0.3}>
            <p className="text-md text-gray-400 max-w-xl mx-auto">
              ThinkWay turns any topic into a personalised learning journey. Just
              describe what you want to master and we&apos;ll build the path for you.
            </p>
          </FadeUp>

          {/* Prompt bar */}
          <FadeUp delay={0.4} className="relative max-w-2xl mx-auto w-full">
            <div className="bg-[#1c1528] rounded-full p-3 flex items-center">
              <button className="p-2 rounded-full hover:bg-[#2a1f3d] transition-all">
                <Paperclip className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-2 rounded-full hover:bg-[#2a1f3d] transition-all">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </button>
              <input
                type="text"
                placeholder="What do you want to learn today?"
                className="bg-transparent flex-1 outline-none text-gray-300 pl-4"
              />
            </div>
          </FadeUp>

          {/* Suggestion pills */}
          <FadeUp delay={0.5} className="flex flex-wrap justify-center gap-2 mt-12 max-w-2xl mx-auto">
            {[
              "Master system design",
              "Learn TypeScript in 30 days",
              "Understand machine learning",
              "Build a SaaS from scratch",
              "Deep-dive into databases",
            ].map((suggestion) => (
              <button
                key={suggestion}
                className="bg-[#1c1528] hover:bg-[#2a1f3d] rounded-full px-4 py-2 text-sm transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </FadeUp>
        </div>
      </main>
    </div>
  );
};

export { Hero1 };
