import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { planetSystems } from '@/data/planets';
import type { CelestialBody } from '@/data/planets';

function PlanetCard({ planet, index }: { planet: CelestialBody; index: number }) {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const planetScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.8]);
  const planetRotate = useTransform(scrollYProgress, [0, 1], [isEven ? -15 : 15, isEven ? 15 : -15]);
  const xSlide = useTransform(scrollYProgress, [0, 0.3], [isEven ? -80 : 80, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="relative min-h-screen flex items-center py-20 px-6"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(ellipse at ${isEven ? '30%' : '70%'} 50%, ${planet.color}33, transparent 60%)`,
        }}
      />

      <div className={`max-w-7xl mx-auto w-full flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}>
        <motion.div
          style={{ scale: planetScale, rotate: planetRotate, x: xSlide }}
          className="relative flex-shrink-0 w-64 h-64 sm:w-80 sm:h-80 md:w-[420px] md:h-[420px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-[-20%] rounded-full border border-dashed opacity-20"
            style={{ borderColor: planet.color }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-[-10%] rounded-full border opacity-10"
            style={{ borderColor: planet.color }}
          />
          <motion.div
            animate={{
              boxShadow: isHovered
                ? `0 0 80px 20px ${planet.color}44, 0 0 160px 60px ${planet.color}22`
                : `0 0 40px 10px ${planet.color}22, 0 0 80px 30px ${planet.color}11`,
            }}
            className="absolute inset-[10%] rounded-full"
            transition={{ duration: 0.8 }}
          />
          <motion.img
            src={planet.image}
            alt={planet.name}
            className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
            animate={{
              y: isHovered ? -10 : 0,
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            loading="lazy"
            width={512}
            height={512}
          />
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [0, Math.sin(i * 1.2) * 30, 0],
                y: [0, Math.cos(i * 1.2) * 30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: planet.color,
                boxShadow: `0 0 6px ${planet.color}`,
                top: `${20 + i * 12}%`,
                left: `${10 + i * 15}%`,
              }}
            />
          ))}
        </motion.div>

        <motion.div style={{ y }} className="flex-1 max-w-xl">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs tracking-[0.4em] uppercase mb-3 block"
            style={{ color: planet.color }}
          >
            {planet.subtitle}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading text-4xl sm:text-6xl lg:text-7xl font-light mb-6"
            style={{ textShadow: `0 0 30px ${planet.color}44` }}
          >
            {planet.name}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-muted-foreground leading-relaxed mb-8 text-sm sm:text-base font-light"
          >
            {planet.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
          >
            {planet.stats.map((stat, si) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + si * 0.1 }}
                className="glass rounded-lg p-3 text-center"
              >
                <div className="font-heading text-lg font-medium" style={{ color: planet.color }}>
                  {stat.value}
                </div>
                <div className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/system/${planet.id}`)}
            className="glass px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-500"
            style={{
              color: planet.color,
              boxShadow: `0 0 20px ${planet.color}22`,
            }}
          >
            Explore {planet.name} →
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function PlanetExplorer() {
  return (
    <div>
      <div className="relative py-16 flex items-center justify-center">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="line-glow w-64"
        />
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute font-mono text-xs tracking-[0.4em] uppercase text-muted-foreground bg-background px-6"
        >
          Discovered Worlds
        </motion.span>
      </div>

      {planetSystems.map((system, i) => (
        <PlanetCard key={system.planet.id} planet={system.planet} index={i} />
      ))}
    </div>
  );
}
