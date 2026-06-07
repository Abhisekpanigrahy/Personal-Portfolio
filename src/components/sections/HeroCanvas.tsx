import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { isWebGLSupported } from "@/lib/webgl";
import { motion } from "framer-motion";

function CentralOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.4, 64, 64]} />
        <MeshDistortMaterial
          color="#7c3aed"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

function WireframeIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.25;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.35;
    }
  });
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.2, 1]} />
      <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.12} />
    </mesh>
  );
}

function OrbitingTorus({ radius, speed, color, rotX, rotZ }: {
  radius: number; speed: number; color: string; rotX: number; rotZ: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * speed;
    }
  });
  return (
    <group ref={groupRef} rotation={[rotX, 0, rotZ]}>
      <mesh>
        <torusGeometry args={[radius, 0.015, 8, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => {
    const count = 200;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 3;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      // Violet to cyan gradient
      const t = Math.random();
      col[i * 3] = 0.48 + t * (-0.48 + 0);
      col[i * 3 + 1] = 0.23 + t * (1 - 0.23);
      col[i * 3 + 2] = 0.93 + t * (1 - 0.93);
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function MouseParallax() {
  const { camera } = useThree();
  useFrame((state) => {
    const x = state.mouse.x * 0.5;
    const y = state.mouse.y * 0.3;
    camera.position.x += (x - camera.position.x) * 0.04;
    camera.position.y += (y - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function CSSFallback({ isDark }: { isDark: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 120 + i * 80,
            height: 120 + i * 80,
            border: `1px solid ${i % 2 === 0
              ? isDark ? "rgba(124,58,237,0.3)" : "rgba(109,40,217,0.25)"
              : isDark ? "rgba(0,255,255,0.2)" : "rgba(8,145,178,0.2)"}`,
          }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 8 + i * 4, repeat: Infinity, ease: "linear" }}
        />
      ))}
      <motion.div
        className="w-32 h-32 rounded-full"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(124,58,237,0.6), rgba(0,255,255,0.2))"
            : "radial-gradient(circle, rgba(109,40,217,0.4), rgba(8,145,178,0.15))",
          boxShadow: isDark
            ? "0 0 60px rgba(124,58,237,0.5)"
            : "0 0 40px rgba(109,40,217,0.3)",
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export default function HeroCanvas({ isDark = true }: { isDark?: boolean }) {
  if (!isWebGLSupported()) return <CSSFallback isDark={isDark} />;

  return (
    <Suspense fallback={<CSSFallback isDark={isDark} />}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#7c3aed" />
        <pointLight position={[-5, -3, 3]} intensity={1.5} color="#00ffff" />
        <pointLight position={[0, -5, -5]} intensity={1} color="#ec4899" />

        <MouseParallax />
        <CentralOrb />
        <WireframeIcosahedron />
        <OrbitingTorus radius={2.5} speed={0.4} color="#7c3aed" rotX={Math.PI / 4} rotZ={0} />
        <OrbitingTorus radius={2.8} speed={-0.3} color="#00ffff" rotX={0} rotZ={Math.PI / 3} />
        <OrbitingTorus radius={3.1} speed={0.2} color="#ec4899" rotX={Math.PI / 6} rotZ={Math.PI / 4} />
        <ParticleField />
      </Canvas>
    </Suspense>
  );
}
