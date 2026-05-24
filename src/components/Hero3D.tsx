"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "./ThemeContext";

const FloatingShape: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { theme } = useTheme();

  // Slow rotation and hover acceleration
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Slow ambient rotation
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;

    // React to hover
    if (hovered) {
      meshRef.current.scale.lerp(new THREE.Vector3(1.3, 1.3, 1.3), 0.1);
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(1.0, 1.0, 1.0), 0.1);
    }
  });

  // Theme-specific colors
  const primaryColor = theme === "dark" ? "#8b5cf6" : "#6d28d9";

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <icosahedronGeometry args={[1.8, 4]} />
      <MeshDistortMaterial
        color={primaryColor}
        roughness={0.2}
        metalness={0.8}
        distort={hovered ? 0.5 : 0.25}
        speed={hovered ? 4 : 1.8}
        wireframe
      />
    </mesh>
  );
};

const Hero3D: React.FC = () => {
  return (
    <div className="w-full h-[350px] md:h-[450px] relative z-10 flex items-center justify-center pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 75 }} gl={{ antialias: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[-5, 5, 5]} intensity={0.8} />
        
        <Float speed={1.5} rotationIntensity={1.2} floatIntensity={1.5}>
          <FloatingShape />
        </Float>
      </Canvas>
    </div>
  );
};

export default Hero3D;
