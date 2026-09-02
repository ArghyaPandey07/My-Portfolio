import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Sparkles, Rocket, Compass, BookOpen, Zap } from 'lucide-react';
import { EDUCATION_LIST, FOCUS_ITEMS } from '../data/portfolioData';

export const EducationFocus: React.FC = () => {
  const getFocusIcon = (iconName: string) => {
    switch (iconName) {
      case 'Rocket':
        return <Rocket className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'GraduationCap':
        return <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#FDA228]" />;
    }
  };

  return (
    <section id="education" className="py-20 sm:py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
      {/* 2-Column Layout: Academic Background & Current Focus */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
        {/* Left Column: Education Journey Timeline */}
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-[#FDA228] mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Pathway / 03</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-[#0A0A0A] dark:text-white uppercase">
              Education <span className="stroke-text-black">&amp; Journey</span>
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
              Academic excellence and technical grounding across institutions.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative pl-6 sm:pl-8 border-l-2 border-neutral-200 dark:border-neutral-800 space-y-10">
            {EDUCATION_LIST.map((edu, idx) => (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Timeline Pin */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-[#0A0A0A] border-4 border-[#0A0A0A] dark:border-[#FDA228]" />

                {/* Card */}
                <div className="bg-white dark:bg-[#121212] p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 shadow-sm hover:border-[#FDA228] dark:hover:border-[#FDA228] transition-colors">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase">
                      {edu.period}
                    </span>
                    {edu.badge && (
                      <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FDA228]/15 text-neutral-900 dark:text-[#FDA228] border border-[#FDA228]/30">
                        {edu.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-black text-xl text-[#0A0A0A] dark:text-white">
                    {edu.institution}
                  </h3>

                  <div className="flex items-center gap-3 text-sm font-semibold text-neutral-800 dark:text-neutral-200 mt-1 flex-wrap">
                    <span>{edu.degree}</span>
                    <span className="text-neutral-300 dark:text-neutral-600">•</span>
                    <span className="text-[#FDA228] font-bold font-mono">{edu.score}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{edu.location}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                    {edu.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Live Radar / Current Focus */}
        <div id="focus" className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-[#FDA228] mb-2">
              <Compass className="w-4 h-4" />
              <span>Active Horizon / 04</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-[#0A0A0A] dark:text-white uppercase">
              Current <span className="stroke-text-black">Focus</span>
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
              What I am actively engineering, researching, and honing right now.
            </p>
          </motion.div>

          {/* Current Focus Cards Grid */}
          <div className="space-y-4">
            {FOCUS_ITEMS.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-5 sm:p-6 bg-white dark:bg-[#121212] rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 group-hover:bg-[#FDA228]/10 transition-colors">
                      {getFocusIcon(item.icon)}
                    </div>
                    <span className={`text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${item.tagColor} dark:bg-opacity-20`}>
                      {item.type}
                    </span>
                  </div>
                </div>

                <h3 className="font-display font-black text-lg sm:text-xl text-[#0A0A0A] dark:text-white mb-1">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
                  {item.description}
                </p>

                {/* Sub items */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  {item.items.map((sub, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-[#1A1A1A] px-2.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-750"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
