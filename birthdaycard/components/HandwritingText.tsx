'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HandwritingTextProps {
  text: string;
  className?: string;
  duration?: number;
}

export const HandwritingText: React.FC<HandwritingTextProps> = ({
  text,
  className = '',
  duration = 1.5,
}) => {
  return (
    <motion.span
      initial={{
        clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
        opacity: 0,
      }}
      whileInView={{
        clipPath: 'polygon(0% 0%, 105% 0%, 105% 100%, 0% 100%)',
        opacity: 1,
      }}
      viewport={{ once: true }}
      transition={{
        duration,
        ease: [0.25, 1, 0.5, 1],
      }}
      className={`inline-block font-handwritten ${className}`}
      style={{ willChange: 'clip-path, opacity' }}
    >
      {text}
    </motion.span>
  );
};
