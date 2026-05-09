"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

const BRAND = "#1a6aff";

/* ─── Node network (dot + line — logo motif in 3D) ───────────── */

function Network() {
  const groupRef = useRef<THREE.Group>(null);

  const { nodePositions, lineGeo } = useMemo(() => {
    const count = 90;
    const nodePositions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const r = 1.8 + Math.random() * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      nodePositions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      nodePositions[i * 3 + 1] = r * Math.cos(phi) * 0.6;
      nodePositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }

    /* Build edges between nearby nodes */
    const threshold = 1.6;
    const verts: number[] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = nodePositions[i * 3]     - nodePositions[j * 3];
        const dy = nodePositions[i * 3 + 1] - nodePositions[j * 3 + 1];
        const dz = nodePositions[i * 3 + 2] - nodePositions[j * 3 + 2];
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < threshold) {
          verts.push(
            nodePositions[i * 3], nodePositions[i * 3 + 1], nodePositions[i * 3 + 2],
            nodePositions[j * 3], nodePositions[j * 3 + 1], nodePositions[j * 3 + 2],
          );
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(verts), 3));
    return { nodePositions, lineGeo };
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x += delta * 0.012;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Edges */}
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color={BRAND} transparent opacity={0.10} />
      </lineSegments>

      {/* Nodes */}
      <Points positions={nodePositions}>
        <PointMaterial
          color={BRAND}
          size={0.05}
          sizeAttenuation
          transparent
          opacity={0.55}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

/* ─── Central wireframe form ──────────────────────────────────── */

function CoreForm() {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (outer.current) {
      outer.current.rotation.y += delta * 0.18;
      outer.current.rotation.z += delta * 0.06;
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.25;
      inner.current.rotation.x += delta * 0.10;
    }
  });

  return (
    <Float speed={0.7} floatIntensity={0.4} rotationIntensity={0.1}>
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          color={BRAND}
          wireframe
          transparent
          opacity={0.13}
        />
      </mesh>
      <mesh ref={inner}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial
          color={BRAND}
          wireframe
          transparent
          opacity={0.20}
        />
      </mesh>
    </Float>
  );
}

/* ─── Floating blue accent orbs ───────────────────────────────── */

function Orb({ position, scale, speed }: {
  position: [number, number, number];
  scale: number;
  speed: number;
}) {
  return (
    <Float speed={speed} floatIntensity={1.2} rotationIntensity={0.3}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={BRAND}
          emissive={BRAND}
          emissiveIntensity={0.3}
          transparent
          opacity={0.07}
        />
      </mesh>
    </Float>
  );
}

/* ─── Scene ───────────────────────────────────────────────────── */

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]}   intensity={1.2} color={BRAND} />
      <pointLight position={[-5, -3, -5]} intensity={0.8} color="#0ea5e9" />

      <Network />
      <CoreForm />

      <Orb position={[3.5,  1.0, -1]} scale={1.4} speed={1.0} />
      <Orb position={[-3.0, 0.5, -2]} scale={1.0} speed={1.4} />
      <Orb position={[0.5, -2.5, -1]} scale={0.8} speed={1.8} />
    </>
  );
}

/* ─── Exported canvas ─────────────────────────────────────────── */

export function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <Scene />
    </Canvas>
  );
}
