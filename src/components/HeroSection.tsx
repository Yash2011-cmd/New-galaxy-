import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center px-6">
      <motion.div style={{ y, opacity, scale }} className="max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="font-mono text-sm tracking-[0.3em] uppercase text-primary mb-6 text-glow">
            Voyage into the unknown
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-heading text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-[0.9] mb-8"
        >
          <span className="block text-foreground">Explore the</span>
          <span className="block gradient-text font-medium">Galaxy</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          Scroll to journey through the cosmos. Discover alien worlds, 
          ancient nebulae, and the mysteries that lie between the stars.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex items-center justify-center gap-6"
        >
          <button className="glass px-8 py-3 rounded-full text-primary font-medium text-sm tracking-wide box-glow hover:bg-primary/10 transition-all duration-500">
            Begin Journey
          </button>
          <button className="px-8 py-3 rounded-full text-muted-foreground text-sm tracking-wide border border-border hover:border-primary/30 hover:text-foreground transition-all duration-500">
            Star Map
          </button>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
