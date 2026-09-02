import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Github, Linkedin, Instagram, MapPin, Sun, Moon } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  isDark: boolean;
  toggleTheme: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onNavigate,
  activeSection,
  isDark,
  toggleTheme,
}) => {
  const menuItems = [
    { id: 'hero', label: 'Home', number: '00' },
    { id: 'projects', label: 'Projects & Work', number: '01' },
    { id: 'skills', label: 'Skills & Stack', number: '02' },
    { id: 'education', label: 'Education Journey', number: '03' },
    { id: 'focus', label: 'Current Focus', number: '04' },
    { id: 'contact', label: 'Get in Touch', number: '05' },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-[#0A0A0A] text-white flex flex-col justify-between p-6 sm:p-10 overflow-y-auto"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-6">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-2xl text-white">
                Arghya<span className="text-[#FDA228]">.</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-[#FDA228]" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-800 focus:outline-none"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="my-auto py-8 space-y-4">
            {menuItems.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => handleItemClick(item.id)}
                  className="w-full flex items-center justify-between text-left py-2 group focus:outline-none"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-xs font-mono font-bold text-[#FDA228]">
                      {item.number}
                    </span>
                    <span
                      className={`font-display font-black text-3xl sm:text-4xl tracking-tight transition-colors ${
                        isActive
                          ? 'text-white'
                          : 'text-neutral-400 group-hover:text-white'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-neutral-500 group-hover:text-[#FDA228] transition-colors" />
                </motion.button>
              );
            })}
          </div>

          {/* Bottom Contact & Socials */}
          <div className="pt-6 border-t border-neutral-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <MapPin className="w-3.5 h-3.5 text-[#FDA228]" />
              <span>Phagwara, Punjab • LPU CSE</span>
            </div>

            <div className="flex items-center justify-between gap-4 flex-wrap">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-sm font-semibold text-neutral-300 hover:text-[#FDA228] transition-colors"
              >
                {PERSONAL_INFO.email}
              </a>

              <div className="flex items-center gap-4">
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
