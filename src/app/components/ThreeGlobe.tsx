'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThreeGlobeProps {
  lat: string;
  lng: string;
  userLocation?: string;
}

const ThreeGlobe: React.FC<ThreeGlobeProps> = ({ 
  lat, 
  lng, 
  userLocation = "User Location" 
}) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="relative w-full h-64 rounded-xl overflow-hidden border border-border/20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800" />
    );
  }

  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);

  const getMarkerPosition = (lat: number, lng: number) => {
    const x = (lng / 180) * 100;
    const y = (-lat / 90) * 100;
    return { x, y };
  };

  const markerPos = getMarkerPosition(latitude, longitude);

  return (
    <div className="relative w-full h-64 rounded-xl overflow-hidden border border-border/20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-[url('/world-map.svg')] bg-contain bg-center bg-no-repeat opacity-20" />
        
        <AnimatePresence>
          <motion.div
            key="globe"
            className="absolute inset-0 rounded-full border-2 border-blue-400/30"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              scale: [1, 1.05, 1],
              boxShadow: [
                '0 0 20px rgba(59, 130, 246, 0.2)',
                '0 0 40px rgba(59, 130, 246, 0.4)',
                '0 0 20px rgba(59, 130, 246, 0.2)',
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            key="marker"
            className="absolute w-3 h-3 bg-red-500 rounded-full shadow-lg"
            style={{
              left: `calc(50% + ${markerPos.x}%)`,
              top: `calc(50% + ${markerPos.y}%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </AnimatePresence>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm border border-white/20">
          <div className="flex items-center gap-2">
            <span>📍</span>
            <span>{userLocation}</span>
          </div>
          <div className="text-xs text-blue-300 mt-1 text-center">
            {latitude.toFixed(4)}°, {longitude.toFixed(4)}°
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeGlobe;