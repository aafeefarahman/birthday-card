'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import confetti from 'canvas-confetti';

interface EndWaxSealStampProps {
  onStampImpact?: () => void;
}

export const EndWaxSealStamp: React.FC<EndWaxSealStampProps> = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [hasStamped, setHasStamped] = useState(false);
  const [showRipple, setShowRipple] = useState(false);

  useEffect(() => {
    if (isInView && !hasStamped) {
      setHasStamped(true);

      // Trigger impact at ~350ms (when stamp hits parchment)
      const impactTimer = setTimeout(() => {
        setShowRipple(true);

        if (typeof window !== 'undefined' && 'vibrate' in navigator) {
          try {
            navigator.vibrate(20);
          } catch {
            // ignore
          }
        }

        // Tiny confetti pop from seal position
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const x = (rect.left + rect.width / 2) / window.innerWidth;
          const y = (rect.top + rect.height / 2) / window.innerHeight;

          confetti({
            particleCount: 12,
            spread: 50,
            origin: { x, y },
            colors: ['#7A1226', '#D8B4B4', '#D4AF37', '#E5C158'],
            startVelocity: 18,
            gravity: 0.8,
            scalar: 0.7,
            ticks: 100,
          });
        }
      }, 350);

      return () => clearTimeout(impactTimer);
    }
  }, [isInView, hasStamped]);

  return (
    <div ref={ref} className="relative my-6 flex justify-center items-center z-10">
      {/* Impact Ripple Ring */}
      {showRipple && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0.8 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute w-14 h-14 rounded-full border-2 border-[#7A1226]/50 pointer-events-none"
        />
      )}

      {/* Stamped Wax Seal */}
      <motion.div
        initial={{ scale: 1.6, opacity: 0 }}
        animate={
          isInView
            ? { scale: [1.6, 0.95, 1], opacity: 1 }
            : { scale: 1.6, opacity: 0 }
        }
        transition={{
          duration: 0.45,
          times: [0, 0.8, 1],
          ease: 'easeOut',
        }}
        className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#8C1B2F] via-[#7A1226] to-[#4A0A16] shadow-[inset_0_2px_4px_rgba(255,255,255,0.25),_0_6px_16px_rgba(0,0,0,0.5)] border border-[#9E2A3F]/50 flex items-center justify-center select-none"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.25)_0%,_transparent_60%)] rounded-full" />
        <div className="relative text-[#E8C2A0] font-pinyon text-2xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] pt-0.5">
          A
        </div>
      </motion.div>
    </div>
  );
};
