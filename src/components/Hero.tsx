import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Download } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { WireframeSphere } from './WireframeSphere';
import avatarImg from '../assets/avatar.png';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  isDark?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, isDark = false }) => {
  const [activeRole, setActiveRole] = useState<'developer' | 'enthusiast'>('developer');
  const shouldReduceMotion = useReducedMotion();

  const isDevActive = activeRole === 'developer';
  const isEnthusiastActive = activeRole === 'enthusiast';

  const techStack = ["React", "TypeScript", "Python", "C++", "Supabase", "Three.js"];

  // Raw Mouse Coordinates
  const rawPortraitX = useMotionValue(0);
  const rawPortraitY = useMotionValue(0);
  const rawTextX = useMotionValue(0);
  const rawTextY = useMotionValue(0);

  // Smooth weighted spring physics for premium floating inertia
  const springConfig = { damping: 28, stiffness: 75, mass: 0.6 };

  const portraitX = useSpring(rawPortraitX, springConfig);
  const portraitY = useSpring(rawPortraitY, springConfig);
  const textX = useSpring(rawTextX, springConfig);
  const textY = useSpring(rawTextY, springConfig);

  useEffect(() => {
    if (shouldReduceMotion) return;

    // Only apply on fine-pointer (mouse) devices
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handleWindowMouseMove = (e: MouseEvent) => {
      const heroEl = document.getElementById('hero');
      if (!heroEl) return;

      const rect = heroEl.getBoundingClientRect();
      // Only track when cursor is within / near hero section
      if (e.clientY > rect.bottom + 100 || e.clientY < rect.top - 100) {
        rawPortraitX.set(0);
        rawPortraitY.set(0);
        rawTextX.set(0);
        rawTextY.set(0);
        return;
      }

      // Normalized coordinates from center (-0.5 to +0.5)
      const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
      const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;

      // 1. Portrait: noticeable 14-20px movement following the cursor
      rawPortraitX.set(normalizedX * 38);
      rawPortraitY.set(normalizedY * 26);

      // 2. Typography: 6-10px opposing counter-movement
      rawTextX.set(normalizedX * -18);
      rawTextY.set(normalizedY * -12);
    };

    const handleMouseLeave = () => {
      rawPortraitX.set(0);
      rawPortraitY.set(0);
      rawTextX.set(0);
      rawTextY.set(0);
    };

    window.addEventListener('mousemove', handleWindowMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [shouldReduceMotion, rawPortraitX, rawPortraitY, rawTextX, rawTextY]);

  return (
    <section
      id="hero"
      className="relative min-h-[96vh] flex flex-col justify-between pt-24 sm:pt-28 pb-8 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-visible select-none"
    >
      {/* 3D Interactive Wireframe Sphere Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] md:w-[600px] h-[340px] sm:h-[480px] md:h-[600px] pointer-events-none -z-10 opacity-40 dark:opacity-60">
        <WireframeSphere isDark={isDark} />
      </div>

      {/* Ambient Depth Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-amber-200/15 via-orange-100/5 to-transparent dark:from-[#FDA228]/10 dark:via-transparent rounded-full blur-3xl pointer-events-none -z-20" />

      {/* Top Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-center sm:justify-start gap-2.5 text-sm sm:text-base font-medium text-neutral-600 dark:text-neutral-400 tracking-wide pt-2"
      >
        <span className="inline-block animate-bounce">👋</span>
        <span>I'm <span className="font-semibold text-[#0A0A0A] dark:text-white">{PERSONAL_INFO.name}</span> — a</span>
      </motion.div>

      {/* Center Stacked Typography & Intersecting Portrait */}
      <div className="relative my-auto py-6 sm:py-10 flex flex-col items-center justify-center text-center overflow-visible">
        
        {/* Layer 1: Background Typography Layer (Opposing counter-movement ~6-10px, z-0) */}
        <motion.div
          style={{ x: textX, y: textY }}
          className="relative z-0 w-full flex flex-col items-center overflow-visible py-2 gap-8 sm:gap-14 md:gap-18 lg:gap-20"
        >
          {/* Top Line: DEVELOPER (Heavy Condensed Display, Solid Fill) */}
          <div
            className="w-full relative"
            onMouseEnter={() => setActiveRole('developer')}
          >
            <motion.h1
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: '0%' }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`font-display font-black text-[15vw] sm:text-8xl md:text-9xl lg:text-[8rem] xl:text-[9.2rem] tracking-tight uppercase leading-[0.92] transition-all duration-300 ${
                isDevActive
                  ? 'text-[#0A0A0A] dark:text-white'
                  : 'stroke-text-black'
              }`}
            >
              Developer
            </motion.h1>
          </div>

          {/* Bottom Line: & TECH ENTHUSIAST (Clean Outline across chest line) */}
          <div
            className="w-full relative"
            onMouseEnter={() => setActiveRole('enthusiast')}
          >
            <motion.h2
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: 1, x: '0%' }}
              transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className={`font-display font-black text-[10vw] sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem] tracking-tight uppercase leading-[0.92] transition-all duration-300 ${
                isEnthusiastActive
                  ? 'text-[#0A0A0A] dark:text-white'
                  : 'stroke-text-black'
              }`}
            >
              &amp; Tech Enthusiast
            </motion.h2>
          </div>
        </motion.div>

        {/* Layer 2: Black & White Cutout Portrait (Prominent 14-20px Parallax Following Cursor, z-10) */}
        <motion.div
          style={{ x: portraitX, y: portraitY }}
          className="absolute inset-0 flex items-end justify-center pointer-events-none z-10 overflow-visible"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-64 sm:w-80 md:w-96 lg:w-[430px] xl:w-[460px] aspect-[3/4] flex items-end justify-center translate-y-14 sm:translate-y-20 md:translate-y-24 lg:translate-y-28 overflow-visible"
          >
            {/* Cutout Photo */}
            <img
              src={avatarImg}
              alt="Arghya Pandey"
              className="w-full h-full object-contain object-bottom filter grayscale contrast-115 drop-shadow-2xl overflow-visible"
              style={{
                maskImage: 'linear-gradient(to bottom, black 0%, black 92%, rgba(0,0,0,0.5) 96%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 92%, rgba(0,0,0,0.5) 96%, transparent 100%)',
              }}
            />
          </motion.div>
        </motion.div>

        {/* Layer 3: Foreground White Outline Overlay (Synchronized with Typography Parallax, z-20) */}
        <motion.div
          style={{ x: textX, y: textY }}
          className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center py-2 gap-8 sm:gap-14 md:gap-18 lg:gap-20 overflow-visible"
        >
          {/* Top Line Foreground White Outline (Visible only when Developer is active) */}
          <div
            className={`w-full transition-opacity duration-200 ${
              isDevActive ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <motion.h1
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: '0%' }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-[15vw] sm:text-8xl md:text-9xl lg:text-[8rem] xl:text-[9.2rem] tracking-tight uppercase leading-[0.92] stroke-text-white"
            >
              Developer
            </motion.h1>
          </div>

          {/* Bottom Line Foreground White Outline (Visible only when Tech Enthusiast is active) */}
          <div
            className={`w-full transition-opacity duration-200 ${
              isEnthusiastActive ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <motion.h2
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: 1, x: '0%' }}
              transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-[10vw] sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem] tracking-tight uppercase leading-[0.92] stroke-text-white"
            >
              &amp; Tech Enthusiast
            </motion.h2>
          </div>
        </motion.div>

      </div>

      {/* Bottom Meta & Action Row */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-30 pt-2 flex flex-col gap-6 w-full"
      >
        {/* Meta Info Row: Location Far-Left, Clean Dot-Separated Skills Far-Right */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full text-xs font-mono text-neutral-500 dark:text-neutral-400">
          {/* Simple Location Tag on Far Left */}
          <div className="uppercase tracking-wider font-medium text-neutral-600 dark:text-neutral-400 self-start sm:self-auto">
            Based in India.
          </div>

          {/* Clean Understated Technology Line on Far Right */}
          <div className="flex items-center flex-wrap justify-end gap-2.5 sm:ml-auto self-end sm:self-auto tracking-wide">
            {techStack.map((tech, index) => (
              <React.Fragment key={tech}>
                <span className="hover:text-black dark:hover:text-white transition-colors duration-200 cursor-default">
                  {tech}
                </span>
                {index < techStack.length - 1 && (
                  <span className="text-neutral-300 dark:text-neutral-600 select-none">·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Dual Primary & Secondary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-1">
          {/* Primary Action Button */}
          <button
            onClick={() => onNavigate('contact')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#0A0A0A] text-white dark:bg-white dark:text-[#0A0A0A] font-display font-semibold text-sm rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 group"
          >
            <span>Let's build something</span>
            <ArrowRight className="w-4 h-4 text-[#FDA228] group-hover:translate-x-1 transition-transform duration-200" />
          </button>

          {/* Secondary Action Ghost Button (Download CV) */}
          <a
            href="/Arghya_Pandey_CV.pdf"
            download="Arghya_Pandey_CV.pdf"
            className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-display font-semibold text-sm rounded-lg hover:border-neutral-900 dark:hover:border-white hover:bg-neutral-100/70 dark:hover:bg-neutral-800/70 transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <span>Download CV</span>
            <Download className="w-4 h-4 text-neutral-500 dark:text-neutral-400 group-hover:text-[#FDA228] group-hover:translate-y-0.5 transition-transform duration-200" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};
