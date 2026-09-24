'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface WaxSealProps {
  onTap: () => void;
  isOpen: boolean;
}

interface Fragment {
  id: number;
  targetX: number;
  targetY: number;
  rotation: number;
  size: number;
}

export const WaxSeal: React.FC<WaxSealProps> = ({ onTap, isOpen }) => {
  const [isCracked, setIsCracked] = useState(false);
  const [fragments, setFragments] = useState<Fragment[]>([]);

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (isCracked || isOpen) return;

    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(30);
      } catch {
        // ignore if not allowed
      }
    }

    // Generate 11 wax fragments bursting from the physical seal
    const frags: Fragment[] = Array.from({ length: 11 }).map((_, i) => {
      const angle = (i / 11) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const distance = 40 + Math.random() * 60;
      return {
        id: i,
        targetX: Math.cos(angle) * distance,
        targetY: Math.sin(angle) * distance + 50,
        rotation: Math.random() * 360 - 180,
        size: 6 + Math.random() * 10,
      };
    });

    setFragments(frags);
    setIsCracked(true);
    onTap();
  };

  return (
    <div
      className="absolute top-[52%] left-[51%] -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer select-none touch-none"
      onClick={handleClick}
      style={{ width: 84, height: 84 }}
    >
      {/* Invisible hot-spot tap region over the physical wax seal in cover.jpeg */}
      
      {/* Wax Crack Fragments popping from the physical seal on tap */}
      {isCracked &&
        fragments.map((frag) => (
          <motion.div
            key={frag.id}
            className="absolute top-1/2 left-1/2 bg-[#7A1226] rounded-xs shadow-md border border-[#8C1B2F]/60 pointer-events-none"
            style={{
              width: frag.size,
              height: frag.size * (0.8 + Math.random() * 0.4),
            }}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 }}
            animate={{
              x: frag.targetX,
              y: frag.targetY,
              scale: 0.2,
              opacity: 0,
              rotate: frag.rotation,
            }}
            transition={{
              duration: 0.8,
              ease: [0.25, 1, 0.5, 1],
            }}
          />
        ))}
    </div>
  );
};
