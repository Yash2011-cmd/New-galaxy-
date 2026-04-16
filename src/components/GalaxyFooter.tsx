import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const journeyStats = [
  { value: '4', label: 'Worlds Discovered', suffix: '' },
  { value: '18.6', label: 'Light Years Traveled', suffix: 'LY' },
  { value: '∞', label: 'Mysteries Remaining', suffix: '' },
];

export default function GalaxyFooter() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [60, 0]);

  return (
    <footer ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <motion.div style={{ opacity, y }} className="max-w-4xl mx-auto text-center relative z-10">
        {/* Journey summary */}
        <div className="flex justify-center gap-12 sm:gap-20 mb-16">
          {journeyStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="font-heading text-3xl sm:text-5xl font-light gradient-text">
                {stat.value}{stat.suffix && <span className="text-lg">{stat.suffix}</span>}
              </div>
              <div className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground mt-2">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="line-glow w-32 mx-auto mb-12" />

        <h2 className="font-heading text-3xl sm:text-5xl font-light text-foreground mb-6">
          The journey <span className="gradient-text font-medium">continues</span>
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto mb-10 font-light leading-relaxed">
          This is only the beginning. The galaxy holds billions of worlds waiting to be found.
          Keep scrolling through the stars.
        </p>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 40px hsl(185 80% 55% / 0.3)' }}
          whileTap={{ scale: 0.98 }}
          className="glass px-10 py-4 rounded-full text-primary font-medium text-sm tracking-wide box-glow transition-all duration-500 mb-16"
        >
          Launch Star Map
        </motion.button>

        <div className="flex items-center justify-center gap-8 text-[10px] font-mono text-muted-foreground/40 tracking-widest uppercase">
          <span>Three.js</span>
          <span className="w-1 h-1 rounded-full bg-primary/20" />
          <span>WebGL</span>
          <span className="w-1 h-1 rounded-full bg-primary/20" />
          <span>GLSL Shaders</span>
          <span className="w-1 h-1 rounded-full bg-primary/20" />
          <span>React</span>
        </div>
      </motion.div>
    </footer>
  );
}
