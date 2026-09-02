import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, ArrowUpRight, Github, Linkedin, Instagram, ArrowUp, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);

    confetti({
      particleCount: 45,
      spread: 65,
      origin: { y: 0.8 },
      colors: ['#FDA228', '#FFFFFF', '#10B981']
    });

    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative bg-[#050505] text-white pt-24 pb-12 px-6 sm:px-8 lg:px-12 mt-20 overflow-hidden border-t border-neutral-900">
      {/* Background Accent Mesh */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-b from-[#FDA228]/10 via-orange-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 w-fit mb-8 shadow-sm"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono font-medium text-neutral-300">
            {PERSONAL_INFO.availabilityStatus}
          </span>
        </motion.div>

        {/* Giant Editorial Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter uppercase leading-[0.95] max-w-5xl">
            Let's build <span className="text-[#FDA228]">something</span> extraordinary together.
          </h2>
          <p className="text-neutral-400 text-base sm:text-xl font-light max-w-2xl mt-6">
            Looking for a dedicated software developer, creative problem solver, or eager intern? My inbox is always open.
          </p>
        </motion.div>

        {/* Direct Email Interaction Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#101010] border border-neutral-800 rounded-3xl p-6 sm:p-10 mb-16 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm"
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#FDA228] font-bold block mb-1">
              Direct Contact
            </span>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white hover:text-[#FDA228] transition-colors break-all"
            >
              {PERSONAL_INFO.email}
            </a>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleCopyEmail}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white text-[#0A0A0A] font-display font-bold text-sm hover:bg-[#FDA228] transition-colors shadow-lg"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Address</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${PERSONAL_INFO.email}?subject=Collaboration%20Inquiry%20-%20Arghya%20Pandey`}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-white font-display font-bold text-sm border border-neutral-700 transition-colors"
            >
              <Send className="w-4 h-4 text-[#FDA228]" />
              <span>Send Email</span>
            </a>
          </div>
        </motion.div>

        {/* Social Links & Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-16 border-b border-neutral-800">
          {/* Socials Column */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 mb-4">
              Social Profiles
            </h4>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-300 hover:text-white group transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[#FDA228]" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-white transition-colors" />
              </a>
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-300 hover:text-white group transition-colors"
              >
                <Github className="w-4 h-4 text-[#FDA228]" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-white transition-colors" />
              </a>
              <a
                href={PERSONAL_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-300 hover:text-white group transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#FDA228]" />
                <span>Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Location & Academic Info */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 mb-4">
              Location &amp; Campus
            </h4>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Lovely Professional University<br />
              Phagwara, Punjab, India<br />
              <span className="text-neutral-500 text-xs">Origin: Simlapal, Bankura, West Bengal</span>
            </p>
          </div>

          {/* Core Focus */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 mb-4">
              Core Specialties
            </h4>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Full-Stack React &amp; TypeScript<br />
              Data Structures in C++ / Java<br />
              AI Prompting &amp; IoT Embedded
            </p>
          </div>

          {/* Back to top */}
          <div className="flex flex-col justify-between items-start sm:items-end">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 mb-4">
              Navigation
            </h4>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-[#FDA228] text-xs font-mono font-semibold text-neutral-300 hover:text-white transition-colors group"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4 text-[#FDA228] group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Monogram */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-lg text-white">AP<span className="text-[#FDA228]">.</span></span>
            <span>© {new Date().getFullYear()} Arghya Pandey. Crafted with React, Three.js &amp; Tailwind CSS.</span>
          </div>
          <div>
            <span>Inspired by editorial minimal aesthetics.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
