'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Petal {
  id: number;
  startX: number; // %
  startY: number; // %
  width: number;
  height: number;
  color: string;
  fallY: number; // px
  swayX1: number;
  swayX2: number;
  swayX3: number;
  rotation: number;
  duration: number;
  delay: number;
}

interface CoverFallingPetalsProps {
  isOpen: boolean;
}

export const CoverFallingPetals: React.FC<CoverFallingPetalsProps> = ({ isOpen }) => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setPetals([]);
      return;
    }

    const isReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReduced) return;

    const colors = ['#EFE4CF', '#B87A8F', '#F5EFE6', '#E8D5B0', '#D8B4B4'];
    const vh = typeof window !== 'undefined' ? window.innerHeight : 800;

    const generatedPetals: Petal[] = Array.from({ length: 11 }).map((_, i) => ({
      id: i,
      startX: 55 + Math.random() * 22, // Top right flower sprig area
      startY: 18 + Math.random() * 15,
      width: 7 + Math.random() * 7,
      height: 12 + Math.random() * 9,
      color: colors[i % colors.length],
      fallY: vh * (0.6 + Math.random() * 0.3),
      swayX1: (Math.random() - 0.5) * 50,
      swayX2: (Math.random() - 0.5) * 90,
      swayX3: (Math.random() - 0.5) * 40,
      rotation: 240 + Math.random() * 360,
      duration: 2.0 + Math.random() * 0.8,
      delay: 0.1 + Math.random() * 0.5,
    }));

    setPetals(generatedPetals);

    // Remove petals from DOM after animation completes (3s)
    const cleanupTimer = setTimeout(() => {
      setPetals([]);
    }, 3200);

    return () => clearTimeout(cleanupTimer);
  }, [isOpen]);

  if (petals.length === 0) return null;

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            initial={{
              x: 0,
              y: 0,
              opacity: 1,
              rotate: 0,
            }}
            animate={{
              x: [0, petal.swayX1, petal.swayX2, petal.swayX3],
              y: petal.fallY,
              opacity: [1, 1, 0.8, 0],
              rotate: petal.rotation,
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              ease: [0.25, 1, 0.5, 1],
            }}
            style={{
              position: 'absolute',
              left: `${petal.startX}%`,
              top: `${petal.startY}%`,
              width: petal.width,
              height: petal.height,
              backgroundColor: petal.color,
              borderRadius: '50% 10% 50% 50%',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
