'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { memoryCaptions } from '@/content';

interface PolaroidProps {
  id: number;
  index: number;
  onTapPetals: () => void;
}

export const Polaroid: React.FC<PolaroidProps> = ({ id, index, onTapPetals }) => {
  const [imageExists, setImageExists] = useState<boolean | null>(null);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  // Fixed tilt angles based on index so it never re-randomizes on re-render
  const tilts = [-3, 2.5, -2, 3.5, -1.5];
  const baseTilt = tilts[index % tilts.length];
  const washiTapes = ['bg-[#D9B382]/65', 'bg-[#D8B4B4]/65', 'bg-[#C8A27C]/65'];
  const tapeColor = washiTapes[index % washiTapes.length];

  useEffect(() => {
    const src = `/memories/${id}.jpg`;
    const img = new Image();
    img.src = src;
    img.onload = () => setImageExists(true);
    img.onerror = () => setImageExists(false);
  }, [id]);

  if (imageExists === false) {
    return null; // Skip silently if photo missing
  }

  if (imageExists === null) {
    return null; // Loading state silently
  }

  const caption = memoryCaptions[index] || '';

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!pointerStartRef.current) return;
    const dx = Math.abs(e.clientX - pointerStartRef.current.x);
    const dy = Math.abs(e.clientY - pointerStartRef.current.y);
    const distance = Math.hypot(dx, dy);

    if (distance < 8) {
      onTapPetals();
    }
    pointerStartRef.current = null;
  };

  return (
    <div ref={ref} className="my-10 w-full flex justify-center z-10 select-none">
      <motion.div
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        whileTap={{ scale: 1.04 }}
        initial={{ opacity: 0, y: 40, rotate: baseTilt + 6 }}
        animate={
          isInView
            ? { opacity: 1, y: 0, rotate: baseTilt }
            : { opacity: 0, y: 40, rotate: baseTilt + 6 }
        }
        transition={{
          type: 'spring',
          stiffness: 220,
          damping: 18,
          delay: 0.1,
        }}
        className="relative w-[76%] max-w-[270px] bg-[#FAF8F5] pt-3 px-3 pb-6 rounded-xs shadow-[0_12px_28px_rgba(0,0,0,0.35)] border border-neutral-300/60 cursor-pointer transform-gpu"
        style={{ willChange: 'transform, opacity' }}
      >
        {/* Washi Tape Strip at Top */}
        <div
          className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 ${tapeColor} rounded-xs shadow-xs border border-white/20 pointer-events-none z-20`}
          style={{ transform: 'translateX(-50%) rotate(-1.5deg)' }}
        />

        {/* Photo Container */}
        <div className="relative w-full aspect-[3/4] bg-neutral-200 overflow-hidden rounded-2xs border border-neutral-300/40">
          <img
            src={`/memories/${id}.jpg`}
            alt={`Memory ${id}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Handwritten Caption */}
        {caption && (
          <p className="font-handwritten text-xl text-[#7A1226] text-center pt-2.5 pb-0.5 leading-none">
            {caption}
          </p>
        )}
      </motion.div>
    </div>
  );
};
