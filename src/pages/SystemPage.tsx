import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { getSystemById } from '@/data/planets';
import type { CelestialBody } from '@/data/planets';
import ParticleField from '@/components/ParticleField';
import { useState } from 'react';

function MoonCard({ body, index }: { body: CelestialBody; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setExpanded(!expanded)}
      className="glass rounded-2xl overflow-hidden cursor-pointer group"
    >
      <div className="flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8">
        {/* Moon image */}
        <div className="relative flex-shrink-0 w-40 h-40 sm:w-48 sm:h-48">
          {/* Orbital rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-[-15%] rounded-full border border-dashed opacity-15"
            style={{ borderColor: body.color }}
          />
          {/* Glow */}
          <motion.div
            animate={{
              boxShadow: isHovered
                ? `0 0 60px 15px ${body.color}33, 0 0 120px 40px ${body.color}18`
                : `0 0 30px 8px ${body.color}18`,
            }}
            className="absolute inset-[15%] rounded-full"
            transition={{ duration: 0.6 }}
          />
          <motion.img
            src={body.image}
            alt={body.name}
            className="w-full h-full object-contain relative z-10"
            animate={{
              y: isHovered ? -6 : 0,
              scale: isHovered ? 1.08 : 1,
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            loading="lazy"
            width={512}
            height={512}
          />
          {/* Floating particles */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [0, Math.sin(i * 1.5) * 15, 0],
                y: [0, Math.cos(i * 1.5) * 15, 0],
                opacity: [0.2, 0.7, 0.2],
              }}
              transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: body.color,
                boxShadow: `0 0 4px ${body.color}`,
                top: `${25 + i * 15}%`,
                left: `${15 + i * 20}%`,
              }}
            />
          ))}
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <span
            className="font-mono text-[10px] tracking-[0.4em] uppercase block mb-1"
            style={{ color: body.color }}
          >
            {body.subtitle}
          </span>
          <h3
            className="font-heading text-2xl sm:text-3xl font-light mb-3 transition-all duration-500"
            style={{ textShadow: isHovered ? `0 0 20px ${body.color}44` : 'none' }}
          >
            {body.name}
          </h3>
          <p className="text-muted-foreground text-sm font-light leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">
            {body.description}
          </p>

          {/* Stats - visible on expand */}
          <motion.div
            initial={false}
            animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
              {body.stats.map((stat) => (
                <div key={stat.label} className="glass rounded-lg p-2.5 text-center">
                  <div className="font-heading text-sm font-medium" style={{ color: body.color }}>
                    {stat.value}
                  </div>
                  <div className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <span className="inline-block mt-3 font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
            {expanded ? '▲ Collapse' : '▼ Click to expand'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function SystemPage() {
  const { systemId } = useParams<{ systemId: string }>();
  const navigate = useNavigate();
  const system = getSystemById(systemId || '');

  if (!system) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl text-foreground mb-4">System Not Found</h1>
          <button onClick={() => navigate('/')} className="text-primary font-mono text-sm">
            ← Return to Galaxy
          </button>
        </div>
      </div>
    );
  }

  const { planet, moons, systemDescription } = system;

  return (
    <div className="relative min-h-screen">
      <ParticleField />

      {/* Back navigation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-6 left-6 z-50"
      >
        <button
          onClick={() => navigate('/')}
          className="glass px-4 py-2 rounded-full font-mono text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2"
        >
          <span>←</span> Galaxy
        </button>
      </motion.div>

      {/* System name */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-6 right-6 z-50"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground/50">
          {planet.name} System
        </span>
      </motion.div>

      <main className="relative z-10 pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Hero: Parent planet */}
          <div className="flex flex-col items-center text-center mb-20">
            {/* Planet image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 mb-8"
            >
              {/* Orbital rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-25%] rounded-full border border-dashed opacity-15"
                style={{ borderColor: planet.color }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-15%] rounded-full border opacity-10"
                style={{ borderColor: planet.color }}
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-35%] rounded-full border border-dotted opacity-5"
                style={{ borderColor: planet.color }}
              />

              {/* Glow */}
              <div
                className="absolute inset-[10%] rounded-full"
                style={{ boxShadow: `0 0 80px 20px ${planet.color}33, 0 0 160px 60px ${planet.color}15` }}
              />

              <motion.img
                src={planet.image}
                alt={planet.name}
                className="w-full h-full object-contain relative z-10"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                width={512}
                height={512}
              />

              {/* Moon orbit dots */}
              {moons.map((moon, i) => (
                <motion.div
                  key={moon.id}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8 + i * 4, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0"
                  style={{ transformOrigin: 'center center' }}
                >
                  <div
                    className="absolute w-2.5 h-2.5 rounded-full"
                    style={{
                      background: moon.color,
                      boxShadow: `0 0 8px ${moon.color}`,
                      top: i === 0 ? '-18%' : '-28%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>

            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-mono text-xs tracking-[0.4em] uppercase mb-3"
              style={{ color: planet.color }}
            >
              {planet.subtitle}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-heading text-5xl sm:text-7xl font-light mb-4"
              style={{ textShadow: `0 0 40px ${planet.color}33` }}
            >
              {planet.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-muted-foreground text-sm sm:text-base font-light max-w-xl leading-relaxed mb-6"
            >
              {systemDescription}
            </motion.p>

            {/* Planet stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-lg"
            >
              {planet.stats.map((stat) => (
                <div key={stat.label} className="glass rounded-lg p-3 text-center">
                  <div className="font-heading text-lg font-medium" style={{ color: planet.color }}>
                    {stat.value}
                  </div>
                  <div className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="relative flex items-center justify-center mb-16"
          >
            <div className="line-glow w-48" />
            <span className="absolute font-mono text-[10px] tracking-[0.4em] uppercase text-muted-foreground bg-background px-4">
              Moons & Bodies — {moons.length} Discovered
            </span>
          </motion.div>

          {/* Moons list */}
          <div className="space-y-6">
            {moons.map((moon, i) => (
              <MoonCard key={moon.id} body={moon} index={i} />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center mt-20"
          >
            <div className="line-glow w-32 mx-auto mb-8" />
            <p className="text-muted-foreground text-sm font-light mb-6">
              Continue exploring the galaxy
            </p>
            <button
              onClick={() => navigate('/')}
              className="glass px-8 py-3 rounded-full text-primary font-medium text-sm tracking-wide box-glow hover:bg-primary/10 transition-all duration-500"
            >
              ← Return to Galaxy Map
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
