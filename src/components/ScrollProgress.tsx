import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      {/* Vertical progress line */}
      <motion.div
        className="fixed top-0 left-0 w-[2px] origin-top z-50"
        style={{
          scaleY: scrollYProgress,
          height: '100vh',
          background: 'linear-gradient(to bottom, hsl(185 80% 55%), hsl(265 70% 60%))',
        }}
      />

      {/* Dot indicator */}
      <motion.div
        className="fixed left-0 z-50 w-2 h-2 -ml-[3px] rounded-full bg-primary"
        style={{
          top: useTransform(scrollYProgress, [0, 1], ['0vh', '100vh']),
          boxShadow: '0 0 10px hsl(185 80% 55% / 0.8)',
        }}
      />
    </>
  );
}
