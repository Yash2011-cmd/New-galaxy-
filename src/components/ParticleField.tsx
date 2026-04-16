import { useRef, useMemo, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 3000;

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const scrollRef = useRef(0);
  const { viewport } = useThree();

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { positions, velocities, colors, sizes, basePositions } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const basePositions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    const cyan = new THREE.Color('hsl(185, 80%, 55%)');
    const purple = new THREE.Color('hsl(265, 70%, 60%)');
    const white = new THREE.Color('hsl(210, 20%, 85%)');
    const pink = new THREE.Color('hsl(320, 70%, 60%)');
    const gold = new THREE.Color('hsl(40, 90%, 60%)');

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // Distribute in a wide galaxy disc shape
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 12 + 1;
      const armOffset = Math.sin(angle * 3) * 2;
      
      positions[i3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 3;
      positions[i3 + 1] = (Math.random() - 0.5) * (2 + armOffset * 0.3);
      positions[i3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 3 - 5;

      basePositions[i3] = positions[i3];
      basePositions[i3 + 1] = positions[i3 + 1];
      basePositions[i3 + 2] = positions[i3 + 2];

      velocities[i3] = (Math.random() - 0.5) * 0.003;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.001;

      const t = Math.random();
      const color = t < 0.25 ? cyan : t < 0.45 ? purple : t < 0.6 ? pink : t < 0.75 ? gold : white;
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 3.5 + 0.5;
    }

    return { positions, velocities, colors, sizes, basePositions };
  }, []);

  const handlePointerMove = useCallback((e: THREE.Event) => {
    const event = e as unknown as { point: THREE.Vector3 };
    mouseRef.current.set(event.point.x, event.point.y);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const geo = meshRef.current.geometry;
    const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;
    const time = state.clock.elapsedTime;
    const scroll = scrollRef.current;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Galaxy rotation based on scroll
      const baseX = basePositions[i3];
      const baseZ = basePositions[i3 + 2];
      const scrollAngle = scroll * Math.PI * 2;
      const rotatedX = baseX * Math.cos(scrollAngle) - baseZ * Math.sin(scrollAngle);
      const rotatedZ = baseX * Math.sin(scrollAngle) + baseZ * Math.cos(scrollAngle);

      // Organic drift + scroll-driven expansion
      const expansion = 1 + scroll * 0.8;
      posArray[i3] = rotatedX * expansion + Math.sin(time * 0.2 + i * 0.01) * 0.3;
      posArray[i3 + 1] = basePositions[i3 + 1] * expansion + Math.cos(time * 0.15 + i * 0.01) * 0.2;
      posArray[i3 + 2] = rotatedZ * expansion + velocities[i3 + 2] * time * 10;

      // Mouse repulsion
      const dx = posArray[i3] - mouseRef.current.x;
      const dy = posArray[i3 + 1] - mouseRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 4) {
        const force = (4 - dist) * 0.012;
        posArray[i3] += dx * force;
        posArray[i3 + 1] += dy * force;
      }
    }

    posAttr.needsUpdate = true;

    // Camera motion driven by scroll
    const cam = state.camera;
    cam.position.z = 8 - scroll * 4;
    cam.position.y = scroll * 3;
    cam.rotation.x = -scroll * 0.3;
    
    meshRef.current.rotation.y = Math.sin(time * 0.04) * 0.1 + scroll * Math.PI * 0.5;
  });

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: `
        attribute float aSize;
        attribute vec3 aColor;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uPixelRatio;

        void main() {
          vColor = aColor;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          float depth = -mvPosition.z;
          vAlpha = smoothstep(20.0, 1.0, depth) * 0.85;
          gl_PointSize = aSize * uPixelRatio * (10.0 / max(depth, 0.5));
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          float glow = exp(-d * 3.5);
          float core = smoothstep(0.5, 0.0, d);
          vec3 color = vColor * (core * 1.2 + glow * 0.6);
          gl_FragColor = vec4(color, vAlpha * (core * 0.9 + glow * 0.5));
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  return (
    <group>
      <mesh onPointerMove={handlePointerMove} visible={false}>
        <planeGeometry args={[viewport.width * 3, viewport.height * 3]} />
        <meshBasicMaterial />
      </mesh>
      <points ref={meshRef} material={shaderMaterial}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-aColor" count={PARTICLE_COUNT} array={colors} itemSize={3} />
          <bufferAttribute attach="attributes-aSize" count={PARTICLE_COUNT} array={sizes} itemSize={1} />
        </bufferGeometry>
      </points>
    </group>
  );
}

export default function ParticleField() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
