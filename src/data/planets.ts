import planetAqualis from '@/assets/planet-aqualis.png';
import planetPyraxis from '@/assets/planet-pyraxis.png';
import planetCrystara from '@/assets/planet-crystara.png';
import planetVerdania from '@/assets/planet-verdania.png';
import moonGlacius from '@/assets/moon-glacius.png';
import moonTempest from '@/assets/moon-tempest.png';
import moonEmber from '@/assets/moon-ember.png';
import moonObsidian from '@/assets/moon-obsidian.png';
import moonPrism from '@/assets/moon-prism.png';
import moonShard from '@/assets/moon-shard.png';
import moonSpore from '@/assets/moon-spore.png';
import moonTidal from '@/assets/moon-tidal.png';

export interface CelestialBody {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  description: string;
  stats: { label: string; value: string }[];
  color: string;
  glowColor: string;
}

export interface PlanetSystem {
  planet: CelestialBody;
  moons: CelestialBody[];
  systemDescription: string;
}

export const planetSystems: PlanetSystem[] = [
  {
    planet: {
      id: 'aqualis',
      name: 'Aqualis',
      subtitle: 'The Ringed Titan',
      image: planetAqualis,
      description: 'A colossal gas giant surrounded by crystalline ice rings that refract light into prismatic auroras. Its atmosphere harbors storms larger than entire worlds, with wind speeds reaching 2,000 km/h.',
      stats: [
        { label: 'Distance', value: '4.2 LY' },
        { label: 'Diameter', value: '142,984 km' },
        { label: 'Moons', value: '67' },
        { label: 'Temperature', value: '-163°C' },
      ],
      color: 'hsl(185, 80%, 55%)',
      glowColor: '185 80% 55%',
    },
    systemDescription: 'The Aqualis system is a frozen wonderland of ice moons and electric storms, orbiting a brilliant blue star. Its ring system spans over 280,000 km.',
    moons: [
      {
        id: 'glacius',
        name: 'Glacius',
        subtitle: 'The Frozen Eye',
        image: moonGlacius,
        description: 'An ice moon with a massive crater lake revealing a subsurface ocean of liquid water. Hydrothermal vents at the ocean floor sustain colonies of bioluminescent organisms in perpetual darkness.',
        stats: [
          { label: 'Orbit', value: '421,800 km' },
          { label: 'Diameter', value: '3,643 km' },
          { label: 'Gravity', value: '0.18g' },
          { label: 'Temperature', value: '-220°C' },
        ],
        color: 'hsl(195, 85%, 60%)',
        glowColor: '195 85% 60%',
      },
      {
        id: 'tempest',
        name: 'Tempest',
        subtitle: 'The Storm Crown',
        image: moonTempest,
        description: 'Perpetually shrouded in violent electrical storms, Tempest generates more electromagnetic energy than a small star. Its upper atmosphere is harvested by automated drones for rare plasma isotopes.',
        stats: [
          { label: 'Orbit', value: '670,900 km' },
          { label: 'Diameter', value: '5,268 km' },
          { label: 'Gravity', value: '0.31g' },
          { label: 'Temperature', value: '-140°C' },
        ],
        color: 'hsl(190, 90%, 50%)',
        glowColor: '190 90% 50%',
      },
    ],
  },
  {
    planet: {
      id: 'pyraxis',
      name: 'Pyraxis',
      subtitle: 'The Burning World',
      image: planetPyraxis,
      description: 'A volcanic hellscape where rivers of molten magma carve luminous veins across the surface. Despite the extreme conditions, rare silicon-based organisms thrive in geothermal vents deep within its crust.',
      stats: [
        { label: 'Distance', value: '7.8 LY' },
        { label: 'Diameter', value: '12,742 km' },
        { label: 'Moons', value: '2' },
        { label: 'Temperature', value: '1,200°C' },
      ],
      color: 'hsl(15, 90%, 55%)',
      glowColor: '15 90% 55%',
    },
    systemDescription: 'The Pyraxis system orbits dangerously close to a red dwarf star, bathing everything in crimson light. Tidal forces keep the planet geologically hyperactive.',
    moons: [
      {
        id: 'ember',
        name: 'Ember',
        subtitle: 'The Crater Furnace',
        image: moonEmber,
        description: 'A dark metallic moon pockmarked with glowing magma craters. Rich deposits of rare metals make it a prime target for deep-space mining expeditions, though the extreme heat makes surface operations hazardous.',
        stats: [
          { label: 'Orbit', value: '128,500 km' },
          { label: 'Diameter', value: '1,820 km' },
          { label: 'Gravity', value: '0.12g' },
          { label: 'Temperature', value: '800°C' },
        ],
        color: 'hsl(10, 85%, 50%)',
        glowColor: '10 85% 50%',
      },
      {
        id: 'obsidian',
        name: 'Obsidian',
        subtitle: 'The Veined Shadow',
        image: moonObsidian,
        description: 'A cracked obsidian world where golden lava rivers form mesmerizing geometric patterns visible from orbit. Ancient alien artifacts have been detected buried beneath its volcanic glass surface.',
        stats: [
          { label: 'Orbit', value: '245,000 km' },
          { label: 'Diameter', value: '2,410 km' },
          { label: 'Gravity', value: '0.15g' },
          { label: 'Temperature', value: '650°C' },
        ],
        color: 'hsl(35, 95%, 50%)',
        glowColor: '35 95% 50%',
      },
    ],
  },
  {
    planet: {
      id: 'crystara',
      name: 'Crystara',
      subtitle: 'The Prismatic Jewel',
      image: planetCrystara,
      description: 'An enigmatic world whose surface is covered in colossal crystalline formations that pulse with an inner bioluminescence. Ancient civilizations may have once harnessed these crystals as an energy source.',
      stats: [
        { label: 'Distance', value: '12.4 LY' },
        { label: 'Diameter', value: '8,320 km' },
        { label: 'Moons', value: '5' },
        { label: 'Temperature', value: '-40°C' },
      ],
      color: 'hsl(265, 70%, 60%)',
      glowColor: '265 70% 60%',
    },
    systemDescription: 'The Crystara system pulses with resonant harmonic frequencies emitted by the crystalline planet. Its moons vibrate in sympathy, creating a cosmic orchestra audible on deep-space frequencies.',
    moons: [
      {
        id: 'prism',
        name: 'Prism',
        subtitle: 'The Spectral Orb',
        image: moonPrism,
        description: 'A translucent moon that refracts starlight into dazzling rainbow patterns across its surface. Its core contains a massive resonance crystal that amplifies the harmonic field of the entire system.',
        stats: [
          { label: 'Orbit', value: '185,000 km' },
          { label: 'Diameter', value: '2,100 km' },
          { label: 'Gravity', value: '0.14g' },
          { label: 'Temperature', value: '-85°C' },
        ],
        color: 'hsl(280, 75%, 65%)',
        glowColor: '280 75% 65%',
      },
      {
        id: 'shard',
        name: 'Shard',
        subtitle: 'The Crystal Spire',
        image: moonShard,
        description: 'Towering amethyst spires reach kilometers into the thin atmosphere, each one a natural antenna channeling cosmic energy. Explorers report strange visions and time distortions near the largest formations.',
        stats: [
          { label: 'Orbit', value: '310,000 km' },
          { label: 'Diameter', value: '1,650 km' },
          { label: 'Gravity', value: '0.09g' },
          { label: 'Temperature', value: '-120°C' },
        ],
        color: 'hsl(275, 80%, 50%)',
        glowColor: '275 80% 50%',
      },
    ],
  },
  {
    planet: {
      id: 'verdania',
      name: 'Verdania',
      subtitle: 'The Living World',
      image: planetVerdania,
      description: 'A thriving biosphere teeming with bioluminescent forests and vast oceans of liquid methane. The entire planet functions as a single interconnected organism, with root networks spanning continents.',
      stats: [
        { label: 'Distance', value: '18.6 LY' },
        { label: 'Diameter', value: '15,400 km' },
        { label: 'Moons', value: '3' },
        { label: 'Temperature', value: '22°C' },
      ],
      color: 'hsl(140, 70%, 45%)',
      glowColor: '140 70% 45%',
    },
    systemDescription: 'The Verdania system teems with life at every scale. Even the asteroid belt contains microorganisms, and the system\'s star emits a nurturing spectrum that accelerates organic growth.',
    moons: [
      {
        id: 'spore',
        name: 'Spore',
        subtitle: 'The Fungal Moon',
        image: moonSpore,
        description: 'Entirely colonized by a single interconnected fungal network, Spore glows an eerie green visible from Verdania\'s surface. The mycelium network shows signs of rudimentary intelligence and problem-solving behavior.',
        stats: [
          { label: 'Orbit', value: '95,000 km' },
          { label: 'Diameter', value: '1,200 km' },
          { label: 'Gravity', value: '0.08g' },
          { label: 'Temperature', value: '15°C' },
        ],
        color: 'hsl(130, 80%, 45%)',
        glowColor: '130 80% 45%',
      },
      {
        id: 'tidal',
        name: 'Tidal',
        subtitle: 'The Ocean Moon',
        image: moonTidal,
        description: 'A world of endless teal oceans dotted with floating kelp islands that glow at night. Massive aquatic creatures breach the surface during the triple-moon alignment, creating waves hundreds of meters tall.',
        stats: [
          { label: 'Orbit', value: '220,000 km' },
          { label: 'Diameter', value: '3,800 km' },
          { label: 'Gravity', value: '0.22g' },
          { label: 'Temperature', value: '18°C' },
        ],
        color: 'hsl(175, 75%, 45%)',
        glowColor: '175 75% 45%',
      },
    ],
  },
];

export function getSystemById(id: string): PlanetSystem | undefined {
  return planetSystems.find((s) => s.planet.id === id);
}
