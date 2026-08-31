"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import { motion, useReducedMotion } from "framer-motion";
import * as THREE from "three";

const LAYERS = [
  { label: "AI", color: "#F0B65C", y: 1.35, z: 0.15 },
  { label: "Frontend", color: "#8B9BFF", y: 0.45, z: 0.05 },
  { label: "Backend", color: "#6C7BDB", y: -0.45, z: -0.05 },
  { label: "Data", color: "#4E5AA8", y: -1.35, z: -0.15 },
];

function StackLayer({
  y,
  z,
  color,
  label,
  index,
  pointer,
}: {
  y: number;
  z: number;
  color: string;
  label: string;
  index: number;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const bob = Math.sin(t * 0.6 + index * 0.8) * 0.05;
    const targetRotY = pointer.current.x * 0.35;
    const targetRotX = -pointer.current.y * 0.2;
    ref.current.position.y = y + bob;
    ref.current.rotation.y += (targetRotY - ref.current.rotation.y) * 0.04;
    ref.current.rotation.x += (targetRotX - ref.current.rotation.x) * 0.04;
  });

  return (
    <group ref={ref} position={[0, y, z]}>
      <RoundedBox args={[3.2, 0.62, 0.18]} radius={0.08} smoothness={4}>
        <meshStandardMaterial
          color={color}
          metalness={0.15}
          roughness={0.35}
          transparent
          opacity={0.92}
        />
      </RoundedBox>
      <Text
        position={[-1.35, 0, 0.11]}
        fontSize={0.19}
        color="#0A0A0B"
        anchorX="left"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function StackScene() {
  const pointer = useRef({ x: 0, y: 0 });

  return (
    <group
      onPointerMove={(e) => {
        pointer.current.x = (e.uv ? e.uv.x - 0.5 : 0) * 2;
        pointer.current.y = (e.uv ? e.uv.y - 0.5 : 0) * 2;
      }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />
      <directionalLight position={[-3, -2, -4]} intensity={0.3} color="#8B9BFF" />
      <mesh visible={false} onPointerMove={(e) => {
        pointer.current.x = (e.point.x) / 2.5;
        pointer.current.y = (e.point.y) / 2.5;
      }}>
        <planeGeometry args={[8, 6]} />
      </mesh>
      {LAYERS.map((l, i) => (
        <StackLayer key={l.label} {...l} index={i} pointer={pointer} />
      ))}
    </group>
  );
}

function StackCanvas() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return (
      <div className="flex flex-col gap-3 w-full max-w-sm">
        {LAYERS.map((l) => (
          <div
            key={l.label}
            className="h-14 rounded-xl flex items-center px-5 font-medium text-[#0A0A0B]"
            style={{ backgroundColor: l.color }}
          >
            {l.label}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="w-full h-[380px] sm:h-[440px] lg:h-[520px] relative">
      <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <StackScene />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default function TerminalHero() {
  return (
    <section
      id="top"
      className="relative min-h-[92vh] flex items-center px-6 sm:px-10 lg:px-16 pt-28 pb-16 overflow-hidden"
    >
      <div className="relative max-w-6xl w-full mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="text-xs tracking-[0.25em] uppercase text-zinc-500 mb-4">
            Full-stack JS developer
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium text-[#EDEDED] leading-[1.08] tracking-tight mb-6">
            Abdullateef Abdulqudus
          </h1>
          <p className="max-w-md text-zinc-400 text-base sm:text-lg leading-relaxed mb-8">
            Founder of Primyst. Builds and ships production Next.js
            applications — booking systems, AI-assisted tools, and client
            platforms — from first commit to deploy.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="px-5 py-2.5 rounded-full bg-[#8B9BFF] text-[#0A0A0B] text-sm font-medium hover:brightness-110 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B9BFF]"
            >
              See the work
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-full border border-zinc-700 text-zinc-200 text-sm font-medium hover:border-zinc-500 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
            >
              Get in touch
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="flex justify-center"
        >
          <StackCanvas />
        </motion.div>
      </div>
    </section>
  );
}
