import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, Sparkles, Layers } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl bg-white dark:bg-[#121212] rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden z-10 my-auto"
        >
          {/* Header Banner */}
          <div 
            className={`p-6 sm:p-8 border-b border-neutral-200 dark:border-neutral-800 relative ${project.imageUrl ? 'bg-cover bg-center text-white' : `bg-gradient-to-r ${project.gradient}`}`}
            style={project.imageUrl ? { backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.85)), url(${project.imageUrl})` } : {}}
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/80 dark:bg-[#1A1A1A]/80 hover:bg-white dark:hover:bg-[#252525] text-neutral-800 dark:text-neutral-200 transition-colors shadow-sm focus:outline-none z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative z-10 flex items-center gap-3 mb-4">
              <span className={`text-xs font-mono font-semibold uppercase tracking-wider px-3 py-1 rounded-full border shadow-sm backdrop-blur-md ${project.imageUrl ? 'bg-black/30 border-white/20 text-white' : 'bg-white/90 dark:bg-neutral-900/90 border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200'}`}>
                {project.category}
              </span>
              {project.status && (
                <span className={`text-xs font-mono font-semibold uppercase tracking-wider px-3 py-1 rounded-full border shadow-sm backdrop-blur-md ${project.imageUrl ? 'bg-black/30 border-white/20 text-white' : (
                  project.status === 'Completed'
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                    : 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                )}`}>
                  {project.status}
                </span>
              )}
            </div>

            <div className="relative z-10 flex items-baseline gap-3 flex-wrap mt-10">
              <h2 className={`text-2xl sm:text-3xl font-display font-black tracking-tight ${project.imageUrl ? 'text-white' : 'text-[#0A0A0A] dark:text-white'}`}>
                {project.title}
              </h2>
              {project.bengaliTitle && (
                <span className="text-xl sm:text-2xl font-bengali font-semibold text-[#FDA228]">
                  {project.bengaliTitle}
                </span>
              )}
            </div>
            <p className={`relative z-10 text-sm sm:text-base font-medium mt-1 ${project.imageUrl ? 'text-neutral-300' : 'text-neutral-600 dark:text-neutral-300'}`}>
              {project.subtitle}
            </p>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 max-h-[65vh] overflow-y-auto space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-xs uppercase tracking-widest font-mono text-neutral-400 dark:text-neutral-500 font-bold mb-2">
                Overview &amp; Architecture
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm sm:text-base">
                {project.longDescription}
              </p>
            </div>

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <div>
                <h3 className="text-xs uppercase tracking-widest font-mono text-neutral-400 dark:text-neutral-500 font-bold mb-3 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#FDA228]" />
                  Key Highlights &amp; Capabilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-neutral-50 dark:bg-[#1A1A1A] border border-neutral-200/70 dark:border-neutral-800 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Pills */}
            <div>
              <h3 className="text-xs uppercase tracking-widest font-mono text-neutral-400 dark:text-neutral-500 font-bold mb-2 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-neutral-500" />
                Technologies &amp; Libraries
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-neutral-100 dark:bg-[#1E1E1E] hover:bg-[#FDA228]/15 hover:border-[#FDA228] text-neutral-800 dark:text-neutral-200 text-xs font-semibold rounded-md border border-neutral-200 dark:border-neutral-700 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-neutral-50 dark:bg-[#161616] border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              Built by <span className="font-semibold text-neutral-800 dark:text-neutral-200">Arghya Pandey</span>
            </div>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#0A0A0A] dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-[#0A0A0A] rounded-lg text-xs font-semibold tracking-wide transition-colors shadow-sm"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 text-neutral-400 dark:text-neutral-600" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
