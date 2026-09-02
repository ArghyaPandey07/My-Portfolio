import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  isDark,
  toggleTheme,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'focus', label: 'Focus' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
        scrolled
          ? 'bg-white/90 dark:bg-[#0A0A0A]/90 nav-blur py-3.5 border-b border-neutral-200/80 dark:border-neutral-800 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate('hero')}
          className="group flex items-center gap-2.5 text-left focus:outline-none"
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            <span className="absolute w-4 h-4 rounded-full border-2 border-[#FDA228] -left-0.5 group-hover:scale-110 transition-transform duration-300" />
            <span className="absolute w-4 h-4 rounded-full border-2 border-[#0A0A0A] dark:border-white -right-0.5 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <span className="font-display font-black text-2xl tracking-tighter text-[#0A0A0A] dark:text-white transition-colors duration-300">
            Arghya<span className="text-[#FDA228]">.</span>
          </span>
        </button>

        {/* Desktop Navigation Links with Smooth Floating Pill */}
        <nav
          className="hidden md:flex items-center gap-1.5 lg:gap-2 text-[15px] font-medium p-1.5 rounded-full bg-neutral-100/80 dark:bg-neutral-900/80 border border-neutral-200/70 dark:border-neutral-800/80 backdrop-blur-md"
          onMouseLeave={() => setHoveredItem(null)}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const isHovered = hoveredItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                className={`relative px-4 py-1.5 rounded-full transition-colors duration-300 ease-out z-10 select-none ${
                  isActive
                    ? 'text-[#0A0A0A] dark:text-white font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-[#0A0A0A] dark:hover:text-white'
                }`}
              >
                {/* Active Capsule Pill */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full bg-white dark:bg-[#1A1A1A] shadow-sm border border-neutral-200/80 dark:border-neutral-700 -z-10"
                    transition={{
                      type: 'spring',
                      stiffness: 220,
                      damping: 26,
                      mass: 0.8,
                    }}
                  />
                )}

                {/* Hover Pill when not active */}
                {isHovered && !isActive && (
                  <motion.div
                    layoutId="hoverNavPill"
                    className="absolute inset-0 rounded-full bg-neutral-200/50 dark:bg-neutral-800/50 -z-20"
                    transition={{
                      type: 'spring',
                      stiffness: 240,
                      damping: 25,
                    }}
                  />
                )}

                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Theme Switcher & Concise Get In Touch CTA */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all duration-300 focus:outline-none border border-neutral-200 dark:border-neutral-800"
            aria-label="Toggle Light and Dark mode"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-[#FDA228] transition-transform duration-500 rotate-0 hover:rotate-90" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-800 transition-transform duration-500 rotate-0 hover:-rotate-12" />
            )}
          </button>

          {/* Clean 'Get in Touch' CTA Button */}
          <button
            onClick={() => onNavigate('contact')}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-display font-bold uppercase tracking-wider bg-[#0A0A0A] text-white dark:bg-white dark:text-[#0A0A0A] rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-200 group shadow-sm hover:shadow-md"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#FDA228] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </button>
        </div>

        {/* Mobile Hamburger Menu Toggle + Mobile Theme Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-[#FDA228]" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-neutral-900 dark:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
