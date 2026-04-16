import ParticleField from '@/components/ParticleField';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import NebulaTransition from '@/components/NebulaTransition';
import PlanetExplorer from '@/components/PlanetExplorer';
import GalaxyFooter from '@/components/GalaxyFooter';
import ScrollProgress from '@/components/ScrollProgress';

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <ParticleField />
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <NebulaTransition />
        <PlanetExplorer />
        <GalaxyFooter />
      </main>
    </div>
  );
};

export default Index;
