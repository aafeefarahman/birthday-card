'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface HighlighterProps {
  children: React.ReactNode;
  delay?: number;
}

export const Highlighter: React.FC<HighlighterProps> = ({ children, delay = 0.35 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <span ref={ref} className="relative inline">
      {/* Hand-drawn golden-rose sweep background */}
      <motion.span
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.7, delay, ease: [0.25, 1, 0.5, 1] }}
        className="absolute inset-0 bg-[#E8BE78]/45 -my-0.5 -mx-1 rounded-[3px] -z-10 origin-left transform-gpu"
        style={{
          mixBlendMode: 'multiply',
          willChange: 'transform',
          boxDecorationBreak: 'clone',
          WebkitBoxDecorationBreak: 'clone',
        }}
      />
      <span className="relative z-0">{children}</span>
    </span>
  );
};
