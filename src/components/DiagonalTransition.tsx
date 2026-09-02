import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DiagonalTransitionProps {
  isTransitioning: boolean;
  isDark?: boolean;
}

export const DiagonalTransition: React.FC<DiagonalTransitionProps> = ({
  isTransitioning,
  isDark = false,
}) => {
  const primaryColor = isDark ? '#050505' : '#0A0A0A';
  const totalDuration = 2.0;

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-[9990] overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Left Panel (Skews -45deg, slides from top to bottom) */}
          <motion.div
            initial={{ y: '-120%', x: '-20%' }}
            animate={{
              y: ['-120%', '0%', '0%', '120%'],
              x: ['-20%', '0%', '0%', '20%'],
            }}
            transition={{
              duration: totalDuration,
              times: [0, 0.38, 0.62, 1],
              ease: [0.77, 0, 0.175, 1],
            }}
            className="absolute inset-0 origin-top-left"
            style={{
              backgroundColor: primaryColor,
              width: '180vw',
              height: '180vh',
              left: '-40vw',
              top: '-40vh',
              transform: 'skew(0deg, -45deg)',
              clipPath: 'polygon(0 0, 100% 0, 0 100%)',
            }}
          />

          {/* Right Panel (Skews -45deg, slides from bottom to top) */}
          <motion.div
            initial={{ y: '120%', x: '20%' }}
            animate={{
              y: ['120%', '0%', '0%', '-120%'],
              x: ['20%', '0%', '0%', '-20%'],
            }}
            transition={{
              duration: totalDuration,
              times: [0, 0.38, 0.62, 1],
              ease: [0.77, 0, 0.175, 1],
            }}
            className="absolute inset-0 origin-bottom-right"
            style={{
              backgroundColor: primaryColor,
              width: '180vw',
              height: '180vh',
              left: '-40vw',
              top: '-40vh',
              transform: 'skew(0deg, -45deg)',
              clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
            }}
          />

          {/* Center Monogram (Clean, crisp, white with amber dot like Bazil) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 15 }}
            animate={{
              opacity: [0, 1, 1, 1, 0],
              scale: [0.88, 1, 1, 1, 1.08],
              y: [15, 0, 0, 0, -10],
            }}
            transition={{
              duration: totalDuration,
              times: [0, 0.32, 0.5, 0.68, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20"
          >
            {/* Ambient Gold Glow */}
            <div className="absolute w-44 h-44 rounded-full bg-[#FDA228]/15 blur-2xl -z-10" />

            <div className="flex items-center gap-3">
              {/* Twin interlocking circles logo */}
              <div className="relative w-8 h-8 flex items-center justify-center mr-1">
                <span className="absolute w-6 h-6 rounded-full border-2 border-[#FDA228] -left-1" />
                <span className="absolute w-6 h-6 rounded-full border-2 border-white -right-1" />
              </div>
              <span className="text-5xl md:text-7xl font-black tracking-tighter text-white font-display">
                Arghya<span className="text-[#FDA228]">.</span>
              </span>
            </div>

            <p className="text-xs uppercase tracking-[0.4em] text-neutral-400 font-mono mt-3 font-medium">
              Portfolio
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
