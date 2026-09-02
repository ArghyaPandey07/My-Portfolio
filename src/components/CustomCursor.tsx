import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface CustomCursorProps {
  isDark?: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ isDark = false }) => {
  const [cursorText, setCursorText] = useState<string>('');
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'project' | 'text'>('default');
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], input, textarea, select, .interactive-hover');
      const projectCard = target.closest('.project-card-interactive');
      const textElement = target.closest('h1, h2, p, span, .text-interactive');

      if (projectCard) {
        setCursorType('project');
        setCursorText('VIEW');
      } else if (interactive) {
        setCursorType('pointer');
        setCursorText('');
      } else if (textElement) {
        setCursorType('text');
        setCursorText('');
      } else {
        setCursorType('default');
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  const defaultBorderColor = isDark ? '#FFFFFF' : '#0A0A0A';
  const defaultDotColor = isDark ? '#FFFFFF' : '#0A0A0A';

  return (
    <>
      {/* Outer Follower Circle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          animate={{
            width: cursorType === 'project' ? 80 : cursorType === 'pointer' ? 48 : 36,
            height: cursorType === 'project' ? 80 : cursorType === 'pointer' ? 48 : 36,
            backgroundColor: cursorType === 'project' ? (isDark ? '#0A0A0A' : '#0A0A0A') : cursorType === 'pointer' ? 'rgba(253, 162, 40, 0.15)' : 'transparent',
            borderColor: cursorType === 'project' ? '#FDA228' : cursorType === 'pointer' ? '#FDA228' : defaultBorderColor,
            borderWidth: cursorType === 'project' ? 2 : cursorType === 'pointer' ? 2 : 1.5,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="rounded-full flex items-center justify-center backdrop-blur-[1px] shadow-sm"
        >
          {cursorType === 'project' && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="flex items-center gap-1 text-white text-[11px] font-bold tracking-widest uppercase"
            >
              <span>{cursorText}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#FDA228]" />
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Center Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      >
        <motion.div
          animate={{
            scale: cursorType === 'project' ? 0 : cursorType === 'pointer' ? 0.6 : 1,
            opacity: cursorType === 'project' ? 0 : 1,
            backgroundColor: defaultDotColor,
          }}
          transition={{ duration: 0.15 }}
          className="w-2 h-2 rounded-full"
        />
      </motion.div>
    </>
  );
};
