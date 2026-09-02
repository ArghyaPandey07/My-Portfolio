import React from 'react';
import { motion } from 'framer-motion';

export const MarqueeBanner: React.FC = () => {
  const marqueeItems = [
    "✦ BUILDER",
    "✦ EXPLORER",
    "✦ LEARNER",
    "✦ REACT & TYPESCRIPT",
    "✦ SUPABASE & POSTGRESQL",
    "✦ THREE.JS & WEBGL",
    "✦ AI QUIZ GENERATOR",
    "✦ EXPENSEFLOW",
    "✦ SAMPURNA BOUTIQUE",
    "✦ ARDUINO & IOT",
    "✦ FULL-STACK ARCHITECTURE",
    "✦ CREATIVE COMPUTING",
  ];

  return (
    <div className="relative py-12 sm:py-16 overflow-hidden bg-transparent select-none">
      {/* Angled Marquee Ribbon 1 */}
      <div className="relative -rotate-2 scale-105 bg-[#0A0A0A] text-white py-4 shadow-xl border-y border-neutral-800">
        <div className="flex overflow-hidden whitespace-nowrap">
          <motion.div
            className="flex items-center gap-8 text-lg sm:text-2xl md:text-3xl font-display font-black tracking-widest uppercase flex-shrink-0"
            animate={{ x: [0, -1000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {[...marqueeItems, ...marqueeItems].map((item, idx) => (
              <span
                key={idx}
                className={idx % 2 === 0 ? "text-white" : "stroke-text-white hover:text-[#FDA228] transition-colors"}
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Counter-Angled Subtle Secondary Marquee */}
      <div className="relative rotate-1 scale-105 bg-[#FDA228] text-black py-2.5 mt-2 shadow-md">
        <div className="flex overflow-hidden whitespace-nowrap">
          <motion.div
            className="flex items-center gap-8 text-xs sm:text-sm font-mono font-bold tracking-[0.25em] uppercase flex-shrink-0"
            animate={{ x: [-1000, 0] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {[...marqueeItems, ...marqueeItems].reverse().map((item, idx) => (
              <span key={idx} className="flex items-center gap-8">
                <span>{item}</span>
                <span className="text-black/40">•</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
