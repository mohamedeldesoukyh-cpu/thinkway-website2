"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

/* ─── Particle galaxy ─────────────────────────────────────────── */

function Galaxy() {
  const ref = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 4000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      /* Spherical distribution with arm bias */
      const r = Math.random() * 4 + 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const arm = Math.floor(Math.random() * 3) * ((Math.PI * 2) / 3);
      const spread = 0.6;

      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta + arm + r * 0.4) + (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = r * Math.cos(phi) * 0.25 + (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta + arm + r * 0.4) + (Math.random() - 0.5) * spread;

      /* Violet → blue gradient by radius */
      const t = r / 4.5;
      col[i * 3]     = 0.54 - t * 0.16;   // R: violet to blue
      col[i * 3 + 1] = 0.36 - t * 0.10;   // G
      col[i * 3 + 2] = 0.96 + t * 0.03;   // B
    }
    return [pos, col];
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.04;
      ref.current.rotation.x += delta * 0.008;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        vertexColors
        size={0.018}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </Points>
  );
}

/* ─── Floating orbs ───────────────────────────────────────────── */

function Orb({ position, scale, speed, distort }: {
  position: [number, number, number];
  scale: number;
  speed: number;
  distort: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={1.4}>
      <Sphere args={[1, 48, 48]} position={position} scale={scale}>
        <MeshDistortMaterial
          color="#8b5cf6"
          emissive="#4c1d95"
          emissiveIntensity={0.6}
          distort={distort}
          speed={2}
          transparent
          opacity={0.18}
          wireframe={false}
        />
      </Sphere>
    </Float>
  );
}

/* ─── Crystalline shards ──────────────────────────────────────── */

function Shard({ position, rotation, scale }: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.12;
      ref.current.rotation.z += delta * 0.08;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={ref} position={position} rotation={rotation} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#1d4ed8"
          emissiveIntensity={0.5}
          transparent
          opacity={0.22}
          wireframe
        />
      </mesh>
    </Float>
  );
}

/* ─── Inner ring ──────────────────────────────────────────────── */

function Ring() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.06;
      ref.current.rotation.z += delta * 0.03;
    }
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2.5, 0, 0]}>
      <torusGeometry args={[2.4, 0.008, 4, 120]} />
      <meshStandardMaterial
        color="#a78bfa"
        emissive="#7c3aed"
        emissiveIntensity={1}
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}

/* ─── Scene ───────────────────────────────────────────────────── */

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[4, 4, 4]} intensity={2} color="#8b5cf6" />
      <pointLight position={[-4, -2, -4]} intensity={1.5} color="#60a5fa" />

      <Galaxy />
      <Ring />

      <Orb position={[0, 0, 0]}   scale={1.8}  speed={1.2} distort={0.5} />
      <Orb position={[3, 1, -2]}  scale={0.9}  speed={2.0} distort={0.4} />
      <Orb position={[-3, -1, -1]} scale={0.7} speed={1.6} distort={0.6} />

      <Shard position={[2.8, 1.5, -1]}  rotation={[0.4, 0.2, 0]}   scale={[0.28, 0.44, 0.28]} />
      <Shard position={[-2.6, 1.0, -2]} rotation={[0.2, 0.8, 0.3]} scale={[0.22, 0.36, 0.22]} />
      <Shard position={[1.5, -1.8, -1]} rotation={[0.6, 0.3, 0.1]} scale={[0.18, 0.30, 0.18]} />
      <Shard position={[-1.8, 2.0, -3]} rotation={[0.1, 0.5, 0.4]} scale={[0.16, 0.26, 0.16]} />
    </>
  );
}

/* ─── Exported canvas (used with dynamic import, ssr:false) ───── */

export function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <Scene />
    </Canvas>
  );
}
