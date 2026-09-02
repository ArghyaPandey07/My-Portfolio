import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeBanner } from './components/MarqueeBanner';
import { ProjectsGallery } from './components/ProjectsGallery';
import { SkillsMatrix } from './components/SkillsMatrix';
import { EducationFocus } from './components/EducationFocus';
import { ContactSection } from './components/ContactSection';
import { CustomCursor } from './components/CustomCursor';
import { DiagonalTransition } from './components/DiagonalTransition';
import { MobileMenu } from './components/MobileMenu';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Top scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Sync theme with HTML class
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('portfolio-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('portfolio-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // IntersectionObserver for active section
  useEffect(() => {
    const sections = document.querySelectorAll('section, footer');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavigate = (sectionId: string) => {
    setIsTransitioning(true);

    // Relocate behind the black curtain at the midpoint (780ms)
    setTimeout(() => {
      const target = document.getElementById(sectionId);
      if (target) {
        const navHeight = 85;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - (sectionId === 'hero' ? 0 : navHeight);
        window.scrollTo({
          top: targetPosition,
          behavior: 'auto',
        });
      }
    }, 780);

    // Release curtain transition
    setTimeout(() => {
      setIsTransitioning(false);
    }, 2000);
  };

  return (
    <div className={`relative min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-[#F3F4F6] font-sans selection:bg-[#FDA228] selection:text-black transition-colors duration-400`}>
      {/* Top Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#FDA228] origin-left z-[9995] pointer-events-none"
        style={{ scaleX }}
      />

      {/* Custom Fluid Magnetic Cursor */}
      <CustomCursor isDark={isDark} />

      {/* Signature Diagonal Transition Overlay */}
      <DiagonalTransition isTransitioning={isTransitioning} isDark={isDark} />

      {/* Top Floating Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      {/* Full-Screen Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={handleNavigate}
        activeSection={activeSection}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Sections */}
      <main className="relative">
        <Hero onNavigate={handleNavigate} isDark={isDark} />
        <MarqueeBanner />
        <ProjectsGallery />
        <SkillsMatrix />
        <EducationFocus />
      </main>

      {/* Footer & Contact */}
      <ContactSection />
    </div>
  );
};

export default App;
