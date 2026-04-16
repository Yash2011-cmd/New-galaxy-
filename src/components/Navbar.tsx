import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-5"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="font-heading text-sm font-medium tracking-wider text-foreground">
          NOVA<span className="text-primary">.</span>
        </div>
        <div className="hidden sm:flex items-center gap-8 font-mono text-xs tracking-widest uppercase text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors duration-300">Work</a>
          <a href="#" className="hover:text-primary transition-colors duration-300">About</a>
          <a href="#" className="hover:text-primary transition-colors duration-300">Contact</a>
        </div>
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
      </div>
    </motion.nav>
  );
}
