'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface InnerCardProps {
  isOpen: boolean;
  children?: React.ReactNode;
}

export const InnerCard: React.FC<InnerCardProps> = ({ isOpen, children }) => {
  const [hasInnerImage, setHasInnerImage] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/inner.png';
    img.onload = () => setHasInnerImage(true);
    img.onerror = () => setHasInnerImage(false);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center p-3 sm:p-5 z-10 overflow-hidden bg-[#1E140D]">
      {/* Background warm ambient light */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#8B6B4A]/20 via-[#1E140D]/40 to-transparent pointer-events-none"
        animate={isOpen ? { opacity: 1, scale: 1.1 } : { opacity: 0.3, scale: 0.9 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      />

      {/* Floating faint gold dust particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute w-2 h-2 rounded-full bg-[#D4AF37]/40 blur-xs top-[20%] left-[15%] animate-pulse" />
        <div className="absolute w-1.5 h-1.5 rounded-full bg-[#D9B382]/50 blur-xs top-[60%] left-[80%] animate-pulse duration-3000" />
        <div className="absolute w-2 h-2 rounded-full bg-[#8B6B4A]/40 blur-xs top-[75%] left-[25%] animate-pulse duration-2000" />
      </div>

      {/* Main Aged Parchment Letter Panel */}
      <motion.div
        className="relative w-full h-full max-w-md parchment-bg deckled-edges double-border shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden"
        initial={{ scale: 0.94, opacity: 0.8 }}
        animate={
          isOpen
            ? { scale: 1, opacity: 1 }
            : { scale: 0.94, opacity: 0.8 }
        }
        transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
        style={{
          backgroundImage: hasInnerImage ? 'url(/inner.png)' : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Foxing Paper Stain Blotches */}
        <div className="absolute top-0 left-0 w-44 h-44 foxing-stain-top pointer-events-none z-0" />
        <div className="absolute bottom-0 right-0 w-48 h-48 foxing-stain-bottom pointer-events-none z-0" />
        <div className="absolute top-1/2 right-0 w-32 h-32 foxing-stain-top pointer-events-none z-0 opacity-60" />

        {/* Sepia Vignette Border Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_50%,_rgba(74,52,38,0.28)_100%)] pointer-events-none z-0" />

        {/* Card Content Layer */}
        <div className="relative z-10 w-full h-full flex flex-col">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
