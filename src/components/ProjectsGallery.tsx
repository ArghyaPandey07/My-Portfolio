import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles, Code, Cpu, Globe, Brain } from 'lucide-react';
import { PROJECTS, Project } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';

export const ProjectsGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = ['All', 'Full-Stack', 'Web & E-Commerce', 'AI & Labs', 'Hardware & IoT'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 sm:py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6"
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-[#FDA228] mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Curated Portfolio / 01</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-[#0A0A0A] dark:text-white uppercase">
            Featured <span className="stroke-text-black hover:text-[#0A0A0A] dark:hover:text-white transition-colors">Projects</span>
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-[#0A0A0A] text-white dark:bg-white dark:text-[#0A0A0A] shadow-md'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="project-card-interactive group relative rounded-2xl bg-white dark:bg-[#121212] border border-neutral-200/90 dark:border-neutral-800 shadow-sm hover:shadow-2xl dark:hover:shadow-black/60 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
            >
              {/* Card Top Aesthetic Mockup Area */}
              <div className={`relative h-60 sm:h-72 p-6 sm:p-8 bg-gradient-to-br ${project.gradient} border-b border-neutral-100 dark:border-neutral-800/80 flex flex-col justify-between overflow-hidden`}>
                
                {/* Project Image */}
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                )}

                {/* Background Grid Pattern (Only if no image) */}
                {!project.imageUrl && (
                  <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.15] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                )}

                {/* Top Meta Tags */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3 py-1 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md rounded-full text-[11px] font-mono font-bold tracking-wider uppercase text-neutral-800 dark:text-neutral-200 border border-neutral-200/80 dark:border-neutral-700 shadow-sm">
                    {project.category}
                  </span>

                  {project.status && (
                    <span className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase border shadow-sm backdrop-blur-md ${
                      project.status === 'Completed'
                        ? 'bg-emerald-50/90 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border-emerald-200/80 dark:border-emerald-800/80'
                        : 'bg-amber-50/90 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 border-amber-200/80 dark:border-amber-800/80'
                    }`}>
                      {project.status}
                    </span>
                  )}
                </div>

                {/* Center Creative Graphic Mockup (Only if no image) */}
                {!project.imageUrl && (
                  <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/95 dark:bg-[#1C1C1C]/95 border border-neutral-200 dark:border-neutral-700 shadow-md flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      {project.category === 'Full-Stack' && <Code className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />}
                      {project.category === 'Web & E-Commerce' && <Globe className="w-8 h-8 text-[#FDA228]" />}
                      {project.category === 'AI & Labs' && <Brain className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />}
                      {project.category === 'Hardware & IoT' && <Cpu className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />}
                    </div>

                    <h3 className="font-display font-black text-2xl sm:text-3xl text-[#0A0A0A] dark:text-white tracking-tight group-hover:text-[#FDA228] transition-colors">
                      {project.title}
                    </h3>
                    {project.bengaliTitle && (
                      <p className="font-bengali text-lg text-neutral-600 dark:text-neutral-300 font-semibold mt-0.5">
                        {project.bengaliTitle}
                      </p>
                    )}
                  </div>
                )}

                {/* Hover Trigger Hint */}
                <div className={`relative z-10 flex items-center justify-end ${project.imageUrl ? 'mt-auto' : ''}`}>
                  <div className="w-10 h-10 rounded-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md shadow-md flex items-center justify-center group-hover:bg-[#0A0A0A] group-hover:text-white dark:group-hover:bg-[#FDA228] dark:group-hover:text-black transition-colors duration-200 border border-transparent dark:border-neutral-800">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Card Bottom Content */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                <div>
                  {project.imageUrl && (
                    <div className="mb-3">
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-[#0A0A0A] dark:text-white tracking-tight group-hover:text-[#FDA228] transition-colors">
                        {project.title}
                      </h3>
                      {project.bengaliTitle && (
                        <p className="font-bengali text-sm text-neutral-600 dark:text-neutral-400 font-semibold mt-0.5">
                          {project.bengaliTitle}
                        </p>
                      )}
                    </div>
                  )}
                  <h4 className={`text-xs font-mono font-bold tracking-widest uppercase text-neutral-400 dark:text-neutral-500 ${project.imageUrl ? 'mb-4' : 'mb-2'}`}>
                    {project.subtitle}
                  </h4>
                  <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Tech Pills & Actions */}
                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-neutral-50 dark:bg-[#1A1A1A] text-neutral-700 dark:text-neutral-300 text-xs font-medium rounded border border-neutral-200/70 dark:border-neutral-750"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-2 py-1 bg-neutral-50 dark:bg-[#1A1A1A] text-neutral-500 dark:text-neutral-400 text-xs font-mono rounded border border-neutral-200/70 dark:border-neutral-750">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-bold text-[#0A0A0A] dark:text-white group-hover:text-[#FDA228] transition-colors flex items-center gap-1">
                    Details
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Deep-dive Project Case Study Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
