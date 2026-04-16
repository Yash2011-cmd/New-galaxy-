import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import nebulaBg from '@/assets/nebula-bg.jpg';

export default function NebulaTransition() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.6, 0.6, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.3, 1, 1.1]);
  const textY = useTransform(scrollYProgress, [0.2, 0.5], [50, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.7, 0.9], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Nebula background with parallax */}
      <motion.div
        style={{ opacity, scale }}
        className="absolute inset-0"
      >
        <img
          src={nebulaBg}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-background/40" />
      </motion.div>

      {/* Floating dust particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
            className="absolute w-0.5 h-0.5 rounded-full bg-primary"
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${(i * 7 + 20) % 100}%`,
              boxShadow: '0 0 4px hsl(185 80% 55% / 0.5)',
            }}
          />
        ))}
      </div>

      <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10 text-center px-6">
        <p className="font-mono text-xs tracking-[0.4em] uppercase text-primary mb-4">Entering the Nebula</p>
        <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-light text-foreground">
          The <span className="gradient-text font-medium">Cosmic Nursery</span>
        </h2>
        <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-sm font-light">
          Where stars are born and worlds take shape, drifting through clouds of interstellar dust.
        </p>
      </motion.div>
    </section>
  );
}
