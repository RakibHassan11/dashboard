// 🌍 Futuristic 3D Globe Component - Three.js Magic!

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import { TextureLoader } from 'three';
import * as THREE from 'three';

interface ThreeGlobeProps {
  lat: string;
  lng: string;
  userLocation?: string;
}

// 🌐 Globe mesh component with earth texture
const Globe: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const markerRef = useRef<THREE.Mesh>(null);

  // 🎨 Create earth-like texture programmatically
  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    // Create gradient for ocean
    const gradient = ctx.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, '#1e40af'); // Deep blue
    gradient.addColorStop(0.7, '#3b82f6'); // Blue
    gradient.addColorStop(1, '#60a5fa'); // Light blue
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 256);

    // Add some landmass-like patterns
    ctx.fillStyle = '#22c55e'; // Green for land
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 256;
      const size = Math.random() * 30 + 10;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  }, []);

  // ⚡ Auto-rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
    if (markerRef.current) {
      // Pulsing animation for the location marker
      markerRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.2);
    }
  });

  // 📍 Convert lat/lng to 3D coordinates on sphere
  const markerPosition = useMemo(() => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const radius = 1.02; // Slightly above globe surface

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    return [x, y, z] as const;
  }, [lat, lng]);

  return (
    <group>
      {/* 🌍 Main Globe */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* 📍 Location Marker */}
      <mesh ref={markerRef} position={markerPosition}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>

      {/* ✨ Glowing ring around marker */}
      <mesh position={markerPosition}>
        <ringGeometry args={[0.03, 0.05, 16]} />
        <meshBasicMaterial 
          color="#ef4444" 
          transparent 
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

// 🎬 Main Globe Component
const ThreeGlobe: React.FC<ThreeGlobeProps> = ({ lat, lng, userLocation = "User Location" }) => {
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);

  return (
    <div className="w-full h-64 rounded-xl overflow-hidden border border-border/20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        {/* 💡 Lighting setup */}
        <ambientLight intensity={0.4} />
        <pointLight position={[2, 2, 2]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-2, -2, -2]} intensity={0.3} color="#3b82f6" />

        {/* 🌍 The Globe */}
        <Globe lat={latitude} lng={longitude} />

        {/* 🎮 Interactive controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.5}
        />

        {/* 📋 Location Info */}
        <Html position={[0, -1.5, 0]} center>
          <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm border border-white/20">
            📍 {userLocation}
            <div className="text-xs text-blue-300 mt-1">
              {latitude.toFixed(4)}°, {longitude.toFixed(4)}°
            </div>
          </div>
        </Html>
      </Canvas>
    </div>
  );
};

export default ThreeGlobe;