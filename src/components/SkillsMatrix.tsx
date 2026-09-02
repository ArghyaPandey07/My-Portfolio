import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Globe, Database, Terminal, Sparkles, Heart } from 'lucide-react';
import { SKILLS_DATA, INTERESTS_TAGS } from '../data/portfolioData';

export const SkillsMatrix: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);

  const icons = [
    <Terminal className="w-5 h-5" />,
    <Globe className="w-5 h-5" />,
    <Database className="w-5 h-5" />,
    <Code2 className="w-5 h-5" />,
  ];

  return (
    <section id="skills" className="py-20 sm:py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 sm:mb-16"
      >
        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-[#FDA228] mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Technical Repertoire / 02</span>
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-[#0A0A0A] dark:text-white uppercase">
          Skills &amp; <span className="stroke-text-black hover:text-[#0A0A0A] dark:hover:text-white transition-colors">Technologies</span>
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mt-3">
          A blend of solid computer science fundamentals, full-stack web capabilities, creative computing tools, and embedded hardware.
        </p>
      </motion.div>

      {/* Category Tabs & Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Category Selectors */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {SKILLS_DATA.map((cat, idx) => {
            const isSelected = activeCategoryIndex === idx;
            return (
              <button
                key={cat.title}
                onClick={() => setActiveCategoryIndex(idx)}
                className={`p-5 rounded-2xl text-left transition-all duration-200 border flex items-start gap-4 ${
                  isSelected
                    ? 'bg-[#0A0A0A] dark:bg-white text-white dark:text-[#0A0A0A] border-[#0A0A0A] dark:border-white shadow-lg'
                    : 'bg-white dark:bg-[#121212] text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-[#181818]'
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl transition-colors ${
                    isSelected ? 'bg-white/10 dark:bg-black/10 text-[#FDA228]' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  {icons[idx % icons.length]}
                </div>
                <div>
                  <h3 className="font-display font-bold text-base tracking-tight">
                    {cat.title}
                  </h3>
                  <p
                    className={`text-xs mt-1 line-clamp-2 ${
                      isSelected ? 'text-neutral-300 dark:text-neutral-600' : 'text-neutral-500 dark:text-neutral-400'
                    }`}
                  >
                    {cat.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Interactive Skills List */}
        <motion.div
          layout
          className="lg:col-span-8 bg-white dark:bg-[#121212] p-6 sm:p-10 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm min-h-[380px] flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-100 dark:border-neutral-800">
              <div>
                <h3 className="font-display font-black text-2xl text-[#0A0A0A] dark:text-white">
                  {SKILLS_DATA[activeCategoryIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  {SKILLS_DATA[activeCategoryIndex].description}
                </p>
              </div>
              <span className="text-xs font-mono font-bold bg-[#FDA228]/15 dark:bg-[#FDA228]/20 text-neutral-900 dark:text-[#FDA228] border border-[#FDA228]/30 px-3 py-1 rounded-full">
                {SKILLS_DATA[activeCategoryIndex].skills.length} Items
              </span>
            </div>

            {/* Skill Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SKILLS_DATA[activeCategoryIndex].skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="p-4 rounded-xl bg-neutral-50 dark:bg-[#1A1A1A] border border-neutral-200/80 dark:border-neutral-800 hover:border-[#FDA228] dark:hover:border-[#FDA228] transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display font-bold text-sm text-neutral-900 dark:text-neutral-200 group-hover:text-[#0A0A0A] dark:group-hover:text-white">
                      {skill.name}
                    </span>
                    {skill.highlight && (
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-950/80 px-2 py-0.5 rounded">
                        Core
                      </span>
                    )}
                  </div>
                  {/* Visual Proficiency Bar */}
                  <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[#FDA228] to-orange-500 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Interests Tag Cloud */}
          <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Passions &amp; Primary Interests</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {INTERESTS_TAGS.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 bg-white dark:bg-[#1A1A1A] hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black text-neutral-700 dark:text-neutral-300 text-xs font-medium rounded-full border border-neutral-300 dark:border-neutral-750 transition-colors cursor-default"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
